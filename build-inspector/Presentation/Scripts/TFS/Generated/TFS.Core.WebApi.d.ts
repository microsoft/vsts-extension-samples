import TFS_Core_Contracts = require("Presentation/Scripts/TFS/Generated/TFS.Core.Contracts");
import WebApi_Contracts = require("VSS/WebApi/Contracts");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class CoreHttpClient extends WebApi_RestClient.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @param {TFS_Core_Contracts.WebApiConnectedServiceDetails} connectedServiceCreationData
     * @param {string} projectId
     * @return IPromise<TFS_Core_Contracts.WebApiConnectedService>
     */
    createConnectedService(connectedServiceCreationData: TFS_Core_Contracts.WebApiConnectedServiceDetails, projectId: string): IPromise<TFS_Core_Contracts.WebApiConnectedService>;
    /**
     * @param {string} projectId
     * @param {string} name
     * @return IPromise<TFS_Core_Contracts.WebApiConnectedServiceDetails>
     */
    getConnectedServiceDetails(projectId: string, name: string): IPromise<TFS_Core_Contracts.WebApiConnectedServiceDetails>;
    /**
     * @param {string} projectId
     * @param {TFS_Core_Contracts.ConnectedServiceKind} kind
     * @return IPromise<TFS_Core_Contracts.WebApiConnectedService[]>
     */
    getConnectedServices(projectId: string, kind?: TFS_Core_Contracts.ConnectedServiceKind): IPromise<TFS_Core_Contracts.WebApiConnectedService[]>;
    /**
     * @param {TFS_Core_Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    deleteIdentityMru(mruData: TFS_Core_Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {string} mruName
     * @return IPromise<WebApi_Contracts.IdentityRef[]>
     */
    getIdentityMru(mruName: string): IPromise<WebApi_Contracts.IdentityRef[]>;
    /**
     * @param {TFS_Core_Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    patchIdentityMru(mruData: TFS_Core_Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {TFS_Core_Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    postIdentityMru(mruData: TFS_Core_Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {string} projectId
     * @param {string} teamId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<WebApi_Contracts.IdentityRef[]>
     */
    getTeamMembers(projectId: string, teamId: string, top?: number, skip?: number): IPromise<WebApi_Contracts.IdentityRef[]>;
    /**
     * Get project collection with the specified id or name.
     *
     * @param {string} collectionId
     * @return IPromise<TFS_Core_Contracts.TeamProjectCollection>
     */
    getProjectCollection(collectionId: string): IPromise<TFS_Core_Contracts.TeamProjectCollection>;
    /**
     * @param {number} top
     * @param {number} skip
     * @return IPromise<TFS_Core_Contracts.TeamProjectCollectionReference[]>
     */
    getProjectCollections(top?: number, skip?: number): IPromise<TFS_Core_Contracts.TeamProjectCollectionReference[]>;
    /**
     * @param {string} projectId
     * @param {boolean} includeCapabilities
     * @param {boolean} includeHistory
     * @return IPromise<TFS_Core_Contracts.TeamProject>
     */
    getProject(projectId: string, includeCapabilities?: boolean, includeHistory?: boolean): IPromise<TFS_Core_Contracts.TeamProject>;
    /**
     * @param {any} stateFilter
     * @param {number} top
     * @param {number} skip
     * @return IPromise<TFS_Core_Contracts.TeamProjectReference[]>
     */
    getProjects(stateFilter?: any, top?: number, skip?: number): IPromise<TFS_Core_Contracts.TeamProjectReference[]>;
    /**
     * Queue a project creation.
     *
     * @param {TFS_Core_Contracts.TeamProject} projectToCreate - The project to create.
     * @return IPromise<void>
     */
    queueCreateProject(projectToCreate: TFS_Core_Contracts.TeamProject): IPromise<void>;
    /**
     * Queue a project deletion.
     *
     * @param {string} projectId - The project id of the project to delete.
     * @return IPromise<void>
     */
    queueDeleteProject(projectId: string): IPromise<void>;
    /**
     * @param {string} proxyUrl
     * @return IPromise<TFS_Core_Contracts.Proxy[]>
     */
    getProxies(proxyUrl?: string): IPromise<TFS_Core_Contracts.Proxy[]>;
    /**
     * @param {string} projectId
     * @param {string} teamId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<void>
     */
    getTeams(projectId: string, teamId?: string, top?: number, skip?: number): IPromise<void>;
}
