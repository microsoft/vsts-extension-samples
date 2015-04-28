import VSS_Identities_Contracts = require("VSS/Identities/Contracts");
export interface AccessMapping {
    accessPoint: string;
    displayName: string;
    moniker: string;
}
export interface ConnectionData {
    authenticatedUser: VSS_Identities_Contracts.Identity;
    authorizedUser: VSS_Identities_Contracts.Identity;
    instanceId: string;
    locationServiceData: LocationServiceData;
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
export interface LocationServiceData {
    accessMappings: AccessMapping[];
    clientCacheFresh: boolean;
    clientCacheTimeToLive: number;
    defaultAccessMappingMoniker: string;
    lastChangeId: number;
    lastChangeId64: number;
    serviceDefinitions: ServiceDefinition[];
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
    maxVersion: string;
    minVersion: string;
    parentIdentifier: string;
    parentServiceType: string;
    properties: any;
    relativePath: string;
    relativeToSetting: RelativeToSetting;
    releasedVersion: string;
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
