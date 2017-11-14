/// <reference types="vss-web-extension-sdk" />

import { ConfigurationContext } from 'VSS/Common/Contracts/Platform';
import { Widget } from '../widget/Widget';
import { AnalyticsWidgetSettings, WidgetSettings } from '../common/WidgetSettings';

import * as Q from 'q';
import * as React from 'react';

import { Props, State, ComponentBase, ActionsBase, ActionCreator } from "../components/FluxTypes";
import { Project, Team, WorkItemTypeField } from "../data/AnalyticsTypes";
import {FieldFilterConfigurationState} from "../common/FieldFilterContracts"

import { Store } from "VSS/Flux/Store";
import { MetadataInformation} from "../data/MetadataQuery";
import { AggregationConfigurationState } from '../common/AggregationContracts';


export interface QueryConfigProps extends Props {
    onChange: (WidgetSettings) => void;
    initialConfiguration: AnalyticsWidgetSettings;
}

/**
 * Encapsulates allowed value information in the *current* configuration.
 */
export interface ConfigOptions {
    projects: Project[];
    teams: Team[];
    /**
     * Describes the set of type-fields. Intermediate object used to construct lists of types and fields.
     */
    typeFields: WorkItemTypeField[];

    types: string[];
    fields: WorkItemTypeField[];    
    /** A list of tuples covering allow values for the rows. */
    fieldFilter: FieldFilterConfigurationState;

    aggregation: AggregationConfigurationState;

    metadata: MetadataInformation;
}

export interface AnalyticsConfigState extends State {
    configOptions: ConfigOptions; // Current Settings in an active config.
    configuration: AnalyticsWidgetSettings; // Loaded settings from the previous save state.
}