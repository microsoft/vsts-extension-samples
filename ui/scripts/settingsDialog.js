/// <reference path='ref/VSS/VSS.d.ts' />
define(["require", "exports", "VSS/SDK/Services/ExtensionSettings", "q"], function (require, exports, ExtensionSettings, Q) {
    $(function () {
        //$('.settingsText').on('click', (eventObject: JQueryEventObject) => {
        //    VSS.getService("vss.dialogs").then(function (dialogSvc: Dialogs.HostDialogService) {
        //        var settingsForm;
        //        // Defines information about which contributed control to host in the iframe
        //        var controlContributionInfo = {
        //            id: "settingsDialog",
        //            extensionId: VSS.getExtensionContext().id,
        //            pointId: VSS.getExtensionContext().namespace + "#controls"
        //        };
        //        // Dialog-specific options
        //        var dialogOptions = <IHostDialogOptions> {
        //            title: "Extension Settings",
        //            width: 800,
        //            height: 600,
        //            //okCallback: (result: any) => {
        //            //    var promise = settingsForm.getBooleanValue();
        //            //    promise.then((booleanValue: boolean) => {
        //            //        VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then((extensionSettingsService: ExtensionSettings.ExtensionSettingsService) => {
        //            //            extensionSettingsService.setValue<boolean>("booleanValue", booleanValue, ExtensionSettings.ExtensionSettingScope.User).then((value: boolean) => {
        //            //            });
        //            //        });
        //            //    });
        //            //},
        //            getDialogResult: () => {
        //                var promise = settingsForm.getBooleanValue();
        //                promise.then((booleanValue: boolean) => {
        //                    VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then((extensionSettingsService: ExtensionSettings.ExtensionSettingsService) => {
        //                        extensionSettingsService.setValue<boolean>("booleanValue", booleanValue, ExtensionSettings.ExtensionSettingScope.User).then((value: boolean) => {
        //                        });
        //                    });
        //                });
        //                return true;
        //            }
        //        };
        //        // Invoke the openDialog method from the dialog service.
        //        dialogSvc.openDialog(controlContributionInfo, dialogOptions).then((dialog: IExternalDialog) => {
        //            dialog.getContributionInstance("settingsForm").then(function (settingsFormInstance: any) {
        //                settingsForm = settingsFormInstance;
        //                VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then((extensionSettingsService: ExtensionSettings.ExtensionSettingsService) => {
        //                    extensionSettingsService.getValue<boolean>("booleanValue", ExtensionSettings.ExtensionSettingScope.User).then((value: boolean) => {
        //                        settingsForm.setBooleanValue(value);
        //                    });
        //                });
        //            });
        //            dialog.updateOkButton(true);                
        //        });
        //    });
        //});
        $('.saveButton').on('click', function (eventObject) {
            saveSettings(ExtensionSettings.ExtensionSettingScope.User, ".user");
            saveSettings(ExtensionSettings.ExtensionSettingScope.Default, ".default");
        });
		
		$('.deleteButton').on('click', function (eventObject) {
			VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
				var deletePromise = extensionSettingsService.deleteDocument("objectValue", ExtensionSettings.ExtensionSettingScope.Default);
				deletePromise.then( function() {
					getSettings(ExtensionSettings.ExtensionSettingScope.Default, ".default");
				});
			});
		});
		
		getSettings(ExtensionSettings.ExtensionSettingScope.User, ".user");
        getSettings(ExtensionSettings.ExtensionSettingScope.Default, ".default");
        
    });
    function saveSettings(scope, selector) {
        var boolValue = $(selector + " .booleanValue").prop("checked");
        var numValue = parseInt($(selector + " .numberValue").val());
        var objValue = {
            val1: $(selector + " .objectValue1").val(),
            val2: $(selector + " .objectValue2").val()
        };
        VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
            extensionSettingsService.setValue("booleanValue", boolValue, scope).then(function (value) {
            });
            extensionSettingsService.setValue("numberValue", numValue, scope).then(function (value) {
            });
            extensionSettingsService.setValue("objectValue", objValue, scope).then(function (value) {
            });
        });
    }
    function getSettings(scope, selector) {
        VSS.getService("vss.extensionSettings", VSS.getExtensionContext().id).then(function (extensionSettingsService) {
            var boolPromise = extensionSettingsService.getValue("booleanValue", scope);
            var numPromise = extensionSettingsService.getValue("numberValue", scope);
            var objPromise = extensionSettingsService.getValue("objectValue", scope);
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