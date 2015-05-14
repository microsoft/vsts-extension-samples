/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
export interface IVssSdk {
    /**
    * Get a contributed service from the parent host.
    *
    * @param serviceId Id of the vss.web#service contribution to get the instance of
    * @param context Optional context information to use when obtaining the service instance
    */
    getService<T>(serviceId: string, context?: Object): IPromise<T>;
    /**
    * For a given contribution point id, get contributions which contribute background services.
    *
    * @param contributionPointId Contribution point id to query
    * @param contributionId Optional filter to only include contributions with the given id
    */
    getServiceContributions(contributionPointId: string, contributionId?: string): IPromise<IServiceContribution[]>;
    /**
    * Register an object (instance or factory method) that this extension exposes to the host frame.
    *
    * @param instanceId unique id of the registered object
    * @param instance Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    register(instanceId: string, instance: Object | {
        (contextData?: any): Object;
    }): void;
}
export declare var VSS: IVssSdk;
