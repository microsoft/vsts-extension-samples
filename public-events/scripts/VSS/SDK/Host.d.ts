/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="../References/q.d.ts" />
import Contribution_Services = require("VSS/Contributions/Services");
import Service = require("VSS/Service");
export declare class HostManagementService extends Service.VssService {
    /**
    * Get an instance of a contributed service.
    *
    * @param serviceId Id of the vss.web#service contribution to get the instance of
    * @param context Optional context information to use when obtaining the service instance
    */
    getService<T>(serviceId: string, context?: Object): IPromise<T>;
    /**
    * Get contributions for a given contribution point id. Optionally instantiate the registered object
    * for each instance id.
    *
    * @param contributionPointId Contribution point id to query
    * @param contributionId Optional filter to only include contributions with the given id
    */
    getServiceContributions<T>(contributionPointId: string, contributionId?: string): IPromise<IServiceContribution[]>;
    /**
    * Create an instance of a registered object within the given contribution
    *
    * @param contribution The contribution to get an object from
    * @param objectId Optional id of the registered object (the contribution's id property is used by default)
    * @param contextData Optional context to use when getting the object.
    */
    getBackgroundContributionInstance<T>(contribution: Contribution_Services.Contribution, objectId?: string, contextData?: any): IPromise<T>;
}
