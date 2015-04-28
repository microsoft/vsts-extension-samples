/// <reference path="../References/jquery.d.ts" />
/// <reference path="../References/VSS-Common.d.ts" />
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class SpsIdentityPickerHttpClient extends WebApi_RestClient.VssHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesRequestModel): JQueryPromise<{}>;
}
/**
 *   Identity Picker Models
**/
export interface IIdentity {
    id: string;
    displayName: string;
    image?: string;
    aad_MailNickname?: string;
    aad_SignInAddress?: string;
    aad_HasThumbnailPhoto?: boolean;
    aad_JobTitle?: string;
    aad_Department?: string;
    aad_PhysicalDeliveryOfficeName?: string;
    aad_Manager?: IIdentity;
    aad_Image?: string;
}
export interface QueryTokenResultModel {
    queryToken: string;
    identities: IIdentity[];
    pagingToken?: string;
}
export interface IdentitiesRequestModel {
    identitySourceTypes: string[];
    identityTypes: string[];
    options: any;
    pagingToken: string;
    properties: string[];
    query: string;
    scopes: string[];
}
export interface IdentitiesResponseModel {
    results: QueryTokenResultModel[];
}
export declare class IdentityOperations {
    /**
    *   Get all users with specific properties starting with the prefix
    *   @param successCallback, errorCallback: these shall be executed in the scope provided (typically 'this' of caller)
    **/
    static getAadUsersByPrefix(prefix: string, successCallback: any, errorCallback: any, scope: any): void;
    /**
    *   Get thumbnails of all users given their objectIds
    *   @param successCallback, errorCallback: these shall be executed in the scope provided (typically 'this' of caller)
    **/
    static getAadUserThumbnailsByObjectId(objectIds: string[], successCallback: any, errorCallback: any, scope: any): void;
}
