import Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_Operations_Contracts = require("VSS/Operations/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class CoreHttpClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.WebApiConnectedServiceDetails} connectedServiceCreationData
     * @param {string} projectId
     * @return IPromise<Contracts.WebApiConnectedService>
     */
    createConnectedService(connectedServiceCreationData: Contracts.WebApiConnectedServiceDetails, projectId: string): IPromise<Contracts.WebApiConnectedService>;
    /**
     * @param {string} projectId
     * @param {string} name
     * @return IPromise<Contracts.WebApiConnectedServiceDetails>
     */
    getConnectedServiceDetails(projectId: string, name: string): IPromise<Contracts.WebApiConnectedServiceDetails>;
    /**
     * @param {string} projectId
     * @param {Contracts.ConnectedServiceKind} kind
     * @return IPromise<Contracts.WebApiConnectedService[]>
     */
    getConnectedServices(projectId: string, kind?: Contracts.ConnectedServiceKind): IPromise<Contracts.WebApiConnectedService[]>;
    /**
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    createIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    deleteIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {string} mruName
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getIdentityMru(mruName: string): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    updateIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @param {string} projectId
     * @param {string} teamId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getTeamMembers(projectId: string, teamId: string, top?: number, skip?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * Get project collection with the specified id or name.
     *
     * @param {string} collectionId
     * @return IPromise<Contracts.TeamProjectCollection>
     */
    getProjectCollection(collectionId: string): IPromise<Contracts.TeamProjectCollection>;
    /**
     * Get project collection references for this application.
     *
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.TeamProjectCollectionReference[]>
     */
    getProjectCollections(top?: number, skip?: number): IPromise<Contracts.TeamProjectCollectionReference[]>;
    /**
     * @param {number} minRevision
     * @return IPromise<Contracts.TeamProjectReference[]>
     */
    getProjectHistory(minRevision?: number): IPromise<Contracts.TeamProjectReference[]>;
    /**
     * Get project with the specified id or name, optionally including capabilities.
     *
     * @param {string} projectId
     * @param {boolean} includeCapabilities - Include capabilities (such as source control) in the team project result (default: false).
     * @param {boolean} includeHistory - Search within renamed projects (that had such name in the past).
     * @return IPromise<Contracts.TeamProject>
     */
    getProject(projectId: string, includeCapabilities?: boolean, includeHistory?: boolean): IPromise<Contracts.TeamProject>;
    /**
     * Get project references with the specified state
     *
     * @param {any} stateFilter - Filter on team projects in a specific team project state (default: WellFormed).
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.TeamProjectReference[]>
     */
    getProjects(stateFilter?: any, top?: number, skip?: number): IPromise<Contracts.TeamProjectReference[]>;
    /**
     * Queue a project creation.
     *
     * @param {Contracts.TeamProject} projectToCreate - The project to create.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    queueCreateProject(projectToCreate: Contracts.TeamProject): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * Queue a project deletion.
     *
     * @param {string} projectId - The project id of the project to delete.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    queueDeleteProject(projectId: string): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * Update an existing project's name, abbreviation, or description.
     *
     * @param {Contracts.TeamProject} projectUpdate - The updates for the project.
     * @param {string} projectId - The project id of the project to update.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    updateProject(projectUpdate: Contracts.TeamProject, projectId: string): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * @param {string} proxyUrl
     * @return IPromise<Contracts.Proxy[]>
     */
    getProxies(proxyUrl?: string): IPromise<Contracts.Proxy[]>;
    /**
     * @param {string} projectId
     * @param {string} teamId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WebApiTeam>
     */
    getTeams(projectId: string, teamId?: string, top?: number, skip?: number): IPromise<Contracts.WebApiTeam>;
}
