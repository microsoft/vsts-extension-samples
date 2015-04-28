import Contracts = require("VSS/Identities/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class IdentitiesHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {any} container
     * @return IPromise<void>
     */
    createGroups(container: any): IPromise<void>;
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
     * @return IPromise<void>
     */
    getIdentityChanges(identitySequenceId: number, groupSequenceId: number, scopeId?: string): IPromise<void>;
    /**
     * @param {string} descriptors
     * @param {string} identityIds
     * @param {string} searchFilter
     * @param {string} filterValue
     * @param {Contracts.QueryMembership} queryMembership
     * @param {string} properties
     * @param {boolean} includeRestrictedVisibility
     * @return IPromise<Contracts.Identity[]>
     */
    readIdentities(descriptors?: string, identityIds?: string, searchFilter?: string, filterValue?: string, queryMembership?: Contracts.QueryMembership, properties?: string, includeRestrictedVisibility?: boolean): IPromise<Contracts.Identity[]>;
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
     * @return IPromise<void>
     */
    readIdentity(identityId: string, queryMembership?: Contracts.QueryMembership, properties?: string): IPromise<void>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.Identity[]>} identities
     * @return IPromise<void>
     */
    updateIdentities(identities: VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.Identity[]>): IPromise<void>;
    /**
     * @param {Contracts.Identity} identity
     * @param {string} identityId
     * @return IPromise<void>
     */
    updateIdentity(identity: Contracts.Identity, identityId: string): IPromise<void>;
    /**
     * @param {Contracts.FrameworkIdentityInfo} frameworkIdentityInfo
     * @return IPromise<void>
     */
    createIdentity(frameworkIdentityInfo: Contracts.FrameworkIdentityInfo): IPromise<void>;
    /**
     * @param {Contracts.IdentityBatchInfo} batchInfo
     * @return IPromise<void>
     */
    readIdentityBatch(batchInfo: Contracts.IdentityBatchInfo): IPromise<void>;
    /**
     * @param {string} scopeId
     * @return IPromise<void>
     */
    getIdentitySnapshot(scopeId: string): IPromise<void>;
    /**
     * @return IPromise<void>
     */
    getSelf(): IPromise<void>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @return IPromise<void>
     */
    addMember(containerId: string, memberId: string): IPromise<void>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<void>
     */
    readMember(containerId: string, memberId: string, queryMembership?: Contracts.QueryMembership): IPromise<void>;
    /**
     * @param {string} containerId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor[]>
     */
    readMembers(containerId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor[]>;
    /**
     * @param {string} containerId
     * @param {string} memberId
     * @return IPromise<void>
     */
    removeMember(containerId: string, memberId: string): IPromise<void>;
    /**
     * @param {string} memberId
     * @param {string} containerId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<void>
     */
    readMemberOf(memberId: string, containerId: string, queryMembership?: Contracts.QueryMembership): IPromise<void>;
    /**
     * @param {string} memberId
     * @param {Contracts.QueryMembership} queryMembership
     * @return IPromise<Contracts.IdentityDescriptor[]>
     */
    readMembersOf(memberId: string, queryMembership?: Contracts.QueryMembership): IPromise<Contracts.IdentityDescriptor[]>;
    /**
     * @param {Contracts.CreateScopeInfo} info
     * @param {string} scopeId
     * @return IPromise<void>
     */
    createScope(info: Contracts.CreateScopeInfo, scopeId: string): IPromise<void>;
    /**
     * @param {string} scopeId
     * @return IPromise<void>
     */
    deleteScope(scopeId: string): IPromise<void>;
    /**
     * @param {string} scopeId
     * @return IPromise<void>
     */
    getScopeById(scopeId: string): IPromise<void>;
    /**
     * @param {string} scopeName
     * @return IPromise<void>
     */
    getScopeByName(scopeName: string): IPromise<void>;
    /**
     * @param {Contracts.IdentityScope} renameScope
     * @param {string} scopeId
     * @return IPromise<void>
     */
    renameScope(renameScope: Contracts.IdentityScope, scopeId: string): IPromise<void>;
    /**
     * @return IPromise<void>
     */
    getSignoutToken(): IPromise<void>;
    /**
     * @param {string} tenantId
     * @return IPromise<void>
     */
    getTenant(tenantId: string): IPromise<void>;
}
