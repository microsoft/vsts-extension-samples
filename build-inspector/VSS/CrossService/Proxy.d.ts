/// <reference path="../References/VSS-Common.d.ts" />
export interface ProxyResult {
    /**
     * Indicates whether the service has the same origin with main window or not.
     */
    isSameOrigin: boolean;
    /**
     * Promise to be resolved when cross service proxy is ready.
     */
    proxyPromise?: JQueryPromise<any>;
}
export interface ServiceOptions {
    /**
     * Controller of the cross service to perform handshake.
     */
    controller?: string;
    /**
     * Action name used in the iframe action url to connect to the service (default = 'proxy').
     */
    proxyAction?: string;
    /**
     * Action name used to get antiforgery token values from the service (default = 'token').
     */
    tokenAction?: string;
    /**
     * Auth token manager to manage auth protocol with other services.
     */
    authManager?: IAuthTokenManager<any>;
}
export interface UrlParts {
    /**
     * Origin og the Url.
     */
    origin: string;
    /**
     * Origin host of the Url.
     */
    originHost: string;
    /**
     * Port of the Url.
     */
    port: string;
}
export declare function parseUrl(url: string): UrlParts;
export declare class ProxyHost {
    private static URL_REGEX;
    private static _cachedProxyPromises;
    private static _cachedTokens;
    private static _cached2Tokens;
    /**
     * Gets the proxy for the service.
     *
     * @param targetUrl Url to be called which is on cross service.
     * @param options Service options like controller name, proxy action or token action if different than default.
     * @return Proxy promise to be resolved when habdshake is finished.
     */
    static getServiceProxy(targetUrl: string, options?: ServiceOptions): ProxyResult;
    /**
     * Gets the anti-forgery token value.
     *
     * @param targetUrl Url to get the anti-forgery token value.
     * @return The INPUT element that holds the token value.
     */
    static getProxyAntiForgeryTokenValue(targetUrl: string): string;
    /**
     * Gets the anti-forgery token value (version 2).
     *
     * @param targetUrl Url to get the anti-forgery token value.
     * @return The INPUT element that holds the token value.
     */
    static getProxyAntiForgeryTokenValue2(targetUrl: string): string;
    private static createIframe(service, options?);
}
