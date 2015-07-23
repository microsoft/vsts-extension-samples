/// <reference path='ref/VSS/VSS.d.ts' />
define(["require", "exports", "VSS/SDK/Services/ExtensionData", "q", "Scripts/NotesView"], function (require, exports, ExtensionData, Q, NotesView) {
    $(function () {
        $('.saveButton').on('click', function (eventObject) {
            saveSettings("User", ".user");
            saveSettings("Default", ".default");
        });
		
		$('.deleteButton').on('click', function (eventObject) {
			VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
				var deletePromise = extensionSettingsService.deleteDocument("$settings", "objectValue");
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
        VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
            extensionSettingsService.setValue("booleanValue", boolValue, {scopeType: scope}).then(function (value) {
            });
            extensionSettingsService.setValue("numberValue", numValue, {scopeType: scope}).then(function (value) {
            });
            extensionSettingsService.setValue("objectValue", objValue, {scopeType: scope}).then(function (value) {
            });
        });
    }
    function getSettings(scope, selector) {
        VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
            var boolPromise = extensionSettingsService.getValue("booleanValue", {scopeType: scope});
            var numPromise = extensionSettingsService.getValue("numberValue", {scopeType: scope});
            var objPromise = extensionSettingsService.getValue("objectValue", {scopeType: scope});
            Q.all([boolPromise, numPromise, objPromise]).spread(function (boolValue, numValue, objValue) {
                $(selector + " .booleanValue").prop("checked", boolValue);
                $(selector + " .numberValue").val(numValue ? numValue.toString() : "");
                $(selector + " .objectValue1").val(objValue ? objValue.val1 : "");
                $(selector + " .objectValue2").val(objValue ? objValue.val2 : "");
            });
        });
    }
	// function addNote(id, title desc) {
		// VSS.getService("settings-service", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
			// var note = {'id': id, 'title': title, 'description': desc};
			// extensionSettingsService.createDocument(note, "notes", {"ScopeType": "User"});
		// }
	// }
	// function editNote(note) {
		// VSS.getService("settings-service", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
			// extensionSettingsService.createDocument(note, "notes", {"ScopeType": "User"});
		// }
	// }
	// function deleteNote(noteId) {
		// VSS.getService("settings-service", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
			// extensionSettingsService.createDocument("notes", {"ScopeType": "User"}, noteId);
		// }
	// }
	// function getNotes() {
		// VSS.getService("settings-service", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
			// extensionSettingsService.getDocuments("notes", {"ScopeType": "User"});
		// }
	// }
});
//# sourceMappingURL=extension.js.map