import Q = require("q");

import TFS_Wit_Contracts = require("TFS/WorkItemTracking/Contracts");
import TFS_Wit_Client = require("TFS/WorkItemTracking/RestClient");
import TFS_Wit_Services = require("TFS/WorkItemTracking/Services");

import Tfs_Work_Contracts = require("TFS/Work/Contracts");
import Tfs_Work_WebApi = require("TFS/Work/RestClient");

import VCContracts = require("TFS/VersionControl/Contracts");
import Git_RestClient = require("TFS/VersionControl/GitRestClient");

import VSS_Extension_Service = require("VSS/SDK/Services/ExtensionData");

import { IdentityHelper } from "./identityHelper";
import { IModel, IIdentity, IPullrequest } from "./model";

export enum PullRequestVoteStatus {
    APPROVE = 10,
    APPROVE_WITH_COMMENT = 5,
    NONE = 0,
    NOT_READY = -5,
    REJECT = -10
}

export class WorkDetailsData {
    public static beginGetWorkDetails(projectId: string, teamId: string, ids: number[]): IPromise<IModel> {
        let context = VSS.getWebContext();        

        let workClient = Tfs_Work_WebApi.getClient();
        let witClient = TFS_Wit_Client.getClient();

        let taskTypes: string[] = ["Task"];
        let bugTypes: string[] = ["Bug"];

        return workClient.getTeamSettings({ project: null, team: null, projectId: projectId, teamId: teamId }).then(teamSettings => {
            let childTypes: string[] = taskTypes;
            if (teamSettings.bugsBehavior === Tfs_Work_Contracts.BugsBehavior.AsTasks) {
                childTypes = childTypes.concat(bugTypes);
            }

            let wiql = `SELECT [System.Id] FROM WorkItemLinks WHERE (Source.[System.Id] in (${ids.join(",")})) and ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward') AND (Target.[System.WorkItemType] in ('${childTypes.join("','")}')) ORDER BY [System.State] mode(Recursive)`;

            return witClient.queryByWiql({ query: wiql }, projectId).then(queryResult => {
                let allWorkItemIds: number[] = [];
                queryResult.workItemRelations.forEach(element => {
                    allWorkItemIds.push(element.target.id);
                });

                return witClient.getWorkItems(allWorkItemIds, null, null, TFS_Wit_Contracts.WorkItemExpand.Relations).then(workItems => {
                    let notStarted = 0;
                    let inProgress = 0;
                    let completed = 0;
                    let displayNames = {};
                    let pullRequestLookup = {};
                    let pullRequests: IPullrequest[] = [];
                    let promises: IPromise<VCContracts.GitPullRequest>[] = [];

                    workItems.forEach(element => {
                        let assignedTo = element.fields["System.AssignedTo"];
                        if (!!assignedTo) {
                            displayNames[assignedTo] = true;
                        }

                        if(element && element.relations){
                            element.relations.forEach(relation => {
                                if (relation.rel === "ArtifactLink" && relation.attributes["name"] === "Pull Request") {
                                    let splitURI = decodeURIComponent(relation.url).split('/');
                                    // eg. "vstfs:", "", "", "Git", "PullRequestId", "aff28a9e-c113-4df5-b233-aac79b0b2bd5", "337492b2-c0f2-4067-a47f-56569b237a50", "1"
                                    if (splitURI.length === 8) {
                                        var promise = Git_RestClient.getClient().getPullRequest(splitURI[6], parseInt(splitURI[7]), splitURI[5]).then(pullRequestRaw => {
                                            var pullRequest: IPullrequest = {
                                                id: pullRequestRaw.pullRequestId,
                                                name: pullRequestRaw.title,
                                                lastUpdated: pullRequestRaw.creationDate,
                                                user: IdentityHelper.parseIdentityName(pullRequestRaw.createdBy.displayName, pullRequestRaw.createdBy.uniqueName),
                                                uri: `${context.host.uri}${splitURI[5]}/_git/${splitURI[6]}/pullrequest/${splitURI[7]}`,
                                                status: WorkDetailsData._computePullRequestState(pullRequestRaw)
                                            };

                                            displayNames[pullRequestRaw.createdBy.displayName + " <" + pullRequestRaw.createdBy.uniqueName + ">"] = true;
                                            
                                            if(!pullRequestLookup[pullRequestRaw.pullRequestId]) {
                                                pullRequestLookup[pullRequestRaw.pullRequestId] = true;
                                                pullRequests.push(pullRequest);
                                            }

                                        });
                                        promises.push(promise);
                                    }
                                }
                            });
                        }
                    });

                    let usernames = Object.keys(displayNames);
                    return Q.allSettled(promises).then(() => {
                        return <IModel>{
                            workItemIds: ids,
                            identities: IdentityHelper.parseUniquefiedIdentityNames(usernames),
                            pullRequests: pullRequests
                        };
                    });
                });
            });
        });
    }

