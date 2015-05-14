/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="../References/SDK.Interfaces.d.ts" />
/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="../References/VSS-Common.d.ts" />
declare module XDM {
    interface IDeferred<T> {
        resolve: (result: T) => void;
        reject: (reason: any) => void;
        promise: IPromise<T>;
    }
    /**
    * Create a new deferred object
    */
    function createDeferred<T>(): IDeferred<T>;
    /**
     * Catalog of objects exposed for XDM
     */
    class XDMObjectRegistry implements IXDMObjectRegistry {
        private _registeredObjects;
        /**
        * Register an object (instance or factory method) exposed by this frame to callers in a remote frame
        *
        * @param instanceId unique id of the registered object
        * @param instance Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
        */
        register(instanceId: string, instance: Object | {
            (contextData?: any): Object;
        }): void;
        /**
        * Get an instance of an object registered with the given id
        *
        * @param instanceId unique id of the registered object
        * @param contextData Optional context data to pass to a registered object's factory method
        */
        getInstance<T>(instanceId: string, contextData?: Object): T;
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
        private static WINDOW_TYPES_TO_SKIP_SERIALIZATION;
        private static JQUERY_TYPES_TO_SKIP_SERIALIZATION;
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
        * Invoke a method via RPC. Lookup the registered object on the remote end of the channel and invoke the specified method.
        *
        * @param method Name of the method to invoke
        * @param instanceId unique id of the registered object
        * @param params Arguments to the method to invoke
        * @param instanceContextData Optional context data to pass to a registered object's factory method
        */
        invokeRemoteMethod<T>(methodName: string, instanceId: string, params?: any[], instanceContextData?: Object): IPromise<T>;
        /**
        * Get a proxied object that represents the object registered with the given instance id on the remote side of this channel.
        *
        * @param instanceId unique id of the registered object
        * @param contextData Optional context data to pass to a registered object's factory method
        */
        getRemoteObjectProxy<T>(instanceId: string, contextData?: Object): IPromise<T>;
        private invokeMethod(registeredInstance, rpcMessage);
        private getRegisteredObject(instanceId, instanceContext?);
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
        private _shouldSkipSerialization(obj);
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
        private _handleMessageReceived(event);
        private _subscribe(windowObj);
    }
}
declare module VSS {
    var VssSDKVersion: string;
    /**
     * Initiates the handshake with the host window.
     *
     * @param options Initialization options for the extension.
     */
    function init(options: IExtensionInitializationOptions): void;
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
    /**
    * Register a callback that gets called once the initial setup/handshake has completed.
    * If the initial setup is already completed, the callback is invoked at the end of the current call stack.
    */
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
    * Get the context about the extension that owns the content that is being hosted
    */
    function getExtensionContext(): IExtensionContext;
    /**
    * Gets the information about the contribution that first caused this extension to load.
    */
    function getContribution(): IContribution;
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
    function getServiceContributions(contributionPointId: string, contributionId?: string): IPromise<IServiceContribution[]>;
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
    * Get an instance of an object registered with the given id
    *
    * @param instanceId unique id of the registered object
    * @param contextData Optional context data to pass to the contructor of an object factory method
    */
    function getRegisteredObject(instanceId: string, contextData?: Object): Object;
    /**
    * Fetch an access token which will allow calls to be made to other VSO services
    */
    function getAccessToken(): IPromise<ISessionToken>;
    /**
    * Requests the parent window to resize the container for this extension based on the current extension size.
    */
    function resize(): void;
}
