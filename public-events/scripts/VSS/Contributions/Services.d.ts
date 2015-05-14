/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/handlebars.d.ts" />
/// <reference path="../References/q.d.ts" />
/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
import Contributions_Contracts = require("VSS/Contributions/Contracts");
export declare module CustomerIntelligenceConstants {
    var CONTRIBUTIONS_AREA: string;
    var CONTRIBUTIONS_USAGE_FEATURE: string;
    var CONTRIBUTIONS_ACTION: string;
    var CONTRIBUTIONS_ACTION_EXECUTE: string;
}
export declare enum ContributionAttributeDataType {
    String = 0,
    Number = 1,
    Boolean = 2,
    Array = 3,
    Function = 4,
}
export interface IContributionPoint {
    description: string;
    type: string;
}
export interface IContributionTypes {
    [typeName: string]: IContributionType;
}
export interface IContributionType {
    description: string;
    parentType?: string;
    attributes: IContributionTypeAttribute[];
}
export interface IContributionTypeAttribute {
    name: string;
    description: string;
    required?: boolean;
    type: string;
    validValues?: IAttributeValidValue[];
    attributes?: IContributionTypeAttribute[];
}
export interface IAttributeValidValue {
    name: string;
}
/********************/
/*** Apps classes ***/
/********************/
/**
 * Represents a Registered App, which encapsulates contributions
 */
export declare class RegisteredApp {
    private _contributions;
    private _app;
    /**
     * Namespace of the app, e.g. vss.code.web
     */
    namespace: string;
    /**
     * Indicates if this app was generated from loading an app from the client's localhost
     */
    isDevApp: boolean;
    /**
     * Indicates this app has been initialized with data. The constructor doesn't require
     * all app info so that references can be made to this object before the data is loaded.
     */
    initialized: boolean;
    /**
     * Non-initializing constructor
     * @param namespace Namepsace of the app (e.g. vss.code.ui)
     * @param isDevApp True if this app is being created by dev mode.
     */
    constructor(namespace: string, isDevApp?: boolean);
    /**
     * Initialize this app with the given App object
     * @param Contributionscommon.App The app that is registered
     */
    initialize(app: Contributions_Contracts.App): void;
    /**
     * Returns the underlying app data structure
     * @returns Contributions_Contracts.App The underlying App iff this RegisteredApp has been initialize()'d
     * @throws Error if this RegisteredApp has not been initialized.
     */
    app(): Contributions_Contracts.App;
    /**
     * Add contributions for this app to previously unpopulated contribution point ids.
     *
     * @param contributions key-value-pair pointing contribution point id to the Contribution
     * @return Contribution[] flat list of contributions added
     */
    updateContributions(contributions: IDictionaryStringTo<IDictionaryStringTo<any>[]>): Contribution[];
    /**
     * Get the contributions from this app, optionally filtered by the given contribution point ids.
     * If no contributions are found, return an empty list.
     */
    getContributions(pointIds?: string[]): Contribution[];
}
/**
 * Manages all RegisteredApp instances and their contributions.
 */
