import TFS_DistributedTask_Contracts = require("Presentation/Scripts/TFS/Generated/TFS.DistributedTask.Contracts");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class DistributedTaskHttpClient extends WebApi_RestClient.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgent} agent
     * @param {number} poolId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgent>
     */
    addAgent(agent: TFS_DistributedTask_Contracts.TaskAgent, poolId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgent>;
    /**
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<void>
     */
    deleteAgent(poolId: number, agentId: number): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {number} agentId
     * @param {boolean} includeCapabilities
     * @param {string} propertyFilters
     * @return IPromise<void>
     */
    getAgent(poolId: number, agentId: number, includeCapabilities?: boolean, propertyFilters?: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string} agentName
     * @param {boolean} includeCapabilities
     * @param {string} propertyFilters
     * @param {string} demands
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgent[]>
     */
    getAgents(poolId: number, agentName?: string, includeCapabilities?: boolean, propertyFilters?: string, demands?: string): IPromise<TFS_DistributedTask_Contracts.TaskAgent[]>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgent>
     */
    patchAgent(agent: TFS_DistributedTask_Contracts.TaskAgent, poolId: number, agentId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgent>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgent>
     */
    putAgent(agent: TFS_DistributedTask_Contracts.TaskAgent, poolId: number, agentId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgent>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @return IPromise<void>
     */
    getTaskHelp(taskId: string, versionString?: string): IPromise<void>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @return IPromise<void>
     */
    getTaskIcon(taskId: string, versionString?: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<void>
     */
    deleteRequest(poolId: number, requestId: number, lockToken: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>
     */
    getRequest(poolId: number, requestId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>
     */
    queueRequest(request: TFS_DistributedTask_Contracts.TaskAgentJobRequest, poolId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>
     */
    updateRequest(request: TFS_DistributedTask_Contracts.TaskAgentJobRequest, poolId: number, requestId: number, lockToken: string): IPromise<TFS_DistributedTask_Contracts.TaskAgentJobRequest>;
    /**
     * @param {number} poolId
     * @param {number} messageId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteMessageAsync(poolId: number, messageId: number, sessionId: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string} sessionId
     * @param {number} lastMessageId
     * @return IPromise<void>
     */
    getMessageAsync(poolId: number, sessionId: string, lastMessageId?: number): IPromise<void>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgentMessage} message
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<void>
     */
    sendMessage(message: TFS_DistributedTask_Contracts.TaskAgentMessage, poolId: number, requestId: number): IPromise<void>;
    /**
     * This method can return any of the following depending on the parameters: packages -- list of TaskPackageMetadata that has url, type, version packages/{packageType} -- package stream OR TaskPackageMetadata if requested for json other -- BadRequest
     *
     * @param {string} packageType
     * @return IPromise<void>
     */
    getPackage(packageType?: string): IPromise<void>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgentPool} pool
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentPool>
     */
    addPool(pool: TFS_DistributedTask_Contracts.TaskAgentPool): IPromise<TFS_DistributedTask_Contracts.TaskAgentPool>;
    /**
     * @param {number} poolId
     * @return IPromise<void>
     */
    deletePool(poolId: number): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string} properties
     * @return IPromise<void>
     */
    getPool(poolId: number, properties?: string): IPromise<void>;
    /**
     * @param {string} poolName
     * @param {string} properties
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentPool[]>
     */
    getPools(poolName?: string, properties?: string): IPromise<TFS_DistributedTask_Contracts.TaskAgentPool[]>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskAgentSession} session
     * @param {number} poolId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAgentSession>
     */
    createSession(session: TFS_DistributedTask_Contracts.TaskAgentSession, poolId: number): IPromise<TFS_DistributedTask_Contracts.TaskAgentSession>;
    /**
     * @param {number} poolId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteSession(poolId: number, sessionId: string): IPromise<void>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskDefinition} definition
     * @param {boolean} overwrite
     * @return IPromise<void>
     */
    createTaskDefinition(definition: TFS_DistributedTask_Contracts.TaskDefinition, overwrite?: boolean): IPromise<void>;
    /**
     * @return IPromise<void>
     */
    deleteTaskDefinitions(): IPromise<void>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @return IPromise<void>
     */
    getTaskContent(taskId: string, versionString?: string): IPromise<void>;
    /**
     * @param {string[]} visibility
     * @return IPromise<TFS_DistributedTask_Contracts.TaskDefinition[]>
     */
    getTaskDefinitions(visibility: string[]): IPromise<TFS_DistributedTask_Contracts.TaskDefinition[]>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @param {boolean} overwrite
     * @return IPromise<void>
     */
    uploadTaskContent(taskId: string, versionString: string, overwrite?: boolean): IPromise<void>;
    /**
     * @param {{ [key: string] : string; }} userCapabilities
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<void>
     */
    updateUserCapabilities(userCapabilities: {
        [key: string]: string;
    }, poolId: number, agentId: number): IPromise<void>;
}
