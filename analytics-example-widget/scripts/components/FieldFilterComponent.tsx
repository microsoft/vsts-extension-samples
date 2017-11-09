import { WorkItemTypeField } from '../data/AnalyticsTypes';


import * as Q from 'q';
import * as React from 'react';
import * as FluxTypes from './FluxTypes';

import { Store } from "VSS/Flux/Store";
import { Picker } from './PickerComponent';

import { AllowedOperator, FieldFilterConfigurationState, FieldFilterRowData } from '../common/FieldFilterContracts';

/** Simple implementation of a Field Filter Component. */
export class FieldFilterComponent extends React.Component<FieldFilterConfigurationState, {}> {
    public render(): JSX.Element {

        let content = [];
        content.push(<FieldFilterHeaderComponent />);
        for (let i = 0; i < this.props.fieldFilterRowValues.length; i++) {
            let rowProps = this.props.fieldFilterRowValues[i];
            content.push(<FieldFilterRowComponent {...rowProps}></FieldFilterRowComponent>);
        }        
        content.push(
        <a className="add-filter-row-button" onClick={()=>{this.props.addRow();}}>
            <span role="button" className="bowtie-icon bowtie-math-plus"></span>
            <span className="text">Add criteria</span>
        </a>
        );
        
        return <div className="field-filter">
            {content}
        </div>;

    }   
}

export class FieldFilterRowComponent extends React.Component<FieldFilterRowData, {}> {
    public render(): JSX.Element {
        /*  Note - This example is operating with a Picker control to illustrate ability to select from a known list, which does not allow for manual editing.
            VSS Combo or Fabric ComboBox controls do support hybrid models. */
        return <div className="field-filter">

            <Picker className="field-picker" itemValues={this.props.allowedFields}
                getItemText={(field: WorkItemTypeField)=> {return field.FieldName;}}
                getItemId={(field: WorkItemTypeField)=>{ return field.FieldReferenceName;}}
                initialSelectionId={this.props.settings.fieldReferenceName}
                onChange={(value:WorkItemTypeField)=>{this.props.updateField(value);}}></Picker>

            <Picker className="operation-picker"  itemValues={this.props.allowedOperators}
                getItemText={(operator: AllowedOperator)=> {return operator.DisplayText;}}
                getItemId={(operator: AllowedOperator)=>{ return operator.value;}}
                initialSelectionId={this.props.settings.operator}
                onChange={(value:AllowedOperator)=>{this.props.updateOperator(value.value);}}></Picker>

            
            <Picker className="value-picker"  itemValues={this.props.suggestedValues}
                getItemText={(value: string)=> {return value;}}
                getItemId={(value: string)=>{ return value;}}
                initialSelectionId={this.props.settings.value}
                onChange={(value:string)=>{this.props.updateValue(value);}}></Picker>

            <a className="remove-filter-row-button " onClick={()=>{this.props.removeRow();}}><span role="button" className="bowtie-icon bowtie-edit-delete"></span></a>
        </div>;
    }
}

/** Renders a header row for Field Filter */
export class FieldFilterHeaderComponent extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return <div className="field-filter-header">
            <span className="filter-field-label">Field</span>
            <span className="filter-operation-label">Operation</span>
            <span className="filter-value-label">Value</span>         
        </div>;
    }
}