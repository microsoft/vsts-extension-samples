/// <reference types="vss-web-extension-sdk" />

import * as Q from "q";
import { getClient, WorkItemTrackingHttpClient3_1 } from "TFS/WorkItemTracking/RestClient";
import { WorkItem, WorkItemFieldReference } from "TFS/WorkItemTracking/Contracts";
import { ignoreCaseComparer } from "VSS/Utils/String";

export interface IWiqlQueryResult {
    columns: WorkItemFieldReference[];
    workItems: WorkItem[];
}

export interface IWorkItemSearchResult {
    queryResult?: IWiqlQueryResult;
    error?: string;
}

export interface IWorkItemSearchFilter {
    keyword?: string;
    tags?: string[];
    assignedToMe?: boolean;
    hasAttachments?: boolean;
    hasLinks?: boolean;
}

export interface IWorkItemSearch {
    begingetResult(filter: IWorkItemSearchFilter): IPromise<IWorkItemSearchResult>;
    filterValid(filter: IWorkItemSearchFilter): boolean;
}

interface IWiqlResult {
    wiql?: string;
    error?: string;
}

class WorkItemSearch implements IWorkItemSearch {
    private _httpClient: WorkItemTrackingHttpClient3_1;

    public get httpClient(): WorkItemTrackingHttpClient3_1 {
        if (!this._httpClient) {
            this._httpClient = getClient();
        }

        return this._httpClient;
    }

    public begingetResult(filter: IWorkItemSearchFilter): IPromise<IWorkItemSearchResult> {
        let wiqlResult = this.buildWiql(filter);
        if (wiqlResult.wiql) {
            return this.httpClient.queryByWiql({ query: wiqlResult.wiql }, VSS.getWebContext().project.id).then(
                queryResult => {
                    // We got the work item ids, now get the field values
                    if (queryResult.workItems.length > 0) {
                        return this.httpClient
                            .getWorkItems(
                                queryResult.workItems.map(wi => wi.id),
                                queryResult.columns.map(wiRef => wiRef.referenceName),
                            )
                            .then(
                                workItems => {
                                    return <IWorkItemSearchResult>{
                                        queryResult: { columns: queryResult.columns, workItems: workItems },
                                    };
                                },
                                err => {
                                    return <IWorkItemSearchResult>{ error: err.message };
                                },
                            );
                    } else {
                        return <IWorkItemSearchResult>{ queryResult: { columns: queryResult.columns, workItems: [] } };
                    }
                },
                err => {
                    return <IWorkItemSearchResult>{ error: err.message };
                },
            ) as IPromise<IWorkItemSearchResult>;
        }

        return Q(<IWorkItemSearchResult>{ error: wiqlResult.error });
    }

    public filterValid(filter: IWorkItemSearchFilter): boolean {
        return Boolean(this.buildWiql(filter).wiql);
    }

    private buildWiql(filter: IWorkItemSearchFilter): IWiqlResult {
        if (filter && filter.keyword && filter.keyword.length >= 3) {
            let wiqlWhereClauses = [`([System.TeamProject] = @project)`];
            // Add keyword
            wiqlWhereClauses.push(
                `([System.Title] CONTAINS '${filter.keyword}' OR [System.Description] CONTAINS '${filter.keyword}')`,
            );

            if (filter.assignedToMe) {
                wiqlWhereClauses.push(`([System.AssignedTo] = @me)`);
            }

            if (filter.hasAttachments) {
                wiqlWhereClauses.push(`([System.AttachedFileCount] > 0)`);
            }

            if (filter.hasLinks) {
                wiqlWhereClauses.push(`([System.RelatedLinkCount] > 0)`);
            }

            return {
                wiql: `SELECT [System.Id], 
                    [System.WorkItemType], 
                    [System.AssignedTo], 
                    [System.Title], 
                    [System.State], 
                    [System.AttachedFileCount], 
                    [System.RelatedLinkCount],
                    [System.Tags]
                FROM WorkItems
                WHERE ${wiqlWhereClauses.join(" AND ")}
                ORDER BY [System.ChangedDate] DESC`,
            };
        }

        return { error: "Specify at least 3 chars for the keyword" };
    }
}

export var Instance: IWorkItemSearch = new WorkItemSearch();
