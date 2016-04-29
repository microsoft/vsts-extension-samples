VSS.init({
	explicitNotifyLoaded: true,
	usePlatformStyles: true
});
	   
VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
	WidgetHelpers.IncludeWidgetStyles();
	
	var registerWidget = function(){
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	}
	
	VSS.register("Title-Description", registerWidget);
	VSS.register("Title-Subtitle-SameLine", registerWidget);
	VSS.register("Title-Subtitle-NextLine", registerWidget);
	VSS.register("Counter", registerWidget);
	VSS.register("Clickable-Counter", registerWidget);
	VSS.register("Link-With-Icon-Text", registerWidget);
	
	
	VSS.notifyLoadSucceeded();
});