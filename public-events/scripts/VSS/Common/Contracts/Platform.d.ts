export interface AccessPointModel {
    authority: string;
    scheme: string;
    uri: string;
}
export interface AppInsightsConfiguration {
    autoTrackPage: boolean;
    customTrackPageData: AppInsightsCustomTrackPageData;
    enabled: boolean;
    insightsScriptUrl: string;
    instrumentationKey: string;
    trackProjectInfo: boolean;
}
export interface AppInsightsCustomTrackPageData {
    alias: string;
    metrics: {
        [key: string]: number;
    };
    pageName: string;
    properties: {
        [key: string]: string;
    };
}
export interface ConfigurationContext {
    api: ConfigurationContextApis;
    clientHost: string;
    isHosted: boolean;
    mailSettings: TfsMailSettings;
    paths: ConfigurationContextPaths;
}
export interface ConfigurationContextApis {
    areaPrefix: string;
    controllerPrefix: string;
    webApiVersion: string;
}
export interface ConfigurationContextPaths {
    resourcesPath: string;
    rootPath: string;
    staticRoot3rdParty: string;
    staticRootTfs: string;
}
export declare enum ContextHostType {
    Unknown = 0,
    Deployment = 1,
    Application = 2,
    ProjectCollection = 4,
}
export interface ContextIdentifier {
    id: string;
    name: string;
}
export interface ContributionContext {
    containerCssClass: string;
    cssReferences: string[];
    moduleLoaderConfig: ModuleLoaderConfiguration;
    partialContent: boolean;
    scriptModules: string[];
    serviceUrl: string;
}
export interface CoreReferencesContext {
    scripts: JavascriptFileReference[];
    stylesheets: StylesheetReference[];
}
export interface DaylightSavingsAdjustmentEntry {
    offset: number;
    start: Date;
}
export interface DiagnosticsContext {
    activityId: string;
    allowStatsCollection: boolean;
    debugMode: boolean;
    sessionId: string;
    tracePointCollectionEnabled: boolean;
    tracePointProfileEnd: string;
    tracePointProfileStart: string;
}
export interface ExtendedHostContext {
    authority: string;
    hostType: ContextHostType;
    id: string;
    isAADAccount: boolean;
    name: string;
    relativeUri: string;
    scheme: string;
    uri: string;
}
export interface FeatureAvailabilityContext {
    featureStates: {
        [key: string]: boolean;
    };
}
export interface GlobalizationContext {
    culture: string;
    theme: string;
    timeZoneId: string;
    timezoneOffset: number;
}
export interface HostContext {
    id: string;
    name: string;
    relativeUri: string;
    uri: string;
}
export interface Hub {
    groupId: string;
    id: string;
    isSelected: boolean;
    name: string;
    order: any;
    uri: string;
}
export interface HubGroup {
    hasHubs: boolean;
    id: string;
    name: string;
    order: any;
    uri: string;
}
export interface HubsContext {
    hubGroups: HubGroup[];
    hubGroupsContributionPointId: string;
    hubs: Hub[];
    selectedHubGroupId: string;
}
export interface IdentityModel {
    customDisplayName: string;
    displayName: string;
    email: string;
    id: string;
    isActive: boolean;
    isContainer: boolean;
    providerDisplayName: string;
    uniqueName: string;
}
export interface JavascriptFileReference {
    fallbackCondition: string;
    fallbackUrl: string;
    identifier: string;
    isCoreModule: boolean;
    url: string;
}
export interface JsonArrayWrapper {
    __wrappedArray: string;
}
export interface MicrosoftAjaxConfig {
    cultureInfo: any;
}
export interface ModuleLoaderConfiguration {
    baseUrl: string;
    paths: {
        [key: string]: string;
    };
    shim: {
        [key: string]: ModuleLoaderShimConfiguration;
    };
}
export interface ModuleLoaderShimConfiguration {
    deps: string[];
    exports: string;
}
export interface NavigationContext {
    area: string;
    currentAction: string;
    currentController: string;
    topMostLevel: NavigationContextLevels;
}
export declare enum NavigationContextLevels {
    None = 0,
    Deployment = 1,
    Application = 2,
    Collection = 4,
    Project = 8,
    Team = 16,
    ApplicationAll = 30,
    All = 31,
}
export interface PageContext {
    appInsightsConfiguration: AppInsightsConfiguration;
    coreReferences: CoreReferencesContext;
    diagnostics: DiagnosticsContext;
    featureAvailability: FeatureAvailabilityContext;
    globalization: GlobalizationContext;
    microsoftAjaxConfig: MicrosoftAjaxConfig;
    moduleLoaderConfig: ModuleLoaderConfiguration;
    navigation: NavigationContext;
    serviceInstanceId: string;
    serviceLocations: {
        [key: string]: {
            [key: number]: string;
        };
    };
    timeZonesConfiguration: TimeZonesConfiguration;
    webAccessConfiguration: ConfigurationContext;
    webContext: WebContext;
}
export interface StylesheetReference {
    highContrastUrl: string;
    isCoreStylesheet: boolean;
    url: string;
}
export interface TeamContext {
    id: string;
    name: string;
    userIsAdmin: boolean;
    userIsMember: boolean;
}
export interface TeamFoundationServiceHostModel {
    hostType: any;
    instanceId: string;
    name: string;
    relVDir: string;
    vDir: string;
}
export interface TfsMailSettings {
    enabled: boolean;
    from: string;
}
export interface TfsServiceHostDescriptor {
    hostType: any;
    id: string;
    name: string;
    vdir: string;
}
export interface TimeZonesConfiguration {
    daylightSavingsAdjustments: DaylightSavingsAdjustmentEntry[];
}
export interface UserContext {
    email: string;
    id: string;
    limitedAccess: boolean;
    name: string;
    uniqueName: string;
}
export interface WebAccessConfiguration {
    clientHost: string;
    mailSettings: TfsMailSettings;
    resourcesPath: string;
    rootPath: string;
    staticRoot3rdParty: string;
    staticRootTfs: string;
    webApiVersion: string;
}
export interface WebContext {
    account: HostContext;
    collection: HostContext;
    host: ExtendedHostContext;
    project: ContextIdentifier;
    team: TeamContext;
    user: UserContext;
}
export declare var TypeInfo: {
    AccessPointModel: {
        fields: any;
    };
    AppInsightsConfiguration: {
        fields: any;
    };
    AppInsightsCustomTrackPageData: {
        fields: any;
    };
    ConfigurationContext: {
        fields: any;
    };
    ConfigurationContextApis: {
        fields: any;
    };
    ConfigurationContextPaths: {
        fields: any;
    };
    ContextHostType: {
        enumValues: {
            "unknown": number;
            "deployment": number;
            "application": number;
            "projectCollection": number;
        };
    };
    ContextIdentifier: {
        fields: any;
    };
    ContributionContext: {
        fields: any;
    };
    CoreReferencesContext: {
        fields: any;
    };
    DaylightSavingsAdjustmentEntry: {
        fields: any;
    };
    DiagnosticsContext: {
        fields: any;
    };
    ExtendedHostContext: {
        fields: any;
    };
    FeatureAvailabilityContext: {
        fields: any;
    };
    GlobalizationContext: {
        fields: any;
    };
    HostContext: {
        fields: any;
    };
    Hub: {
        fields: any;
    };
    HubGroup: {
        fields: any;
    };
    HubsContext: {
        fields: any;
    };
    IdentityModel: {
        fields: any;
    };
    JavascriptFileReference: {
        fields: any;
    };
    JsonArrayWrapper: {
        fields: any;
    };
    MicrosoftAjaxConfig: {
        fields: any;
    };
    ModuleLoaderConfiguration: {
        fields: any;
    };
    ModuleLoaderShimConfiguration: {
        fields: any;
    };
    NavigationContext: {
        fields: any;
    };
    NavigationContextLevels: {
        enumValues: {
            "none": number;
            "deployment": number;
            "application": number;
            "collection": number;
            "project": number;
            "team": number;
            "applicationAll": number;
            "all": number;
        };
    };
    PageContext: {
        fields: any;
    };
    StylesheetReference: {
        fields: any;
    };
    TeamContext: {
        fields: any;
    };
    TeamFoundationServiceHostModel: {
        fields: any;
    };
    TfsMailSettings: {
        fields: any;
    };
    TfsServiceHostDescriptor: {
        fields: any;
    };
    TimeZonesConfiguration: {
        fields: any;
    };
    UserContext: {
        fields: any;
    };
    WebAccessConfiguration: {
        fields: any;
    };
    WebContext: {
        fields: any;
    };
};
