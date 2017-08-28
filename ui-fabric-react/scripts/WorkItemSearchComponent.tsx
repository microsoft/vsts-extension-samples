// react imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// office-ui-fabric-react imports
import { TextField } from 'OfficeFabric/components/TextField/TextField';
import { Checkbox } from 'OfficeFabric/components/Checkbox/Checkbox';
import { DefaultButton } from 'OfficeFabric/Button';
import { Label } from 'OfficeFabric/components/Label/Label';
import { MessageBar } from 'OfficeFabric/components/MessageBar/MessageBar';
import { MessageBarType } from 'OfficeFabric/components/MessageBar/MessageBar.Props';
import { DetailsList } from 'OfficeFabric/components/DetailsList/DetailsList';

// vsts imports
import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";

import {
    Instance as WorkItemSearch,
    IWorkItemSearchFilter,
    IWorkItemSearchResult,
    IWiqlQueryResult
} from "./WorkItemSearch";

interface IWorkItemSearchProps {

}

interface IWorkItemSearchState {
    querying?: boolean;
    filter?: IWorkItemSearchFilter;
    result?: IWorkItemSearchResult;
}

class WorkItemSearchComponent extends React.Component<IWorkItemSearchProps, IWorkItemSearchState> {
    private _widths = [50, 100, 150, 300, 150, 150, 200];

    constructor(props?: IWorkItemSearchProps) {
        super(props);
        this.state = this._getDefaultState();
    }

    public render(): JSX.Element {
        let filter = this.state.filter;
        let filterSection = <div className="filter-section">
            <TextField placeholder="Enter a keyword to search work items" className="keyword" onChanged={this._onKeywordChange.bind(this)} value={filter.keyword} onKeyPress={this._onKeywordKeypress.bind(this)} />
            <div className="filters">
                <Checkbox label='Assigned to me' onChange={this._onAssignedToMeChange.bind(this)} checked={filter.assignedToMe} className="filter-check" />
                <Checkbox label='Has attachments' onChange={this._onHasAttachmentsChange.bind(this)} checked={filter.hasAttachments} className="filter-check" />
                <Checkbox label='Has links' onChange={this._onHasLinksChange.bind(this)} checked={filter.hasLinks} className="filter-check" />
            </div>
            <div className="actions">
                <DefaultButton onClick={this._onClearClick.bind(this)} className="action-button" split={false}>Clear</DefaultButton>
                <DefaultButton onClick={this._onSearchClick.bind(this)}  split={false} disabled={!this._canSearch(this.state)} className="action-button">Search</DefaultButton>
            </div>
        </div>;

        let result = this.state.result;
        let resultSection: JSX.Element = null;
        if (result.queryResult) {
            if (result.queryResult.workItems.length > 0) {
                resultSection = this._getWorkItemsList(result.queryResult);
            }
            else {
                resultSection = <MessageBar messageBarType={MessageBarType.info}>No work items found</MessageBar>
            }
        } else if (result.error) {
            resultSection = <MessageBar messageBarType={MessageBarType.error}>{result.error}</MessageBar>
        } else if (this.state.querying) {
            resultSection = <Label>Querying...</Label>;
        }

        return (
            <div className="work-item-search">
                {filterSection}
                {resultSection}
            </div>
        );

    }

    private _canSearch(state: IWorkItemSearchState): boolean {
        return !state.querying && WorkItemSearch.filterValid(state.filter);
    }

    private _getWorkItemsList(queryResult: IWiqlQueryResult): JSX.Element {
        let columns = queryResult.columns.map((c, i) => { return { key: c.referenceName, name: c.name, fieldName: c.referenceName, minWidth: this._widths[i] } });
        let items = queryResult.workItems.map(wi => wi.fields);

        return <DetailsList
            columns={columns}
            items={items}
            setKey='set'
            onItemInvoked={(item) => {
                WorkItemFormNavigationService.getService().then(svc => {
                    svc.openWorkItem(item["System.Id"]);
                });
            }}
        />
    }

    private _getDefaultState(): IWorkItemSearchState {
        return {
            querying: false,
            filter: {
                keyword: "",
                assignedToMe: false,
                hasAttachments: false,
                hasLinks: false
            },
            result: {}
        };
    }

    private _onKeywordChange(newValue: string): void {
        this.state.filter.keyword = newValue;
        this.setState(this.state);
    }

    private _onKeywordKeypress(ev: React.KeyboardEvent<HTMLInputElement>): void {
        if (ev.which === 13 && this._canSearch(this.state)) { // Enter
            this.state.filter.keyword = ev.currentTarget.value;
            this._performSearch();
        }
    }

    private _onAssignedToMeChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
        this.state.filter.assignedToMe = isChecked;
        this.setState(this.state);
    }

    private _onHasAttachmentsChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
        this.state.filter.hasAttachments = isChecked;
        this.setState(this.state);
    }

    private _onHasLinksChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
        this.state.filter.hasLinks = isChecked;
        this.setState(this.state);
    }

    private _onClearClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this.setState(this._getDefaultState());
    }

    private _onSearchClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this._performSearch();
    }

    private _performSearch(): void {
        this._setSearchResult(true, {});
        WorkItemSearch.begingetResult(this.state.filter).then((result: IWorkItemSearchResult) => {
            this._setSearchResult(false, result);
        });
    }

    private _setSearchResult(querying: boolean, result: IWorkItemSearchResult): void {
        this.setState({ querying, result });
    }
}

export function init(containerId: string): void {
    ReactDOM.render(<WorkItemSearchComponent />, document.getElementById(containerId));
}
