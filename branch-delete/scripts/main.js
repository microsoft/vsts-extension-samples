var deleteBranchMenu = (function () {
    "use strict";

    return {
        execute: function (sourceItemContext) {
            var ref = sourceItemContext.ref ? sourceItemContext.ref : null;
            if (confirm("Are you sure you want to delete the branch '" + ref.friendlyName + "'?")) {
                var oldRefId = ref.objectId;

                // Post the ref update
                VSS.ready(function () {
                    require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TfsGitClient) {
                        // Get repo name from repo ID (needed to refresh the page)		
                        // NOTE: This is also a temporary workaround
                        var gitClient = VSS_Service.getCollectionClient(TfsGitClient.GitHttpClient);
                        gitClient.updateRefs([{
                            name: ref.name,
                            oldObjectId: ref.objectId,
                            newObjectId: "0000000000000000000000000000000000000000"
                        }], sourceItemContext.repository.id).then(function () {
                            var vsoContext = VSS.getWebContext();

                            VSS.getService("ms.vss-web.history-service").then(function (historySvc) {
                                historyService.reload();
                            });
                        });
                    });
                });
            }
        }
    };
}());

VSS.register("deleteBranchMenu", deleteBranchMenu);