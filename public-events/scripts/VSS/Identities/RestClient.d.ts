import Contracts = require("VSS/Identities/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_DelegatedAuthorization_Contracts = require("VSS/DelegatedAuthorization/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class IdentitiesHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {any} container
     * @return IPromise<Contracts.Identity[]>
     */
    createGroups(container: any): IPromise<Contracts.Identity[]>;
    /**
     * @param {string} groupId
     * @return IPromise<void>
     */
    deleteGroup(groupId: string): IPromise<void>;
    /**
     * @param {string} scopeIds
     * @param {boolean} recurse
     * @param {boolean} deleted
     * @param {string} properties
     * @return IPromise<Contracts.Identity[]>
     */
    listGroups(scopeIds?: string, recurse?: boolean, deleted?: boolean, properties?: string): IPromise<Contracts.Identity[]>;
    /**
     * @param {number} identitySequenceId
     * @param {number} groupSequenceId
     * @param {string} scopeId
     * @return IPromise<Contracts.ChangedIdentities>
     */
    getIdentityChanges(identitySequenceId: number, groupSequenceId: number, scopeId?: string): IPromise<Contracts.ChangedIdentities>;
    /**
     * @param {string} descriptors
     * @param {string} identityIds
     * @param {string} searchFilter
     * @param {string} filterValue
     * @param {Contracts.QueryMembership} queryMembership
     * @param {string} properties
     * @param {boolean} includeRestrictedVisibility
     * @param {Contracts.ReadIdentitiesOptions} options
     * @return IPromise<Contracts.Identity[]>
     */
    readIdentities(descriptors?: string, identityIds?: string, searchFilter?: string, filterValue?: string, queryMembership?: Contracts.QueryMembership, properties?: string, includeRestrictedVisibility?: boolean, options?: Contracts.ReadIdentitiesOptions): IPromise<Contracts.Identity[]>;
    /**
     * @param {string} scopeId
     * @param {Contracts.QueryMembership} queryMembership
     * @param {string} properties
     * @return IPromise<Contracts.Identity[]>
     */
    readIdentitiesByScope(scopeId: string, queryMembership?: Contracts.QueryMembership, properties?: string): IPromise<Contracts.Identity[]>;
    /**
     * @param {string} identityId
     * @param {Contracts.QueryMembership} queryMembership
     * @param {string} properties
     * @return IPromise<Contracts.Identity>
     */
    readIdentity(identityId: string, queryMembership?: Contracts.QueryMembership, properties?: string): IPromise<Contracts.Identity>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.Identity[]>} identities
     * @return IPromise<Contracts.IdentityUpdateData[]>
     */
    updateIdentities(identities: VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.Identity[]>): IPromise<Contracts.IdentityUpdateData[]>;
    /**
     * @param {Contracts.Identity} identity
     * @param {string} identityId
     * @return IPromise<void>
     */
    updateIdentity(identity: Contracts.Identity, identityId: string): IPromise<void>;
    /**
     * @param {Contracts.FrameworkIdentityInfo} frameworkIdentityInfo
     * @return IPromise<Contracts.Identity>
     */
    createIdentity(frameworkIdentityInfo: Contracts.FrameworkIdentityInfo): IPromise<Contracts.Identity>;
    /**
     * @param {Contracts.IdentityBatchInfo} batchInfo
     * @return IPromise<Contracts.Identity[]>
     */
    readIdentityBatch(batchInfo: Contracts.IdentityBatchInfo): IPromise<Contracts.Identity[]>;
    /**
     * @param {string} scopeId
     * @return IPromise<Contracts.IdentitySnapshot>
     */
    getIdentitySnapshot(scopeId: string): IPromise<Contracts.IdentitySnapshot>;
    /**
     * @return IPromise<Contracts.IdentitySelf>
     */
    getSelf(): IPromise<Contracts.IdentitySelf>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @return IPromise<boolean>
     */
    addMember(containerId: string, memberId: string): IPromise<boolean>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor>
     */
    readMember(containerId: string, memberId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor>;
    /**
     * @param {string} containerId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor[]>
     */
    readMembers(containerId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor[]>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @return IPromise<boolean>
     */
    removeMember(containerId: string, memberId: string): IPromise<boolean>;
    /**
     * @param {string} memberId
     * @param {string} containerId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor>
     */
    readMemberOf(memberId: string, containerId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor>;
    /**
     * @param {string} memberId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor[]>
     */
    readMembersOf(memberId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor[]>;
    /**
     * @param {Contracts.CreateScopeInfo} info
     * @param {string} scopeId
     * @return IPromise<Contracts.IdentityScope>
     */
    createScope(info: Contracts.CreateScopeInfo, scopeId: string): IPromise<Contracts.IdentityScope>;
    /**
     * @param {string} scopeId
     * @return IPromise<void>
     */
    deleteScope(scopeId: string): IPromise<void>;
    /**
     * @param {string} scopeId
     * @return IPromise<Contracts.IdentityScope>
     */
    getScopeById(scopeId: string): IPromise<Contracts.IdentityScope>;
    /**
     * @param {string} scopeName
     * @return IPromise<Contracts.IdentityScope>
     */
    getScopeByName(scopeName: string): IPromise<Contracts.IdentityScope>;
    /**
     * @param {Contracts.IdentityScope} renameScope
     * @param {string} scopeId
     * @return IPromise<void>
     */
    renameScope(renameScope: Contracts.IdentityScope, scopeId: string): IPromise<void>;
    /**
     * @return IPromise<VSS_DelegatedAuthorization_Contracts.AccessTokenResult>
     */
    getSignoutToken(): IPromise<VSS_DelegatedAuthorization_Contracts.AccessTokenResult>;
    /**
     * @param {string} tenantId
     * @return IPromise<Contracts.TenantInfo>
     */
    getTenant(tenantId: string): IPromise<Contracts.TenantInfo>;
}
