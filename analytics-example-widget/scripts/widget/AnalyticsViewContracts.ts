import { CommonChartOptions } from "Charts/Contracts";
import { AnalyticsWidgetSettings, WidgetSettings } from '../common/WidgetSettings';
import { Props, State } from "../components/FluxTypes";

//Size, expressed in pixels.
export interface ViewSize {
    width: number;
    height: number;
}

export interface QueryViewProps extends Props {
    title: string;
    size: ViewSize;
    widgetConfiguration: AnalyticsWidgetSettings;    
    suppressAnimation: boolean;
}

export interface QueryViewState extends State {
    isLoading: boolean;

    /**
     * This is used for presenting error/status information, in lieu of a chart.
     */
    statusMessage: string;

    /**
     * Used for describing the type of status message. Affects the widget header.
     */
    messageType?: WidgetMessageType;
    chartState: CommonChartOptions;
}

export enum WidgetMessageType {
    Failed,
    Warning
}