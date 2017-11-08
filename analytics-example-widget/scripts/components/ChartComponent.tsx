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
 * 
 */
export class ChartComponent extends React.Component<ChartComponentProps, any> {    
    //TODO: This is a temporary workaround to compensate for lack of dispose handler on Chart object, which is resolved with M126 binaries.
    //  After chart + dispose API exposed in updated public API, code associated with this can be removed.
    
    private isMounted:boolean=false;    

    public render() {
        return (
            <div className="chart-component"></div>
        );
    }

    public componentDidMount(): void {
        this.isMounted=true;
        this.ensureChartIsInstantiated(this.props.chartOptions);

    }

    public componentWillUnmount(): void {        
        this.ensureChartIsDisposed();
        this.isMounted=false;
    }

    public componentDidUpdate(): void {
        this.ensureChartIsInstantiated(this.props.chartOptions);
    }

    private ensureChartIsInstantiated(chartOptions: Chart_Contracts.CommonChartOptions) {
        Chart_Service.ChartsService.getService().then((chartService)=>{
            this.ensureChartIsDisposed();

            if (this.isMounted) {
                let container = ReactDOM.findDOMNode(this);
                let $wrappedContainer = $(container);

                if (chartOptions) {            
                    chartOptions = this.updateChartOptions(chartOptions);
                    chartService.createChart($wrappedContainer, chartOptions);            
                }
            }
        });
    }

    private ensureChartIsDisposed(): void {
        //TODO: Use Chart control dispose API, once it is available on public contract.
        if(this.isMounted){
            $(ReactDOM.findDOMNode(this)).empty();        
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