import Contracts = require("VSS/Locations/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class LocationsHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * This was copied and adapted from TeamFoundationConnectionService.Connect()
     *
     * @param {VSS_Common_Contracts.ConnectOptions} connectOptions
     * @param {number} lastChangeId - Obsolete 32-bit LastChangeId
     * @param {number} lastChangeId64 - Non-truncated 64-bit LastChangeId
     * @return IPromise<Contracts.ConnectionData>
     */
    getConnectionData(connectOptions?: VSS_Common_Contracts.ConnectOptions, lastChangeId?: number, lastChangeId64?: number): IPromise<Contracts.ConnectionData>;
    /**
     * @param {string} serviceType
     * @param {string} identifier
     * @return IPromise<void>
     */
    deleteServiceDefinition(serviceType: string, identifier: string): IPromise<void>;
    /**
     * @param {string} serviceType
     * @param {string} identifier
     * @return IPromise<Contracts.ServiceDefinition>
     */
    getServiceDefinition(serviceType: string, identifier: string): IPromise<Contracts.ServiceDefinition>;
    /**
     * @param {string} serviceType
     * @return IPromise<Contracts.ServiceDefinition[]>
     */
    getServiceDefinitions(serviceType?: string): IPromise<Contracts.ServiceDefinition[]>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.ServiceDefinition[]>} serviceDefinitions
     * @return IPromise<void>
     */
    updateServiceDefinitions(serviceDefinitions: VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.ServiceDefinition[]>): IPromise<void>;
}
