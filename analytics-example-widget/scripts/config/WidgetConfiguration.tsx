
/// <reference types="vss-web-extension-sdk" />

import * as Q from 'q';
import * as React from 'react';
import ReactDOM = require('react-dom');


import WidgetHelpers = require('TFS/Dashboards/WidgetHelpers');
import WidgetContracts = require('TFS/Dashboards/WidgetContracts');
import { AnalyticsWidgetSettings, WidgetSettingsHelper, areSettingsValid } from '../common/WidgetSettings';
import { AnalyticsConfigComponent } from "./AnalyticsConfigComponent";

/** Demonstrates a widget configuration which:
 * 1-Deserializes existing settings
 * 2-Renders config UI with those settings
 * 3-Notifies widget contract of changes in configuration
 */
class WidgetConfiguration {
    private widgetConfigurationContext: WidgetContracts.IWidgetConfigurationContext;
    private settings: AnalyticsWidgetSettings;

    public load(widgetSettings: WidgetContracts.WidgetSettings,
        widgetConfigurationContext: WidgetContracts.IWidgetConfigurationContext): IPromise<WidgetContracts.WidgetStatus> {

        this.widgetConfigurationContext = widgetConfigurationContext;
        this.settings = WidgetSettingsHelper.Parse<AnalyticsWidgetSettings>(widgetSettings.customSettings.data);

        var $reactContainer = $(".react-container");
        let container = $reactContainer.eq(0).get()[0];
        try {
            ReactDOM.render(<AnalyticsConfigComponent initialConfiguration={this.settings} onChange={(settings: AnalyticsWidgetSettings) => { this.onChange(settings) }} />, container) as React.Component<any, any>;
        }
        catch (e) {
            return WidgetHelpers.WidgetStatusHelper.Failure(e);
        }

        //After all initial loading is done, signal to framework about sizing
        VSS.resize();
        return WidgetHelpers.WidgetStatusHelper.Success();
    }

    /** Handles config contract requests to validate the state of the configuration. */
    public onSave(): IPromise<WidgetContracts.SaveStatus> {
        return WidgetHelpers.WidgetConfigurationSave.Valid(this.getCustomSettings());
    }

    /** Handles Config contract requests for configuration.  */
    public getCustomSettings(): WidgetContracts.CustomSettings {
        return {
            data: WidgetSettingsHelper.Serialize<AnalyticsWidgetSettings>(this.settings)
        };
    }

    // Responsible for packaging up current state for notification to the config context.
    private onChange(settings: AnalyticsWidgetSettings): void {
        //Notify parent of config resize, if the # of custom fields has changed
        if(this.settings && (this.settings.fields.length != settings.fields.length)){
            VSS.resize(); 
        }

        this.settings = settings;
        

        //If Settings are valid, notify the widget to repaint.        
        if (areSettingsValid(this.settings)) {
            var eventName = WidgetHelpers.WidgetEvent.ConfigurationChange;
            var eventArgs = WidgetHelpers.WidgetEvent.Args(this.getCustomSettings());
            this.widgetConfigurationContext.notify(eventName, eventArgs);            
        }
    }   
}

VSS.register("AnalyticsExampleWidget.Configuration", function () {
    let widgetConfiguration = new WidgetConfiguration();
    return widgetConfiguration;
});