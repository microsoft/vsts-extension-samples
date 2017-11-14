/// <reference types="vss-web-extension-sdk" />
import { ODataClient } from "./ODataClient";
import { ICacheableQuery } from "./ICacheableQuery";

import { getService } from "VSS/Service";
import { CacheableQueryService } from "./CacheableQueryService";
import { mapReferenceNameForQuery, MetadataInformation, MetadataQuery } from './MetadataQuery';

import { FieldFilterRowSettings } from "../common/FieldFilterContracts";
import { Aggregation, AggregationMode } from "../common/AggregationContracts";

export interface BurndownQueryOptions {
    projectId: string;
    teamId: string;
    workItemType: string;

    fields: FieldFilterRowSettings[];

    aggregation: Aggregation;

    startDate: Date;
    endDate: Date;
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

            let endDate: string = this.formatDate(this.burndownQueryOptions.endDate);
            let startDate: string = this.formatDate(this.burndownQueryOptions.startDate);

            let entity = "WorkItemSnapshot";
            let teamFilter = `Teams/any(t:t/TeamSK eq ${this.burndownQueryOptions.teamId})`;
            let typeFilter = `(WorkItemType eq '${this.burndownQueryOptions.workItemType}')`;
            //Apply a filter to select work bounded by the supplied dates
            let timeFilter = `(DateValue ge ${startDate}Z and DateValue le ${endDate}Z)`;
            
            let filter = `${teamFilter} and ${typeFilter} and ${timeFilter}`;
            if (this.burndownQueryOptions.fields != null && this.burndownQueryOptions.fields.length > 0) {
                filter += ` and ${this.makeFilters(this.burndownQueryOptions.fields)}`;
            }
            let groupFields = `DateSK, StateCategory`;

            let selectedAggregation = this.burndownQueryOptions.aggregation;
            
            let aggregationMode = selectedAggregation.aggregationMode;
            let aggregationSumValue = selectedAggregation.queryableName;
            let aggregation = ``;

            if (aggregationMode == AggregationMode.sum) {
                aggregation = `${aggregationSumValue} with sum`;
            } else {
                aggregation = `$count`;
            }

            aggregation += ` as AggregatedValue`;
            let aggregationQuery = `${entity}?$apply=filter(${filter})/groupby((${groupFields}),aggregate(${aggregation}))`;


            let fullQueryUrl = client.generateProjectLink(this.burndownQueryOptions.projectId, aggregationQuery);
            return client.runGetQuery(fullQueryUrl).then((results: GroupedWorkItemAggregation) => {
                return results["value"];
            });
        });
    }

    /**
     *   Format the date as "YYYY-MM-DD"
     */
    private formatDate(date: Date): string {
        return date.toISOString().substring(0, 10);
    }

    private makeFilters(filterRow: FieldFilterRowSettings[]) {
        return `(${filterRow.map(o => { return this.makeFilter(o); }).join(" and ")})`;
    }

    private makeFilter(filterRow: FieldFilterRowSettings) {
        let optQuotes = filterRow.fieldType === "String" ? "'" : "";
        return `(${filterRow.fieldQueryName} ${filterRow.operator} ${optQuotes}${filterRow.value}${optQuotes})`;
    }
}