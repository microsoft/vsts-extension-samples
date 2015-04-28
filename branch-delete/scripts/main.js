window.main = (function () {
    "use strict";

    return {
        deleteBranch: function (sourceItemContext) {
            var url = sourceItemContext.url;
            if (url && confirm("Are you sure you want to delete the branch '" + sourceItemContext.friendlyName + "'?")) {

                // Parse the repository ID from the URL
                // NOTE: This is a temprary workaround. In the near future the sourceItemContext will contain a representation of the repo.
                var pre = "git/repositories/";
                var repoIdIndex = url.indexOf(pre) + pre.length;
                var until = url.indexOf("/", repoIdIndex);
                until = until >= 0 ? until : url.length;
                var repoId = url.substring(repoIdIndex, until);

                // Post the ref update
                VSS.ready(function () {
                    require(["VSS/Service", "VersionControl/Scripts/Generated/TFS.VersionControl.Contracts", "VersionControl/Scripts/Generated/TFS.VersionControl.Git.WebApi"], function (VSS_Service, TFS_VersionControl_Contracts, TFS_Git_WebApi) {
                        // Get repo name from repo ID (needed to refresh the page)		
                        // NOTE: This is also a temporary workaround
                        var gitClient = VSS_Service.getCollectionClient(TFS_Git_WebApi.GitHttpClient);
                        gitClient.getRepository(repoId).then(function (repo) {
                            gitClient.updateRefs([{
                                name: sourceItemContext.name,
                                oldObjectId: sourceItemContext.objectId,
                                newObjectId: "0000000000000000000000000000000000000000"
                            }], repoId).then(function () {
                                var vsoContext = VSS.getWebContext();
                                // Create URL to branches page (in order to refresh after deleting the branch)   
                                // NOTE: An API to refresh just the view will likely replace this approach for refreshing the branch list.
                                window.parent.location.href = vsoContext.host.uri + "/" + vsoContext.project.name + "/_git/" + repo.name + "/branches";
                            });
                        });
                    });
                });
            }
        }
    };
} ());