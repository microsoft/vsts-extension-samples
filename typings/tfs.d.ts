// Type definitions for Microsoft Visual Studio Services v94.20160202.0901
// Project: http://www.visualstudio.com/integrate/extensions/overview
// Definitions by: Microsoft <vsointegration@microsoft.com>

/// <reference path='vss.d.ts' />
declare module "TFS/Build/Contracts" {
import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export interface AgentPoolQueue extends ShallowReference {
    _links: any;
    /**
     * The pool used by this queue.
     */
    pool: TaskAgentPoolReference;
}
export enum AgentStatus {
    /**
     * Indicates that the build agent cannot be contacted.
     */
    Unavailable = 0,
    /**
     * Indicates that the build agent is currently available.
     */
    Available = 1,
    /**
     * Indicates that the build agent has taken itself offline.
     */
    Offline = 2,
}
export interface ArtifactResource {
    _links: any;
    /**
     * The type-specific resource data. For example, "#/10002/5/drop", "$/drops/5", "\\myshare\myfolder\mydrops\5"
     */
    data: string;
    /**
     * Link to the resource. This might include things like query parameters to download as a zip file
     */
    downloadUrl: string;
    /**
     * Properties of Artifact Resource
     */
    properties: {
        [key: string]: string;
    };
    /**
     * The type of the resource: File container, version control folder, UNC path, etc.
     */
    type: string;
    /**
     * Link to the resource
     */
    url: string;
}
export enum AuditAction {
    Add = 1,
    Update = 2,
    Delete = 3,
}
/**
 * Data representation of a build
 */
export interface Build {
    _links: any;
    /**
     * Build number/name of the build
     */
    buildNumber: string;
    /**
     * Build number revision
     */
    buildNumberRevision: number;
    /**
     * The build controller. This should only be set if the definition type is Xaml.
     */
    controller: BuildController;
    /**
     * The definition associated with the build
     */
    definition: DefinitionReference;
    /**
     * Indicates whether the build has been deleted.
     */
    deleted: boolean;
    /**
     * Demands
     */
    demands: any[];
    /**
     * Time that the build was completed
     */
    finishTime: Date;
    /**
     * Id of the build
     */
    id: number;
    keepForever: boolean;
    /**
     * Process or person that last changed the build
     */
    lastChangedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Date the build was last changed
     */
    lastChangedDate: Date;
    /**
     * Log location of the build
     */
    logs: BuildLogReference;
    /**
     * Orchestration plan for the build
     */
    orchestrationPlan: TaskOrchestrationPlanReference;
    /**
     * Parameters for the build
     */
    parameters: string;
    /**
     * The build's priority
     */
    priority: QueuePriority;
    /**
     * The team project
     */
    project: TFS_Core_Contracts.TeamProjectReference;
    properties: any;
    /**
     * Quality of the xaml build (good, bad, etc.)
     */
    quality: string;
    /**
     * The queue. This should only be set if the definition type is Build.
     */
    queue: AgentPoolQueue;
    /**
     * Queue option of the build.
     */
    queueOptions: QueueOptions;
    /**
     * The current position of the build in the queue
     */
    queuePosition: number;
    /**
     * Time that the build was queued
     */
    queueTime: Date;
    /**
     * Reason that the build was created
     */
    reason: BuildReason;
    /**
     * The repository
     */
    repository: BuildRepository;
    /**
     * The identity that queued the build
     */
    requestedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * The identity on whose behalf the build was queued
     */
    requestedFor: VSS_Common_Contracts.IdentityRef;
    /**
     * The build result
     */
    result: BuildResult;
    /**
     * Source branch
     */
    sourceBranch: string;
    /**
     * Source version
     */
    sourceVersion: string;
    /**
     * Time that the build was started
     */
    startTime: Date;
    /**
     * Status of the build
     */
    status: BuildStatus;
    tags: string[];
    /**
     * Uri of the build
     */
    uri: string;
    /**
     * REST url of the build
     */
    url: string;
    validationResults: BuildRequestValidationResult[];
}
export interface BuildAgent {
    buildDirectory: string;
    controller: ShallowReference;
    createdDate: Date;
    description: string;
    enabled: boolean;
    id: number;
    messageQueueUrl: string;
    name: string;
    reservedForBuild: string;
    server: ShallowReference;
    status: AgentStatus;
    statusMessage: string;
    updatedDate: Date;
    uri: string;
    url: string;
}
export interface BuildArtifact {
    /**
     * The artifact id
     */
    id: number;
    /**
     * The name of the artifact
     */
    name: string;
    /**
     * The actual resource
     */
    resource: ArtifactResource;
}
export interface BuildArtifactAddedEvent extends BuildUpdatedEvent {
    artifact: BuildArtifact;
}
export enum BuildAuthorizationScope {
    /**
     * The identity used should have build service account permissions scoped to the project collection. This is useful when resources for a single build are spread across multiple projects.
     */
    ProjectCollection = 1,
    /**
     * The identity used should have build service account permissions scoped to the project in which the build definition resides. This is useful for isolation of build jobs to a particular team project to avoid any unintentional escalation of privilege attacks during a build.
     */
    Project = 2,
}
/**
 * Data representation of a build badge
 */
export interface BuildBadge {
    /**
     * Build id, if exists that this badge corresponds to
     */
    buildId: number;
    /**
     * Self Url that generates SVG
     */
    imageUrl: string;
}
export interface BuildChangesCalculatedEvent extends BuildUpdatedEvent {
    changes: Change[];
}
export interface BuildCompletedEvent extends BuildUpdatedEvent {
}
export interface BuildController extends ShallowReference {
    _links: any;
    /**
     * The date the controller was created.
     */
    createdDate: Date;
    /**
     * The description of the controller.
     */
    description: string;
    /**
     * Indicates whether the controller is enabled.
     */
    enabled: boolean;
    /**
     * The status of the controller.
     */
    status: ControllerStatus;
    /**
     * The date the controller was last updated.
     */
    updatedDate: Date;
    /**
     * The controller's URI.
     */
    uri: string;
}
export interface BuildDefinition extends BuildDefinitionReference {
    _links: any;
    /**
     * Indicates whether badges are enabled for this definition
     */
    badgeEnabled: boolean;
    build: BuildDefinitionStep[];
    /**
     * The build number format
     */
    buildNumberFormat: string;
    /**
     * The comment entered when saving the definition
     */
    comment: string;
    demands: any[];
    /**
     * The description
     */
    description: string;
    /**
     * The drop location for the definition
     */
    dropLocation: string;
    /**
     * Gets or sets the job authorization scope for builds which are queued against this definition
     */
    jobAuthorizationScope: BuildAuthorizationScope;
    /**
     * Gets or sets the job execution timeout in minutes for builds which are queued against this definition
     */
    jobTimeoutInMinutes: number;
    options: BuildOption[];
    properties: any;
    /**
     * The repository
     */
    repository: BuildRepository;
    retentionRules: RetentionPolicy[];
    triggers: BuildTrigger[];
    variables: {
        [key: string]: BuildDefinitionVariable;
    };
}
export interface BuildDefinitionChangedEvent {
    changeType: AuditAction;
    definition: BuildDefinition;
}
export interface BuildDefinitionChangingEvent {
    changeType: AuditAction;
    newDefinition: BuildDefinition;
    originalDefinition: BuildDefinition;
}
export interface BuildDefinitionReference extends DefinitionReference {
    /**
     * The author of the definition.
     */
    authoredBy: VSS_Common_Contracts.IdentityRef;
    /**
     * If this is a draft definition, it might have a parent
     */
    draftOf: DefinitionReference;
    /**
     * The quality of the definition document (draft, etc.)
     */
    quality: DefinitionQuality;
    /**
     * The default queue which should be used for requests.
     */
    queue: AgentPoolQueue;
}
export interface BuildDefinitionRevision {
    changedBy: VSS_Common_Contracts.IdentityRef;
    changedDate: Date;
    changeType: AuditAction;
    comment: string;
    definitionUrl: string;
    name: string;
    revision: number;
}
export interface BuildDefinitionSourceProvider {
    /**
     * Uri of the associated definition
     */
    definitionUri: string;
    /**
     * fields associated with this build definition
     */
    fields: {
        [key: string]: string;
    };
    /**
     * Id of this source provider
     */
    id: number;
    /**
     * The lst time this source provider was modified
     */
    lastModified: Date;
    /**
     * Name of the source provider
     */
    name: string;
    /**
     * Which trigger types are supported by this definition source provider
     */
    supportedTriggerTypes: DefinitionTriggerType;
}
export interface BuildDefinitionStep {
    alwaysRun: boolean;
    continueOnError: boolean;
    displayName: string;
    enabled: boolean;
    inputs: {
        [key: string]: string;
    };
    task: TaskDefinitionReference;
}
export interface BuildDefinitionTemplate {
    canDelete: boolean;
    category: string;
    description: string;
    iconTaskId: string;
    id: string;
    name: string;
    template: BuildDefinition;
}
export interface BuildDefinitionVariable {
    allowOverride: boolean;
    isSecret: boolean;
    value: string;
}
export interface BuildDeletedEvent extends RealtimeBuildEvent {
    build: Build;
}
export interface BuildDeployment {
    deployment: BuildSummary;
    sourceBuild: ShallowReference;
}
/**
 * Represents a build log.
 */
export interface BuildLog extends BuildLogReference {
    /**
     * The date the log was created.
     */
    createdOn: Date;
    /**
     * The date the log was last changed.
     */
    lastChangedOn: Date;
    /**
     * The number of lines in the log.
     */
    lineCount: number;
}
/**
 * Data representation of a build log reference
 */
export interface BuildLogReference {
    /**
     * The id of the log.
     */
    id: number;
    /**
     * The type of the log location.
     */
    type: string;
    /**
     * Full link to the log resource.
     */
    url: string;
}
export interface BuildOption {
    definition: BuildOptionDefinitionReference;
    enabled: boolean;
    inputs: {
        [key: string]: string;
    };
}
export interface BuildOptionDefinition extends BuildOptionDefinitionReference {
    description: string;
    groups: BuildOptionGroupDefinition[];
    inputs: BuildOptionInputDefinition[];
    name: string;
    ordinal: number;
}
export interface BuildOptionDefinitionReference {
    id: string;
}
export interface BuildOptionGroupDefinition {
    displayName: string;
    isExpanded: boolean;
    name: string;
}
export interface BuildOptionInputDefinition {
    defaultValue: string;
    groupName: string;
    help: {
        [key: string]: string;
    };
    label: string;
    name: string;
    options: {
        [key: string]: string;
    };
    required: boolean;
    type: BuildOptionInputType;
    visibleRule: string;
}
export enum BuildOptionInputType {
    String = 0,
    Boolean = 1,
    StringList = 2,
    Radio = 3,
    PickList = 4,
    MultiLine = 5,
}
export enum BuildPhaseStatus {
    /**
     * The state is not known.
     */
    Unknown = 0,
    /**
     * The build phase completed unsuccessfully.
     */
    Failed = 1,
    /**
     * The build phase completed successfully.
     */
    Succeeded = 2,
}
export interface BuildPollingSummaryEvent {
}
export interface BuildProcessTemplate {
    description: string;
    fileExists: boolean;
    id: number;
    parameters: string;
    serverPath: string;
    supportedReasons: BuildReason;
    teamProject: string;
    templateType: ProcessTemplateType;
    url: string;
    version: string;
}
export enum BuildQueryOrder {
    /**
     * Order by finish time ascending.
     */
    FinishTimeAscending = 2,
    /**
     * Order by finish time descending.
     */
    FinishTimeDescending = 3,
}
export enum BuildReason {
    /**
     * No reason. This value should not be used.
     */
    None = 0,
    /**
     * The build was started manually.
     */
    Manual = 1,
    /**
     * The build was started for the trigger TriggerType.ContinuousIntegration.
     */
    IndividualCI = 2,
    /**
     * The build was started for the trigger TriggerType.BatchedContinuousIntegration.
     */
    BatchedCI = 4,
    /**
     * The build was started for the trigger TriggerType.Schedule.
     */
    Schedule = 8,
    /**
     * The build was created by a user.
     */
    UserCreated = 32,
    /**
     * The build was started manually for private validation.
     */
    ValidateShelveset = 64,
    /**
     * The build was started for the trigger ContinuousIntegrationType.Gated.
     */
    CheckInShelveset = 128,
    /**
     * The build was triggered for retention policy purposes.
     */
    Triggered = 175,
    /**
     * All reasons.
     */
    All = 239,
}
export interface BuildRepository {
    checkoutSubmodules: boolean;
    /**
     * Indicates whether to clean the target folder when getting code from the repository. This is a String so that it can reference variables.
     */
    clean: string;
    /**
     * Gets or sets the name of the default branch.
     */
    defaultBranch: string;
    id: string;
    /**
     * Gets or sets the friendly name of the repository.
     */
    name: string;
    properties: {
        [key: string]: string;
    };
    /**
     * Gets or sets the root folder.
     */
    rootFolder: string;
    /**
     * Gets or sets the type of the repository.
     */
    type: string;
    /**
     * Gets or sets the url of the repository.
     */
    url: string;
}
export interface BuildRequestValidationResult {
    message: string;
    result: ValidationResult;
}
export interface BuildResourceUsage {
    distributedTaskAgents: number;
    totalUsage: number;
    xamlControllers: number;
}
export enum BuildResult {
    /**
     * No result
     */
    None = 0,
    /**
     * The build completed successfully.
     */
    Succeeded = 2,
    /**
     * The build completed compilation successfully but had other errors.
     */
    PartiallySucceeded = 4,
    /**
     * The build completed unsuccessfully.
     */
    Failed = 8,
    /**
     * The build was canceled before starting.
     */
    Canceled = 32,
}
export interface BuildServer {
    agents: ShallowReference[];
    controller: ShallowReference;
    id: number;
    isVirtual: boolean;
    messageQueueUrl: string;
    name: string;
    requireClientCertificates: boolean;
    status: ServiceHostStatus;
    statusChangedDate: Date;
    uri: string;
    url: string;
    version: number;
}
export interface BuildSettings {
    defaultRetentionPolicy: RetentionPolicy;
    maximumRetentionPolicy: RetentionPolicy;
}
export interface BuildStartedEvent extends BuildUpdatedEvent {
}
export enum BuildStatus {
    /**
     * No status.
     */
    None = 0,
    /**
     * The build is currently in progress.
     */
    InProgress = 1,
    /**
     * The build has completed.
     */
    Completed = 2,
    /**
     * The build is cancelling
     */
    Cancelling = 4,
    /**
     * The build is inactive in the queue.
     */
    Postponed = 8,
    /**
     * The build has not yet started.
     */
    NotStarted = 32,
    /**
     * All status.
     */
    All = 47,
}
export interface BuildSummary {
    build: ShallowReference;
    finishTime: Date;
    keepForever: boolean;
    quality: string;
    reason: BuildReason;
    requestedFor: VSS_Common_Contracts.IdentityRef;
    startTime: Date;
    status: BuildStatus;
}
export interface BuildTrigger {
    triggerType: DefinitionTriggerType;
}
export interface BuildUpdatedEvent extends RealtimeBuildEvent {
    build: Build;
}
export interface BuildWorkspace {
    mappings: MappingDetails[];
}
/**
 * Represents a change associated with a build.
 */
export interface Change {
    /**
     * The author of the change.
     */
    author: VSS_Common_Contracts.IdentityRef;
    /**
     * The location of a user-friendly representation of the resource.
     */
    displayUri: string;
    /**
     * Something that identifies the change. For a commit, this would be the SHA1. For a TFVC changeset, this would be the changeset id.
     */
    id: string;
    /**
     * The location of the full representation of the resource.
     */
    location: string;
    /**
     * A description of the change. This might be a commit message or changeset description.
     */
    message: string;
    /**
     * Indicates whether the message was truncated
     */
    messageTruncated: boolean;
    /**
     * A timestamp for the change.
     */
    timestamp: Date;
    /**
     * The type of change. "commit", "changeset", etc.
     */
    type: string;
}
export interface ConsoleLogEvent extends RealtimeBuildEvent {
    lines: string[];
    timelineId: string;
    timelineRecordId: string;
}
export interface ContinuousDeploymentDefinition {
    /**
     * The connected service associated with the continuous deployment
     */
    connectedService: TFS_Core_Contracts.WebApiConnectedServiceRef;
    /**
     * The definition associated with the continuous deployment
     */
    definition: ShallowReference;
    gitBranch: string;
    hostedServiceName: string;
    project: TFS_Core_Contracts.TeamProjectReference;
    repositoryId: string;
    storageAccountName: string;
    subscriptionId: string;
    website: string;
    webspace: string;
}
export interface ContinuousIntegrationTrigger extends BuildTrigger {
    batchChanges: boolean;
    branchFilters: string[];
    maxConcurrentBuildsPerBranch: number;
    /**
     * The polling interval in seconds.
     */
    pollingInterval: number;
    /**
     * This is the id of the polling job that polls the external repository.  Once the build definition is saved/updated, this value is set.
     */
    pollingJobId: string;
}
export enum ControllerStatus {
    /**
     * Indicates that the build controller cannot be contacted.
     */
    Unavailable = 0,
    /**
     * Indicates that the build controller is currently available.
     */
    Available = 1,
    /**
     * Indicates that the build controller has taken itself offline.
     */
    Offline = 2,
}
export enum DefinitionQuality {
    Definition = 1,
    Draft = 2,
}
export enum DefinitionQueryOrder {
    /**
     * No order
     */
    None = 0,
    /**
     * Order by created on/last modified time ascending.
     */
    LastModifiedAscending = 1,
    /**
     * Order by created on/last modified time descending.
     */
    LastModifiedDescending = 2,
}
export enum DefinitionQueueStatus {
    /**
     * When enabled the definition queue allows builds to be queued by users, the system will queue scheduled, gated and continuous integration builds, and the queued builds will be started by the system.
     */
    Enabled = 0,
    /**
     * When paused the definition queue allows builds to be queued by users and the system will queue scheduled, gated and continuous integration builds. Builds in the queue will not be started by the system.
     */
    Paused = 1,
    /**
     * When disabled the definition queue will not allow builds to be queued by users and the system will not queue scheduled, gated or continuous integration builds. Builds already in the queue will not be started by the system.
     */
    Disabled = 2,
}
/**
 * A reference to a definition.
 */
export interface DefinitionReference extends ShallowReference {
    /**
     * The date the definition was created
     */
    createdDate: Date;
    /**
     * The project.
     */
    project: TFS_Core_Contracts.TeamProjectReference;
    /**
     * If builds can be queued from this definition
     */
    queueStatus: DefinitionQueueStatus;
    /**
     * The definition revision number.
     */
    revision: number;
    /**
     * The type of the definition.
     */
    type: DefinitionType;
    /**
     * The Uri of the definition
     */
    uri: string;
}
export enum DefinitionTriggerType {
    /**
     * Manual builds only.
     */
    None = 1,
    /**
     * A build should be started for each changeset.
     */
    ContinuousIntegration = 2,
    /**
     * A build should be started for multiple changesets at a time at a specified interval.
     */
    BatchedContinuousIntegration = 4,
    /**
     * A build should be started on a specified schedule whether or not changesets exist.
     */
    Schedule = 8,
    /**
     * A validation build should be started for each check-in.
     */
    GatedCheckIn = 16,
    /**
     * A validation build should be started for each batch of check-ins.
     */
    BatchedGatedCheckIn = 32,
    /**
     * All types.
     */
    All = 63,
}
export enum DefinitionType {
    Xaml = 1,
    Build = 2,
}
export enum DeleteOptions {
    /**
     * No data should be deleted. This value should not be used.
     */
    None = 0,
    /**
     * The drop location should be deleted.
     */
    DropLocation = 1,
    /**
     * The test results should be deleted.
     */
    TestResults = 2,
    /**
     * The version control label should be deleted.
     */
    Label = 4,
    /**
     * The build should be deleted.
     */
    Details = 8,
    /**
     * Published symbols should be deleted.
     */
    Symbols = 16,
    /**
     * All data should be deleted.
     */
    All = 31,
}
/**
 * Represents the data from the build information nodes for type "DeploymentInformation" for xaml builds
 */
export interface Deployment {
    type: string;
}
/**
 * Deployment iformation for type "Build"
 */
export interface DeploymentBuild extends Deployment {
    buildId: number;
}
/**
 * Deployment iformation for type "Deploy"
 */
export interface DeploymentDeploy extends Deployment {
    message: string;
}
/**
 * Deployment iformation for type "Test"
 */
export interface DeploymentTest extends Deployment {
    runId: number;
}
export enum GetOption {
    /**
     * Use the latest changeset at the time the build is queued.
     */
    LatestOnQueue = 0,
    /**
     * Use the latest changeset at the time the build is started.
     */
    LatestOnBuild = 1,
    /**
     * A user-specified version has been supplied.
     */
    Custom = 2,
}
/**
 * Data representation of an information node associated with a build
 */
export interface InformationNode {
    /**
     * Fields of the information node
     */
    fields: {
        [key: string]: string;
    };
    /**
     * Process or person that last modified this node
     */
    lastModifiedBy: string;
    /**
     * Date this node was last modified
     */
    lastModifiedDate: Date;
    /**
     * Node Id of this information node
     */
    nodeId: number;
    /**
     * Id of parent node (xml tree)
     */
    parentId: number;
    /**
     * The type of the information node
     */
    type: string;
}
export interface Issue {
    category: string;
    data: {
        [key: string]: string;
    };
    message: string;
    type: IssueType;
}
export enum IssueType {
    Error = 1,
    Warning = 2,
}
export interface MappingDetails {
    localPath: string;
    mappingType: string;
    serverPath: string;
}
export enum ProcessTemplateType {
    /**
     * Indicates a custom template.
     */
    Custom = 0,
    /**
     * Indicates a default template.
     */
    Default = 1,
    /**
     * Indicates an upgrade template.
     */
    Upgrade = 2,
}
export interface PropertyValue {
    /**
     * Guid of identity that changed this property value
     */
    changedBy: string;
    /**
     * The date this property value was changed
     */
    changedDate: Date;
    /**
     * Name in the name value mapping
     */
    propertyName: string;
    /**
     * Value in the name value mapping
     */
    value: any;
}
export enum QueryDeletedOption {
    /**
     * Include only non-deleted builds.
     */
    ExcludeDeleted = 0,
    /**
     * Include deleted and non-deleted builds.
     */
    IncludeDeleted = 1,
    /**
     * Include only deleted builds.
     */
    OnlyDeleted = 2,
}
export enum QueueOptions {
    /**
     * No queue options
     */
    None = 0,
    /**
     * Create a plan Id for the build, do not run it
     */
    DoNotRun = 1,
}
export enum QueuePriority {
    /**
     * Low priority.
     */
    Low = 5,
    /**
     * Below normal priority.
     */
    BelowNormal = 4,
    /**
     * Normal priority.
     */
    Normal = 3,
    /**
     * Above normal priority.
     */
    AboveNormal = 2,
    /**
     * High priority.
     */
    High = 1,
}
export interface RealtimeBuildEvent {
    buildId: number;
}
export interface RequestReference {
    /**
     * Id of the resource
     */
    id: number;
    /**
     * Name of the requestor
     */
    requestedFor: VSS_Common_Contracts.IdentityRef;
    /**
     * Full http link to the resource
     */
    url: string;
}
export interface RetentionPolicy {
    artifacts: string[];
    branches: string[];
    daysToKeep: number;
    deleteBuildRecord: boolean;
    deleteTestResults: boolean;
    minimumToKeep: number;
}
export interface Schedule {
    branchFilters: string[];
    /**
     * Days for a build (flags enum for days of the week)
     */
    daysToBuild: ScheduleDays;
    /**
     * The Job Id of the Scheduled job that will queue the scheduled build. Since a single trigger can have multiple schedules and we want a single job to process a single schedule (since each schedule has a list of branches to build), the schedule itself needs to define the Job Id. This value will be filled in when a definition is added or updated.  The UI does not provide it or use it.
     */
    scheduleJobId: string;
    /**
     * Local timezone hour to start
     */
    startHours: number;
    /**
     * Local timezone minute to start
     */
    startMinutes: number;
    /**
     * Time zone of the build schedule (string representation of the time zone id)
     */
    timeZoneId: string;
}
export enum ScheduleDays {
    /**
     * Do not run.
     */
    None = 0,
    /**
     * Run on Monday.
     */
    Monday = 1,
    /**
     * Run on Tuesday.
     */
    Tuesday = 2,
    /**
     * Run on Wednesday.
     */
    Wednesday = 4,
    /**
     * Run on Thursday.
     */
    Thursday = 8,
    /**
     * Run on Friday.
     */
    Friday = 16,
    /**
     * Run on Saturday.
     */
    Saturday = 32,
    /**
     * Run on Sunday.
     */
    Sunday = 64,
    /**
     * Run on all days of the week.
     */
    All = 127,
}
export interface ScheduleTrigger extends BuildTrigger {
    schedules: Schedule[];
}
export enum ServiceHostStatus {
    /**
     * The service host is currently connected and accepting commands.
     */
    Online = 1,
    /**
     * The service host is currently disconnected and not accepting commands.
     */
    Offline = 2,
}
/**
 * An abstracted reference to some other resource. This class is used to provide the build data contracts with a uniform way to reference other resources in a way that provides easy traversal through links.
 */
export interface ShallowReference {
    /**
     * Id of the resource
     */
    id: number;
    /**
     * Name of the linked resource (definition name, controller name, etc.)
     */
    name: string;
    /**
     * Full http link to the resource
     */
    url: string;
}
export interface SvnMappingDetails {
    depth: number;
    ignoreExternals: boolean;
    localPath: string;
    revision: string;
    serverPath: string;
}
export interface SvnWorkspace {
    mappings: SvnMappingDetails[];
}
export interface TaskAgentPoolReference {
    id: number;
    name: string;
}
export interface TaskDefinitionReference {
    id: string;
    versionSpec: string;
}
export interface TaskOrchestrationPlanReference {
    planId: string;
}
export enum TaskResult {
    Succeeded = 0,
    SucceededWithIssues = 1,
    Failed = 2,
    Canceled = 3,
    Skipped = 4,
    Abandoned = 5,
}
export interface Timeline extends TimelineReference {
    lastChangedBy: string;
    lastChangedOn: Date;
    records: TimelineRecord[];
}
export interface TimelineRecord {
    _links: any;
    changeId: number;
    currentOperation: string;
    details: TimelineReference;
    errorCount: number;
    finishTime: Date;
    id: string;
    issues: Issue[];
    lastModified: Date;
    log: BuildLogReference;
    name: string;
    order: number;
    parentId: string;
    percentComplete: number;
    result: TaskResult;
    resultCode: string;
    startTime: Date;
    state: TimelineRecordState;
    type: string;
    url: string;
    warningCount: number;
    workerName: string;
}
export enum TimelineRecordState {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}
export interface TimelineRecordsUpdatedEvent extends RealtimeBuildEvent {
    timelineRecords: TimelineRecord[];
}
export interface TimelineReference {
    changeId: number;
    id: string;
    url: string;
}
export enum ValidationResult {
    OK = 0,
    Warning = 1,
    Error = 2,
}
/**
 * Mapping for a workspace
 */
export interface WorkspaceMapping {
    /**
     * Uri of the associated definition
     */
    definitionUri: string;
    /**
     * Depth of this mapping
     */
    depth: number;
    /**
     * local location of the definition
     */
    localItem: string;
    /**
     * type of workspace mapping
     */
    mappingType: WorkspaceMappingType;
    /**
     * Server location of the definition
     */
    serverItem: string;
    /**
     * Id of the workspace
     */
    workspaceId: number;
}
export enum WorkspaceMappingType {
    /**
     * The path is mapped in the workspace.
     */
    Map = 0,
    /**
     * The path is cloaked in the workspace.
     */
    Cloak = 1,
}
export interface WorkspaceTemplate {
    /**
     * Uri of the associated definition
     */
    definitionUri: string;
    /**
     * The identity that last modified this template
     */
    lastModifiedBy: string;
    /**
     * The last time this template was modified
     */
    lastModifiedDate: Date;
    /**
     * List of workspace mappings
     */
    mappings: WorkspaceMapping[];
    /**
     * Id of the workspace for this template
     */
    workspaceId: number;
}
export interface XamlBuildDefinition extends DefinitionReference {
    _links: any;
    /**
     * Batch size of the definition
     */
    batchSize: number;
    buildArgs: string;
    /**
     * The continuous integration quiet period
     */
    continuousIntegrationQuietPeriod: number;
    /**
     * The build controller
     */
    controller: BuildController;
    /**
     * The date this definition was created
     */
    createdOn: Date;
    /**
     * Default drop location for builds from this definition
     */
    defaultDropLocation: string;
    /**
     * Description of the definition
     */
    description: string;
    /**
     * The last build on this definition
     */
    lastBuild: ShallowReference;
    /**
     * The repository
     */
    repository: BuildRepository;
    /**
     * The reasons supported by the template
     */
    supportedReasons: BuildReason;
    /**
     * How builds are triggered from this definition
     */
    triggerType: DefinitionTriggerType;
}
export var TypeInfo: {
    AgentPoolQueue: {
        fields: any;
    };
    AgentStatus: {
        enumValues: {
            "unavailable": number;
            "available": number;
            "offline": number;
        };
    };
    ArtifactResource: {
        fields: any;
    };
    AuditAction: {
        enumValues: {
            "add": number;
            "update": number;
            "delete": number;
        };
    };
    Build: {
        fields: any;
    };
    BuildAgent: {
        fields: any;
    };
    BuildArtifact: {
        fields: any;
    };
    BuildArtifactAddedEvent: {
        fields: any;
    };
    BuildAuthorizationScope: {
        enumValues: {
            "projectCollection": number;
            "project": number;
        };
    };
    BuildBadge: {
        fields: any;
    };
    BuildChangesCalculatedEvent: {
        fields: any;
    };
    BuildCompletedEvent: {
        fields: any;
    };
    BuildController: {
        fields: any;
    };
    BuildDefinition: {
        fields: any;
    };
    BuildDefinitionChangedEvent: {
        fields: any;
    };
    BuildDefinitionChangingEvent: {
        fields: any;
    };
    BuildDefinitionReference: {
        fields: any;
    };
    BuildDefinitionRevision: {
        fields: any;
    };
    BuildDefinitionSourceProvider: {
        fields: any;
    };
    BuildDefinitionStep: {
        fields: any;
    };
    BuildDefinitionTemplate: {
        fields: any;
    };
    BuildDefinitionVariable: {
        fields: any;
    };
    BuildDeletedEvent: {
        fields: any;
    };
    BuildDeployment: {
        fields: any;
    };
    BuildLog: {
        fields: any;
    };
    BuildLogReference: {
        fields: any;
    };
    BuildOption: {
        fields: any;
    };
    BuildOptionDefinition: {
        fields: any;
    };
    BuildOptionDefinitionReference: {
        fields: any;
    };
    BuildOptionGroupDefinition: {
        fields: any;
    };
    BuildOptionInputDefinition: {
        fields: any;
    };
    BuildOptionInputType: {
        enumValues: {
            "string": number;
            "boolean": number;
            "stringList": number;
            "radio": number;
            "pickList": number;
            "multiLine": number;
        };
    };
    BuildPhaseStatus: {
        enumValues: {
            "unknown": number;
            "failed": number;
            "succeeded": number;
        };
    };
    BuildPollingSummaryEvent: {
        fields: any;
    };
    BuildProcessTemplate: {
        fields: any;
    };
    BuildQueryOrder: {
        enumValues: {
            "finishTimeAscending": number;
            "finishTimeDescending": number;
        };
    };
    BuildReason: {
        enumValues: {
            "none": number;
            "manual": number;
            "individualCI": number;
            "batchedCI": number;
            "schedule": number;
            "userCreated": number;
            "validateShelveset": number;
            "checkInShelveset": number;
            "triggered": number;
            "all": number;
        };
    };
    BuildRepository: {
        fields: any;
    };
    BuildRequestValidationResult: {
        fields: any;
    };
    BuildResourceUsage: {
        fields: any;
    };
    BuildResult: {
        enumValues: {
            "none": number;
            "succeeded": number;
            "partiallySucceeded": number;
            "failed": number;
            "canceled": number;
        };
    };
    BuildServer: {
        fields: any;
    };
    BuildSettings: {
        fields: any;
    };
    BuildStartedEvent: {
        fields: any;
    };
    BuildStatus: {
        enumValues: {
            "none": number;
            "inProgress": number;
            "completed": number;
            "cancelling": number;
            "postponed": number;
            "notStarted": number;
            "all": number;
        };
    };
    BuildSummary: {
        fields: any;
    };
    BuildTrigger: {
        fields: any;
    };
    BuildUpdatedEvent: {
        fields: any;
    };
    BuildWorkspace: {
        fields: any;
    };
    Change: {
        fields: any;
    };
    ConsoleLogEvent: {
        fields: any;
    };
    ContinuousDeploymentDefinition: {
        fields: any;
    };
    ContinuousIntegrationTrigger: {
        fields: any;
    };
    ControllerStatus: {
        enumValues: {
            "unavailable": number;
            "available": number;
            "offline": number;
        };
    };
    DefinitionQuality: {
        enumValues: {
            "definition": number;
            "draft": number;
        };
    };
    DefinitionQueryOrder: {
        enumValues: {
            "none": number;
            "lastModifiedAscending": number;
            "lastModifiedDescending": number;
        };
    };
    DefinitionQueueStatus: {
        enumValues: {
            "enabled": number;
            "paused": number;
            "disabled": number;
        };
    };
    DefinitionReference: {
        fields: any;
    };
    DefinitionTriggerType: {
        enumValues: {
            "none": number;
            "continuousIntegration": number;
            "batchedContinuousIntegration": number;
            "schedule": number;
            "gatedCheckIn": number;
            "batchedGatedCheckIn": number;
            "all": number;
        };
    };
    DefinitionType: {
        enumValues: {
            "xaml": number;
            "build": number;
        };
    };
    DeleteOptions: {
        enumValues: {
            "none": number;
            "dropLocation": number;
            "testResults": number;
            "label": number;
            "details": number;
            "symbols": number;
            "all": number;
        };
    };
    Deployment: {
        fields: any;
    };
    DeploymentBuild: {
        fields: any;
    };
    DeploymentDeploy: {
        fields: any;
    };
    DeploymentTest: {
        fields: any;
    };
    GetOption: {
        enumValues: {
            "latestOnQueue": number;
            "latestOnBuild": number;
            "custom": number;
        };
    };
    InformationNode: {
        fields: any;
    };
    Issue: {
        fields: any;
    };
    IssueType: {
        enumValues: {
            "error": number;
            "warning": number;
        };
    };
    MappingDetails: {
        fields: any;
    };
    ProcessTemplateType: {
        enumValues: {
            "custom": number;
            "default": number;
            "upgrade": number;
        };
    };
    PropertyValue: {
        fields: any;
    };
    QueryDeletedOption: {
        enumValues: {
            "excludeDeleted": number;
            "includeDeleted": number;
            "onlyDeleted": number;
        };
    };
    QueueOptions: {
        enumValues: {
            "none": number;
            "doNotRun": number;
        };
    };
    QueuePriority: {
        enumValues: {
            "low": number;
            "belowNormal": number;
            "normal": number;
            "aboveNormal": number;
            "high": number;
        };
    };
    RealtimeBuildEvent: {
        fields: any;
    };
    RequestReference: {
        fields: any;
    };
    RetentionPolicy: {
        fields: any;
    };
    Schedule: {
        fields: any;
    };
    ScheduleDays: {
        enumValues: {
            "none": number;
            "monday": number;
            "tuesday": number;
            "wednesday": number;
            "thursday": number;
            "friday": number;
            "saturday": number;
            "sunday": number;
            "all": number;
        };
    };
    ScheduleTrigger: {
        fields: any;
    };
    ServiceHostStatus: {
        enumValues: {
            "online": number;
            "offline": number;
        };
    };
    ShallowReference: {
        fields: any;
    };
    SvnMappingDetails: {
        fields: any;
    };
    SvnWorkspace: {
        fields: any;
    };
    TaskAgentPoolReference: {
        fields: any;
    };
    TaskDefinitionReference: {
        fields: any;
    };
    TaskOrchestrationPlanReference: {
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
    TimelineRecordsUpdatedEvent: {
        fields: any;
    };
    TimelineReference: {
        fields: any;
    };
    ValidationResult: {
        enumValues: {
            "oK": number;
            "warning": number;
            "error": number;
        };
    };
    WorkspaceMapping: {
        fields: any;
    };
    WorkspaceMappingType: {
        enumValues: {
            "map": number;
            "cloak": number;
        };
    };
    WorkspaceTemplate: {
        fields: any;
    };
    XamlBuildDefinition: {
        fields: any;
    };
};
}
declare module "TFS/Build/ExtensionContracts" {
import Build_Contracts = require("TFS/Build/Contracts");
/**
* Interface defining the configuration that is shared between extension targeted at "ms.vss-build-web.build-results-view" and the host
*/
export interface IBuildResultsViewExtensionConfig {
    /**
    * Required if reacting to the current build.
    * More than one callbacks can be added, and all will be called.
    * It is important to have atleast one call back, since that's how an extension can get information about the current build.
    */
    onBuildChanged: (handler: (build: Build_Contracts.Build) => void) => void;
    /**
    * Optional, If needed, this callback will be called when this particular extension is selected/displayed
    */
    onViewDisplayed: (onDisplayedCallBack: () => void) => void;
    /**
    * Optional, for a given tab id, which can be contribution id for tab or a well known tab id,
    * the corresponding tab is selected if the tab is visible.
    */
    selectTab: (tabId: string) => void;
}
/**
* Existing tab ids in build results view
*/
export var BuildResultsViewTabIds: {
    Summary: string;
    Console: string;
    Logs: string;
    Timeline: string;
    Artifacts: string;
    XamlLog: string;
    XamlDiagnostics: string;
};
/**
* Existing section ids in build results view's summary tab
*/
export var BuildResultsSummaryTabSectionIds: {
    BuildDetails: string;
    BuildIssues: string;
    AssociatedChangeset: string;
    DeploymentInformation: string;
    BuildTags: string;
    TestSummary: string;
    CodeCoverageSummary: string;
    AssociatedWorkItem: string;
};
}
declare module "TFS/Build/RestClient" {
import Contracts = require("TFS/Build/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class BuildHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API] Associates an artifact with a build
     *
     * @param {Contracts.BuildArtifact} artifact
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact>
     */
    createArtifact(artifact: Contracts.BuildArtifact, buildId: number, project?: string): IPromise<Contracts.BuildArtifact>;
    /**
     * [Preview API] Gets a specific artifact for a build
     *
     * @param {number} buildId
     * @param {string} artifactName
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact>
     */
    getArtifact(buildId: number, artifactName: string, project?: string): IPromise<Contracts.BuildArtifact>;
    /**
     * [Preview API] Gets a specific artifact for a build
     *
     * @param {number} buildId
     * @param {string} artifactName
     * @param {string} project - Project ID or project name
     * @return IPromise<ArrayBuffer>
     */
    getArtifactContentZip(buildId: number, artifactName: string, project?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Gets all artifacts for a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact[]>
     */
    getArtifacts(buildId: number, project?: string): IPromise<Contracts.BuildArtifact[]>;
    /**
     * [Preview API]
     *
     * @param {string} project
     * @param {number} definitionId
     * @param {string} branchName
     * @return IPromise<string>
     */
    getBadge(project: string, definitionId: number, branchName?: string): IPromise<string>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} repoType
     * @param {string} repoId
     * @param {string} branchName
     * @return IPromise<Contracts.BuildBadge>
     */
    getBuildBadge(project: string, repoType: string, repoId?: string, branchName?: string): IPromise<Contracts.BuildBadge>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} repoType
     * @param {string} repoId
     * @param {string} branchName
     * @return IPromise<string>
     */
    getBuildBadgeData(project: string, repoType: string, repoId?: string, branchName?: string): IPromise<string>;
    /**
     * [Preview API] Deletes a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteBuild(buildId: number, project?: string): IPromise<void>;
    /**
     * [Preview API] Gets a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @param {string} propertyFilters - A comma-delimited list of properties to include in the results
     * @return IPromise<Contracts.Build>
     */
    getBuild(buildId: number, project?: string, propertyFilters?: string): IPromise<Contracts.Build>;
    /**
     * [Preview API] Gets builds
     *
     * @param {string} project - Project ID or project name
     * @param {number[]} definitions - A comma-delimited list of definition ids
     * @param {number[]} queues - A comma-delimited list of queue ids
     * @param {string} buildNumber
     * @param {Date} minFinishTime
     * @param {Date} maxFinishTime
     * @param {string} requestedFor
     * @param {Contracts.BuildReason} reasonFilter
     * @param {Contracts.BuildStatus} statusFilter
     * @param {Contracts.BuildResult} resultFilter
     * @param {string[]} tagFilters - A comma-delimited list of tags
     * @param {string[]} properties - A comma-delimited list of properties to include in the results
     * @param {Contracts.DefinitionType} type - The definition type
     * @param {number} top - The maximum number of builds to retrieve
     * @param {string} continuationToken
     * @param {number} maxBuildsPerDefinition
     * @param {Contracts.QueryDeletedOption} deletedFilter
     * @param {Contracts.BuildQueryOrder} queryOrder
     * @param {string} branchName
     * @return IPromise<Contracts.Build[]>
     */
    getBuilds(project?: string, definitions?: number[], queues?: number[], buildNumber?: string, minFinishTime?: Date, maxFinishTime?: Date, requestedFor?: string, reasonFilter?: Contracts.BuildReason, statusFilter?: Contracts.BuildStatus, resultFilter?: Contracts.BuildResult, tagFilters?: string[], properties?: string[], type?: Contracts.DefinitionType, top?: number, continuationToken?: string, maxBuildsPerDefinition?: number, deletedFilter?: Contracts.QueryDeletedOption, queryOrder?: Contracts.BuildQueryOrder, branchName?: string): IPromise<Contracts.Build[]>;
    /**
     * [Preview API] Queues a build
     *
     * @param {Contracts.Build} build
     * @param {string} project - Project ID or project name
     * @param {boolean} ignoreWarnings
     * @return IPromise<Contracts.Build>
     */
    queueBuild(build: Contracts.Build, project?: string, ignoreWarnings?: boolean): IPromise<Contracts.Build>;
    /**
     * [Preview API] Updates a build
     *
     * @param {Contracts.Build} build
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.Build>
     */
    updateBuild(build: Contracts.Build, buildId: number, project?: string): IPromise<Contracts.Build>;
    /**
     * [Preview API] Gets the changes associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} continuationToken
     * @param {number} top - The maximum number of changes to return
     * @return IPromise<Contracts.Change[]>
     */
    getBuildChanges(project: string, buildId: number, continuationToken?: string, top?: number): IPromise<Contracts.Change[]>;
    /**
     * [Preview API] Gets the changes associated between given builds
     *
     * @param {string} project - Project ID or project name
     * @param {number} fromBuildId
     * @param {number} toBuildId
     * @param {number} top - The maximum number of changes to return
     * @return IPromise<Contracts.Change[]>
     */
    getChangesBetweenBuilds(project: string, fromBuildId?: number, toBuildId?: number, top?: number): IPromise<Contracts.Change[]>;
    /**
     * [Preview API] Gets a controller
     *
     * @param {number} controllerId
     * @return IPromise<Contracts.BuildController>
     */
    getBuildController(controllerId: number): IPromise<Contracts.BuildController>;
    /**
     * [Preview API] Gets controller, optionally filtered by name
     *
     * @param {string} name
     * @return IPromise<Contracts.BuildController[]>
     */
    getBuildControllers(name?: string): IPromise<Contracts.BuildController[]>;
    /**
     * [Preview API] Creates a new definition
     *
     * @param {Contracts.BuildDefinition} definition
     * @param {string} project - Project ID or project name
     * @param {number} definitionToCloneId
     * @param {number} definitionToCloneRevision
     * @return IPromise<Contracts.BuildDefinition>
     */
    createDefinition(definition: Contracts.BuildDefinition, project?: string, definitionToCloneId?: number, definitionToCloneRevision?: number): IPromise<Contracts.BuildDefinition>;
    /**
     * [Preview API] Deletes a definition and all associated builds
     *
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteDefinition(definitionId: number, project?: string): IPromise<void>;
    /**
     * [Preview API] Gets a definition, optionally at a specific revision
     *
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @param {number} revision
     * @param {string[]} propertyFilters
     * @return IPromise<Contracts.DefinitionReference>
     */
    getDefinition(definitionId: number, project?: string, revision?: number, propertyFilters?: string[]): IPromise<Contracts.DefinitionReference>;
    /**
     * [Preview API] Gets definitions, optionally filtered by name
     *
     * @param {string} project - Project ID or project name
     * @param {string} name
     * @param {Contracts.DefinitionType} type
     * @param {string} repositoryId
     * @param {string} repositoryType
     * @param {Contracts.DefinitionQueryOrder} queryOrder
     * @param {number} top
     * @return IPromise<Contracts.DefinitionReference[]>
     */
    getDefinitions(project?: string, name?: string, type?: Contracts.DefinitionType, repositoryId?: string, repositoryType?: string, queryOrder?: Contracts.DefinitionQueryOrder, top?: number): IPromise<Contracts.DefinitionReference[]>;
    /**
     * [Preview API] Updates an existing definition
     *
     * @param {Contracts.BuildDefinition} definition
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @param {number} secretsSourceDefinitionId
     * @param {number} secretsSourceDefinitionRevision
     * @return IPromise<Contracts.BuildDefinition>
     */
    updateDefinition(definition: Contracts.BuildDefinition, definitionId: number, project?: string, secretsSourceDefinitionId?: number, secretsSourceDefinitionRevision?: number): IPromise<Contracts.BuildDefinition>;
    /**
     * [Preview API] Gets the deployment information associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<Contracts.Deployment[]>
     */
    getBuildDeployments(project: string, buildId: number): IPromise<Contracts.Deployment[]>;
    /**
     * [Preview API] Gets a log
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} logId
     * @param {number} startLine
     * @param {number} endLine
     * @return IPromise<ArrayBuffer>
     */
    getBuildLog(project: string, buildId: number, logId: number, startLine?: number, endLine?: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Gets logs for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<Contracts.BuildLog[]>
     */
    getBuildLogs(project: string, buildId: number): IPromise<Contracts.BuildLog[]>;
    /**
     * [Preview API] Gets logs for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<ArrayBuffer>
     */
    getBuildLogsZip(project: string, buildId: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildOptionDefinition[]>
     */
    getBuildOptionDefinitions(project?: string): IPromise<Contracts.BuildOptionDefinition[]>;
    /**
     * [Preview API] Creates a build queue
     *
     * @param {Contracts.AgentPoolQueue} queue
     * @return IPromise<Contracts.AgentPoolQueue>
     */
    createQueue(queue: Contracts.AgentPoolQueue): IPromise<Contracts.AgentPoolQueue>;
    /**
     * [Preview API] Deletes a build queue
     *
     * @param {number} id
     * @return IPromise<void>
     */
    deleteQueue(id: number): IPromise<void>;
    /**
     * [Preview API] Gets a queue
     *
     * @param {number} controllerId
     * @return IPromise<Contracts.AgentPoolQueue>
     */
    getAgentPoolQueue(controllerId: number): IPromise<Contracts.AgentPoolQueue>;
    /**
     * [Preview API] Gets queues, optionally filtered by name
     *
     * @param {string} name
     * @return IPromise<Contracts.AgentPoolQueue[]>
     */
    getQueues(name?: string): IPromise<Contracts.AgentPoolQueue[]>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.BuildResourceUsage>
     */
    getResourceUsage(): IPromise<Contracts.BuildResourceUsage>;
    /**
     * [Preview API] Gets revisions of a definition
     *
     * @param {string} project - Project ID or project name
     * @param {number} definitionId
     * @return IPromise<Contracts.BuildDefinitionRevision[]>
     */
    getDefinitionRevisions(project: string, definitionId: number): IPromise<Contracts.BuildDefinitionRevision[]>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.BuildSettings>
     */
    getBuildSettings(): IPromise<Contracts.BuildSettings>;
    /**
     * [Preview API] Updates the build settings
     *
     * @param {Contracts.BuildSettings} settings
     * @return IPromise<Contracts.BuildSettings>
     */
    updateBuildSettings(settings: Contracts.BuildSettings): IPromise<Contracts.BuildSettings>;
    /**
     * [Preview API] Adds a tag to a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} tag
     * @return IPromise<string[]>
     */
    addBuildTag(project: string, buildId: number, tag: string): IPromise<string[]>;
    /**
     * [Preview API] Adds tag to a build
     *
     * @param {string[]} tags
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<string[]>
     */
    addBuildTags(tags: string[], project: string, buildId: number): IPromise<string[]>;
    /**
     * [Preview API] Deletes a tag from a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} tag
     * @return IPromise<string[]>
     */
    deleteBuildTag(project: string, buildId: number, tag: string): IPromise<string[]>;
    /**
     * [Preview API] Gets the tags for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<string[]>
     */
    getBuildTags(project: string, buildId: number): IPromise<string[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<string[]>
     */
    getTags(project: string): IPromise<string[]>;
    /**
     * [Preview API] Deletes a definition template
     *
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<void>
     */
    deleteTemplate(project: string, templateId: string): IPromise<void>;
    /**
     * [Preview API] Gets definition template filtered by id
     *
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<Contracts.BuildDefinitionTemplate>
     */
    getTemplate(project: string, templateId: string): IPromise<Contracts.BuildDefinitionTemplate>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildDefinitionTemplate[]>
     */
    getTemplates(project: string): IPromise<Contracts.BuildDefinitionTemplate[]>;
    /**
     * [Preview API] Saves a definition template
     *
     * @param {Contracts.BuildDefinitionTemplate} template
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<Contracts.BuildDefinitionTemplate>
     */
    saveTemplate(template: Contracts.BuildDefinitionTemplate, project: string, templateId: string): IPromise<Contracts.BuildDefinitionTemplate>;
    /**
     * [Preview API] Gets details for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} timelineId
     * @param {number} changeId
     * @return IPromise<Contracts.Timeline>
     */
    getBuildTimeline(project: string, buildId: number, timelineId?: string, changeId?: number): IPromise<Contracts.Timeline>;
    /**
     * [Preview API] Gets the work item ids associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} top - The maximum number of workitems to return
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getBuildWorkItemsRefs(project: string, buildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
    /**
     * [Preview API] Gets the work item ids associated with build commits
     *
     * @param {string[]} commitIds
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} top - The maximum number of workitems to return, also number of commits to consider if commitids are not sent
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getBuildWorkItemsRefsFromCommits(commitIds: string[], project: string, buildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
    /**
     * [Preview API] Gets all the work item ids inbetween fromBuildId to toBuildId
     *
     * @param {string} project - Project ID or project name
     * @param {number} fromBuildId
     * @param {number} toBuildId
     * @param {number} top - The maximum number of workitems to return
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getWorkItemsBetweenBuilds(project: string, fromBuildId: number, toBuildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
}
export class BuildHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Associates an artifact with a build
     *
     * @param {Contracts.BuildArtifact} artifact
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact>
     */
    createArtifact(artifact: Contracts.BuildArtifact, buildId: number, project?: string): IPromise<Contracts.BuildArtifact>;
    /**
     * Gets a specific artifact for a build
     *
     * @param {number} buildId
     * @param {string} artifactName
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact>
     */
    getArtifact(buildId: number, artifactName: string, project?: string): IPromise<Contracts.BuildArtifact>;
    /**
     * Gets a specific artifact for a build
     *
     * @param {number} buildId
     * @param {string} artifactName
     * @param {string} project - Project ID or project name
     * @return IPromise<ArrayBuffer>
     */
    getArtifactContentZip(buildId: number, artifactName: string, project?: string): IPromise<ArrayBuffer>;
    /**
     * Gets all artifacts for a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildArtifact[]>
     */
    getArtifacts(buildId: number, project?: string): IPromise<Contracts.BuildArtifact[]>;
    /**
     * @param {string} project
     * @param {number} definitionId
     * @param {string} branchName
     * @return IPromise<string>
     */
    getBadge(project: string, definitionId: number, branchName?: string): IPromise<string>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} repoType
     * @param {string} repoId
     * @param {string} branchName
     * @return IPromise<Contracts.BuildBadge>
     */
    getBuildBadge(project: string, repoType: string, repoId?: string, branchName?: string): IPromise<Contracts.BuildBadge>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} repoType
     * @param {string} repoId
     * @param {string} branchName
     * @return IPromise<string>
     */
    getBuildBadgeData(project: string, repoType: string, repoId?: string, branchName?: string): IPromise<string>;
    /**
     * Deletes a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteBuild(buildId: number, project?: string): IPromise<void>;
    /**
     * Gets a build
     *
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @param {string} propertyFilters - A comma-delimited list of properties to include in the results
     * @return IPromise<Contracts.Build>
     */
    getBuild(buildId: number, project?: string, propertyFilters?: string): IPromise<Contracts.Build>;
    /**
     * Gets builds
     *
     * @param {string} project - Project ID or project name
     * @param {number[]} definitions - A comma-delimited list of definition ids
     * @param {number[]} queues - A comma-delimited list of queue ids
     * @param {string} buildNumber
     * @param {Date} minFinishTime
     * @param {Date} maxFinishTime
     * @param {string} requestedFor
     * @param {Contracts.BuildReason} reasonFilter
     * @param {Contracts.BuildStatus} statusFilter
     * @param {Contracts.BuildResult} resultFilter
     * @param {string[]} tagFilters - A comma-delimited list of tags
     * @param {string[]} properties - A comma-delimited list of properties to include in the results
     * @param {Contracts.DefinitionType} type - The definition type
     * @param {number} top - The maximum number of builds to retrieve
     * @param {string} continuationToken
     * @param {number} maxBuildsPerDefinition
     * @param {Contracts.QueryDeletedOption} deletedFilter
     * @param {Contracts.BuildQueryOrder} queryOrder
     * @param {string} branchName
     * @return IPromise<Contracts.Build[]>
     */
    getBuilds(project?: string, definitions?: number[], queues?: number[], buildNumber?: string, minFinishTime?: Date, maxFinishTime?: Date, requestedFor?: string, reasonFilter?: Contracts.BuildReason, statusFilter?: Contracts.BuildStatus, resultFilter?: Contracts.BuildResult, tagFilters?: string[], properties?: string[], type?: Contracts.DefinitionType, top?: number, continuationToken?: string, maxBuildsPerDefinition?: number, deletedFilter?: Contracts.QueryDeletedOption, queryOrder?: Contracts.BuildQueryOrder, branchName?: string): IPromise<Contracts.Build[]>;
    /**
     * Queues a build
     *
     * @param {Contracts.Build} build
     * @param {string} project - Project ID or project name
     * @param {boolean} ignoreWarnings
     * @return IPromise<Contracts.Build>
     */
    queueBuild(build: Contracts.Build, project?: string, ignoreWarnings?: boolean): IPromise<Contracts.Build>;
    /**
     * Updates a build
     *
     * @param {Contracts.Build} build
     * @param {number} buildId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.Build>
     */
    updateBuild(build: Contracts.Build, buildId: number, project?: string): IPromise<Contracts.Build>;
    /**
     * Gets the changes associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} continuationToken
     * @param {number} top - The maximum number of changes to return
     * @return IPromise<Contracts.Change[]>
     */
    getBuildChanges(project: string, buildId: number, continuationToken?: string, top?: number): IPromise<Contracts.Change[]>;
    /**
     * @exemptedapi
     * [Preview API] Gets the changes associated between given builds
     *
     * @param {string} project - Project ID or project name
     * @param {number} fromBuildId
     * @param {number} toBuildId
     * @param {number} top - The maximum number of changes to return
     * @return IPromise<Contracts.Change[]>
     */
    getChangesBetweenBuilds(project: string, fromBuildId?: number, toBuildId?: number, top?: number): IPromise<Contracts.Change[]>;
    /**
     * Gets a controller
     *
     * @param {number} controllerId
     * @return IPromise<Contracts.BuildController>
     */
    getBuildController(controllerId: number): IPromise<Contracts.BuildController>;
    /**
     * Gets controller, optionally filtered by name
     *
     * @param {string} name
     * @return IPromise<Contracts.BuildController[]>
     */
    getBuildControllers(name?: string): IPromise<Contracts.BuildController[]>;
    /**
     * Creates a new definition
     *
     * @param {Contracts.BuildDefinition} definition
     * @param {string} project - Project ID or project name
     * @param {number} definitionToCloneId
     * @param {number} definitionToCloneRevision
     * @return IPromise<Contracts.BuildDefinition>
     */
    createDefinition(definition: Contracts.BuildDefinition, project?: string, definitionToCloneId?: number, definitionToCloneRevision?: number): IPromise<Contracts.BuildDefinition>;
    /**
     * Deletes a definition and all associated builds
     *
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteDefinition(definitionId: number, project?: string): IPromise<void>;
    /**
     * Gets a definition, optionally at a specific revision
     *
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @param {number} revision
     * @param {string[]} propertyFilters
     * @return IPromise<Contracts.DefinitionReference>
     */
    getDefinition(definitionId: number, project?: string, revision?: number, propertyFilters?: string[]): IPromise<Contracts.DefinitionReference>;
    /**
     * Gets definitions, optionally filtered by name
     *
     * @param {string} project - Project ID or project name
     * @param {string} name
     * @param {Contracts.DefinitionType} type
     * @param {string} repositoryId
     * @param {string} repositoryType
     * @param {Contracts.DefinitionQueryOrder} queryOrder
     * @param {number} top
     * @return IPromise<Contracts.DefinitionReference[]>
     */
    getDefinitions(project?: string, name?: string, type?: Contracts.DefinitionType, repositoryId?: string, repositoryType?: string, queryOrder?: Contracts.DefinitionQueryOrder, top?: number): IPromise<Contracts.DefinitionReference[]>;
    /**
     * Updates an existing definition
     *
     * @param {Contracts.BuildDefinition} definition
     * @param {number} definitionId
     * @param {string} project - Project ID or project name
     * @param {number} secretsSourceDefinitionId
     * @param {number} secretsSourceDefinitionRevision
     * @return IPromise<Contracts.BuildDefinition>
     */
    updateDefinition(definition: Contracts.BuildDefinition, definitionId: number, project?: string, secretsSourceDefinitionId?: number, secretsSourceDefinitionRevision?: number): IPromise<Contracts.BuildDefinition>;
    /**
     * Gets the deployment information associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<Contracts.Deployment[]>
     */
    getBuildDeployments(project: string, buildId: number): IPromise<Contracts.Deployment[]>;
    /**
     * Gets a log
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} logId
     * @param {number} startLine
     * @param {number} endLine
     * @return IPromise<ArrayBuffer>
     */
    getBuildLog(project: string, buildId: number, logId: number, startLine?: number, endLine?: number): IPromise<ArrayBuffer>;
    /**
     * Gets logs for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<Contracts.BuildLog[]>
     */
    getBuildLogs(project: string, buildId: number): IPromise<Contracts.BuildLog[]>;
    /**
     * Gets logs for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<ArrayBuffer>
     */
    getBuildLogsZip(project: string, buildId: number): IPromise<ArrayBuffer>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildOptionDefinition[]>
     */
    getBuildOptionDefinitions(project?: string): IPromise<Contracts.BuildOptionDefinition[]>;
    /**
     * Creates a build queue
     *
     * @param {Contracts.AgentPoolQueue} queue
     * @return IPromise<Contracts.AgentPoolQueue>
     */
    createQueue(queue: Contracts.AgentPoolQueue): IPromise<Contracts.AgentPoolQueue>;
    /**
     * Deletes a build queue
     *
     * @param {number} id
     * @return IPromise<void>
     */
    deleteQueue(id: number): IPromise<void>;
    /**
     * Gets a queue
     *
     * @param {number} controllerId
     * @return IPromise<Contracts.AgentPoolQueue>
     */
    getAgentPoolQueue(controllerId: number): IPromise<Contracts.AgentPoolQueue>;
    /**
     * Gets queues, optionally filtered by name
     *
     * @param {string} name
     * @return IPromise<Contracts.AgentPoolQueue[]>
     */
    getQueues(name?: string): IPromise<Contracts.AgentPoolQueue[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @return IPromise<Contracts.BuildResourceUsage>
     */
    getResourceUsage(): IPromise<Contracts.BuildResourceUsage>;
    /**
     * Gets revisions of a definition
     *
     * @param {string} project - Project ID or project name
     * @param {number} definitionId
     * @return IPromise<Contracts.BuildDefinitionRevision[]>
     */
    getDefinitionRevisions(project: string, definitionId: number): IPromise<Contracts.BuildDefinitionRevision[]>;
    /**
     * @return IPromise<Contracts.BuildSettings>
     */
    getBuildSettings(): IPromise<Contracts.BuildSettings>;
    /**
     * Updates the build settings
     *
     * @param {Contracts.BuildSettings} settings
     * @return IPromise<Contracts.BuildSettings>
     */
    updateBuildSettings(settings: Contracts.BuildSettings): IPromise<Contracts.BuildSettings>;
    /**
     * Adds a tag to a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} tag
     * @return IPromise<string[]>
     */
    addBuildTag(project: string, buildId: number, tag: string): IPromise<string[]>;
    /**
     * Adds tag to a build
     *
     * @param {string[]} tags
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<string[]>
     */
    addBuildTags(tags: string[], project: string, buildId: number): IPromise<string[]>;
    /**
     * Deletes a tag from a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} tag
     * @return IPromise<string[]>
     */
    deleteBuildTag(project: string, buildId: number, tag: string): IPromise<string[]>;
    /**
     * Gets the tags for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<string[]>
     */
    getBuildTags(project: string, buildId: number): IPromise<string[]>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<string[]>
     */
    getTags(project: string): IPromise<string[]>;
    /**
     * Deletes a definition template
     *
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<void>
     */
    deleteTemplate(project: string, templateId: string): IPromise<void>;
    /**
     * Gets definition template filtered by id
     *
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<Contracts.BuildDefinitionTemplate>
     */
    getTemplate(project: string, templateId: string): IPromise<Contracts.BuildDefinitionTemplate>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BuildDefinitionTemplate[]>
     */
    getTemplates(project: string): IPromise<Contracts.BuildDefinitionTemplate[]>;
    /**
     * Saves a definition template
     *
     * @param {Contracts.BuildDefinitionTemplate} template
     * @param {string} project - Project ID or project name
     * @param {string} templateId
     * @return IPromise<Contracts.BuildDefinitionTemplate>
     */
    saveTemplate(template: Contracts.BuildDefinitionTemplate, project: string, templateId: string): IPromise<Contracts.BuildDefinitionTemplate>;
    /**
     * Gets details for a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} timelineId
     * @param {number} changeId
     * @return IPromise<Contracts.Timeline>
     */
    getBuildTimeline(project: string, buildId: number, timelineId?: string, changeId?: number): IPromise<Contracts.Timeline>;
    /**
     * Gets the work item ids associated with a build
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} top - The maximum number of workitems to return
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getBuildWorkItemsRefs(project: string, buildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
    /**
     * Gets the work item ids associated with build commits
     *
     * @param {string[]} commitIds
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} top - The maximum number of workitems to return, also number of commits to consider if commitids are not sent
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getBuildWorkItemsRefsFromCommits(commitIds: string[], project: string, buildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
    /**
     * @exemptedapi
     * [Preview API] Gets all the work item ids inbetween fromBuildId to toBuildId
     *
     * @param {string} project - Project ID or project name
     * @param {number} fromBuildId
     * @param {number} toBuildId
     * @param {number} top - The maximum number of workitems to return
     * @return IPromise<VSS_Common_Contracts.ResourceRef[]>
     */
    getWorkItemsBetweenBuilds(project: string, fromBuildId: number, toBuildId: number, top?: number): IPromise<VSS_Common_Contracts.ResourceRef[]>;
}
export class BuildHttpClient extends BuildHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return BuildHttpClient2_1
 */
export function getClient(): BuildHttpClient2_1;
}
declare module "TFS/Core/Contracts" {
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export enum ConnectedServiceKind {
    /**
     * Custom or unknown service
     */
    Custom = 0,
    /**
     * Azure Subscription
     */
    AzureSubscription = 1,
    /**
     * Chef Connection
     */
    Chef = 2,
    /**
     * Generic Connection
     */
    Generic = 3,
}
export interface IdentityData {
    identityIds: string[];
}
export interface Process extends ProcessReference {
    _links: any;
    description: string;
    id: string;
    isDefault: boolean;
    type: ProcessType;
}
export interface ProcessReference {
    name: string;
    url: string;
}
export enum ProcessType {
    System = 0,
    Custom = 1,
    Inherited = 2,
}
export enum ProjectChangeType {
    Modified = 0,
    Deleted = 1,
    Added = 2,
}
/**
 * Contains information of the project
 */
export interface ProjectInfo {
    abbreviation: string;
    description: string;
    id: string;
    lastUpdateTime: Date;
    name: string;
    properties: ProjectProperty[];
    /**
     * Current revision of the project
     */
    revision: number;
    state: any;
    uri: string;
    version: number;
}
export interface ProjectMessage {
    project: ProjectInfo;
    projectChangeType: ProjectChangeType;
}
export interface ProjectProperty {
    name: string;
    value: string;
}
export interface Proxy {
    /**
     * This is a description string
     */
    description: string;
    /**
     * The friendly name of the server
     */
    friendlyName: string;
    globalDefault: boolean;
    /**
     * This is a string representation of the site that the proxy server is located in (e.g. "NA-WA-RED")
     */
    site: string;
    siteDefault: boolean;
    /**
     * The URL of the proxy server
     */
    url: string;
}
export enum SourceControlTypes {
    Tfvc = 1,
    Git = 2,
}
/**
 * The Team Context for an operation.
 */
export interface TeamContext {
    /**
     * The team project Id or name.  Ignored if ProjectId is set.
     */
    project: string;
    /**
     * The Team Project ID.  Required if Project is not set.
     */
    projectId: string;
    /**
     * The Team Id or name.  Ignored if TeamId is set.
     */
    team: string;
    /**
     * The Team Id
     */
    teamId: string;
}
/**
 * Represents a Team Project object.
 */
export interface TeamProject extends TeamProjectReference {
    /**
     * The links to other objects related to this object.
     */
    _links: any;
    /**
     * Set of capabilities this project has (such as process template & version control).
     */
    capabilities: {
        [key: string]: {
            [key: string]: string;
        };
    };
    /**
     * The shallow ref to the default team.
     */
    defaultTeam: WebApiTeamRef;
}
/**
 * Data contract for a TeamProjectCollection.
 */
export interface TeamProjectCollection extends TeamProjectCollectionReference {
    /**
     * The links to other objects related to this object.
     */
    _links: any;
    /**
     * Project collection description.
     */
    description: string;
    /**
     * Project collection state.
     */
    state: string;
}
/**
 * Reference object for a TeamProjectCollection.
 */
export interface TeamProjectCollectionReference {
    /**
     * Collection Id.
     */
    id: string;
    /**
     * Collection Name.
     */
    name: string;
    /**
     * Collection REST Url.
     */
    url: string;
}
/**
 * Represents a shallow reference to a TeamProject.
 */
export interface TeamProjectReference {
    /**
     * Project abbreviation.
     */
    abbreviation: string;
    /**
     * The project's description (if any).
     */
    description: string;
    /**
     * Project identifier.
     */
    id: string;
    /**
     * Project name.
     */
    name: string;
    /**
     * Project revision.
     */
    revision: number;
    /**
     * Project state.
     */
    state: any;
    /**
     * Url to the full version of the object.
     */
    url: string;
}
export interface WebApiConnectedService extends WebApiConnectedServiceRef {
    /**
     * The user who did the OAuth authentication to created this service
     */
    authenticatedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Extra description on the service.
     */
    description: string;
    /**
     * Friendly Name of service connection
     */
    friendlyName: string;
    /**
     * Id/Name of the connection service. For Ex: Subscription Id for Azure Connection
     */
    id: string;
    /**
     * The kind of service.
     */
    kind: string;
    /**
     * The project associated with this service
     */
    project: TeamProjectReference;
    /**
     * Optional uri to connect directly to the service such as https://windows.azure.com
     */
    serviceUri: string;
}
export interface WebApiConnectedServiceDetails extends WebApiConnectedServiceRef {
    /**
     * Meta data for service connection
     */
    connectedServiceMetaData: WebApiConnectedService;
    /**
     * Credential info
     */
    credentialsXml: string;
    /**
     * Optional uri to connect directly to the service such as https://windows.azure.com
     */
    endPoint: string;
}
export interface WebApiConnectedServiceRef {
    id: string;
    url: string;
}
/**
 * The representation of data needed to create a tag definition which is sent across the wire.
 */
export interface WebApiCreateTagRequestData {
    name: string;
}
export interface WebApiProject extends TeamProjectReference {
    /**
     * Set of capabilities this project has
     */
    capabilities: {
        [key: string]: {
            [key: string]: string;
        };
    };
    /**
     * Reference to collection which contains this project
     */
    collection: WebApiProjectCollectionRef;
    /**
     * Default team for this project
     */
    defaultTeam: WebApiTeamRef;
}
export interface WebApiProjectCollection extends WebApiProjectCollectionRef {
    /**
     * Project collection description
     */
    description: string;
    /**
     * Project collection state
     */
    state: string;
}
export interface WebApiProjectCollectionRef {
    /**
     * Collection Tfs Url (Host Url)
     */
    collectionUrl: string;
    /**
     * Collection Guid
     */
    id: string;
    /**
     * Collection Name
     */
    name: string;
    /**
     * Collection REST Url
     */
    url: string;
}
/**
 * The representation of a tag definition which is sent across the wire.
 */
export interface WebApiTagDefinition {
    active: boolean;
    id: string;
    name: string;
    url: string;
}
export interface WebApiTeam extends WebApiTeamRef {
    /**
     * Team description
     */
    description: string;
    /**
     * Identity REST API Url to this team
     */
    identityUrl: string;
}
export interface WebApiTeamRef {
    /**
     * Team (Identity) Guid. A Team Foundation ID.
     */
    id: string;
    /**
     * Team name
     */
    name: string;
    /**
     * Team REST API Url
     */
    url: string;
}
export var TypeInfo: {
    ConnectedServiceKind: {
        enumValues: {
            "custom": number;
            "azureSubscription": number;
            "chef": number;
            "generic": number;
        };
    };
    IdentityData: {
        fields: any;
    };
    Process: {
        fields: any;
    };
    ProcessReference: {
        fields: any;
    };
    ProcessType: {
        enumValues: {
            "system": number;
            "custom": number;
            "inherited": number;
        };
    };
    ProjectChangeType: {
        enumValues: {
            "modified": number;
            "deleted": number;
            "added": number;
        };
    };
    ProjectInfo: {
        fields: any;
    };
    ProjectMessage: {
        fields: any;
    };
    ProjectProperty: {
        fields: any;
    };
    Proxy: {
        fields: any;
    };
    SourceControlTypes: {
        enumValues: {
            "tfvc": number;
            "git": number;
        };
    };
    TeamContext: {
        fields: any;
    };
    TeamProject: {
        fields: any;
    };
    TeamProjectCollection: {
        fields: any;
    };
    TeamProjectCollectionReference: {
        fields: any;
    };
    TeamProjectReference: {
        fields: any;
    };
    WebApiConnectedService: {
        fields: any;
    };
    WebApiConnectedServiceDetails: {
        fields: any;
    };
    WebApiConnectedServiceRef: {
        fields: any;
    };
    WebApiCreateTagRequestData: {
        fields: any;
    };
    WebApiProject: {
        fields: any;
    };
    WebApiProjectCollection: {
        fields: any;
    };
    WebApiProjectCollectionRef: {
        fields: any;
    };
    WebApiTagDefinition: {
        fields: any;
    };
    WebApiTeam: {
        fields: any;
    };
    WebApiTeamRef: {
        fields: any;
    };
};
}
declare module "TFS/Core/RestClient" {
import Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_Operations_Contracts = require("VSS/Operations/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class CoreHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {Contracts.WebApiConnectedServiceDetails} connectedServiceCreationData
     * @param {string} projectId
     * @return IPromise<Contracts.WebApiConnectedService>
     */
    createConnectedService(connectedServiceCreationData: Contracts.WebApiConnectedServiceDetails, projectId: string): IPromise<Contracts.WebApiConnectedService>;
    /**
     * [Preview API]
     *
     * @param {string} projectId
     * @param {string} name
     * @return IPromise<Contracts.WebApiConnectedServiceDetails>
     */
    getConnectedServiceDetails(projectId: string, name: string): IPromise<Contracts.WebApiConnectedServiceDetails>;
    /**
     * [Preview API]
     *
     * @param {string} projectId
     * @param {Contracts.ConnectedServiceKind} kind
     * @return IPromise<Contracts.WebApiConnectedService[]>
     */
    getConnectedServices(projectId: string, kind?: Contracts.ConnectedServiceKind): IPromise<Contracts.WebApiConnectedService[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    createIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    deleteIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} mruName
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getIdentityMru(mruName: string): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    updateIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} projectId
     * @param {string} teamId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getTeamMembers(projectId: string, teamId: string, top?: number, skip?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * [Preview API] Retrieve process by id
     *
     * @param {string} processId
     * @return IPromise<Contracts.Process>
     */
    getProcessById(processId: string): IPromise<Contracts.Process>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.Process[]>
     */
    getProcesses(): IPromise<Contracts.Process[]>;
    /**
     * [Preview API] Get project collection with the specified id or name.
     *
     * @param {string} collectionId
     * @return IPromise<Contracts.TeamProjectCollection>
     */
    getProjectCollection(collectionId: string): IPromise<Contracts.TeamProjectCollection>;
    /**
     * [Preview API] Get project collection references for this application.
     *
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.TeamProjectCollectionReference[]>
     */
    getProjectCollections(top?: number, skip?: number): IPromise<Contracts.TeamProjectCollectionReference[]>;
    /**
     * [Preview API]
     *
     * @param {number} minRevision
     * @return IPromise<Contracts.TeamProjectReference[]>
     */
    getProjectHistory(minRevision?: number): IPromise<Contracts.TeamProjectReference[]>;
    /**
     * [Preview API] Get project with the specified id or name, optionally including capabilities.
     *
     * @param {string} projectId
     * @param {boolean} includeCapabilities - Include capabilities (such as source control) in the team project result (default: false).
     * @param {boolean} includeHistory - Search within renamed projects (that had such name in the past).
     * @return IPromise<Contracts.TeamProject>
     */
    getProject(projectId: string, includeCapabilities?: boolean, includeHistory?: boolean): IPromise<Contracts.TeamProject>;
    /**
     * [Preview API] Get project references with the specified state
     *
     * @param {any} stateFilter - Filter on team projects in a specific team project state (default: WellFormed).
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.TeamProjectReference[]>
     */
    getProjects(stateFilter?: any, top?: number, skip?: number): IPromise<Contracts.TeamProjectReference[]>;
    /**
     * [Preview API] Queue a project creation.
     *
     * @param {Contracts.TeamProject} projectToCreate - The project to create.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    queueCreateProject(projectToCreate: Contracts.TeamProject): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * [Preview API] Queue a project deletion.
     *
     * @param {string} projectId - The project id of the project to delete.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    queueDeleteProject(projectId: string): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * [Preview API] Update an existing project's name, abbreviation, or description.
     *
     * @param {Contracts.TeamProject} projectUpdate - The updates for the project.
     * @param {string} projectId - The project id of the project to update.
     * @return IPromise<VSS_Operations_Contracts.OperationReference>
     */
    updateProject(projectUpdate: Contracts.TeamProject, projectId: string): IPromise<VSS_Operations_Contracts.OperationReference>;
    /**
     * [Preview API]
     *
     * @param {string} proxyUrl
     * @return IPromise<Contracts.Proxy[]>
     */
    getProxies(proxyUrl?: string): IPromise<Contracts.Proxy[]>;
    /**
     * [Preview API] Creates a team
     *
     * @param {Contracts.WebApiTeam} team - The team data used to create the team.
     * @param {string} projectId - The name or id (GUID) of the team project in which to create the team.
     * @return IPromise<Contracts.WebApiTeam>
     */
    createTeam(team: Contracts.WebApiTeam, projectId: string): IPromise<Contracts.WebApiTeam>;
    /**
     * [Preview API] Deletes a team
     *
     * @param {string} projectId - The name or id (GUID) of the team project containing the team to delete.
     * @param {string} teamId - The name of id of the team to delete.
     * @return IPromise<void>
     */
    deleteTeam(projectId: string, teamId: string): IPromise<void>;
    /**
     * [Preview API] Gets a team
     *
     * @param {string} projectId
     * @param {string} teamId
     * @return IPromise<Contracts.WebApiTeam>
     */
    getTeam(projectId: string, teamId: string): IPromise<Contracts.WebApiTeam>;
    /**
     * [Preview API]
     *
     * @param {string} projectId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WebApiTeam[]>
     */
    getTeams(projectId: string, top?: number, skip?: number): IPromise<Contracts.WebApiTeam[]>;
    /**
     * [Preview API] Updates a team's name and/or description
     *
     * @param {Contracts.WebApiTeam} teamData
     * @param {string} projectId - The name or id (GUID) of the team project containing the team to update.
     * @param {string} teamId - The name of id of the team to update.
     * @return IPromise<Contracts.WebApiTeam>
     */
    updateTeam(teamData: Contracts.WebApiTeam, projectId: string, teamId: string): IPromise<Contracts.WebApiTeam>;
}
export class CoreHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.WebApiConnectedServiceDetails} connectedServiceCreationData
     * @param {string} projectId
     * @return IPromise<Contracts.WebApiConnectedService>
     */
    createConnectedService(connectedServiceCreationData: Contracts.WebApiConnectedServiceDetails, projectId: string): IPromise<Contracts.WebApiConnectedService>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} projectId
     * @param {string} name
     * @return IPromise<Contracts.WebApiConnectedServiceDetails>
     */
    getConnectedServiceDetails(projectId: string, name: string): IPromise<Contracts.WebApiConnectedServiceDetails>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} projectId
     * @param {Contracts.ConnectedServiceKind} kind
     * @return IPromise<Contracts.WebApiConnectedService[]>
     */
    getConnectedServices(projectId: string, kind?: Contracts.ConnectedServiceKind): IPromise<Contracts.WebApiConnectedService[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    createIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.IdentityData} mruData
     * @param {string} mruName
     * @return IPromise<void>
     */
    deleteIdentityMru(mruData: Contracts.IdentityData, mruName: string): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} mruName
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getIdentityMru(mruName: string): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
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
     * Retrieve process by id
     *
     * @param {string} processId
     * @return IPromise<Contracts.Process>
     */
    getProcessById(processId: string): IPromise<Contracts.Process>;
    /**
     * @return IPromise<Contracts.Process[]>
     */
    getProcesses(): IPromise<Contracts.Process[]>;
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
     * @exemptedapi
     * [Preview API]
     *
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
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} proxyUrl
     * @return IPromise<Contracts.Proxy[]>
     */
    getProxies(proxyUrl?: string): IPromise<Contracts.Proxy[]>;
    /**
     * Creates a team
     *
     * @param {Contracts.WebApiTeam} team - The team data used to create the team.
     * @param {string} projectId - The name or id (GUID) of the team project in which to create the team.
     * @return IPromise<Contracts.WebApiTeam>
     */
    createTeam(team: Contracts.WebApiTeam, projectId: string): IPromise<Contracts.WebApiTeam>;
    /**
     * Deletes a team
     *
     * @param {string} projectId - The name or id (GUID) of the team project containing the team to delete.
     * @param {string} teamId - The name of id of the team to delete.
     * @return IPromise<void>
     */
    deleteTeam(projectId: string, teamId: string): IPromise<void>;
    /**
     * Gets a team
     *
     * @param {string} projectId
     * @param {string} teamId
     * @return IPromise<Contracts.WebApiTeam>
     */
    getTeam(projectId: string, teamId: string): IPromise<Contracts.WebApiTeam>;
    /**
     * @param {string} projectId
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WebApiTeam[]>
     */
    getTeams(projectId: string, top?: number, skip?: number): IPromise<Contracts.WebApiTeam[]>;
    /**
     * Updates a team's name and/or description
     *
     * @param {Contracts.WebApiTeam} teamData
     * @param {string} projectId - The name or id (GUID) of the team project containing the team to update.
     * @param {string} teamId - The name of id of the team to update.
     * @return IPromise<Contracts.WebApiTeam>
     */
    updateTeam(teamData: Contracts.WebApiTeam, projectId: string, teamId: string): IPromise<Contracts.WebApiTeam>;
}
export class CoreHttpClient extends CoreHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return CoreHttpClient2_1
 */
