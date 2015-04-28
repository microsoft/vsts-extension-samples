export interface FeatureFlag {
    description: string;
    effectiveState: string;
    explicitState: string;
    name: string;
    uri: string;
}
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
