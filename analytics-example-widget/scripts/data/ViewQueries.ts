/// <reference types="vss-web-extension-sdk" />
import { ODataClient } from "./ODataClient";
import { ICacheableQuery } from "./ICacheableQuery";

import { getService } from "VSS/Service";
import { CacheableQueryService } from "./CacheableQueryService";
import { mapReferenceNameForQuery, MetadataInformation, MetadataQuery } from './MetadataQuery';

import { FieldFilterRowSettings } from "../common/FieldFilterContracts";

export interface BurndownQueryOptions {
    projectId: string;
    teamId: string;
    workItemType: string;

    fields: FieldFilterRowSettings[];
}

/** Represents a breakdown of work "effort", grouped by Date, WorkItemType and StateCategory*/
export interface GroupedWorkItemAggregation {
    DateSK: number;
    StateCategory: string;
    AggregatedValue: number;
}

/**
 * Implements a custom query of Burndown data, as customized by user.
 */
export class BurndownResultsQuery implements ICacheableQuery<GroupedWorkItemAggregation[]> {
    private burndownQueryOptions: BurndownQueryOptions
    constructor(burndownQueryOptions: BurndownQueryOptions) {
        this.burndownQueryOptions = burndownQueryOptions;
    }

    public getKey(): string {
        return `burndown(${JSON.stringify(this.burndownQueryOptions)})`;
    }

    public runQuery(): IPromise<GroupedWorkItemAggregation[]> {
        return ODataClient.getInstance().then((client) => {

            let entity = "WorkItemSnapshot";
            let teamFilter = `Teams/any(t:t/TeamSK eq ${this.burndownQueryOptions.teamId})`;
            let typeFilter = `(WorkItemType eq '${this.burndownQueryOptions.workItemType}')`;
            let timeFilter = `(DateValue ge 2017-09-01Z and DateValue le 2017-11-28Z)`;

            let filter = `${teamFilter} and ${typeFilter} and ${timeFilter}`;
            if (this.burndownQueryOptions.fields != null && this.burndownQueryOptions.fields.length > 0) {
                filter += ` and ${this.makeFilters(this.burndownQueryOptions.fields)}`;
            }
            let groupFields = `DateSK, StateCategory`;
            let aggregation = `$count as AggregatedValue`;
            let aggregationQuery = `${entity}?$apply=filter(${filter})/groupby((${groupFields}),aggregate(${aggregation}))`;


            let fullQueryUrl = client.generateProjectLink(this.burndownQueryOptions.projectId, aggregationQuery);
            return client.runGetQuery(fullQueryUrl).then((results: GroupedWorkItemAggregation) => {
                return results["value"];
            });
        });
    }

    private makeFilters(filterRow: FieldFilterRowSettings[]) {
        return `(${filterRow.map(o => { return this.makeFilter(o); }).join(" and ")})`;
    }

    private makeFilter(filterRow: FieldFilterRowSettings) {
        let optQuotes = filterRow.fieldType === "String" ? "'" : "";
        return `(${filterRow.fieldQueryName} ${filterRow.operator} ${optQuotes}${filterRow.value}${optQuotes})`;
    }
}