import TFS_VersionControl_Contracts = require("VersionControl/Scripts/Generated/TFS.VersionControl.Contracts");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class TfvcHttpClient extends WebApi_RestClient.VssHttpClient {
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
     * @param {number} id
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.TfvcChange[]>
     */
    getChangesetChanges(id?: number, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.TfvcChange[]>;
    /**
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
     * @param {string} labelId
     * @param {number} top
     * @param {number} skip
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
     * @param {TFS_VersionControl_Contracts.TfvcLabelRequestData} requestData
     * @param {string} project - Project ID or project name
     * @param {number} top
     * @param {number} skip
     * @return IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>
     */
    getLabels(requestData: TFS_VersionControl_Contracts.TfvcLabelRequestData, project?: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.TfvcLabelRef[]>;
    /**
     * Retrieve the version control information for a given Team Project
     *
     * @param {string} projectId - The id (or name) of the team project
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>
     */
    getProjectInfo(projectId: string, project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo>;
    /**
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>
     */
    getProjectInfos(project?: string): IPromise<TFS_VersionControl_Contracts.VersionControlProjectInfo[]>;
    /**
     * @param {string} shelvesetId
     * @param {number} top
     * @param {number} skip
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
     * @param {TFS_VersionControl_Contracts.TfvcShelvesetRequestData} requestData
     * @param {number} top
     * @param {number} skip
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
