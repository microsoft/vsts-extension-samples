/// <reference path='../../lib/vss' />
define(["require", "exports", "scripts/associatedItemsView", "TFS/Build/RestClient", "TFS/WorkItemTracking/RestClient", "q"], function (require, exports, AssociatedItemsView, TFS_Build_Client, TFS_Wit_Client, Q) {
    // Parse the query string from iframe
    var query = {};
    // Remove the ?
    var queryString = window.location.search.length > 0 ? window.location.search.substring(1) : "";
    // Decode each parameter
    var queryStringParams = queryString.split("&");
    queryStringParams.forEach(function (val) {
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
        var buildClient = TFS_Build_Client.getClient();
        var context = VSS.getWebContext();
        // Fetch the build before getting its associated items
        buildClient.getBuild(buildId, context.project.id).then(function (build) {
            return Q.all([
                Q.resolve(build),
                // Fetch the build's associated commits and work items (refs) in parallel
                buildClient.getBuildCommits(context.project.name, buildId),
                buildClient.getBuildWorkItemsRefs(context.project.name, buildId).then(function (itemRefs) {
                    // If we retrieved any work item refs, resolve the full work items before fulfilling the promise
                    if (itemRefs.length > 0) {
                        var witClient = TFS_Wit_Client.getClient();
                        return witClient.getWorkItems(itemRefs.map(function (ref) { return parseInt(ref.id, 10); }));
                    }
                    else {
                        return Q.resolve([]);
                    }
                })
            ]);
        }).then(function (results) {
            var build = results[0];
            var changes = results[1];
            var items = results[2];
            // Create the view, passing in the fetched data to the control's options
            AssociatedItemsView.AssociatedItemsView.enhance(AssociatedItemsView.AssociatedItemsView, $(".hub-view"), {
                build: build,
                associatedChanges: changes,
                associatedWorkItems: items
            });
            // Notify the parent frame that the host has been loaded
            VSS.notifyLoadSucceeded();
        });
    }
    else {
        var vsoContext = VSS.getWebContext();
        var buildExplorerUrl = vsoContext.host.uri + "/" + vsoContext.project.name + "/_build";
        var noBuildText = "No build was specified. Launch the hub from a completed build on <a href='" + buildExplorerUrl + "' target= '_parent' >build explorer.</a><span>";
        $('.hub-title').html(noBuildText);
    }
});