export function getClient(): CoreHttpClient2_1;
}
declare module "TFS/DistributedTask/Contracts" {
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_FormInput_Contracts = require("VSS/Common/Contracts/FormInput");
export interface AgentPoolEvent {
    eventType: string;
    pool: TaskAgentPool;
}
export interface AgentQueueEvent {
    eventType: string;
    queue: TaskAgentQueue;
}
export interface AgentRefreshMessage {
    agentId: number;
    timeout: any;
}
export interface AuthorizationHeader {
    name: string;
    value: string;
}
export enum ConnectedServiceKind {
    /**
     * Custom or unknown service
     */
    Custom = 0,
    /**
     * Azure Subscription
     */
    AzureSubscription = 1,
    /**
     * Chef Connection
     */
    Chef = 2,
    /**
     * Generic Connection
     */
    Generic = 3,
    /**
     * GitHub Connection
     */
    GitHub = 4,
}
export interface DataSource {
    endpointUrl: string;
    name: string;
    resultSelector: string;
}
export interface DataSourceBinding {
    dataSourceName: string;
    endpointId: string;
    parameters: {
        [key: string]: string;
    };
    target: string;
}
export interface EndpointAuthorization {
    parameters: {
        [key: string]: string;
    };
    scheme: string;
}
export interface EndpointUrl {
    displayName: string;
    helpText: string;
    value: string;
}
export interface HelpLink {
    text: string;
    url: string;
}
export interface Issue {
    category: string;
    data: {
        [key: string]: string;
    };
    message: string;
    type: IssueType;
}
export enum IssueType {
    Error = 1,
    Warning = 2,
}
export interface JobAssignedEvent extends JobEvent {
    request: TaskAgentJobRequest;
}
export interface JobCancelMessage {
    jobId: string;
    timeout: any;
}
export interface JobCompletedEvent extends JobEvent {
    requestId: number;
    result: TaskResult;
}
/**
 * Represents the context of variables and vectors for a job request.
 */
export interface JobEnvironment {
    endpoints: ServiceEndpoint[];
    mask: MaskHint[];
    options: {
        [key: number]: JobOption;
    };
    /**
     * Gets or sets the endpoint used for communicating back to the calling service.
     */
    systemConnection: ServiceEndpoint;
    variables: {
        [key: string]: string;
    };
}
export interface JobEvent {
    jobId: string;
    name: string;
}
/**
 * Represents an option that may affect the way an agent runs the job.
 */
export interface JobOption {
    data: {
        [key: string]: string;
    };
    /**
     * Gets the id of the option.
     */
    id: string;
}
export interface JobRequestMessage {
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
export enum MaskType {
    Variable = 1,
    Regex = 2,
}
export interface PlanEnvironment {
    mask: MaskHint[];
    options: {
        [key: number]: JobOption;
    };
    variables: {
        [key: string]: string;
    };
}
/**
 * Represents an endpoint which may be used by an orchestration job.
 */
export interface ServiceEndpoint {
    administratorsGroup: VSS_Common_Contracts.IdentityRef;
    /**
     * Gets or sets the authorization data for talking to the endpoint.
     */
    authorization: EndpointAuthorization;
    /**
     * The Gets or sets Identity reference for the user who created the Service endpoint
     */
    createdBy: VSS_Common_Contracts.IdentityRef;
    data: {
        [key: string]: string;
    };
    /**
     * Gets or Sets description of endpoint
     */
    description: string;
    groupScopeId: string;
    /**
     * Gets or sets the identifier of this endpoint.
     */
    id: string;
    /**
     * Gets or sets the friendly name of the endpoint.
     */
    name: string;
    readersGroup: VSS_Common_Contracts.IdentityRef;
    /**
     * Gets or sets the type of the endpoint.
     */
    type: string;
    /**
     * Gets or sets the url of the endpoint.
     */
    url: string;
}
export interface ServiceEndpointAuthenticationScheme {
    authorizationHeaders: AuthorizationHeader[];
    displayName: string;
    endpointHeaders: AuthorizationHeader[];
    inputDescriptors: VSS_FormInput_Contracts.InputDescriptor[];
    scheme: string;
}
export interface ServiceEndpointType {
    authenticationSchemes: ServiceEndpointAuthenticationScheme[];
    dataSources: DataSource[];
    description: string;
    displayName: string;
    endpointUrl: EndpointUrl;
    helpLink: HelpLink;
    helpMarkDown: string;
    name: string;
}
export interface TaskAgent extends TaskAgentReference {
    /**
     * Gets the request which is currently assigned to this agent.
     */
    assignedRequest: TaskAgentJobRequest;
    /**
     * Gets the date on which this agent was created.
     */
    createdOn: Date;
    /**
     * Gets or sets the maximum job parallelism allowed on this host.
     */
    maxParallelism: number;
    properties: any;
    /**
     * Gets the date on which the last connectivity status change occurred.
     */
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
    definition: TaskOrchestrationOwner;
    demands: any[];
    finishTime: Date;
    hostId: string;
    jobId: string;
    lockedUntil: Date;
    matchedAgents: TaskAgentReference[];
    owner: TaskOrchestrationOwner;
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
    /**
     * Gets the administrators group for this agent pool.
     */
    administratorsGroup: VSS_Common_Contracts.IdentityRef;
    /**
     * Gets or sets a value indicating whether or not a queue should be automatically provisioned for each project collection or not.
     */
    autoProvision: boolean;
    /**
     * Gets the identity who created this pool. The creator of the pool is automatically added into the administrators group for the pool on creation.
     */
    createdBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Gets the date/time of the pool creation.
     */
    createdOn: Date;
    /**
     * Gets the scope identifier for groups/roles which are owned by this pool.
     */
    groupScopeId: string;
    /**
     * Gets or sets a value indicating whether or not this pool is managed by the service.
     */
    isHosted: boolean;
    properties: any;
    /**
     * Gets a value indicating whether or not roles have been provisioned for this pool.
     */
    provisioned: boolean;
    /**
     * Gets the service accounts group for this agent pool.
     */
    serviceAccountsGroup: VSS_Common_Contracts.IdentityRef;
    /**
     * Gets the current size of the pool.
     */
    size: number;
}
export interface TaskAgentPoolReference {
    id: number;
    name: string;
    scope: string;
}
export interface TaskAgentQueue {
    groupScopeId: string;
    id: number;
    name: string;
    pool: TaskAgentPoolReference;
    provisioned: boolean;
}
export enum TaskAgentQueueActionFilter {
    None = 0,
    Manage = 2,
    Use = 16,
}
export interface TaskAgentReference {
    _links: any;
    /**
     * Gets or sets a value indicating whether or not this agent should be enabled for job execution.
     */
    enabled: boolean;
    /**
     * Gets the identifier of the agent.
     */
    id: number;
    /**
     * Gets the name of the agent.
     */
    name: string;
    /**
     * Gets the current connectivity status of the agent.
     */
    status: TaskAgentStatus;
    /**
     * Gets the version of the agent.
     */
    version: string;
}
export interface TaskAgentSession {
    agent: TaskAgentReference;
    ownerName: string;
    sessionId: string;
    systemCapabilities: {
        [key: string]: string;
    };
}
export enum TaskAgentStatus {
    Offline = 1,
    Online = 2,
}
export interface TaskAttachment {
    _links: any;
    createdOn: Date;
    lastChangedBy: string;
    lastChangedOn: Date;
    name: string;
    recordId: string;
    timelineId: string;
    type: string;
}
export interface TaskChangeEvent {
}
export interface TaskDefinition {
    agentExecution: TaskExecution;
    author: string;
    category: string;
    contentsUploaded: boolean;
    contributionIdentifier: string;
    contributionVersion: string;
    dataSourceBindings: DataSourceBinding[];
    demands: any[];
    description: string;
    disabled: boolean;
    friendlyName: string;
    groups: TaskGroupDefinition[];
    helpMarkDown: string;
    hostType: string;
    iconUrl: string;
    id: string;
    inputs: TaskInputDefinition[];
    instanceNameFormat: string;
    minimumAgentVersion: string;
    name: string;
    packageLocation: string;
    packageType: string;
    serverOwned: boolean;
    sourceDefinitions: TaskSourceDefinition[];
    sourceLocation: string;
    version: TaskVersion;
    visibility: string[];
}
export interface TaskDefinitionEndpoint {
    /**
     * An ID that identifies a service connection to be used for authenticating endpoint requests.
     */
    connectionId: string;
    /**
     * An Json based keyselector to filter response returned by fetching the endpoint Url.A Json based keyselector must be prefixed with "jsonpath:". KeySelector can be used to specify the filter to get the keys for the values specified with Selector.  The following keyselector defines an Json for extracting nodes named 'ServiceName'.  endpoint.KeySelector = "jsonpath://ServiceName";
     */
    keySelector: string;
    /**
     * The scope as understood by Connected Services. Essentialy, a project-id for now.
     */
    scope: string;
    /**
     * An XPath/Json based selector to filter response returned by fetching the endpoint Url. An XPath based selector must be prefixed with the string "xpath:". A Json based selector must be prefixed with "jsonpath:".  The following selector defines an XPath for extracting nodes named 'ServiceName'.  endpoint.Selector = "xpath://ServiceName";
     */
    selector: string;
    /**
     * TaskId that this endpoint belongs to.
     */
    taskId: string;
    /**
     * URL to GET.
     */
    url: string;
}
export interface TaskExecution {
    /**
     * The utility task to run.  Specifying this means that this task definition is simply a meta task to call another task. This is useful for tasks that call utility tasks like powershell and commandline
     */
    execTask: TaskReference;
    /**
     * If a task is going to run code, then this provides the type/script etc... information by platform. For example, it might look like. net45: { typeName: "Microsoft.TeamFoundation.Automation.Tasks.PowerShellTask", assemblyName: "Microsoft.TeamFoundation.Automation.Tasks.PowerShell.dll" } net20: { typeName: "Microsoft.TeamFoundation.Automation.Tasks.PowerShellTask", assemblyName: "Microsoft.TeamFoundation.Automation.Tasks.PowerShell.dll" } java: { jar: "powershelltask.tasks.automation.teamfoundation.microsoft.com", } node: { script: "powershellhost.js", }
     */
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
    properties: {
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
export enum TaskOrchestrationItemType {
    Container = 0,
    Job = 1,
}
export interface TaskOrchestrationJob extends TaskOrchestrationItem {
    demands: any[];
    executeAs: VSS_Common_Contracts.IdentityRef;
    executionTimeout: any;
    instanceId: string;
    name: string;
    tasks: TaskInstance[];
    variables: {
        [key: string]: string;
    };
}
export interface TaskOrchestrationOwner {
    _links: any;
    id: number;
    name: string;
}
export interface TaskOrchestrationPlan extends TaskOrchestrationPlanReference {
    environment: PlanEnvironment;
    finishTime: Date;
    implementation: TaskOrchestrationContainer;
    requestedById: string;
    requestedForId: string;
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
export enum TaskOrchestrationPlanState {
    InProgress = 1,
    Queued = 2,
    Completed = 4,
}
export interface TaskPackageMetadata {
    /**
     * Gets the name of the package.
     */
    type: string;
    /**
     * Gets the url of the package.
     */
    url: string;
    /**
     * Gets the version of the package.
     */
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
export enum TaskResult {
    Succeeded = 0,
    SucceededWithIssues = 1,
    Failed = 2,
    Canceled = 3,
    Skipped = 4,
    Abandoned = 5,
}
export interface TaskSourceDefinition {
    authKey: string;
    endpoint: string;
    keySelector: string;
    selector: string;
    target: string;
}
export interface TaskVersion {
    isTest: boolean;
    major: number;
    minor: number;
    patch: number;
}
/**
 * Represents a shallow reference to a TeamProject.
 */
export interface TeamProjectReference {
    /**
     * Project abbreviation.
     */
    abbreviation: string;
    /**
     * The project's description (if any).
     */
    description: string;
    /**
     * Project identifier.
     */
    id: string;
    /**
     * Project name.
     */
    name: string;
    /**
     * Project state.
     */
    state: any;
    /**
     * Url to the full version of the object.
     */
    url: string;
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
export enum TimelineRecordState {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}
export interface TimelineReference {
    changeId: number;
    id: string;
    location: string;
}
export interface WebApiConnectedService extends WebApiConnectedServiceRef {
    /**
     * The user who did the OAuth authentication to created this service
     */
    authenticatedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Extra description on the service.
     */
    description: string;
    /**
     * Friendly Name of service connection
     */
    friendlyName: string;
    /**
     * Id/Name of the connection service. For Ex: Subscription Id for Azure Connection
     */
    id: string;
    /**
     * The kind of service.
     */
    kind: string;
    /**
     * The project associated with this service
     */
    project: TeamProjectReference;
    /**
     * Optional uri to connect directly to the service such as https://windows.azure.com
     */
    serviceUri: string;
}
export interface WebApiConnectedServiceDetails extends WebApiConnectedServiceRef {
    /**
     * Meta data for service connection
     */
    connectedServiceMetaData: WebApiConnectedService;
    /**
     * Credential info
     */
    credentialsXml: string;
    /**
     * Optional uri to connect directly to the service such as https://windows.azure.com
     */
    endPoint: string;
}
export interface WebApiConnectedServiceRef {
    id: string;
    url: string;
}
export var TypeInfo: {
    AgentPoolEvent: {
        fields: any;
    };
    AgentQueueEvent: {
        fields: any;
    };
    AgentRefreshMessage: {
        fields: any;
    };
    AuthorizationHeader: {
        fields: any;
    };
    ConnectedServiceKind: {
        enumValues: {
            "custom": number;
            "azureSubscription": number;
            "chef": number;
            "generic": number;
            "gitHub": number;
        };
    };
    DataSource: {
        fields: any;
    };
    DataSourceBinding: {
        fields: any;
    };
    EndpointAuthorization: {
        fields: any;
    };
    EndpointUrl: {
        fields: any;
    };
    HelpLink: {
        fields: any;
    };
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
    JobCancelMessage: {
        fields: any;
    };
    JobCompletedEvent: {
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
    PlanEnvironment: {
        fields: any;
    };
    ServiceEndpoint: {
        fields: any;
    };
    ServiceEndpointAuthenticationScheme: {
        fields: any;
    };
    ServiceEndpointType: {
        fields: any;
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
    TaskAgentQueue: {
        fields: any;
    };
    TaskAgentQueueActionFilter: {
        enumValues: {
            "none": number;
            "manage": number;
            "use": number;
        };
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
    TaskAttachment: {
        fields: any;
    };
    TaskChangeEvent: {
        fields: any;
    };
    TaskDefinition: {
        fields: any;
    };
    TaskDefinitionEndpoint: {
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
    TaskOrchestrationOwner: {
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
    TaskSourceDefinition: {
        fields: any;
    };
    TaskVersion: {
        fields: any;
    };
    TeamProjectReference: {
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
    WebApiConnectedService: {
        fields: any;
    };
    WebApiConnectedServiceDetails: {
        fields: any;
    };
    WebApiConnectedServiceRef: {
        fields: any;
    };
};
}
declare module "TFS/DistributedTask/TaskAgentRestClient" {
import Contracts = require("TFS/DistributedTask/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class TaskAgentHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgent>
     */
    addAgent(agent: Contracts.TaskAgent, poolId: number): IPromise<Contracts.TaskAgent>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<void>
     */
    deleteAgent(poolId: number, agentId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} agentId
     * @param {boolean} includeCapabilities
     * @param {boolean} includeAssignedRequest
     * @param {string[]} propertyFilters
     * @return IPromise<Contracts.TaskAgent>
     */
    getAgent(poolId: number, agentId: number, includeCapabilities?: boolean, includeAssignedRequest?: boolean, propertyFilters?: string[]): IPromise<Contracts.TaskAgent>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {string} agentName
     * @param {boolean} includeCapabilities
     * @param {boolean} includeAssignedRequest
     * @param {string[]} propertyFilters
     * @param {string[]} demands
     * @return IPromise<Contracts.TaskAgent[]>
     */
    getAgents(poolId: number, agentName?: string, includeCapabilities?: boolean, includeAssignedRequest?: boolean, propertyFilters?: string[], demands?: string[]): IPromise<Contracts.TaskAgent[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    replaceAgent(agent: Contracts.TaskAgent, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    updateAgent(agent: Contracts.TaskAgent, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
    /**
     * [Preview API] Proxy for a GET request defined by an 'endpoint'. The request is authorized using a service connection. The response is filtered using an XPath/Json based selector.
     *
     * @param {Contracts.TaskDefinitionEndpoint} endpoint - Describes the URL to fetch.
     * @return IPromise<string[]>
     */
    queryEndpoint(endpoint: Contracts.TaskDefinitionEndpoint): IPromise<string[]>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<void>
     */
    deleteAgentRequest(poolId: number, requestId: number, lockToken: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    getAgentRequest(poolId: number, requestId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} agentId
     * @param {number} completedRequestCount
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForAgent(poolId: number, agentId: number, completedRequestCount?: number): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number[]} agentIds
     * @param {number} completedRequestCount
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForAgents(poolId: number, agentIds: number[], completedRequestCount?: number): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {string} planId
     * @param {string} jobId
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForPlan(poolId: number, planId: string, jobId?: string): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    queueAgentRequest(request: Contracts.TaskAgentJobRequest, poolId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    updateAgentRequest(request: Contracts.TaskAgentJobRequest, poolId: number, requestId: number, lockToken: string): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} messageId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteMessage(poolId: number, messageId: number, sessionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {string} sessionId
     * @param {number} lastMessageId
     * @return IPromise<Contracts.TaskAgentMessage>
     */
    getMessage(poolId: number, sessionId: string, lastMessageId?: number): IPromise<Contracts.TaskAgentMessage>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<void>
     */
    refreshAgent(poolId: number, agentId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @return IPromise<void>
     */
    refreshAgents(poolId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentMessage} message
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<void>
     */
    sendMessage(message: Contracts.TaskAgentMessage, poolId: number, requestId: number): IPromise<void>;
    /**
     * [Preview API] This method can return packages/{packageType} -- package stream OR TaskPackageMetadata if requested for json
     *
     * @param {string} packageType
     * @return IPromise<Contracts.TaskPackageMetadata>
     */
    getPackage(packageType: string): IPromise<Contracts.TaskPackageMetadata>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.TaskPackageMetadata[]>
     */
    getPackages(): IPromise<Contracts.TaskPackageMetadata[]>;
    /**
     * [Preview API] This method can return packages/{packageType} -- package stream OR TaskPackageMetadata if requested for json
     *
     * @param {string} packageType
     * @return IPromise<ArrayBuffer>
     */
    getPackageZip(packageType: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getAgentPoolRoles(poolId?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentPool} pool
     * @return IPromise<Contracts.TaskAgentPool>
     */
    addAgentPool(pool: Contracts.TaskAgentPool): IPromise<Contracts.TaskAgentPool>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @return IPromise<void>
     */
    deleteAgentPool(poolId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {string[]} properties
     * @return IPromise<Contracts.TaskAgentPool>
     */
    getAgentPool(poolId: number, properties?: string[]): IPromise<Contracts.TaskAgentPool>;
    /**
     * [Preview API]
     *
     * @param {string} poolName
     * @param {string[]} properties
     * @return IPromise<Contracts.TaskAgentPool[]>
     */
    getAgentPools(poolName?: string, properties?: string[]): IPromise<Contracts.TaskAgentPool[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentPool} pool
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentPool>
     */
    updateAgentPool(pool: Contracts.TaskAgentPool, poolId: number): IPromise<Contracts.TaskAgentPool>;
    /**
     * [Preview API]
     *
     * @param {number} queueId
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getAgentQueueRoles(queueId?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentQueue} queue
     * @return IPromise<Contracts.TaskAgentQueue>
     */
    addAgentQueue(queue: Contracts.TaskAgentQueue): IPromise<Contracts.TaskAgentQueue>;
    /**
     * [Preview API]
     *
     * @param {number} queueId
     * @return IPromise<void>
     */
    deleteAgentQueue(queueId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} queueId
     * @param {Contracts.TaskAgentQueueActionFilter} actionFilter
     * @return IPromise<Contracts.TaskAgentQueue>
     */
    getAgentQueue(queueId: number, actionFilter?: Contracts.TaskAgentQueueActionFilter): IPromise<Contracts.TaskAgentQueue>;
    /**
     * [Preview API]
     *
     * @param {string} queueName
     * @param {Contracts.TaskAgentQueueActionFilter} actionFilter
     * @return IPromise<Contracts.TaskAgentQueue[]>
     */
    getAgentQueues(queueName?: string, actionFilter?: Contracts.TaskAgentQueueActionFilter): IPromise<Contracts.TaskAgentQueue[]>;
    /**
     * [Preview API] Proxy for a GET request defined by an service endpoint. The request is authorized using a data source in service endpoint. The response is filtered using an XPath/Json based selector.
     *
     * @param {Contracts.DataSourceBinding} binding - Describes the data source to fetch.
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @return IPromise<string[]>
     */
    queryServiceEndpoint(binding: Contracts.DataSourceBinding, scopeIdentifier: string): IPromise<string[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.ServiceEndpoint} endpoint
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<Contracts.ServiceEndpoint>
     */
    createServiceEndpoint(endpoint: Contracts.ServiceEndpoint, scopeIdentifier: string, endpointId: string): IPromise<Contracts.ServiceEndpoint>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<void>
     */
    deleteServiceEndpoint(scopeIdentifier: string, endpointId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<Contracts.ServiceEndpoint>
     */
    getServiceEndpointDetails(scopeIdentifier: string, endpointId: string): IPromise<Contracts.ServiceEndpoint>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} type
     * @param {string[]} authSchemes
     * @param {string[]} endpointIds
     * @return IPromise<Contracts.ServiceEndpoint[]>
     */
    getServiceEndpoints(scopeIdentifier: string, type?: string, authSchemes?: string[], endpointIds?: string[]): IPromise<Contracts.ServiceEndpoint[]>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} type
     * @param {string} scheme
     * @return IPromise<Contracts.ServiceEndpointType[]>
     */
    getServiceEndpointTypes(scopeIdentifier: string, type?: string, scheme?: string): IPromise<Contracts.ServiceEndpointType[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TaskAgentSession} session
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentSession>
     */
    createAgentSession(session: Contracts.TaskAgentSession, poolId: number): IPromise<Contracts.TaskAgentSession>;
    /**
     * [Preview API]
     *
     * @param {number} poolId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteAgentSession(poolId: number, sessionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} taskId
     * @return IPromise<void>
     */
    deleteTaskDefinition(taskId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} taskId
     * @param {string} versionString
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<ArrayBuffer>
     */
    getTaskContentZip(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {string} taskId
     * @param {string} versionString
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<Contracts.TaskDefinition>
     */
    getTaskDefinition(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): IPromise<Contracts.TaskDefinition>;
    /**
     * [Preview API]
     *
     * @param {string} taskId
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<Contracts.TaskDefinition[]>
     */
    getTaskDefinitions(taskId?: string, visibility?: string[], scopeLocal?: boolean): IPromise<Contracts.TaskDefinition[]>;
    /**
     * [Preview API]
     *
     * @param {{ [key: string] : string; }} userCapabilities
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    updateAgentUserCapabilities(userCapabilities: {
        [key: string]: string;
    }, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
}
export class TaskAgentHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.TaskAgent} agent
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgent>
     */
    addAgent(agent: Contracts.TaskAgent, poolId: number): IPromise<Contracts.TaskAgent>;
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
     * @param {boolean} includeAssignedRequest
     * @param {string[]} propertyFilters
     * @return IPromise<Contracts.TaskAgent>
     */
    getAgent(poolId: number, agentId: number, includeCapabilities?: boolean, includeAssignedRequest?: boolean, propertyFilters?: string[]): IPromise<Contracts.TaskAgent>;
    /**
     * @param {number} poolId
     * @param {string} agentName
     * @param {boolean} includeCapabilities
     * @param {boolean} includeAssignedRequest
     * @param {string[]} propertyFilters
     * @param {string[]} demands
     * @return IPromise<Contracts.TaskAgent[]>
     */
    getAgents(poolId: number, agentName?: string, includeCapabilities?: boolean, includeAssignedRequest?: boolean, propertyFilters?: string[], demands?: string[]): IPromise<Contracts.TaskAgent[]>;
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
    deleteAgentRequest(poolId: number, requestId: number, lockToken: string): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {number} requestId
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    getAgentRequest(poolId: number, requestId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * @param {number} poolId
     * @param {number} agentId
     * @param {number} completedRequestCount
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForAgent(poolId: number, agentId: number, completedRequestCount?: number): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * @param {number} poolId
     * @param {number[]} agentIds
     * @param {number} completedRequestCount
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForAgents(poolId: number, agentIds: number[], completedRequestCount?: number): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * @param {number} poolId
     * @param {string} planId
     * @param {string} jobId
     * @return IPromise<Contracts.TaskAgentJobRequest[]>
     */
    getAgentRequestsForPlan(poolId: number, planId: string, jobId?: string): IPromise<Contracts.TaskAgentJobRequest[]>;
    /**
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    queueAgentRequest(request: Contracts.TaskAgentJobRequest, poolId: number): IPromise<Contracts.TaskAgentJobRequest>;
    /**
     * @param {Contracts.TaskAgentJobRequest} request
     * @param {number} poolId
     * @param {number} requestId
     * @param {string} lockToken
     * @return IPromise<Contracts.TaskAgentJobRequest>
     */
    updateAgentRequest(request: Contracts.TaskAgentJobRequest, poolId: number, requestId: number, lockToken: string): IPromise<Contracts.TaskAgentJobRequest>;
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
     * This method can return packages/{packageType} -- package stream OR TaskPackageMetadata if requested for json
     *
     * @param {string} packageType
     * @return IPromise<Contracts.TaskPackageMetadata>
     */
    getPackage(packageType: string): IPromise<Contracts.TaskPackageMetadata>;
    /**
     * @return IPromise<Contracts.TaskPackageMetadata[]>
     */
    getPackages(): IPromise<Contracts.TaskPackageMetadata[]>;
    /**
     * This method can return packages/{packageType} -- package stream OR TaskPackageMetadata if requested for json
     *
     * @param {string} packageType
     * @return IPromise<ArrayBuffer>
     */
    getPackageZip(packageType: string): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} poolId
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getAgentPoolRoles(poolId?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * @param {Contracts.TaskAgentPool} pool
     * @return IPromise<Contracts.TaskAgentPool>
     */
    addAgentPool(pool: Contracts.TaskAgentPool): IPromise<Contracts.TaskAgentPool>;
    /**
     * @param {number} poolId
     * @return IPromise<void>
     */
    deleteAgentPool(poolId: number): IPromise<void>;
    /**
     * @param {number} poolId
     * @param {string[]} properties
     * @return IPromise<Contracts.TaskAgentPool>
     */
    getAgentPool(poolId: number, properties?: string[]): IPromise<Contracts.TaskAgentPool>;
    /**
     * @param {string} poolName
     * @param {string[]} properties
     * @return IPromise<Contracts.TaskAgentPool[]>
     */
    getAgentPools(poolName?: string, properties?: string[]): IPromise<Contracts.TaskAgentPool[]>;
    /**
     * @param {Contracts.TaskAgentPool} pool
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentPool>
     */
    updateAgentPool(pool: Contracts.TaskAgentPool, poolId: number): IPromise<Contracts.TaskAgentPool>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} queueId
     * @return IPromise<VSS_Common_Contracts.IdentityRef[]>
     */
    getAgentQueueRoles(queueId?: number): IPromise<VSS_Common_Contracts.IdentityRef[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TaskAgentQueue} queue
     * @return IPromise<Contracts.TaskAgentQueue>
     */
    addAgentQueue(queue: Contracts.TaskAgentQueue): IPromise<Contracts.TaskAgentQueue>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} queueId
     * @return IPromise<void>
     */
    deleteAgentQueue(queueId: number): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} queueId
     * @param {Contracts.TaskAgentQueueActionFilter} actionFilter
     * @return IPromise<Contracts.TaskAgentQueue>
     */
    getAgentQueue(queueId: number, actionFilter?: Contracts.TaskAgentQueueActionFilter): IPromise<Contracts.TaskAgentQueue>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} queueName
     * @param {Contracts.TaskAgentQueueActionFilter} actionFilter
     * @return IPromise<Contracts.TaskAgentQueue[]>
     */
    getAgentQueues(queueName?: string, actionFilter?: Contracts.TaskAgentQueueActionFilter): IPromise<Contracts.TaskAgentQueue[]>;
    /**
     * @exemptedapi
     * [Preview API] Proxy for a GET request defined by an service endpoint. The request is authorized using a data source in service endpoint. The response is filtered using an XPath/Json based selector.
     *
     * @param {Contracts.DataSourceBinding} binding - Describes the data source to fetch.
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @return IPromise<string[]>
     */
    queryServiceEndpoint(binding: Contracts.DataSourceBinding, scopeIdentifier: string): IPromise<string[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.ServiceEndpoint} endpoint
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<Contracts.ServiceEndpoint>
     */
    createServiceEndpoint(endpoint: Contracts.ServiceEndpoint, scopeIdentifier: string, endpointId: string): IPromise<Contracts.ServiceEndpoint>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<void>
     */
    deleteServiceEndpoint(scopeIdentifier: string, endpointId: string): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} endpointId
     * @return IPromise<Contracts.ServiceEndpoint>
     */
    getServiceEndpointDetails(scopeIdentifier: string, endpointId: string): IPromise<Contracts.ServiceEndpoint>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} type
     * @param {string[]} authSchemes
     * @param {string[]} endpointIds
     * @return IPromise<Contracts.ServiceEndpoint[]>
     */
    getServiceEndpoints(scopeIdentifier: string, type?: string, authSchemes?: string[], endpointIds?: string[]): IPromise<Contracts.ServiceEndpoint[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} type
     * @param {string} scheme
     * @return IPromise<Contracts.ServiceEndpointType[]>
     */
    getServiceEndpointTypes(scopeIdentifier: string, type?: string, scheme?: string): IPromise<Contracts.ServiceEndpointType[]>;
    /**
     * @param {Contracts.TaskAgentSession} session
     * @param {number} poolId
     * @return IPromise<Contracts.TaskAgentSession>
     */
    createAgentSession(session: Contracts.TaskAgentSession, poolId: number): IPromise<Contracts.TaskAgentSession>;
    /**
     * @param {number} poolId
     * @param {string} sessionId
     * @return IPromise<void>
     */
    deleteAgentSession(poolId: number, sessionId: string): IPromise<void>;
    /**
     * @param {string} taskId
     * @return IPromise<void>
     */
    deleteTaskDefinition(taskId: string): IPromise<void>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<ArrayBuffer>
     */
    getTaskContentZip(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): IPromise<ArrayBuffer>;
    /**
     * @param {string} taskId
     * @param {string} versionString
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<Contracts.TaskDefinition>
     */
    getTaskDefinition(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): IPromise<Contracts.TaskDefinition>;
    /**
     * @param {string} taskId
     * @param {string[]} visibility
     * @param {boolean} scopeLocal
     * @return IPromise<Contracts.TaskDefinition[]>
     */
    getTaskDefinitions(taskId?: string, visibility?: string[], scopeLocal?: boolean): IPromise<Contracts.TaskDefinition[]>;
    /**
     * @param {{ [key: string] : string; }} userCapabilities
     * @param {number} poolId
     * @param {number} agentId
     * @return IPromise<Contracts.TaskAgent>
     */
    updateAgentUserCapabilities(userCapabilities: {
        [key: string]: string;
    }, poolId: number, agentId: number): IPromise<Contracts.TaskAgent>;
}
export class TaskAgentHttpClient extends TaskAgentHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return TaskAgentHttpClient2_1
 */
export function getClient(): TaskAgentHttpClient2_1;
}
declare module "TFS/DistributedTask/TaskRestClient" {
import TFS_DistributedTask_Contracts = require("TFS/DistributedTask/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class TaskHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} type
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>
     */
    getPlanAttachments(scopeIdentifier: string, hubName: string, planId: string, type: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>;
    /**
     * [Preview API]
     *
     * @param {string} content - Content to upload
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment>
     */
    createAttachment(content: string, scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment>
     */
    getAttachment(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentContent(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>
     */
    getAttachments(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>;
    /**
     * [Preview API]
     *
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>} lines
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @return IPromise<void>
     */
    appendTimelineRecordFeed(lines: VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>, scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} content - Content to upload
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {number} logId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog>
     */
    appendLogContent(content: string, scopeIdentifier: string, hubName: string, planId: string, logId: number): IPromise<TFS_DistributedTask_Contracts.TaskLog>;
    /**
     * [Preview API]
     *
     * @param {TFS_DistributedTask_Contracts.TaskLog} log
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog>
     */
    createLog(log: TFS_DistributedTask_Contracts.TaskLog, scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {number} logId
     * @param {number} startLine
     * @param {number} endLine
     * @return IPromise<string[]>
     */
    getLog(scopeIdentifier: string, hubName: string, planId: string, logId: number, startLine?: number, endLine?: number): IPromise<string[]>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog[]>
     */
    getLogs(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog[]>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>
     */
    getPlan(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    getRecords(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, changeId?: number): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * [Preview API]
     *
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>} records
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    updateRecords(records: VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>, scopeIdentifier: string, hubName: string, planId: string, timelineId: string): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_DistributedTask_Contracts.Timeline} timeline
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    createTimeline(timeline: TFS_DistributedTask_Contracts.Timeline, scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<void>
     */
    deleteTimeline(scopeIdentifier: string, hubName: string, planId: string, timelineId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @param {boolean} includeRecords
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    getTimeline(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, changeId?: number, includeRecords?: boolean): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline[]>
     */
    getTimelines(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline[]>;
}
export class TaskHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} type
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>
     */
    getPlanAttachments(scopeIdentifier: string, hubName: string, planId: string, type: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} content - Content to upload
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment>
     */
    createAttachment(content: string, scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment>
     */
    getAttachment(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @param {string} name
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentContent(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string, name: string): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @param {string} type
     * @return IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>
     */
    getAttachments(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string, type: string): IPromise<TFS_DistributedTask_Contracts.TaskAttachment[]>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>} lines
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {string} recordId
     * @return IPromise<void>
     */
    appendTimelineRecordFeed(lines: VSS_Common_Contracts.VssJsonCollectionWrapperV<string[]>, scopeIdentifier: string, hubName: string, planId: string, timelineId: string, recordId: string): IPromise<void>;
    /**
     * @param {string} content - Content to upload
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {number} logId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog>
     */
    appendLogContent(content: string, scopeIdentifier: string, hubName: string, planId: string, logId: number): IPromise<TFS_DistributedTask_Contracts.TaskLog>;
    /**
     * @param {TFS_DistributedTask_Contracts.TaskLog} log
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog>
     */
    createLog(log: TFS_DistributedTask_Contracts.TaskLog, scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {number} logId
     * @param {number} startLine
     * @param {number} endLine
     * @return IPromise<string[]>
     */
    getLog(scopeIdentifier: string, hubName: string, planId: string, logId: number, startLine?: number, endLine?: number): IPromise<string[]>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskLog[]>
     */
    getLogs(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskLog[]>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>
     */
    getPlan(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.TaskOrchestrationPlan>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    getRecords(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, changeId?: number): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>} records
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>
     */
    updateRecords(records: VSS_Common_Contracts.VssJsonCollectionWrapperV<TFS_DistributedTask_Contracts.TimelineRecord[]>, scopeIdentifier: string, hubName: string, planId: string, timelineId: string): IPromise<TFS_DistributedTask_Contracts.TimelineRecord[]>;
    /**
     * @param {TFS_DistributedTask_Contracts.Timeline} timeline
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    createTimeline(timeline: TFS_DistributedTask_Contracts.Timeline, scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @return IPromise<void>
     */
    deleteTimeline(scopeIdentifier: string, hubName: string, planId: string, timelineId: string): IPromise<void>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @param {string} timelineId
     * @param {number} changeId
     * @param {boolean} includeRecords
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline>
     */
    getTimeline(scopeIdentifier: string, hubName: string, planId: string, timelineId: string, changeId?: number, includeRecords?: boolean): IPromise<TFS_DistributedTask_Contracts.Timeline>;
    /**
     * @param {string} scopeIdentifier - The project GUID to scope the request
     * @param {string} hubName - The name of the server hub: "build" for the Build server or "rm" for the Release Management server
     * @param {string} planId
     * @return IPromise<TFS_DistributedTask_Contracts.Timeline[]>
     */
    getTimelines(scopeIdentifier: string, hubName: string, planId: string): IPromise<TFS_DistributedTask_Contracts.Timeline[]>;
}
export class TaskHttpClient extends TaskHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return TaskHttpClient2_1
 */
export function getClient(): TaskHttpClient2_1;
}
declare module "TFS/TestManagement/Contracts" {
import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export interface AggregatedResultsAnalysis {
    duration: any;
    previousBuild: BuildReference;
    resultsByOutcome: {
        [key: number]: AggregatedResultsByOutcome;
    };
    resultsDifference: AggregatedResultsDifference;
    totalTests: number;
}
export interface AggregatedResultsByOutcome {
    count: number;
    duration: any;
    outcome: TestOutcome;
}
export interface AggregatedResultsDifference {
    increaseInDuration: any;
    increaseInFailures: number;
    increaseInPassedTests: number;
    increaseInTotalTests: number;
}
export interface AggregatedResultsForBuild {
    build: BuildReference;
    /**
     * This is tests execution duration in a build.
     */
    duration: any;
    resultsByOutcome: {
        [key: number]: AggregatedResultsByOutcome;
    };
}
export interface AggregatedResultsWithDetails {
    groupByField: string;
    resultsForGroup: TestResultsDetailsForGroup[];
}
export enum AttachmentType {
    GeneralAttachment = 0,
    AfnStrip = 1,
    BugFilingData = 2,
    CodeCoverage = 3,
    IntermediateCollectorData = 4,
    RunConfig = 5,
    TestImpactDetails = 6,
    TmiTestRunDeploymentFiles = 7,
    TmiTestRunReverseDeploymentFiles = 8,
    TmiTestResultDetail = 9,
    TmiTestRunSummary = 10,
}
export interface BatchResponse {
    error: string;
    responses: Response[];
    status: string;
}
export interface BuildConfiguration {
    branchName: string;
    buildDefinitionId: number;
    flavor: string;
    id: number;
    number: string;
    platform: string;
    project: ShallowReference;
    repositoryId: number;
    sourceVersion: string;
    uri: string;
}
export interface BuildCoverage {
    codeCoverageFileUrl: string;
    configuration: BuildConfiguration;
    lastError: string;
    modules: ModuleCoverage[];
    state: string;
}
export interface BuildReference {
    branchName: string;
    buildSystem: string;
    definitionId: number;
    id: number;
    number: string;
    uri: string;
}
export interface CloneOperationInformation {
    cloneStatistics: CloneStatistics;
    /**
     * If the operation is complete, the DateTime of completion. If operation is not complete, this is DateTime.MaxValue
     */
    completionDate: Date;
    /**
     * DateTime when the operation was started
     */
    creationDate: Date;
    /**
     * Shallow reference of the destination
     */
    destinationObject: ShallowReference;
    /**
     * Shallow reference of the destination
     */
    destinationPlan: ShallowReference;
    /**
     * Shallow reference of the destination
     */
    destinationProject: ShallowReference;
    /**
     * If the operation has Failed, Message contains the reason for failure. Null otherwise.
     */
    message: string;
    /**
     * The ID of the operation
     */
    opId: number;
    /**
     * The type of the object generated as a result of the Clone operation
     */
    resultObjectType: ResultObjectType;
    /**
     * Shallow reference of the source
     */
    sourceObject: ShallowReference;
    /**
     * Shallow reference of the source
     */
    sourcePlan: ShallowReference;
    /**
     * Shallow reference of the source
     */
    sourceProject: ShallowReference;
    /**
     * Current state of the operation. When State reaches Suceeded or Failed, the operation is complete
     */
    state: CloneOperationState;
    /**
     * Url for geting the clone information
     */
    url: string;
}
export enum CloneOperationState {
    Failed = 2,
    InProgress = 1,
    Queued = 0,
    Succeeded = 3,
}
export interface CloneOptions {
    /**
     * If set to true requirements will be cloned
     */
    cloneRequirements: boolean;
    /**
     * copy all suites from a source plan
     */
    copyAllSuites: boolean;
    /**
     * copy ancestor hieracrchy
     */
    copyAncestorHierarchy: boolean;
    /**
     * Name of the workitem type of the clone
     */
    destinationWorkItemType: string;
    /**
     * Key value pairs where the key value is overridden by the value.
     */
    overrideParameters: {
        [key: string]: string;
    };
    /**
     * Comment on the link that will link the new clone  test case to the original Set null for no comment
     */
    relatedLinkComment: string;
}
export interface CloneStatistics {
    /**
     * Number of Requirments cloned so far.
     */
    clonedRequirementsCount: number;
    /**
     * Number of shared steps cloned so far.
     */
    clonedSharedStepsCount: number;
    /**
     * Number of test cases cloned so far
     */
    clonedTestCasesCount: number;
    /**
     * Total number of requirements to be cloned
     */
    totalRequirementsCount: number;
    /**
     * Total number of test cases to be cloned
     */
    totalTestCasesCount: number;
}
/**
 * Represents the build configuration (platform, flavor) and coverage data for the build
 */
export interface CodeCoverageData {
    /**
     * Flavor of build for which data is retrieved/published
     */
    buildFlavor: string;
    /**
     * Platform of build for which data is retrieved/published
     */
    buildPlatform: string;
    /**
     * List of coverage data for the build
     */
    coverageStats: CodeCoverageStatistics[];
}
/**
 * Represents the code coverage statistics for a particular coverage label (modules, statements, blocks, etc.)
 */
export interface CodeCoverageStatistics {
    /**
     * Covered units
     */
    covered: number;
    /**
     * Delta of coverage
     */
    delta: number;
    /**
     * Is delta valid
     */
    isDeltaAvailable: boolean;
    /**
     * Label of coverage data ("Blocks", "Statements", "Modules", etc.)
     */
    label: string;
    /**
     * Position of label
     */
    position: number;
    /**
     * Total units
     */
    total: number;
}
/**
 * Represents the code coverage summary results Used to publish or retrieve code coverage summary against a build
 */
export interface CodeCoverageSummary {
    /**
     * Uri of build for which data is retrieved/published
     */
    build: ShallowReference;
    /**
     * List of coverage data and details for the build
     */
    coverageData: CodeCoverageData[];
    /**
     * Uri of build against which difference in coverage is computed
     */
    deltaBuild: ShallowReference;
}
export enum CoverageQueryFlags {
    /**
     * If set, the Coverage.Modules property will be populated.
     */
    Modules = 1,
    /**
     * If set, the ModuleCoverage.Functions properties will be populated.
     */
    Functions = 2,
    /**
     * If set, the ModuleCoverage.CoverageData field will be populated.
     */
    BlockData = 4,
}
export interface CoverageStatistics {
    blocksCovered: number;
    blocksNotCovered: number;
    linesCovered: number;
    linesNotCovered: number;
    linesPartiallyCovered: number;
}
export interface CustomTestField {
    fieldName: string;
    value: any;
}
export interface CustomTestFieldDefinition {
    fieldId: number;
    fieldName: string;
    fieldType: CustomTestFieldType;
    scope: CustomTestFieldScope;
}
export enum CustomTestFieldScope {
    None = 0,
    TestRun = 1,
    TestResult = 2,
    System = 4,
    All = 7,
}
export enum CustomTestFieldType {
    Bit = 2,
    DateTime = 4,
    Int = 8,
    Float = 6,
    String = 12,
    Guid = 14,
}
/**
 * This is a temporary class to provide the details for the test run environment.
 */
export interface DtlEnvironmentDetails {
    csmContent: string;
    csmParameters: string;
    subscriptionName: string;
}
export interface FailingSince {
    build: BuildReference;
    date: Date;
}
export interface FunctionCoverage {
    class: string;
    name: string;
    namespace: string;
    sourceFile: string;
    statistics: CoverageStatistics;
}
export enum GroupTestResultsBy {
    None = 0,
    AutomatedTestStorage = 1,
}
export interface LastResultDetails {
    dateCompleted: Date;
    duration: number;
    runBy: VSS_Common_Contracts.IdentityRef;
}
export interface ModuleCoverage {
    blockCount: number;
    blockData: number[];
    functions: FunctionCoverage[];
    name: string;
    signature: string;
    signatureAge: number;
    statistics: CoverageStatistics;
}
export interface PlanUpdateModel {
    area: ShallowReference;
    automatedTestEnvironment: TestEnvironment;
    automatedTestSettings: TestSettings;
    build: ShallowReference;
    configurationIds: number[];
    description: string;
    endDate: string;
    iteration: string;
    manualTestEnvironment: TestEnvironment;
    manualTestSettings: TestSettings;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    startDate: string;
    state: string;
    status: string;
}
export interface PointAssignment {
    configuration: ShallowReference;
    tester: VSS_Common_Contracts.IdentityRef;
}
export interface PointUpdateModel {
}
export interface PointWorkItemProperty {
    workItem: {
        key: string;
        value: any;
    };
}
export interface QueryModel {
    query: string;
}
export interface Response {
    error: string;
    id: string;
    status: string;
    url: string;
}
export enum ResultDetails {
    None = 0,
    Iterations = 1,
    WorkItems = 2,
}
export enum ResultObjectType {
    TestSuite = 0,
    TestPlan = 1,
}
export enum ResultOutcome {
    Pass = 1,
    Fail = 2,
    Pending = 3,
}
export interface ResultRetentionSettings {
    automatedResultsRetentionDuration: number;
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    lastUpdatedDate: Date;
    manualResultsRetentionDuration: number;
}
export interface ResultUpdateRequestModel {
    actionResultDeletes: TestActionResultModel[];
    actionResults: TestActionResultModel[];
    parameterDeletes: TestResultParameterModel[];
    parameters: TestResultParameterModel[];
    testCaseResult: TestCaseResultUpdateModel;
}
export interface ResultUpdateResponseModel {
    revision: number;
}
export interface RunCreateModel {
    automated: boolean;
    build: ShallowReference;
    buildDropLocation: string;
    buildFlavor: string;
    buildPlatform: string;
    comment: string;
    completeDate: string;
    configurationIds: number[];
    controller: string;
    customTestFields: CustomTestField[];
    dtlAutEnvironment: ShallowReference;
    dtlTestEnvironment: ShallowReference;
    dueDate: string;
    environmentDetails: DtlEnvironmentDetails;
    errorMessage: string;
    filter: RunFilter;
    iteration: string;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    plan: ShallowReference;
    pointIds: number[];
    releaseEnvironmentUri: string;
    releaseUri: string;
    runTimeout: any;
    sourceWorkflow: string;
    startDate: string;
    state: string;
    testConfigurationsMapping: string;
    testEnvironmentId: string;
    testSettings: ShallowReference;
    type: string;
}
/**
 * This class is used to provide the filters used for discovery
 */
export interface RunFilter {
    /**
     * filter for the test case sources (test containers)
     */
    sourceFilter: string;
    /**
     * filter for the test cases
     */
    testCaseFilter: string;
}
export interface RunStatistic {
    count: number;
    outcome: string;
    resolutionState: TestResolutionState;
    state: string;
}
export interface RunUpdateModel {
    build: ShallowReference;
    comment: string;
    completedDate: string;
    controller: string;
    deleteInProgressResults: boolean;
    dtlAutEnvironment: ShallowReference;
    dtlEnvironment: ShallowReference;
    dtlEnvironmentDetails: DtlEnvironmentDetails;
    dueDate: string;
    errorMessage: string;
    iteration: string;
    logEntries: TestMessageLogDetails[];
    name: string;
    startedDate: string;
    state: string;
    substate: TestRunSubstate;
    testEnvironmentId: string;
    testSettings: ShallowReference;
}
/**
 * An abstracted reference to some other resource. This class is used to provide the build data contracts with a uniform way to reference other resources in a way that provides easy traversal through links.
 */
export interface ShallowReference {
    /**
     * Id of the resource
     */
    id: string;
    /**
     * Name of the linked resource (definition name, controller name, etc.)
     */
    name: string;
    /**
     * Full http link to the resource
     */
    url: string;
}
export interface SharedStepModel {
    id: number;
    revision: number;
}
export interface SuiteCreateModel {
}
export interface SuiteTestCase {
    pointAssignments: PointAssignment[];
    testCase: WorkItemReference;
}
export interface SuiteUpdateModel {
}
export interface TestActionResultModel extends TestResultModelBase {
    actionPath: string;
    iterationId: number;
    sharedStepModel: SharedStepModel;
    url: string;
}
export interface TestAttachmentReference {
    id: number;
    url: string;
}
export interface TestAttachmentRequestModel {
    attachmentType: string;
    comment: string;
    fileName: string;
    stream: string;
}
export interface TestCaseResult {
    afnStripId: number;
    area: ShallowReference;
    associatedBugs: ShallowReference[];
    automatedTestId: string;
    automatedTestName: string;
    automatedTestStorage: string;
    automatedTestType: string;
    automatedTestTypeId: string;
    build: ShallowReference;
    buildReference: BuildReference;
    comment: string;
    completedDate: Date;
    computerName: string;
    configuration: ShallowReference;
    createdDate: Date;
    customFields: CustomTestField[];
    durationInMs: number;
    errorMessage: string;
    failingSince: FailingSince;
    failureType: string;
    id: number;
    iterationDetails: TestIterationDetailsModel[];
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    lastUpdatedDate: Date;
    outcome: string;
    owner: VSS_Common_Contracts.IdentityRef;
    priority: number;
    project: ShallowReference;
    resetCount: number;
    resolutionState: string;
    resolutionStateId: number;
    revision: number;
    runBy: VSS_Common_Contracts.IdentityRef;
    stackTrace: string;
    startedDate: Date;
    state: string;
    testCase: ShallowReference;
    testCaseTitle: string;
    testPoint: ShallowReference;
    testRun: ShallowReference;
    url: string;
}
export interface TestCaseResult2 {
    componentId: string;
    custom: any;
    endTime: Date;
    exceptionStack: string;
    externalArtifacts: string[];
    externalRunId: string;
    externalSystem: string;
    externalTestId: string;
    failureReasons: string[];
    failureSummary: string;
    investigationNotes: string;
    isSuperseded: boolean;
    isValid: boolean;
    outcome: ResultOutcome;
    resultCustomPropertiesTypeName: string;
    resultId: string;
    resultName: string;
    runId: string;
    startTime: Date;
    testId: string;
    tfsSecurityKey: string;
}
export interface TestCaseResultAttachmentModel {
    id: number;
    iterationId: number;
    name: string;
    size: number;
    url: string;
}
export interface TestCaseResultIdentifier {
    testResultId: number;
    testRunId: number;
}
export interface TestCaseResultUpdateModel {
    associatedWorkItems: number[];
    automatedTestTypeId: string;
    comment: string;
    completedDate: string;
    computerName: string;
    customFields: CustomTestField[];
    durationInMs: string;
    errorMessage: string;
    failureType: string;
    outcome: string;
    owner: VSS_Common_Contracts.IdentityRef;
    resolutionState: string;
    runBy: VSS_Common_Contracts.IdentityRef;
    stackTrace: string;
    startedDate: string;
    state: string;
    testCasePriority: string;
    testResult: ShallowReference;
}
export interface TestConfiguration {
    /**
     * Area of the configuration
     */
    area: ShallowReference;
    /**
     * Description of the configuration
     */
    description: string;
    /**
     * Id of the configuration
     */
    id: number;
    /**
     * Is the configuration a default for the test plans
     */
    isDefault: boolean;
    /**
     * Last Updated By  Reference
     */
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Last Updated Data
     */
    lastUpdatedDate: Date;
    /**
     * Name of the configuration
     */
    name: string;
    /**
     * Project to which the configuration belongs
     */
    project: ShallowReference;
    /**
     * Revision of the the configuration
     */
    revision: number;
    /**
     * State of the configuration
     */
    state: TestConfigurationState;
    /**
     * Url of Configuration Resource
     */
    url: string;
    /**
     * Dictionary of Test Variable, Selected Value
     */
    values: {
        [key: string]: string;
    };
}
export enum TestConfigurationState {
    /**
     * The configuration can be used for new test runs.
     */
    Active = 1,
    /**
     * The configuration has been retired and should not be used for new test runs.
     */
    Inactive = 2,
}
export interface TestEnvironment {
    environmentId: string;
    environmentName: string;
}
export interface TestFailureDetails {
    count: number;
    testResults: ShallowReference[];
}
export interface TestFailuresAnalysis {
    existingFailures: TestFailureDetails;
    fixedTests: TestFailureDetails;
    newFailures: TestFailureDetails;
    previousBuild: BuildReference;
}
export interface TestIterationDetailsModel {
    actionResults: TestActionResultModel[];
    attachments: TestCaseResultAttachmentModel[];
    comment: string;
    completedDate: Date;
    durationInMs: number;
    errorMessage: string;
    id: number;
    outcome: string;
    parameters: TestResultParameterModel[];
    startedDate: Date;
    url: string;
}
/**
 * An abstracted reference to some other resource. This class is used to provide the build data contracts with a uniform way to reference other resources in a way that provides easy traversal through links.
 */
export interface TestMessageLogDetails {
    /**
     * Date when the resource is created
     */
    dateCreated: Date;
    /**
     * Id of the resource
     */
    entryId: number;
    /**
     * Message of the resource
     */
    message: string;
}
export enum TestOutcome {
    /**
     * Only used during an update to preserve the existing value.
     */
    Unspecified = 0,
    /**
     * Test has not been completed, or the test type does not report pass/failure.
     */
    None = 1,
    /**
     * Test was executed w/o any issues.
     */
    Passed = 2,
    /**
     * Test was executed, but there were issues. Issues may involve exceptions or failed assertions.
     */
    Failed = 3,
    /**
     * Test has completed, but we can't say if it passed or failed. May be used for aborted tests...
     */
    Inconclusive = 4,
    /**
     * The test timed out
     */
    Timeout = 5,
    /**
     * Test was aborted. This was not caused by a user gesture, but rather by a framework decision.
     */
    Aborted = 6,
    /**
     * Test had it chance for been executed but was not, as ITestElement.IsRunnable == false.
     */
    Blocked = 7,
    /**
     * Test was not executed. This was caused by a user gesture - e.g. user hit stop button.
     */
    NotExecuted = 8,
    /**
     * To be used by Run level results. This is not a failure.
     */
    Warning = 9,
    /**
     * There was a system error while we were trying to execute a test.
     */
    Error = 10,
    /**
     * Test is Not Applicable for execution.
     */
    NotApplicable = 11,
    /**
     * Test is paused.
     */
    Paused = 12,
    /**
     * Test is currently executing. Added this for TCM charts
     */
    InProgress = 13,
    MaxValue = 13,
}
export interface TestPlan {
    area: ShallowReference;
    automatedTestEnvironment: TestEnvironment;
    automatedTestSettings: TestSettings;
    build: ShallowReference;
    clientUrl: string;
    description: string;
    endDate: Date;
    id: number;
    iteration: string;
    manualTestEnvironment: TestEnvironment;
    manualTestSettings: TestSettings;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    previousBuild: ShallowReference;
    project: ShallowReference;
    revision: number;
    rootSuite: ShallowReference;
    startDate: Date;
    state: string;
    updatedBy: VSS_Common_Contracts.IdentityRef;
    updatedDate: Date;
    url: string;
}
export interface TestPlanCloneRequest {
    cloneOptions: CloneOptions;
    destinationTestPlan: TestPlan;
    suiteIds: number[];
}
export interface TestPlansWithSelection {
    lastSelectedPlan: number;
    lastSelectedSuite: number;
    plans: TestPlan[];
}
export interface TestPoint {
    assignedTo: VSS_Common_Contracts.IdentityRef;
    automated: boolean;
    comment: string;
    configuration: ShallowReference;
    failureType: string;
    id: number;
    lastResolutionStateId: number;
    lastResult: ShallowReference;
    lastResultDetails: LastResultDetails;
    lastRunBuildNumber: string;
    lastTestRun: ShallowReference;
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    lastUpdatedDate: Date;
    outcome: string;
    revision: number;
    state: string;
    suite: ShallowReference;
    testCase: WorkItemReference;
    testPlan: ShallowReference;
    url: string;
    workItemProperties: any[];
}
export interface TestReport {
    aggregatedResultsAnalysis: AggregatedResultsAnalysis;
    build: BuildReference;
    teamProject: TFS_Core_Contracts.TeamProjectReference;
    testFailures: TestFailuresAnalysis;
}
export interface TestResolutionState {
    id: number;
    name: string;
    project: ShallowReference;
}
export interface TestResultCreateModel {
    area: ShallowReference;
    associatedWorkItems: number[];
    automatedTestId: string;
    automatedTestName: string;
    automatedTestStorage: string;
    automatedTestType: string;
    automatedTestTypeId: string;
    comment: string;
    completedDate: string;
    computerName: string;
    configuration: ShallowReference;
    customFields: CustomTestField[];
    durationInMs: string;
    errorMessage: string;
    failureType: string;
    outcome: string;
    owner: VSS_Common_Contracts.IdentityRef;
    resolutionState: string;
    runBy: VSS_Common_Contracts.IdentityRef;
    stackTrace: string;
    startedDate: string;
    state: string;
    testCase: ShallowReference;
    testCasePriority: string;
    testCaseTitle: string;
    testPoint: ShallowReference;
}
export interface TestResultModelBase {
    comment: string;
    completedDate: Date;
    durationInMs: number;
    errorMessage: string;
    outcome: string;
    startedDate: Date;
}
export interface TestResultParameterModel {
    actionPath: string;
    iterationId: number;
    parameterName: string;
    url: string;
    value: string;
}
export interface TestResultsDetailsForGroup {
    groupByValue: string;
    ids: TestCaseResultIdentifier[];
    resultsCountByOutcome: {
        [key: number]: AggregatedResultsByOutcome;
    };
}
export interface TestResultTrendFilter {
    branchNames: string[];
    definitionIds: number[];
    sourceWorkflow: string;
    testRunTitles: string[];
}
export interface TestRun {
    build: ShallowReference;
    buildConfiguration: BuildConfiguration;
    comment: string;
    completedDate: Date;
    controller: string;
    createdDate: Date;
    customFields: CustomTestField[];
    dropLocation: string;
    dtlAutEnvironment: ShallowReference;
    dtlEnvironment: ShallowReference;
    dtlEnvironmentCreationDetails: DtlEnvironmentDetails;
    dueDate: Date;
    errorMessage: string;
    filter: RunFilter;
    id: number;
    incompleteTests: number;
    isAutomated: boolean;
    iteration: string;
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    lastUpdatedDate: Date;
    name: string;
    notApplicableTests: number;
    owner: VSS_Common_Contracts.IdentityRef;
    passedTests: number;
    phase: string;
    plan: ShallowReference;
    postProcessState: string;
    project: ShallowReference;
    releaseEnvironmentUri: string;
    releaseUri: string;
    revision: number;
    runStatistics: RunStatistic[];
    startedDate: Date;
    state: string;
    substate: TestRunSubstate;
    testEnvironment: TestEnvironment;
    testMessageLogId: number;
    testSettings: ShallowReference;
    totalTests: number;
    unanalyzedTests: number;
    url: string;
    webAccessUrl: string;
}
export interface TestRunCoverage {
    lastError: string;
    modules: ModuleCoverage[];
    state: string;
    testRun: ShallowReference;
}
export enum TestRunState {
    /**
     * Only used during an update to preserve the existing value.
     */
    Unspecified = 0,
    /**
     * The run is still being created.  No tests have started yet.
     */
    NotStarted = 1,
    /**
     * Tests are running.
     */
    InProgress = 2,
    /**
     * All tests have completed or been skipped.
     */
    Completed = 3,
    /**
     * Run is stopped and remaing tests have been aborted
     */
    Aborted = 4,
    /**
     * Run is currently initializing This is a legacy state and should not be used any more
     */
    Waiting = 5,
    /**
     * Run requires investigation because of a test point failure This is a legacy state and should not be used any more
     */
    NeedsInvestigation = 6,
}
export interface TestRunStatistic {
    run: ShallowReference;
    runStatistics: RunStatistic[];
}
export enum TestRunSubstate {
    None = 0,
    CreatingEnvironment = 1,
    RunningTests = 2,
    CanceledByUser = 3,
    AbortedBySystem = 4,
    TimedOut = 5,
    PendingAnalysis = 6,
    Analyzed = 7,
    CancellationInProgress = 8,
}
/**
 * Represents the test settings of the run. Used to create test settings and fetch test settings
 */
export interface TestSettings {
    /**
     * Area path required to create test settings
     */
    areaPath: string;
    /**
     * Description of the test settings. Used in create test settings.
     */
    description: string;
    /**
     * Indicates if the tests settings is public or private.Used in create test settings.
     */
    isPublic: boolean;
    /**
     * Xml string of machine roles. Used in create test settings.
     */
    machineRoles: string;
    /**
     * Test settings content.
     */
    testSettingsContent: string;
    /**
     * Test settings id.
     */
    testSettingsId: number;
    /**
     * Test settings name.
     */
    testSettingsName: string;
}
export interface TestSuite {
    areaUri: string;
    defaultConfigurations: ShallowReference[];
    id: number;
    inheritDefaultConfigurations: boolean;
    lastError: string;
    lastPopulatedDate: Date;
    lastUpdatedBy: VSS_Common_Contracts.IdentityRef;
    lastUpdatedDate: Date;
    name: string;
    parent: ShallowReference;
    plan: ShallowReference;
    project: ShallowReference;
    queryString: string;
    requirementId: number;
    revision: number;
    state: string;
    suites: ShallowReference[];
    suiteType: string;
    testCaseCount: number;
    testCasesUrl: string;
    url: string;
}
export interface TestSuiteCloneRequest {
    cloneOptions: CloneOptions;
    destinationSuiteId: number;
    destinationSuiteProjectName: string;
}
export interface TestVariable {
    /**
     * Description of the test variable
     */
    description: string;
    /**
     * Id of the test variable
     */
    id: number;
    /**
     * Name of the test variable
     */
    name: string;
    /**
     * Project to which the test variable belongs
     */
    project: ShallowReference;
    /**
     * Revision
     */
    revision: number;
    /**
     * Url of the test variable
     */
    url: string;
    /**
     * List of allowed values
     */
    values: string[];
}
export interface WorkItemReference {
    id: string;
    name: string;
    url: string;
    webUrl: string;
}
export var TypeInfo: {
    AggregatedResultsAnalysis: {
        fields: any;
    };
    AggregatedResultsByOutcome: {
        fields: any;
    };
    AggregatedResultsDifference: {
        fields: any;
    };
    AggregatedResultsForBuild: {
        fields: any;
    };
    AggregatedResultsWithDetails: {
        fields: any;
    };
    AttachmentType: {
        enumValues: {
            "generalAttachment": number;
            "afnStrip": number;
            "bugFilingData": number;
            "codeCoverage": number;
            "intermediateCollectorData": number;
            "runConfig": number;
            "testImpactDetails": number;
            "tmiTestRunDeploymentFiles": number;
            "tmiTestRunReverseDeploymentFiles": number;
            "tmiTestResultDetail": number;
            "tmiTestRunSummary": number;
        };
    };
    BatchResponse: {
        fields: any;
    };
    BuildConfiguration: {
        fields: any;
    };
    BuildCoverage: {
        fields: any;
    };
    BuildReference: {
        fields: any;
    };
    CloneOperationInformation: {
        fields: any;
    };
    CloneOperationState: {
        enumValues: {
            "failed": number;
            "inProgress": number;
            "queued": number;
            "succeeded": number;
        };
    };
    CloneOptions: {
        fields: any;
    };
    CloneStatistics: {
        fields: any;
    };
    CodeCoverageData: {
        fields: any;
    };
    CodeCoverageStatistics: {
        fields: any;
    };
    CodeCoverageSummary: {
        fields: any;
    };
    CoverageQueryFlags: {
        enumValues: {
            "modules": number;
            "functions": number;
            "blockData": number;
        };
    };
    CoverageStatistics: {
        fields: any;
    };
    CustomTestField: {
        fields: any;
    };
    CustomTestFieldDefinition: {
        fields: any;
    };
    CustomTestFieldScope: {
        enumValues: {
            "none": number;
            "testRun": number;
            "testResult": number;
            "system": number;
            "all": number;
        };
    };
    CustomTestFieldType: {
        enumValues: {
            "bit": number;
            "dateTime": number;
            "int": number;
            "float": number;
            "string": number;
            "guid": number;
        };
    };
    DtlEnvironmentDetails: {
        fields: any;
    };
    FailingSince: {
        fields: any;
    };
    FunctionCoverage: {
        fields: any;
    };
    GroupTestResultsBy: {
        enumValues: {
            "none": number;
            "automatedTestStorage": number;
        };
    };
    LastResultDetails: {
        fields: any;
    };
    ModuleCoverage: {
        fields: any;
    };
    PlanUpdateModel: {
        fields: any;
    };
    PointAssignment: {
        fields: any;
    };
    PointUpdateModel: {
        fields: any;
    };
    PointWorkItemProperty: {
        fields: any;
    };
    QueryModel: {
        fields: any;
    };
    Response: {
        fields: any;
    };
    ResultDetails: {
        enumValues: {
            "none": number;
            "iterations": number;
            "workItems": number;
        };
    };
    ResultObjectType: {
        enumValues: {
            "testSuite": number;
            "testPlan": number;
        };
    };
    ResultOutcome: {
        enumValues: {
            "pass": number;
            "fail": number;
            "pending": number;
        };
    };
    ResultRetentionSettings: {
        fields: any;
    };
    ResultUpdateRequestModel: {
        fields: any;
    };
    ResultUpdateResponseModel: {
        fields: any;
    };
    RunCreateModel: {
        fields: any;
    };
    RunFilter: {
        fields: any;
    };
    RunStatistic: {
        fields: any;
    };
    RunUpdateModel: {
        fields: any;
    };
    ShallowReference: {
        fields: any;
    };
    SharedStepModel: {
        fields: any;
    };
    SuiteCreateModel: {
        fields: any;
    };
    SuiteTestCase: {
        fields: any;
    };
    SuiteUpdateModel: {
        fields: any;
    };
    TestActionResultModel: {
        fields: any;
    };
    TestAttachmentReference: {
        fields: any;
    };
    TestAttachmentRequestModel: {
        fields: any;
    };
    TestCaseResult: {
        fields: any;
    };
    TestCaseResult2: {
        fields: any;
    };
    TestCaseResultAttachmentModel: {
        fields: any;
    };
    TestCaseResultIdentifier: {
        fields: any;
    };
    TestCaseResultUpdateModel: {
        fields: any;
    };
    TestConfiguration: {
        fields: any;
    };
    TestConfigurationState: {
        enumValues: {
            "active": number;
            "inactive": number;
        };
    };
    TestEnvironment: {
        fields: any;
    };
    TestFailureDetails: {
        fields: any;
    };
    TestFailuresAnalysis: {
        fields: any;
    };
    TestIterationDetailsModel: {
        fields: any;
    };
    TestMessageLogDetails: {
        fields: any;
    };
    TestOutcome: {
        enumValues: {
            "unspecified": number;
            "none": number;
            "passed": number;
            "failed": number;
            "inconclusive": number;
            "timeout": number;
            "aborted": number;
            "blocked": number;
            "notExecuted": number;
            "warning": number;
            "error": number;
            "notApplicable": number;
            "paused": number;
            "inProgress": number;
            "maxValue": number;
        };
    };
    TestPlan: {
        fields: any;
    };
    TestPlanCloneRequest: {
        fields: any;
    };
    TestPlansWithSelection: {
        fields: any;
    };
    TestPoint: {
        fields: any;
    };
    TestReport: {
        fields: any;
    };
    TestResolutionState: {
        fields: any;
    };
    TestResultCreateModel: {
        fields: any;
    };
    TestResultModelBase: {
        fields: any;
    };
    TestResultParameterModel: {
        fields: any;
    };
    TestResultsDetailsForGroup: {
        fields: any;
    };
    TestResultTrendFilter: {
        fields: any;
    };
    TestRun: {
        fields: any;
    };
    TestRunCoverage: {
        fields: any;
    };
    TestRunState: {
        enumValues: {
            "unspecified": number;
            "notStarted": number;
            "inProgress": number;
            "completed": number;
            "aborted": number;
            "waiting": number;
            "needsInvestigation": number;
        };
    };
    TestRunStatistic: {
        fields: any;
    };
    TestRunSubstate: {
        enumValues: {
            "none": number;
            "creatingEnvironment": number;
            "runningTests": number;
            "canceledByUser": number;
            "abortedBySystem": number;
            "timedOut": number;
            "pendingAnalysis": number;
            "analyzed": number;
            "cancellationInProgress": number;
        };
    };
    TestSettings: {
        fields: any;
    };
    TestSuite: {
        fields: any;
    };
    TestSuiteCloneRequest: {
        fields: any;
    };
    TestVariable: {
        fields: any;
    };
    WorkItemReference: {
        fields: any;
    };
};
}
declare module "TFS/TestManagement/RestClient" {
import Contracts = require("TFS/TestManagement/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class TestHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestResultAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * [Preview API] Returns a test result attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestResultAttachmentContent(project: string, runId: number, testCaseResultId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Returns a test result attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestResultAttachmentZip(project: string, runId: number, testCaseResultId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestRunAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * [Preview API] Returns a test run attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestRunAttachmentContent(project: string, runId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Returns a test run attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestRunAttachmentZip(project: string, runId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @return IPromise<Contracts.WorkItemReference[]>
     */
    getBugsLinkedToTestResult(project: string, runId: number, testCaseResultId: number): IPromise<Contracts.WorkItemReference[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} flags
     * @return IPromise<Contracts.BuildCoverage[]>
     */
    getBuildCodeCoverage(project: string, buildId: number, flags: number): IPromise<Contracts.BuildCoverage[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} deltaBuildId
     * @return IPromise<Contracts.CodeCoverageSummary>
     */
    getCodeCoverageSummary(project: string, buildId: number, deltaBuildId?: number): IPromise<Contracts.CodeCoverageSummary>;
    /**
     * [Preview API] http://(tfsserver):8080/tfs/DefaultCollection/_apis/test/CodeCoverage?buildId=10 Request: Json of code coverage summary
     *
     * @param {Contracts.CodeCoverageData} coverageData
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<void>
     */
    updateCodeCoverageSummary(coverageData: Contracts.CodeCoverageData, project: string, buildId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} flags
     * @return IPromise<Contracts.TestRunCoverage[]>
     */
    getTestRunCodeCoverage(project: string, runId: number, flags: number): IPromise<Contracts.TestRunCoverage[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestConfiguration} testConfiguration
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestConfiguration>
     */
    createTestConfiguration(testConfiguration: Contracts.TestConfiguration, project: string): IPromise<Contracts.TestConfiguration>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<void>
     */
    deleteTestConfiguration(project: string, testConfigurationId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<Contracts.TestConfiguration>
     */
    getTestConfigurationById(project: string, testConfigurationId: number): IPromise<Contracts.TestConfiguration>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestConfiguration[]>
     */
    getTestConfigurations(project: string, skip?: number, top?: number): IPromise<Contracts.TestConfiguration[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestConfiguration} testConfiguration
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<Contracts.TestConfiguration>
     */
    updateTestConfiguration(testConfiguration: Contracts.TestConfiguration, project: string, testConfigurationId: number): IPromise<Contracts.TestConfiguration>;
    /**
     * [Preview API]
     *
     * @param {Contracts.CustomTestFieldDefinition[]} newFields
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.CustomTestFieldDefinition[]>
     */
    addCustomFields(newFields: Contracts.CustomTestFieldDefinition[], project: string): IPromise<Contracts.CustomTestFieldDefinition[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.CustomTestFieldScope} scopeFilter
     * @return IPromise<Contracts.CustomTestFieldDefinition[]>
     */
    queryCustomFields(project: string, scopeFilter: Contracts.CustomTestFieldScope): IPromise<Contracts.CustomTestFieldDefinition[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestMessageLogDetails[]>
     */
    getTestRunLogs(project: string, runId: number): IPromise<Contracts.TestMessageLogDetails[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} operationId
     * @param {boolean} includeDetails
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    getPlanCloneInformation(project: string, operationId: number, includeDetails?: boolean): IPromise<Contracts.CloneOperationInformation>;
    /**
     * [Preview API]
     *
     * @param {Contracts.PlanUpdateModel} testPlan
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestPlan>
     */
    createTestPlan(testPlan: Contracts.PlanUpdateModel, project: string): IPromise<Contracts.TestPlan>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    getPlanById(project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} owner
     * @param {number} skip
     * @param {number} top
     * @param {boolean} includePlanDetails
     * @param {boolean} filterActivePlans
     * @return IPromise<Contracts.TestPlan[]>
     */
    getPlans(project: string, owner?: string, skip?: number, top?: number, includePlanDetails?: boolean, filterActivePlans?: boolean): IPromise<Contracts.TestPlan[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.PlanUpdateModel} planUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    updateTestPlan(planUpdateModel: Contracts.PlanUpdateModel, project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestPlanCloneRequest} cloneRequestBody
     * @param {string} project - Project ID or project name
     * @param {number} sourcePlanId
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    cloneTestPlan(cloneRequestBody: Contracts.TestPlanCloneRequest, project: string, sourcePlanId: number): IPromise<Contracts.CloneOperationInformation>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} pointIds
     * @param {string} witFields
     * @return IPromise<Contracts.TestPoint>
     */
    getPoint(project: string, planId: number, suiteId: number, pointIds: number, witFields?: string): IPromise<Contracts.TestPoint>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} witFields
     * @param {string} configurationId
     * @param {string} testCaseId
     * @param {string} testPointIds
     * @param {boolean} includePointDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestPoint[]>
     */
    getPoints(project: string, planId: number, suiteId: number, witFields?: string, configurationId?: string, testCaseId?: string, testPointIds?: string, includePointDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestPoint[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.PointUpdateModel} pointUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} pointIds
     * @return IPromise<Contracts.TestPoint[]>
     */
    updateTestPoints(pointUpdateModel: Contracts.PointUpdateModel, project: string, planId: number, suiteId: number, pointIds: string): IPromise<Contracts.TestPoint[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @param {number} testResultId
     * @param {number} recentDays
     * @return IPromise<Contracts.WorkItemReference[]>
     */
    queryTestResultRecentBugs(project: string, testRunId: number, testResultId: number, recentDays?: number): IPromise<Contracts.WorkItemReference[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} sourceWorkflow
     * @param {boolean} includeFailureDetails
     * @param {Contracts.BuildReference} buildToCompare
     * @return IPromise<Contracts.TestReport>
     */
    queryReportForBuild(project: string, buildId: number, sourceWorkflow: string, includeFailureDetails: boolean, buildToCompare: Contracts.BuildReference): IPromise<Contracts.TestReport>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} sourceWorkflow
     * @param {string} groupBy
     * @param {string} filter
     * @return IPromise<Contracts.AggregatedResultsWithDetails>
     */
    getTestResultDetailsForBuild(project: string, buildId: number, sourceWorkflow: string, groupBy?: string, filter?: string): IPromise<Contracts.AggregatedResultsWithDetails>;
    /**
     * [Preview API]
     *
     * @param {Contracts.ResultRetentionSettings} retentionSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    createResultRetentionSettings(retentionSettings: Contracts.ResultRetentionSettings, project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteResultRetentionSettings(project: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    getResultRetentionSettings(project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * [Preview API]
     *
     * @param {Contracts.ResultRetentionSettings} retentionSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    updateResultRetentionSettings(retentionSettings: Contracts.ResultRetentionSettings, project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel>
     */
    getTestIteration(project: string, runId: number, testCaseResultId: number, iterationId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel[]>
     */
    getTestIterations(project: string, runId: number, testCaseResultId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestResultCreateModel[]} resultCreateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    addTestResultsToTestRun(resultCreateModels: Contracts.TestResultCreateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultUpdateModel} resultUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number[]} resultIds
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    bulkUpdateTestResults(resultUpdateModel: Contracts.TestCaseResultUpdateModel, project: string, runId: number, resultIds: number[]): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeIterationDetails
     * @param {boolean} includeAssociatedBugs
     * @return IPromise<Contracts.TestCaseResult>
     */
    getTestCaseResultById(project: string, runId: number, testCaseResultId: number, includeIterationDetails: boolean, includeAssociatedBugs?: boolean): IPromise<Contracts.TestCaseResult>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {boolean} includeIterationDetails
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestCaseResults(project: string, runId: number, includeIterationDetails: boolean): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {Contracts.ResultDetails} detailsToInclude
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultById(project: string, runId: number, testCaseResultId: number, detailsToInclude?: Contracts.ResultDetails): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {Contracts.ResultDetails} detailsToInclude
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResults(project: string, runId: number, detailsToInclude?: Contracts.ResultDetails, skip?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultUpdateModel[]} resultUpdateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    updateTestResults(resultUpdateModels: Contracts.TestCaseResultUpdateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultIdentifier[]} ids
     * @param {string} project - Project ID or project name
     * @param {string[]} fields
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultsByIds(ids: Contracts.TestCaseResultIdentifier[], project: string, fields: string[]): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} actionPath
     * @return IPromise<Contracts.TestActionResultModel[]>
     */
    getActionResults(project: string, runId: number, testCaseResultId: number, iterationId: number, actionPath?: string): IPromise<Contracts.TestActionResultModel[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} paramName
     * @return IPromise<Contracts.TestResultParameterModel[]>
     */
    getResultParameters(project: string, runId: number, testCaseResultId: number, iterationId: number, paramName?: string): IPromise<Contracts.TestResultParameterModel[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeResultDetails
     * @param {boolean} includeIterationDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultsByQuery(query: Contracts.QueryModel, project: string, includeResultDetails?: boolean, includeIterationDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @param {number} testResultId
     * @param {number} historyDays
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    queryTestResultTrendReport(project: string, testRunId: number, testResultId: number, historyDays?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestResultTrendFilter} filter
     * @param {string} project - Project ID or project name
     * @param {number} buildCount
     * @return IPromise<Contracts.AggregatedResultsForBuild[]>
     */
    queryResultTrendForBuild(filter: Contracts.TestResultTrendFilter, project: string, buildCount?: number): IPromise<Contracts.AggregatedResultsForBuild[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRunStatistic>
     */
    getTestRunStatistics(project: string, runId: number): IPromise<Contracts.TestRunStatistic>;
    /**
     * [Preview API]
     *
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeRunDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRunsByQuery(query: Contracts.QueryModel, project: string, includeRunDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.RunCreateModel} testRun
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestRun>
     */
    createTestRun(testRun: Contracts.RunCreateModel, project: string): IPromise<Contracts.TestRun>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<void>
     */
    deleteTestRun(project: string, runId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    getTestRunById(project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} buildUri
     * @param {string} owner
     * @param {string} tmiRunId
     * @param {number} planId
     * @param {boolean} includeRunDetails
     * @param {boolean} automated
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRuns(project: string, buildUri?: string, owner?: string, tmiRunId?: string, planId?: number, includeRunDetails?: boolean, automated?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.RunUpdateModel} runUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    updateTestRun(runUpdateModel: Contracts.RunUpdateModel, project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} operationId
     * @param {boolean} includeDetails
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    getSuiteCloneInformation(project: string, operationId: number, includeDetails?: boolean): IPromise<Contracts.CloneOperationInformation>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    addTestCasesToSuite(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase>
     */
    getTestCaseById(project: string, planId: number, suiteId: number, testCaseIds: number): IPromise<Contracts.SuiteTestCase>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    getTestCases(project: string, planId: number, suiteId: number): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<void>
     */
    removeTestCasesFromSuiteUrl(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {Contracts.SuiteCreateModel} testSuite
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite[]>
     */
    createTestSuite(testSuite: Contracts.SuiteCreateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<void>
     */
    deleteTestSuite(project: string, planId: number, suiteId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {boolean} includeChildSuites
     * @return IPromise<Contracts.TestSuite>
     */
    getTestSuiteById(project: string, planId: number, suiteId: number, includeChildSuites?: boolean): IPromise<Contracts.TestSuite>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {boolean} includeSuites
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestSuite[]>
     */
    getTestSuitesForPlan(project: string, planId: number, includeSuites?: boolean, skip?: number, top?: number): IPromise<Contracts.TestSuite[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.SuiteUpdateModel} suiteUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite>
     */
    updateTestSuite(suiteUpdateModel: Contracts.SuiteUpdateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestSuiteCloneRequest} cloneRequestBody
     * @param {string} project - Project ID or project name
     * @param {number} sourceSuiteId
     * @param {number} planId
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    cloneTestSuite(cloneRequestBody: Contracts.TestSuiteCloneRequest, project: string, sourceSuiteId: number, planId: number): IPromise<Contracts.CloneOperationInformation>;
    /**
     * [Preview API]
     *
     * @param {number} testCaseId
     * @return IPromise<Contracts.TestSuite[]>
     */
    getSuitesByTestCaseId(testCaseId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.BuildReference} build
     * @param {string} project - Project ID or project name
     * @param {string} sourceWorkflow
     * @param {Contracts.BuildReference} buildToCompare
     * @return IPromise<Contracts.TestFailuresAnalysis>
     */
    queryFailureDetailsForBuild(build: Contracts.BuildReference, project: string, sourceWorkflow: string, buildToCompare: Contracts.BuildReference): IPromise<Contracts.TestFailuresAnalysis>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @return IPromise<Contracts.TestFailuresAnalysis>
     */
    queryFailureDetailsForTestRun(project: string, testRunId: number): IPromise<Contracts.TestFailuresAnalysis>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestSettings} testSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<number>
     */
    createTestSettings(testSettings: Contracts.TestSettings, project: string): IPromise<number>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<void>
     */
    deleteTestSettings(project: string, testSettingsId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<Contracts.TestSettings>
     */
    getTestSettingsById(project: string, testSettingsId: number): IPromise<Contracts.TestSettings>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestVariable} testVariable
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestVariable>
     */
    createTestVariable(testVariable: Contracts.TestVariable, project: string): IPromise<Contracts.TestVariable>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<void>
     */
    deleteTestVariable(project: string, testVariableId: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<Contracts.TestVariable>
     */
    getTestVariable(project: string, testVariableId: number): IPromise<Contracts.TestVariable>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestVariable[]>
     */
    getTestVariables(project: string, skip?: number, top?: number): IPromise<Contracts.TestVariable[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TestVariable} testVariable
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<Contracts.TestVariable>
     */
    updateTestVariable(testVariable: Contracts.TestVariable, project: string, testVariableId: number): IPromise<Contracts.TestVariable>;
}
export class TestHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestResultAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * @exemptedapi
     * [Preview API] Returns a test result attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestResultAttachmentContent(project: string, runId: number, testCaseResultId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API] Returns a test result attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestResultAttachmentZip(project: string, runId: number, testCaseResultId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestRunAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * @exemptedapi
     * [Preview API] Returns a test run attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestRunAttachmentContent(project: string, runId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API] Returns a test run attachment
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} attachmentId
     * @return IPromise<ArrayBuffer>
     */
    getTestRunAttachmentZip(project: string, runId: number, attachmentId: number): IPromise<ArrayBuffer>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @return IPromise<Contracts.WorkItemReference[]>
     */
    getBugsLinkedToTestResult(project: string, runId: number, testCaseResultId: number): IPromise<Contracts.WorkItemReference[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} flags
     * @return IPromise<Contracts.BuildCoverage[]>
     */
    getBuildCodeCoverage(project: string, buildId: number, flags: number): IPromise<Contracts.BuildCoverage[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} deltaBuildId
     * @return IPromise<Contracts.CodeCoverageSummary>
     */
    getCodeCoverageSummary(project: string, buildId: number, deltaBuildId?: number): IPromise<Contracts.CodeCoverageSummary>;
    /**
     * @exemptedapi
     * [Preview API] http://(tfsserver):8080/tfs/DefaultCollection/_apis/test/CodeCoverage?buildId=10 Request: Json of code coverage summary
     *
     * @param {Contracts.CodeCoverageData} coverageData
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @return IPromise<void>
     */
    updateCodeCoverageSummary(coverageData: Contracts.CodeCoverageData, project: string, buildId: number): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} flags
     * @return IPromise<Contracts.TestRunCoverage[]>
     */
    getTestRunCodeCoverage(project: string, runId: number, flags: number): IPromise<Contracts.TestRunCoverage[]>;
    /**
     * @param {Contracts.TestConfiguration} testConfiguration
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestConfiguration>
     */
    createTestConfiguration(testConfiguration: Contracts.TestConfiguration, project: string): IPromise<Contracts.TestConfiguration>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<void>
     */
    deleteTestConfiguration(project: string, testConfigurationId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<Contracts.TestConfiguration>
     */
    getTestConfigurationById(project: string, testConfigurationId: number): IPromise<Contracts.TestConfiguration>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestConfiguration[]>
     */
    getTestConfigurations(project: string, skip?: number, top?: number): IPromise<Contracts.TestConfiguration[]>;
    /**
     * @param {Contracts.TestConfiguration} testConfiguration
     * @param {string} project - Project ID or project name
     * @param {number} testConfigurationId
     * @return IPromise<Contracts.TestConfiguration>
     */
    updateTestConfiguration(testConfiguration: Contracts.TestConfiguration, project: string, testConfigurationId: number): IPromise<Contracts.TestConfiguration>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.CustomTestFieldDefinition[]} newFields
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.CustomTestFieldDefinition[]>
     */
    addCustomFields(newFields: Contracts.CustomTestFieldDefinition[], project: string): IPromise<Contracts.CustomTestFieldDefinition[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.CustomTestFieldScope} scopeFilter
     * @return IPromise<Contracts.CustomTestFieldDefinition[]>
     */
    queryCustomFields(project: string, scopeFilter: Contracts.CustomTestFieldScope): IPromise<Contracts.CustomTestFieldDefinition[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestMessageLogDetails[]>
     */
    getTestRunLogs(project: string, runId: number): IPromise<Contracts.TestMessageLogDetails[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} operationId
     * @param {boolean} includeDetails
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    getPlanCloneInformation(project: string, operationId: number, includeDetails?: boolean): IPromise<Contracts.CloneOperationInformation>;
    /**
     * @param {Contracts.PlanUpdateModel} testPlan
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestPlan>
     */
    createTestPlan(testPlan: Contracts.PlanUpdateModel, project: string): IPromise<Contracts.TestPlan>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    getPlanById(project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} owner
     * @param {number} skip
     * @param {number} top
     * @param {boolean} includePlanDetails
     * @param {boolean} filterActivePlans
     * @return IPromise<Contracts.TestPlan[]>
     */
    getPlans(project: string, owner?: string, skip?: number, top?: number, includePlanDetails?: boolean, filterActivePlans?: boolean): IPromise<Contracts.TestPlan[]>;
    /**
     * @param {Contracts.PlanUpdateModel} planUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    updateTestPlan(planUpdateModel: Contracts.PlanUpdateModel, project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * @param {Contracts.TestPlanCloneRequest} cloneRequestBody
     * @param {string} project - Project ID or project name
     * @param {number} sourcePlanId
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    cloneTestPlan(cloneRequestBody: Contracts.TestPlanCloneRequest, project: string, sourcePlanId: number): IPromise<Contracts.CloneOperationInformation>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} pointIds
     * @param {string} witFields
     * @return IPromise<Contracts.TestPoint>
     */
    getPoint(project: string, planId: number, suiteId: number, pointIds: number, witFields?: string): IPromise<Contracts.TestPoint>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} witFields
     * @param {string} configurationId
     * @param {string} testCaseId
     * @param {string} testPointIds
     * @param {boolean} includePointDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestPoint[]>
     */
    getPoints(project: string, planId: number, suiteId: number, witFields?: string, configurationId?: string, testCaseId?: string, testPointIds?: string, includePointDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestPoint[]>;
    /**
     * @param {Contracts.PointUpdateModel} pointUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} pointIds
     * @return IPromise<Contracts.TestPoint[]>
     */
    updateTestPoints(pointUpdateModel: Contracts.PointUpdateModel, project: string, planId: number, suiteId: number, pointIds: string): IPromise<Contracts.TestPoint[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @param {number} testResultId
     * @param {number} recentDays
     * @return IPromise<Contracts.WorkItemReference[]>
     */
    queryTestResultRecentBugs(project: string, testRunId: number, testResultId: number, recentDays?: number): IPromise<Contracts.WorkItemReference[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {string} sourceWorkflow
     * @param {boolean} includeFailureDetails
     * @param {Contracts.BuildReference} buildToCompare
     * @return IPromise<Contracts.TestReport>
     */
    queryReportForBuild(project: string, buildId: number, sourceWorkflow: string, includeFailureDetails: boolean, buildToCompare: Contracts.BuildReference): IPromise<Contracts.TestReport>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.ResultRetentionSettings} retentionSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    createResultRetentionSettings(retentionSettings: Contracts.ResultRetentionSettings, project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteResultRetentionSettings(project: string): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    getResultRetentionSettings(project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.ResultRetentionSettings} retentionSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ResultRetentionSettings>
     */
    updateResultRetentionSettings(retentionSettings: Contracts.ResultRetentionSettings, project: string): IPromise<Contracts.ResultRetentionSettings>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestResultCreateModel[]} resultCreateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    addTestResultsToTestRun(resultCreateModels: Contracts.TestResultCreateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultUpdateModel} resultUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number[]} resultIds
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    bulkUpdateTestResults(resultUpdateModel: Contracts.TestCaseResultUpdateModel, project: string, runId: number, resultIds: number[]): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeIterationDetails
     * @param {boolean} includeAssociatedBugs
     * @return IPromise<Contracts.TestCaseResult>
     */
    getTestCaseResultById(project: string, runId: number, testCaseResultId: number, includeIterationDetails: boolean, includeAssociatedBugs?: boolean): IPromise<Contracts.TestCaseResult>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {boolean} includeIterationDetails
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestCaseResults(project: string, runId: number, includeIterationDetails: boolean): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {Contracts.ResultDetails} detailsToInclude
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultById(project: string, runId: number, testCaseResultId: number, detailsToInclude?: Contracts.ResultDetails): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {Contracts.ResultDetails} detailsToInclude
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResults(project: string, runId: number, detailsToInclude?: Contracts.ResultDetails, skip?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultUpdateModel[]} resultUpdateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    updateTestResults(resultUpdateModels: Contracts.TestCaseResultUpdateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestCaseResultIdentifier[]} ids
     * @param {string} project - Project ID or project name
     * @param {string[]} fields
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultsByIds(ids: Contracts.TestCaseResultIdentifier[], project: string, fields: string[]): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeResultDetails
     * @param {boolean} includeIterationDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultsByQuery(query: Contracts.QueryModel, project: string, includeResultDetails?: boolean, includeIterationDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel>
     */
    getTestIteration(project: string, runId: number, testCaseResultId: number, iterationId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel[]>
     */
    getTestIterations(project: string, runId: number, testCaseResultId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} actionPath
     * @return IPromise<Contracts.TestActionResultModel[]>
     */
    getActionResults(project: string, runId: number, testCaseResultId: number, iterationId: number, actionPath?: string): IPromise<Contracts.TestActionResultModel[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} paramName
     * @return IPromise<Contracts.TestResultParameterModel[]>
     */
    getResultParameters(project: string, runId: number, testCaseResultId: number, iterationId: number, paramName?: string): IPromise<Contracts.TestResultParameterModel[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @param {number} testResultId
     * @param {number} historyDays
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    queryTestResultTrendReport(project: string, testRunId: number, testResultId: number, historyDays?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.TestResultTrendFilter} filter
     * @param {string} project - Project ID or project name
     * @param {number} buildCount
     * @return IPromise<Contracts.AggregatedResultsForBuild[]>
     */
    queryResultTrendForBuild(filter: Contracts.TestResultTrendFilter, project: string, buildCount?: number): IPromise<Contracts.AggregatedResultsForBuild[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRunStatistic>
     */
    getTestRunStatistics(project: string, runId: number): IPromise<Contracts.TestRunStatistic>;
    /**
     * @param {Contracts.RunCreateModel} testRun
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestRun>
     */
    createTestRun(testRun: Contracts.RunCreateModel, project: string): IPromise<Contracts.TestRun>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<void>
     */
    deleteTestRun(project: string, runId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    getTestRunById(project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} buildUri
     * @param {string} owner
     * @param {string} tmiRunId
     * @param {number} planId
     * @param {boolean} includeRunDetails
     * @param {boolean} automated
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRuns(project: string, buildUri?: string, owner?: string, tmiRunId?: string, planId?: number, includeRunDetails?: boolean, automated?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * @param {Contracts.RunUpdateModel} runUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    updateTestRun(runUpdateModel: Contracts.RunUpdateModel, project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeRunDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRunsByQuery(query: Contracts.QueryModel, project: string, includeRunDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} operationId
     * @param {boolean} includeDetails
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    getSuiteCloneInformation(project: string, operationId: number, includeDetails?: boolean): IPromise<Contracts.CloneOperationInformation>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    addTestCasesToSuite(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase>
     */
    getTestCaseById(project: string, planId: number, suiteId: number, testCaseIds: number): IPromise<Contracts.SuiteTestCase>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    getTestCases(project: string, planId: number, suiteId: number): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<void>
     */
    removeTestCasesFromSuiteUrl(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<void>;
    /**
     * @param {Contracts.SuiteCreateModel} testSuite
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite[]>
     */
    createTestSuite(testSuite: Contracts.SuiteCreateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<void>
     */
    deleteTestSuite(project: string, planId: number, suiteId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {boolean} includeChildSuites
     * @return IPromise<Contracts.TestSuite>
     */
    getTestSuiteById(project: string, planId: number, suiteId: number, includeChildSuites?: boolean): IPromise<Contracts.TestSuite>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {boolean} includeSuites
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestSuite[]>
     */
    getTestSuitesForPlan(project: string, planId: number, includeSuites?: boolean, skip?: number, top?: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @param {Contracts.SuiteUpdateModel} suiteUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite>
     */
    updateTestSuite(suiteUpdateModel: Contracts.SuiteUpdateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite>;
    /**
     * @param {Contracts.TestSuiteCloneRequest} cloneRequestBody
     * @param {string} project - Project ID or project name
     * @param {number} sourceSuiteId
     * @param {number} planId
     * @return IPromise<Contracts.CloneOperationInformation>
     */
    cloneTestSuite(cloneRequestBody: Contracts.TestSuiteCloneRequest, project: string, sourceSuiteId: number, planId: number): IPromise<Contracts.CloneOperationInformation>;
    /**
     * @param {number} testCaseId
     * @return IPromise<Contracts.TestSuite[]>
     */
    getSuitesByTestCaseId(testCaseId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.BuildReference} build
     * @param {string} project - Project ID or project name
     * @param {string} sourceWorkflow
     * @param {Contracts.BuildReference} buildToCompare
     * @return IPromise<Contracts.TestFailuresAnalysis>
     */
    queryFailureDetailsForBuild(build: Contracts.BuildReference, project: string, sourceWorkflow: string, buildToCompare: Contracts.BuildReference): IPromise<Contracts.TestFailuresAnalysis>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} testRunId
     * @return IPromise<Contracts.TestFailuresAnalysis>
     */
    queryFailureDetailsForTestRun(project: string, testRunId: number): IPromise<Contracts.TestFailuresAnalysis>;
    /**
     * @param {Contracts.TestSettings} testSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<number>
     */
    createTestSettings(testSettings: Contracts.TestSettings, project: string): IPromise<number>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<void>
     */
    deleteTestSettings(project: string, testSettingsId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<Contracts.TestSettings>
     */
    getTestSettingsById(project: string, testSettingsId: number): IPromise<Contracts.TestSettings>;
    /**
     * @param {Contracts.TestVariable} testVariable
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestVariable>
     */
    createTestVariable(testVariable: Contracts.TestVariable, project: string): IPromise<Contracts.TestVariable>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<void>
     */
    deleteTestVariable(project: string, testVariableId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<Contracts.TestVariable>
     */
    getTestVariable(project: string, testVariableId: number): IPromise<Contracts.TestVariable>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestVariable[]>
     */
    getTestVariables(project: string, skip?: number, top?: number): IPromise<Contracts.TestVariable[]>;
    /**
     * @param {Contracts.TestVariable} testVariable
     * @param {string} project - Project ID or project name
     * @param {number} testVariableId
     * @return IPromise<Contracts.TestVariable>
     */
    updateTestVariable(testVariable: Contracts.TestVariable, project: string, testVariableId: number): IPromise<Contracts.TestVariable>;
}
export class TestHttpClient extends TestHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return TestHttpClient2_1
 */
export function getClient(): TestHttpClient2_1;
}
declare module "TFS/VersionControl/Contracts" {
import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export interface AssociatedWorkItem {
    assignedTo: string;
    id: number;
    state: string;
    title: string;
    /**
     * REST url
     */
    url: string;
    webUrl: string;
    workItemType: string;
}
export interface Change<T> {
    changeType: VersionControlChangeType;
    item: T;
    newContent: ItemContent;
    sourceServerItem: string;
    url: string;
}
export interface ChangeCountDictionary {
}
export interface ChangeList<T> {
    allChangesIncluded: boolean;
    changeCounts: {
        [key: number]: number;
    };
    changes: Change<T>[];
    comment: string;
    commentTruncated: boolean;
    creationDate: Date;
    notes: CheckinNote[];
    owner: string;
    ownerDisplayName: string;
    ownerId: string;
    sortDate: Date;
    version: string;
}
/**
 * Criteria used in a search for change lists
 */
export interface ChangeListSearchCriteria {
    /**
     * If provided, a version descriptor to compare against base
     */
    compareVersion: string;
    /**
     * If true, don't include delete history entries
     */
    excludeDeletes: boolean;
    /**
     * Whether or not to follow renames for the given item being queried
     */
    followRenames: boolean;
    /**
     * If provided, only include history entries created after this date (string)
     */
    fromDate: string;
    /**
     * If provided, a version descriptor for the earliest change list to include
     */
    fromVersion: string;
    /**
     * Path of item to search under
     */
    itemPath: string;
    /**
     * Version of the items to search
     */
    itemVersion: string;
    /**
     * Number of results to skip (used when clicking more...)
     */
    skip: number;
    /**
     * If provided, only include history entries created before this date (string)
     */
    toDate: string;
    /**
     * If provided, the maximum number of history entries to return
     */
    top: number;
    /**
     * If provided, a version descriptor for the latest change list to include
     */
    toVersion: string;
    /**
     * Alias or display name of user who made the changes
     */
    user: string;
}
export interface CheckinNote {
    name: string;
    value: string;
}
export interface FileContentMetadata {
    contentType: string;
    encoding: number;
    extension: string;
    fileName: string;
    isBinary: boolean;
    isImage: boolean;
    vsLink: string;
}
export interface GitBaseVersionDescriptor extends GitVersionDescriptor {
    /**
     * Version string identifier (name of tag/branch, SHA1 of commit)
     */
    baseVersion: string;
    /**
     * Version options - Specify additional modifiers to version (e.g Previous)
     */
    baseVersionOptions: GitVersionOptions;
    /**
     * Version type (branch, tag, or commit). Determines how Id is interpreted
     */
    baseVersionType: GitVersionType;
}
export interface GitBlobRef {
    _links: any;
    /**
     * SHA1 hash of git object
     */
    objectId: string;
    /**
     * Size of blob content (in bytes)
     */
    size: number;
    url: string;
}
export interface GitBranchStats {
    aheadCount: number;
    behindCount: number;
    commit: GitCommitRef;
    isBaseVersion: boolean;
    name: string;
}
export interface GitChange extends Change<GitItem> {
}
export interface GitCommit extends GitCommitRef {
    push: GitPushRef;
    treeId: string;
}
export interface GitCommitChanges {
    changeCounts: ChangeCountDictionary;
    changes: GitChange[];
}
export interface GitCommitDiffs {
    aheadCount: number;
    allChangesIncluded: boolean;
    baseCommit: string;
    behindCount: number;
    changeCounts: {
        [key: number]: number;
    };
    changes: GitChange[];
    commonCommit: string;
    targetCommit: string;
}
export interface GitCommitRef {
    _links: any;
    author: GitUserDate;
    changeCounts: ChangeCountDictionary;
    changes: GitChange[];
    comment: string;
    commentTruncated: boolean;
    commitId: string;
    committer: GitUserDate;
    parents: string[];
    remoteUrl: string;
    url: string;
}
export interface GitCommitToCreate {
    baseRef: GitRef;
    comment: string;
    pathActions: GitPathAction[];
}
export interface GitHistoryQueryResults extends HistoryQueryResults<GitItem> {
    /**
     * Seed commit used for querying history.  Used for skip feature.
     */
    startingCommitId: string;
    unpopulatedCount: number;
    unprocessedCount: number;
}
export interface GitItem extends ItemModel {
    /**
     * SHA1 of commit item was fetched at
     */
    commitId: string;
    /**
     * Type of object (Commit, Tree, Blob, Tag, ...)
     */
    gitObjectType: GitObjectType;
    /**
     * Shallow ref to commit that last changed this item Only populated if latestProcessedChange is requested May not be accurate if latest change is not yet cached
     */
    latestProcessedChange: GitCommitRef;
    /**
     * Git object id
     */
    objectId: string;
    /**
     * Git object id
     */
    originalObjectId: string;
}
export interface GitItemDescriptor {
    /**
     * Path to item
     */
    path: string;
    /**
     * Specifies whether to include children (OneLevel), all descendants (Full), or None
     */
    recursionLevel: VersionControlRecursionType;
    /**
     * Version string (interpretation based on VersionType defined in subclass
     */
    version: string;
    /**
     * Version modifiers (e.g. previous)
     */
    versionOptions: GitVersionOptions;
    /**
     * How to interpret version (branch,tag,commit)
     */
    versionType: GitVersionType;
}
export interface GitItemRequestData {
    /**
     * Whether to include metadata for all items
     */
    includeContentMetadata: boolean;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    /**
     * Collection of items to fetch, including path, version, and recursion level
     */
    itemDescriptors: GitItemDescriptor[];
    /**
     * Whether to include shallow ref to commit that last changed each item
     */
    latestProcessedChange: boolean;
}
/**
 * Encapsulates the reference metadata of a Git media object.
 */
export interface GitMediaObjectRef {
    /**
     * Gets or sets the reference links of the Git media object.
     */
    _links: any;
    /**
     * Gets or sets the Git media object identifier. This Id property duplicates the Oid property, but is required by the VSTS REST specification.
     */
    id: string;
    /**
     * Gets or sets the Git media object identifier. This property exists for adherence to the GitHub Git Media contract.
     */
    oid: string;
    /**
     * Gets or sets the size of the Git media object in bytes. This property exists for adherence to the GitHub Git Media contract.
     */
    size: number;
    /**
     * Gets or sets the URL for the Git media object.
     */
    url: string;
}
export enum GitObjectType {
    Bad = 0,
    Commit = 1,
    Tree = 2,
    Blob = 3,
    Tag = 4,
    Ext2 = 5,
    OfsDelta = 6,
    RefDelta = 7,
}
export interface GitPathAction {
    action: GitPathActions;
    base64Content: string;
    path: string;
    rawTextContent: string;
    targetPath: string;
}
export enum GitPathActions {
    None = 0,
    Edit = 1,
    Delete = 2,
    Add = 3,
    Rename = 4,
}
export interface GitPullRequest {
    _links: any;
    closedDate: Date;
    codeReviewId: number;
    commits: GitCommitRef[];
    completionOptions: GitPullRequestCompletionOptions;
    completionQueueTime: Date;
    createdBy: VSS_Common_Contracts.IdentityRef;
    creationDate: Date;
    description: string;
    lastMergeCommit: GitCommitRef;
    lastMergeSourceCommit: GitCommitRef;
    lastMergeTargetCommit: GitCommitRef;
    mergeId: string;
    mergeStatus: PullRequestAsyncStatus;
    pullRequestId: number;
    remoteUrl: string;
    repository: GitRepository;
    reviewers: IdentityRefWithVote[];
    sourceRefName: string;
    status: PullRequestStatus;
    targetRefName: string;
    title: string;
    upgraded: boolean;
    url: string;
    workItemRefs: VSS_Common_Contracts.ResourceRef[];
}
export interface GitPullRequestCompletionOptions {
    deleteSourceBranch: boolean;
    mergeCommitMessage: string;
    squashMerge: boolean;
}
export interface GitPullRequestSearchCriteria {
    creatorId: string;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    repositoryId: string;
    reviewerId: string;
    sourceRefName: string;
    status: PullRequestStatus;
    targetRefName: string;
}
export interface GitPush extends GitPushRef {
    commits: GitCommitRef[];
    refUpdates: GitRefUpdate[];
    repository: GitRepository;
}
export interface GitPushEventData {
    afterId: string;
    beforeId: string;
    branch: string;
    commits: GitCommit[];
    repository: GitRepository;
}
export interface GitPushRef {
    _links: any;
    date: Date;
    pushCorrelationId: string;
    pushedBy: VSS_Common_Contracts.IdentityRef;
    pushId: number;
    url: string;
}
export interface GitPushSearchCriteria {
    fromDate: Date;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    includeRefUpdates: boolean;
    pusherId: string;
    refName: string;
    toDate: Date;
}
export interface GitQueryCommitsCriteria {
    /**
     * Number of entries to skip
     */
    $skip: number;
    /**
     * Maximum number of entries to retrieve
     */
    $top: number;
    /**
     * Alias or display name of the author
     */
    author: string;
    /**
     * If provided, the earliest commit in the graph to search
     */
    compareVersion: GitVersionDescriptor;
    /**
     * If true, don't include delete history entries
     */
    excludeDeletes: boolean;
    /**
     * If provided, a lower bound for filtering commits alphabetically
     */
    fromCommitId: string;
    /**
     * If provided, only include history entries created after this date (string)
     */
    fromDate: string;
    /**
     * If provided, specifies the exact commit ids of the commits to fetch. May not be combined with other parameters.
     */
    ids: string[];
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    /**
     * Path of item to search under
     */
    itemPath: string;
    /**
     * If provided, identifies the commit or branch to search
     */
    itemVersion: GitVersionDescriptor;
    /**
     * If provided, an upper bound for filtering commits alphabetically
     */
    toCommitId: string;
    /**
     * If provided, only include history entries created before this date (string)
     */
    toDate: string;
    /**
     * Alias or display name of the committer
     */
    user: string;
}
export interface GitRef {
    _links: any;
    isLockedBy: VSS_Common_Contracts.IdentityRef;
    name: string;
    objectId: string;
    statuses: GitStatus[];
    url: string;
}
export interface GitRefUpdate {
    name: string;
    newObjectId: string;
    oldObjectId: string;
    repositoryId: string;
}
export enum GitRefUpdateMode {
    /**
     * Indicates the Git protocol model where any refs that can be updated will be updated, but any failures will not prevent other updates from succeeding.
     */
    BestEffort = 0,
    /**
     * Indicates that all ref updates must succeed or none will succeed. All ref updates will be atomically written. If any failure is encountered, previously successful updates will be rolled back and the entire operation will fail.
     */
    AllOrNone = 1,
}
export interface GitRefUpdateResult {
    /**
     * Custom message for the result object For instance, Reason for failing.
     */
    customMessage: string;
    /**
     * Ref name
     */
    name: string;
    /**
     * New object ID
     */
    newObjectId: string;
    /**
     * Old object ID
     */
    oldObjectId: string;
    /**
     * Name of the plugin that rejected the updated.
     */
    rejectedBy: string;
    /**
     * Repository ID
     */
    repositoryId: string;
    /**
     * True if the ref update succeeded, false otherwise
     */
    success: boolean;
    /**
     * Status of the update from the TFS server.
     */
    updateStatus: GitRefUpdateStatus;
}
export interface GitRefUpdateResultSet {
    countFailed: number;
    countSucceeded: number;
    pushCorrelationId: string;
    pushIds: {
        [key: number]: number;
    };
    pushTime: Date;
    results: GitRefUpdateResult[];
}
export enum GitRefUpdateStatus {
    /**
     * Indicates that the ref update request was completed successfully.
     */
    Succeeded = 0,
    /**
     * Indicates that the ref update request could not be completed because part of the graph would be disconnected by this change, and the caller does not have ForcePush permission on the repository.
     */
    ForcePushRequired = 1,
    /**
     * Indicates that the ref update request could not be completed because the old object ID presented in the request was not the object ID of the ref when the database attempted the update. The most likely scenario is that the caller lost a race to update the ref.
     */
    StaleOldObjectId = 2,
    /**
     * Indicates that the ref update request could not be completed because the ref name presented in the request was not valid.
     */
    InvalidRefName = 3,
    /**
     * The request was not processed
     */
    Unprocessed = 4,
    /**
     * The ref update request could not be completed because the new object ID for the ref could not be resolved to a commit object (potentially through any number of tags)
     */
    UnresolvableToCommit = 5,
    /**
     * The ref update request could not be completed because the user lacks write permissions required to write this ref
     */
    WritePermissionRequired = 6,
    /**
     * The ref update request could not be completed because the user lacks note creation permissions required to write this note
     */
    ManageNotePermissionRequired = 7,
    /**
     * The ref update request could not be completed because the user lacks the permission to create a branch
     */
    CreateBranchPermissionRequired = 8,
    /**
     * The ref update request could not be completed because the user lacks the permission to create a tag
     */
    CreateTagPermissionRequired = 9,
    /**
     * The ref update could not be completed because it was rejected by the plugin.
     */
    RejectedByPlugin = 10,
    /**
     * The ref update could not be completed because the ref is locked by another user.
     */
    Locked = 11,
    /**
     * The ref update could not be completed because, in case-insensitive mode, the ref name conflicts with an existing, differently-cased ref name.
     */
    RefNameConflict = 12,
    /**
     * The ref update could not be completed because it was rejected by policy.
     */
    RejectedByPolicy = 13,
    /**
     * Indicates that the ref update request was completed successfully, but the ref doesn't actually exist so no changes were made.  This should only happen during deletes.
     */
    SucceededNonExistentRef = 14,
    /**
     * Indicates that the ref update request was completed successfully, but the passed-in ref was corrupt - as in, the old object ID was bad.  This should only happen during deletes.
     */
    SucceededCorruptRef = 15,
}
export interface GitRepository {
    _links: any;
    defaultBranch: string;
    id: string;
    name: string;
    project: TFS_Core_Contracts.TeamProjectReference;
    remoteUrl: string;
    url: string;
}
export enum GitRepositoryPermissions {
    None = 0,
    Administer = 1,
    GenericRead = 2,
    GenericContribute = 4,
    ForcePush = 8,
    CreateBranch = 16,
    CreateTag = 32,
    ManageNote = 64,
    PolicyExempt = 128,
    /**
     * This defines the set of bits that are valid for the git permission space. When reading or writing git permissions, these are the only bits paid attention too.
     */
    All = 255,
    BranchLevelPermissions = 141,
}
export interface GitStatus {
    _links: any;
    context: GitStatusContext;
    createdBy: VSS_Common_Contracts.IdentityRef;
    creationDate: Date;
    description: string;
    state: GitStatusState;
    targetUrl: string;
}
export interface GitStatusContext {
    genre: string;
    name: string;
}
export enum GitStatusState {
    NotSet = 0,
    Pending = 1,
    Succeeded = 2,
    Failure = 3,
    Error = 4,
}
export interface GitSuggestion {
    properties: {
        [key: string]: any;
    };
    type: string;
}
export interface GitTargetVersionDescriptor extends GitVersionDescriptor {
    /**
     * Version string identifier (name of tag/branch, SHA1 of commit)
     */
    targetVersion: string;
    /**
     * Version options - Specify additional modifiers to version (e.g Previous)
     */
    targetVersionOptions: GitVersionOptions;
    /**
     * Version type (branch, tag, or commit). Determines how Id is interpreted
     */
    targetVersionType: GitVersionType;
}
export interface GitTreeEntryRef {
    /**
     * Blob or tree
     */
    gitObjectType: GitObjectType;
    /**
     * Mode represented as octal string
     */
    mode: string;
    /**
     * SHA1 hash of git object
     */
    objectId: string;
    /**
     * Path relative to parent tree object
     */
    relativePath: string;
    /**
     * Size of content
     */
    size: number;
    /**
     * url to retrieve tree or blob
     */
    url: string;
}
export interface GitTreeRef {
    _links: any;
    /**
     * SHA1 hash of git object
     */
    objectId: string;
    /**
     * Sum of sizes of all children
     */
    size: number;
    /**
     * Blobs and trees under this tree
     */
    treeEntries: GitTreeEntryRef[];
    /**
     * Url to tree
     */
    url: string;
}
export interface GitUserDate {
    date: Date;
    email: string;
    name: string;
}
export interface GitVersionDescriptor {
    /**
     * Version string identifier (name of tag/branch/index, SHA1 of commit)
     */
    version: string;
    /**
     * Version options - Specify additional modifiers to version (e.g Previous)
     */
    versionOptions: GitVersionOptions;
    /**
     * Version type (branch, tag, commit, or index). Determines how Id is interpreted
     */
    versionType: GitVersionType;
}
export enum GitVersionOptions {
    /**
     * Not specified
     */
    None = 0,
    /**
     * Commit that changed item prior to the current version
     */
    PreviousChange = 1,
    /**
     * First parent of commit (HEAD^)
     */
    FirstParent = 2,
}
export enum GitVersionType {
    /**
     * Interpret the version as a branch name
     */
    Branch = 0,
    /**
     * Interpret the version as a tag name
     */
    Tag = 1,
    /**
     * Interpret the version as a commit ID (SHA1)
     */
    Commit = 2,
    /**
     * Interpret the version as an index name
     */
    Index = 3,
}
export interface HistoryEntry<T> {
    /**
     * The Change list (changeset/commit/shelveset) for this point in history
     */
    changeList: ChangeList<T>;
    /**
     * The change made to the item from this change list (only relevant for File history, not folders)
     */
    itemChangeType: VersionControlChangeType;
    /**
     * The path of the item at this point in history (only relevant for File history, not folders)
     */
    serverItem: string;
}
export interface HistoryQueryResults<T> {
    /**
     * True if there are more results available to fetch (we're returning the max # of items requested) A more RESTy solution would be to include a Link header
     */
    moreResultsAvailable: boolean;
    /**
     * The history entries (results) from this query
     */
    results: HistoryEntry<T>[];
}
export interface IdentityRefWithVote extends VSS_Common_Contracts.IdentityRef {
    isRequired: boolean;
    reviewerUrl: string;
    vote: number;
    votedFor: IdentityRefWithVote[];
}
export interface IncludedGitCommit {
    commitId: string;
    commitTime: Date;
    parentCommitIds: string[];
    repositoryId: string;
}
export interface ItemContent {
    content: string;
    contentType: ItemContentType;
}
export enum ItemContentType {
    RawText = 0,
    Base64Encoded = 1,
}
/**
 * Optional details to include when returning an item model
 */
export interface ItemDetailsOptions {
    /**
     * If true, include metadata about the file type
     */
    includeContentMetadata: boolean;
    /**
     * Specifies whether to include children (OneLevel), all descendants (Full) or None for folder items
     */
    recursionLevel: VersionControlRecursionType;
}
export interface ItemModel {
    _links: any;
    contentMetadata: FileContentMetadata;
    isFolder: boolean;
    isSymLink: boolean;
    path: string;
    url: string;
}
export enum PullRequestAsyncStatus {
    NotSet = 0,
    Queued = 1,
    Conflicts = 2,
    Succeeded = 3,
    RejectedByPolicy = 4,
    Failure = 5,
}
export enum PullRequestStatus {
    NotSet = 0,
    Active = 1,
    Abandoned = 2,
    Completed = 3,
    All = 4,
}
export interface TfvcBranch extends TfvcBranchRef {
    children: TfvcBranch[];
    mappings: TfvcBranchMapping[];
    parent: TfvcShallowBranchRef;
    relatedBranches: TfvcShallowBranchRef[];
}
export interface TfvcBranchMapping {
    depth: string;
    serverItem: string;
    type: string;
}
export interface TfvcBranchRef extends TfvcShallowBranchRef {
    _links: any;
    createdDate: Date;
    description: string;
    isDeleted: boolean;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcChange extends Change<TfvcItem> {
    /**
     * List of merge sources in case of rename or branch creation.
     */
    mergeSources: TfvcMergeSource[];
    /**
     * Version at which a (shelved) change was pended against
     */
    pendingVersion: number;
}
export interface TfvcChangeset extends TfvcChangesetRef {
    accountId: string;
    changes: TfvcChange[];
    checkinNotes: CheckinNote[];
    collectionId: string;
    hasMoreChanges: boolean;
    policyOverride: TfvcPolicyOverrideInfo;
    teamProjectIds: string[];
    workItems: AssociatedWorkItem[];
}
export interface TfvcChangesetRef {
    _links: any;
    author: VSS_Common_Contracts.IdentityRef;
    changesetId: number;
    checkedInBy: VSS_Common_Contracts.IdentityRef;
    comment: string;
    commentTruncated: boolean;
    createdDate: Date;
    url: string;
}
/**
 * Criteria used in a search for change lists
 */
export interface TfvcChangesetSearchCriteria {
    /**
     * Alias or display name of user who made the changes
     */
    author: string;
    /**
     * Whether or not to follow renames for the given item being queried
     */
    followRenames: boolean;
    /**
     * If provided, only include changesets created after this date (string) Think of a better name for this.
     */
    fromDate: string;
    /**
     * If provided, only include changesets after this changesetID
     */
    fromId: number;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    /**
     * Path of item to search under
     */
    path: string;
    /**
     * If provided, only include changesets created before this date (string) Think of a better name for this.
     */
    toDate: string;
    /**
     * If provided, a version descriptor for the latest change list to include
     */
    toId: number;
}
export interface TfvcChangesetsRequestData {
    changesetIds: number[];
    commentLength: number;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
}
export interface TfvcCheckinEventData {
    changeset: TfvcChangeset;
    project: TFS_Core_Contracts.TeamProjectReference;
}
export interface TfvcHistoryEntry extends HistoryEntry<TfvcItem> {
    /**
     * The encoding of the item at this point in history (only relevant for File history, not folders)
     */
    encoding: number;
    /**
     * The file id of the item at this point in history (only relevant for File history, not folders)
     */
    fileId: number;
}
export interface TfvcItem extends ItemModel {
    changeDate: Date;
    deletionId: number;
    /**
     * MD5 hash as a base 64 string, applies to files only.
     */
    hashValue: string;
    isBranch: boolean;
    isPendingChange: boolean;
    /**
     * The size of the file, if applicable.
     */
    size: number;
    version: number;
}
/**
 * Item path and Version descriptor properties
 */
export interface TfvcItemDescriptor {
    path: string;
    recursionLevel: VersionControlRecursionType;
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}
export interface TfvcItemRequestData {
    /**
     * If true, include metadata about the file type
     */
    includeContentMetadata: boolean;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    itemDescriptors: TfvcItemDescriptor[];
}
export interface TfvcLabel extends TfvcLabelRef {
    items: TfvcItem[];
}
export interface TfvcLabelRef {
    _links: any;
    description: string;
    id: number;
    labelScope: string;
    modifiedDate: Date;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcLabelRequestData {
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    itemLabelFilter: string;
    labelScope: string;
    maxItemCount: number;
    name: string;
    owner: string;
}
export interface TfvcMergeSource {
    /**
     * Indicates if this a rename source. If false, it is a merge source.
     */
    isRename: boolean;
    /**
     * The server item of the merge source
     */
    serverItem: string;
    /**
     * Start of the version range
     */
    versionFrom: number;
    /**
     * End of the version range
     */
    versionTo: number;
}
export interface TfvcPolicyFailureInfo {
    message: string;
    policyName: string;
}
export interface TfvcPolicyOverrideInfo {
    comment: string;
    policyFailures: TfvcPolicyFailureInfo[];
}
export interface TfvcShallowBranchRef {
    path: string;
}
export interface TfvcShelveset extends TfvcShelvesetRef {
    changes: TfvcChange[];
    notes: CheckinNote[];
    policyOverride: TfvcPolicyOverrideInfo;
    workItems: AssociatedWorkItem[];
}
export interface TfvcShelvesetRef {
    _links: any;
    comment: string;
    commentTruncated: boolean;
    createdDate: Date;
    id: string;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcShelvesetRequestData {
    /**
     * Whether to include policyOverride and notes
     */
    includeDetails: boolean;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    /**
     * Whether to include workItems
     */
    includeWorkItems: boolean;
    /**
     * Max number of changes to include
     */
    maxChangeCount: number;
    /**
     * Max length of comment
     */
    maxCommentLength: number;
    /**
     * Shelveset's name
     */
    name: string;
    /**
     * Owner's ID. Could be a name or a guid.
     */
    owner: string;
}
export interface TfvcVersionDescriptor {
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}
export enum TfvcVersionOption {
    None = 0,
    Previous = 1,
    UseRename = 2,
}
export enum TfvcVersionType {
    None = 0,
    Changeset = 1,
    Shelveset = 2,
    Change = 3,
    Date = 4,
    Latest = 5,
    Tip = 6,
    MergeSource = 7,
}
export interface UpdateRefsRequest {
    refUpdateRequests: GitRefUpdate[];
    updateMode: GitRefUpdateMode;
}
export enum VersionControlChangeType {
    None = 0,
    Add = 1,
    Edit = 2,
    Encoding = 4,
    Rename = 8,
    Delete = 16,
    Undelete = 32,
    Branch = 64,
    Merge = 128,
    Lock = 256,
    Rollback = 512,
    SourceRename = 1024,
    TargetRename = 2048,
    Property = 4096,
    All = 8191,
}
export interface VersionControlProjectInfo {
    defaultSourceControlType: TFS_Core_Contracts.SourceControlTypes;
    project: TFS_Core_Contracts.TeamProjectReference;
    supportsGit: boolean;
    supportsTFVC: boolean;
}
export enum VersionControlRecursionType {
    /**
     * Only return the specified item.
     */
    None = 0,
    /**
     * Return the specified item and its direct children.
     */
    OneLevel = 1,
    /**
     * Return the specified item and its direct children, as well as recursive chains of nested child folders that only contain a single folder.
     */
    OneLevelPlusNestedEmptyFolders = 4,
    /**
     * Return specified item and all descendants
     */
    Full = 120,
}
export var TypeInfo: {
    AssociatedWorkItem: {
        fields: any;
    };
    Change: {
        fields: any;
    };
    ChangeCountDictionary: {
        fields: any;
    };
    ChangeList: {
        fields: any;
    };
    ChangeListSearchCriteria: {
        fields: any;
    };
    CheckinNote: {
        fields: any;
    };
    FileContentMetadata: {
        fields: any;
    };
    GitBaseVersionDescriptor: {
        fields: any;
    };
    GitBlobRef: {
        fields: any;
    };
    GitBranchStats: {
        fields: any;
    };
    GitChange: {
        fields: any;
    };
    GitCommit: {
        fields: any;
    };
    GitCommitChanges: {
        fields: any;
    };
    GitCommitDiffs: {
        fields: any;
    };
    GitCommitRef: {
        fields: any;
    };
    GitCommitToCreate: {
        fields: any;
    };
    GitHistoryQueryResults: {
        fields: any;
    };
    GitItem: {
        fields: any;
    };
    GitItemDescriptor: {
        fields: any;
    };
    GitItemRequestData: {
        fields: any;
    };
    GitMediaObjectRef: {
        fields: any;
    };
    GitObjectType: {
        enumValues: {
            "bad": number;
            "commit": number;
            "tree": number;
            "blob": number;
            "tag": number;
            "ext2": number;
            "ofsDelta": number;
            "refDelta": number;
        };
    };
    GitPathAction: {
        fields: any;
    };
    GitPathActions: {
        enumValues: {
            "none": number;
            "edit": number;
            "delete": number;
            "add": number;
            "rename": number;
        };
    };
    GitPullRequest: {
        fields: any;
    };
    GitPullRequestCompletionOptions: {
        fields: any;
    };
    GitPullRequestSearchCriteria: {
        fields: any;
    };
    GitPush: {
        fields: any;
    };
    GitPushEventData: {
        fields: any;
    };
    GitPushRef: {
        fields: any;
    };
    GitPushSearchCriteria: {
        fields: any;
    };
    GitQueryCommitsCriteria: {
        fields: any;
    };
    GitRef: {
        fields: any;
    };
    GitRefUpdate: {
        fields: any;
    };
    GitRefUpdateMode: {
        enumValues: {
            "bestEffort": number;
            "allOrNone": number;
        };
    };
    GitRefUpdateResult: {
        fields: any;
    };
    GitRefUpdateResultSet: {
        fields: any;
    };
    GitRefUpdateStatus: {
        enumValues: {
            "succeeded": number;
            "forcePushRequired": number;
            "staleOldObjectId": number;
            "invalidRefName": number;
            "unprocessed": number;
            "unresolvableToCommit": number;
            "writePermissionRequired": number;
            "manageNotePermissionRequired": number;
            "createBranchPermissionRequired": number;
            "createTagPermissionRequired": number;
            "rejectedByPlugin": number;
            "locked": number;
            "refNameConflict": number;
            "rejectedByPolicy": number;
            "succeededNonExistentRef": number;
            "succeededCorruptRef": number;
        };
    };
    GitRepository: {
        fields: any;
    };
    GitRepositoryPermissions: {
        enumValues: {
            "none": number;
            "administer": number;
            "genericRead": number;
            "genericContribute": number;
            "forcePush": number;
            "createBranch": number;
            "createTag": number;
            "manageNote": number;
            "policyExempt": number;
            "all": number;
            "branchLevelPermissions": number;
        };
    };
    GitStatus: {
        fields: any;
    };
    GitStatusContext: {
        fields: any;
    };
    GitStatusState: {
        enumValues: {
            "notSet": number;
            "pending": number;
            "succeeded": number;
            "failure": number;
            "error": number;
        };
    };
    GitSuggestion: {
        fields: any;
    };
    GitTargetVersionDescriptor: {
        fields: any;
    };
    GitTreeEntryRef: {
        fields: any;
    };
    GitTreeRef: {
        fields: any;
    };
    GitUserDate: {
        fields: any;
    };
    GitVersionDescriptor: {
        fields: any;
    };
    GitVersionOptions: {
        enumValues: {
            "none": number;
            "previousChange": number;
            "firstParent": number;
        };
    };
    GitVersionType: {
        enumValues: {
            "branch": number;
            "tag": number;
            "commit": number;
            "index": number;
        };
    };
    HistoryEntry: {
        fields: any;
    };
    HistoryQueryResults: {
        fields: any;
    };
    IdentityRefWithVote: {
        fields: any;
    };
    IncludedGitCommit: {
        fields: any;
    };
    ItemContent: {
        fields: any;
    };
    ItemContentType: {
        enumValues: {
            "rawText": number;
            "base64Encoded": number;
        };
    };
    ItemDetailsOptions: {
        fields: any;
    };
    ItemModel: {
        fields: any;
    };
    PullRequestAsyncStatus: {
        enumValues: {
            "notSet": number;
            "queued": number;
            "conflicts": number;
            "succeeded": number;
            "rejectedByPolicy": number;
            "failure": number;
        };
    };
    PullRequestStatus: {
        enumValues: {
            "notSet": number;
            "active": number;
            "abandoned": number;
            "completed": number;
            "all": number;
        };
    };
    TfvcBranch: {
        fields: any;
    };
    TfvcBranchMapping: {
        fields: any;
    };
    TfvcBranchRef: {
        fields: any;
    };
    TfvcChange: {
        fields: any;
    };
    TfvcChangeset: {
        fields: any;
    };
    TfvcChangesetRef: {
        fields: any;
    };
    TfvcChangesetSearchCriteria: {
        fields: any;
    };
    TfvcChangesetsRequestData: {
        fields: any;
    };
    TfvcCheckinEventData: {
        fields: any;
    };
    TfvcHistoryEntry: {
        fields: any;
    };
    TfvcItem: {
        fields: any;
    };
    TfvcItemDescriptor: {
        fields: any;
    };
    TfvcItemRequestData: {
        fields: any;
    };
    TfvcLabel: {
        fields: any;
    };
    TfvcLabelRef: {
        fields: any;
    };
    TfvcLabelRequestData: {
        fields: any;
    };
    TfvcMergeSource: {
        fields: any;
    };
    TfvcPolicyFailureInfo: {
        fields: any;
    };
    TfvcPolicyOverrideInfo: {
        fields: any;
    };
    TfvcShallowBranchRef: {
        fields: any;
    };
    TfvcShelveset: {
        fields: any;
    };
    TfvcShelvesetRef: {
        fields: any;
    };
    TfvcShelvesetRequestData: {
        fields: any;
    };
    TfvcVersionDescriptor: {
        fields: any;
    };
    TfvcVersionOption: {
        enumValues: {
            "none": number;
            "previous": number;
            "useRename": number;
        };
    };
    TfvcVersionType: {
        enumValues: {
            "none": number;
            "changeset": number;
            "shelveset": number;
            "change": number;
            "date": number;
            "latest": number;
            "tip": number;
            "mergeSource": number;
        };
    };
    UpdateRefsRequest: {
        fields: any;
    };
    VersionControlChangeType: {
        enumValues: {
            "none": number;
            "add": number;
            "edit": number;
            "encoding": number;
            "rename": number;
            "delete": number;
            "undelete": number;
            "branch": number;
            "merge": number;
            "lock": number;
            "rollback": number;
            "sourceRename": number;
            "targetRename": number;
            "property": number;
            "all": number;
        };
    };
    VersionControlProjectInfo: {
        fields: any;
    };
    VersionControlRecursionType: {
        enumValues: {
            "none": number;
            "oneLevel": number;
            "oneLevelPlusNestedEmptyFolders": number;
            "full": number;
        };
    };
};
}
declare module "TFS/VersionControl/Controls" {
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
export interface IHistoryList {
    /**
    *  Query the history by providing certain searchCriteria
    * @param itemPath itemPath for control to search history in Git and Tfvc
    * @param fromVersion fromId for control to search history in Git and Tfvc
    * @param toVersion toId for control to search history in Git and Tfvc
    * @param repositoryId Optional repository Id for control to search history in Git
    */
    createHistoryList(itemPath: string, fromVersion: string, toVersion: string, repositoryId?: string): any;
}
/**
* Control showing the history list control
*/
export module HistoryList {
    var contributionId: string;
    /**
    * Create an instance of the history list control
    *
    * @param $container Container element to create the history list control in
    * @param options History list control options
    * @param webContext Optional web context to scope the control to
    */
    function create($container: JQuery, options?: any, webContext?: Contracts_Platform.WebContext): IPromise<IHistoryList>;
}
}
declare module "TFS/VersionControl/GitRestClient" {
import Contracts = require("TFS/VersionControl/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class GitHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API] Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<Contracts.GitBlobRef>
     */
    getBlob(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<Contracts.GitBlobRef>;
    /**
     * [Preview API] Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getBlobContent(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Gets one or more blobs in a zip file download.
     *
     * @param {string[]} blobIds
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} filename
     * @return IPromise<ArrayBuffer>
     */
    getBlobsZip(blobIds: string[], repositoryId: string, project?: string, filename?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getBlobZip(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Retrieve statistics about a single branch.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} name - Name of the branch
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<Contracts.GitBranchStats>
     */
    getBranch(repositoryId: string, name: string, project?: string, baseVersionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitBranchStats>;
    /**
     * [Preview API] Retrieve statistics about all branches within a repository.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<Contracts.GitBranchStats[]>
     */
    getBranches(repositoryId: string, project?: string, baseVersionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitBranchStats[]>;
    /**
     * [Preview API] Retrieve changes for a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of changes to return.
     * @param {number} skip - The number of changes to skip.
     * @return IPromise<Contracts.GitCommitChanges>
     */
    getChanges(commitId: string, repositoryId: string, project?: string, top?: number, skip?: number): IPromise<Contracts.GitCommitChanges>;
    /**
     * [Preview API] Retrieve a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} changeCount - The number of changes to include in the result.
     * @return IPromise<Contracts.GitCommit>
     */
    getCommit(commitId: string, repositoryId: string, project?: string, changeCount?: number): IPromise<Contracts.GitCommit>;
    /**
     * [Preview API] Retrieve git commits for a project
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {Contracts.GitQueryCommitsCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getCommits(repositoryId: string, searchCriteria: Contracts.GitQueryCommitsCriteria, project?: string, skip?: number, top?: number): IPromise<Contracts.GitCommitRef[]>;
    /**
     * [Preview API] Retrieve a list of commits associated with a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of commits to return ("get the top x commits").
     * @param {number} skip - The number of commits to skip.
     * @param {boolean} includeLinks
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getPushCommits(repositoryId: string, pushId: number, project?: string, top?: number, skip?: number, includeLinks?: boolean): IPromise<Contracts.GitCommitRef[]>;
    /**
     * [Preview API] Retrieve git commits for a project
     *
     * @param {Contracts.GitQueryCommitsCriteria} searchCriteria - Search options
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getCommitsBatch(searchCriteria: Contracts.GitQueryCommitsCriteria, repositoryId: string, project?: string, skip?: number, top?: number): IPromise<Contracts.GitCommitRef[]>;
    /**
     * [Preview API] Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<Contracts.GitItem>
     */
    getItem(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitItem>;
    /**
     * [Preview API] Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemContent(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Get Item Metadata and/or Content for a collection of items. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {boolean} includeLinks
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<Contracts.GitItem[]>
     */
    getItems(repositoryId: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, includeLinks?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitItem[]>;
    /**
     * [Preview API] Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<string>
     */
    getItemText(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<string>;
    /**
     * [Preview API] Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemZip(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Post for retrieving a creating a batch out of a set of items in a repo / project given a list of paths or a long path
     *
     * @param {Contracts.GitItemRequestData} requestData
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitItem[][]>
     */
    getItemsBatch(requestData: Contracts.GitItemRequestData, repositoryId: string, project?: string): IPromise<Contracts.GitItem[][]>;
    /**
     * [Preview API] Retrieve pull request's commits
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getPullRequestCommits(repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.GitCommitRef[]>;
    /**
     * [Preview API] Adds a reviewer to a git pull request
     *
     * @param {Contracts.IdentityRefWithVote} reviewer
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote>
     */
    createPullRequestReviewer(reviewer: Contracts.IdentityRefWithVote, repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<Contracts.IdentityRefWithVote>;
    /**
     * [Preview API] Adds reviewers to a git pull request
     *
     * @param {VSS_Common_Contracts.IdentityRef[]} reviewers
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote[]>
     */
    createPullRequestReviewers(reviewers: VSS_Common_Contracts.IdentityRef[], repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.IdentityRefWithVote[]>;
    /**
     * [Preview API] Adds reviewers to a git pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deletePullRequestReviewer(repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<void>;
    /**
     * [Preview API] Retrieve a reviewer from a pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote>
     */
    getPullRequestReviewer(repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<Contracts.IdentityRefWithVote>;
    /**
     * [Preview API] Retrieve a pull request reviewers
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote[]>
     */
    getPullRequestReviewers(repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.IdentityRefWithVote[]>;
    /**
     * [Preview API] Query pull requests by project
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitPullRequestSearchCriteria} searchCriteria
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitPullRequest[]>
     */
    getPullRequestsByProject(project: string, searchCriteria: Contracts.GitPullRequestSearchCriteria, maxCommentLength?: number, skip?: number, top?: number): IPromise<Contracts.GitPullRequest[]>;
    /**
     * [Preview API] Create a git pull request
     *
     * @param {Contracts.GitPullRequest} gitPullRequestToCreate
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPullRequest>
     */
    createPullRequest(gitPullRequestToCreate: Contracts.GitPullRequest, repositoryId: string, project?: string): IPromise<Contracts.GitPullRequest>;
    /**
     * [Preview API] Retrieve a pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @param {boolean} includeCommits
     * @param {boolean} includeWorkItemRefs
     * @return IPromise<Contracts.GitPullRequest>
     */
    getPullRequest(repositoryId: string, pullRequestId: number, project?: string, maxCommentLength?: number, skip?: number, top?: number, includeCommits?: boolean, includeWorkItemRefs?: boolean): IPromise<Contracts.GitPullRequest>;
    /**
     * [Preview API] Query for pull requests
     *
     * @param {string} repositoryId
     * @param {Contracts.GitPullRequestSearchCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitPullRequest[]>
     */
    getPullRequests(repositoryId: string, searchCriteria: Contracts.GitPullRequestSearchCriteria, project?: string, maxCommentLength?: number, skip?: number, top?: number): IPromise<Contracts.GitPullRequest[]>;
    /**
     * [Preview API] Updates a pull request
     *
     * @param {Contracts.GitPullRequest} gitPullRequestToUpdate
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPullRequest>
     */
    updatePullRequest(gitPullRequestToUpdate: Contracts.GitPullRequest, repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.GitPullRequest>;
    /**
     * [Preview API] Retrieve a pull request work items
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} commitsTop
     * @param {number} commitsSkip
     * @return IPromise<Contracts.AssociatedWorkItem[]>
     */
    getPullRequestWorkItems(repositoryId: string, pullRequestId: number, project?: string, commitsTop?: number, commitsSkip?: number): IPromise<Contracts.AssociatedWorkItem[]>;
    /**
     * [Preview API] Push changes to the repository.
     *
     * @param {Contracts.GitPush} push
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, a project-scoped route must be used.
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPush>
     */
    createPush(push: Contracts.GitPush, repositoryId: string, project?: string): IPromise<Contracts.GitPush>;
    /**
     * [Preview API] Retrieve a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} includeCommits - The number of commits to include in the result.
     * @param {boolean} includeRefUpdates
     * @return IPromise<Contracts.GitPush>
     */
    getPush(repositoryId: string, pushId: number, project?: string, includeCommits?: number, includeRefUpdates?: boolean): IPromise<Contracts.GitPush>;
    /**
     * [Preview API] Retrieves pushes associated with the specified repository.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @param {Contracts.GitPushSearchCriteria} searchCriteria
     * @return IPromise<Contracts.GitPush[]>
     */
    getPushes(repositoryId: string, project?: string, skip?: number, top?: number, searchCriteria?: Contracts.GitPushSearchCriteria): IPromise<Contracts.GitPush[]>;
    /**
     * [Preview API] Queries the provided repository for its refs and returns them.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {string} filter - [optional] A filter to apply to the refs.
     * @param {boolean} includeLinks - [optional] Specifies if referenceLinks should be included in the result. default is false.
     * @param {boolean} includeStatuses - [optional] Includes the first 1000 statuses of the commits the refs are pointing at as well. default is false.
     * @return IPromise<Contracts.GitRef[]>
     */
    getRefs(repositoryId: string, project?: string, filter?: string, includeLinks?: boolean, includeStatuses?: boolean): IPromise<Contracts.GitRef[]>;
    /**
     * [Preview API] Creates or updates refs with the given information
     *
     * @param {Contracts.GitRefUpdate[]} refUpdates - List of ref updates to attempt to perform
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {string} projectId - The id of the project.
     * @return IPromise<Contracts.GitRefUpdateResult[]>
     */
    updateRefs(refUpdates: Contracts.GitRefUpdate[], repositoryId: string, project?: string, projectId?: string): IPromise<Contracts.GitRefUpdateResult[]>;
    /**
     * [Preview API] Create a git repository
     *
     * @param {Contracts.GitRepository} gitRepositoryToCreate
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    createRepository(gitRepositoryToCreate: Contracts.GitRepository, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * [Preview API] Delete a git repository
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteRepository(repositoryId: string, project?: string): IPromise<void>;
    /**
     * [Preview API] Retrieve git repositories.
     *
     * @param {string} project - Project ID or project name
     * @param {boolean} includeLinks
     * @return IPromise<Contracts.GitRepository[]>
     */
    getRepositories(project?: string, includeLinks?: boolean): IPromise<Contracts.GitRepository[]>;
    /**
     * [Preview API]
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    getRepository(repositoryId: string, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * [Preview API] Updates the Git repository with the single populated change in the specified repository information.
     *
     * @param {Contracts.GitRepository} newRepositoryInfo
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    updateRepository(newRepositoryInfo: Contracts.GitRepository, repositoryId: string, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * [Preview API]
     *
     * @param {Contracts.GitStatus} gitCommitStatusToCreate
     * @param {string} commitId
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitStatus>
     */
    createCommitStatus(gitCommitStatusToCreate: Contracts.GitStatus, commitId: string, repositoryId: string, project?: string): IPromise<Contracts.GitStatus>;
    /**
     * [Preview API]
     *
     * @param {string} commitId
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.GitStatus[]>
     */
    getStatuses(commitId: string, repositoryId: string, project?: string, top?: number, skip?: number): IPromise<Contracts.GitStatus[]>;
    /**
     * [Preview API] Retrieve a set of suggestions (including a pull request suggestion).
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitSuggestion[]>
     */
    getSuggestions(repositoryId: string, project?: string): IPromise<Contracts.GitSuggestion[]>;
    /**
     * [Preview API]
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<Contracts.GitTreeRef>
     */
    getTree(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<Contracts.GitTreeRef>;
    /**
     * [Preview API]
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getTreeZip(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<ArrayBuffer>;
}
export class GitHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<Contracts.GitBlobRef>
     */
    getBlob(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<Contracts.GitBlobRef>;
    /**
     * Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getBlobContent(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * Gets one or more blobs in a zip file download.
     *
     * @param {string[]} blobIds
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} filename
     * @return IPromise<ArrayBuffer>
     */
    getBlobsZip(blobIds: string[], repositoryId: string, project?: string, filename?: string): IPromise<ArrayBuffer>;
    /**
     * Gets a single blob.
     *
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {boolean} download
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getBlobZip(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * Retrieve statistics about a single branch.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} name - Name of the branch
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<Contracts.GitBranchStats>
     */
    getBranch(repositoryId: string, name: string, project?: string, baseVersionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitBranchStats>;
    /**
     * Retrieve statistics about all branches within a repository.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<Contracts.GitBranchStats[]>
     */
    getBranches(repositoryId: string, project?: string, baseVersionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitBranchStats[]>;
    /**
     * Retrieve changes for a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of changes to return.
     * @param {number} skip - The number of changes to skip.
     * @return IPromise<Contracts.GitCommitChanges>
     */
    getChanges(commitId: string, repositoryId: string, project?: string, top?: number, skip?: number): IPromise<Contracts.GitCommitChanges>;
    /**
     * Retrieve a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} changeCount - The number of changes to include in the result.
     * @return IPromise<Contracts.GitCommit>
     */
    getCommit(commitId: string, repositoryId: string, project?: string, changeCount?: number): IPromise<Contracts.GitCommit>;
    /**
     * Retrieve git commits for a project
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {Contracts.GitQueryCommitsCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getCommits(repositoryId: string, searchCriteria: Contracts.GitQueryCommitsCriteria, project?: string, skip?: number, top?: number): IPromise<Contracts.GitCommitRef[]>;
    /**
     * Retrieve a list of commits associated with a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of commits to return ("get the top x commits").
     * @param {number} skip - The number of commits to skip.
     * @param {boolean} includeLinks
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getPushCommits(repositoryId: string, pushId: number, project?: string, top?: number, skip?: number, includeLinks?: boolean): IPromise<Contracts.GitCommitRef[]>;
    /**
     * Retrieve git commits for a project
     *
     * @param {Contracts.GitQueryCommitsCriteria} searchCriteria - Search options
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getCommitsBatch(searchCriteria: Contracts.GitQueryCommitsCriteria, repositoryId: string, project?: string, skip?: number, top?: number): IPromise<Contracts.GitCommitRef[]>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<Contracts.GitItem>
     */
    getItem(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitItem>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemContent(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * Get Item Metadata and/or Content for a collection of items. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {boolean} includeLinks
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<Contracts.GitItem[]>
     */
    getItems(repositoryId: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, includeLinks?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<Contracts.GitItem[]>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<string>
     */
    getItemText(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<string>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemZip(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: Contracts.GitVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * Post for retrieving a creating a batch out of a set of items in a repo / project given a list of paths or a long path
     *
     * @param {Contracts.GitItemRequestData} requestData
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitItem[][]>
     */
    getItemsBatch(requestData: Contracts.GitItemRequestData, repositoryId: string, project?: string): IPromise<Contracts.GitItem[][]>;
    /**
     * @exemptedapi
     * [Preview API] Retrieve pull request's commits
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitCommitRef[]>
     */
    getPullRequestCommits(repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.GitCommitRef[]>;
    /**
     * Adds a reviewer to a git pull request
     *
     * @param {Contracts.IdentityRefWithVote} reviewer
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote>
     */
    createPullRequestReviewer(reviewer: Contracts.IdentityRefWithVote, repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<Contracts.IdentityRefWithVote>;
    /**
     * Adds reviewers to a git pull request
     *
     * @param {VSS_Common_Contracts.IdentityRef[]} reviewers
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote[]>
     */
    createPullRequestReviewers(reviewers: VSS_Common_Contracts.IdentityRef[], repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.IdentityRefWithVote[]>;
    /**
     * Adds reviewers to a git pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deletePullRequestReviewer(repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<void>;
    /**
     * Retrieve a reviewer from a pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote>
     */
    getPullRequestReviewer(repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<Contracts.IdentityRefWithVote>;
    /**
     * Retrieve a pull request reviewers
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.IdentityRefWithVote[]>
     */
    getPullRequestReviewers(repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.IdentityRefWithVote[]>;
    /**
     * Create a git pull request
     *
     * @param {Contracts.GitPullRequest} gitPullRequestToCreate
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPullRequest>
     */
    createPullRequest(gitPullRequestToCreate: Contracts.GitPullRequest, repositoryId: string, project?: string): IPromise<Contracts.GitPullRequest>;
    /**
     * Retrieve a pull request
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @param {boolean} includeCommits
     * @param {boolean} includeWorkItemRefs
     * @return IPromise<Contracts.GitPullRequest>
     */
    getPullRequest(repositoryId: string, pullRequestId: number, project?: string, maxCommentLength?: number, skip?: number, top?: number, includeCommits?: boolean, includeWorkItemRefs?: boolean): IPromise<Contracts.GitPullRequest>;
    /**
     * Query for pull requests
     *
     * @param {string} repositoryId
     * @param {Contracts.GitPullRequestSearchCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitPullRequest[]>
     */
    getPullRequests(repositoryId: string, searchCriteria: Contracts.GitPullRequestSearchCriteria, project?: string, maxCommentLength?: number, skip?: number, top?: number): IPromise<Contracts.GitPullRequest[]>;
    /**
     * Updates a pull request
     *
     * @param {Contracts.GitPullRequest} gitPullRequestToUpdate
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPullRequest>
     */
    updatePullRequest(gitPullRequestToUpdate: Contracts.GitPullRequest, repositoryId: string, pullRequestId: number, project?: string): IPromise<Contracts.GitPullRequest>;
    /**
     * @exemptedapi
     * [Preview API] Query pull requests by project
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.GitPullRequestSearchCriteria} searchCriteria
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.GitPullRequest[]>
     */
    getPullRequestsByProject(project: string, searchCriteria: Contracts.GitPullRequestSearchCriteria, maxCommentLength?: number, skip?: number, top?: number): IPromise<Contracts.GitPullRequest[]>;
    /**
     * @exemptedapi
     * [Preview API] Retrieve a pull request work items
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} commitsTop
     * @param {number} commitsSkip
     * @return IPromise<Contracts.AssociatedWorkItem[]>
     */
    getPullRequestWorkItems(repositoryId: string, pullRequestId: number, project?: string, commitsTop?: number, commitsSkip?: number): IPromise<Contracts.AssociatedWorkItem[]>;
    /**
     * Push changes to the repository.
     *
     * @param {Contracts.GitPush} push
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, a project-scoped route must be used.
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitPush>
     */
    createPush(push: Contracts.GitPush, repositoryId: string, project?: string): IPromise<Contracts.GitPush>;
    /**
     * Retrieve a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} includeCommits - The number of commits to include in the result.
     * @param {boolean} includeRefUpdates
     * @return IPromise<Contracts.GitPush>
     */
    getPush(repositoryId: string, pushId: number, project?: string, includeCommits?: number, includeRefUpdates?: boolean): IPromise<Contracts.GitPush>;
    /**
     * Retrieves pushes associated with the specified repository.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @param {Contracts.GitPushSearchCriteria} searchCriteria
     * @return IPromise<Contracts.GitPush[]>
     */
    getPushes(repositoryId: string, project?: string, skip?: number, top?: number, searchCriteria?: Contracts.GitPushSearchCriteria): IPromise<Contracts.GitPush[]>;
    /**
     * Queries the provided repository for its refs and returns them.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {string} filter - [optional] A filter to apply to the refs.
     * @param {boolean} includeLinks - [optional] Specifies if referenceLinks should be included in the result. default is false.
     * @param {boolean} includeStatuses - [optional] Includes the first 1000 statuses of the commits the refs are pointing at as well. default is false.
     * @return IPromise<Contracts.GitRef[]>
     */
    getRefs(repositoryId: string, project?: string, filter?: string, includeLinks?: boolean, includeStatuses?: boolean): IPromise<Contracts.GitRef[]>;
    /**
     * Creates or updates refs with the given information
     *
     * @param {Contracts.GitRefUpdate[]} refUpdates - List of ref updates to attempt to perform
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {string} projectId - The id of the project.
     * @return IPromise<Contracts.GitRefUpdateResult[]>
     */
    updateRefs(refUpdates: Contracts.GitRefUpdate[], repositoryId: string, project?: string, projectId?: string): IPromise<Contracts.GitRefUpdateResult[]>;
    /**
     * Create a git repository
     *
     * @param {Contracts.GitRepository} gitRepositoryToCreate
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    createRepository(gitRepositoryToCreate: Contracts.GitRepository, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * Delete a git repository
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    deleteRepository(repositoryId: string, project?: string): IPromise<void>;
    /**
     * Retrieve git repositories.
     *
     * @param {string} project - Project ID or project name
     * @param {boolean} includeLinks
     * @return IPromise<Contracts.GitRepository[]>
     */
    getRepositories(project?: string, includeLinks?: boolean): IPromise<Contracts.GitRepository[]>;
    /**
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    getRepository(repositoryId: string, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * Updates the Git repository with the single populated change in the specified repository information.
     *
     * @param {Contracts.GitRepository} newRepositoryInfo
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitRepository>
     */
    updateRepository(newRepositoryInfo: Contracts.GitRepository, repositoryId: string, project?: string): IPromise<Contracts.GitRepository>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.GitStatus} gitCommitStatusToCreate
     * @param {string} commitId
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitStatus>
     */
    createCommitStatus(gitCommitStatusToCreate: Contracts.GitStatus, commitId: string, repositoryId: string, project?: string): IPromise<Contracts.GitStatus>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} commitId
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.GitStatus[]>
     */
    getStatuses(commitId: string, repositoryId: string, project?: string, top?: number, skip?: number): IPromise<Contracts.GitStatus[]>;
    /**
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<Contracts.GitTreeRef>
     */
    getTree(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<Contracts.GitTreeRef>;
    /**
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getTreeZip(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<ArrayBuffer>;
}
export class GitHttpClient extends GitHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return GitHttpClient2_1
 */
export function getClient(): GitHttpClient2_1;
}
declare module "TFS/VersionControl/Services" {
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
/**
* Host service for common code actions
*/
export interface IVersionControlActionService {
    /** Launches create branch dialog
    * @param workItemIds The work item ids to link to the newly created branch
    */
    beginLaunchCreateBranchDialog(workItemIds: number[]): IPromise<void>;
    /** Features required for actions, the actions will not work as desired when users do not have license for the listed features. */
    requiredFeaturesForActions?: string[];
}
/**
* Host service for version control actions
*/
export module VersionControlActionService {
    var contributionId: string;
    var fullyQualifiedContributionId: string;
    /** Get an instance of the code action service
    * @param webContext Optional web context to scope the service to
    */
    function getService(webContext?: Contracts_Platform.WebContext): IPromise<IVersionControlActionService>;
}
}
declare module "TFS/VersionControl/TfvcRestClient" {
import TFS_VersionControl_Contracts = require("TFS/VersionControl/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class TfvcHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API] Get a single branch hierarchy at the given path with parents or children (if specified)
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {boolean} includeParent
     * @param {boolean} includeChildren
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranch>
     */
    getBranch(path: string, project?: string, includeParent?: boolean, includeChildren?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranch>;
    /**
     * [Preview API] Get a collection of branch roots -- first-level children, branches with no parents
     *
     * @param {string} project - Project ID or project name
     * @param {boolean} includeParent
     * @param {boolean} includeChildren
     * @param {boolean} includeDeleted
     * @param {boolean} includeLinks
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranch[]>
     */
    getBranches(project?: string, includeParent?: boolean, includeChildren?: boolean, includeDeleted?: boolean, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranch[]>;
    /**
     * [Preview API] Get branch hierarchies below the specified scopePath
     *
     * @param {string} scopePath
     * @param {string} project - Project ID or project name
     * @param {boolean} includeDeleted
     * @param {boolean} includeLinks
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranchRef[]>
     */
    getBranchRefs(scopePath: string, project?: string, includeDeleted?: boolean, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranchRef[]>;
    /**
     * [Preview API] Retrieve Tfvc changes for a given changeset
     *
     * @param {number} id
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChange[]>
     */
    getChangesetChanges(id?: number, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.TfvcChange[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_VersionControl_Contracts.TfvcChangeset} changeset
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef>
     */
    createChangeset(changeset: TFS_VersionControl_Contracts.TfvcChangeset, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef>;
    /**
     * [Preview API] Retrieve a Tfvc Changeset
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @param {number} maxChangeCount
     * @param {boolean} includeDetails
     * @param {boolean} includeWorkItems
     * @param {number} maxCommentLength
     * @param {boolean} includeSourceRename
     * @param {number} skip
     * @param {number} top
     * @param {string} orderby
     * @param {TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria} searchCriteria
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangeset>
     */
    getChangeset(id: number, project?: string, maxChangeCount?: number, includeDetails?: boolean, includeWorkItems?: boolean, maxCommentLength?: number, includeSourceRename?: boolean, skip?: number, top?: number, orderby?: string, searchCriteria?: TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria): IPromise<TFS_VersionControl_Contracts.TfvcChangeset>;
    /**
     * [Preview API] Retrieve Tfvc changesets
     *
     * @param {string} project - Project ID or project name
     * @param {number} maxChangeCount
     * @param {boolean} includeDetails
     * @param {boolean} includeWorkItems
     * @param {number} maxCommentLength
     * @param {boolean} includeSourceRename
     * @param {number} skip
     * @param {number} top
     * @param {string} orderby
     * @param {TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria} searchCriteria
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>
     */
    getChangesets(project?: string, maxChangeCount?: number, includeDetails?: boolean, includeWorkItems?: boolean, maxCommentLength?: number, includeSourceRename?: boolean, skip?: number, top?: number, orderby?: string, searchCriteria?: TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_VersionControl_Contracts.TfvcChangesetsRequestData} changesetsRequestData
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>
     */
    getBatchedChangesets(changesetsRequestData: TFS_VersionControl_Contracts.TfvcChangesetsRequestData): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>;
    /**
     * [Preview API]
     *
     * @param {number} id
     * @return IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>
     */
    getChangesetWorkItems(id?: number): IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>;
    /**
     * [Preview API] Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param {TFS_VersionControl_Contracts.TfvcItemRequestData} itemRequestData
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[][]>
     */
    getItemsBatch(itemRequestData: TFS_VersionControl_Contracts.TfvcItemRequestData, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcItem[][]>;
    /**
     * [Preview API] Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param {TFS_VersionControl_Contracts.TfvcItemRequestData} itemRequestData
     * @param {string} project - Project ID or project name
     * @return IPromise<ArrayBuffer>
     */
    getItemsBatchZip(itemRequestData: TFS_VersionControl_Contracts.TfvcItemRequestData, project?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem>
     */
    getItem(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<TFS_VersionControl_Contracts.TfvcItem>;
    /**
     * [Preview API] Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemContent(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Get a list of Tfvc items
     *
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeLinks
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[]>
     */
    getItems(project?: string, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, includeLinks?: boolean, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<TFS_VersionControl_Contracts.TfvcItem[]>;
    /**
     * [Preview API] Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<string>
     */
    getItemText(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<string>;
    /**
     * [Preview API] Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemZip(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Get items under a label.
     *
     * @param {string} labelId - Unique identifier of label
     * @param {number} top - Max number of items to return
     * @param {number} skip - Number of items to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[]>
     */
    getLabelItems(labelId: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcItem[]>;
    /**
     * [Preview API] Get a single deep label.
     *
     * @param {string} labelId - Unique identifier of label
     * @param {TFS_VersionControl_Contracts.TfvcLabelRequestData} requestData - maxItemCount
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcLabel>
     */
    getLabel(labelId: string, requestData: TFS_VersionControl_Contracts.TfvcLabelRequestData, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcLabel>;
    /**
     * [Preview API] Get a collection of shallow label references.
     *
     * @param {TFS_VersionControl_Contracts.TfvcLabelRequestData} requestData - labelScope, name, owner, and itemLabelFilter
     * @param {string} project - Project ID or project name
     * @param {number} top - Max number of labels to return
     * @param {number} skip - Number of labels to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>
     */
    getLabels(requestData: TFS_VersionControl_Contracts.TfvcLabelRequestData, project?: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>;
    /**
     * [Obsolete - Use the Projects API instead] Retrieve the version control information for a given Team Project
     *
     * @param {string} projectId - The id (or name) of the team project
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>
     */
    getProjectInfo(projectId: string, project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>;
    /**
     * [Obsolete - Use the Projects API instead]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>
     */
    getProjectInfos(project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>;
    /**
     * [Preview API] Get changes included in a shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @param {number} top - Max number of changes to return
     * @param {number} skip - Number of changes to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChange[]>
     */
    getShelvesetChanges(shelvesetId: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcChange[]>;
    /**
     * [Preview API] Get a single deep shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @param {TFS_VersionControl_Contracts.TfvcShelvesetRequestData} requestData - includeDetails, includeWorkItems, maxChangeCount, and maxCommentLength
     * @return IPromise<TFS_VersionControl_Contracts.TfvcShelveset>
     */
    getShelveset(shelvesetId: string, requestData: TFS_VersionControl_Contracts.TfvcShelvesetRequestData): IPromise<TFS_VersionControl_Contracts.TfvcShelveset>;
    /**
     * [Preview API] Return a collection of shallow shelveset references.
     *
     * @param {TFS_VersionControl_Contracts.TfvcShelvesetRequestData} requestData - name, owner, and maxCommentLength
     * @param {number} top - Max number of shelvesets to return
     * @param {number} skip - Number of shelvesets to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcShelvesetRef[]>
     */
    getShelvesets(requestData: TFS_VersionControl_Contracts.TfvcShelvesetRequestData, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcShelvesetRef[]>;
    /**
     * [Preview API] Get work items associated with a shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @return IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>
     */
    getShelvesetWorkItems(shelvesetId: string): IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>;
}
export class TfvcHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Get a single branch hierarchy at the given path with parents or children (if specified)
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {boolean} includeParent
     * @param {boolean} includeChildren
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranch>
     */
    getBranch(path: string, project?: string, includeParent?: boolean, includeChildren?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranch>;
    /**
     * Get a collection of branch roots -- first-level children, branches with no parents
     *
     * @param {string} project - Project ID or project name
     * @param {boolean} includeParent
     * @param {boolean} includeChildren
     * @param {boolean} includeDeleted
     * @param {boolean} includeLinks
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranch[]>
     */
    getBranches(project?: string, includeParent?: boolean, includeChildren?: boolean, includeDeleted?: boolean, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranch[]>;
    /**
     * Get branch hierarchies below the specified scopePath
     *
     * @param {string} scopePath
     * @param {string} project - Project ID or project name
     * @param {boolean} includeDeleted
     * @param {boolean} includeLinks
     * @return IPromise<TFS_VersionControl_Contracts.TfvcBranchRef[]>
     */
    getBranchRefs(scopePath: string, project?: string, includeDeleted?: boolean, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.TfvcBranchRef[]>;
    /**
     * Retrieve Tfvc changes for a given changeset
     *
     * @param {number} id
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChange[]>
     */
    getChangesetChanges(id?: number, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.TfvcChange[]>;
    /**
     * @param {TFS_VersionControl_Contracts.TfvcChangeset} changeset
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef>
     */
    createChangeset(changeset: TFS_VersionControl_Contracts.TfvcChangeset, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef>;
    /**
     * Retrieve a Tfvc Changeset
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @param {number} maxChangeCount
     * @param {boolean} includeDetails
     * @param {boolean} includeWorkItems
     * @param {number} maxCommentLength
     * @param {boolean} includeSourceRename
     * @param {number} skip
     * @param {number} top
     * @param {string} orderby
     * @param {TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria} searchCriteria
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangeset>
     */
    getChangeset(id: number, project?: string, maxChangeCount?: number, includeDetails?: boolean, includeWorkItems?: boolean, maxCommentLength?: number, includeSourceRename?: boolean, skip?: number, top?: number, orderby?: string, searchCriteria?: TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria): IPromise<TFS_VersionControl_Contracts.TfvcChangeset>;
    /**
     * Retrieve Tfvc changesets
     *
     * @param {string} project - Project ID or project name
     * @param {number} maxChangeCount
     * @param {boolean} includeDetails
     * @param {boolean} includeWorkItems
     * @param {number} maxCommentLength
     * @param {boolean} includeSourceRename
     * @param {number} skip
     * @param {number} top
     * @param {string} orderby
     * @param {TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria} searchCriteria
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>
     */
    getChangesets(project?: string, maxChangeCount?: number, includeDetails?: boolean, includeWorkItems?: boolean, maxCommentLength?: number, includeSourceRename?: boolean, skip?: number, top?: number, orderby?: string, searchCriteria?: TFS_VersionControl_Contracts.TfvcChangesetSearchCriteria): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>;
    /**
     * @param {TFS_VersionControl_Contracts.TfvcChangesetsRequestData} changesetsRequestData
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>
     */
    getBatchedChangesets(changesetsRequestData: TFS_VersionControl_Contracts.TfvcChangesetsRequestData): IPromise<TFS_VersionControl_Contracts.TfvcChangesetRef[]>;
    /**
     * @param {number} id
     * @return IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>
     */
    getChangesetWorkItems(id?: number): IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>;
    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param {TFS_VersionControl_Contracts.TfvcItemRequestData} itemRequestData
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[][]>
     */
    getItemsBatch(itemRequestData: TFS_VersionControl_Contracts.TfvcItemRequestData, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcItem[][]>;
    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param {TFS_VersionControl_Contracts.TfvcItemRequestData} itemRequestData
     * @param {string} project - Project ID or project name
     * @return IPromise<ArrayBuffer>
     */
    getItemsBatchZip(itemRequestData: TFS_VersionControl_Contracts.TfvcItemRequestData, project?: string): IPromise<ArrayBuffer>;
    /**
     * Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem>
     */
    getItem(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<TFS_VersionControl_Contracts.TfvcItem>;
    /**
     * Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemContent(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * Get a list of Tfvc items
     *
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeLinks
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[]>
     */
    getItems(project?: string, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, includeLinks?: boolean, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<TFS_VersionControl_Contracts.TfvcItem[]>;
    /**
     * Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<string>
     */
    getItemText(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<string>;
    /**
     * Get Item Metadata and/or Content. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} fileName
     * @param {boolean} download
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {TFS_VersionControl_Contracts.TfvcVersionDescriptor} versionDescriptor
     * @return IPromise<ArrayBuffer>
     */
    getItemZip(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, versionDescriptor?: TFS_VersionControl_Contracts.TfvcVersionDescriptor): IPromise<ArrayBuffer>;
    /**
     * Get items under a label.
     *
     * @param {string} labelId - Unique identifier of label
     * @param {number} top - Max number of items to return
     * @param {number} skip - Number of items to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcItem[]>
     */
    getLabelItems(labelId: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcItem[]>;
    /**
     * Get a single deep label.
     *
     * @param {string} labelId - Unique identifier of label
     * @param {TFS_VersionControl_Contracts.TfvcLabelRequestData} requestData - maxItemCount
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.TfvcLabel>
     */
    getLabel(labelId: string, requestData: TFS_VersionControl_Contracts.TfvcLabelRequestData, project?: string): IPromise<TFS_VersionControl_Contracts.TfvcLabel>;
    /**
     * Get a collection of shallow label references.
     *
     * @param {TFS_VersionControl_Contracts.TfvcLabelRequestData} requestData - labelScope, name, owner, and itemLabelFilter
     * @param {string} project - Project ID or project name
     * @param {number} top - Max number of labels to return
     * @param {number} skip - Number of labels to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>
     */
    getLabels(requestData: TFS_VersionControl_Contracts.TfvcLabelRequestData, project?: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>;
    /**
     * [Obsolete - Use the Projects API instead] Retrieve the version control information for a given Team Project
     *
     * @param {string} projectId - The id (or name) of the team project
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>
     */
    getProjectInfo(projectId: string, project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>;
    /**
     * [Obsolete - Use the Projects API instead]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>
     */
    getProjectInfos(project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>;
    /**
     * Get changes included in a shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @param {number} top - Max number of changes to return
     * @param {number} skip - Number of changes to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChange[]>
     */
    getShelvesetChanges(shelvesetId: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcChange[]>;
    /**
     * Get a single deep shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @param {TFS_VersionControl_Contracts.TfvcShelvesetRequestData} requestData - includeDetails, includeWorkItems, maxChangeCount, and maxCommentLength
     * @return IPromise<TFS_VersionControl_Contracts.TfvcShelveset>
     */
    getShelveset(shelvesetId: string, requestData: TFS_VersionControl_Contracts.TfvcShelvesetRequestData): IPromise<TFS_VersionControl_Contracts.TfvcShelveset>;
    /**
     * Return a collection of shallow shelveset references.
     *
     * @param {TFS_VersionControl_Contracts.TfvcShelvesetRequestData} requestData - name, owner, and maxCommentLength
     * @param {number} top - Max number of shelvesets to return
     * @param {number} skip - Number of shelvesets to skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcShelvesetRef[]>
     */
    getShelvesets(requestData: TFS_VersionControl_Contracts.TfvcShelvesetRequestData, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcShelvesetRef[]>;
    /**
     * Get work items associated with a shelveset.
     *
     * @param {string} shelvesetId - Shelveset's unique ID
     * @return IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>
     */
    getShelvesetWorkItems(shelvesetId: string): IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>;
}
export class TfvcHttpClient extends TfvcHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return TfvcHttpClient2_1
 */
export function getClient(): TfvcHttpClient2_1;
}
declare module "TFS/VersionControl/UIContracts" {
import VCContracts = require("TFS/VersionControl/Contracts");
export interface ISourceItem extends VCContracts.ItemModel {
    sourceProvider: string;
    item: VCContracts.GitItem | VCContracts.TfvcItem;
}
export interface SourceItemContext {
    item: ISourceItem;
    version: string;
    gitRepository?: VCContracts.GitRepository;
}
export interface GitBranchContext {
    repository: VCContracts.GitRepository;
    ref: VCContracts.GitRef;
    view: {
        refresh: () => void;
    };
}
export interface GitBranchDiffContext {
    gitBranchDiff: VCContracts.GitCommitDiffs;
    repository: VCContracts.GitRepository;
    view: {
        refresh: () => void;
    };
}
export interface ChangeListSourceItemContext {
    change: VCContracts.GitChange | VCContracts.TfvcChange;
    changeList: VCContracts.ChangeList<VCContracts.GitItem> | VCContracts.ChangeList<VCContracts.TfvcItem>;
}
}
declare module "TFS/WorkItemTracking/BatchRestClient" {
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
* Interface for the Json request message
*/
export interface JsonHttpRequest {
    /**
    * HTTP verb.
    */
    method: string;
    /**
    * Uri of the resource to be invoked.
    */
    uri: string;
    /**
    * Dictionary of the headers to passed along.
    */
    headers: IDictionaryStringTo<string>;
    /**
    * Request body.
    */
    body?: any;
}
/**
* Interface for the Json response message
*/
export interface JsonHttpResponse {
    /**
    * Response code.
    */
    code: number;
    /**
    * Dictionary of the headers to passed along.
    */
    headers?: IDictionaryStringTo<string>;
    /**
    * Request body.
    */
    body?: any;
}
/**
* Interface for the Json response message
*/
export interface JsonHttpBatchResponse {
    /**
    * The number of response objects batched together.
    */
    count: number;
    /**
    * Collection of the responses.
    */
    value: JsonHttpResponse[];
}
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpBatchClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {number[]} ids
     * @return IPromise<JsonHttpBatchResponse>
     */
    destroyWorkItemsBatch(ids: number[]): IPromise<JsonHttpBatchResponse>;
    /**
     * [Preview API]
     *
     * @param {number[]} ids
     * @return IPromise<JsonHttpBatchResponse>
     */
    restoreWorkItemsBatch(ids: number[]): IPromise<JsonHttpBatchResponse>;
    /**
     * [Preview API]
     *
     * @param {number[]} ids
     * @return IPromise<JsonHttpBatchResponse>
     */
    deleteWorkItemsBatch(ids: number[]): IPromise<JsonHttpBatchResponse>;
    private _createBatchRequest(ids, httpMethod, resource, body?);
    private _beginBatchRequest(requests);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return WorkItemTrackingHttpBatchClient
 */
export function getClient(): WorkItemTrackingHttpBatchClient;
}
declare module "TFS/WorkItemTracking/Contracts" {
export interface AttachmentReference {
    id: string;
    url: string;
}
export interface FieldDependentRule extends WorkItemTrackingResource {
    dependentFields: WorkItemFieldReference[];
}
export interface FieldsToEvaluate {
    fields: string[];
    fieldUpdates: {
        [key: string]: any;
    };
    fieldValues: {
        [key: string]: any;
    };
    rulesFrom: string[];
}
export enum FieldType {
    String = 0,
    Integer = 1,
    DateTime = 2,
    PlainText = 3,
    Html = 4,
    TreePath = 5,
    History = 6,
    Double = 7,
    Guid = 8,
    Boolean = 9,
}
export enum FieldUsage {
    None = 0,
    WorkItem = 1,
    WorkItemLink = 2,
    Tree = 3,
    WorkItemTypeExtension = 4,
}
export interface IdentityReference {
    id: string;
    name: string;
    url: string;
}
export interface Link {
    attributes: {
        [key: string]: any;
    };
    rel: string;
    title: string;
    url: string;
}
export enum LinkQueryMode {
    WorkItems = 0,
    LinksOneHopMustContain = 1,
    LinksOneHopMayContain = 2,
    LinksOneHopDoesNotContain = 3,
    LinksRecursiveMustContain = 4,
    LinksRecursiveMayContain = 5,
    LinksRecursiveDoesNotContain = 6,
}
export enum LogicalOperation {
    NONE = 0,
    AND = 1,
    OR = 2,
}
export interface ProjectReference {
    id: string;
    name: string;
    url: string;
}
export enum ProvisioningActionType {
    Import = 0,
    Validate = 1,
}
export interface ProvisioningResult {
    provisioningImportEvents: string[];
}
export enum QueryExpand {
    None = 0,
    Wiql = 1,
    Clauses = 2,
    All = 3,
}
export interface QueryHierarchyItem extends WorkItemTrackingResource {
    children: QueryHierarchyItem[];
    clauses: WorkItemQueryClause;
    columns: WorkItemFieldReference[];
    filterOptions: LinkQueryMode;
    hasChildren: boolean;
    id: string;
    isDeleted: boolean;
    isFolder: boolean;
    isInvalidSyntax: boolean;
    isPublic: boolean;
    linkClauses: WorkItemQueryClause;
    name: string;
    path: string;
    queryType: QueryType;
    sortColumns: WorkItemQuerySortColumn[];
    sourceClauses: WorkItemQueryClause;
    targetClauses: WorkItemQueryClause;
    wiql: string;
}
export enum QueryResultType {
    WorkItem = 1,
    WorkItemLink = 2,
}
export enum QueryType {
    Flat = 1,
    Tree = 2,
    OneHop = 3,
}
export interface ReportingWorkItemLink {
    changedDate: Date;
    isActive: boolean;
    rel: string;
    sourceId: number;
    targetId: number;
}
export interface ReportingWorkItemLinksBatch extends StreamedBatch<ReportingWorkItemLink> {
}
export interface ReportingWorkItemRevisionsBatch extends StreamedBatch<WorkItem> {
}
export interface ReportingWorkItemRevisionsFilter {
    /**
     * A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
     */
    fields: string[];
    /**
     * Return an identity reference instead of a string value for identity fields.
     */
    includeIdentityRef: boolean;
    /**
     * A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
     */
    types: string[];
}
export interface StreamedBatch<T> {
    isLastBatch: boolean;
    nextLink: string;
    nextWatermark: number;
    values: T[];
}
export enum TemplateType {
    WorkItemType = 0,
    GlobalWorkflow = 1,
}
export enum TreeNodeStructureType {
    Area = 0,
    Iteration = 1,
}
export enum TreeStructureGroup {
    Areas = 0,
    Iterations = 1,
}
export interface Wiql {
    query: string;
}
export interface WorkItem extends WorkItemTrackingResource {
    fields: {
        [key: string]: any;
    };
    id: number;
    relations: WorkItemRelation[];
    rev: number;
}
export interface WorkItemClassificationNode extends WorkItemTrackingResource {
    attributes: {
        [key: string]: any;
    };
    children: WorkItemClassificationNode[];
    id: number;
    identifier: string;
    name: string;
    structureType: TreeNodeStructureType;
}
export interface WorkItemDelete extends WorkItemDeleteReference {
    resource: WorkItem;
}
export interface WorkItemDeleteReference {
    code: number;
    deletedBy: string;
    deletedDate: string;
    id: number;
    message: string;
    name: string;
    project: string;
    type: string;
    url: string;
}
export interface WorkItemDeleteUpdate {
    isDeleted: boolean;
}
export enum WorkItemExpand {
    None = 0,
    Relations = 1,
    Fields = 2,
    All = 3,
}
export interface WorkItemField extends WorkItemTrackingResource {
    name: string;
    readOnly: boolean;
    referenceName: string;
    supportedOperations: WorkItemFieldOperation[];
    type: FieldType;
}
export interface WorkItemFieldOperation {
    name: string;
    referenceName: string;
}
export interface WorkItemFieldReference {
    name: string;
    referenceName: string;
    url: string;
}
export interface WorkItemFieldUpdate {
    newValue: any;
    oldValue: any;
}
export interface WorkItemHistory extends WorkItemTrackingResource {
    rev: number;
    revisedBy: IdentityReference;
    revisedDate: Date;
    value: string;
}
export interface WorkItemLink {
    rel: string;
    source: WorkItemReference;
    target: WorkItemReference;
}
export interface WorkItemQueryClause {
    clauses: WorkItemQueryClause[];
    field: WorkItemFieldReference;
    fieldValue: WorkItemFieldReference;
    isFieldValue: boolean;
    logicalOperator: LogicalOperation;
    operator: WorkItemFieldOperation;
    value: string;
}
export interface WorkItemQueryResult {
    asOf: Date;
    columns: WorkItemFieldReference[];
    queryResultType: QueryResultType;
    queryType: QueryType;
    sortColumns: WorkItemQuerySortColumn[];
    workItemRelations: WorkItemLink[];
    workItems: WorkItemReference[];
}
export interface WorkItemQuerySortColumn {
    descending: boolean;
    field: WorkItemFieldReference;
}
export interface WorkItemReference {
    id: number;
    url: string;
}
export interface WorkItemRelation extends Link {
}
export interface WorkItemRelationType extends WorkItemTrackingReference {
    attributes: {
        [key: string]: any;
    };
}
export interface WorkItemRelationUpdates {
    added: WorkItemRelation[];
    removed: WorkItemRelation[];
    updated: WorkItemRelation[];
}
export interface WorkItemRevisionReference extends WorkItemReference {
    rev: number;
}
export interface WorkItemTrackingReference extends WorkItemTrackingResource {
    name: string;
    referenceName: string;
}
export interface WorkItemTrackingResource extends WorkItemTrackingResourceReference {
    _links: any;
}
export interface WorkItemTrackingResourceReference {
    url: string;
}
export interface WorkItemType extends WorkItemTrackingResource {
    description: string;
    fields: WorkItemTypeFieldInstance[];
    name: string;
    xmlForm: string;
}
export interface WorkItemTypeCategory extends WorkItemTrackingResource {
    defaultWorkItemType: WorkItemTypeReference;
    name: string;
    referenceName: string;
    workItemTypes: WorkItemTypeReference[];
}
export interface WorkItemTypeFieldInstance {
    field: WorkItemFieldReference;
    helpText: string;
}
export interface WorkItemTypeReference extends WorkItemTrackingResourceReference {
    name: string;
}
export interface WorkItemTypeTemplate {
    template: string;
}
export interface WorkItemTypeTemplateUpdateModel {
    actionType: ProvisioningActionType;
    methodology: string;
    template: string;
    templateType: TemplateType;
}
export interface WorkItemUpdate extends WorkItemTrackingResourceReference {
    fields: {
        [key: string]: WorkItemFieldUpdate;
    };
    id: number;
    relations: WorkItemRelationUpdates;
    rev: number;
    revisedBy: IdentityReference;
    revisedDate: Date;
    workItemId: number;
}
export var TypeInfo: {
    AttachmentReference: {
        fields: any;
    };
    FieldDependentRule: {
        fields: any;
    };
    FieldsToEvaluate: {
        fields: any;
    };
    FieldType: {
        enumValues: {
            "string": number;
            "integer": number;
            "dateTime": number;
            "plainText": number;
            "html": number;
            "treePath": number;
            "history": number;
            "double": number;
            "guid": number;
            "boolean": number;
        };
    };
    FieldUsage: {
        enumValues: {
            "none": number;
            "workItem": number;
            "workItemLink": number;
            "tree": number;
            "workItemTypeExtension": number;
        };
    };
    IdentityReference: {
        fields: any;
    };
    Link: {
        fields: any;
    };
    LinkQueryMode: {
        enumValues: {
            "workItems": number;
            "linksOneHopMustContain": number;
            "linksOneHopMayContain": number;
            "linksOneHopDoesNotContain": number;
            "linksRecursiveMustContain": number;
            "linksRecursiveMayContain": number;
            "linksRecursiveDoesNotContain": number;
        };
    };
    LogicalOperation: {
        enumValues: {
            "nONE": number;
            "aND": number;
            "oR": number;
        };
    };
    ProjectReference: {
        fields: any;
    };
    ProvisioningActionType: {
        enumValues: {
            "import": number;
            "validate": number;
        };
    };
    ProvisioningResult: {
        fields: any;
    };
    QueryExpand: {
        enumValues: {
            "none": number;
            "wiql": number;
            "clauses": number;
            "all": number;
        };
    };
    QueryHierarchyItem: {
        fields: any;
    };
    QueryResultType: {
        enumValues: {
            "workItem": number;
            "workItemLink": number;
        };
    };
    QueryType: {
        enumValues: {
            "flat": number;
            "tree": number;
            "oneHop": number;
        };
    };
    ReportingWorkItemLink: {
        fields: any;
    };
    ReportingWorkItemLinksBatch: {
        fields: any;
    };
    ReportingWorkItemRevisionsBatch: {
        fields: any;
    };
    ReportingWorkItemRevisionsFilter: {
        fields: any;
    };
    StreamedBatch: {
        fields: any;
    };
    TemplateType: {
        enumValues: {
            "workItemType": number;
            "globalWorkflow": number;
        };
    };
    TreeNodeStructureType: {
        enumValues: {
            "area": number;
            "iteration": number;
        };
    };
    TreeStructureGroup: {
        enumValues: {
            "areas": number;
            "iterations": number;
        };
    };
    Wiql: {
        fields: any;
    };
    WorkItem: {
        fields: any;
    };
    WorkItemClassificationNode: {
        fields: any;
    };
    WorkItemDelete: {
        fields: any;
    };
    WorkItemDeleteReference: {
        fields: any;
    };
    WorkItemDeleteUpdate: {
        fields: any;
    };
    WorkItemExpand: {
        enumValues: {
            "none": number;
            "relations": number;
            "fields": number;
            "all": number;
        };
    };
    WorkItemField: {
        fields: any;
    };
    WorkItemFieldOperation: {
        fields: any;
    };
    WorkItemFieldReference: {
        fields: any;
    };
    WorkItemFieldUpdate: {
        fields: any;
    };
    WorkItemHistory: {
        fields: any;
    };
    WorkItemLink: {
        fields: any;
    };
    WorkItemQueryClause: {
        fields: any;
    };
    WorkItemQueryResult: {
        fields: any;
    };
    WorkItemQuerySortColumn: {
        fields: any;
    };
    WorkItemReference: {
        fields: any;
    };
    WorkItemRelation: {
        fields: any;
    };
    WorkItemRelationType: {
        fields: any;
    };
    WorkItemRelationUpdates: {
        fields: any;
    };
    WorkItemRevisionReference: {
        fields: any;
    };
    WorkItemTrackingReference: {
        fields: any;
    };
    WorkItemTrackingResource: {
        fields: any;
    };
    WorkItemTrackingResourceReference: {
        fields: any;
    };
    WorkItemType: {
        fields: any;
    };
    WorkItemTypeCategory: {
        fields: any;
    };
    WorkItemTypeFieldInstance: {
        fields: any;
    };
    WorkItemTypeReference: {
        fields: any;
    };
    WorkItemTypeTemplate: {
        fields: any;
    };
    WorkItemTypeTemplateUpdateModel: {
        fields: any;
    };
    WorkItemUpdate: {
        fields: any;
    };
};
}
declare module "TFS/WorkItemTracking/ExtensionContracts" {
/**
* Interface defining the arguments for notifications sent by the ActiveWorkItemService
*/
export interface IWorkItemChangedArgs {
    /**
    * Id of the work item.
    */
    id: number;
}
/**
* Interface defining the arguments for the 'onLoaded' notification sent by the ActiveWorkItemService
*/
export interface IWorkItemLoadedArgs extends IWorkItemChangedArgs {
    /**
    * 'true' if the work item is a 'new', unsaved work item, 'false' otherwise.
    */
    isNew: boolean;
}
/**
* Interface defining the arguments for the 'onFieldChanged' notification sent by the ActiveWorkItemService
*/
export interface IWorkItemFieldChangedArgs extends IWorkItemChangedArgs {
    /**
    * Set of fields that have been changed.  'key' is the field reference name.
    */
    changedFields: {
        [key: string]: any;
    };
}
/**
* Interface defining notifications provided by the ActiveWorkItemService
*/
export interface IWorkItemNotificationListener {
    /**
    * Called when an extension is loaded
    *
    * @param workItemLoadedArgs Information about the work item that was loaded.
    */
    onLoaded(workItemLoadedArgs: IWorkItemLoadedArgs): void;
    /**
    * Called when a field is modified
    *
    * @param fieldChangedArgs Information about the work item that was modified and the fields that were changed.
    */
    onFieldChanged(fieldChangedArgs: IWorkItemFieldChangedArgs): void;
    /**
    * Called when a work item is saved
    *
    * @param savedEventArgs Information about the work item that was saved.
    */
    onSaved(savedEventArgs: IWorkItemChangedArgs): void;
    /**
    * Called when a work item is refreshed
    *
    * @param refreshEventArgs Information about the work item that was refreshed.
    */
    onRefreshed(refreshEventArgs: IWorkItemChangedArgs): void;
    /**
    * Called when a work item is reset (undo back to unchanged state)
    *
    * @param undoEventArgs Information about the work item that was reset.
    */
    onReset(undoEventArgs: IWorkItemChangedArgs): void;
    /**
    * Called when a work item is unloaded
    *
    * @param unloadedEventArgs Information about the work item that was saved.
    */
    onUnloaded(unloadedEventArgs: IWorkItemChangedArgs): void;
}
}
declare module "TFS/WorkItemTracking/ProcessContracts" {
export interface FieldModel {
    description: string;
    id: string;
    name: string;
    type: string;
    url: string;
}
export var TypeInfo: {
    FieldModel: {
        fields: any;
    };
};
}
declare module "TFS/WorkItemTracking/ProcessDefinitionsContracts" {
/**
 * Represent a control in the form.
 */
export interface Control {
    /**
     * Type of the control.
     */
    controlType: string;
    /**
     * Id for the control
     */
    id: string;
    /**
     * Label for the field
     */
    label: string;
    /**
     * Inner text of the control.
     */
    metadata: string;
    /**
     * Order in which the control should appear in its group.
     */
    order: number;
    /**
     * A value indicating if the control is readonly.
     */
    readOnly: boolean;
    /**
     * A value indicating if the control should be hidden or not.
     */
    visible: boolean;
    /**
     * Watermark text for the textbox.
     */
    watermark: string;
}
export interface FieldModel {
    description: string;
    id: string;
    name: string;
    type: string;
    url: string;
}
export interface FieldRuleModel {
    rule: string;
    value: string;
}
export interface FieldUpdate {
    description: string;
    id: string;
}
/**
 * Represent a group in the form that holds controls in it.
 */
export interface Group {
    /**
     * Controls to be put in the group.
     */
    controls: Control[];
    /**
     * Id for the group
     */
    id: string;
    /**
     * Label for the group.
     */
    label: string;
    /**
     * Order in which the group should appear in the section.
     */
    order: number;
    /**
     * A value indicating if the group should be hidden or not.
     */
    visible: boolean;
}
export interface WorkItemTypeFieldModel {
    id: string;
    rules: FieldRuleModel[];
    url: string;
}
export interface WorkItemTypeModel {
    description: string;
    id: string;
    /**
     * Parent WIT Id/Internal ReferenceName that it inherits from
     */
    inherits: string;
    name: string;
    url: string;
}
export var TypeInfo: {
    Control: {
        fields: any;
    };
    FieldModel: {
        fields: any;
    };
    FieldRuleModel: {
        fields: any;
    };
    FieldUpdate: {
        fields: any;
    };
    Group: {
        fields: any;
    };
    WorkItemTypeFieldModel: {
        fields: any;
    };
    WorkItemTypeModel: {
        fields: any;
    };
};
}
declare module "TFS/WorkItemTracking/ProcessDefinitionsRestClient" {
import ProcessDefinitionsContracts = require("TFS/WorkItemTracking/ProcessDefinitionsContracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} groupId
     * @param {string} fieldRefName
     * @return IPromise<void>
     */
    removeFieldControlFromGroup(processId: string, witRefName: string, groupId: string, fieldRefName: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Control} control
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} groupId
     * @param {string} fieldRefName
     * @param {string} removeFromGroupId
     * @return IPromise<void>
     */
    setFieldControlInGroup(control: ProcessDefinitionsContracts.Control, processId: string, witRefName: string, groupId: string, fieldRefName: string, removeFromGroupId?: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.FieldModel} field
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.FieldModel>
     */
    createField(field: ProcessDefinitionsContracts.FieldModel, processId: string): IPromise<ProcessDefinitionsContracts.FieldModel>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} field
     * @return IPromise<void>
     */
    deleteField(processId: string, field: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.FieldUpdate} field
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.FieldModel>
     */
    updateField(field: ProcessDefinitionsContracts.FieldUpdate, processId: string): IPromise<ProcessDefinitionsContracts.FieldModel>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @return IPromise<void>
     */
    addGroup(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @return IPromise<void>
     */
    editGroup(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @return IPromise<void>
     */
    removeGroup(processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @param {string} removeFromSectionId
     * @return IPromise<void>
     */
    setGroupInSection(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromSectionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.WorkItemTypeFieldModel} field
     * @param {string} processId
     * @param {string} witRefName
     * @return IPromise<ProcessDefinitionsContracts.WorkItemTypeFieldModel>
     */
    addWorkItemTypeField(field: ProcessDefinitionsContracts.WorkItemTypeFieldModel, processId: string, witRefName: string): IPromise<ProcessDefinitionsContracts.WorkItemTypeFieldModel>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.WorkItemTypeModel} workitemType
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.WorkItemTypeModel>
     */
    createWorkItemType(workitemType: ProcessDefinitionsContracts.WorkItemTypeModel, processId: string): IPromise<ProcessDefinitionsContracts.WorkItemTypeModel>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} field
     * @return IPromise<void>
     */
    removeWorkItemTypeField(processId: string, witRefName: string, field: string): IPromise<void>;
}
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} groupId
     * @param {string} fieldRefName
     * @return IPromise<void>
     */
    removeFieldControlFromGroup(processId: string, witRefName: string, groupId: string, fieldRefName: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Control} control
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} groupId
     * @param {string} fieldRefName
     * @param {string} removeFromGroupId
     * @return IPromise<void>
     */
    setFieldControlInGroup(control: ProcessDefinitionsContracts.Control, processId: string, witRefName: string, groupId: string, fieldRefName: string, removeFromGroupId?: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.FieldModel} field
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.FieldModel>
     */
    createField(field: ProcessDefinitionsContracts.FieldModel, processId: string): IPromise<ProcessDefinitionsContracts.FieldModel>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} field
     * @return IPromise<void>
     */
    deleteField(processId: string, field: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.FieldUpdate} field
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.FieldModel>
     */
    updateField(field: ProcessDefinitionsContracts.FieldUpdate, processId: string): IPromise<ProcessDefinitionsContracts.FieldModel>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @return IPromise<void>
     */
    addGroup(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @return IPromise<void>
     */
    editGroup(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @return IPromise<void>
     */
    removeGroup(processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.Group} group
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} pageId
     * @param {string} sectionId
     * @param {string} groupId
     * @param {string} removeFromSectionId
     * @return IPromise<void>
     */
    setGroupInSection(group: ProcessDefinitionsContracts.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromSectionId: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.WorkItemTypeFieldModel} field
     * @param {string} processId
     * @param {string} witRefName
     * @return IPromise<ProcessDefinitionsContracts.WorkItemTypeFieldModel>
     */
    addWorkItemTypeField(field: ProcessDefinitionsContracts.WorkItemTypeFieldModel, processId: string, witRefName: string): IPromise<ProcessDefinitionsContracts.WorkItemTypeFieldModel>;
    /**
     * [Preview API]
     *
     * @param {ProcessDefinitionsContracts.WorkItemTypeModel} workitemType
     * @param {string} processId
     * @return IPromise<ProcessDefinitionsContracts.WorkItemTypeModel>
     */
    createWorkItemType(workitemType: ProcessDefinitionsContracts.WorkItemTypeModel, processId: string): IPromise<ProcessDefinitionsContracts.WorkItemTypeModel>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @param {string} field
     * @return IPromise<void>
     */
    removeWorkItemTypeField(processId: string, witRefName: string, field: string): IPromise<void>;
}
export class WorkItemTrackingHttpClient extends WorkItemTrackingHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return WorkItemTrackingHttpClient2_1
 */
export function getClient(): WorkItemTrackingHttpClient2_1;
}
declare module "TFS/WorkItemTracking/ProcessRestClient" {
import ProcessContracts = require("TFS/WorkItemTracking/ProcessContracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @return IPromise<ProcessContracts.FieldModel[]>
     */
    getFields(processId: string): IPromise<ProcessContracts.FieldModel[]>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @return IPromise<ProcessContracts.FieldModel[]>
     */
    getWorkItemTypeFields(processId: string, witRefName: string): IPromise<ProcessContracts.FieldModel[]>;
}
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @return IPromise<ProcessContracts.FieldModel[]>
     */
    getFields(processId: string): IPromise<ProcessContracts.FieldModel[]>;
    /**
     * [Preview API]
     *
     * @param {string} processId
     * @param {string} witRefName
     * @return IPromise<ProcessContracts.FieldModel[]>
     */
    getWorkItemTypeFields(processId: string, witRefName: string): IPromise<ProcessContracts.FieldModel[]>;
}
export class WorkItemTrackingHttpClient extends WorkItemTrackingHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return WorkItemTrackingHttpClient2_1
 */
export function getClient(): WorkItemTrackingHttpClient2_1;
}
declare module "TFS/WorkItemTracking/RestClient" {
import Contracts = require("TFS/WorkItemTracking/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class WorkItemTrackingHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API] Creates an attachment.
     *
     * @param {string} content - Content to upload
     * @param {string} fileName
     * @param {string} uploadType
     * @return IPromise<Contracts.AttachmentReference>
     */
    createAttachment(content: string, fileName?: string, uploadType?: string): IPromise<Contracts.AttachmentReference>;
    /**
     * [Preview API] Returns an attachment
     *
     * @param {string} id
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentContent(id: string, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API] Returns an attachment
     *
     * @param {string} id
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentZip(id: string, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number} depth
     * @return IPromise<Contracts.WorkItemClassificationNode[]>
     */
    getRootNodes(project: string, depth?: number): IPromise<Contracts.WorkItemClassificationNode[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    createOrUpdateClassificationNode(postedNode: Contracts.WorkItemClassificationNode, project: string, structureGroup: Contracts.TreeStructureGroup, path?: string): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} reclassifyId
     * @return IPromise<void>
     */
    deleteClassificationNode(project: string, structureGroup: Contracts.TreeStructureGroup, path?: string, reclassifyId?: number): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} depth
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    getClassificationNode(project: string, structureGroup: Contracts.TreeStructureGroup, path?: string, depth?: number): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * [Preview API]
     *
     * @param {Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    updateClassificationNode(postedNode: Contracts.WorkItemClassificationNode, project: string, structureGroup: Contracts.TreeStructureGroup, path?: string): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * [Preview API]
     *
     * @param {string} field
     * @return IPromise<Contracts.WorkItemField>
     */
    getField(field: string): IPromise<Contracts.WorkItemField>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.WorkItemField[]>
     */
    getFields(): IPromise<Contracts.WorkItemField[]>;
    /**
     * [Preview API] Returns history of all revision for a given work item ID
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WorkItemHistory[]>
     */
    getHistory(id: number, top?: number, skip?: number): IPromise<Contracts.WorkItemHistory[]>;
    /**
     * [Preview API] Returns the history value of particular revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @return IPromise<Contracts.WorkItemHistory>
     */
    getHistoryById(id: number, revisionNumber: number): IPromise<Contracts.WorkItemHistory>;
    /**
     * [Preview API] Creates a query, or moves a query.
     *
     * @param {Contracts.QueryHierarchyItem} postedQuery - The query to create.
     * @param {string} project - Project ID or project name
     * @param {string} query - The parent path for the query to create.
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    createQuery(postedQuery: Contracts.QueryHierarchyItem, project: string, query: string): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @return IPromise<void>
     */
    deleteQuery(project: string, query: string): IPromise<void>;
    /**
     * [Preview API] Retrieves all queries the user has access to in the current project
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<Contracts.QueryHierarchyItem[]>
     */
    getQueries(project: string, expand?: Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<Contracts.QueryHierarchyItem[]>;
    /**
     * [Preview API] Retrieves a single query by project and either id or path
     *
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    getQuery(project: string, query: string, expand?: Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * [Preview API]
     *
     * @param {Contracts.QueryHierarchyItem} queryUpdate
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {boolean} undeleteDescendants
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    updateQuery(queryUpdate: Contracts.QueryHierarchyItem, project: string, query: string, undeleteDescendants?: boolean): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * [Preview API]
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    destroyWorkItem(id: number, project?: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemDelete>
     */
    getDeletedWorkItem(id: number, project?: string): IPromise<Contracts.WorkItemDelete>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number[]} ids
     * @return IPromise<Contracts.WorkItemDeleteReference[]>
     */
    getDeletedWorkItems(project?: string, ids?: number[]): IPromise<Contracts.WorkItemDeleteReference[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.WorkItemDeleteUpdate} payload
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemDelete>
     */
    restoreWorkItem(payload: Contracts.WorkItemDeleteUpdate, id: number, project?: string): IPromise<Contracts.WorkItemDelete>;
    /**
     * [Preview API] Returns a fully hydrated work item for the requested revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getRevision(id: number, revisionNumber: number, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * [Preview API] Returns the list of fully hydrated work item revisions, paged.
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem[]>
     */
    getRevisions(id: number, top?: number, skip?: number, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem[]>;
    /**
     * [Preview API] Validates the fields values.
     *
     * @param {Contracts.FieldsToEvaluate} ruleEngineInput
     * @return IPromise<void>
     */
    evaluateRulesOnField(ruleEngineInput: Contracts.FieldsToEvaluate): IPromise<void>;
    /**
     * [Preview API] Returns a single update for a work item
     *
     * @param {number} id
     * @param {number} updateNumber
     * @return IPromise<Contracts.WorkItemUpdate>
     */
    getUpdate(id: number, updateNumber: number): IPromise<Contracts.WorkItemUpdate>;
    /**
     * [Preview API] Returns a the deltas between work item revisions
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WorkItemUpdate[]>
     */
    getUpdates(id: number, top?: number, skip?: number): IPromise<Contracts.WorkItemUpdate[]>;
    /**
     * [Preview API] Gets the results of the query.
     *
     * @param {Contracts.Wiql} wiql - The query containing the wiql.
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryByWiql(wiql: Contracts.Wiql, project?: string, team?: string): IPromise<Contracts.WorkItemQueryResult>;
    /**
     * [Preview API] Gets the results of the query by id.
     *
     * @param {string} id - The query id.
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryById(id: string, project?: string, team?: string): IPromise<Contracts.WorkItemQueryResult>;
    /**
     * [Preview API] Get a batch of work item links
     *
     * @param {string} project - Project ID or project name
     * @param {string[]} types - A list of types to filter the results to specific work item types. Omit this parameter to get work item links of all work item types.
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of links.
     * @param {Date} startDateTime - Date/time to use as a starting point for link changes. Only link changes that occurred after that date/time will be returned. Cannot be used in conjunction with 'watermark' parameter.
     * @return IPromise<Contracts.ReportingWorkItemLinksBatch>
     */
    getReportingLinks(project?: string, types?: string[], watermark?: number, startDateTime?: Date): IPromise<Contracts.ReportingWorkItemLinksBatch>;
    /**
     * [Preview API] Gets the work item relation types.
     *
     * @param {string} relation
     * @return IPromise<Contracts.WorkItemRelationType>
     */
    getRelationType(relation: string): IPromise<Contracts.WorkItemRelationType>;
    /**
     * [Preview API]
     *
     * @return IPromise<Contracts.WorkItemRelationType[]>
     */
    getRelationTypes(): IPromise<Contracts.WorkItemRelationType[]>;
    /**
     * [Preview API] Get a batch of work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string[]} fields - A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
     * @param {string[]} types - A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param {Date} startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param {boolean} includeIdentityRef - Return an identity reference instead of a string value for identity fields.
     * @param {boolean} includeDeleted - Specify if the deleted item should be returned.
     * @return IPromise<Contracts.ReportingWorkItemRevisionsBatch>
     */
    readReportingRevisionsGet(project?: string, fields?: string[], types?: string[], watermark?: number, startDateTime?: Date, includeIdentityRef?: boolean, includeDeleted?: boolean): IPromise<Contracts.ReportingWorkItemRevisionsBatch>;
    /**
     * [Preview API] Get a batch of work item revisions
     *
     * @param {Contracts.ReportingWorkItemRevisionsFilter} filter - An object that contains request settings: field filter, type filter, identity format
     * @param {string} project - Project ID or project name
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param {Date} startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @return IPromise<Contracts.ReportingWorkItemRevisionsBatch>
     */
    readReportingRevisionsPost(filter: Contracts.ReportingWorkItemRevisionsFilter, project?: string, watermark?: number, startDateTime?: Date): IPromise<Contracts.ReportingWorkItemRevisionsBatch>;
    /**
     * [Preview API]
     *
     * @param {number} id
     * @param {boolean} destroy
     * @return IPromise<Contracts.WorkItemDelete>
     */
    deleteWorkItem(id: number, destroy?: boolean): IPromise<Contracts.WorkItemDelete>;
    /**
     * [Preview API] Returns a single work item
     *
     * @param {number} id
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getWorkItem(id: number, fields?: string[], asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * [Preview API] Returns a list of work items
     *
     * @param {number[]} ids
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem[]>
     */
    getWorkItems(ids: number[], fields?: string[], asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem[]>;
    /**
     * [Preview API]
     *
     * @param {VSS_Common_Contracts.JsonPatchDocument} document
     * @param {number} id
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<Contracts.WorkItem>
     */
    updateWorkItem(document: VSS_Common_Contracts.JsonPatchDocument, id: number, validateOnly?: boolean, bypassRules?: boolean): IPromise<Contracts.WorkItem>;
    /**
     * [Preview API]
     *
     * @param {VSS_Common_Contracts.JsonPatchDocument} document
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<Contracts.WorkItem>
     */
    createWorkItem(document: VSS_Common_Contracts.JsonPatchDocument, project: string, type: string, validateOnly?: boolean, bypassRules?: boolean): IPromise<Contracts.WorkItem>;
    /**
     * [Preview API] Returns a single work item from a template
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getWorkItemTemplate(project: string, type: string, fields?: string, asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemTypeCategory[]>
     */
    getWorkItemTypeCategories(project: string): IPromise<Contracts.WorkItemTypeCategory[]>;
    /**
     * [Preview API] Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} category
     * @return IPromise<Contracts.WorkItemTypeCategory>
     */
    getWorkItemTypeCategory(project: string, category: string): IPromise<Contracts.WorkItemTypeCategory>;
    /**
     * [Preview API] Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @return IPromise<Contracts.WorkItemType>
     */
    getWorkItemType(project: string, type: string): IPromise<Contracts.WorkItemType>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemType[]>
     */
    getWorkItemTypes(project: string): IPromise<Contracts.WorkItemType[]>;
    /**
     * [Preview API] Returns the dependent fields for the corresponding workitem type and fieldname
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} field
     * @return IPromise<Contracts.FieldDependentRule>
     */
    getDependentFields(project: string, type: string, field: string): IPromise<Contracts.FieldDependentRule>;
    /**
     * [Preview API] Export work item type
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} exportGlobalLists
     * @return IPromise<Contracts.WorkItemTypeTemplate>
     */
    exportWorkItemTypeDefinition(project?: string, type?: string, exportGlobalLists?: boolean): IPromise<Contracts.WorkItemTypeTemplate>;
    /**
     * [Preview API] Add/updates a work item type
     *
     * @param {Contracts.WorkItemTypeTemplateUpdateModel} updateModel
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ProvisioningResult>
     */
    updateWorkItemTypeDefinition(updateModel: Contracts.WorkItemTypeTemplateUpdateModel, project?: string): IPromise<Contracts.ProvisioningResult>;
}
export class WorkItemTrackingHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Creates an attachment.
     *
     * @param {string} content - Content to upload
     * @param {string} fileName
     * @param {string} uploadType
     * @return IPromise<Contracts.AttachmentReference>
     */
    createAttachment(content: string, fileName?: string, uploadType?: string): IPromise<Contracts.AttachmentReference>;
    /**
     * Returns an attachment
     *
     * @param {string} id
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentContent(id: string, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * Returns an attachment
     *
     * @param {string} id
     * @param {string} fileName
     * @return IPromise<ArrayBuffer>
     */
    getAttachmentZip(id: string, fileName?: string): IPromise<ArrayBuffer>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} depth
     * @return IPromise<Contracts.WorkItemClassificationNode[]>
     */
    getRootNodes(project: string, depth?: number): IPromise<Contracts.WorkItemClassificationNode[]>;
    /**
     * @param {Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    createOrUpdateClassificationNode(postedNode: Contracts.WorkItemClassificationNode, project: string, structureGroup: Contracts.TreeStructureGroup, path?: string): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} reclassifyId
     * @return IPromise<void>
     */
    deleteClassificationNode(project: string, structureGroup: Contracts.TreeStructureGroup, path?: string, reclassifyId?: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} depth
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    getClassificationNode(project: string, structureGroup: Contracts.TreeStructureGroup, path?: string, depth?: number): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * @param {Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<Contracts.WorkItemClassificationNode>
     */
    updateClassificationNode(postedNode: Contracts.WorkItemClassificationNode, project: string, structureGroup: Contracts.TreeStructureGroup, path?: string): IPromise<Contracts.WorkItemClassificationNode>;
    /**
     * @param {string} field
     * @return IPromise<Contracts.WorkItemField>
     */
    getField(field: string): IPromise<Contracts.WorkItemField>;
    /**
     * @return IPromise<Contracts.WorkItemField[]>
     */
    getFields(): IPromise<Contracts.WorkItemField[]>;
    /**
     * Returns history of all revision for a given work item ID
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WorkItemHistory[]>
     */
    getHistory(id: number, top?: number, skip?: number): IPromise<Contracts.WorkItemHistory[]>;
    /**
     * Returns the history value of particular revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @return IPromise<Contracts.WorkItemHistory>
     */
    getHistoryById(id: number, revisionNumber: number): IPromise<Contracts.WorkItemHistory>;
    /**
     * Creates a query, or moves a query.
     *
     * @param {Contracts.QueryHierarchyItem} postedQuery - The query to create.
     * @param {string} project - Project ID or project name
     * @param {string} query - The parent path for the query to create.
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    createQuery(postedQuery: Contracts.QueryHierarchyItem, project: string, query: string): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @return IPromise<void>
     */
    deleteQuery(project: string, query: string): IPromise<void>;
    /**
     * Retrieves all queries the user has access to in the current project
     *
     * @param {string} project - Project ID or project name
     * @param {Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<Contracts.QueryHierarchyItem[]>
     */
    getQueries(project: string, expand?: Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<Contracts.QueryHierarchyItem[]>;
    /**
     * Retrieves a single query by project and either id or path
     *
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    getQuery(project: string, query: string, expand?: Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * @param {Contracts.QueryHierarchyItem} queryUpdate
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {boolean} undeleteDescendants
     * @return IPromise<Contracts.QueryHierarchyItem>
     */
    updateQuery(queryUpdate: Contracts.QueryHierarchyItem, project: string, query: string, undeleteDescendants?: boolean): IPromise<Contracts.QueryHierarchyItem>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    destroyWorkItem(id: number, project?: string): IPromise<void>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemDelete>
     */
    getDeletedWorkItem(id: number, project?: string): IPromise<Contracts.WorkItemDelete>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @param {number[]} ids
     * @return IPromise<Contracts.WorkItemDeleteReference[]>
     */
    getDeletedWorkItems(project?: string, ids?: number[]): IPromise<Contracts.WorkItemDeleteReference[]>;
    /**
     * @exemptedapi
     * [Preview API]
     *
     * @param {Contracts.WorkItemDeleteUpdate} payload
     * @param {number} id
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemDelete>
     */
    restoreWorkItem(payload: Contracts.WorkItemDeleteUpdate, id: number, project?: string): IPromise<Contracts.WorkItemDelete>;
    /**
     * Returns a fully hydrated work item for the requested revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getRevision(id: number, revisionNumber: number, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * Returns the list of fully hydrated work item revisions, paged.
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem[]>
     */
    getRevisions(id: number, top?: number, skip?: number, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem[]>;
    /**
     * Validates the fields values.
     *
     * @param {Contracts.FieldsToEvaluate} ruleEngineInput
     * @return IPromise<void>
     */
    evaluateRulesOnField(ruleEngineInput: Contracts.FieldsToEvaluate): IPromise<void>;
    /**
     * Returns a single update for a work item
     *
     * @param {number} id
     * @param {number} updateNumber
     * @return IPromise<Contracts.WorkItemUpdate>
     */
    getUpdate(id: number, updateNumber: number): IPromise<Contracts.WorkItemUpdate>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<Contracts.WorkItemUpdate[]>
     */
    getUpdates(id: number, top?: number, skip?: number): IPromise<Contracts.WorkItemUpdate[]>;
    /**
     * Gets the results of the query.
     *
     * @param {Contracts.Wiql} wiql - The query containing the wiql.
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryByWiql(wiql: Contracts.Wiql, project?: string, team?: string): IPromise<Contracts.WorkItemQueryResult>;
    /**
     * Gets the results of the query by id.
     *
     * @param {string} id - The query id.
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryById(id: string, project?: string, team?: string): IPromise<Contracts.WorkItemQueryResult>;
    /**
     * Get a batch of work item links
     *
     * @param {string} project - Project ID or project name
     * @param {string[]} types - A list of types to filter the results to specific work item types. Omit this parameter to get work item links of all work item types.
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of links.
     * @param {Date} startDateTime - Date/time to use as a starting point for link changes. Only link changes that occurred after that date/time will be returned. Cannot be used in conjunction with 'watermark' parameter.
     * @return IPromise<Contracts.ReportingWorkItemLinksBatch>
     */
    getReportingLinks(project?: string, types?: string[], watermark?: number, startDateTime?: Date): IPromise<Contracts.ReportingWorkItemLinksBatch>;
    /**
     * Gets the work item relation types.
     *
     * @param {string} relation
     * @return IPromise<Contracts.WorkItemRelationType>
     */
    getRelationType(relation: string): IPromise<Contracts.WorkItemRelationType>;
    /**
     * @return IPromise<Contracts.WorkItemRelationType[]>
     */
    getRelationTypes(): IPromise<Contracts.WorkItemRelationType[]>;
    /**
     * Get a batch of work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string[]} fields - A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
     * @param {string[]} types - A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param {Date} startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param {boolean} includeIdentityRef - Return an identity reference instead of a string value for identity fields.
     * @param {boolean} includeDeleted - Specify if the deleted item should be returned.
     * @return IPromise<Contracts.ReportingWorkItemRevisionsBatch>
     */
    readReportingRevisionsGet(project?: string, fields?: string[], types?: string[], watermark?: number, startDateTime?: Date, includeIdentityRef?: boolean, includeDeleted?: boolean): IPromise<Contracts.ReportingWorkItemRevisionsBatch>;
    /**
     * Get a batch of work item revisions
     *
     * @param {Contracts.ReportingWorkItemRevisionsFilter} filter - An object that contains request settings: field filter, type filter, identity format
     * @param {string} project - Project ID or project name
     * @param {number} watermark - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param {Date} startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @return IPromise<Contracts.ReportingWorkItemRevisionsBatch>
     */
    readReportingRevisionsPost(filter: Contracts.ReportingWorkItemRevisionsFilter, project?: string, watermark?: number, startDateTime?: Date): IPromise<Contracts.ReportingWorkItemRevisionsBatch>;
    /**
     * @param {number} id
     * @param {boolean} destroy
     * @return IPromise<Contracts.WorkItemDelete>
     */
    deleteWorkItem(id: number, destroy?: boolean): IPromise<Contracts.WorkItemDelete>;
    /**
     * Returns a single work item
     *
     * @param {number} id
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getWorkItem(id: number, fields?: string[], asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * Returns a list of work items
     *
     * @param {number[]} ids
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem[]>
     */
    getWorkItems(ids: number[], fields?: string[], asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem[]>;
    /**
     * @param {VSS_Common_Contracts.JsonPatchDocument} document
     * @param {number} id
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<Contracts.WorkItem>
     */
    updateWorkItem(document: VSS_Common_Contracts.JsonPatchDocument, id: number, validateOnly?: boolean, bypassRules?: boolean): IPromise<Contracts.WorkItem>;
    /**
     * @param {VSS_Common_Contracts.JsonPatchDocument} document
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<Contracts.WorkItem>
     */
    createWorkItem(document: VSS_Common_Contracts.JsonPatchDocument, project: string, type: string, validateOnly?: boolean, bypassRules?: boolean): IPromise<Contracts.WorkItem>;
    /**
     * Returns a single work item from a template
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} fields
     * @param {Date} asOf
     * @param {Contracts.WorkItemExpand} expand
     * @return IPromise<Contracts.WorkItem>
     */
    getWorkItemTemplate(project: string, type: string, fields?: string, asOf?: Date, expand?: Contracts.WorkItemExpand): IPromise<Contracts.WorkItem>;
    /**
     * @param {VSS_Common_Contracts.JsonPatchDocument} document
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<Contracts.WorkItem>
     */
    updateWorkItemTemplate(document: VSS_Common_Contracts.JsonPatchDocument, project: string, type: string, validateOnly?: boolean, bypassRules?: boolean): IPromise<Contracts.WorkItem>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemTypeCategory[]>
     */
    getWorkItemTypeCategories(project: string): IPromise<Contracts.WorkItemTypeCategory[]>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} category
     * @return IPromise<Contracts.WorkItemTypeCategory>
     */
    getWorkItemTypeCategory(project: string, category: string): IPromise<Contracts.WorkItemTypeCategory>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @return IPromise<Contracts.WorkItemType>
     */
    getWorkItemType(project: string, type: string): IPromise<Contracts.WorkItemType>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemType[]>
     */
    getWorkItemTypes(project: string): IPromise<Contracts.WorkItemType[]>;
    /**
     * Returns the dependent fields for the corresponding workitem type and fieldname
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} field
     * @return IPromise<Contracts.FieldDependentRule>
     */
    getDependentFields(project: string, type: string, field: string): IPromise<Contracts.FieldDependentRule>;
    /**
     * Export work item type
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} exportGlobalLists
     * @return IPromise<Contracts.WorkItemTypeTemplate>
     */
    exportWorkItemTypeDefinition(project?: string, type?: string, exportGlobalLists?: boolean): IPromise<Contracts.WorkItemTypeTemplate>;
    /**
     * Add/updates a work item type
     *
     * @param {Contracts.WorkItemTypeTemplateUpdateModel} updateModel
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.ProvisioningResult>
     */
    updateWorkItemTypeDefinition(updateModel: Contracts.WorkItemTypeTemplateUpdateModel, project?: string): IPromise<Contracts.ProvisioningResult>;
}
export class WorkItemTrackingHttpClient extends WorkItemTrackingHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return WorkItemTrackingHttpClient2_1
 */
export function getClient(): WorkItemTrackingHttpClient2_1;
}
declare module "TFS/WorkItemTracking/Services" {
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
import WitContracts = require("TFS/WorkItemTracking/Contracts");
/**
* Host service for opening the work item form
*/
export interface IWorkItemFormNavigationService {
    /**
    * Open the specified work item. The host page will display the work item in a dialog,
    * or it may update the current page view, depending on the current page.
    *
    * @param workItemId The id of the work item to open
    * @param openInNewTab If true, open the work item in a new tab
    */
    openWorkItem(workItemId: number, openInNewTab?: boolean): any;
    /**
    * Open a new work item of the specified type. The host page will display the new work item in a dialog,
    * or it may update the current page view, depending on the current page.
    *
    * @param workItemTypeName The name of the work item type to open
    * @param initialValues (Optional) A dictionary of any initial field values to set after opening the new work item.
    */
    openNewWorkItem(workItemTypeName: string, initialValues?: {
        [fieldName: string]: any;
    }): any;
}
/**
* Host service for opening the work item form
*/
export module WorkItemFormNavigationService {
    var contributionId: string;
    /**
    * Get an instance of the host work item service
    *
    * @param webContext Optional web context to scope the service to
    */
    function getService(webContext?: Contracts_Platform.WebContext): IPromise<IWorkItemFormNavigationService>;
}
/**
* Host service for interacting with the currently active work item form (work item currently displayed in the UI).
*/
export interface IWorkItemFormService {
    /**
    * Gets id of active work item.
    */
    getId(): number;
    /**
    * Gets active work item's latest revision.
    */
    getRevision(): number;
    /**
    * Gets active work item fields. Returns an array of work item field.
    */
    getFields(): WitContracts.WorkItemField[];
    /**
    * Gets field value of active work item. Returns field value.
    *
    * @param fieldReferenceName Field reference name
    * @param returnOriginalValue Optional setting to whether getting the unsaved values or not. Default is false.
    */
    getFieldValue(fieldReferenceName: string, returnOriginalValue?: boolean): Object;
    /**
    * Gets field values of active work item. Returns a dictionary of field refName/values.
    *
    * @param fieldReferenceNames An arrary of field reference names
    * @param returnOriginalValue Optional setting to whether getting the unsaved values or not. Default is false.
    */
    getFieldValues(fieldReferenceNames: string[], returnOriginalValue?: boolean): IDictionaryStringTo<Object>;
    /**
    * Sets field value of active work item. Returns true if successfull.
    *
    * @param fieldReferenceName Field reference name
    * @param value Field value
    */
    setFieldValue(fieldReferenceName: string, value: Object): boolean;
    /**
    * Sets field values of active work item. Returns a dictionary of field refName/results.
    *
    * @param fields A dictionary of field refName/values
    */
    setFieldValues(fields: IDictionaryStringTo<Object>): IDictionaryStringTo<boolean>;
    /**
    * Returns true if active work item is dirty
    */
    isDirty(): boolean;
    /**
    * Returns true if active work item is new
    */
    isNew(): boolean;
    /**
    * Returns true if active work item fields are all valid
    */
    isValid(): boolean;
    /**
    * Gets invalid fields. Returns an array of invalid work item fields.
    *
    */
    getInvalidFields(): WitContracts.WorkItemField[];
    /**
    * Adds work item links to active work item
    *
    * @param workItemLinks Work item link to add.
    */
    addWorkItemRelations(workItemRelations: WitContracts.WorkItemRelation[]): void;
    /**
    * Remove work item links from active work item
    *
    * @param workItemLinks Work item link to remove.
    */
    removeWorkItemRelations(workItemRelations: WitContracts.WorkItemRelation[]): void;
    /**
    * Returns array of work item relations
    */
    getWorkItemRelations(): WitContracts.WorkItemRelation[];
    /**
    * Returns resource url of specified workitem
    */
    getWorkItemResourceUrl(workItemId: number): string;
    /**
    * Returns array of work item relation types
    */
    getWorkItemRelationTypes(): WitContracts.WorkItemRelationType[];
    /**
    * Returns true if active work item available
    */
    hasActiveWorkItem(): boolean;
}
export module WorkItemFormService {
    var contributionId: string;
    /**
    * Get an instance of the host work item service
    *
    * @param webContext Optional web context to scope the service to
    */
    function getService(webContext?: Contracts_Platform.WebContext): IPromise<IWorkItemFormService>;
}
}
declare module "TFS/WorkItemTracking/UIContracts" {
import WitContracts = require("TFS/WorkItemTracking/Contracts");
/**
 * A query result in the WIT UI
 */
export interface QueryResultWorkItemContext {
    columns: string[];
    rows: any[];
    query: WitContracts.QueryHierarchyItem;
}
/**
 * A work item query in the WIT UI
 */
export interface WorkItemQueryContext {
    query: WitContracts.QueryHierarchyItem;
}
}
declare module "TFS/Work/Contracts" {
import System_Contracts = require("VSS/Common/Contracts/System");
export interface Activity {
    capacityPerDay: number;
    name: string;
}
export interface attribute {
}
export interface Board extends ShallowReference {
    _links: any;
    allowedMappings: {
        [key: string]: {
            [key: string]: string[];
        };
    };
    canEdit: boolean;
    columns: BoardColumn[];
    isValid: boolean;
    revision: number;
    rows: BoardRow[];
}
export interface BoardCardRuleSettings {
    _links: any;
    rules: {
        [key: string]: Rule[];
    };
    url: string;
}
export interface BoardCardSettings {
    cards: {
        [key: string]: FieldSetting[];
    };
}
export interface BoardChart extends BoardChartReference {
    /**
     * The links for the resource
     */
    _links: any;
    /**
     * The settings for the resource
     */
    settings: {
        [key: string]: any;
    };
}
export interface BoardChartReference {
    /**
     * Name of the resource
     */
    name: string;
    /**
     * Full http link to the resource
     */
    url: string;
}
export interface BoardColumn {
    columnType: BoardColumnType;
    description: string;
    id: string;
    isSplit: boolean;
    itemLimit: number;
    name: string;
    stateMappings: {
        [key: string]: string;
    };
}
export enum BoardColumnType {
    Incoming = 0,
    InProgress = 1,
    Outgoing = 2,
}
export interface BoardReference extends ShallowReference {
}
export interface BoardRow {
    id: string;
    name: string;
}
export interface BoardSuggestedValue {
    name: string;
}
export enum BugsBehavior {
    Off = 0,
    AsRequirements = 1,
    AsTasks = 2,
}
/**
 * Expected data from PATCH
 */
export interface CapacityPatch {
    activities: Activity[];
    daysOff: DateRange[];
}
export interface DateRange {
    /**
     * End of the date range.
     */
    end: Date;
    /**
     * Start of the date range.
     */
    start: Date;
}
/**
 * An abstracted reference to a field
 */
export interface FieldReference {
    /**
     * fieldRefName for the field
     */
    referenceName: string;
    /**
     * Full http link to more information about the field
     */
    url: string;
}
export interface FieldSetting {
}
export interface FilterClause {
    fieldName: string;
    index: number;
    logicalOperator: string;
    operator: string;
    value: string;
}
export interface Member {
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
}
export interface Rule {
    clauses: FilterClause[];
    filter: string;
    isEnabled: string;
    name: string;
    settings: attribute;
}
/**
 * An abstracted reference to some other resource. This class is used to provide the board data contracts with a uniform way to reference other resources in a way that provides easy traversal through links.
 */
export interface ShallowReference {
    /**
     * Id of the resource
     */
    id: string;
    /**
     * Name of the resource
     */
    name: string;
    /**
     * Full http link to the resource
     */
    url: string;
}
/**
 * Represents a single TeamFieldValue
 */
export interface TeamFieldValue {
    includeChildren: boolean;
    value: string;
}
/**
 * Essentially a collection of team field values
 */
export interface TeamFieldValues extends TeamSettingsDataContractBase {
    /**
     * The default team field value
     */
    defaultValue: string;
    /**
     * Shallow ref to the field being used as a team field
     */
    field: FieldReference;
    /**
     * Collection of all valid team field values
     */
    values: TeamFieldValue[];
}
/**
 * Expected data from PATCH
 */
export interface TeamFieldValuesPatch {
    defaultValue: string;
    values: TeamFieldValue[];
}
export interface TeamIterationAttributes {
    finishDate: Date;
    startDate: Date;
}
/**
 * Represents capacity for a specific team member
 */
export interface TeamMemberCapacity extends TeamSettingsDataContractBase {
    /**
     * Collection of capacities associated with the team member
     */
    activities: Activity[];
    /**
     * The days off associated with the team member
     */
    daysOff: DateRange[];
    /**
     * Shallow Ref to the associated team member
     */
    teamMember: Member;
}
/**
 * Data contract for TeamSettings
 */
export interface TeamSetting extends TeamSettingsDataContractBase {
    /**
     * Default Iteration
     */
    backlogIteration: TeamSettingsIteration;
    /**
     * Information about categories that are visible on the backlog.
     */
    backlogVisibilities: {
        [key: string]: boolean;
    };
    /**
     * BugsBehavior (Off, AsTasks, AsRequirements, ...)
     */
    bugsBehavior: BugsBehavior;
    /**
     * Days that the team is working
     */
    workingDays: System_Contracts.DayOfWeek[];
}
/**
 * Base class for TeamSettings data contracts. Anything common goes here.
 */
export interface TeamSettingsDataContractBase {
    /**
     * Collection of links relevant to resource
     */
    _links: any;
    /**
     * Full http link to the resource
     */
    url: string;
}
export interface TeamSettingsDaysOff extends TeamSettingsDataContractBase {
    daysOff: DateRange[];
}
export interface TeamSettingsDaysOffPatch {
    daysOff: DateRange[];
}
/**
 * Represents a shallow ref for a single iteration
 */
export interface TeamSettingsIteration extends TeamSettingsDataContractBase {
    /**
     * Attributes such as start and end date
     */
    attributes: TeamIterationAttributes;
    /**
     * Id of the resource
     */
    id: string;
    /**
     * Name of the resource
     */
    name: string;
    /**
     * Relative path of the iteration
     */
    path: string;
}
/**
 * Data contract for what we expect to receive when PATCH
 */
export interface TeamSettingsPatch {
    backlogIteration: string;
    backlogVisibilities: {
        [key: string]: boolean;
    };
    bugsBehavior: BugsBehavior;
    workingDays: System_Contracts.DayOfWeek[];
}
export var TypeInfo: {
    Activity: {
        fields: any;
    };
    attribute: {
        fields: any;
    };
    Board: {
        fields: any;
    };
    BoardCardRuleSettings: {
        fields: any;
    };
    BoardCardSettings: {
        fields: any;
    };
    BoardChart: {
        fields: any;
    };
    BoardChartReference: {
        fields: any;
    };
    BoardColumn: {
        fields: any;
    };
    BoardColumnType: {
        enumValues: {
            "incoming": number;
            "inProgress": number;
            "outgoing": number;
        };
    };
    BoardReference: {
        fields: any;
    };
    BoardRow: {
        fields: any;
    };
    BoardSuggestedValue: {
        fields: any;
    };
    BugsBehavior: {
        enumValues: {
            "off": number;
            "asRequirements": number;
            "asTasks": number;
        };
    };
    CapacityPatch: {
        fields: any;
    };
    DateRange: {
        fields: any;
    };
    FieldReference: {
        fields: any;
    };
    FieldSetting: {
        fields: any;
    };
    FilterClause: {
        fields: any;
    };
    Member: {
        fields: any;
    };
    Rule: {
        fields: any;
    };
    ShallowReference: {
        fields: any;
    };
    TeamFieldValue: {
        fields: any;
    };
    TeamFieldValues: {
        fields: any;
    };
    TeamFieldValuesPatch: {
        fields: any;
    };
    TeamIterationAttributes: {
        fields: any;
    };
    TeamMemberCapacity: {
        fields: any;
    };
    TeamSetting: {
        fields: any;
    };
    TeamSettingsDataContractBase: {
        fields: any;
    };
    TeamSettingsDaysOff: {
        fields: any;
    };
    TeamSettingsDaysOffPatch: {
        fields: any;
    };
    TeamSettingsIteration: {
        fields: any;
    };
    TeamSettingsPatch: {
        fields: any;
    };
};
}
declare module "TFS/Work/RestClient" {
import Contracts = require("TFS/Work/Contracts");
import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
/**
 * @exemptedapi
 */
export class WorkHttpClient2_2 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BoardSuggestedValue[]>
     */
    getColumnSuggestedValues(project?: string): IPromise<Contracts.BoardSuggestedValue[]>;
    /**
     * [Preview API]
     *
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BoardSuggestedValue[]>
     */
    getRowSuggestedValues(project?: string): IPromise<Contracts.BoardSuggestedValue[]>;
    /**
     * [Preview API] Get board
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id - identifier for board, either category plural name (Eg:"Stories") or guid
     * @return IPromise<Contracts.Board>
     */
    getBoard(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.Board>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.BoardReference[]>
     */
    getBoards(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.BoardReference[]>;
    /**
     * [Preview API] Update board options
     *
     * @param {{ [key: string] : string; }} options - options to updated
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id - identifier for board, either category plural name (Eg:"Stories") or guid
     * @return IPromise<{ [key: string] : string; }>
     */
    setBoardOptions(options: {
        [key: string]: string;
    }, teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<{
        [key: string]: string;
    }>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamMemberCapacity[]>
     */
    getCapacities(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamMemberCapacity[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    getCapacity(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TeamMemberCapacity[]} capacities
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamMemberCapacity[]>
     */
    replaceCapacities(capacities: Contracts.TeamMemberCapacity[], teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamMemberCapacity[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.CapacityPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    updateCapacity(patch: Contracts.CapacityPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * [Preview API] Get board card Rule settings for the board id or board by name
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardRuleSettings>
     */
    getBoardCardRuleSettings(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardRuleSettings>;
    /**
     * [Preview API] Update board card Rule settings for the board id or board by name
     *
     * @param {Contracts.BoardCardRuleSettings} boardCardRuleSettings
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardRuleSettings>
     */
    updateBoardCardRuleSettings(boardCardRuleSettings: Contracts.BoardCardRuleSettings, teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardRuleSettings>;
    /**
     * [Preview API] Get board card settings for the board id or board by name
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    getBoardCardSettings(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * [Preview API] Update board card settings for the board id or board by name
     *
     * @param {Contracts.BoardCardSettings} boardCardSettingsToSave
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    updateBoardCardSettings(boardCardSettingsToSave: Contracts.BoardCardSettings, teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * [Preview API] Get a board chart
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    getBoardChart(teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * [Preview API] Get board charts
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @return IPromise<Contracts.BoardChartReference[]>
     */
    getBoardCharts(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardChartReference[]>;
    /**
     * [Preview API] Update a board chart
     *
     * @param {Contracts.BoardChart} chart
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    updateBoardChart(chart: Contracts.BoardChart, teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    getBoardColumns(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.BoardColumn[]} boardColumns
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    updateBoardColumns(boardColumns: Contracts.BoardColumn[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<void>
     */
    deleteTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<void>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    getTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} timeframe
     * @return IPromise<Contracts.TeamSettingsIteration[]>
     */
    getTeamIterations(teamContext: TFS_Core_Contracts.TeamContext, timeframe?: string): IPromise<Contracts.TeamSettingsIteration[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TeamSettingsIteration} iteration
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    postTeamIteration(iteration: Contracts.TeamSettingsIteration, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    getBoardRows(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * [Preview API]
     *
     * @param {Contracts.BoardRow[]} boardRows
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    updateBoardRows(boardRows: Contracts.BoardRow[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    getTeamDaysOff(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TeamSettingsDaysOffPatch} daysOffPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    updateTeamDaysOff(daysOffPatch: Contracts.TeamSettingsDaysOffPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    getTeamFieldValues(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TeamFieldValuesPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    updateTeamFieldValues(patch: Contracts.TeamFieldValuesPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * [Preview API]
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    getTeamSettings(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
    /**
     * [Preview API]
     *
     * @param {Contracts.TeamSettingsPatch} teamSettingsPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    updateTeamSettings(teamSettingsPatch: Contracts.TeamSettingsPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
}
export class WorkHttpClient2_1 extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BoardSuggestedValue[]>
     */
    getColumnSuggestedValues(project?: string): IPromise<Contracts.BoardSuggestedValue[]>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.BoardSuggestedValue[]>
     */
    getRowSuggestedValues(project?: string): IPromise<Contracts.BoardSuggestedValue[]>;
    /**
     * Get board
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id - identifier for board, either category plural name (Eg:"Stories") or guid
     * @return IPromise<Contracts.Board>
     */
    getBoard(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.Board>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.BoardReference[]>
     */
    getBoards(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.BoardReference[]>;
    /**
     * Update board options
     *
     * @param {{ [key: string] : string; }} options - options to updated
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id - identifier for board, either category plural name (Eg:"Stories") or guid
     * @return IPromise<{ [key: string] : string; }>
     */
    setBoardOptions(options: {
        [key: string]: string;
    }, teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<{
        [key: string]: string;
    }>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamMemberCapacity[]>
     */
    getCapacities(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamMemberCapacity[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    getCapacity(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * @param {Contracts.TeamMemberCapacity[]} capacities
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamMemberCapacity[]>
     */
    replaceCapacities(capacities: Contracts.TeamMemberCapacity[], teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamMemberCapacity[]>;
    /**
     * @param {Contracts.CapacityPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    updateCapacity(patch: Contracts.CapacityPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * @exemptedapi
     * [Preview API] Get board card Rule settings for the board id or board by name
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardRuleSettings>
     */
    getBoardCardRuleSettings(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardRuleSettings>;
    /**
     * @exemptedapi
     * [Preview API] Update board card Rule settings for the board id or board by name
     *
     * @param {Contracts.BoardCardRuleSettings} boardCardRuleSettings
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardRuleSettings>
     */
    updateBoardCardRuleSettings(boardCardRuleSettings: Contracts.BoardCardRuleSettings, teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardRuleSettings>;
    /**
     * Get board card settings for the board id or board by name
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    getBoardCardSettings(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * Update board card settings for the board id or board by name
     *
     * @param {Contracts.BoardCardSettings} boardCardSettingsToSave
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    updateBoardCardSettings(boardCardSettingsToSave: Contracts.BoardCardSettings, teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * Get a board chart
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    getBoardChart(teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * Get board charts
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @return IPromise<Contracts.BoardChartReference[]>
     */
    getBoardCharts(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardChartReference[]>;
    /**
     * Update a board chart
     *
     * @param {Contracts.BoardChart} chart
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:"Stories") or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    updateBoardChart(chart: Contracts.BoardChart, teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    getBoardColumns(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * @param {Contracts.BoardColumn[]} boardColumns
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    updateBoardColumns(boardColumns: Contracts.BoardColumn[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<void>
     */
    deleteTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<void>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    getTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} timeframe
     * @return IPromise<Contracts.TeamSettingsIteration[]>
     */
    getTeamIterations(teamContext: TFS_Core_Contracts.TeamContext, timeframe?: string): IPromise<Contracts.TeamSettingsIteration[]>;
    /**
     * @param {Contracts.TeamSettingsIteration} iteration
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    postTeamIteration(iteration: Contracts.TeamSettingsIteration, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    getBoardRows(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * @param {Contracts.BoardRow[]} boardRows
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    updateBoardRows(boardRows: Contracts.BoardRow[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    getTeamDaysOff(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * @param {Contracts.TeamSettingsDaysOffPatch} daysOffPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    updateTeamDaysOff(daysOffPatch: Contracts.TeamSettingsDaysOffPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    getTeamFieldValues(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * @param {Contracts.TeamFieldValuesPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    updateTeamFieldValues(patch: Contracts.TeamFieldValuesPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    getTeamSettings(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
    /**
     * @param {Contracts.TeamSettingsPatch} teamSettingsPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    updateTeamSettings(teamSettingsPatch: Contracts.TeamSettingsPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
}
export class WorkHttpClient extends WorkHttpClient2_2 {
    constructor(rootRequestPath: string);
}
/**
 * Gets an http client targeting the latest released version of the APIs.
 *
 * @return WorkHttpClient2_1
 */
export function getClient(): WorkHttpClient2_1;
}
