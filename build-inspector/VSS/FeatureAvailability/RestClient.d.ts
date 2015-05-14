import Contracts = require("VSS/FeatureAvailability/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class FeatureAvailabilityHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * Retrieve a listing of all feature flags and their current states for a user
     *
     * @param {string} userEmail - The email of the user to check
     * @return IPromise<Contracts.FeatureFlag[]>
     */
    getAllFeatureFlags(userEmail?: string): IPromise<Contracts.FeatureFlag[]>;
    /**
     * Retrieve information on a single feature flag and its current states
     *
     * @param {string} name - The name of the feature to retrieve
     * @return IPromise<Contracts.FeatureFlag>
     */
    getFeatureFlagByName(name: string): IPromise<Contracts.FeatureFlag>;
    /**
     * Retrieve information on a single feature flag and its current states for a user
     *
     * @param {string} name - The name of the feature to retrieve
     * @param {string} userEmail - The email of the user to check
     * @return IPromise<Contracts.FeatureFlag>
     */
    getFeatureFlagByNameAndUserEmail(name: string, userEmail: string): IPromise<Contracts.FeatureFlag>;
    /**
     * Retrieve information on a single feature flag and its current states for a user
     *
     * @param {string} name - The name of the feature to retrieve
     * @param {string} userId - The id of the user to check
     * @return IPromise<Contracts.FeatureFlag>
     */
    getFeatureFlagByNameAndUserId(name: string, userId: string): IPromise<Contracts.FeatureFlag>;
    /**
     * Change the state of an individual feature flag for a name
     *
     * @param {Contracts.FeatureFlagPatch} state - State that should be set
     * @param {string} name - The name of the feature to change
     * @param {string} userEmail
     * @return IPromise<Contracts.FeatureFlag>
     */
    updateFeatureFlag(state: Contracts.FeatureFlagPatch, name: string, userEmail?: string): IPromise<Contracts.FeatureFlag>;
}
