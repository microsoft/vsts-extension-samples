import TFS_WorkItemTracking_Contracts = require("WorkItemTracking/Scripts/Generated/TFS.WorkItemTracking.Contracts");
import WebApi_Contracts = require("VSS/WebApi/Contracts");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class WorkItemTrackingHttpClient extends WebApi_RestClient.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Creates an attachment.
     *
     * @param {string} fileName
     * @param {string} uploadType
     * @return IPromise<TFS_WorkItemTracking_Contracts.AttachmentReference>
     */
    createAttachment(fileName?: string, uploadType?: string): IPromise<TFS_WorkItemTracking_Contracts.AttachmentReference>;
    /**
     * @param {string} id
     * @param {string} uploadType
     * @return IPromise<TFS_WorkItemTracking_Contracts.AttachmentReference>
     */
    uploadAttachment(id: string, uploadType: string): IPromise<TFS_WorkItemTracking_Contracts.AttachmentReference>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} depth
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode[]>
     */
    getRootNodes(project: string, depth?: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode[]>;
    /**
     * @param {TFS_WorkItemTracking_Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {TFS_WorkItemTracking_Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode>
     */
    createOrUpdateClassificationNode(postedNode: TFS_WorkItemTracking_Contracts.WorkItemClassificationNode, project: string, structureGroup: TFS_WorkItemTracking_Contracts.TreeStructureGroup, path?: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode>;
    /**
     * @param {string} project - Project ID or project name
     * @param {TFS_WorkItemTracking_Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} reclassifyId
     * @return IPromise<void>
     */
    deleteClassificationNode(project: string, structureGroup: TFS_WorkItemTracking_Contracts.TreeStructureGroup, path?: string, reclassifyId?: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {TFS_WorkItemTracking_Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @param {number} depth
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode>
     */
    getClassificationNode(project: string, structureGroup: TFS_WorkItemTracking_Contracts.TreeStructureGroup, path?: string, depth?: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemClassificationNode>;
    /**
     * @param {TFS_WorkItemTracking_Contracts.WorkItemClassificationNode} postedNode
     * @param {string} project - Project ID or project name
     * @param {TFS_WorkItemTracking_Contracts.TreeStructureGroup} structureGroup
     * @param {string} path
     * @return IPromise<void>
     */
    updateClassificationNode(postedNode: TFS_WorkItemTracking_Contracts.WorkItemClassificationNode, project: string, structureGroup: TFS_WorkItemTracking_Contracts.TreeStructureGroup, path?: string): IPromise<void>;
    /**
     * @param {string} field
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemField>
     */
    getField(field: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemField>;
    /**
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemField[]>
     */
    getFields(): IPromise<TFS_WorkItemTracking_Contracts.WorkItemField[]>;
    /**
     * Returns history of all revision for a given work item ID
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemHistory[]>
     */
    getHistory(id: number, top?: number, skip?: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemHistory[]>;
    /**
     * Returns the history value of particular revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemHistory>
     */
    getHistoryById(id: number, revisionNumber: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemHistory>;
    /**
     * Creates a query, or moves a query.
     *
     * @param {TFS_WorkItemTracking_Contracts.QueryHierarchyItem} postedQuery - The query to create.
     * @param {string} project - Project ID or project name
     * @param {string} query - The parent path for the query to create.
     * @return IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>
     */
    createQuery(postedQuery: TFS_WorkItemTracking_Contracts.QueryHierarchyItem, project: string, query: string): IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>;
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
     * @param {TFS_WorkItemTracking_Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem[]>
     */
    getQueries(project: string, expand?: TFS_WorkItemTracking_Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem[]>;
    /**
     * Retrieves a single query by project and either id or path
     *
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {TFS_WorkItemTracking_Contracts.QueryExpand} expand
     * @param {number} depth
     * @param {boolean} includeDeleted
     * @return IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>
     */
    getQuery(project: string, query: string, expand?: TFS_WorkItemTracking_Contracts.QueryExpand, depth?: number, includeDeleted?: boolean): IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>;
    /**
     * @param {TFS_WorkItemTracking_Contracts.QueryHierarchyItem} queryUpdate
     * @param {string} project - Project ID or project name
     * @param {string} query
     * @param {boolean} undeleteDescendants
     * @return IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>
     */
    updateQuery(queryUpdate: TFS_WorkItemTracking_Contracts.QueryHierarchyItem, project: string, query: string, undeleteDescendants?: boolean): IPromise<TFS_WorkItemTracking_Contracts.QueryHierarchyItem>;
    /**
     * Returns a fully hydrated work item for the requested revision
     *
     * @param {number} id
     * @param {number} revisionNumber
     * @param {TFS_WorkItemTracking_Contracts.WorkItemExpand} expand
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem>
     */
    getRevision(id: number, revisionNumber: number, expand?: TFS_WorkItemTracking_Contracts.WorkItemExpand): IPromise<TFS_WorkItemTracking_Contracts.WorkItem>;
    /**
     * Returns the list of fully hydrated work item revisions, paged.
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @param {TFS_WorkItemTracking_Contracts.WorkItemExpand} expand
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem[]>
     */
    getRevisions(id: number, top?: number, skip?: number, expand?: TFS_WorkItemTracking_Contracts.WorkItemExpand): IPromise<TFS_WorkItemTracking_Contracts.WorkItem[]>;
    /**
     * Validates the fields values.
     *
     * @param {TFS_WorkItemTracking_Contracts.FieldsToEvaluate} ruleEngineInput
     * @return IPromise<void>
     */
    evaluateRulesOnField(ruleEngineInput: TFS_WorkItemTracking_Contracts.FieldsToEvaluate): IPromise<void>;
    /**
     * Returns a single update for a work item
     *
     * @param {number} id
     * @param {number} updateNumber
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemUpdate>
     */
    getUpdate(id: number, updateNumber: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemUpdate>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {number} id
     * @param {number} top
     * @param {number} skip
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemUpdate[]>
     */
    getUpdates(id: number, top?: number, skip?: number): IPromise<TFS_WorkItemTracking_Contracts.WorkItemUpdate[]>;
    /**
     * Gets the results of the query.
     *
     * @param {TFS_WorkItemTracking_Contracts.Wiql} wiql - The query containing the wiql.
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemQueryResult>
     */
    postQuery(wiql: TFS_WorkItemTracking_Contracts.Wiql, project?: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemQueryResult>;
    /**
     * Gets the results of the query by id.
     *
     * @param {string} id - The query id.
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemQueryResult>
     */
    query(id: string, project?: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemQueryResult>;
    /**
     * Gets the work item relation types.
     *
     * @param {string} relation
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemRelationType>
     */
    getRelationType(relation: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemRelationType>;
    /**
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemRelationType[]>
     */
    getRelationTypes(): IPromise<TFS_WorkItemTracking_Contracts.WorkItemRelationType[]>;
    /**
     * @param {number} id
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {TFS_WorkItemTracking_Contracts.WorkItemExpand} expand
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem>
     */
    getWorkItem(id: number, fields?: string[], asOf?: Date, expand?: TFS_WorkItemTracking_Contracts.WorkItemExpand): IPromise<TFS_WorkItemTracking_Contracts.WorkItem>;
    /**
     * @param {number[]} ids
     * @param {string[]} fields
     * @param {Date} asOf
     * @param {TFS_WorkItemTracking_Contracts.WorkItemExpand} expand
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem[]>
     */
    getWorkItems(ids: number[], fields?: string[], asOf?: Date, expand?: TFS_WorkItemTracking_Contracts.WorkItemExpand): IPromise<TFS_WorkItemTracking_Contracts.WorkItem[]>;
    /**
     * @param {WebApi_Contracts.JsonPatchDocument} document
     * @param {number} id
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem>
     */
    updateWorkItem(document: WebApi_Contracts.JsonPatchDocument, id: number, validateOnly?: boolean, bypassRules?: boolean): IPromise<TFS_WorkItemTracking_Contracts.WorkItem>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} fields
     * @param {Date} asOf
     * @param {TFS_WorkItemTracking_Contracts.WorkItemExpand} expand
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem>
     */
    getWorkItemTemplate(project: string, type: string, fields?: string, asOf?: Date, expand?: TFS_WorkItemTracking_Contracts.WorkItemExpand): IPromise<TFS_WorkItemTracking_Contracts.WorkItem>;
    /**
     * @param {WebApi_Contracts.JsonPatchDocument} document
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} validateOnly
     * @param {boolean} bypassRules
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItem>
     */
    updateWorkItemTemplate(document: WebApi_Contracts.JsonPatchDocument, project: string, type: string, validateOnly?: boolean, bypassRules?: boolean): IPromise<TFS_WorkItemTracking_Contracts.WorkItem>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeCategory[]>
     */
    getWorkItemTypeCategories(project: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeCategory[]>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} category
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeCategory>
     */
    getWorkItemTypeCategory(project: string, category: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeCategory>;
    /**
     * Returns a the deltas between work item revisions
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemType>
     */
    getWorkItemType(project: string, type: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemType>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemType[]>
     */
    getWorkItemTypes(project: string): IPromise<TFS_WorkItemTracking_Contracts.WorkItemType[]>;
    /**
     * Returns the dependent fields for the corresponding workitem type and fieldname
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {string} field
     * @return IPromise<TFS_WorkItemTracking_Contracts.FieldDependentRule>
     */
    getDependentFields(project: string, type: string, field: string): IPromise<TFS_WorkItemTracking_Contracts.FieldDependentRule>;
    /**
     * Export work item type
     *
     * @param {string} project - Project ID or project name
     * @param {string} type
     * @param {boolean} exportGlobalLists
     * @return IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeTemplate>
     */
    exportWorkItemTypeDefinition(project?: string, type?: string, exportGlobalLists?: boolean): IPromise<TFS_WorkItemTracking_Contracts.WorkItemTypeTemplate>;
    /**
     * Add/updates a work item type
     *
     * @param {TFS_WorkItemTracking_Contracts.WorkItemTypeTemplateUpdateModel} updateModel
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_WorkItemTracking_Contracts.ProvisioningResult>
     */
    updateWorkItemTypeDefinition(updateModel: TFS_WorkItemTracking_Contracts.WorkItemTypeTemplateUpdateModel, project?: string): IPromise<TFS_WorkItemTracking_Contracts.ProvisioningResult>;
}
