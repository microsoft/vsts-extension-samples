/// <reference types="vss-web-extension-sdk" />
import { AllowedOperator, FieldFilterRowData, FieldFilterRowSettings } from '../common/FieldFilterContracts';
import { WorkItemField } from 'TFS/WorkItemTracking/Contracts';

import { ConfigurationContext } from 'VSS/Common/Contracts/Platform';
import { Widget } from '../widget/Widget';
import { AnalyticsWidgetSettings, WidgetSettings } from '../Common/WidgetSettings';
import { AggregationMode, Aggregation, AggregationConfigurationState} from '../Common/AggregationContracts';

import * as Q from 'q';
import * as React from 'react';

import { Props, State, ComponentBase, ActionsBase, ActionCreator } from "../components/FluxTypes";
import { Project, Team, WorkItemTypeField } from "../data/AnalyticsTypes";

import { Store } from "VSS/Flux/Store";
import { Picker, PickerProps } from "../components/PickerComponent";

import { ODataClient } from "../data/OdataClient";
import { ProjectsQuery, TeamsQuery, WitFieldsQuery } from "../data/CommonQueries";
import { PopularValueQuery, PopularValueQueryOptions, PopularValueQueryResults } from "../data/PopularValueQuery";
import { AnalyticsConfigState, ConfigOptions, QueryConfigProps } from "./AnalyticsConfigInterfaces";
import { getService } from "VSS/Service";
import { CacheableQueryService } from "../data/CacheableQueryService";
import { MetadataQuery, MetadataInformation, hasMetadataMapping, mapReferenceNameForQuery } from "../data/MetadataQuery";

/** Responsible for handling events and translating them into service operations.  
  */
export class AnalyticsConfigActionCreator extends ActionCreator<AnalyticsConfigState>{
    // Config UI state + Configuration information for the widget
    private state: AnalyticsConfigState;

    //change notification event method monitored by Config View, which needs to communicate to widget Framework to save & repaint widget.
    private onConfigurationChange: (AnalyticsWidgetSettings) => void;


    constructor(actions: ActionsBase, configuration: AnalyticsWidgetSettings, onConfigurationChange: (AnalyticsWidgetSettings) => void) {
        super(actions);
        this.state = {
            configOptions: {
                projects: [],
                teams: [],

                types: [],
                fields: [],
                typeFields: [],
                fieldFilter: {
                    fieldFilterRowValues: [],
                    addRow: () => {
                        this.addFieldFilterRow();
                    }
                },
                aggregation: {
                    aggregationModes: this.getAllowedAggregationModes(),
                    allowedFields: []
                }
            },
            configuration: configuration
        } as AnalyticsConfigState;

        if (configuration.fields != null) {
            configuration.fields.forEach(o => {
                this.addFilterRowImpl(o); // Adds the saved field filter data to the current display.
            });
        }
        this.onConfigurationChange = onConfigurationChange;
    }

    public getInitialState(): AnalyticsConfigState {
        return this.state;
    }

    public requestData(): IPromise<AnalyticsConfigState> {
        if (!this.state.configuration.projectId) {
            this.state.configuration.projectId = VSS.getWebContext().project.id;
            this.state.configuration.teamId = VSS.getWebContext().team.id;
        }

        if (!this.state.configuration.aggregation) {
            this.state.configuration.aggregation = { aggregationMode: AggregationMode.count, displayName: null, queryableName: null, fieldReferenceName: null}
        }

        return getService(CacheableQueryService).getCacheableQueryResult(new ProjectsQuery()).then(projects => {
            this.state.configOptions.projects = projects;
            this.notifyListenersOfStateChange(this.state);

            //If we have a project selected, keep loading on other data.
            let teamPromise = this.state.configuration.projectId ? this.loadTeams(this.state.configuration.projectId) : this.endChain();
            return teamPromise.then((teams) => {
                return this.loadTypeFields(this.state.configuration.projectId).then(() => {
                    return this.state;
                });
            });
        });
    }

    private loadTeams(projectId: string): IPromise<AnalyticsConfigState> {
        return getService(CacheableQueryService).getCacheableQueryResult(new TeamsQuery(projectId)).then(teams => {
            this.state.configOptions.teams = teams;

            if (!this.state.configuration.teamId) {
                this.state.configuration.teamId = teams[0].TeamId;
            }
            this.notifyListenersOfStateChange(this.state);
            return this.state;
        });
    }

