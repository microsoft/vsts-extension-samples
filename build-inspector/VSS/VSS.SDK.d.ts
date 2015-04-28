/// <reference path="References/VSS-Common.d.ts" />
/// <reference path="References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="SDK.Interfaces.d.ts" />
/// <reference path="References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="References/VSS-Common.d.ts" />
declare module XDM {
    interface IDeferred<T> {
        resolve: (result: T) => void;
        reject: (reason: any) => void;
        promise: IPromise<T>;
    }
    interface IXDMMethodInfo {
        method: Function;
        thisObj: any;
    }
    /**
    * Create a new deferred object
    */
    function createDeferred<T>(): IDeferred<T>;
    /**
     * Catalog of objects exposed for XDM where the key is as follows:
     *
     * ClassName{[instanceId]}.method
     *
     * Examples:
     *     Access singleton Calculator's add function - Calculator.add(3,5)
     *     Key: "Calculator"
     *
     * XDMChannel looks up object from the IJsonRpcMessage passed into onMessage
     */
    class XDMObjectRegistry implements IXDMObjectRegistry {
        private _registeredObjects;
        /**
        * Lookup a method on a registered object. Returns null if the object is
        * not found or the method does not exist on the object.
        *
        * @param fullMethodPath The name of the registered object + '.' + the method name
        * @return XDM method info
        */
        getRegisteredMethodInfo(fullMethodPath: string): IXDMMethodInfo;
        /**
        * Register an object so that its methods can be invoked in an XDM channel
        *
        * @param obj object to register. This object should have functions on it that can be invoked remotely
        * @param name Unique name of the object to register.
        */
        register(obj: any, name: string): void;
    }
    /**
    * The registry of global XDM handlers
    */
    var globalObjectRegistry: XDMObjectRegistry;
    /**
     * Represents a channel of communication between frames\document
     * Stays "alive" across multiple funtion\method calls
     */
    class XDMChannel implements IXDMChannel {
        private static _nextChannelId;
        private static MAX_XDM_DEPTH;
        private _nextMessageId;
        private _deferreds;
        private _postToWindow;
        private _targetOrigin;
        private _handshakeToken;
        private _channelObjectRegistry;
        private _channelId;
        private _nextProxyFunctionId;
        private _proxyFunctions;
        constructor(postToWindow: Window, targetOrigin?: string);
        /**
        * Get the object registry to handle messages from this specific channel.
        * Upon receiving a message, this channel registry will be used first, then
        * the global registry will be used if no handler is found here.
        */
        getObjectRegistry(): IXDMObjectRegistry;
        /**
        * Post a message to the other side of the XDM channel
        *
        * @param method Name of the method to invoke
        * @param params Arguments to the method to invoke
        * @param success Callback method to invoke when the remote procedure succeeds
        * @param error Callback method to invoke when the remote procedure fails
        */
        postMessage<T>(method: string, params?: any[]): IPromise<T>;
        /**
        * Handle a received message on this channel. Dispatch to the appropriate object found via object registry
        *
        * @param data Message data
        * @param origin Origin of the frame that sent the message
        * @return True if the message was handled by this channel. Otherwise false.
        */
        onMessage(data: any, origin: string): boolean;
        owns(source: Window, origin: string, data: any): boolean;
        private _error(messageObj, errorObj, handshakeToken);
        private _success(messageObj, result, handshakeToken);
        private _sendRpcMessage(message);
        private _customSerializeObject(obj, parentObjects?, nextCircularRefId?, depth?);
        private _registerProxyFunction(func, context);
        private _customDeserializeObject(obj, circularRefs?);
    }
    /**
    * Registry of XDM channels kept per target frame/window
    */
    class XDMChannelManager implements IXDMChannelManager {
        private static _default;
        private _channels;
        constructor();
        static get(): XDMChannelManager;
        /**
        * Add an XDM channel for the given target window/iframe
        *
        * @param window Target iframe window to communicate with
        * @param targetOrigin Url of the target iframe (if known)
        */
        addChannel(window: Window, targetOrigin?: string): IXDMChannel;
        /**
        * Broadcast a message to all channels managed by this channel manager
        *
        * @param method Name of the method to invoke
        * @param params Arguments to the method to invoke
        * @param success Callback method to invoke when the remote procedure succeeds
        * @param error Callback method to invoke when the remote procedure fails
        */
        broadcastMessage(method: string, params?: any[]): void;
        private _handleMessageReceived(event);
        private _subscribe(windowObj);
    }
}
declare module VSS {
    /**
    * Options for the extension's initialization method
    */
    interface ExtensionInitializationOptions {
        /**
        * Set to true if the extension will explicitly call notifyLoadSucceeded or notifyLoadFailed
        * itself to indicate that the extension is done loading (stops UI loading indicator in the host).
        * If false (the default) the extension is considered ready as soon as init is called.
        */
        explicitNotifyLoaded?: boolean;
        /**
        * If true setup the AMD script module loader with the host's AMD configuration
        * so that 'require' statements can be used to load VSO modules.
        */
        setupModuleLoader?: boolean;
        /**
        * Extension-specific AMD module loader configuration. This configuration
        * will be merged with the VSO-specific configuration.
        */
        moduleLoaderConfig?: ModuleLoaderConfiguration;
    }
    /**
     * Initiates the handshake with the host window.
     *
     * @param options Initialization options for the extension.
     */
    function init(options: ExtensionInitializationOptions): void;
    /**
     * Ensures that the AMD loader from the host is configured and fetches a script (AMD) module
     * (and its dependencies). If no callback is supplied, this will still perform an asynchronous
     * fetch of the module (unlike AMD require which returns synchronously). This method has no return value.
     *
     * Usage:
     *
     * VSS.require(["VSS/Controls", "VSS/Controls/Grids", function(Controls, Grids) {
     *    ...
     * });
     *
     * @param modules A single module path (string) or array of paths (string[])
     * @param callback Method called once the modules have been loaded.
     */
    function require(modules: string[] | string, callback?: Function): void;
    function ready(callback: () => void): void;
    /**
    * Notifies the host that the extension successfully loaded (stop showing the loading indicator)
    */
    function notifyLoadSucceeded(): void;
    /**
    * Notifies the host that the extension failed to load
    */
    function notifyLoadFailed(e: any): void;
    /**
    * Get the web context from the parent host
    */
    function getWebContext(): WebContext;
    /**
    * Get the configuration data passed in the initial handshake from the parent frame
    */
    function getConfiguration(): any;
    /**
    * Get the context about the app that owns the content that is being hosted
    */
    function getExtensionContext(): IExtensionContext;
    /**
    * Get a contributed service from the parent host.
    *
    * @param serviceId Id of the vss.web#service contribution to get the instance of
    * @param context Optional context information to use when obtaining the service instance
    */
    function getService<T>(serviceId: string, context?: Object): IPromise<T>;
    /**
    * For a given contribution point id, get contributions which contribute background services.
    *
    * @param contributionPointId Contribution point id to query
    * @param contributionId Optional filter to only include contributions with the given id
    */
    function getServiceContributions<T>(contributionPointId: string, contributionId?: string): IPromise<IServiceContribution[]>;
    /**
    * Register an object (instance or factory method) that this extension exposes to the host frame.
    *
    * @param instanceId unique id of the registered object
    * @param instance Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    function register(instanceId: string, instance: Object | {
        (contextData?: any): Object;
    }): void;
    /**
    * Fetch an access token which will allow calls to be made to other VSO services
    */
    function getAccessToken(): IPromise<ISessionToken>;
    /**
    * Requests the parent window to resize the container for this extension based on the current extension size.
    */
    function resize(): void;
    function api(path: string, apiResourceScope: string, verb: string, headers: any, params: any, success?: (response: string) => void, error?: (exception) => void): void;
}
