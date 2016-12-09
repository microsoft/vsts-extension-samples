import VCContracts = require("TFS/VersionControl/Contracts");

export interface IIdentity {
    displayName: string;
    uniqueName: string;
    imageUrl?: string;
}

export interface IPullRequestState {
    state: string;
    iconClass: string;
    stateClass: string;
}

export interface IPullrequest {
    id: number;
    name: string;
    lastUpdated: Date;
    user: IIdentity;
    uri: string;
    status: IPullRequestState;
}

export interface IModel {
    identities: IIdentity[];
    pullRequests: IPullrequest[];
    workItemIds: number[];
}