    private loadTypeFields(projectId: string): IPromise<AnalyticsConfigState> {
        return getService(CacheableQueryService).getCacheableQueryResult(new MetadataQuery(projectId, MetadataQuery.WorkItemSnapshot)).then(metadata => {
            this.state.configOptions.metadata = metadata;
            return getService(CacheableQueryService).getCacheableQueryResult(new WitFieldsQuery(projectId)).then(typeFields => {
                this.state.configOptions.typeFields = typeFields;
                if (typeFields) {
                    this.state.configOptions.types = this.filterUniqueTypes(typeFields, projectId);

                    //if work item type isn't selected, choose a default. For sample purpose, use the first type.
                    if (this.state.configuration.workItemType == null) {
                        if (this.state.configOptions.types.length > 0) {
                            this.state.configuration.workItemType = this.state.configOptions.types[0];
                        } else {
                            throw "No WorkItemTypes were found on the active project.";
                        }

                    }

                    this.state.configOptions.fields = this.filterFieldsOfType(typeFields, this.state.configuration.workItemType, projectId, this.state.configOptions.metadata,(o)=>{ return this.isAcceptedFilterField(o);});
                    this.updateFieldFilterControlOptions();
                    this.updateAggregationControlOptions();
                    return this.state;
                }
                this.notifyListenersOfStateChange(this.state);
                return this.state;
            });
        })
    }

    private loadSuggestedFieldValues(projectId: string, teamId: string, workItemType: string, fieldName: string): IPromise<AnalyticsConfigState> {
        let params = {
            projectId: projectId,
            teamId: teamId,
            workItemType: workItemType,
            fieldName: fieldName
        };
        return getService(CacheableQueryService).getCacheableQueryResult(new PopularValueQuery(params)).then(results => {
            let suggestedValues = this.sortAllowedValues(results);
            //Update Fields matching the result FieldName.            
            this.state.configOptions.fieldFilter.fieldFilterRowValues.forEach(o => {
                if (o.settings.fieldReferenceName == fieldName) {
                    o.suggestedValues = suggestedValues;
                    if (o.settings.value == null) {
                        o.settings.value = (o.suggestedValues.length > 0) ? o.suggestedValues[0] : null;
                    }
                }
            });
            return this.state;
        });
    }

    private endChain(): IPromise<AnalyticsConfigState> {
        this.notifyListenersOfStateChange(this.state);
        let state = Q(this.state);
        return state as IPromise<AnalyticsConfigState>;
    }

    /** Notify the contained UI to update state and signal to the parent config(which will pass a state change event to Dashboard, if the config is valid) */
    public notifyListenersOfStateChange(state: AnalyticsConfigState, notifyParentOfConfigChange: boolean = true): void {
        this.exposeLatestFilters(state);
        super.notifyListenersOfStateChange(state);
        if (notifyParentOfConfigChange) {
            this.onConfigurationChange(state.configuration);
        }
    }



    /** Get Unique Work Item Types from analytics-supplied list of WorkItemTypeFields. Map out the work Item Type name, filter unique, and sort. */
    private filterUniqueTypes(typeFields: WorkItemTypeField[], projectId: string): string[] {
        return typeFields
            .filter((o) => {
                //Operate at project scope.
                return o.ProjectSK == projectId;
            })
            .map((o) => {
                return o.WorkItemType
            })
            .filter((item, i, arr) => {
                return arr.indexOf(item) === i;
            })
            .sort((a, b) => {
                return a.localeCompare(b);
            });
    }

    /**
     * Returns Fields of specified type in the supplied project, which are interesting to use in a field picker scenario.
     */
    private filterFieldsOfType(typeFields: WorkItemTypeField[], activeTypeName: string, projectId: string, metadata: MetadataInformation, isAcceptedField: (WorkItemTypeField)=>boolean) : WorkItemTypeField[]{
        return typeFields
            .filter((o) => {
                //Ensure uniqueness at project-type scope, and filter for supported fields
                return o.WorkItemType === activeTypeName
                    && o.ProjectSK === projectId
                    && hasMetadataMapping(o.FieldReferenceName, metadata)

                    && isAcceptedField(o)
            })
            .sort((a, b) => {
                return a.FieldName.localeCompare(b.FieldName);
            });
    }

    private sortAllowedValues(results: PopularValueQueryResults[]): string[] {
        //Ensure the values are exposed as sorted strings
        return results.map(o => {
            return (o.Value != null) ? "" + o.Value : "";
        })
            .sort((a, b) => { return a.localeCompare(b); });
    }

    /**
     * Filters for accepted filter fields, and discards irrelevant system fields.
     * @param field 
     */
    private isAcceptedFilterField(field: WorkItemTypeField):boolean {
        return ((field.FieldType === "String" ||
        field.FieldType === "Integer" ||
        field.FieldType === "Double")
        && !this.isNoisyField(field));
    }

