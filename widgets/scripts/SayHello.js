VSS.init({
	explicitNotifyLoaded: true,
	usePlatformStyles: true
});
	   
VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
	VSS.register("SampleTemplate1", function () {
		WidgetHelpers.IncludeWidgetStyles();
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	});
	VSS.register("SampleTemplate2", function () {
		WidgetHelpers.IncludeWidgetStyles();
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	});
		VSS.register("SampleTemplate3", function () {
		WidgetHelpers.IncludeWidgetStyles();
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	});
	VSS.register("SampleTemplate4", function () {
		WidgetHelpers.IncludeWidgetStyles();
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	});
		VSS.register("SampleTemplate5", function () {
		WidgetHelpers.IncludeWidgetStyles();
		return {
			load: function (widgetSettings) {				
				return WidgetHelpers.WidgetStatusHelper.Success();
			}
		}
	});
	VSS.notifyLoadSucceeded();
});