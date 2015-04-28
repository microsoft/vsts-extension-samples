/// <reference path="../References/VSS-Common.d.ts" />
/**
* Event data that can be published
*/
export declare class TelemetryEventData {
    area: string;
    feature: string;
    properties: {
        [key: string]: any;
    };
    elapsedTime: number;
    /**
     * Constructor for CIPublishPropertiesOptions.
     *
     * @param area The Customer Intelligence Area to publish to.
     * @param feature The feature name.
     * @param properties The key:value list of event properties.
     * @param elapsedTime The elapsedTime for the event. Defaults to Date.now() - startTime if startTime is supplied.
     * @param startTime The Date.now() at the start of the event process.
     */
    constructor(area: string, feature: string, properties: {
        [key: string]: any;
    }, startTime?: number, elapsedTime?: number);
    /**
    * Create Telemetry event data from a single property
    */
    static fromProperty(area: string, feature: string, property: string, value: any, startTime?: number, elapsedTime?: number): TelemetryEventData;
}
/**
* Publish event data to the CustomerIntelligence service and App insights.
* (events are queued and sent in delayed batches unless immediate = true is supplied)
*
* @param eventData telemetry event to publish
* @param immediate If true, make ajax calls to publish the event immediately. Otherwise queue the event and send in delayed batches.
*/
export declare function publishEvent(eventData: TelemetryEventData, immediate?: boolean): void;
