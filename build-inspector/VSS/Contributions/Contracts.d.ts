export interface App extends AppManifest {
    id: string;
    publishInfo: AppPublishInfo;
}
export interface AppInstallationState {
    enabled: boolean;
    lastUpdated: Date;
    lastUpdatedBy: string;
}
export interface AppManifest {
    baseUri: string;
    contributionPoints: {
        [key: string]: ContributionPoint;
    };
    contributions: {
        [key: string]: any[];
    };
    contributionTypes: {
        [key: string]: any;
    };
    description: string;
    icon: string;
    name: string;
    namespace: string;
    provider: ContributionProvider;
    version: string;
}
export interface AppPublishInfo {
    lastUpdated: Date;
    ownerId: string;
    store: AppStore;
}
export interface AppSetting {
    key: string;
    value: string;
}
export interface AppStore {
    appStoreType: AppStoreType;
    id: number;
    target: string;
}
export declare enum AppStoreType {
    Unknown = 0,
    BuiltIn = 1,
    Developer = 2,
}
export interface Contribution {
    app: App;
    point: ContributionIdentifier;
    properties: any;
}
export interface ContributionIdentifier {
    appNamespace: string;
    appRelativeId: string;
    id: string;
}
export interface ContributionPoint extends ContributionIdentifier {
    description: string;
    type: string;
}
export interface ContributionPropertyDescription {
    description: string;
    name: string;
    required: boolean;
    type: ContributionPropertyType;
}
export declare enum ContributionPropertyType {
    Unknown = 0,
    String = 1,
    Uri = 2,
    Guid = 4,
    Boolean = 8,
    Integer = 16,
    Double = 32,
    DateTime = 64,
    Dictionary = 128,
    Array = 256,
}
export interface ContributionProvider {
    name: string;
    website: string;
}
export interface ContributionType {
    app: App;
    schema: any;
    typeIdentifier: ContributionIdentifier;
}
export interface InstalledApp extends App {
    installState: AppInstallationState;
}
export declare var TypeInfo: {
    App: {
        fields: any;
    };
    AppInstallationState: {
        fields: any;
    };
    AppManifest: {
        fields: any;
    };
    AppPublishInfo: {
        fields: any;
    };
    AppSetting: {
        fields: any;
    };
    AppStore: {
        fields: any;
    };
    AppStoreType: {
        enumValues: {
            "unknown": number;
            "builtIn": number;
            "developer": number;
        };
    };
    Contribution: {
        fields: any;
    };
    ContributionIdentifier: {
        fields: any;
    };
    ContributionPoint: {
        fields: any;
    };
    ContributionPropertyDescription: {
        fields: any;
    };
    ContributionPropertyType: {
        enumValues: {
            "unknown": number;
            "string": number;
            "uri": number;
            "guid": number;
            "boolean": number;
            "integer": number;
            "double": number;
            "dateTime": number;
            "dictionary": number;
            "array": number;
        };
    };
    ContributionProvider: {
        fields: any;
    };
    ContributionType: {
        fields: any;
    };
    InstalledApp: {
        fields: any;
    };
};
