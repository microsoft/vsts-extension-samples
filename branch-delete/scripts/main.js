var deleteBranchMenu = (function () {
    "use strict";

    return {
        execute: function (sourceItemContext) {
            var ref = sourceItemContext.ref ? sourceItemContext.ref : null;
            if (confirm("Are you sure you want to delete the branch '" + ref.friendlyName + "'?")) {
                var oldRefId = ref.objectId;

                // Post the ref update
                VSS.ready(function () {
                    require(["TFS/VersionControl/GitRestClient"], function (TfsGitClient) {
                        // Get repo name from repo ID (needed to refresh the page)
                        // NOTE: This is also a temporary workaround
                        var gitClient = TfsGitClient.getClient();
                        gitClient.updateRefs([{
                            name: ref.name,
                            oldObjectId: ref.objectId,
                            newObjectId: "0000000000000000000000000000000000000000"
                        }], sourceItemContext.repository.id).then(function () {
                            sourceItemContext.view.refresh();
                        });
                    });
                });
            }
        }
    };
}());

VSS.register("deleteBranchMenu", deleteBranchMenu);