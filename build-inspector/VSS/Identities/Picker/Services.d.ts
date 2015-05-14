/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import Identities_Picker_RestClient = require("VSS/Identities/Picker/RestClient");
import Service = require("VSS/Service");
/**
*   Maps to static Directory in the DirectoryDiscoveryService
**/
export interface IOperationScope {
    /**
    *   Search the local directory - IMS (Identity service)
    **/
    Local?: boolean;
    /**
    *   Search the applicable source directory - AAD tenant-level for AAD-backed accounts or IMS account-level for MSA accounts/on-premise TFS
    **/
    Source?: boolean;
    AAD?: boolean;
    Mru?: boolean;
}
/**
*   Maps to static DirectoryObjectType in the DirectoryDiscoveryService
**/
export interface IIdentityType {
    User?: boolean;
    Group?: boolean;
}
export interface IIdentityServiceOptions {
    /**
    *   The httpClient that should be used instead of the CommonIdentityPickerHttpClient
    **/
    httpClient?: Identities_Picker_RestClient.AbstractIdentityPickerHttpClient;
}
export interface IIdentityService {
    getIdentities(prefix: string, operationScope: IOperationScope, identityType: IIdentityType, successCallback: (queryTokenResult: Identities_Picker_RestClient.QueryTokenResultModel) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
    getIdentityImages(identities: Identities_Picker_RestClient.IIdentity[], operationScope: IOperationScope, identityType: IIdentityType, successCallback: (images: IDictionaryStringTo<string>) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
}
export declare class IdentityService extends Service.VssService implements IIdentityService {
    private static _defaultProperties;
    private static _defaultUserProperties;
    private static _defaultGroupProperties;
    /**
    *   Get all users with specific properties starting with the prefix.
    *   @param  successCallback:    This is called independently for each semicolon separated queryToken that is parsed by the service and resolved to 0 or more identities
    *   @param  errorCallback:      This is called for each error received from either the controller or one of the federated services
    **/
    getIdentities(prefix: string, operationScope: IOperationScope, identityType: IIdentityType, successCallback: (queryTokenResult: Identities_Picker_RestClient.QueryTokenResultModel) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
    /**
    *   Currently supports only AAD and Source (AAD for AAD-backed accounts, and IMS for MSA accounts/on-premise TFS)
    **/
    private static getOperationScopeList(operationScope);
    /**
    *   Currently supports only Users and Groups
    **/
    private static getIdentityTypeList(identityType);
    private static getQueryTokensForIdentitesWithImages(identities);
    /**
    *   Get images of identities asynchronously, if available. Currently only supports AAD and profile images.
    *   @param  successCallback:    This is called once all the images have been loaded for the identities supplied
    *   @param  errorCallback:      This is called for each error received from either the controller or one of the federated services
    **/
    getIdentityImages(identities: Identities_Picker_RestClient.IIdentity[], operationScope: IOperationScope, identityType: IIdentityType, successCallback: (images: IDictionaryStringTo<string>) => void, errorCallback?: (errorData?: any) => void, options?: IIdentityServiceOptions): void;
}
export interface IUserMruServiceOptions {
    /**
    *   The httpClient that should be used instead of the CommonIdentityPickerHttpClient
    **/
    httpClient?: Identities_Picker_RestClient.AbstractMruServiceHttpClient;
}
export interface MruScope {
    /**
    *   Identities in the current account that have been "bound" using the SPS Identity service
    **/
    AccountBound: string;
}
/**
*   Returns MRU identities (across all IdentityTypeFilters) for the querying user at the specified scope (currently IMS Account bind-pended identities only)
**/
export interface IUserMruService {
    getIdentities(prefix: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<Identities_Picker_RestClient.IIdentity[]>;
    getIdentity(objectId: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<Identities_Picker_RestClient.IIdentity>;
    removeIdentity(objectId: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<boolean>;
    addIdentity(identity: Identities_Picker_RestClient.IIdentity, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<boolean>;
}
export declare class UserMruService extends Service.VssService implements IUserMruService {
    getIdentities(prefix: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<Identities_Picker_RestClient.IIdentity[]>;
    getIdentity(objectId: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<Identities_Picker_RestClient.IIdentity>;
    removeIdentity(objectId: string, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<boolean>;
    addIdentity(identity: Identities_Picker_RestClient.IIdentity, operationScope: MruScope, options?: IUserMruServiceOptions): IPromise<boolean>;
}
