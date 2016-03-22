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
	
	VSS.register("SampleTemplate1", registerWidget);
	VSS.register("SampleTemplate2", registerWidget);
	VSS.register("SampleTemplate3", registerWidget);
	VSS.register("SampleTemplate4", registerWidget);
	VSS.register("SampleTemplate5", registerWidget);
	
	
	VSS.notifyLoadSucceeded();
});