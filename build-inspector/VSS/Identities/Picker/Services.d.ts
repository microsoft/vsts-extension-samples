/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import RestClient = require("VSS/Identities/Picker/RestClient");
import Service = require("VSS/Service");
export interface IdentityScope {
    Account?: boolean;
    Authority?: boolean;
}
export interface IdentityType {
    User?: boolean;
    Group?: boolean;
}
export interface IIdentityServiceOptions {
    /**
    *   The httpClient that should be used instead of the CommonIdentityPickerHttpClient
    **/
    httpClient?: RestClient.AbstractIdentityPickerHttpClient;
}
export declare class IdentityService extends Service.VssService {
    private static _defaultAadUserProperties;
    private static _defaultVsoUserProperties;
    private static _defaultAadGroupProperties;
    private static _defaultVsoGroupProperties;
    /**
    *   Get all users with specific properties starting with the prefix.
    *   @param  successCallback:    This is called independently for each semicolon separated queryToken that is parsed by the service and resolved to 0 or more identities
    *   @param  errorCallback:      This is called for each error received from either the controller or one of the federated services
    **/
    getIdentities(prefix: string, identityScope: IdentityScope, identityType: IdentityType, successCallback: (queryTokenResult: RestClient.QueryTokenResultModel) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
    /**
    * Currently supports only AAD and Account
    **/
    private static getIdentityScopeList(identityScope);
    /**
    * Currently supports only Users and Groups
    **/
    private static getIdentityTypeList(identityType);
    private static getQueryTokensForIdentitesWithImages(identities);
    /**
    *   Get images of identities asynchronously, if available. Currently only supports AAD and profile images.
    *   @param  successCallback:    This is called once all the images have been loaded for the identities supplied
    *   @param  errorCallback:      This is called for each error received from either the controller or one of the federated services
    **/
    getIdentityImages(identities: RestClient.IIdentity[], identityScope: IdentityScope, identityType: IdentityType, successCallback: (images: IDictionaryStringTo<string>) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
}
