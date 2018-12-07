var showCommitsMenu = (function () {
    "use strict";
    return <IContributedMenuSource> {
        getMenuItems: null,
        execute: function (actionContext: any): void {
            // Get the Web Context to create the uri to navigate to
            var vsoContext = VSS.getWebContext();
            var extensionContext = VSS.getExtensionContext();
            // Navigate to the new View Associated Work Items hub.  fabrikam.build is the namespace of the app and build.items is the id of the hub.
            window.parent.location.href = vsoContext.host.uri
                + vsoContext.project.name 
                + "/_apps/hub/" 
                + extensionContext.publisherId
                + "."
                + extensionContext.extensionId 
                + ".build.items?buildUri=" 
                + actionContext.uri;
        }
    };
}());

VSS.register("showCommits", showCommitsMenu);
