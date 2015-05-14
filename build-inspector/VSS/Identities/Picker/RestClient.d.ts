/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import WebApi_RestClient = require("VSS/WebApi/RestClient");
export declare class AbstractIdentityPickerHttpClient extends WebApi_RestClient.VssHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesSearchRequestModel): IPromise<IdentitiesSearchResponseModel>;
    beginGetAvatar(objectId: string): IPromise<IdentitiesGetAvatarResponseModel>;
}
export declare class CommonIdentityPickerHttpClient extends AbstractIdentityPickerHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesSearchRequestModel): IPromise<IdentitiesSearchResponseModel>;
    beginGetAvatar(objectId: string): IPromise<IdentitiesGetAvatarResponseModel>;
}
export declare class AbstractMruServiceHttpClient extends WebApi_RestClient.VssHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesSearchRequestModel): IPromise<any>;
}
/**
 *   Identity Picker Models
**/
export interface IIdentity {
    objectId: string;
    objectType: string;
    originDirectory: string;
    originId: string;
    localDirectory: string;
    localId: string;
    displayName?: string;
    department?: string;
    jobTitle?: string;
    mail?: string;
    mailNickname?: string;
    physicalDeliveryOfficeName?: string;
    signInAddress?: string;
    surname?: string;
    guest?: boolean;
    description?: string;
    image?: string;
    manager?: string;
    isMru?: boolean;
}
export interface QueryTokenResultModel {
    queryToken: string;
    identities: IIdentity[];
    pagingToken?: string;
}
export interface IdentitiesSearchRequestModel {
    query: string;
    identityTypes: string[];
    operationScopes: string[];
    options?: any;
    pagingToken?: string;
    properties?: string[];
}
export interface IdentitiesSearchResponseModel {
    results: QueryTokenResultModel[];
}
export interface IdentitiesGetAvatarResponseModel {
    avatar: string;
}
