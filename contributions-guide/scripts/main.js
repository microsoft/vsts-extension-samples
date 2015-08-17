var showPropertiesMenuProvider = (function () {
    "use strict";
    return {
        showPropertiesInDialog: function(properties, title) {
            
            VSS.getService("ms.vss-web.dialog-service").then(function (dialogSvc) {
                
                var extInfo = VSS.getExtensionContext();
                
                var dialogOptions = {
                    title: title || "Properties",
                    width: 800,
                    height: 600,
                    buttons: null
                };
                
                var contributionConfig = { 
                    properties: properties
                };
                
                dialogSvc.openDialog(extInfo.publisherId + "." + extInfo.extensionId + "." + "contextForm", dialogOptions, contributionConfig);
            });
        },
        execute: function(actionContext) {
            this.showPropertiesInDialog(actionContext);
        }
    };
}());

VSS.register("showProperties", function (context) {
    return showPropertiesMenuProvider;
});