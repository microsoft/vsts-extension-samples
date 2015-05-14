/// <reference path="References/VSS-Common.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
import WebApi_RestClient = require("VSS/WebApi/RestClient");
/**
* A connection to a particular TeamFoundation host
*/
export declare class VssConnection {
    private static _connectionsCache;
    private _webContext;
    private _hostType;
    private _hostContext;
    private _services;
    private _httpClients;
    /**
    * Get a (cached) VssConnection object of the given type
    *
    * @param webContext Specific web context to get the connection for
    * @param hostType Host type to scope the connection to
    */
    static getConnection(webContext?: Contracts_Platform.WebContext, hostType?: Contracts_Platform.ContextHostType): VssConnection;
    /**
    * Get the host context information given a web context and the desired host type
    */
    private static getHostContext(webContext, hostType);
    /**
    * Create a new connection object
    * @param webContext Specific web context to get the connection for
    * @param hostType Host type to scope the connection to
    */
    constructor(webContext: Contracts_Platform.WebContext, hostType?: Contracts_Platform.ContextHostType);
    getWebContext(): Contracts_Platform.WebContext;
    /**
    * Gets the host information that this service is scoped to
    */
    getHostContext(): Contracts_Platform.HostContext;
    /**
    * Gets the host type that this service is scoped to
    */
    getHostType(): Contracts_Platform.ContextHostType;
    /**
    * Gets the relative service host url for this connection
    */
    getHostUrl(): string;
    /**
    * Gets a (potentially-cached) service associated with this connection
    */
    getService<T extends VssService>(serviceType: {
        new (): T;
    }, useCached?: boolean): T;
    /**
     * Returns a new or a cached instance of an httpClient for the given type.
     *
     * @param httpClientType Type of requeested httpClient.
     * @param serviceInstanceId Unique id of the service to scope the http client to
     * @return http client of the specified type (clients are cached for this connection)
     */
    getHttpClient<T extends WebApi_RestClient.VssHttpClient>(httpClientType: {
        new (url: string): T;
    }, serviceInstanceId?: string): T;
    /**
    * Get the url for the given service
    *
    * @param serviceInstanceId Unique identifier of the VSO service to get the url for
    * @param hostType The type of host to get the url for
    */
    beginGetServiceUrl(serviceInstanceId: string, hostType?: Contracts_Platform.ContextHostType): IPromise<string>;
    private _isSameOrigin(serviceUrl);
}
/**
* A client service which can be cached per TFS connection.
*/
export declare class VssService {
    private _connection;
    /**
    * Gets the relative location for the service's connection
    */
    getConnection(): VssConnection;
    getWebContext(): Contracts_Platform.WebContext;
    /**
    * Sets the VssConnection to use for this service
    * @param connection VssConnection used by this service
    */
    initializeConnection(connection: VssConnection): void;
}
/**
* Get a collection-level service
* @param serviceType Type of service to get
* @param webContext optional web context to use for the connection
* @return Collection-level service
*/
export declare function getCollectionService<T extends VssService>(serviceType: {
    new (): T;
}, webContext?: Contracts_Platform.WebContext): T;
/**
* Get an application-level (Account) service
* @param serviceType Type of service to get
* @param webContext optional web context to use for the connection
* @return Application-level service
*/
export declare function getApplicationService<T extends VssService>(serviceType: {
    new (): T;
}, webContext?: Contracts_Platform.WebContext): T;
/**
* Get a service for the web context's default host type
* @param serviceType Type of service to get
* @param webContext optional web context to use for the connection
* @return Collection-level or Application-level service
*/
export declare function getService<T extends VssService>(serviceType: {
    new (): T;
}, webContext?: Contracts_Platform.WebContext): T;
/**
* Get a collection-level HTTP client
* @param httpClientType Type of http client to get
* @param webContext optional web context to use for the connection
* @return collection-level client
*/
export declare function getCollectionClient<T extends WebApi_RestClient.VssHttpClient>(httpClientType: {
    new (url: string): T;
}, webContext?: Contracts_Platform.WebContext): T;
/**
* Get an application-level (Account) HTTP client
* @param httpClientType Type of http client to get
* @param webContext optional web context to use for the connection
* @return application-level client
*/
export declare function getApplicationClient<T extends WebApi_RestClient.VssHttpClient>(httpClientType: {
    new (url: string): T;
}, webContext?: Contracts_Platform.WebContext): T;
/**
* Get an http client for the web context's default host type
* @param serviceType Type of http client to get
* @param webContext optional web context to use for the connection
* @return Collection-level or Application-level http client
*/
export declare function getClient<T extends WebApi_RestClient.VssHttpClient>(httpClientType: {
    new (url: string): T;
}, webContext?: Contracts_Platform.WebContext): T;
