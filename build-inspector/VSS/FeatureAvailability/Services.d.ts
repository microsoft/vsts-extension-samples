/// <reference path="../References/VSS-Common.d.ts" />
import Service = require("VSS/Service");
/**
* Service to manage feature availability data
*/
export declare class FeatureAvailabilityService extends Service.VssService {
    private _featureStatesCache;
    private _checkedForDataIsland;
    private _httpClient;
    constructor();
    /**
     * Uses the default service to perform a local-only check to determine if the feature is enabled.
     * This requires the feature to be present on the the page scope feature-availability-data island.
     *
     * @param featureName Feature name
     * @param defaultValue Value to return if the feature is not present in page context data.
     */
    static isFeatureEnabled(featureName: string, defaultValue?: boolean): boolean;
    /**
     * Returns whether or not a feature is enabled.
     *
     * @param featureName Feature name
     * @param callback
     * Success callback, taking one parameter (boolean) - the feature availability state
     *
     * @param errorCallback Error callback
     */
    beginIsFeatureEnabled(featureName: string, callback: IResultCallback, errorCallback?: IErrorCallback): void;
    /**
     * Performs a local-only check to determine if the feature is enabled. This requires the feature to be present on the the page scope feature-availability-data island.
     *
     * @param featureName Feature name
     * @param defaultValue Value to return if the feature is not present in page context data.
     */
    isFeatureEnabledLocal(featureName: string, defaultValue?: boolean): boolean;
    /**
     * Returns the cache state for the supplied feature after ensuring the data island has been read.
     */
    private _readLocalState(featureName);
    /**
     * Checks the data island for feature availability data.
     */
    private _checkDataIsland();
}
