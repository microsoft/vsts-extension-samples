import TFS_VersionControl_Contracts = require("VersionControl/Scripts/Generated/TFS.VersionControl.Contracts");
import WebApi_Contracts = require("VSS/WebApi/Contracts");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class GitHttpClient extends WebApi_RestClient.VssHttpClient {
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
     * @return IPromise<TFS_VersionControl_Contracts.GitBlobRef>
     */
    getBlob(repositoryId: string, sha1: string, project?: string, download?: boolean, fileName?: string): IPromise<TFS_VersionControl_Contracts.GitBlobRef>;
    /**
     * Retrieve statistics about a single branch.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} name - Name of the branch
     * @param {string} project - Project ID or project name
     * @param {TFS_VersionControl_Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.GitBranchStats>
     */
    getBranch(repositoryId: string, name: string, project?: string, baseVersionDescriptor?: TFS_VersionControl_Contracts.GitVersionDescriptor): IPromise<TFS_VersionControl_Contracts.GitBranchStats>;
    /**
     * Retrieve statistics about all branches within a repository.
     *
     * @param {string} repositoryId - Friendly name or guid of repository
     * @param {string} project - Project ID or project name
     * @param {TFS_VersionControl_Contracts.GitVersionDescriptor} baseVersionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.GitBranchStats[]>
     */
    getBranches(repositoryId: string, project?: string, baseVersionDescriptor?: TFS_VersionControl_Contracts.GitVersionDescriptor): IPromise<TFS_VersionControl_Contracts.GitBranchStats[]>;
    /**
     * Retrieve changes for a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of changes to return.
     * @param {number} skip - The number of changes to skip.
     * @return IPromise<TFS_VersionControl_Contracts.GitCommitChanges>
     */
    getChanges(commitId: string, repositoryId: string, project?: string, top?: number, skip?: number): IPromise<TFS_VersionControl_Contracts.GitCommitChanges>;
    /**
     * Create a git commit for a project
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitCommit>
     */
    createCommit(repositoryId: string, project?: string): IPromise<TFS_VersionControl_Contracts.GitCommit>;
    /**
     * Retrieve a particular commit.
     *
     * @param {string} commitId - The id of the commit.
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {number} changeCount - The number of changes to include in the result.
     * @return IPromise<TFS_VersionControl_Contracts.GitCommit>
     */
    getCommit(commitId: string, repositoryId: string, project?: string, changeCount?: number): IPromise<TFS_VersionControl_Contracts.GitCommit>;
    /**
     * @param {string} repositoryId
     * @param {TFS_VersionControl_Contracts.GitQueryCommitsCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>
     */
    getCommits(repositoryId: string, searchCriteria: TFS_VersionControl_Contracts.GitQueryCommitsCriteria, project?: string, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>;
    /**
     * Retrieve a list of commits associated with a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} top - The maximum number of commits to return (&quot;get the top x commits&quot;).
     * @param {number} skip - The number of commits to skip.
     * @param {boolean} includeLinks
     * @return IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>
     */
    getPushCommits(repositoryId: string, pushId: number, project?: string, top?: number, skip?: number, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>;
    /**
     * @param {TFS_VersionControl_Contracts.GitQueryCommitsCriteria} searchCriteria
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>
     */
    getCommitsBatch(searchCriteria: TFS_VersionControl_Contracts.GitQueryCommitsCriteria, repositoryId: string, project?: string, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.GitCommitRef[]>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} path
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {TFS_VersionControl_Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.GitItem>
     */
    getItem(repositoryId: string, path: string, project?: string, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, versionDescriptor?: TFS_VersionControl_Contracts.GitVersionDescriptor): IPromise<TFS_VersionControl_Contracts.GitItem>;
    /**
     * Get Item Metadata and/or Content for a collection of items. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} scopePath
     * @param {TFS_VersionControl_Contracts.VersionControlRecursionType} recursionLevel
     * @param {boolean} includeContentMetadata
     * @param {boolean} latestProcessedChange
     * @param {boolean} download
     * @param {boolean} includeLinks
     * @param {TFS_VersionControl_Contracts.GitVersionDescriptor} versionDescriptor
     * @return IPromise<TFS_VersionControl_Contracts.GitItem[]>
     */
    getItems(repositoryId: string, project?: string, scopePath?: string, recursionLevel?: TFS_VersionControl_Contracts.VersionControlRecursionType, includeContentMetadata?: boolean, latestProcessedChange?: boolean, download?: boolean, includeLinks?: boolean, versionDescriptor?: TFS_VersionControl_Contracts.GitVersionDescriptor): IPromise<TFS_VersionControl_Contracts.GitItem[]>;
    /**
     * Post for retrieving a creating a batch out of a set of items in a repo / project given a list of paths or a long path
     *
     * @param {TFS_VersionControl_Contracts.GitItemRequestData} requestData
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitItem[][]>
     */
    getItemsBatch(requestData: TFS_VersionControl_Contracts.GitItemRequestData, repositoryId: string, project?: string): IPromise<TFS_VersionControl_Contracts.GitItem[][]>;
    /**
     * Gets the Git media object contents or metadata by the specified identifier.
     *
     * @param {string} repositoryId
     * @param {string} mediaObjectId
     * @param {string} project - Project ID or project name
     * @param {boolean} includeLinks
     * @return IPromise<void>
     */
    getMediaObjectOrReference(repositoryId: string, mediaObjectId: string, project?: string, includeLinks?: boolean): IPromise<void>;
    /**
     * Gets whether the current user has permission to write a Git media object by the specified identifier.
     *
     * @param {string} repositoryId
     * @param {string} mediaObjectId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    hasMediaObjectWritePermission(repositoryId: string, mediaObjectId: string, project?: string): IPromise<void>;
    /**
     * Creates a Git media object with the data in the request stream.
     *
     * @param {string} repositoryId
     * @param {string} mediaObjectId
     * @param {string} project - Project ID or project name
     * @return IPromise<void>
     */
    uploadMediaObject(repositoryId: string, mediaObjectId: string, project?: string): IPromise<void>;
    /**
     * Adds a reviewer to a git pull request
     *
     * @param {TFS_VersionControl_Contracts.IdentityRefWithVote} reviewer
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} reviewerId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote>
     */
    createPullRequestReviewer(reviewer: TFS_VersionControl_Contracts.IdentityRefWithVote, repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote>;
    /**
     * Adds reviewers to a git pull request
     *
     * @param {WebApi_Contracts.IdentityRef[]} reviewers
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote[]>
     */
    createPullRequestReviewers(reviewers: WebApi_Contracts.IdentityRef[], repositoryId: string, pullRequestId: number, project?: string): IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote[]>;
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
     * @return IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote>
     */
    getPullRequestReviewer(repositoryId: string, pullRequestId: number, reviewerId: string, project?: string): IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote>;
    /**
     * Retrieve a pull request reviewers
     *
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote[]>
     */
    getPullRequestReviewers(repositoryId: string, pullRequestId: number, project?: string): IPromise<TFS_VersionControl_Contracts.IdentityRefWithVote[]>;
    /**
     * Create a git pull request
     *
     * @param {TFS_VersionControl_Contracts.GitPullRequest} gitPullRequestToCreate
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitPullRequest>
     */
    createPullRequest(gitPullRequestToCreate: TFS_VersionControl_Contracts.GitPullRequest, repositoryId: string, project?: string): IPromise<TFS_VersionControl_Contracts.GitPullRequest>;
    /**
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.GitPullRequest>
     */
    getPullRequest(repositoryId: string, pullRequestId: number, project?: string, maxCommentLength?: number, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.GitPullRequest>;
    /**
     * @param {string} repositoryId
     * @param {TFS_VersionControl_Contracts.GitPullRequestSearchCriteria} searchCriteria
     * @param {string} project - Project ID or project name
     * @param {number} maxCommentLength
     * @param {number} skip
     * @param {number} top
     * @return IPromise<TFS_VersionControl_Contracts.GitPullRequest[]>
     */
    getPullRequests(repositoryId: string, searchCriteria: TFS_VersionControl_Contracts.GitPullRequestSearchCriteria, project?: string, maxCommentLength?: number, skip?: number, top?: number): IPromise<TFS_VersionControl_Contracts.GitPullRequest[]>;
    /**
     * Updates a pull request
     *
     * @param {TFS_VersionControl_Contracts.GitPullRequest} gitPullRequestToUpdate
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitPullRequest>
     */
    updatePullRequest(gitPullRequestToUpdate: TFS_VersionControl_Contracts.GitPullRequest, repositoryId: string, pullRequestId: number, project?: string): IPromise<TFS_VersionControl_Contracts.GitPullRequest>;
    /**
     * @param {string} repositoryId
     * @param {number} pullRequestId
     * @param {string} project - Project ID or project name
     * @param {number} commitsTop
     * @param {number} commitsSkip
     * @return IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>
     */
    getPullRequestWorkItems(repositoryId: string, pullRequestId: number, project?: string, commitsTop?: number, commitsSkip?: number): IPromise<TFS_VersionControl_Contracts.AssociatedWorkItem[]>;
    /**
     * Retrieve a particular push.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {number} pushId - The id of the push.
     * @param {string} project - Project ID or project name
     * @param {number} includeCommits - The number of commits to include in the result.
     * @param {boolean} includeRefUpdates
     * @return IPromise<TFS_VersionControl_Contracts.GitPush>
     */
    getPush(repositoryId: string, pushId: number, project?: string, includeCommits?: number, includeRefUpdates?: boolean): IPromise<TFS_VersionControl_Contracts.GitPush>;
    /**
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {number} skip
     * @param {number} top
     * @param {TFS_VersionControl_Contracts.GitPushSearchCriteria} searchCriteria
     * @return IPromise<TFS_VersionControl_Contracts.GitPush[]>
     */
    getPushes(repositoryId: string, project?: string, skip?: number, top?: number, searchCriteria?: TFS_VersionControl_Contracts.GitPushSearchCriteria): IPromise<TFS_VersionControl_Contracts.GitPush[]>;
    /**
     * Queries the provided repository for its refs and returns them.
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @param {string} filter - [optional] A filter to apply to the refs.
     * @param {boolean} includeLinks - [optional] Specifies if referenceLinks should be included in the result. default is false.
     * @return IPromise<TFS_VersionControl_Contracts.GitRef[]>
     */
    getRefs(repositoryId: string, project?: string, filter?: string, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.GitRef[]>;
    /**
     * @param {TFS_VersionControl_Contracts.GitRefUpdate[]} refUpdates
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @return IPromise<TFS_VersionControl_Contracts.GitRefUpdateResult[]>
     */
    updateRefs(refUpdates: TFS_VersionControl_Contracts.GitRefUpdate[], repositoryId: string, project?: string, projectId?: string): IPromise<TFS_VersionControl_Contracts.GitRefUpdateResult[]>;
    /**
     * Create a git repository
     *
     * @param {TFS_VersionControl_Contracts.GitRepository} gitRepositoryToCreate
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitRepository>
     */
    createRepository(gitRepositoryToCreate: TFS_VersionControl_Contracts.GitRepository, project?: string): IPromise<TFS_VersionControl_Contracts.GitRepository>;
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
     * @return IPromise<TFS_VersionControl_Contracts.GitRepository[]>
     */
    getRepositories(project?: string, includeLinks?: boolean): IPromise<TFS_VersionControl_Contracts.GitRepository[]>;
    /**
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitRepository>
     */
    getRepository(repositoryId: string, project?: string): IPromise<TFS_VersionControl_Contracts.GitRepository>;
    /**
     * Updates the Git repository with the single populated change in the specified repository information.
     *
     * @param {TFS_VersionControl_Contracts.GitRepository} newRepositoryInfo
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<TFS_VersionControl_Contracts.GitRepository>
     */
    patchRepository(newRepositoryInfo: TFS_VersionControl_Contracts.GitRepository, repositoryId: string, project?: string): IPromise<TFS_VersionControl_Contracts.GitRepository>;
    /**
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<TFS_VersionControl_Contracts.GitTreeRef>
     */
    getTree(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<TFS_VersionControl_Contracts.GitTreeRef>;
}
