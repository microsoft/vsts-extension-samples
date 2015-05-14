export interface FeatureFlag {
    description: string;
    effectiveState: string;
    explicitState: string;
    name: string;
    uri: string;
}
/**
* This is passed to the FeatureFlagController to edit the status of a feature flag
*/
export interface FeatureFlagPatch {
    state: string;
}
export declare var TypeInfo: {
    FeatureFlag: {
        fields: any;
    };
    FeatureFlagPatch: {
        fields: any;
    };
};
