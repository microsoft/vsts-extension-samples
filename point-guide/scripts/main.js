window.main = (function () {
    "use strict";
    return {
        showPropertiesInDialog: function(properties, title) {
            
            VSS.getService("vss.dialogs").then(function (dialogSvc) {
                
                var controlContributionInfo = {
                    id: "contextForm",
                    extensionId: VSS.getExtensionContext().id,
                    pointId: VSS.getExtensionContext().namespace + "#controls"
                };
                
                var dialogOptions = {
                    title: title || "Properties",
                    width: 800,
                    height: 600,
                    buttons: null
                };
                
                var contributionConfig = { 
                    properties: properties
                };
                
                dialogSvc.openDialog(controlContributionInfo, dialogOptions, contributionConfig);
            });
        },
        contributionAction: function(actionContext) {
            this.showPropertiesInDialog(actionContext);
        }
    };
}());