import { ODataClient } from "./ODataClient";
import { Project, Team, WorkItemTypeField, AnalyticsDate } from "./AnalyticsTypes";
import { ICacheableQuery } from "./ICacheableQuery";

import { getService } from "VSS/Service";
import { CacheableQueryService } from "./CacheableQueryService";
import { MetadataQuery, mapReferenceNameForQuery } from "./MetadataQuery";


export interface PopularValueQueryOptions {
    projectId: string;
    teamId: string;
    workItemType: string;
    fieldName: string;
}

/** Represents a breakdown of work "effort", grouped by Date, WorkItemType and StateCategory*/
export interface PopularValueQueryResults {
    Value: string;
    Frequency: number;
}


/**
 * Collects common values for the specified field.
 */
export class PopularValueQuery implements ICacheableQuery<PopularValueQueryResults[]> {
    private popularValueQueryOptions: PopularValueQueryOptions;
    constructor(popularValueQueryOptions: PopularValueQueryOptions) {
        this.popularValueQueryOptions = popularValueQueryOptions;
    }


    public getKey(): string {
        return `PopularValues(${JSON.stringify(this.popularValueQueryOptions)})`;
    }

    public runQuery(): IPromise<PopularValueQueryResults[]> {
        return getService(CacheableQueryService).getCacheableQueryResult(new MetadataQuery(this.popularValueQueryOptions.projectId, MetadataQuery.WorkItemSnapshot)).then(result => {
            return ODataClient.getInstance().then((client) => {

                let entity = "WorkItemSnapshot";
                let teamFilter = `Teams/any(t:t/TeamSK eq ${this.popularValueQueryOptions.teamId})`;
                let typeFilter = `(WorkItemType eq '${this.popularValueQueryOptions.workItemType}')`;                

                let filter = `${teamFilter} and ${typeFilter}`;
                let fieldQueryingname = mapReferenceNameForQuery(this.popularValueQueryOptions.fieldName, result);
                let groupFields = `${fieldQueryingname}`;
                let aggregation = `$count as Frequency`;
                let aggregationQuery = `${entity}?$apply=filter(${filter})/groupby((${groupFields}),aggregate(${aggregation}))`;

                let fullQueryUrl = client.generateProjectLink(this.popularValueQueryOptions.projectId, aggregationQuery);
                return client.runGetQuery(fullQueryUrl).then((results: any) => {
                    let resultSet = results["value"];
                    if (resultSet === undefined) {
                        return [];
                    } else {
                        resultSet.forEach(element => {
                            //Re-map the field name to be "Value" for strong type consistency
                            let temp = element[fieldQueryingname];
                            element.Value = temp;
                        });
                        return resultSet;
                    }
                });
            });
        });
    }
}