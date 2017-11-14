import { FieldFilterRowSettings } from "./FieldFilterContracts";
import { Aggregation, AggregationMode } from "./AggregationContracts";

export interface WidgetSettings { }

export interface AnalyticsWidgetSettings extends WidgetSettings {
    projectId: string;
    teamId: string;
    workItemType: string;
    aggregation: Aggregation;
    fields: FieldFilterRowSettings[];
}

/**
 * Determines if the settings are valid to save.
 */
export function areSettingsValid(widgetSettings: AnalyticsWidgetSettings): boolean {
    return (widgetSettings.projectId != null &&
        widgetSettings.teamId != null &&
        widgetSettings.workItemType != null &&
        widgetSettings.fields != null &&
        widgetSettings.fields.every(o =>
            o.fieldQueryName != null &&
            o.fieldReferenceName != null &&
            o.fieldType != null &&
            o.operator != null &&
            o.value != null &&
            (o.value != "" || o.fieldType == "String")) &&//Do not allow empty string when dealing with value types.
        (widgetSettings.aggregation.aggregationMode != null &&
            (widgetSettings.aggregation.aggregationMode == AggregationMode.count ||
                (widgetSettings.aggregation.displayName != null &&
                    widgetSettings.aggregation.queryableName != null &&
                    widgetSettings.aggregation.fieldReferenceName != null)
            )
        )
    );
}


export class WidgetSettingsHelper<T extends WidgetSettings> {
    public static Serialize<T>(widgetSettings: T): string {
        return JSON.stringify(widgetSettings);
    }

    public static Parse<T>(settingsString: string): T {
        let settings = JSON.parse(settingsString);
        if (!settings) {
            settings = {};
        }
        return settings;
    }
}