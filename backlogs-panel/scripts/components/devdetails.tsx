import * as React from "react";
import { IDetailsWidgetProps } from "../interfaces";
import { BaseWidgetComponent } from "./widgetbase";
import { IPullrequest, IPullRequestState } from "../model";

import VCContracts = require("TFS/VersionControl/Contracts");

// 'DevDetailsComponent' to render pullRequests associated with a workitem
export class DevDetailsComponent extends BaseWidgetComponent<void> {
    public render(): JSX.Element {
        if (!this.props.backlogDetailsModel || !this.props.backlogDetailsModel.pullRequests) {
            return null;
        }

        let pullRequests = this.props.backlogDetailsModel.pullRequests;

        return <div className="widget">
            <div className="title">Development</div>
            <div className="content">
                {pullRequests.map((pullrequest, index) => {
                    return <div key={pullrequest.id} className="pull-request-item">
                        <div className="pull-request-icon">
                            <span className="icon bowtie-icon bowtie-tfvc-pull-request"></span>
                        </div>
                        <div className="pull-request-data">
                            <div className="pull-request-primary-data">
                                <span className="pull-request-assigned-to-icon"><img src={ pullrequest.user.imageUrl } /></span>
                                <span className="pull-request-primary-data">
                                    <a href={ pullrequest.uri } target="_blank">
                                        { pullrequest.name }
                                    </a>
                                </span>
                            </div>
                            <div className="pull-request-secondary-data">
                                <span>Created on { pullrequest.lastUpdated.toLocaleDateString() }</span>,&nbsp;<PullRequestState status={ pullrequest.status } />                               
                            </div>
                        </div>
                    </div>;
                }) }
            </div>
        </div>;
    }
} 

// 'PullRequestState' renders pullRequest state
class PullRequestState extends React.Component<{ status: IPullRequestState }, void> {
    public render(): JSX.Element {
        return <span><span className={ this.props.status.iconClass }></span>&nbsp;{ this.props.status.state }</span>;
    }
}