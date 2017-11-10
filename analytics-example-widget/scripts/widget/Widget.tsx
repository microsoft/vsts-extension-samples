/// <reference types="vss-web-extension-sdk" />

import * as Q from 'q';
import * as React from 'react';
import ReactDOM = require('react-dom');

import WidgetHelpers = require('TFS/Dashboards/WidgetHelpers');
import WidgetContracts = require('TFS/Dashboards/WidgetContracts');
import TFS_Wit_WebApi = require('TFS/WorkItemTracking/RestClient');

import { AnalyticsWidgetSettings, WidgetSettingsHelper } from '../common/WidgetSettings';
import { ViewSize } from "./AnalyticsViewContracts";
import { AnalyticsViewComponent } from "./AnalyticsViewComponent";

import { QueryExpand, QueryHierarchyItem, WorkItemQueryResult, QueryType } from "TFS/WorkItemTracking/Contracts";

export class Widget {
    public load(widgetSettings: WidgetContracts.WidgetSettings) {
        return this.render(widgetSettings);
    }

    public reload(widgetSettings: WidgetContracts.WidgetSettings) {

        return this.render(widgetSettings, true);
    }

    private render(widgetSettings: WidgetContracts.WidgetSettings, suppressAnimation:boolean= false): IPromise<WidgetContracts.WidgetStatus> {
        let analyticsWidgetSettings = WidgetSettingsHelper.Parse<AnalyticsWidgetSettings>(widgetSettings.customSettings.data);
        let size = {
            width: widgetSettings.size.columnSpan * 160 + 10,
            height: widgetSettings.size.rowSpan * 160 + 10
        };

        var $reactContainer = $(".react-container");
        //Ensure widget occupies full available space.
        $reactContainer
            .css("width", size.width)
            .css("height", size.height)


        let container = $reactContainer.eq(0).get()[0];
        ReactDOM.render(<AnalyticsViewComponent widgetConfiguration={analyticsWidgetSettings} title={widgetSettings.name} size={size} suppressAnimation={suppressAnimation} />, container) as React.Component<any, any>;
        
        return WidgetHelpers.WidgetStatusHelper.Success();
    }
}

WidgetHelpers.IncludeWidgetStyles();
VSS.register("AnalyticsExampleWidget.Widget", function () {
    return new Widget();
});
