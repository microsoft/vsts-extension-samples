import Extension_Data = require("VSS/SDK/Services/ExtensionData");
import Q = require("q");

    
$(() => {
    $('.saveButton').on('click', (eventObject) => {
        saveSettings("User", ".user");
        saveSettings("Default", ".default");
    });
    
    getSettings("User", ".user");
    getSettings("Default", ".default");
    
});

function saveSettings(scope: string, selector: string) {
    const boolValue = $(selector + " .booleanValue").prop("checked");
    const numValue = parseInt($(selector + " .numberValue").val());
    const objValue = {
        val1: $(selector + " .objectValue1").val(),
        val2: $(selector + " .objectValue2").val()
    };
    VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: Extension_Data.ExtensionDataService) => {  
        dataService.setValue("booleanValue", boolValue, {scopeType: scope}).then((value: boolean) => {
        });
        dataService.setValue("numberValue", numValue, {scopeType: scope}).then((value: number) => {
        });
        dataService.setValue("objectValue", objValue, {scopeType: scope}).then((value: any) => {
        });
    });
}
function getSettings(scope: string, selector: string) {
    VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: Extension_Data.ExtensionDataService) => {  
        const boolPromise = dataService.getValue("booleanValue", {scopeType: scope});
        const numPromise = dataService.getValue("numberValue", {scopeType: scope});
        const objPromise = dataService.getValue("objectValue", {scopeType: scope});
        Q.all([boolPromise, numPromise, objPromise]).spread((boolValue: boolean, numValue: number, objValue: any) => {
            $(selector + " .booleanValue").prop("checked", boolValue);
            $(selector + " .numberValue").val(numValue ? numValue.toString() : "");
            $(selector + " .objectValue1").val(objValue ? objValue.val1 : "");
            $(selector + " .objectValue2").val(objValue ? objValue.val2 : "");
        });
    });
}
//# sourceMappingURL=extension.js.map