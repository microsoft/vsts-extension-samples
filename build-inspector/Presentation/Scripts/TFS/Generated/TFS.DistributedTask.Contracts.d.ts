import WebApi_Contracts = require("VSS/WebApi/Contracts");
export interface Issue {
    category: string;
    data: {
        [key: string]: string;
    };
    message: string;
    type: IssueType;
}
export declare enum IssueType {
    Error = 1,
    Warning = 2,
}
export interface JobAssignedEvent extends JobEvent {
    request: TaskAgentJobRequest;
}
export interface JobAuthorization {
    serverId: string;
    serverUrl: string;
    servicePrincipalId: string;
    servicePrincipalToken: string;
}
export interface JobCancelMessage {
    jobId: string;
    timeout: any;
}
export interface JobCompletedEvent extends JobEvent {
    result: TaskResult;
}
export interface JobEndpoint {
    authorization: string;
    data: {
        [key: string]: string;
    };
    id: number;
    name: string;
    type: string;
    url: string;
}
export interface JobEnvironment {
    data: any;
    endpoints: JobEndpoint[];
    mask: MaskHint[];
    options: {
        [key: number]: JobOption;
    };
    secrets: {
        [key: string]: any;
    };
    variables: {
        [key: string]: string;
    };
}
export interface JobEvent {
    jobId: string;
    name: string;
}
export interface JobOption {
    data: {
        [key: string]: string;
    };
    id: string;
}
export interface JobRequestMessage {
    authorization: JobAuthorization;
    environment: JobEnvironment;
    jobId: string;
    jobName: string;
    lockedUntil: Date;
    lockToken: string;
    plan: TaskOrchestrationPlanReference;
    requestId: number;
    tasks: TaskInstance[];
    timeline: TimelineReference;
}
export interface MaskHint {
    type: MaskType;
    value: string;
}
export declare enum MaskType {
    Variable = 1,
    Regex = 2,
}
export interface TaskAgent extends TaskAgentReference {
    createdOn: Date;
    enabled: boolean;
    maxParallelism: number;
    properties: any;
    status: TaskAgentStatus;
    statusChangedOn: Date;
    systemCapabilities: {
        [key: string]: string;
    };
    userCapabilities: {
        [key: string]: string;
    };
}
export interface TaskAgentJobRequest {
    assignTime: Date;
    demands: any[];
    finishTime: Date;
    hostId: string;
    jobId: string;
    lockedUntil: Date;
    planId: string;
    planType: string;
    queueTime: Date;
    receiveTime: Date;
    requestId: number;
    reservedAgent: TaskAgentReference;
    result: TaskResult;
    scopeId: string;
    serviceOwner: string;
}
export interface TaskAgentMessage {
    body: string;
    messageId: number;
    messageType: string;
}
export interface TaskAgentPool extends TaskAgentPoolReference {
    administratorsGroup: WebApi_Contracts.IdentityRef;
    createdBy: WebApi_Contracts.IdentityRef;
    createdOn: Date;
    groupScopeId: string;
    isHosted: boolean;
    properties: any;
    serviceAccountsGroup: WebApi_Contracts.IdentityRef;
    size: number;
}
export interface TaskAgentPoolReference {
    id: number;
    name: string;
    scope: string;
}
export interface TaskAgentReference {
    id: number;
    name: string;
}
export interface TaskAgentSession {
    agent: TaskAgentReference;
    ownerName: string;
    sessionId: string;
    systemCapabilities: {
        [key: string]: string;
    };
}
export declare enum TaskAgentStatus {
    Offline = 1,
    Online = 2,
}
export interface TaskDefinition {
    agentExecution: TaskExecution;
    author: string;
    category: string;
    contentsUploaded: boolean;
    demands: any[];
    description: string;
    friendlyName: string;
    groups: TaskGroupDefinition[];
    hostType: string;
    iconUrl: string;
    id: string;
    inputs: TaskInputDefinition[];
    instanceNameFormat: string;
    name: string;
    packageLocation: string;
    packageType: string;
    serverOwned: boolean;
    sourceLocation: string;
    version: TaskVersion;
    visibility: string[];
}
export interface TaskExecution {
    execTask: TaskReference;
    platformInstructions: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
export interface TaskGroupDefinition {
    displayName: string;
    isExpanded: boolean;
    name: string;
}
export interface TaskInputDefinition {
    defaultValue: string;
    groupName: string;
    helpMarkDown: string;
    label: string;
    name: string;
    options: {
        [key: string]: string;
    };
    required: boolean;
    type: string;
    visibleRule: string;
}
export interface TaskInstance extends TaskReference {
    alwaysRun: boolean;
    continueOnError: boolean;
    displayName: string;
    enabled: boolean;
    instanceId: string;
}
export interface TaskLog extends TaskLogReference {
    createdOn: Date;
    indexLocation: string;
    lastChangedOn: Date;
    lineCount: number;
    path: string;
}
export interface TaskLogReference {
    id: number;
    location: string;
}
export interface TaskOrchestrationContainer extends TaskOrchestrationItem {
    children: TaskOrchestrationItem[];
    continueOnError: boolean;
    parallel: boolean;
    rollback: TaskOrchestrationContainer;
}
export interface TaskOrchestrationItem {
    itemType: TaskOrchestrationItemType;
}
export declare enum TaskOrchestrationItemType {
    Container = 0,
    Job = 1,
}
export interface TaskOrchestrationJob extends TaskOrchestrationItem {
    demands: any[];
    executionTimeout: any;
    instanceId: string;
    name: string;
    tasks: TaskInstance[];
    variables: {
        [key: string]: string;
    };
}
export interface TaskOrchestrationPlan extends TaskOrchestrationPlanReference {
    environment: JobEnvironment;
    finishTime: Date;
    implementation: TaskOrchestrationContainer;
    result: TaskResult;
    resultCode: string;
    startTime: Date;
    state: TaskOrchestrationPlanState;
    timeline: TimelineReference;
}
export interface TaskOrchestrationPlanReference {
    artifactLocation: string;
    artifactUri: string;
    planId: string;
    planType: string;
    scopeIdentifier: string;
    version: number;
}
export declare enum TaskOrchestrationPlanState {
    InProgress = 1,
    Queued = 2,
    Completed = 4,
}
export interface TaskPackageMetadata {
    type: string;
    url: string;
    version: string;
}
export interface TaskReference {
    id: string;
    inputs: {
        [key: string]: string;
    };
    name: string;
    version: string;
}
export declare enum TaskResult {
    Succeeded = 0,
    SucceededWithIssues = 1,
    Failed = 2,
    Canceled = 3,
    Skipped = 4,
    Abandoned = 5,
}
export interface TaskVersion {
    isTest: boolean;
    major: number;
    minor: number;
    patch: number;
}
export interface Timeline extends TimelineReference {
    lastChangedBy: string;
    lastChangedOn: Date;
    records: TimelineRecord[];
}
export interface TimelineRecord {
    changeId: number;
    currentOperation: string;
    details: TimelineReference;
    errorCount: number;
    finishTime: Date;
    id: string;
    issues: Issue[];
    lastModified: Date;
    location: string;
    log: TaskLogReference;
    name: string;
    order: number;
    parentId: string;
    percentComplete: number;
    result: TaskResult;
    resultCode: string;
    startTime: Date;
    state: TimelineRecordState;
    type: string;
    warningCount: number;
    workerName: string;
}
export declare enum TimelineRecordState {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}
export interface TimelineReference {
    changeId: number;
    id: string;
    location: string;
}
export declare var TypeInfo: {
    Issue: {
        fields: any;
    };
    IssueType: {
        enumValues: {
            "error": number;
            "warning": number;
        };
    };
    JobAssignedEvent: {
        fields: any;
    };
    JobAuthorization: {
        fields: any;
    };
    JobCancelMessage: {
        fields: any;
    };
    JobCompletedEvent: {
        fields: any;
    };
    JobEndpoint: {
        fields: any;
    };
    JobEnvironment: {
        fields: any;
    };
    JobEvent: {
        fields: any;
    };
    JobOption: {
        fields: any;
    };
    JobRequestMessage: {
        fields: any;
    };
    MaskHint: {
        fields: any;
    };
    MaskType: {
        enumValues: {
            "variable": number;
            "regex": number;
        };
    };
    TaskAgent: {
        fields: any;
    };
    TaskAgentJobRequest: {
        fields: any;
    };
    TaskAgentMessage: {
        fields: any;
    };
    TaskAgentPool: {
        fields: any;
    };
    TaskAgentPoolReference: {
        fields: any;
    };
    TaskAgentReference: {
        fields: any;
    };
    TaskAgentSession: {
        fields: any;
    };
    TaskAgentStatus: {
        enumValues: {
            "offline": number;
            "online": number;
        };
    };
    TaskDefinition: {
        fields: any;
    };
    TaskExecution: {
        fields: any;
    };
    TaskGroupDefinition: {
        fields: any;
    };
    TaskInputDefinition: {
        fields: any;
    };
    TaskInstance: {
        fields: any;
    };
    TaskLog: {
        fields: any;
    };
    TaskLogReference: {
        fields: any;
    };
    TaskOrchestrationContainer: {
        fields: any;
    };
    TaskOrchestrationItem: {
        fields: any;
    };
    TaskOrchestrationItemType: {
        enumValues: {
            "container": number;
            "job": number;
        };
    };
    TaskOrchestrationJob: {
        fields: any;
    };
    TaskOrchestrationPlan: {
        fields: any;
    };
    TaskOrchestrationPlanReference: {
        fields: any;
    };
    TaskOrchestrationPlanState: {
        enumValues: {
            "inProgress": number;
            "queued": number;
            "completed": number;
        };
    };
    TaskPackageMetadata: {
        fields: any;
    };
    TaskReference: {
        fields: any;
    };
    TaskResult: {
        enumValues: {
            "succeeded": number;
            "succeededWithIssues": number;
            "failed": number;
            "canceled": number;
            "skipped": number;
            "abandoned": number;
        };
    };
    TaskVersion: {
        fields: any;
    };
    Timeline: {
        fields: any;
    };
    TimelineRecord: {
        fields: any;
    };
    TimelineRecordState: {
        enumValues: {
            "pending": number;
            "inProgress": number;
            "completed": number;
        };
    };
    TimelineReference: {
        fields: any;
    };
};
