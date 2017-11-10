
import * as Q from 'q';
import * as React from 'react';
import * as FluxTypes from '../components/FluxTypes';

import { Store } from "VSS/Flux/Store";

export interface PickerProps<T> {
    /** Used for presentational styling */
    className: string;

    itemValues: T[];
    initialSelectionId: string;

    /**Mapping methods for translating data shapes. Model should be factored to normalize in the Action Creator layer, to cut down on UI handling. */
    getItemText: (T) => string;
    getItemId: (T) => string;
    onChange?(item: T);
}


/** Facade for combo box implementation. 
 * Note: A VSS developer would most likely use a Fabric ComboBox with React or VSS Combo if operating against VSTS controls model, as part of a full fledged implementation.
 * We are omitting Fabric usage, in favor of a stock component with known limitations to avoid extra dependency & build/deploy process baggage in this sample.
 */
export class Picker<T> extends React.Component<PickerProps<T>, {}> {
    selectedItem: T;
    public render(): JSX.Element {
        let defaultValue = this.props.initialSelectionId != null ? this.props.initialSelectionId : undefined;
        let classes = (this.props.itemValues.length == 0) ? this.props.className + " is-empty" : this.props.className;
        return (<select className={classes} value={defaultValue} onChange={(event: React.FormEvent<HTMLSelectElement>) => this.onSelected(event)} >{this.getOptions()}</select>);

    }

    private getOptions() {
        let values = [];
        if (this.props.itemValues && this.props.itemValues.length > 0) {
            if (!this.props.initialSelectionId) {
                values.push(<option key={-1} selected disabled style={{ display: "none" }}></option>);
            }
            for (let i = 0; i < this.props.itemValues.length; i++) {
                let item = this.props.itemValues[i];
                values.push(<option key={i} value={this.props.getItemId(item)}>{this.props.getItemText(item)}</option>);
            }
        }
        return values;
    }

    private onSelected(event: React.FormEvent<HTMLSelectElement>) {
        let target = (event.target as any);
        let index = target.selectedIndex;
        // The default picker implementaiton doesn't detect changes if it auto-selects initial choice. The stock impl is sad.    
        if (!this.props.initialSelectionId) {
            index--;
        }
        this.selectedItem = this.props.itemValues[index];
        if (this.props.onChange) {
            this.props.onChange(this.selectedItem);
        }
    }
}