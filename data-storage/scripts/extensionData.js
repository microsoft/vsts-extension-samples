/// <reference path='../typings/main.d.ts' />

define(["require", "exports", "VSS/SDK/Services/ExtensionData", "q" ], function (require, exports, ExtensionData, Q) {
    
    $(function () {
        $('.saveButton').on('click', function (eventObject) {
            saveSettings("User", ".user");
            saveSettings("Default", ".default");
        });
		
		$('.deleteButton').on('click', function (eventObject) {
			VSS.getService(VSS.ServiceIds.ExtensionData).then(function(dataService) {                
				var deletePromise = dataService.deleteDocument("$settings", "objectValue");
				deletePromise.then( function() {
					getSettings("Default", ".default");
				});
			});
		});
		
		getSettings("User", ".user");
        getSettings("Default", ".default");
        
        NotesView.NotesView.enhance(NotesView.NotesView, $("#ess-extension"), {
            
        });
        
    });
    function saveSettings(scope, selector) {
        var boolValue = $(selector + " .booleanValue").prop("checked");
        var numValue = parseInt($(selector + " .numberValue").val());
        var objValue = {
            val1: $(selector + " .objectValue1").val(),
            val2: $(selector + " .objectValue2").val()
        };
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
            dataService.setValue("booleanValue", boolValue, {scopeType: scope}).then(function (value) {
            });
            dataService.setValue("numberValue", numValue, {scopeType: scope}).then(function (value) {
            });
            dataService.setValue("objectValue", objValue, {scopeType: scope}).then(function (value) {
            });
        });
    }
    function getSettings(scope, selector) {
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
            var boolPromise = dataService.getValue("booleanValue", {scopeType: scope});
            var numPromise = dataService.getValue("numberValue", {scopeType: scope});
            var objPromise = dataService.getValue("objectValue", {scopeType: scope});
            Q.all([boolPromise, numPromise, objPromise]).spread(function (boolValue, numValue, objValue) {
                $(selector + " .booleanValue").prop("checked", boolValue);
                $(selector + " .numberValue").val(numValue ? numValue.toString() : "");
                $(selector + " .objectValue1").val(objValue ? objValue.val1 : "");
                $(selector + " .objectValue2").val(objValue ? objValue.val2 : "");
            });
        });
    }
	
});
//# sourceMappingURL=extension.js.map