import * as React from "react";
import { IDetailsWidgetProps } from "../interfaces";
import { IIdentity } from "../model";
import { BaseWidgetComponent } from "./widgetbase";

// 'AssignedComponent' to render assignedTo field of a workitem
export class AssignedComponent extends BaseWidgetComponent<void> {
    public render(): JSX.Element {
        let identities = this._renderIdentities();

        return <div className="widget">
            <div className="title">People</div>
            <div className="content assigned-to">
                <ul className="">
                    { identities }
                </ul>
            </div>
        </div>;
    }

    private _renderIdentities() {
        if (this.props.backlogDetailsModel) {
            return this.props.backlogDetailsModel.identities.map(i => {
                return <IdentityComponent key={ i.uniqueName } identity={ i } />;
            });
        }
    }
}

// 'IdentityComponent' to render a identity
class IdentityComponent extends React.Component<{ identity: IIdentity }, void> {
    public render(): JSX.Element {
        return <li><img src={ this.props.identity.imageUrl } />&nbsp;{ this.props.identity.displayName }</li>;
    }
}
