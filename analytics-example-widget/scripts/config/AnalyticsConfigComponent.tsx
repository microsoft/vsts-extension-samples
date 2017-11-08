/// <reference types="vss-web-extension-sdk" />
import { WorkItemField } from 'TFS/WorkItemTracking/Contracts';

import { ConfigurationContext } from 'VSS/Common/Contracts/Platform';
import { Widget } from '../widget/Widget';
import { AnalyticsWidgetSettings, WidgetSettings } from '../common/WidgetSettings';

import * as Q from 'q';
import * as React from 'react';

import { Props, State, ComponentBase, ActionsBase, ActionCreator } from "../components/FluxTypes";
import { Project, Team, WorkItemTypeField } from "../data/AnalyticsTypes";

import { Store } from "VSS/Flux/Store";
import { Picker, PickerProps } from "../components/PickerComponent";
import { FieldFilterComponent } from "../components/FieldFilterComponent";

import { AnalyticsConfigState, ConfigOptions, QueryConfigProps } from "./AnalyticsConfigInterfaces";
import { AnalyticsConfigActionCreator } from "./AnalyticsConfigActionCreator";
import { FieldFilterConfigurationState, FieldFilterRowSettings } from "../common/FieldFilterContracts";


export class AnalyticsConfigComponent extends ComponentBase<QueryConfigProps, AnalyticsConfigState> {
    protected actionCreator: AnalyticsConfigActionCreator;

    public render(): JSX.Element {
        return <div className="bowtie widget-config-component">
            <div className="project-team-selector">
                <label>Team</label>
                {this.createProjectPicker()}
                {this.createTeamPicker()}
            </div>

            <div>
                <label>Work Items</label>
                {this.createTypesPicker()}
            </div>

            <div>
                <label>Filters</label>
                {this.createFieldsPicker()}
            </div>

            <div>
                <label>Aggregate on</label>
            </div>
        </div>;

    }

    private createProjectPicker(): JSX.Element {
        let itemValues = [];
        let initialSelectionId = null;

        if (this.getStoreState().configOptions && this.getStoreState().configOptions.projects) {
            itemValues = this.getStoreState().configOptions.projects;
            initialSelectionId = this.getStoreState().configuration.projectId;            
        }

        return <Picker
            className="project-picker"
            waterMarkText="Loading"

            itemValues={itemValues}
            initialSelectionId={initialSelectionId}
            getItemId={(item: Project) => item.ProjectId}
            getItemText={(item: Project) => item.ProjectName}
            onChange={(item: Project) => { 
                this.actionCreator.setSelectedProject(item.ProjectId);                
            }}></Picker>;
    }

    private createTeamPicker(): JSX.Element {
        let itemValues = [];
        let initialSelectionId = null;        

        if (this.getStoreState().configOptions && this.getStoreState().configOptions.teams) {
            itemValues = this.getStoreState().configOptions.teams;
            initialSelectionId = this.getStoreState().configuration.teamId;            
        }

        return <Picker
            className="team-picker"
            waterMarkText="Please select a Project first"
            itemValues={itemValues}
            initialSelectionId={initialSelectionId}
            getItemId={(item: Team) => item.TeamId}
            getItemText={(item: Team) => item.TeamName}
            onChange={(item: Team) => {
                    this.actionCreator.setSelectedTeam(item.TeamId);
            }}></Picker>;
    }


    private createTypesPicker(): JSX.Element {
        let itemValues = [];
        let initialSelectionId = null;

        if (this.getStoreState().configOptions && this.getStoreState().configOptions.types) {

            //Extract the work item types, and reduce to unique set, and sort Alphabetically by name.
            itemValues = this.getStoreState().configOptions.types;
            initialSelectionId = this.getStoreState().configuration.workItemType;            
        }

        return <Picker
            className="type-picker"
            waterMarkText="Please select a Project first"
            itemValues={itemValues}
            initialSelectionId={initialSelectionId}
            getItemId={(typeName: string) => typeName}
            getItemText={(typeName: string) => typeName}
            onChange={(typeName: string) => {                
                    this.actionCreator.setSelectedWorkItemType(typeName);                
            }}></Picker>;
    }

    private createFieldsPicker(): JSX.Element {
        let filter = {} as FieldFilterConfigurationState;
        let actOnChanges = false;

        if (this.getStoreState().configOptions && this.getStoreState().configOptions.fieldFilter) {

            //Extract the work item types, and reduce to unique set, and sort Alphabetically by name.
            filter = this.getStoreState().configOptions.fieldFilter;
            actOnChanges = true;
            return <FieldFilterComponent {...filter}></FieldFilterComponent>;
        }
        return;
    }



    protected createActionCreator(): ActionCreator<AnalyticsConfigState> {
        return new AnalyticsConfigActionCreator(this.actions, this.props.initialConfiguration, this.props.onChange);
    }
}

