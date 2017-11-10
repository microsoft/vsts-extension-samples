import { ChartComponent, ChromelessChartComponent} from '../components/ChartComponent';
import { AnalyticsWidgetSettings } from '../common/WidgetSettings';

import * as Q from 'q';
import * as React from 'react';

import { QueryExpand, WorkItemQueryResult, QueryHierarchyItem } from "TFS/WorkItemTracking/Contracts";
import { Props, State, ComponentBase, ActionsBase, ActionCreator } from "../components/FluxTypes";

import { CommonChartOptions } from "Charts/Contracts";
import { ChartsService } from "Charts/Services";

import { Store } from "VSS/Flux/Store";
import { BurndownResultsQuery, BurndownQueryOptions, GroupedWorkItemAggregation } from "../data/ViewQueries";
import { CacheableQueryService } from "../data/CacheableQueryService";
import { getService } from "VSS/Service";
import { ViewSize, QueryViewProps, QueryViewState, WidgetMessageType } from "./AnalyticsViewContracts";
import { ChartOptionFactory } from "./ChartOptionFactory";
import { AnalyticsViewActionCreator } from "./AnalyticsViewActionCreator";

export class AnalyticsViewComponent extends ComponentBase<QueryViewProps, QueryViewState> {
    private queryDataManager: AnalyticsViewActionCreator;

    //Unlike the config scenario, the view will be repainted with new props repeatedly. Here we update the data manager with new context, and request new data on each change.
    public componentWillReceiveProps(props: QueryViewProps) {
        this.queryDataManager.setInitialState(props.widgetConfiguration, props.suppressAnimation);
        this.initiateRequest();
    }

    public render(): JSX.Element {
        let content;
        if (!this.getStoreState().isLoading) {
            content = this.getStoreState().statusMessage ? this.renderFail() : this.renderSuccess();
        }else{
            content = this.loading();
        }
        return content;
    }

    public loading() {
        return <div className="empty-loading-state">Widget is running query. Please stand by.</div>;
    }

    public renderSuccess() {        
        return (
            <div className="widget-component">
                <h2 className="title">{this.props.title}</h2>
                {this.getChart()}
            </div>
        );
    }

    private getChart(){
        if(this.props.size.height<200 || this.props.size.width < 200){
            return <ChromelessChartComponent chartOptions={this.getStoreState().chartState} />;
        }else{
            return <ChartComponent chartOptions={this.getStoreState().chartState} />;
        }        
    }

    public renderFail() {
        return (
            <div className="widget-component">
                <div className="header-row">
                    <h2 className="title">{this.getStatusHeader()}</h2>
                </div>
                <div className="error-message">{this.getStoreState().statusMessage}</div>
            </div>);
    }

    protected createActionCreator(): ActionCreator<QueryViewState> {
        this.queryDataManager = new AnalyticsViewActionCreator(this.actions, this.props.widgetConfiguration, this.props.size, this.props.suppressAnimation);
        return this.queryDataManager;
    }

    private getStatusHeader(): string {
        let widgetMessageType = this.getStoreState().messageType;
        if (widgetMessageType == null) { widgetMessageType = WidgetMessageType.Failed };
        return  WidgetMessageType[widgetMessageType];
    }
}

