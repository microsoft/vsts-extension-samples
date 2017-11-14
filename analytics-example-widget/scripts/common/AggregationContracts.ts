/**
 * Describes state for rendering Aggregation configuration component.
 */
export interface AggregationConfigurationState {
    aggregationModes: string[];
    allowedFields: Aggregation[];
}

/**
 * Contains a display value and a query friendly value to be consumed by the odata query.
 * AggregationMode describes if the query uses a count or a sum of workitems.
 */
export interface Aggregation {
    aggregationMode: AggregationMode;
    displayName: string;
    fieldReferenceName: string;
    queryableName: string;

}

export enum AggregationMode {
    count = "Count",
    sum = "Sum"
}