import Contracts = require("VSS/Contributions/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class ContributionsHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {string} appStoreId
     * @param {string} appId
     * @return IPromise<Contracts.App>
     */
    getApp(appStoreId: string, appId: string): IPromise<Contracts.App>;
    /**
     * @param {string} appStoreId
     * @return IPromise<Contracts.App[]>
     */
    getApps(appStoreId: string): IPromise<Contracts.App[]>;
    /**
     * @param {Contracts.AppManifest} app
     * @param {string} appStoreId
     * @return IPromise<Contracts.App>
     */
    publishApp(app: Contracts.AppManifest, appStoreId: string): IPromise<Contracts.App>;
    /**
     * @param {string} appStoreId
     * @param {string} appId
     * @return IPromise<void>
     */
    removeApp(appStoreId: string, appId: string): IPromise<void>;
    /**
     * @param {string} appId
     * @return IPromise<Contracts.InstalledApp>
     */
    getInstalledApp(appId: string): IPromise<Contracts.InstalledApp>;
    /**
     * @param {string[]} contributionPointIdFilter
     * @param {boolean} includeDisabledApps
     * @return IPromise<Contracts.InstalledApp[]>
     */
    getInstalledApps(contributionPointIdFilter?: string[], includeDisabledApps?: boolean): IPromise<Contracts.InstalledApp[]>;
    /**
     * @param {Contracts.InstalledApp} appToInstall
     * @return IPromise<Contracts.InstalledApp>
     */
    installApp(appToInstall: Contracts.InstalledApp): IPromise<Contracts.InstalledApp>;
    /**
     * @param {string} appId
     * @return IPromise<void>
     */
    unInstallApp(appId: string): IPromise<void>;
    /**
     * @param {Contracts.InstalledApp} app
     * @param {string} appId
     * @return IPromise<Contracts.InstalledApp>
     */
    updateInstalledApp(app: Contracts.InstalledApp, appId?: string): IPromise<Contracts.InstalledApp>;
    /**
     * @param {string} appId
     * @param {string} key
     * @return IPromise<Contracts.AppSetting>
     */
    getAppData(appId: string, key: string): IPromise<Contracts.AppSetting>;
    /**
     * @param {Contracts.AppSetting} setting
     * @param {string} appId
     * @param {string} key
     * @return IPromise<Contracts.AppSetting>
     */
    updateAppData(setting: Contracts.AppSetting, appId: string, key: string): IPromise<Contracts.AppSetting>;
}