export declare class AppRegistry {
    private _apps;
    private static _instance;
    private _contributionsClient;
    private _contributionsByPointId;
    private _contributionsByAppNamespace;
    private _loadedContributionPoints;
    private _loadedAppNamespaces;
    private _contributionQueryPromises;
    private static _featureEnabled;
    /**
     * Private constructor - do not call.
     */
    constructor();
    /**
     * Get the singleton instance (create if it doesn't exist) of this class
     * @return AppRegistry
     */
    static getInstance(): AppRegistry;
    private registerAppNamespace(namespace, isDevApp?);
    private addRegisteredApp(app);
    /**
     * Register an application so that its contributions can be queried
     * @param app Contributions_Contracts.AppManifest The manifest of the app to register (App may also be provided; it is type-compatible with AppManifest)
     * @return RegisteredApp The resulting app object
     */
    registerApp(app: Contributions_Contracts.App): RegisteredApp;
    /**
     * Gets a list of contributions (from all installed apps) to the given point names.
     * @param pointIds Contribution point ids
     * @param refresh (null) True to force re-fetch of contributions, false to ensure no server calls, null to make server calls for any unfulfilled point ids.
     * @return JQueryPromise<Contribution[]> Promise that is resolved when contributions are available.
     */
    beginGetContributions(pointIds: string[], refresh?: boolean): IPromise<Contribution[]>;
    /**
    * Fetch a contribution by metadata about the contribution to get (point id, contribution id, extension id).
    *
    * @param contributionInfo IContribution which specifies information about the Contribution to get
    * @param failOnDuplicateMatches If true, reject the promise if more than one contribution matches the given query. Otherwise the first match is returned.
    */
    getContribution(contributionInfo: IContribution, failOnDuplicateMatches?: boolean): IPromise<Contribution>;
    private _getUnqueriedContributionPoints(pointIds);
    private _getPendingLoadPromises(pointIds);
    private _getLoadedContributionsByPointId(pointIds);
    /**
     * Mark the given contribution point ids as already queried-for so that additional gets
     * for these contributions don't issue another REST call.
     * @param pointIds Contribution point ids
     */
    private _registerLoadedContributionIds(pointIds);
    /**
     * Check that an app exists with the given namespace
     * @param namespace The namespace of the app being searched for
     * @return boolean True if the registry contains this app, false otherwise.
     */
    containsApp(namespace: string): boolean;
    /**
     * Gets the app from the registry with the given name.
     * @param namespace Namespace of the app (e.g. vss.code.web)
     * @param createIfNotExists Only used if the app needs to be created: true to specify that it is a dev app (e.g. using dev mode)
     * @return RegisteredApp The app that was found matching the namespace, or the one that was just created.
     */
    getApp(namespace: string, createIfNotExists?: boolean): RegisteredApp;
    /**
     * Parse the apps in the JSON island given by the selector
     * @param selector Selector to match a script tag containing JSON
     */
    static processJsonIsland(selector: string): void;
    /**
     * Determines if the Contribution feature is enabled (lazy)
     * @return boolean
     */
    static featureEnabled(): boolean;
}
/************************************/
/*** Contribution-related classes ***/
/************************************/
/**
 * Represents a contributed unit to a single extensibility point
 */
export declare class Contribution {
    private static _httpUrlRegex;
    private static _handlebarHelpersRegistered;
    private static _asyncReplacementIndicator;
    private static _asyncReplacementCounter;
    private static _asyncReplacementPromises;
    /**
     * The properties that fulfill this contribution's type
     */
    /** PROTECTED **/
    _definition: IDictionaryStringTo<any>;
    _app: RegisteredApp;
    /**
     * The ContributionPoint this Contribution applies to
     */
    targetPoint: ContributionPoint;
    /**

     */
    constructor(contributionPoint: string, definition: IDictionaryStringTo<any>, app: string);
    /**
     * Get the specified property of this contribution
     * Optional type parameter to specify the output data type
     * @typeparam T
     * @param string Name of the property to get
     * @param T Default value in case property does not exist on this contribution.
     * @return T
     */
    getProperty<T>(propName: string, defaultValue?: T): T;
    /**
    * Get a lookup of all contribution properties
    */
    getProperties(): IDictionaryStringTo<any>;
    /**
    * Gets a non-templated uri property. It will be resolved with the base url of the extension.
    * @param propName Name of the property containing the uri
    */
    getUriProperty(propName: string): string;
    /**
     * Gets the requested property value with templated strings filled in by values in the given object
     * @param string The name of the property to get
     * @param any Object containing key-value pairs to replace the template strings
     * @return JQueryPromise<string> Promise that will be resolved with the value of the property after replacements are made.
     */
    beginGetTemplateProperty(propertyName: string, replacementObject: any): IPromise<string>;
    /**
     * Gets the requested property value with templated strings filled in by values in the given object.  It will
     * attempt to append on baseUrl property if it is available and it is needed.
     * @param string The name of the property to get
     * @param any Object containing key-value pairs to replace the template strings
     * @return JQueryPromise<string> Promise that will be resolved with the value of the property after replacements are made.
     */
    beginGetTemplateUriProperty(propertyName: string, replacementObject: any): IPromise<string>;
    private _processTemplate(propertyValue, replacementObject);
    private handleAsyncReplacements(value, asyncIndex, asyncStopIndex, deferred);
    /**
     * Returns
     * @return string
     */
    private _processUriProperty(path);
    /**
     * Returns whether or not this contribution comes from dev mode
     * @return boolean
     */
    isDevModeContribution(): boolean;
    /**
     * Gets the namespace of the app that contributed this contribution
     * @return string
     */
    getAppNamespace(): string;
    /**
     * Gets the RegisteredApp that contributed this contribution
     * @return RegisteredApp
     */
    getApp(): RegisteredApp;
    publishTraceData(data?: string): void;
    private static _registerHandlebarHelpers(handlebars);
}
/**
 * Represents a contribution point that will host other contributions
 */
