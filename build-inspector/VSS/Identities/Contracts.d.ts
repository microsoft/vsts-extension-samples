export interface ChangedIdentities {
    identities: Identity[];
    sequenceContext: ChangedIdentitiesContext;
}
export interface ChangedIdentitiesContext {
    groupSequenceId: number;
    identitySequenceId: number;
}
export interface CreateGroupsInfo {
    groups: Identity[];
    scopeId: string;
}
export interface CreateScopeInfo {
    adminGroupDescription: string;
    adminGroupName: string;
    creatorId: string;
    parentScopeId: string;
    scopeName: string;
    scopeType: GroupScopeType;
}
export interface FrameworkIdentityInfo {
    displayName: string;
    identifier: string;
    identityType: FrameworkIdentityType;
    role: string;
}
export declare enum FrameworkIdentityType {
    None = 0,
    ServiceIdentity = 1,
    AggregateIdentity = 2,
}
export interface GroupMembership {
    active: boolean;
    descriptor: IdentityDescriptor;
    id: string;
    queriedId: string;
}
export declare enum GroupScopeType {
    Generic = 0,
    ServiceHost = 1,
    TeamProject = 2,
}
export interface Identity {
    customDisplayName: string;
    descriptor: IdentityDescriptor;
    id: string;
    isActive: boolean;
    isContainer: boolean;
    masterId: string;
    memberIds: string[];
    memberOf: IdentityDescriptor[];
    members: IdentityDescriptor[];
    metaTypeId: number;
    properties: any;
    providerDisplayName: string;
    resourceVersion: number;
    uniqueUserId: number;
}
export interface IdentityBatchInfo {
    descriptors: IdentityDescriptor[];
    identityIds: string[];
    includeRestrictedVisibility: boolean;
    propertyNames: string[];
    queryMembership: QueryMembership;
}
export interface IdentityDescriptor {
    identifier: string;
    identityType: string;
}
export declare enum IdentityMetaType {
    Member = 0,
    Guest = 1,
}
export interface IdentityScope {
    administrators: IdentityDescriptor;
    id: string;
    isActive: boolean;
    isGlobal: boolean;
    localScopeId: string;
    name: string;
    parentId: string;
    scopeType: GroupScopeType;
    securingHostId: string;
}
export declare enum IdentitySearchFilter {
    AccountName = 0,
    DisplayName = 1,
    AdministratorsGroup = 2,
    Identifier = 3,
    MailAddress = 4,
    General = 5,
    Alias = 6,
    Domain = 7,
}
export interface IdentitySelf {
    accountName: string;
    displayName: string;
    id: string;
    tenants: TenantInfo[];
}
export declare enum IdentityServiceBehavior {
    Default = 0,
    NoMapping = 1,
}
export interface IdentitySnapshot {
    groups: Identity[];
    identityIds: string[];
    memberships: GroupMembership[];
    scopeId: string;
    scopes: IdentityScope[];
}
export interface IdentityUpdateData {
    id: string;
    index: number;
    updated: boolean;
}
export declare enum QueryMembership {
    None = 0,
    Direct = 1,
    Expanded = 2,
    ExpandedUp = 3,
    ExpandedDown = 4,
}
export interface ReadOnlyIdentityDescriptor extends IdentityDescriptor {
    identifier: string;
    identityType: string;
}
export declare enum SpecialGroupType {
    Generic = 0,
    AdministrativeApplicationGroup = 1,
    ServiceApplicationGroup = 2,
    EveryoneApplicationGroup = 3,
    LicenseesApplicationGroup = 4,
    AzureActiveDirectoryApplicationGroup = 5,
}
export interface TenantInfo {
    homeTenant: boolean;
    tenantId: string;
    tenantName: string;
}
export declare var TypeInfo: {
    ChangedIdentities: {
        fields: any;
    };
    ChangedIdentitiesContext: {
        fields: any;
    };
    CreateGroupsInfo: {
        fields: any;
    };
    CreateScopeInfo: {
        fields: any;
    };
    FrameworkIdentityInfo: {
        fields: any;
    };
    FrameworkIdentityType: {
        enumValues: {
            "none": number;
            "serviceIdentity": number;
            "aggregateIdentity": number;
        };
    };
    GroupMembership: {
        fields: any;
    };
    GroupScopeType: {
        enumValues: {
            "generic": number;
            "serviceHost": number;
            "teamProject": number;
        };
    };
    Identity: {
        fields: any;
    };
    IdentityBatchInfo: {
        fields: any;
    };
    IdentityDescriptor: {
        fields: any;
    };
    IdentityMetaType: {
        enumValues: {
            "member": number;
            "guest": number;
        };
    };
    IdentityScope: {
        fields: any;
    };
    IdentitySearchFilter: {
        enumValues: {
            "accountName": number;
            "displayName": number;
            "administratorsGroup": number;
            "identifier": number;
            "mailAddress": number;
            "general": number;
            "alias": number;
            "domain": number;
        };
    };
    IdentitySelf: {
        fields: any;
    };
    IdentityServiceBehavior: {
        enumValues: {
            "default": number;
            "noMapping": number;
        };
    };
    IdentitySnapshot: {
        fields: any;
    };
    IdentityUpdateData: {
        fields: any;
    };
    QueryMembership: {
        enumValues: {
            "none": number;
            "direct": number;
            "expanded": number;
            "expandedUp": number;
            "expandedDown": number;
        };
    };
    ReadOnlyIdentityDescriptor: {
        fields: any;
    };
    SpecialGroupType: {
        enumValues: {
            "generic": number;
            "administrativeApplicationGroup": number;
            "serviceApplicationGroup": number;
            "everyoneApplicationGroup": number;
            "licenseesApplicationGroup": number;
            "azureActiveDirectoryApplicationGroup": number;
        };
    };
    TenantInfo: {
        fields: any;
    };
};
