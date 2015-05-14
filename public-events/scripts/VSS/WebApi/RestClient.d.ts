/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/q.d.ts" />
import Q = require("q");
import Serialization = require("VSS/Serialization");
import WebApi_Contracts = require("VSS/WebApi/Contracts");
/**
* Parameters for sending a WebApi request
*/
export interface VssApiResourceRequestParams {
    /**
    * Name of the area for the resource
    */
    area: string;
    /**
    * Unique identifier for the resource's route to issue a request to
    */
    locationId: string;
    /**
    * Dictionary of route template replacement values
    */
    routeValues?: {
        [key: string]: any;
    };
    /**
    * Data to post. In this case of a GET, this indicates query parameters.
    * For other requests, this is the request body object (which will be serialized
    * into a JSON string unless isRawData is set to true).
    */
    data?: any;
    /**
    * Query parameters to add to the url. In the case of a GET, query parameters can
    * be supplied via 'data' or 'queryParams'. For other verbs such as POST, the
    * data object specifies the POST body, so queryParams is needed to indicate
    * parameters to add to the query string of the url (not included in the post body).
    */
    queryParams?: IDictionaryStringTo<any>;
    /**
    * HTTP verb (GET by default if not specified)
    */
    httpMethod?: string;
    /**
    * The http response (Accept) type. This is "json" (corresponds to application/json Accept header)
    * unless otherwise specified. Other possible values are "html" or "text".
    */
    httpResponseType?: string;
    /**
    * Contract metadata for the request body. This allows us to do the necessary serialization
    * for the provided 'data' object using VSS serialization settings.
    */
    requestType?: Serialization.ContractMetadata;
    /**
    * Contract metadata for the response. This allows us to do the necessary deserialization
    * for the response object using VSS serialization settings.
    */
    responseType?: Serialization.ContractMetadata;
    /**
    * Indicates that the response is expected to be a wrapped array, so unwrap the response to
    * a regular array.
    */
    responseIsCollection?: boolean;
    /**
    * Allows the caller to specify custom request headers.
    */
    customHeaders?: {
        [headerName: string]: any;
    };
    /**
    * Request timeout in milliseconds. The default is 5 minutes.
    */
    timeout?: number;
    /**
    * The api version string to send in the request (e.g. "1.0" or "2.0-preview.2")
    */
    apiVersion?: string;
    /**
    * If true, this indicates that no processing should be done on the 'data' object
    * before it is sent in the request. *This is rarely needed*. One case is when posting
    * an HTML5 File object.
    */
    isRawData?: boolean;
}
/**
* Base class that should be used (derived from) to make requests to VSS REST apis
*/
export declare class VssHttpClient {
    private static APIS_RELATIVE_PATH;
    private static DEFAULT_REQUEST_TIMEOUT;
    private static _legacyDateRegExp;
    private _locationsByAreaPromises;
    _rootRequestPath: string;
    authTokenManager: IAuthTokenManager<any>;
    private _initializationPromise;
    constructor(rootRequestPath: string);
    /**
     * Sets a promise that is waited on before any requests are issued. Can be used to asynchronously
     * set the request url and auth token manager.
     */
    _setInitializationPromise(promise: IPromise<any>): void;
    /**
    * Issue a request to a VSS REST endpoint.
    *
    * @param requestParams request options
    * @param useAjaxResult If true, textStatus and jqXHR are added to the success callback. In this case, spread (instead of then) needs to be used
    * @returns Q Promise for the response
    */
    _beginRequest<T>(requestParams: VssApiResourceRequestParams, useAjaxResult?: boolean): IPromise<T>;
    /**
    * Issue a request to a VSS REST endpoint and makes sure the result contains jqXHR. Use spread to access jqXHR.
    *
    * @param requestParams request options
    * @returns Q Promise for the response
    */
    _beginRequestWithAjaxResult<T>(requestParams: VssApiResourceRequestParams): Q.Promise<T>;
    /**
     * Issue an AJAX request. This is a wrapper around jquery's ajax method that handles VSS authentication
     * and triggers events that can be listened to by other modules.
     *
     * @param requestUrl Url to send the request to
     * @param ajaxOptions jQuery.ajax options
     * @param useAjaxResult If true, textStatus and jqXHR are added to the success callback. In this case, spread (instead of then) needs to be used.
     */
    _issueAjaxRequest(requestUrl: string, ajaxOptions: JQueryAjaxSettings, useAjaxResult?: boolean): IPromise<any>;
    /**
     * Gets information about an API resource location (route template, supported versions, etc.)
     *
     * @param area resource area name
     * @param locationId Guid of the location to get
     */
    _beginGetLocation(area: string, locationId: string): IPromise<WebApi_Contracts.ApiResourceLocation>;
    private beginGetAreaLocations(area);
    private getRequestUrl(location, routeValues, queryParams?);
    private replaceRouteValues(routeTemplate, routeValues);
    _getLinkResponseHeaders(xhr: XMLHttpRequest): {
        [relName: string]: string;
    };
}
