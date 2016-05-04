VSS.init({
	explicitNotifyLoaded: true,
	usePlatformStyles: true
});
	   
VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"], function (WidgetHelpers, TFS_Wit_WebApi) {
	WidgetHelpers.IncludeWidgetStyles();
	VSS.register("Widget-for-sample-configuration", function () {
		var projectId = VSS.getWebContext().project.id;

		var getQueryInfo = function (widgetSettings) {
			// Extract query path from widgetSettings.customSettings and ask user to configure one if none is found
			var settings = JSON.parse(widgetSettings.customSettings.data);
			if (!settings || !settings.queryPath) {
				var $container = $('#query-info-container');
				$container.empty();
				$container.text("Nothing to show. Please select a query.");

				return WidgetHelpers.WidgetStatusHelper.Success();
			}

			// Get a WIT client to make REST calls to VSTS
			return TFS_Wit_WebApi.getClient().getQuery(projectId, settings.queryPath)
				.then(function (query) {
					var $widgetTitle = $('h2');
					if (settings.name) {
						$widgetTitle.text("Hello " + settings.name);
					} 					
					
					var $container = $('#query-info-container');
					$container.empty();
					
					var $list = (settings.displayOptions == "ordered") ? $('<ol>') : $('<ul>');
					if ($.inArray("id", settings.results) > -1){
						$list.append($('<li>').text("Query Id: " + query.id));
					}
					if ($.inArray("name", settings.results) > -1){
						$list.append($('<li>').text("Query Name: " + query.name));
					}
					if ($.inArray("createdBy", settings.results) > -1){
						$list.append($('<li>').text("Created By: " + (query.createdBy ? query.createdBy.displayName:"<unknown>") ));
					}
					
					$container.append($list);
					

					// Use the widget helper and return success as Widget Status
					return WidgetHelpers.WidgetStatusHelper.Success();
				}, function (error) {
					// Use the widget helper and return failure as Widget Status
					return WidgetHelpers.WidgetStatusHelper.Failure(error.message);
				});
		}

		return {
			load: function (widgetSettings) {
				return getQueryInfo(widgetSettings);
			},
			reload: function (widgetSettings) {
				return getQueryInfo(widgetSettings);
			}
		}
	});
	VSS.notifyLoadSucceeded();
});