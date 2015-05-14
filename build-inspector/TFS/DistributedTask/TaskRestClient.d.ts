import TFS_DistributedTask_Contracts = require("TFS/DistributedTask/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class TaskHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {TFS_DistributedTask_Contracts.JobEvent} eventData
     * @param {string} planId
     * @return IPromise<void>
     */
    postEvent(eventData: TFS_DistributedTask_Contracts.JobEvent, planId: string): IPromise<void>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>} lines
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @return IPromise<void>
     */
    postLines(lines: VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>, planId: string, timelineId: string, recordId: string): IPromise<void>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskLog} log
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog>
     */
    createLog(log: TFS_DistributedTask_Contracts.TaskLog, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog>;
    /**
     * @param {string} planId
     * @param {number} logId
     * @param {number} startLine
     * @param {number} endLine
     * @return IPromise<string[]>
     */
    getLog(planId: string, logId: number, startLine?: number, endLine?: number): IPromise<string[]>;
    /**
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog[]>
     */
    getLogs(planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog[]>;
    /**
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>
     */
    getPlan(planId: string): IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>;
    /**
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    getRecords(planId: string, timelineId: string, changeId?: number): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>} records
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    updateRecords(records: VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>, planId: string, timelineId: string): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * @param {TFS_DistributedTask_Contracts.Timeline} timeline
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    createTimeline(timeline: TFS_DistributedTask_Contracts.Timeline, planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<void>
     */
    deleteTimeline(planId: string, timelineId: string): IPromise<void>;
    /**
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @param {boolean} includeRecords
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    getTimeline(planId: string, timelineId: string, changeId?: number, includeRecords?: boolean): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline[]>
     */
    getTimelines(planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline[]>;
}