    private static _computePullRequestState(pr: VCContracts.GitPullRequest): { state: string, iconClass: string, stateClass: string } {

        if (pr.status === VCContracts.PullRequestStatus.Completed) {
            return {
                state: "Completed",
                iconClass: "bowtie-icon bowtie-status-success",
                stateClass: "vc-pullrequest-rollupstatus-success-text"
            };
        }
        else if (pr.status === VCContracts.PullRequestStatus.Abandoned) {
            return {
                state: "Abandoned",
                iconClass: null,
                stateClass: null
            };
        }
        else {
            //not completed or abandoned so active. First check for merge conflicts
            if (pr.mergeStatus === VCContracts.PullRequestAsyncStatus.Conflicts) {
                return {
                    state: "Merge Conflicts",
                    iconClass: "bowtie-icon bowtie-status-failure",
                    stateClass: "vc-pullrequest-rollupstatus-failure-text"
                };
            }

            //active and no merge conflicts so get the minimum vote
            var minVote: number = 0;
            if (pr.reviewers != null && pr.reviewers.length > 0) {
                minVote = pr.reviewers[0].vote;
                let allRequiredApproved = true;
                for (var j = 1; j < pr.reviewers.length; ++j) {

                    if (pr.reviewers[j].isRequired && pr.reviewers[j].vote <= 0) {
                        allRequiredApproved = false;
                    }

                    if (pr.reviewers[j].vote === 0) {
                        continue;
                    }

                    if (pr.reviewers[j].vote < minVote) {
                        minVote = pr.reviewers[j].vote;
                    }
                }

                if (minVote >= 0 && !allRequiredApproved) {
                    minVote = 0;
                }
            }

            if (minVote === PullRequestVoteStatus.REJECT) {
                return {
                    state: "Rejected",
                    iconClass: "bowtie-icon bowtie-status-failure",
                    stateClass: "vc-pullrequest-rollupstatus-failure-text"
                };
            }
            else if (minVote === PullRequestVoteStatus.NOT_READY) {
                return {
                    state: "Waiting for author",
                    iconClass: "bowtie-icon bowtie-status-waiting-fill vc-pullrequest-rollupstatus-waiting",
                    stateClass: "vc-pullrequest-rollupstatus-info-text"
                };
            }
            else if (minVote === PullRequestVoteStatus.APPROVE_WITH_COMMENT) {
                return {
                    state: "Approved with comments",
                    iconClass: "bowtie-icon bowtie-status-success",
                    stateClass: "vc-pullrequest-rollupstatus-success-text"
                };
            }
            else if (minVote === PullRequestVoteStatus.APPROVE) {
                return {
                    state: "Approved",
                    iconClass: "bowtie-icon bowtie-status-success",
                    stateClass: "vc-pullrequest-rollupstatus-success-text"
                };
            }

            // Default to 'Active'
            return {
                state: "Active",
                iconClass: null,
                stateClass: "vc-pullrequest-rollupstatus-info-text"
            };
        }
    }
}