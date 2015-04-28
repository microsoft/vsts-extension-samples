//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------

//----------------------------------------------------------
// Generated file, DO NOT EDIT.

// Generated data for the following assemblies:
// Microsoft.TeamFoundation.Server.WebAccess.Platform
//----------------------------------------------------------


interface AccessPointModel {
    authority: string;
    scheme: string;
    uri: string;
}

interface AppInsightsConfiguration {
    autoTrackPage: boolean;
    customTrackPageData: AppInsightsCustomTrackPageData;
    enabled: boolean;
    insightsScriptUrl: string;
    instrumentationKey: string;
    trackProjectInfo: boolean;
}

interface AppInsightsCustomTrackPageData {
    alias: string;
    metrics: { [key: string]: number; };
    pageName: string;
    properties: { [key: string]: string; };
}

interface ConfigurationContext {
    api: ConfigurationContextApis;
    clientHost: string;
    isHosted: boolean;
    mailSettings: TfsMailSettings;
    paths: ConfigurationContextPaths;
}

interface ConfigurationContextApis {
    areaPrefix: string;
    controllerPrefix: string;
    webApiVersion: string;
}

interface ConfigurationContextPaths {
    resourcesPath: string;
    rootPath: string;
    staticRoot3rdParty: string;
    staticRootTfs: string;
}

declare enum ContextHostType {
    Unknown = 0,
    Deployment = 1,
    Application = 2,
    ProjectCollection = 4,
}

interface ContextIdentifier {
    id: string;
    name: string;
}

interface ContributionContext {
    containerCssClass: string;
    cssReferences: string[];
    moduleLoaderConfig: ModuleLoaderConfiguration;
    partialContent: boolean;
    scriptModules: string[];
    serviceUrl: string;
}

interface CoreReferencesContext {
    scripts: JavascriptFileReference[];
    stylesheets: StylesheetReference[];
}

interface DaylightSavingsAdjustmentEntry {
    offset: number;
    start: Date;
}

interface DiagnosticsContext {
    activityId: string;
    allowStatsCollection: boolean;
    debugMode: boolean;
    sessionId: string;
    tracePointCollectionEnabled: boolean;
    tracePointProfileEnd: string;
    tracePointProfileStart: string;
}

interface ExtendedHostContext {
    authority: string;
    hostType: ContextHostType;
    id: string;
    isAADAccount: boolean;
    name: string;
    relativeUri: string;
    scheme: string;
    uri: string;
}

interface FeatureAvailabilityContext {
    featureStates: { [key: string]: boolean; };
}

interface GlobalizationContext {
    culture: string;
    theme: string;
    timeZoneId: string;
    timezoneOffset: number;
}

interface HostContext {
    id: string;
    name: string;
    relativeUri: string;
    uri: string;
}

interface Hub {
    groupId: string;
    id: string;
    isSelected: boolean;
    name: string;
    order: any;
    uri: string;
}

interface HubGroup {
    hasHubs: boolean;
    id: string;
    name: string;
    order: any;
    uri: string;
}

interface HubsContext {
    hubGroups: HubGroup[];
    hubGroupsContributionPointId: string;
    hubs: Hub[];
    selectedHubGroupId: string;
}

interface IdentityModel {
    customDisplayName: string;
    displayName: string;
    email: string;
    id: string;
    isActive: boolean;
    isContainer: boolean;
    providerDisplayName: string;
    uniqueName: string;
}

interface JavascriptFileReference {
    fallbackCondition: string;
    fallbackUrl: string;
    identifier: string;
    isCoreModule: boolean;
    url: string;
}

interface JsonArrayWrapper {
    __wrappedArray: string;
}

interface MicrosoftAjaxConfig {
    cultureInfo: any;
}

interface ModuleLoaderConfiguration {
    baseUrl: string;
    paths: { [key: string]: string; };
    shim: { [key: string]: ModuleLoaderShimConfiguration; };
}

interface ModuleLoaderShimConfiguration {
    deps: string[];
    exports: string;
}

interface NavigationContext {
    area: string;
    currentAction: string;
    currentController: string;
    topMostLevel: NavigationContextLevels;
}

declare enum NavigationContextLevels {
    None = 0,
    Deployment = 1,
    Application = 2,
    Collection = 4,
    Project = 8,
    Team = 16,
    ApplicationAll = 30,
    All = 31,
}

interface PageContext {
    appInsightsConfiguration: AppInsightsConfiguration;
    coreReferences: CoreReferencesContext;
    diagnostics: DiagnosticsContext;
    featureAvailability: FeatureAvailabilityContext;
    globalization: GlobalizationContext;
    microsoftAjaxConfig: MicrosoftAjaxConfig;
    moduleLoaderConfig: ModuleLoaderConfiguration;
    navigation: NavigationContext;
    serviceInstanceId: string;
    serviceLocations: { [key: string]: { [key: number]: string; }; };
    timeZonesConfiguration: TimeZonesConfiguration;
    webAccessConfiguration: ConfigurationContext;
    webContext: WebContext;
}

interface StylesheetReference {
    highContrastUrl: string;
    isCoreStylesheet: boolean;
    url: string;
}

interface TeamContext {
    id: string;
    name: string;
    userIsAdmin: boolean;
    userIsMember: boolean;
}

interface TeamFoundationServiceHostModel {
    hostType: any;
    instanceId: string;
    name: string;
    relVDir: string;
    vDir: string;
}

interface TfsMailSettings {
    enabled: boolean;
    from: string;
}

interface TfsServiceHostDescriptor {
    hostType: any;
    id: string;
    name: string;
    vdir: string;
}

interface TimeZonesConfiguration {
    daylightSavingsAdjustments: DaylightSavingsAdjustmentEntry[];
}

interface UserContext {
    email: string;
    id: string;
    limitedAccess: boolean;
    name: string;
    uniqueName: string;
}

interface WebAccessConfiguration {
    clientHost: string;
    mailSettings: TfsMailSettings;
    resourcesPath: string;
    rootPath: string;
    staticRoot3rdParty: string;
    staticRootTfs: string;
    webApiVersion: string;
}

interface WebContext {
    account: HostContext;
    collection: HostContext;
    host: ExtendedHostContext;
    project: ContextIdentifier;
    team: TeamContext;
    user: UserContext;
}

