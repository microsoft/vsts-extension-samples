import * as React from "react";

import { IModel, IIdentity, IPullrequest } from "./model";
import { WorkDetailsData } from "./workdetailsdata";
import { AssignedComponent } from "./components/assignedto";
import { DevDetailsComponent } from "./components/devdetails";
import { SpinnerComponent } from "./components/spinner";

export interface IMainComponentProps extends React.Props<void> {
}

enum LoadingState {
    None,
    Loading,
    Loaded
}

export interface IMainComponentState {
    model: IModel;
    loadState: LoadingState;
}

export class MainComponent extends React.Component<IMainComponentProps, IMainComponentState> {
    constructor() {
        super();
        this.state = {
            model: null,
            loadState: LoadingState.None
        };
    }

    public setWorkItemIds(ids: number[]): void {
        // Filter ids to ignore temporary and unparented rows
        ids = ids.filter(id => id > 0);

        if (ids.length == 0) {
            this.setState({
                model: null,
                loadState: LoadingState.Loaded
            });
            return;
        }

        if (this.state && this.state.model) {
            let previousIds = this.state.model.workItemIds;
            // if no change do nothing
            if (ids.length === previousIds.length && ids.every(id => previousIds.indexOf(id) !== -1)) {
                return;
            }
        }

        this.setState({
            model: null,
            loadState: LoadingState.Loading
        });

        var context = VSS.getWebContext();
        WorkDetailsData.beginGetWorkDetails(context.project.id, context.team.id, ids).then((model: IModel) => {
            this.setState({
                model: model,
                loadState: LoadingState.Loaded
            });
        })
    }

    public render(): JSX.Element {
        if (!this.state || this.state.loadState === LoadingState.None) {
            return <div>
                Please select a valid item to see work details.
            </div>;
        }

        if (this.state.loadState === LoadingState.Loaded) {
            let model: IModel = this.state.model;
            return <div>
                <AssignedComponent backlogDetailsModel={ model } />
                <DevDetailsComponent backlogDetailsModel={ model } />
            </div>;
        } else if (this.state.loadState === LoadingState.Loading) {
            return <SpinnerComponent />
        }

        // Not loading, no data set, show nothing
        return null;
    }

    private _onClick() {
        this.setWorkItemIds([1]);
    }
}

