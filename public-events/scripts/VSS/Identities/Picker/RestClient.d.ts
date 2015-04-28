/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import RestClient = require("VSS/WebApi/RestClient");
export declare class AbstractIdentityPickerHttpClient extends RestClient.VssHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesRequestModel): JQueryPromise<IdentitiesResponseModel>;
}
export declare class CommonIdentityPickerHttpClient extends AbstractIdentityPickerHttpClient {
    beginGetIdentities(identitiesRequest: IdentitiesRequestModel): JQueryPromise<IdentitiesResponseModel>;
}
/**
 *   Identity Picker Models
**/
export interface IIdentity {
    id: string;
    displayName: string;
    displayType: string;
    signInAddress?: string;
    image?: string;
    aad_Mail?: string;
    aad_MailNickname?: string;
    aad_HasThumbnailPhoto?: boolean;
    aad_JobTitle?: string;
    aad_Department?: string;
    aad_PhysicalDeliveryOfficeName?: string;
    aad_Manager?: IIdentity;
    aad_Image?: string;
    aad_Description?: string;
    vso_Image: string;
}
export interface QueryTokenResultModel {
    queryToken: string;
    identities: IIdentity[];
    pagingToken?: string;
}
export interface IdentitiesRequestModel {
    query: string;
    identityTypes: string[];
    scopes: string[];
    identitySourceTypes?: string[];
    options?: any;
    pagingToken?: string;
    properties?: string[];
}
export interface IdentitiesResponseModel {
    results: QueryTokenResultModel[];
}