export declare class ContributionPoint {
    /**
     * Name of this contribution point (without app name)
     */
    name: string;
    /**
     * Description of contribution point (optional)
     */
    description: string;
    /**
     * Type of contributions that are accepted here
     */
    contributionType: ContributionType;
    /**
     * Reference to the app that exposes this contribution point.
     */
    hostingApp: RegisteredApp;
    /**
     * ContributionPoint constructor
     * @param string Contribution point name, or, if appNamespace is not specified, contribution point id (app.namespace#point.name)
     * @param string Type of contribution (as string)
     * @param string app namespace, if not specified in the first parameter.
     */
    constructor(name: string, appNamespace?: string);
    /**
     * Gets the fullly qualified name of this contribution point (e.g. app.namespace#point.name)
     * @return string
     */
    getFullName(): string;
    /**
     * Gets the fully-qualified contribution point name
     * @param string Name of the contribution point
     * @param string Name of the app that is hosting it
     * @return string e.g. App.Name#Contribution.Point.Name
     */
    static composeContributionPointName(pointName: string, hostApp?: string): string;
    /**
     * Gets the raw point name from the given point name (either fully qualified or not)
     * @param string Point name
     * @return string e.g. Contribution.Point.Name
     */
    static stripAppNamespace(pointName: string): string;
    /**
     * Gets the name of the app from a full point name (app.namespace#point.name)
     * @param string Full point name
     * @return string e.g. App.namespace
     */
    static stripPointName(pointName: string): string;
}
/**
 * Manages all the instances of ContributionPoint
 */
export declare class ContributionPointRegistry {
    private static _instance;
    private _contributionPoints;
    /**
     * Private constructor - do not call.
     */
    constructor();
    /**
     * Get the singleton instance (create if it doesn't exist) of this class
     * @return ContributionPointRegistry
     */
    static getInstance(): ContributionPointRegistry;
    /**
     * Determines if the given point has been registered.
     * @param string Name of the contribution point (fully-qualified or just the point name)
     * @param string? Name of the host app if the first parameter is not the fully-qualified name
     */
    containsPoint(name: string, hostApp?: string): boolean;
    private registerContributionPointName(contributionPoint, appName);
    private addPointToRegistry(contributionPoint);
    /**
     * Register a contribution point.
     * The idea is to loop through all the JSON ContributionPoints and call ContributionPointRegistry.register...() on each.
     * @param IContributionPoint the point to register, lifted from the manifest file.
     * @param string the name of the app that is exposing this contribution point.
     * @return ContributionPoint The ContributionPoint that was registered, null if nothing got registered.
     */
    registerContributionPoint(name: string, contributionPoint: IContributionPoint, appName?: string): ContributionPoint;
    registerContributionPoints(fullPointNames: string[]): void;
    /**
     * Gets the contribution point for the given name and optionally hostapp.
     * @param string Name of the contribution point (fully qualified if hostApp not provided)
     * @param string? Name of the hosting app
     * @param boolean If true, create the point and register it.
     * @return ContributionPoint The point that was found (or just created)
     */
    getContributionPoint(name: string, hostApp?: string, createIfNotExists?: boolean): ContributionPoint;
}
/**
 * Represents a type of contribution, used for validation
 */
