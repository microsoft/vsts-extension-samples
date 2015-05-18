/// <reference path='ref/VSS.d.ts' />

import AssociatedItemsView = require("Scripts/AssociatedItemsView");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Client = require("TFS/Build/RestClient");

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
    var buildClient = VSS_Service.getCollectionClient(TFS_Build_Client.BuildHttpClient);
    var context = VSS.getWebContext();

	// We need the project to fetch the associated commits
    // Fetch the build to load
    buildClient.getBuild(buildId, context.project.id).then((build: TFS_Build_Contracts.Build) => {
		
        // Fetch the build associated commit nodes
        buildClient.getBuildCommits(context.project.name, buildId).then(function (associatedChanges) {
            AssociatedItemsView.AssociatedItemsView.enhance(AssociatedItemsView.AssociatedItemsView, $(".hub-view"), {
                build: build,
                associatedChanges: associatedChanges
            });

            // Notify the parent frame that the host has been loaded
            VSS.notifyLoadSucceeded();
        });
    });
} else {
    var vsoContext = VSS.getWebContext();
    var buildExplorerUrl = vsoContext.host.uri + "/" + vsoContext.project.name + "/_BuildvNext";
    var noBuildText = "No build was specified. Launch the hub from a completed build on <a href='" + buildExplorerUrl +"' target= '_parent' >build explorer.</a><span>";
    $('.hub-title').html(noBuildText);
}