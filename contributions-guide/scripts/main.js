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

VSS.register("sourceGridDynamicMenu", {
    execute: function (actionArgs) {
        alert("execute: " + (JSON.stringify(actionArgs) || "").substr(0, 100));
    },
    getMenuItems: function (context) {
        var menuItems = [
            {
                title: "Sample: " + context.item.path,
                action: function (actionContext) {
                    alert("action: " + actionContext.item.path);
                }
            },
            {
                title: "Disabled parent item",
                disabled: true
            },
            {
                separator: true
            },
            {
                title: "Parent menu",
                childItems: [
                    { title: "Child item 1" },
                    { title: "Child item 2 - disabled", disabled: true },
                    { title: "Child item 3"}
                ]
            },
        ];
        
        if (context.item.path === "/README.md") {
            menuItems.push({ separator: true });
            menuItems.push({
                title: "Extra entry for README.md"
            });
        }
        
        return menuItems;
    }
});