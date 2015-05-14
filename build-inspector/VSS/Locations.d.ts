/// <reference path="References/VSS-Common.d.ts" />
/// <reference path="References/q.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
/**
* Options for generating content urls
*/
export interface ContentLocationOptions {
    /**
    * Unique id of the service to generate the url for
    */
    serviceInstanceId?: string;
    /**
    * Specific web context to use when generating the url
    */
    webContext?: Contracts_Platform.WebContext;
    /**
    * Host level to get the url of
    */
    hostType?: Contracts_Platform.ContextHostType;
    /**
    * Relative path to append to the url
    */
    relativePath?: string;
    /**
    * Query parameters to add to the url
    */
    queryParams?: IDictionaryStringTo<string>;
}
/**
* Options for generating MVC urls
*/
export interface MvcRouteOptions {
    /**
    * Unique id of the service to generate the url for
    */
    serviceInstanceId?: string;
    /**
    * Specific web context to use when generating the url
    */
    webContext?: Contracts_Platform.WebContext;
    /**
    * Navigation level at which to generate the url (Deployment, Account, Collection, Project, Team)
    */
    level?: Contracts_Platform.NavigationContextLevels;
    /**
    * Route Area (e.g. "admin") or null/undefined for the default
    */
    area?: string;
    /**
    * MVC controller name
    */
    controller?: string;
    /**
    * Controller action
    */
    action?: string;
    /**
    * Array of parameters (path parts) to append to the path (after controller and action)
    */
    parameters?: string[];
    /**
    * Override the project in the web context
    */
    project?: string;
    /**
    * Override the team in the web context
    */
    team?: string;
    /**
    * Query parameters to add to the url
    */
    queryParams?: IDictionaryStringTo<string>;
}
/**
* Helper class for generating urls
*/
export declare class UrlHelper {
    private static SAFE_URI_SCHEME_LIST;
    private _areaPrefix;
    private _controllerPrefix;
    constructor(areaPrefix?: string, controllerPrefix?: string);
    /**
    * Get the url of particular content. If a service id is specified, its url needs to already be in the cached locations.
    *
    * @param options Url generation options
    * @return The generated url string
    */
    getContentUrl(options: ContentLocationOptions): string;
    /**
    * Get the url of a versioned _content file from the hosting page's service.
    *
    * @param contentFileName filename relative to "/_static/tfs/{Version}/_content/"
    * @return The generated url string
    */
    getVersionedContentUrl(contentFileName: string): string;
    /**
    * Get the url of an MVC endpoint. If a service id is specified, its url needs to already be in the cached locations.
    *
    * @param options Url generation options
    * @return The generated url string
    */
    getMvcUrl(options: MvcRouteOptions): string;
    /**
     * Check if specified URL is safe - i.e. part of an approved list of URL schemes.
     *
     * @param url Url to check
     * @return
     */
    isSafeProtocol(url: string): boolean;
}
/**
* Url helper which provides methods for generating urls
*/
export declare var urlHelper: UrlHelper;
/**
* Get the url for the given service if its location has already been cached
*
* @param serviceInstanceId Unique id for the service
* @param hostType The host level to get the url for
* @param webContext The original context to get the url for
* @return Url if the location could be resolved
*/
export declare function getCachedServiceLocation(serviceInstanceId: string, hostType: Contracts_Platform.ContextHostType, webContext?: Contracts_Platform.WebContext): string;
/**
* Get the url for the given service
* @param serviceInstanceId Unique id for the service
* @param hostType The host level to get the url for
* @param webContext The original context to get the url for
* @return Promise that resolves to the location string
*/
export declare function beginGetServiceLocation(serviceInstanceId: string, hostType: Contracts_Platform.ContextHostType, webContext?: Contracts_Platform.WebContext): IPromise<string>;
