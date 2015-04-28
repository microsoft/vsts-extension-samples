import Contributions_Contracts = require("VSS/Contributions/Contracts");
export interface AppsViewModel {
    hasWritePermission: boolean;
    installedApps: Contributions_Contracts.InstalledApp[];
    publishedApps: Contributions_Contracts.App[];
}
export declare enum AreaIterationsMode {
    Iterations = 1,
    Areas = 2,
}
export interface EnablementIssue {
    level: any;
    message: string;
}
export interface ExtensionsViewModel {
    extensions: WebAccessExtensionModel[];
    hasWritePermission: boolean;
    privateExtensionsEnabled: boolean;
}
export interface FeatureInfo {
    featureState: number;
    name: string;
}
export interface FeaturesState {
    featureList: FeatureInfo[];
    partiallyConfigured: boolean;
}
export declare enum InheritanceType {
    Group = 0,
    Token = 1,
}
export declare enum PermissionValue {
    NotSet = 0,
    Allow = 1,
    Deny = 2,
    InheritedAllow = 3,
    InheritedDeny = 4,
}
export interface ProcessTemplateSummary {
    actions: string[];
    id: string;
    isRecommended: boolean;
    issues: EnablementIssue[];
    isValid: boolean;
    name: string;
}
export declare enum SearchIdentityType {
    All = 0,
    Users = 1,
    Groups = 2,
}
export interface WebAccessExtensionModel {
    description: string;
    enabled: boolean;
    hostType: any;
    iconUrl: string;
    id: string;
    installDate: Date;
    isPrivate: boolean;
    moreInfo: string;
    name: string;
    vendor: string;
    version: string;
}
export declare var TypeInfo: {
    AppsViewModel: {
        fields: any;
    };
    AreaIterationsMode: {
        enumValues: {
            "iterations": number;
            "areas": number;
        };
    };
    EnablementIssue: {
        fields: any;
    };
    ExtensionsViewModel: {
        fields: any;
    };
    FeatureInfo: {
        fields: any;
    };
    FeaturesState: {
        fields: any;
    };
    InheritanceType: {
        enumValues: {
            "group": number;
            "token": number;
        };
    };
    PermissionValue: {
        enumValues: {
            "notSet": number;
            "allow": number;
            "deny": number;
            "inheritedAllow": number;
            "inheritedDeny": number;
        };
    };
    ProcessTemplateSummary: {
        fields: any;
    };
    SearchIdentityType: {
        enumValues: {
            "all": number;
            "users": number;
            "groups": number;
        };
    };
    WebAccessExtensionModel: {
        fields: any;
    };
};
