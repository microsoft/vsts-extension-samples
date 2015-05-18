var showPropertiesMenuProvider = (function () {
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
                title: "Sample: " + context.name,
                action: function (actionContext) {
                    alert("action: " + actionContext.name);
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
        
        if (context.name === "README.md") {
            menuItems.push({ separator: true });
            menuItems.push({
                title: "Extra entry for README.md"
            });
        }
        
        return menuItems;
    }
});