    /**
     * Filters for accepted Aggregation fields, and discards irrelevant system fields.
     * @param field 
     */
    private isAcceptedAggregationField(field: WorkItemTypeField):boolean {
        return ((field.FieldType === "Integer" ||
            field.FieldType === "Double")
            && !this.isNoisyField(field));
    }

    private isNoisyField(field:WorkItemTypeField):boolean{
        return (field.FieldName === "Rev" ||
            field.FieldName === "ID" ||
            field.FieldName === "Title" ||
            field.FieldName === "Watermark");
    }


    /** If a new project was selected, and load information which uses project scoping. */
    public setSelectedProject(projectId: string): IPromise<AnalyticsConfigState> {
        if (projectId != this.state.configuration.projectId) {
            this.state.configuration.projectId = projectId;

            return this.loadTeams(projectId).then(() => {
                return this.loadTypeFields(projectId);
            });
        }
    }

    /** If a new team was selected, and load information which relies on team scoping. */
    public setSelectedTeam(teamId: string) {
        if (teamId != this.state.configuration.teamId) {
            this.state.configuration.teamId = teamId;
            this.notifyListenersOfStateChange(this.state);
        }
    }

    /** If a new team was selected, reset all downstream state of project-team, and load information which relies on team scoping. */
    public setSelectedWorkItemType(workItemType: string) {
        if (workItemType != this.state.configuration.workItemType) {
            this.state.configuration.workItemType = workItemType;

            this.updateFieldFilterControlOptions();
            this.updateAggregationControlOptions();
            this.notifyListenersOfStateChange(this.state);
        }
    }

    public setSelectedAggregationMode(mode: AggregationMode) {
        if (this.state.configuration.aggregation && mode == this.state.configuration.aggregation.aggregationMode) {
            return;
        }

        this.state.configuration.aggregation = { aggregationMode: mode, displayName: null, queryableName: null, fieldReferenceName: null}
        this.notifyListenersOfStateChange(this.state);
    }

    public setSelectedAggregationValue(field: Aggregation) {
        if (this.state.configuration.aggregation && field.fieldReferenceName == this.state.configuration.aggregation.fieldReferenceName) {
            return;
        }

        this.state.configuration.aggregation = field;
        this.notifyListenersOfStateChange(this.state);
    }

    public loadValues(fieldName: string) {
        let queryOptions = {
            projectId: this.state.configuration.projectId,
            teamId: this.state.configuration.teamId,
            workItemType: this.state.configuration.workItemType,
            fieldName: fieldName
        };
        return getService(CacheableQueryService).getCacheableQueryResult(new PopularValueQuery(queryOptions));

    }

    private getAllowedOperators() {
        return [{
            DisplayText: "=",
            value: " eq ",
        }, {
            DisplayText: "<>",
            value: " ne ",
        }];
    }

    private updateFieldFilterControlOptions() {
        let fields = this.filterFieldsOfType(this.state.configOptions.typeFields, this.state.configuration.workItemType, this.state.configuration.projectId, this.state.configOptions.metadata, (o)=>{return this.isAcceptedFilterField(o)});
        let allowedOperators = this.getAllowedOperators();

        //Update the field Pickers to show options relevant to this type.
        this.state.configOptions.fieldFilter.fieldFilterRowValues.forEach((o) => {
            this.populateFilterRowOptions(o, fields, allowedOperators);
        });
    }

    private updateAggregationControlOptions() {
         //Filter the non integer values to get a list of values that can be Summed.
         let fields = this.filterFieldsOfType(this.state.configOptions.typeFields, this.state.configuration.workItemType, this.state.configuration.projectId, this.state.configOptions.metadata, (o)=>{return this.isAcceptedAggregationField(o)});

         this.state.configOptions.aggregation.allowedFields = fields.map(o => {
             return {
                 aggregationMode: AggregationMode.sum,
                 displayName: o.FieldName,
                 fieldReferenceName: o.FieldReferenceName,
                 queryableName: this.getQueryableAggregationName(o.FieldReferenceName)
             }
         });
    }

    private populateFilterRowOptions(rowData: FieldFilterRowData, fields: WorkItemTypeField[], allowedOperators: AllowedOperator[]): void {
        //Update field picker to reflect current Type.
        rowData.allowedFields = fields;
        rowData.allowedOperators = allowedOperators;

        if (!rowData.settings.fieldReferenceName || rowData.allowedFields.map(o => o.FieldReferenceName).indexOf(rowData.settings.fieldReferenceName) < 0) {
            rowData.settings.fieldReferenceName = fields[0].FieldReferenceName;
            rowData.settings.operator = null;
            rowData.settings.value = null;
        }

        //Set up a default operator if not set
        if (rowData.settings.fieldReferenceName && rowData.settings.operator == null) {
            rowData.settings.operator = allowedOperators[0].value;
        }

        if (rowData.settings.fieldReferenceName) {
            this.loadSuggestedFieldValues(this.state.configuration.projectId, this.state.configuration.teamId, this.state.configuration.workItemType, rowData.settings.fieldReferenceName).then((values) => {
                this.notifyListenersOfStateChange(this.state);
            });
        }
    }

