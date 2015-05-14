import Contracts = require("TFS/WorkItemTracking/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class WorkItemTrackingHttpClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
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
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryByWiql(wiql: Contracts.Wiql, project?: string): IPromise<Contracts.WorkItemQueryResult>;
    /**
     * Gets the results of the query by id.
     *
     * @param {string} id - The query id.
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.WorkItemQueryResult>
     */
    queryById(id: string, project?: string): IPromise<Contracts.WorkItemQueryResult>;
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
