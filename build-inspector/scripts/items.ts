/// <reference path='ref/VSS.d.ts' />

import AssociatedItemsView = require("Scripts/AssociatedItemsView");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Client = require("TFS/Build/RestClient");
import TFS_Wit_Contracts = require("TFS/WorkItemTracking/Contracts");
import TFS_Wit_Client = require("TFS/WorkItemTracking/RestClient");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");

// Parse the query string from iframe
var query = <IDictionaryStringTo<string>>{};

// Remove the ?
var queryString = window.location.search.length > 0 ? window.location.search.substring(1) : "";

// Decode each parameter
var queryStringParams = queryString.split("&");
queryStringParams.forEach((val: string) => {
    var param = val.split('=');
    query[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
});

// Figure out the build id.  It will be last segment of the buildUri parameter
var buildUri = query["buildUri"];
var buildId = -1;
if (buildUri) {
    var indexOfBuildId = buildUri.lastIndexOf("/");
    if (indexOfBuildId > -1) {
        buildId = parseInt(buildUri.substring(indexOfBuildId + 1));
    }
}

if (buildId > 0) {
    var buildClient = VSS_Service.getClient(TFS_Build_Client.BuildHttpClient);
    var context = VSS.getWebContext();

    // We need the project to fetch the associated commits
    // Fetch the build to load
    buildClient.getBuild(buildId, context.project.id).then((build: TFS_Build_Contracts.Build) => {
        
        // Fetch the build associated commit nodes
        buildClient.getBuildCommits(context.project.name, buildId).then(function (associatedChanges: TFS_Build_Contracts.Change[]) {

            // Fetch the work item references associated with the build
            buildClient.getBuildWorkItemsRefs(associatedChanges.map(change => change.id), context.project.name, buildId).then(function (itemRefs: VSS_Common_Contracts.ResourceRef[])  {
                var witClient = VSS_Service.getClient(TFS_Wit_Client.WorkItemTrackingHttpClient);

                // Fetch the work items from the work item references
                witClient.getWorkItems(itemRefs.map(ref => parseInt(ref.id, 10))).then((items: TFS_Wit_Contracts.WorkItem[]) => {

                    // Create the view, passing in the fetched data to the control's options
                    AssociatedItemsView.AssociatedItemsView.enhance(AssociatedItemsView.AssociatedItemsView, $(".hub-view"), {
                        build: build,
                        associatedChanges: associatedChanges,
                        associatedWorkItems: items
                    });

                    // Notify the parent frame that the host has been loaded
                    VSS.notifyLoadSucceeded();
                });
            });
        });
    });
} else {
    var vsoContext = VSS.getWebContext();
    var buildExplorerUrl = vsoContext.host.uri + "/" + vsoContext.project.name + "/_BuildvNext";
    var noBuildText = "No build was specified. Launch the hub from a completed build on <a href='" + buildExplorerUrl +"' target= '_parent' >build explorer.</a><span>";
    $('.hub-title').html(noBuildText);
}