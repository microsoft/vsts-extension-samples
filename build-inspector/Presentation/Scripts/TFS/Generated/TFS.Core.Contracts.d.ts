import WebApi_Contracts = require("VSS/WebApi/Contracts");
export declare enum ConnectedServiceKind {
    Custom = 0,
    AzureSubscription = 1,
    Chef = 2,
    Generic = 3,
}
export interface IdentityData {
    identityIds: string[];
}
export declare enum ProjectChangeType {
    Modified = 0,
    Deleted = 1,
    Added = 2,
}
export interface ProjectInfo {
    abbreviation: string;
    description: string;
    id: string;
    lastUpdateTime: Date;
    name: string;
    properties: ProjectProperty[];
    state: any;
    uri: string;
    version: number;
}
export interface ProjectMessage {
    project: ProjectInfo;
    projectChangeType: ProjectChangeType;
}
export interface ProjectProperty {
    name: string;
    value: string;
}
export interface Proxy {
    description: string;
    friendlyName: string;
    globalDefault: boolean;
    site: string;
    siteDefault: boolean;
    url: string;
}
export declare enum SourceControlTypes {
    Tfvc = 1,
    Git = 2,
}
export interface TeamProject extends TeamProjectReference {
    _links: any;
    capabilities: {
        [key: string]: {
            [key: string]: string;
        };
    };
    defaultTeam: WebApiTeamRef;
}
export interface TeamProjectCollection extends TeamProjectCollectionReference {
    _links: any;
    description: string;
    state: string;
}
export interface TeamProjectCollectionReference {
    id: string;
    name: string;
    url: string;
}
export interface TeamProjectReference {
    abbreviation: string;
    description: string;
    id: string;
    name: string;
    state: any;
    url: string;
}
export interface WebApiConnectedService extends WebApiConnectedServiceRef {
    authenticatedBy: WebApi_Contracts.IdentityRef;
    description: string;
    friendlyName: string;
    id: string;
    kind: string;
    project: TeamProjectReference;
    serviceUri: string;
}
export interface WebApiConnectedServiceDetails extends WebApiConnectedServiceRef {
    connectedServiceMetaData: WebApiConnectedService;
    credentialsXml: string;
    endPoint: string;
}
export interface WebApiConnectedServiceRef {
    id: string;
    url: string;
}
export interface WebApiCreateTagRequestData {
    name: string;
}
export interface WebApiProject extends TeamProjectReference {
    capabilities: {
        [key: string]: {
            [key: string]: string;
        };
    };
    collection: WebApiProjectCollectionRef;
    defaultTeam: WebApiTeamRef;
}
export interface WebApiProjectCollection extends WebApiProjectCollectionRef {
    description: string;
    state: string;
}
export interface WebApiProjectCollectionRef {
    collectionUrl: string;
    id: string;
    name: string;
    url: string;
}
export interface WebApiTagDefinition {
    active: boolean;
    id: string;
    name: string;
    url: string;
}
export interface WebApiTeam extends WebApiTeamRef {
    description: string;
    identityUrl: string;
}
export interface WebApiTeamRef {
    id: string;
    name: string;
    url: string;
}
export declare var TypeInfo: {
    ConnectedServiceKind: {
        enumValues: {
            "custom": number;
            "azureSubscription": number;
            "chef": number;
            "generic": number;
        };
    };
    IdentityData: {
        fields: any;
    };
    ProjectChangeType: {
        enumValues: {
            "modified": number;
            "deleted": number;
            "added": number;
        };
    };
    ProjectInfo: {
        fields: any;
    };
    ProjectMessage: {
        fields: any;
    };
    ProjectProperty: {
        fields: any;
    };
    Proxy: {
        fields: any;
    };
    SourceControlTypes: {
        enumValues: {
            "tfvc": number;
            "git": number;
        };
    };
    TeamProject: {
        fields: any;
    };
    TeamProjectCollection: {
        fields: any;
    };
    TeamProjectCollectionReference: {
        fields: any;
    };
    TeamProjectReference: {
        fields: any;
    };
    WebApiConnectedService: {
        fields: any;
    };
    WebApiConnectedServiceDetails: {
        fields: any;
    };
    WebApiConnectedServiceRef: {
        fields: any;
    };
    WebApiCreateTagRequestData: {
        fields: any;
    };
    WebApiProject: {
        fields: any;
    };
    WebApiProjectCollection: {
        fields: any;
    };
    WebApiProjectCollectionRef: {
        fields: any;
    };
    WebApiTagDefinition: {
        fields: any;
    };
    WebApiTeam: {
        fields: any;
    };
    WebApiTeamRef: {
        fields: any;
    };
};
