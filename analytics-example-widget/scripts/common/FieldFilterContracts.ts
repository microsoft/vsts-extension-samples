import { WorkItemTypeField } from "../data/AnalyticsTypes";

/**
 * Describes state for rendering Field filter configuration component.
 */
export interface FieldFilterConfigurationState {
    fieldFilterRowValues: FieldFilterRowData[];
    addRow: () => void;
}

/**
 * Describes operators supported in the field filter.
 */
export interface AllowedOperator {
    DisplayText: string;
    value: string;
}
/**
 * Encapsulates the state, for use by both config & query execution
 */
export interface FieldFilterRowSettings {
    fieldReferenceName: string;
    operator: string;
    value: string;

    //Cached information to avoid extra View-side queries to Metadata and the Field Type entity. This runs risk of information being invalidated if a project admin re-configures an existing field(uncommon, but it does happen).
    fieldQueryName: string;
    fieldType: string;
}

/**
 * Encapsulates the core configuration state, including supporting values
 */
export interface FieldFilterRowData {
    /** Minimal state needed to render the view. */
    settings: FieldFilterRowSettings;

    /** Available fields for the row */
    allowedFields: WorkItemTypeField[];

    /** Available operators for the row */
    allowedOperators: AllowedOperator[];

    /** Suggested values for the row */
    suggestedValues: string[];
    removeRow: () => void;

    updateField: (field: WorkItemTypeField) => void;
    updateOperator: (operator: string) => void;
    updateValue: (value: string) => void;

}

//NOTE: Config UI state needs to provide allowed values, whereas on widget rendering, we want to use a streamlined state.