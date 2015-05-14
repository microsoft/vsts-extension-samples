/**
* Represents a VSO &quot;app&quot; which is a container for internal and 3rd party contributions and contribution points
*/
export interface App extends AppManifest {
    /**
    * Unique id for this app (the same id is used for all versions of a single app)
    */
    id: string;
    /**
    * Information about which store this app is published and when/by-whom it was published
    */
    publishInfo: AppPublishInfo;
}
/**
* The state of an installed app
*/
export interface AppInstallationState {
    /**
    * Whether or not the app is currently enabled in a particular app installation
    */
    enabled: boolean;
    /**
    * The time at which this installation was last updated
    */
    lastUpdated: Date;
    /**
    * Identifier of the user who last changed the installation state (install, enable, disable, etc.)
    */
    lastUpdatedBy: string;
}
/**
* Base class for app properties which are shared by the app manifest and the app model
*/
export interface AppManifest {
    /**
    * Uri used as base for other relative uri's defined in app
    */
    baseUri: string;
    /**
    * Dictionary of all contribution points keyed by contribution point id
    */
    contributionPoints: {
        [key: string]: ContributionPoint;
    };
    /**
    * Dictionary of all contributions (property bags) keyed by contribution point id
    */
    contributions: {
        [key: string]: any[];
    };
    /**
    * Dictionary of all contribution types keyed by contribution point type id
    */
    contributionTypes: {
        [key: string]: any;
    };
    /**
    * Description of the app
    */
    description: string;
    /**
    * Url to the icon to use when displaying this app
    */
    icon: string;
    /**
    * Friendly name of the app
    */
    name: string;
    /**
    * Namespace identifier for an app. For example, &quot;vss.web&quot;. This serves as a prefix in references to this app's contributions, contribution types, and contribution points.
    */
    namespace: string;
    /**
    * Information about the provider/owner of this app
    */
    provider: ContributionProvider;
    /**
    * Version of this app
    */
    version: string;
}
/**
* Publishing information about an app
*/
export interface AppPublishInfo {
    /**
    * When the app was last updated
    */
    lastUpdated: Date;
    /**
    * Id of the user who published the app
    */
    ownerId: string;
    /**
    * Store to which the app is published
    */
    store: AppStore;
}
export interface AppSetting {
    key: string;
    value: string;
}
/**
* Store into which apps can be published
*/
export interface AppStore {
    /**
    * Type of app store
    */
    appStoreType: AppStoreType;
    /**
    * Unique identifier for this store
    */
    id: number;
    /**
    * Identifier for the target of the app store. For a developer store, for example, this is the unique user id of the developer.
    */
    target: string;
}
export declare enum AppStoreType {
    /**
    * App store type is unknown
    */
    Unknown = 0,
    /**
    * Store for builtin VSO apps
    */
    BuiltIn = 1,
    /**
    * Store for an individual app developer
    */
    Developer = 2,
}
/**
* An individual contribution made by an app
*/
export interface Contribution {
    /**
    * The app which contributes this contribution
    */
    app: App;
    /**
    * The full contribution point id string
    */
    point: ContributionIdentifier;
    /**
    * Properties/attributes of this contribution
    */
    properties: any;
}
/**
* Identifier for contribution types and points
*/
export interface ContributionIdentifier {
    /**
    * The namespace of the app that is supplying the contribution point
    */
    appNamespace: string;
    /**
    * The app-relative contribution point id
    */
    appRelativeId: string;
    /**
    * The full/unique identifier of the contribution point (combines app namespace and point id)
    */
    id: string;
}
/**
* A point to which apps can make contributions
*/
export interface ContributionPoint extends ContributionIdentifier {
    /**
    * Description of this contribution point
    */
    description: string;
    /**
    * Id of the contribution type of this point
    */
    type: string;
}
/**
* Description about a property of a contribution type
*/
export interface ContributionPropertyDescription {
    /**
    * Description of the property
    */
    description: string;
    /**
    * Name of the property
    */
    name: string;
    /**
    * True if this property is required
    */
    required: boolean;
    /**
    * The type of value used for this property
    */
    type: ContributionPropertyType;
}
export declare enum ContributionPropertyType {
    /**
    * Contribution type is unknown (value may be anything)
    */
    Unknown = 0,
    /**
    * Value is a string
    */
    String = 1,
    /**
    * Value is a Uri
    */
    Uri = 2,
    /**
    * Value is a GUID
    */
    Guid = 4,
    /**
    * Value is True or False
    */
    Boolean = 8,
    /**
    * Value is an integer
    */
    Integer = 16,
    /**
    * Value is a double
    */
    Double = 32,
    /**
    * Value is a DateTime object
    */
    DateTime = 64,
    /**
    * Value is a generic Dictionary/JObject/property bag
    */
    Dictionary = 128,
    /**
    * Value is an array
    */
    Array = 256,
}
/**
* Information about the provider of an app
*/
export interface ContributionProvider {
    /**
    * Name of the app owner/provider
    */
    name: string;
    /**
    * Url of the app owner/provider's website
    */
    website: string;
}
/**
* A contribution type, given by a json schema
*/
export interface ContributionType {
    /**
    * The app which contributes this contribution type
    */
    app: App;
    /**
    * Schema of this contribution type
    */
    schema: any;
    /**
    * The full contribution type identifier
    */
    typeIdentifier: ContributionIdentifier;
}
/**
* Represents a VSO app along with its installation state
*/
export interface InstalledApp extends App {
    /**
    * Information about this particular installation of the app
    */
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