    /**
     * Adds additional rows on the "add row event"
     */
    public addFieldFilterRow() {

        let row = this.addFilterRowImpl({
            fieldType: null,
            operator: null,
            value: null,

            fieldQueryName: null,
            fieldReferenceName: null

        });

        this.notifyListenersOfStateChange(this.state);
    }

    /**
     * Used for creation implementation at load and "Add" event.
     */
    private addFilterRowImpl(settings: FieldFilterRowSettings): FieldFilterRowData {
        let row = {
            allowedFields: this.state.configOptions.fields,
            allowedOperators: this.getAllowedOperators(),
            suggestedValues: [],
            settings: settings,
            removeRow: null

        } as FieldFilterRowData;

        let container = this.state.configOptions.fieldFilter.fieldFilterRowValues;
        container.push(row);
        row.removeRow = () => {
            let position = container.indexOf(row);
            this.removeFieldFilterRow(position);
        };

        row.updateField = (field: WorkItemTypeField) => {
            let position = container.indexOf(row);
            this.updateFieldFilterFieldState(position, field);
        };
        row.updateOperator = (operator: string) => {
            let position = container.indexOf(row);
            this.updateFieldFilterOperatorState(position, operator);
        };
        row.updateValue = (value: string) => {
            let position = container.indexOf(row);
            this.updateFieldFilterValueState(position, value);
        };

        if (this.state.configOptions.typeFields.length && this.state.configOptions.metadata) {
            let fields = this.filterFieldsOfType(this.state.configOptions.typeFields, this.state.configuration.workItemType, this.state.configuration.projectId, this.state.configOptions.metadata, (o)=>{return this.isAcceptedFilterField(o)});
            let allowedOperators = this.getAllowedOperators();
            this.populateFilterRowOptions(row, fields, allowedOperators);
        }

        return row;
    }


    public removeFieldFilterRow(rowIndex: number) {
        this.state.configOptions.fieldFilter.fieldFilterRowValues.splice(rowIndex, 1);
        this.notifyListenersOfStateChange(this.state);
    }

    /**
     * Update visual state of filters to reflect new field, and then ensure the value picker settings for the current state is up to date.
     */
    public updateFieldFilterFieldState(rowIndex: number, field: WorkItemTypeField) {
        let row = this.state.configOptions.fieldFilter.fieldFilterRowValues[rowIndex];
        let priorState = row.settings.fieldReferenceName;
        row.settings.fieldReferenceName = field.FieldReferenceName;
        row.settings.fieldType = field.FieldType;
        row.settings.value = null;
        this.notifyListenersOfStateChange(this.state);

        return getService(CacheableQueryService).getCacheableQueryResult(new MetadataQuery(this.state.configuration.projectId, MetadataQuery.WorkItemSnapshot)).then(metadata => {
            row.settings.fieldQueryName = mapReferenceNameForQuery(field.FieldReferenceName, metadata);

            if (priorState != field.FieldReferenceName) {
                this.loadSuggestedFieldValues(this.state.configuration.projectId, this.state.configuration.teamId, this.state.configuration.workItemType, field.FieldReferenceName).then(() => {
                    this.notifyListenersOfStateChange(this.state);
                })
            }
        });
    }

    /**
     * Update state to reflect new operator selection
     */
    public updateFieldFilterOperatorState(rowIndex: number, operator: string) {
        let settings = this.state.configOptions.fieldFilter.fieldFilterRowValues[rowIndex].settings;
        settings.operator = operator;
        this.notifyListenersOfStateChange(this.state);
    }

    /**
     * Update state to reflect new value selection
     */
    public updateFieldFilterValueState(rowIndex: number, value: string) {
        let settings = this.state.configOptions.fieldFilter.fieldFilterRowValues[rowIndex].settings;
        settings.value = value;
        this.notifyListenersOfStateChange(this.state);
    }

    private exposeLatestFilters(state) {
        this.state.configuration.fields = [];
        this.state.configOptions.fieldFilter.fieldFilterRowValues.forEach((o, i) => {
            this.state.configuration.fields[i] = o.settings;
        })
    }

    private getQueryableAggregationName(fieldReferenceName: string): string {
        return this.state.configOptions.metadata.fieldMappings.find(o => o.referenceName == fieldReferenceName).queryableName;
    }

    private getAllowedAggregationModes(): string[] {
        return [AggregationMode.count.toString(), AggregationMode.sum.toString()];
    }
}