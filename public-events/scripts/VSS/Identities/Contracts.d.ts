/**
* Container class for changed identities
*/
export interface ChangedIdentities {
    /**
    * Changed Identities
    */
    identities: Identity[];
    /**
    * Last Identity SequenceId
    */
    sequenceContext: ChangedIdentitiesContext;
}
/**
* Context class for changed identities
*/
export interface ChangedIdentitiesContext {
    /**
    * Last Group SequenceId
    */
    groupSequenceId: number;
    /**
    * Last Identity SequenceId
    */
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
    /**
    * The custom display name for the identity (if any). Setting this property to an empty string will clear the existing custom display name. Setting this property to null will not affect the existing persisted value (since null values do not get sent over the wire or to the database)
    */
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
    /**
    * The display name for the identity as specified by the source identity provider.
    */
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
/**
* An Identity descriptor is a wrapper for the identity type (Windows SID, Passport) along with a unique identifier such as the SID or PUID.
*/
export interface IdentityDescriptor {
    /**
    * The unique identifier for this identity, not exceeding 256 chars, which will be persisted.
    */
    identifier: string;
    /**
    * Type of descriptor (for example, Windows, Passport, etc.).
    */
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
    /**
    * NT account name (domain\alias)
    */
    AccountName = 0,
    /**
    * Display name
    */
    DisplayName = 1,
    /**
    * Find project admin group
    */
    AdministratorsGroup = 2,
    /**
    * Find the identity using the identifier
    */
    Identifier = 3,
    /**
    * Email address
    */
    MailAddress = 4,
    /**
    * A general search for an identity.
    */
    General = 5,
    /**
    * Alternate login username
    */
    Alias = 6,
    /**
    * Find identity using Domain/TenantId
    */
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
export interface JsonPatchOperationData<T> {
    op: string;
    path: string;
    value: T;
}
export interface MruIdentitiesUpdateData extends JsonPatchOperationData<string[]> {
}
export declare enum QueryMembership {
    /**
    * Query will not return any membership data
    */
    None = 0,
    /**
    * Query will return only direct membership data
    */
    Direct = 1,
    /**
    * Query will return expanded membership data
    */
    Expanded = 2,
    /**
    * Query will return expanded up membership data (parents only)
    */
    ExpandedUp = 3,
    /**
    * Query will return expanded down membership data (children only)
    */
    ExpandedDown = 4,
}
export declare enum ReadIdentitiesOptions {
    None = 0,
    FilterIllegalMemberships = 1,
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
    JsonPatchOperationData: {
        fields: any;
    };
    MruIdentitiesUpdateData: {
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
    ReadIdentitiesOptions: {
        enumValues: {
            "none": number;
            "filterIllegalMemberships": number;
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
