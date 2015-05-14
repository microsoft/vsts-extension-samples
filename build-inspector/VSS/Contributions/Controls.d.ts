/// <reference path="../References/VSS-Common.d.ts" />
import Contributions_Contracts = require("VSS/Contributions/Contracts");
import Contributions_Services = require("VSS/Contributions/Services");
import Controls = require("VSS/Controls");
/**
* Common interface between internal and external contribution hosts
*/
export interface IExtensionHost {
    /**
    * Get an instance of a registered object in an extension
    *
    * @param instanceId Id of the instance to get
    * @param contextData Optional data to pass to the extension for it to use when creating the instance
    * @return Promise that is resolved to the instance (or a proxy object that talks to the instance in the iframe case)
    */
    getRegisteredInstance<T>(instanceId: string, contextData?: any): IPromise<T>;
}
/**
* Options for contribution host controls
*/
export interface ContributionHostOptions {
    /**
    * Uri that the child frame points to
    */
    uri: string;
    /**
    * The app that is contributing the content
    */
    app: Contributions_Contracts.App;
    /**
    * If undefined, perform a GET request to obtain the iframe content. If postContent is specified it will be POST'ed to the child iframe url
    */
    postContent?: any;
    /**
    * Initial configuration/options to be passed to the content as part of the XDM handshake
    */
    initialConfig?: any;
}
/**
* Options for the external content host control
*/
export interface ExternalContentHostOptions extends ContributionHostOptions {
    /**
    * If true, setup an XDM channel with the child frame (this flag indicates that the child frame uses VSS.SDK).
    */
    interactive?: boolean;
    /**
    * The amount of time in milliseconds before showing a slow-loading message. The default is 10 seconds (10000). Set to 0 to turn this feature off.
    */
    slowLoadWarningDuration?: number;
}
/**
* A control that hosts external content via iframe
*/
export declare class ExternalContentHost extends Controls.Control<ExternalContentHostOptions> implements IExtensionHost {
    static DEFAULT_SLOW_LOAD_DURATION: number;
    static MAX_WAIT_FOR_LOADED_EVENT: number;
    static Events: {
        EXTENSION_LOAD_FAILED: string;
        SLOW_LOAD_WARNING: string;
        EXTENSION_MESSAGE_RESIZED: string;
    };
    private _xdmChannel;
    private _$container;
    private _$iframe;
    private _iframeId;
    private _receivedLoadedEvent;
    private _loadFailed;
    private _loadedDeferred;
    private _$statusContainer;
    private _statusControl;
    private _messageArea;
    constructor(options?: ExternalContentHostOptions);
    /**
    * Gets the jQuery element of the iframe being hosted
    */
    private getIFrame();
    /**
    * Gets the jQuery element of the iframe being hosted
    */
    private getWindow();
    /**
    * Gets the XDM channel used to communicate with the child iframe
    */
    private getXdmChannel();
    /**
    * Initialize the XDM channel if we haven't already done so
    */
    private ensureXdmChannelIntialized();
    initialize(): void;
    private _showExtensionMessage(messageType, messageTitle, messageContentHtml, messageIsFromExtension, expandDetails);
    private _handleLoadError(errorMessage);
    private _hideLoadingIndicator();
    private _handleLoaded();
    /**
    * Get an instance of a registered object in an extension
    *
    * @param instanceId Id of the instance to get
    * @param contextData Optional data to pass to the extension for it to use when creating the instance
    * @return Promise that is resolved to the instance (or a proxy object that talks to the instance in the iframe case)
    */
    getRegisteredInstance<T>(instanceId: string, contextData?: any): IPromise<T>;
    /**
    * Execute a method in the child iframe
    *
    * @param methodName Name of the RPC method to invoke via XDM
    * @param params Arguments to pass to the method
    */
    invokeMethod(methodName: string, params?: any[]): IPromise<any>;
    /**
     * Get the host control object which the VSS.SDK can interact with to
     * for initial handshake, resizinig, etc.
     */
    private getHostControl();
}
/**
* A control that hosts internal content by injecting it into the parent DOM
*/
export declare class InternalContentHost extends Controls.Control<ContributionHostOptions> implements IExtensionHost {
    private _$contentContainer;
    private _loadedDeferred;
    constructor(options?: ContributionHostOptions);
    initialize(): void;
    /**
    * Get an instance of a registered object in an extension
    *
    * @param instanceId Id of the instance to get
    * @param contextData Optional data to pass to the extension for it to use when creating the instance
    * @return Promise that is resolved to the instance (or a proxy object that talks to the instance in the iframe case)
    */
    getRegisteredInstance<T>(instanceId: string, contextData?: any): IPromise<T>;
    private handleContentReceived(content);
}
/**
* Instantiate a contributed control through an internal or external contribution host.
*
* @param $container The jQuery element to place the control in
* @param contribution The contribution which contains the details of the contributed control
* @param url The url of the contribution content
* @param initialConfig Initial configuration/options to pass to the control
* @param postContent: Optional data to post to the contribution url (if not specified, a GET is performed)
* @param usePooledBackgroundHost: Set to true if the host will not be shown in the UI and we want to re-use an existing pooled host that points to the same endpoint.
* @return IExtensionHost
*/
export declare function createExtensionHost<TControlInterface>($container: JQuery, uri: string, contribution: Contributions_Services.Contribution, initialConfig?: any, postContent?: any): IExtensionHost;
/**
* Instantiate a contributed control through an internal or external contribution host.
*
* @param contribution The contribution which contains the details of the contributed control
* @param url The url of the contribution content
* @return IExtensionHost
*/
export declare function getBackgroundHost<TControlInterface>(uri: string, contribution: Contributions_Services.Contribution): IExtensionHost;
/**
 * Manages a pool of hosts (iframes) used for making RPCs to various app implementations
 */
export declare class BackgroundHostPool {
    private _hostsContainer;
    private _hosts;
    constructor();
    /**
     * Retrieve the container that background host iframes live in
     * @return JQuery
     */
    private getHostsContainer();
    /**
    * Gets an AppHost for the given contribution. May re-use old hosts,
    * return an existing host for this contribution, or create a new one.
    *
    * @param Contribution_Services.Contribution
    * @param initialConfig Initial configuration/options to pass to the host control (ignored if using a cached host)
    * @param postContent: Optional data to post to the contribution url. If not specified, a GET is performed. (ignored if using a cached host)
    * @return AppHost
    */
    getHost(uri: string, contribution: Contributions_Services.Contribution, initialConfig?: any, postContent?: any): ExternalContentHost;
    /**
     * Creates a new host that is hidden in the UI (for RPCs)
     */
    private createBackgroundHost(uri, contribution, initialConfig?, postContent?);
}
/**
* Default pool of background (non-UI) external host/iframes used for communicating with extensions
*/
export declare var backgroundHostPool: BackgroundHostPool;
