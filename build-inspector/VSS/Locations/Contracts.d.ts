import VSS_Identities_Contracts = require("VSS/Identities/Contracts");
export interface AccessMapping {
    accessPoint: string;
    displayName: string;
    moniker: string;
}
/**
* Data transfer class that holds information needed to set up a connection with a VSS server.
*/
export interface ConnectionData {
    /**
    * The Id of the authenticated user who made this request. More information about the user can be obtained by passing this Id to the Identity service
    */
    authenticatedUser: VSS_Identities_Contracts.Identity;
    /**
    * The Id of the authorized user who made this request. More information about the user can be obtained by passing this Id to the Identity service
    */
    authorizedUser: VSS_Identities_Contracts.Identity;
    /**
    * The instance id for this server.
    */
    instanceId: string;
    /**
    * Data that the location service holds.
    */
    locationServiceData: LocationServiceData;
    /**
    * The virtual directory of the host we are talking to.
    */
    webApplicationRelativeDirectory: string;
}
export declare enum InheritLevel {
    None = 0,
    Deployment = 1,
    Account = 2,
    Collection = 4,
    All = 7,
}
export interface LocationMapping {
    accessMappingMoniker: string;
    location: string;
}
/**
* Data transfer class used to transfer data about the location service data over the web service.
*/
export interface LocationServiceData {
    /**
    * Data about the access mappings contained by this location service.
    */
    accessMappings: AccessMapping[];
    /**
    * Data that the location service holds.
    */
    clientCacheFresh: boolean;
    /**
    * The time to live on the location service cache.
    */
    clientCacheTimeToLive: number;
    /**
    * The default access mapping moniker for the server.
    */
    defaultAccessMappingMoniker: string;
    /**
    * The obsolete id for the last change that took place on the server (use LastChangeId64).
    */
    lastChangeId: number;
    /**
    * The non-truncated 64-bit id for the last change that took place on the server.
    */
    lastChangeId64: number;
    /**
    * Data about the service definitions contained by this location service.
    */
    serviceDefinitions: ServiceDefinition[];
    /**
    * The identifier of the deployment which is hosting this location data (e.g. SPS, TFS, ELS, Napa, etc.)
    */
    serviceOwner: string;
}
export declare enum RelativeToSetting {
    Context = 0,
    WebApplication = 2,
    FullyQualified = 3,
}
export interface ServiceDefinition {
    description: string;
    displayName: string;
    identifier: string;
    inheritLevel: InheritLevel;
    locationMappings: LocationMapping[];
    /**
    * Maximum api version that this resource supports (current server version for this resource). Copied from ApiResourceLocation.
    */
    maxVersion: string;
    /**
    * Minimum api version that this resource supports. Copied from ApiResourceLocation.
    */
    minVersion: string;
    parentIdentifier: string;
    parentServiceType: string;
    properties: any;
    relativePath: string;
    relativeToSetting: RelativeToSetting;
    /**
    * The latest version of this resource location that is in &quot;Release&quot; (non-preview) mode. Copied from ApiResourceLocation.
    */
    releasedVersion: string;
    /**
    * The current resource version supported by this resource location. Copied from ApiResourceLocation.
    */
    resourceVersion: number;
    serviceType: string;
    status: ServiceStatus;
}
export declare enum ServiceStatus {
    Assigned = 0,
    Active = 1,
    Moving = 2,
}
export declare var TypeInfo: {
    AccessMapping: {
        fields: any;
    };
    ConnectionData: {
        fields: any;
    };
    InheritLevel: {
        enumValues: {
            "none": number;
            "deployment": number;
            "account": number;
            "collection": number;
            "all": number;
        };
    };
    LocationMapping: {
        fields: any;
    };
    LocationServiceData: {
        fields: any;
    };
    RelativeToSetting: {
        enumValues: {
            "context": number;
            "webApplication": number;
            "fullyQualified": number;
        };
    };
    ServiceDefinition: {
        fields: any;
    };
    ServiceStatus: {
        enumValues: {
            "assigned": number;
            "active": number;
            "moving": number;
        };
    };
};