export declare class ContributionType {
    private _attributes;
    /**
     * Name of the contribution type
     */
    name: string;
    /**
     * Description of its purpose
     */
    description: string;
    /**
     * Type to extend (parent attributes are inherited)
     */
    parentType: ContributionType;
    /**
     * True iff this type is initialized and ready to be used for validation
     */
    initialized: boolean;
    /**
     * ContributionType constructor
     * @param string Name of the contribution type
     */
    constructor(name: string);
    /**
     * Initialize this contribution type
     * @param string Description of this type
     * @param string Reference to the parent type
     * @param IContributionAttribute[] List of unique attributes of this contribution type
     */
    initialize(description?: string, parentType?: string, attributes?: IContributionTypeAttribute[]): void;
    /**
     * Get the attributes on this contribution type
     * @param boolean (true) True to include attributes from inherited types
     * @return IDictionaryStringTo<ContributionTypeAttribute> Dictionary of attributes
     */
    getAttributes(includeInherited?: boolean): IDictionaryStringTo<ContributionTypeAttribute>;
    /**
     * Return the attribute with the given name. Looks through inherited types as well.
     * @param The name of the attribute to find
     * @return ContributionTypeAttribute The attribute with the given name. Null if not found.
     */
    getAttribute(attrName: string): ContributionTypeAttribute;
}
/**
 * Manages all the instances of ContributionType
 */
export declare class ContributionTypeRegistry {
    private static _instance;
    private _types;
    /**
     * Private constructor - do not call
     */
    constructor();
    /**
     * Get the singleton instance (create if it doesn't exist) of this class
     * @return ContributionTypeRegistry
     */
    static getInstance(): ContributionTypeRegistry;
    private registerContributionTypeName(contributionTypeName);
    private addTypeToRegistry(contributionType);
    /**
     * Create a ContributionType based on the given IContributionType and register it.
     * @param string Name of the contribution type
     * @param IContributionType Type from the manifest
     * @return ContributionType The object that was created/registered.
     */
    registerContributionType(name: string, contributionType: IContributionType): ContributionType;
    /**
     * Determines if the given type name is in the registry
     * @return boolean
     */
    containsType(typeName: string): boolean;
    /**
     * Gets the contribution type from the registry specified by the typeName
     * @param string Name of the contribution type
     * @param boolean True to create the type and register it if it is not already in the registry.
     */
    getType(typeName: string, createIfNotExists?: boolean): ContributionType;
}
/**
 * Represents a single attribute for a contribution type
 */
export declare class ContributionTypeAttribute {
    /**
     * Name of the attribute
     */
    name: string;
    /**
     * Description of the attribute's purpose
     */
    description: string;
    /**
     * Specifies whether or not the attribute is required or optional on contributions of this type
     */
    required: boolean;
    /**
     * Data type of the attribute's value
     */
    type: ContributionAttributeDataType;
    /**
     * Constructor
     * @param string Attribute name
     * @param string Attribute description
     * @param boolean Required attribute
     * @param string Attribute type
     */
    constructor(name: string, description: string, required: boolean, type: string);
    /**
     * Convert an attribute type string to the enum value
     * @param string Data type as a string
     * @return ContributionTypeAttribute
     */
    static stringToDataType(str: string): ContributionAttributeDataType;
}
export declare class ManifestManager {
    private static _instance;
    private _isDevMode;
    private _devport;
    constructor();
    static getInstance(): ManifestManager;
    isDevMode(): boolean;
    /**
     * Check to see if we should try and load a manifest from a local development server.  Two locations are checked.
     * First look for vsodevmode query string parameter.  If that is set to true we will attempt to load a local manifest.
     * If query string paramter does not exist, then look in session storage to see if has already been set for this session.
     */
    private checkDevMode();
    private _removeDevPort();
    private _storeDevPort(port);
    private _getDevPort();
    checkForContributions(): void;
    private beginGetDevelopmentIntegrations();
}
