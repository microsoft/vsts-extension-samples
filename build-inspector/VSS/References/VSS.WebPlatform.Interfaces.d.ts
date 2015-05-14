/// <reference path='jquery.d.ts' />

//----------------------------------------------------------
// Common interfaces specific to WebPlatform area
//----------------------------------------------------------

/**
* VSS-specific options for VSS ajax requests
*/
interface IVssAjaxOptions {

    /*
    * Auth token manager that can be used to get and attach auth tokens to requests
    */
    authTokenManager?: IAuthTokenManager<any>;

    /**
    * App id to use to scope the auth token to. An unscoped token is generated if no app id is provided.
    */
    appId?: string;

    /**
     * If true, textStatus and jqXHR are added to the success callback. In this case, spread (instead of then) needs to be used (default false).
     */
    useAjaxResult?: boolean;
}

/**
* Event listener for VSS ajax events. Gets notified before and after each request
*/
interface IVssAjaxEventListener {

    /**
    * Method invoked before a request is sent
    *
    * @param requestId A unique id that can be used to track this particular request (id is unique among all clients)
    * @param requestUrl Url of the request that is about to be issued
    * @param ajaxOptions Ajax settings/options for the request
    * @param vssRequestOptions Additional VSS-specific options supplied in the request
    */
    beforeRequest?: (requestId: number, requestUrl: string, ajaxOptions: JQueryAjaxSettings, vssRequestOptions: IVssAjaxOptions) => void;

    /**
    * Method invoked when a response has been received
    *
    * @param requestId A unique id that can be used to track this particular request (id is unique among all clients)
    * @param data The response data
    * @param textStatus A string indicating status of the request
    * @param jqXHR: The jQuery XHR object for the request
    * @param vssRequestOptions Additional VSS-specific options supplied in the request
    */
    responseReceived?: (requestId: number, data: any, textStatus: string, jqXHR: JQueryXHR, vssRequestOptions: IVssAjaxOptions) => void;
    
    /**
    * Method invoked after a response has been received and its callback/promise has been invoked
    *
    * @param requestId A unique id that can be used to track this particular request (id is unique among all clients)
    * @param data The response data
    * @param textStatus A string indicating status of the request
    * @param jqXHR: The jQuery XHR object for the request
    * @param vssRequestOptions Additional VSS-specific options supplied in the request
    */
    postResponseCallback?: (requestId: number, data: any, textStatus: string, jqXHR: JQueryXHR, vssRequestOptions: IVssAjaxOptions) => void;
}

/**
* Interface for a class that can fetch auth tokens to be used in AJAX requests.
*/
interface IAuthTokenManager<TToken> {
    /**
     * Issues an unscoped session token for the current user asynchronously. 
     *
     * @param name Metadata info to identify the token.
     * @param force Enables skipping cache and issue a brand new token.
     * @return Session token.
     */
    beginGetUnscopedToken(name?: string, force?: boolean): IPromise<TToken>;

    /**
     * Issues a session token using the specified appId for the current user asynchronously.
     *
     * @param appId Id of the application.
     * @param name Metadata info to identify the token.
     * @param force Enables skipping cache and issue a brand new token.
     * @return Session token.
     */
    beginGetAppToken(appId: string, name?: string, force?: boolean): IPromise<TToken>;

    /**
     * Gets the cached unscoped token.
     *
     * @return Session token.
     */
    getUnscopedToken(): TToken;

    /**
     * Gets the cached session token for the specified app.
     * 
     * @param Id of the application.
     * @return Session token.
     */
    getAppToken(appId: string): TToken;

    /**
     * Sets the authorization header of the specified request using Basic auth.
     *
     * @param request Request to set the authorization header.
     * @param sessionToken Used for token key.
     */
    setBasicAuthHeader(request: XMLHttpRequest, sessionToken: TToken): void;

    /**
     * Creates the authorization header of the specified request using Basic auth.
     *
     * @param sessionToken Used for token key.
     * @return the Basic Auth header for specified session token.
     */
    createBasicAuthHeader(sessionToken: TToken): string;
}

/**
* A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method,
* which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.
*/
interface IPromise<T> {
    then<U>(onFulfill: (value: T) => IPromise<U> | void, onReject?: (reason: any) => IPromise<U> | void): IPromise<U>;
    then<U>(onFulfill: (value: T) => IPromise<U> | void, onReject?: (reason: any) => U | void): IPromise<U>;
    then<U>(onFulfill: (value: T) => U | void, onReject?: (reason: any) => IPromise<U> | void): IPromise<U>;
    then<U>(onFulfill: (value: T) => U | void, onReject?: (reason: any) => U | void): IPromise<U>;
}

