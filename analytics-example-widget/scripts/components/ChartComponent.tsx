import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Chart_Contracts from "Charts/Contracts";
import * as Chart_Service from "Charts/Services";

/**
 * Stateless parameters (creation-time) for constructing a ChartComponent.
 */
export class ChartComponentProps {
    chartOptions: Chart_Contracts.CommonChartOptions
}

/**
 * This Component class deals with Interop to the existing VSTS Charting API, which consumes a parent JQuery element to render.
 * As the chart Service Promise has latency to fulfill, there is an async risk with rendering here, currently.
 * Chart SDK will be updated to directly support this scenario. 
 */
export class ChartComponent extends React.Component<ChartComponentProps, any> {    
    private chartServicePromise: IPromise<Chart_Service.IChartsService> = Chart_Service.ChartsService.getService();
    // NOTE: The state variables here are temporary workarounds to compensate for lack of public dispose handler from Chart Service API, which is resolved with M126 binaries.
    // After chart + dispose API are exposed in updated public API, code associated with this can be removed.    
    private $wrappedContainer: JQuery;
    
    //Track mount state, due to async chart creation.
    private isMounted: boolean;


    public render() {
        return (
            <div className="chart-component"></div>
        );
    }

    public componentDidMount(): void {
        this.isMounted = true;
        this.ensureChartIsInstantiated(this.props.chartOptions);

    }

    public componentWillUnmount(): void {
        this.ensurePriorInstancesAreCleared();
        this.isMounted = false;
    }

    public componentDidUpdate(): void {
        this.ensureChartIsInstantiated(this.props.chartOptions);
    }

    private ensureChartIsInstantiated(chartOptions: Chart_Contracts.CommonChartOptions) {
        //Due to asynchronous nature of chart rendering in relation to REACT events, some safety checks are needed, until public API can correct for async flow. 
        this.chartServicePromise.then((chartService) => {
            this.ensurePriorInstancesAreCleared();

            if(this.isMounted){
                let container = ReactDOM.findDOMNode(this);
                if(container){
                    this.$wrappedContainer = $(container);

                    if (chartOptions) {
                        chartOptions = this.updateChartOptions(chartOptions);
                        chartService.createChart(this.$wrappedContainer, chartOptions);
                    }
                }
            }
        });
    }

    /**
     * This step is neccessary to remove the chart content
     */
    private ensurePriorInstancesAreCleared(): void {
        if (this.$wrappedContainer) {
            //Remove children of this component.
            this.$wrappedContainer.empty();
        }
    }

    /** Extensibility hook for derived type to modify chart options. */
    protected updateChartOptions(chartOptions: Chart_Contracts.CommonChartOptions): Chart_Contracts.CommonChartOptions {
        return chartOptions;
    }
}

/** Renders Chart as with ChartComponent, while overriding specific settings for presentational chrome to make the best of limited space:
 * 1- suppress axis labels & ticks.
 * 2- suppress legends.
 * 3- tooltips only show a compact single row.
 *  Any other options around these settings remain unmodified. */
export class ChromelessChartComponent extends ChartComponent {
    protected updateChartOptions(chartOptions: Chart_Contracts.CommonChartOptions): Chart_Contracts.CommonChartOptions {
        chartOptions.xAxis = chartOptions.xAxis || {};
        chartOptions.xAxis.labelsEnabled = false;
        chartOptions.xAxis.markingsEnabled = false;

        chartOptions.yAxis = chartOptions.yAxis || {};
        chartOptions.yAxis.labelsEnabled = false;
        chartOptions.yAxis.markingsEnabled = false;

        chartOptions.legend = chartOptions.legend || {};
        chartOptions.legend.enabled = false;

        chartOptions.tooltip = chartOptions.tooltip || {};
        chartOptions.tooltip.onlyShowFocusedSeries = true;
        return chartOptions;
    }
}