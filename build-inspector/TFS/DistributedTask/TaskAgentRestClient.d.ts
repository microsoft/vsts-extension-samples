import Contracts = require("TFS/DistributedTask/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class TaskAgentHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgent>
     */
    createAgent(agent: Contracts.TaskAgent, poolId: number): IPromise<Contracts.TaskAgent>;
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
     * @return IPromise<Contracts.TaskAgent>
     */
    getAgent(poolId: number, agentId: number, includeCapabilities?: boolean, propertyFilters?: string): IPromise<Contracts.TaskAgent>;
    /**
     * @param {number} poolId
     * @param {string} agentName
     * @param {boolean} includeCapabilities
     * @param {string} propertyFilters
     * @param {string} demands
     * @return IPromise<Contracts.TaskAgent[]>
     */
    getAgents(poolId: number, agentName?: string, includeCapabilities?: boolean, propertyFilters?: string, demands?: string): IPromise<Contracts.TaskAgent[]>;
    /**
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    replaceAgent(agent: Contracts.TaskAgent, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
    /**
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    updateAgent(agent: Contracts.TaskAgent, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
    /**
     * Proxy for a GET request defined by an 'endpoint'. The request is authorized using a service connection. The response is filtered using an XPath/Json based selector.
     *
     * @param {Contracts.TaskDefinitionEndpoint} endpoint - Describes the URL to fetch.
     * @return IPromise<string[]>
     */
    queryEndpoint(endpoint: Contracts.TaskDefinitionEndpoint): IPromise<string[]>;
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
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    getRequest(poolId: number, requestId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    queueRequest(request: Contracts.TaskAgentJobRequest, poolId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    updateRequest(request: Contracts.TaskAgentJobRequest, poolId: number, requestId: number, lockToken: string): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * @param {number} poolId
     * @param {number} messageId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteMessage(poolId: number, messageId: number, sessionId: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string} sessionId
     * @param {number} lastMessageId
     * @return IPromise<Contracts.TaskAgentMessage>
     */
    getMessage(poolId: number, sessionId: string, lastMessageId?: number): IPromise<Contracts.TaskAgentMessage>;
    /**
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<void>
     */
    refreshAgent(poolId: number, agentId: number): IPromise<void>;
    /**
     * @param {number} poolId
     * @return IPromise<void>
     */
    refreshAgents(poolId: number): IPromise<void>;
    /**
     * @param {Contracts.TaskAgentMessage} message
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<void>
     */
    sendMessage(message: Contracts.TaskAgentMessage, poolId: number, requestId: number): IPromise<void>;
    /**
     * @param {Contracts.TaskAgentPool} pool
     * @return IPromise<Contracts.TaskAgentPool>
     */
    createPool(pool: Contracts.TaskAgentPool): IPromise<Contracts.TaskAgentPool>;
    /**
     * @param {number} poolId
     * @return IPromise<void>
     */
    deletePool(poolId: number): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string} properties
     * @return IPromise<Contracts.TaskAgentPool>
     */
    getPool(poolId: number, properties?: string): IPromise<Contracts.TaskAgentPool>;
    /**
     * @param {string} poolName
     * @param {string} properties
     * @return IPromise<Contracts.TaskAgentPool[]>
     */
    getPools(poolName?: string, properties?: string): IPromise<Contracts.TaskAgentPool[]>;
    /**
     * @param {number} poolId
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getAgentPoolRoles(poolId?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * @param {Contracts.TaskAgentSession} session
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentSession>
     */
    createSession(session: Contracts.TaskAgentSession, poolId: number): IPromise<Contracts.TaskAgentSession>;
    /**
     * @param {number} poolId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteSession(poolId: number, sessionId: string): IPromise<void>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @return IPromise<Contracts.TaskDefinition[]>
     */
    getTaskContent(taskId: string, versionString?: string): IPromise<Contracts.TaskDefinition[]>;
    /**
     * @param {string[]} visibility
     * @return IPromise<Contracts.TaskDefinition[]>
     */
    getTaskDefinitions(visibility: string[]): IPromise<Contracts.TaskDefinition[]>;
    /**
     * @param {string} taskId
     * @param {boolean} overwrite
     * @return IPromise<void>
     */
    uploadTaskDefinition(taskId: string, overwrite?: boolean): IPromise<void>;
    /**
     * @param {{ [key: string] : string; }} userCapabilities
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    updateUserCapabilities(userCapabilities: {
        [key: string]: string;
    }, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
}
