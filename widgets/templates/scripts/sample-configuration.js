VSS.init({
	explicitNotifyLoaded: true,
	usePlatformStyles: true
});

function validateNameTextInput($nameInput, $errorSingleLineInput){
	if ($nameInput.val() == ""){
		$errorSingleLineInput.text("Please enter your name.");
		$errorSingleLineInput.parent().css("visibility", "visible");
		return;
	}
	$errorSingleLineInput.parent().css("visibility", "hidden");
	return true;
}

function validateQueryDropdown($queryDropdown, $errordropdown){					
	if ($queryDropdown.val().indexOf("Fake") > -1){
		$errordropdown.text("Please select a valid query");
		$errordropdown.parent().css("visibility", "visible");
		return false;
	} 
	$errordropdown.parent().css("visibility", "hidden");
	return true;
}

function validateCheckbox($errorcheckbox){					
	if ($("#select-results input:checked").length == 0){
		$errorcheckbox.text("Please select at least one option.");
		$errorcheckbox.parent().css("visibility", "visible");
		return false;										
	} 
	$errorcheckbox.parent().css("visibility", "hidden");
	return true;
}

function validateRadioButtons($errorradio){					
	if ($("#display-options input:checked").length == 0){
		$errorradio.text("Please select at least one option.");
		$errorradio.parent().css("visibility", "visible");
		return false;										
	} 
	$errorradio.parent().css("visibility", "hidden");
	return true;
}

function getCustomSettings(){
	var showResults = [];
	$.each($("#select-results input:checked"), function(index, element){
			showResults.push($(element).val());									
		});
					
	var customSettings = {
		data: JSON.stringify({
				queryPath: $("#query-path-dropdown select").val(), 
				displayOptions: $("#display-options input:checked").val(),
				results: showResults,
				name: $("#name-input input").val()
			})
	};
	return customSettings;
}
				
VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
	WidgetHelpers.IncludeWidgetConfigurationStyles();
	
	VSS.register("Sample-Configuration", function () {   
		var $queryDropdown = $("#query-path-dropdown select");						
		var $checkedboxes = $("#select-results input");
		var $radio = $("#display-options input");
		var $nameInput = $("#name-input input");
								
		var $errorradio = $("#display-options .validation-error > .validation-error-text");
		var $errorcheckbox = $("#select-results .validation-error > .validation-error-text");					
		var $errordropdown = $("#query-path-dropdown .validation-error > .validation-error-text");						
		var $errorSingleLineInput = $("#name-input .validation-error > .validation-error-text");
		
		return {
			load: function (widgetSettings, widgetConfigurationContext) {
				var settings = JSON.parse(widgetSettings.customSettings.data);
				if (settings && settings.queryPath) {
					 $queryDropdown.val(settings.queryPath);
				 }
				
				$nameInput.on("input", function(){
					if (validateNameTextInput($nameInput, $errorSingleLineInput)){
						widgetConfigurationContext.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(getCustomSettings()));
					} 
				});
				
				 $queryDropdown.on("change", function () {
					if (validateQueryDropdown($queryDropdown, $errordropdown)){
						widgetConfigurationContext.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(getCustomSettings()));
					} 
				 });
				 
				$checkedboxes.on("change", function(){
					if (validateCheckbox($errorcheckbox)){
						widgetConfigurationContext.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(getCustomSettings()));
					}									
				});
				
				$radio.on("change", function(){
					if (validateRadioButtons($errorradio)){
						widgetConfigurationContext.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(getCustomSettings()));
					}
				});
															
				return WidgetHelpers.WidgetStatusHelper.Success();
			},
			onSave: function() {
				
				var checkboxValid = validateCheckbox($errorcheckbox);
				var radioValid = validateRadioButtons($errorradio);
				var nameValid = validateNameTextInput($nameInput, $errorSingleLineInput);
				var queryValid = validateQueryDropdown($queryDropdown, $errordropdown)
				
				if (!checkboxValid || !radioValid || !nameValid || !queryValid){
					return WidgetHelpers.WidgetConfigurationSave.Invalid();
				}
											
				return WidgetHelpers.WidgetConfigurationSave.Valid(getCustomSettings());
			}
		}
	});
	
	
	VSS.notifyLoadSucceeded();
});