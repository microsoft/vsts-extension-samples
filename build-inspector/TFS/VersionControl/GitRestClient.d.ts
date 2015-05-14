import Contracts = require("TFS/VersionControl/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class GitHttpClient extends VSS_WebApi.VssHttpClient {
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
     * Create a git commit for a project
     *
     * @param {string} repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitCommit>
     */
    createCommit(repositoryId: string, project?: string): IPromise<Contracts.GitCommit>;
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
     * @param {number} top - The maximum number of commits to return (&quot;get the top x commits&quot;).
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
     * Post for retrieving a creating a batch out of a set of items in a repo / project given a list of paths or a long path
     *
     * @param {Contracts.GitItemRequestData} requestData
     * @param {string} repositoryId
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.GitItem[][]>
     */
    getItemsBatch(requestData: Contracts.GitItemRequestData, repositoryId: string, project?: string): IPromise<Contracts.GitItem[][]>;
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
     * @return IPromise<Contracts.GitPullRequest>
     */
    getPullRequest(repositoryId: string, pullRequestId: number, project?: string, maxCommentLength?: number, skip?: number, top?: number): IPromise<Contracts.GitPullRequest>;
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
     * Retrieve a pull request work items
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
     * @return IPromise<Contracts.GitRef[]>
     */
    getRefs(repositoryId: string, project?: string, filter?: string, includeLinks?: boolean): IPromise<Contracts.GitRef[]>;
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
     * @param {string} repositoryId
     * @param {string} sha1
     * @param {string} project - Project ID or project name
     * @param {string} projectId
     * @param {boolean} recursive
     * @param {string} fileName
     * @return IPromise<Contracts.GitTreeRef>
     */
    getTree(repositoryId: string, sha1: string, project?: string, projectId?: string, recursive?: boolean, fileName?: string): IPromise<Contracts.GitTreeRef>;
}
