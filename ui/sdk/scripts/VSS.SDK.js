///<reference path='References/VSS-Common.d.ts' />
///<reference path='References/VSS.SDK.Interfaces.d.ts' />
///<reference path='SDK.Interfaces.d.ts' />
///<reference path='References/VSS.SDK.Interfaces.d.ts' />
///<reference path='References/VSS-Common.d.ts' />
/// This file is going to be embedded into the following typescript files in the build time:
///     - XDM.Host.ts
///     - SDK.ts
/// This module is unlike other modules which doesn't use AMD loading.
var XDM;
(function (XDM) {
    /**
    * Create a new deferred object
    */
    function createDeferred() {
        return new XdmDeferred();
    }
    XDM.createDeferred = createDeferred;
    var XdmDeferred = (function () {
        function XdmDeferred() {
            var _this = this;
            this._resolveCallbacks = [];
            this._rejectCallbacks = [];
            this._isResolved = false;
            this._isRejected = false;
            this.resolve = function (result) {
                _this._resolve(result);
            };
            this.reject = function (reason) {
                _this._reject(reason);
            };
            this.promise = {};
            this.promise.then = function (onFulfill, onReject) {
                return _this._then(onFulfill, onReject);
            };
        }
        XdmDeferred.prototype._then = function (onFulfill, onReject) {
            var _this = this;
            if ((!onFulfill && !onReject) || (this._isResolved && !onFulfill) || (this._isRejected && !onReject)) {
                return this.promise;
            }
            var newDeferred = new XdmDeferred();
            this._resolveCallbacks.push(function (value) {
                _this._wrapCallback(onFulfill, value, newDeferred, false);
            });
            this._rejectCallbacks.push(function (reason) {
                _this._wrapCallback(onReject, reason, newDeferred, true);
            });
            if (this._isResolved) {
                this._resolve(this._resolvedValue);
            }
            else if (this._isRejected) {
                this._reject(this._rejectValue);
            }
            return newDeferred.promise;
        };
        XdmDeferred.prototype._wrapCallback = function (callback, value, deferred, reject) {
            if (!callback) {
                if (reject) {
                    deferred.reject(value);
                }
                else {
                    deferred.resolve(value);
                }
                return;
            }
            var result;
            try {
                result = callback(value);
            }
            catch (ex) {
                deferred.reject(ex);
                return;
            }
            if (result === undefined) {
                deferred.resolve(value);
            }
            else if (result && typeof result.then === "function") {
                result.then(function (innerResult) {
                    deferred.resolve(innerResult);
                }, function (innerReason) {
                    deferred.reject(innerReason);
                });
            }
            else {
                deferred.resolve(result);
            }
        };
        XdmDeferred.prototype._resolve = function (result) {
            if (!this._isRejected && !this._isResolved) {
                this._isResolved = true;
                this._resolvedValue = result;
            }
            if (this._isResolved && this._resolveCallbacks.length > 0) {
                var resolveCallbacks = this._resolveCallbacks.splice(0);
                // 2.2.4. #onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
                window.setTimeout(function () {
                    for (var i = 0, l = resolveCallbacks.length; i < l; i++) {
                        resolveCallbacks[i](result);
                    }
                });
            }
        };
        XdmDeferred.prototype._reject = function (reason) {
            if (!this._isRejected && !this._isResolved) {
                this._isRejected = true;
                this._rejectValue = reason;
            }
            if (this._isRejected && this._rejectCallbacks.length > 0) {
                var rejectCallbacks = this._rejectCallbacks.splice(0);
                // 2.2.4. #onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
                window.setTimeout(function () {
                    for (var i = 0, l = rejectCallbacks.length; i < l; i++) {
                        rejectCallbacks[i](reason);
                    }
                });
            }
        };
        return XdmDeferred;
    })();
    var smallestRandom = parseInt("10000000000", 36);
    var maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;
    /**
     * Create a new random 22-character fingerprint.
     * @return string fingerprint
     */
    function newFingerprint() {
        // smallestRandom ensures we will get a 11-character result from the base-36 conversion.
        return Math.floor((Math.random() * (maxSafeInteger - smallestRandom)) + smallestRandom).toString(36) + Math.floor((Math.random() * (maxSafeInteger - smallestRandom)) + smallestRandom).toString(36);
    }
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
    var XDMObjectRegistry = (function () {
        function XDMObjectRegistry() {
            this._registeredObjects = {};
        }
        /**
        * Lookup a method on a registered object. Returns null if the object is
        * not found or the method does not exist on the object.
        *
        * @param fullMethodPath The name of the registered object + '.' + the method name
        * @return XDM method info
        */
        XDMObjectRegistry.prototype.getRegisteredMethodInfo = function (fullMethodPath) {
            var lastDotIndex = fullMethodPath.lastIndexOf('.');
            if (lastDotIndex > 0) {
                var objectName = fullMethodPath.substr(0, lastDotIndex);
                var obj = this._registeredObjects[objectName];
                if (obj) {
                    var methodName = fullMethodPath.substr(lastDotIndex + 1);
                    var method = obj[methodName];
                    if (method && typeof method === "function") {
                        return {
                            method: method,
                            thisObj: obj
                        };
                    }
                }
            }
            return null;
        };
        /**
        * Register an object so that its methods can be invoked in an XDM channel
        *
        * @param obj object to register. This object should have functions on it that can be invoked remotely
        * @param name Unique name of the object to register.
        */
        XDMObjectRegistry.prototype.register = function (obj, name) {
            // register specified object as exposed via XDM
            // Register the entire object/instance (not each function)
            // We can register the object or the function or combination
            this._registeredObjects[name] = obj;
        };
        return XDMObjectRegistry;
    })();
    XDM.XDMObjectRegistry = XDMObjectRegistry;
    ;
    /**
    * The registry of global XDM handlers
    */
    XDM.globalObjectRegistry = new XDMObjectRegistry();
    /**
     * Represents a channel of communication between frames\document
     * Stays "alive" across multiple funtion\method calls
     */
    var XDMChannel = (function () {
        function XDMChannel(postToWindow, targetOrigin) {
            if (targetOrigin === void 0) { targetOrigin = null; }
            this._nextMessageId = 1;
            this._deferreds = {};
            this._nextProxyFunctionId = 1;
            this._proxyFunctions = {};
            this._postToWindow = postToWindow;
            this._targetOrigin = targetOrigin;
            this._channelObjectRegistry = new XDMObjectRegistry();
            this._channelId = XDMChannel._nextChannelId++;
            if (!this._targetOrigin) {
                this._handshakeToken = newFingerprint();
            }
            this._channelObjectRegistry.register(this._proxyFunctions, "__proxyFunctions");
        }
        /**
        * Get the object registry to handle messages from this specific channel.
        * Upon receiving a message, this channel registry will be used first, then
        * the global registry will be used if no handler is found here.
        */
        XDMChannel.prototype.getObjectRegistry = function () {
            return this._channelObjectRegistry;
        };
        /**
        * Post a message to the other side of the XDM channel
        *
        * @param method Name of the method to invoke
        * @param params Arguments to the method to invoke
        * @param success Callback method to invoke when the remote procedure succeeds
        * @param error Callback method to invoke when the remote procedure fails
        */
        XDMChannel.prototype.postMessage = function (method, params) {
            var message = {
                id: this._nextMessageId++,
                method: method,
                params: this._customSerializeObject(params),
                jsonrpc: "2.0"
            };
            if (!this._targetOrigin) {
                message.handshakeToken = this._handshakeToken;
            }
            var deferred = createDeferred();
            this._deferreds[message.id] = deferred;
            this._sendRpcMessage(message);
            return deferred.promise;
        };
        /**
        * Handle a received message on this channel. Dispatch to the appropriate object found via object registry
        *
        * @param data Message data
        * @param origin Origin of the frame that sent the message
        * @return True if the message was handled by this channel. Otherwise false.
        */
        XDMChannel.prototype.onMessage = function (data, origin) {
            var _this = this;
            var rpcMessage = data;
            if (rpcMessage.method) {
                // Find the object that handles this requestNeed to find implementation
                // Look in the channel registry first
                var methodInfo = this._channelObjectRegistry.getRegisteredMethodInfo(rpcMessage.method);
                if (!methodInfo) {
                    // Look in the global registry as a fallback
                    methodInfo = XDM.globalObjectRegistry.getRegisteredMethodInfo(rpcMessage.method);
                    // If still not found return false to indicate that the message was not handled
                    if (!methodInfo) {
                        return false;
                    }
                }
                try {
                    // Call specified method.  Add nested success and error call backs with closure
                    // so we can post back a response as a result or error as appropriate
                    var methodArgs = [];
                    if (rpcMessage.params) {
                        methodArgs = this._customDeserializeObject(rpcMessage.params);
                    }
                    var result = methodInfo.method.apply(methodInfo.thisObj, methodArgs);
                    if (result !== undefined) {
                        if (result.then && typeof result.then === "function") {
                            result.then(function (asyncResult) {
                                _this._success(rpcMessage, asyncResult, rpcMessage.handshakeToken);
                            }, function (e) {
                                _this._error(rpcMessage, e, rpcMessage.handshakeToken);
                            });
                        }
                        else {
                            this._success(rpcMessage, result, rpcMessage.handshakeToken);
                        }
                    }
                }
                catch (exception) {
                    // If no error call back and exception thrown, send back as error
                    this._error(rpcMessage, exception, rpcMessage.handshakeToken);
                }
            }
            else {
                // response
                // Responses look like this -
                //  {"jsonrpc": "2.0", "result": ["hello", 5], "id": "9"}
                //  {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found."}, "id": "5"}
                var deferred = this._deferreds[rpcMessage.id];
                if (!deferred) {
                    // Message not handled by this channel.
                    return false;
                }
                if (rpcMessage.error) {
                    deferred.reject(rpcMessage.error);
                }
                else {
                    deferred.resolve(this._customDeserializeObject([rpcMessage.result])[0]);
                }
                delete this._deferreds[rpcMessage.id];
            }
            // Message handled by this channel
            return true;
        };
        XDMChannel.prototype.owns = function (source, origin, data) {
            /// Determines whether the current message belongs to this channel or not
            var rpcMessage = data;
            if (this._postToWindow === source) {
                if (this._targetOrigin) {
                    return this._targetOrigin.toLowerCase().indexOf(origin.toLowerCase()) === 0;
                }
                else {
                    if (rpcMessage.handshakeToken && rpcMessage.handshakeToken === this._handshakeToken) {
                        this._targetOrigin = origin;
                        return true;
                    }
                }
            }
            return false;
        };
        XDMChannel.prototype._error = function (messageObj, errorObj, handshakeToken) {
            // Post back a response as an error which look like this -
            //  {"id": "5", "error": {"code": -32601, "message": "Method not found."}, "jsonrpc": "2.0", }
            var message = {
                id: messageObj.id,
                error: this._customSerializeObject([errorObj])[0],
                jsonrpc: "2.0",
                handshakeToken: handshakeToken
            };
            this._sendRpcMessage(message);
        };
        XDMChannel.prototype._success = function (messageObj, result, handshakeToken) {
            // Post back response result which look like this -
            //  {"id": "9", "result": ["hello", 5], "jsonrpc": "2.0"}
            var message = {
                id: messageObj.id,
                result: this._customSerializeObject([result])[0],
                jsonrpc: "2.0",
                handshakeToken: handshakeToken
            };
            this._sendRpcMessage(message);
        };
        XDMChannel.prototype._sendRpcMessage = function (message) {
            var messageString = JSON.stringify(message);
            this._postToWindow.postMessage(messageString, this._targetOrigin || "*");
        };
        XDMChannel.prototype._shouldSkipSerialization = function (obj) {
            for (var i = 0, l = XDMChannel.WINDOW_TYPES_TO_SKIP_SERIALIZATION.length; i < l; i++) {
                var instanceType = XDMChannel.WINDOW_TYPES_TO_SKIP_SERIALIZATION[i];
                if (window[instanceType] && obj instanceof window[instanceType]) {
                    return true;
                }
            }
            if (window.jQuery) {
                for (var i = 0, l = XDMChannel.JQUERY_TYPES_TO_SKIP_SERIALIZATION.length; i < l; i++) {
                    var instanceType = XDMChannel.JQUERY_TYPES_TO_SKIP_SERIALIZATION[i];
                    if (window.jQuery[instanceType] && obj instanceof window.jQuery[instanceType]) {
                        return true;
                    }
                }
            }
            return false;
        };
        XDMChannel.prototype._customSerializeObject = function (obj, parentObjects, nextCircularRefId, depth) {
            var _this = this;
            if (parentObjects === void 0) { parentObjects = null; }
            if (nextCircularRefId === void 0) { nextCircularRefId = 1; }
            if (depth === void 0) { depth = 1; }
            if (!obj || depth > XDMChannel.MAX_XDM_DEPTH) {
                return null;
            }
            if (this._shouldSkipSerialization(obj)) {
                return null;
            }
            var serializeMember = function (parentObject, newObject, key) {
                var item;
                try {
                    item = parentObject[key];
                }
                catch (ex) {
                }
                var itemType = typeof item;
                if (itemType === "undefined") {
                    return;
                }
                // Check for a circular reference by looking at parent objects
                var parentItemIndex = -1;
                if (itemType === "object") {
                    parentItemIndex = parentObjects.originalObjects.indexOf(item);
                }
                if (parentItemIndex >= 0) {
                    // Circular reference found. Add reference to parent
                    var parentItem = parentObjects.newObjects[parentItemIndex];
                    if (!parentItem.__circularReferenceId) {
                        parentItem.__circularReferenceId = nextCircularRefId++;
                    }
                    newObject[key] = {
                        __circularReference: parentItem.__circularReferenceId
                    };
                }
                else {
                    if (itemType === "function") {
                        var proxyFunctionId = _this._nextProxyFunctionId++;
                        newObject[key] = {
                            __proxyFunctionId: _this._registerProxyFunction(item, obj),
                            __channelId: _this._channelId
                        };
                    }
                    else if (itemType === "object") {
                        if (item && item instanceof Date) {
                            newObject[key] = {
                                __proxyDate: item.getTime()
                            };
                        }
                        else {
                            newObject[key] = _this._customSerializeObject(item, parentObjects, nextCircularRefId, depth + 1);
                        }
                    }
                    else if (key !== "__proxyFunctionId") {
                        // Just add non object/function properties as-is. Don't include "__proxyFunctionId" to protect
                        // our proxy methods from being invoked from other messages.
                        newObject[key] = item;
                    }
                }
            };
            var returnValue;
            if (!parentObjects) {
                parentObjects = {
                    newObjects: [],
                    originalObjects: []
                };
            }
            parentObjects.originalObjects.push(obj);
            if (obj instanceof Array) {
                returnValue = [];
                parentObjects.newObjects.push(returnValue);
                for (var i = 0, l = obj.length; i < l; i++) {
                    serializeMember(obj, returnValue, i);
                }
            }
            else {
                returnValue = {};
                parentObjects.newObjects.push(returnValue);
                var keys = [];
                try {
                    for (var key in obj) {
                        keys.push(key);
                    }
                }
                catch (ex) {
                }
                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    // Don't serialize properties that start with an underscore.
                    if (key && key[0] !== "_") {
                        serializeMember(obj, returnValue, key);
                    }
                }
            }
            parentObjects.originalObjects.pop();
            parentObjects.newObjects.pop();
            return returnValue;
        };
        XDMChannel.prototype._registerProxyFunction = function (func, context) {
            var proxyFunctionId = this._nextProxyFunctionId++;
            this._proxyFunctions["proxy" + proxyFunctionId] = function () {
                return func.apply(context, Array.prototype.slice.call(arguments, 0));
            };
            return proxyFunctionId;
        };
        XDMChannel.prototype._customDeserializeObject = function (obj, circularRefs) {
            var _this = this;
            if (!obj) {
                return null;
            }
            if (!circularRefs) {
                circularRefs = {};
            }
            var deserializeMember = function (parentObject, key) {
                var item = parentObject[key];
                var itemType = typeof item;
                if (key === "__circularReferenceId" && itemType === 'number') {
                    circularRefs[item] = parentObject;
                    delete parentObject[key];
                }
                else if (itemType === "object" && item) {
                    if (item.__proxyFunctionId) {
                        parentObject[key] = function () {
                            return _this.postMessage("__proxyFunctions.proxy" + item.__proxyFunctionId, Array.prototype.slice.call(arguments, 0));
                        };
                    }
                    else if (item.__proxyDate) {
                        parentObject[key] = new Date(item.__proxyDate);
                    }
                    else if (item.__circularReference) {
                        parentObject[key] = circularRefs[item.__circularReference];
                    }
                    else {
                        _this._customDeserializeObject(item, circularRefs);
                    }
                }
            };
            if (obj instanceof Array) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    deserializeMember(obj, i);
                }
            }
            else if (typeof obj === "object") {
                for (var key in obj) {
                    deserializeMember(obj, key);
                }
            }
            return obj;
        };
        XDMChannel._nextChannelId = 1;
        XDMChannel.MAX_XDM_DEPTH = 100;
        XDMChannel.WINDOW_TYPES_TO_SKIP_SERIALIZATION = [
            "Node",
            "Window",
            "Event"
        ];
        XDMChannel.JQUERY_TYPES_TO_SKIP_SERIALIZATION = [
            "jQuery"
        ];
        return XDMChannel;
    })();
    XDM.XDMChannel = XDMChannel;
    /**
    * Registry of XDM channels kept per target frame/window
    */
    var XDMChannelManager = (function () {
        function XDMChannelManager() {
            this._channels = [];
            this._subscribe(window);
        }
        XDMChannelManager.get = function () {
            if (!this._default) {
                this._default = new XDMChannelManager();
            }
            return this._default;
        };
        /**
        * Add an XDM channel for the given target window/iframe
        *
        * @param window Target iframe window to communicate with
        * @param targetOrigin Url of the target iframe (if known)
        */
        XDMChannelManager.prototype.addChannel = function (window, targetOrigin) {
            var channel = new XDMChannel(window, targetOrigin);
            this._channels.push(channel);
            return channel;
        };
        /**
        * Broadcast a message to all channels managed by this channel manager
        *
        * @param method Name of the method to invoke
        * @param params Arguments to the method to invoke
        * @param success Callback method to invoke when the remote procedure succeeds
        * @param error Callback method to invoke when the remote procedure fails
        */
        XDMChannelManager.prototype.broadcastMessage = function (method, params) {
            for (var i = 0, l = this._channels.length; i < l; i++) {
                this._channels[i].postMessage(method, params);
            }
        };
        XDMChannelManager.prototype._handleMessageReceived = function (event) {
            // get channel and dispatch to it
            var i, len, channel;
            var rpcMessage = JSON.parse(event.data);
            var handled = false, channelOwnerFound = false;
            for (i = 0, len = this._channels.length; i < len; i++) {
                channel = this._channels[i];
                if (channel.owns(event.source, event.origin, rpcMessage)) {
                    // event belongs to this channel. Dispatch the message
                    channelOwnerFound = true;
                    handled = channel.onMessage(rpcMessage, event.origin) || handled;
                }
            }
            if (channelOwnerFound && !handled) {
                console.error("No handler found on any channel for message: " + JSON.stringify(rpcMessage));
            }
        };
        XDMChannelManager.prototype._subscribe = function (windowObj) {
            var _this = this;
            if (windowObj.addEventListener) {
                windowObj.addEventListener("message", function (event) {
                    _this._handleMessageReceived(event);
                });
            }
            else {
                // IE8
                windowObj.attachEvent("onmessage", function (event) {
                    _this._handleMessageReceived(event);
                });
            }
        };
        return XDMChannelManager;
    })();
    XDM.XDMChannelManager = XDMChannelManager;
})(XDM || (XDM = {}));
var VSS;
(function (VSS) {
    /**
    * Private class for registered objects
    */
    var ObjectRegistry = (function () {
        function ObjectRegistry() {
            this._registeredObjects = {};
        }
        /**
        * Register an object (instance or factory method) that this extension exposes to the host frame.
        *
        * @param id unique id of the registered object
        * @param instance Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
        */
        ObjectRegistry.prototype.register = function (id, instance) {
            this._registeredObjects[id] = instance;
        };
        /**
        * Get an instance of an object registered with the given id
        *
        * @param id unique id of the registered object
        * @param contextData Optional context data to pass to the contructor of an object factory method
        */
        ObjectRegistry.prototype.getInstance = function (id, contextData) {
            var instance = this._registeredObjects[id];
            if (!instance) {
                return null;
            }
            if (typeof instance === "function") {
                return instance(contextData);
            }
            else {
                return instance;
            }
        };
        return ObjectRegistry;
    })();
    var htmlElement;
    var webContext;
    var hostPageContext;
    var extensionContext;
    var initialConfiguration;
    var initOptions;
    var loaderConfigured = false;
    var usingLoader = false;
    var isReady = false;
    var readyCallbacks;
    var parentChannel = XDM.XDMChannelManager.get().addChannel(window.parent);
    var objectRegistry = new ObjectRegistry();
    parentChannel.getObjectRegistry().register(objectRegistry, "ObjectRegistry");
    /**
     * Initiates the handshake with the host window.
     *
     * @param options Initialization options for the extension.
     */
    function init(options) {
        initOptions = options || {};
        usingLoader = initOptions.setupModuleLoader;
        // Run this after current execution path is complete - allows objects to get initialized
        window.setTimeout(function () {
            var appHandshakeData = {
                notifyLoadSucceeded: !initOptions.explicitNotifyLoaded
            };
            parentChannel.postMessage("VSS.HostControl.initialHandshake", [appHandshakeData]).then(function (handshakeData) {
                hostPageContext = handshakeData.pageContext;
                hostPageContext.serviceInstanceId = null; // need to remove id from context, so we recognize that call is coming from a different service.
                webContext = hostPageContext.webContext;
                initialConfiguration = handshakeData.initialConfig || {};
                extensionContext = handshakeData.appContext;
                // Place context so that child frames can pick it up correctly
                window.__parentPageContext = hostPageContext;
                if (usingLoader) {
                    setupAmdLoader();
                }
                else {
                    triggerReady();
                }
            });
        }, 0);
    }
    VSS.init = init;
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
    function require(modules, callback) {
        var modulesArray;
        if (typeof modules === "string") {
            modulesArray = [modules];
        }
        else {
            modulesArray = modules;
        }
        if (!callback) {
            // Generate an empty callback for require
            callback = function () {
            };
        }
        if (loaderConfigured) {
            // Loader already configured, just issue require
            window.require(modulesArray, callback);
        }
        else {
            if (!initOptions) {
                init({ setupModuleLoader: true });
            }
            else if (!usingLoader) {
                usingLoader = true;
                if (isReady) {
                    // We are in the ready state, but previously not using the loader, so set it up now
                    // which will re-trigger ready
                    isReady = false;
                    setupAmdLoader();
                }
            }
            ready(function () {
                window.require(modulesArray, callback);
            });
        }
    }
    VSS.require = require;
    /*
    * Register a callback that gets called once the initial setup/handshake has completed.
    * If the initial setup is already completed, the callback is invoked at the end of the current call stack.
    */
    function ready(callback) {
        if (isReady) {
            window.setTimeout(callback, 0);
        }
        else {
            if (!readyCallbacks) {
                readyCallbacks = [];
            }
            readyCallbacks.push(callback);
        }
    }
    VSS.ready = ready;
    /**
    * Notifies the host that the extension successfully loaded (stop showing the loading indicator)
    */
    function notifyLoadSucceeded() {
        parentChannel.postMessage("VSS.HostControl.notifyLoadSucceeded");
    }
    VSS.notifyLoadSucceeded = notifyLoadSucceeded;
    /**
    * Notifies the host that the extension failed to load
    */
    function notifyLoadFailed(e) {
        parentChannel.postMessage("VSS.HostControl.notifyLoadFailed", [e]);
    }
    VSS.notifyLoadFailed = notifyLoadFailed;
    /**
    * Get the web context from the parent host
    */
    function getWebContext() {
        return webContext;
    }
    VSS.getWebContext = getWebContext;
    /**
    * Get the configuration data passed in the initial handshake from the parent frame
    */
    function getConfiguration() {
        return initialConfiguration;
    }
    VSS.getConfiguration = getConfiguration;
    /**
    * Get the context about the app that owns the content that is being hosted
    */
    function getExtensionContext() {
        return extensionContext;
    }
    VSS.getExtensionContext = getExtensionContext;
    /**
    * Get a contributed service from the parent host.
    *
    * @param serviceId Id of the vss.web#service contribution to get the instance of
    * @param context Optional context information to use when obtaining the service instance
    */
    function getService(serviceId, context) {
        var deferred = XDM.createDeferred();
        VSS.ready(function () {
            parentChannel.postMessage("VSS.SDK.Host.getService", [serviceId, context]).then(deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    }
    VSS.getService = getService;
    /**
    * For a given contribution point id, get contributions which contribute background services.
    *
    * @param contributionPointId Contribution point id to query
    * @param contributionId Optional filter to only include contributions with the given id
    */
    function getServiceContributions(contributionPointId, contributionId) {
        var deferred = XDM.createDeferred();
        VSS.ready(function () {
            parentChannel.postMessage("VSS.SDK.Host.getServiceContributions", [contributionPointId, contributionId]).then(deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    }
    VSS.getServiceContributions = getServiceContributions;
    /**
    * Register an object (instance or factory method) that this extension exposes to the host frame.
    *
    * @param instanceId unique id of the registered object
    * @param instance Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    function register(instanceId, instance) {
        objectRegistry.register(instanceId, instance);
    }
    VSS.register = register;
    /**
    * Fetch an access token which will allow calls to be made to other VSO services
    */
    function getAccessToken() {
        return parentChannel.postMessage("VSS.HostControl.getAccessToken");
    }
    VSS.getAccessToken = getAccessToken;
    /**
    * Requests the parent window to resize the container for this extension based on the current extension size.
    */
    function resize() {
        if (!htmlElement) {
            htmlElement = document.getElementsByTagName("html").item(0);
        }
        parentChannel.postMessage("VSS.HostControl.resize", [htmlElement.scrollWidth, htmlElement.scrollHeight]);
    }
    VSS.resize = resize;
    // Does not work - was broken since removal of host-side endpoint a while back. HttpClients should be used instead.
    // Left until CodeAnalysis\Service\Server\WebAccess\TfsExtensions\Scripts\CodeAnalysis.TfsExtensions.AdornmentProvider.ts
    // removes its reference to it.
    function api(path, apiResourceScope, verb, headers, params, success, error) {
        throw new Error("Deprecated");
    }
    VSS.api = api;
    function setupAmdLoader() {
        var hostRootUri = getRootUri(hostPageContext.webContext);
        // Place context so that VSS scripts pick it up correctly
        window.__vssPageContext = hostPageContext;
        // MS Ajax config needs to exist before loading MS Ajax library
        window.__cultureInfo = hostPageContext.microsoftAjaxConfig.cultureInfo;
        // Append CSS first
        if (hostPageContext.coreReferences.stylesheets) {
            hostPageContext.coreReferences.stylesheets.forEach(function (stylesheet) {
                if (stylesheet.isCoreStylesheet) {
                    var cssLink = document.createElement("link");
                    cssLink.href = getAbsoluteUrl(stylesheet.url, hostRootUri);
                    cssLink.rel = "stylesheet";
                    safeAppendToDom(cssLink, "head");
                }
            });
        }
        var scripts = [];
        // Add scripts and loader configuration
        if (hostPageContext.coreReferences.scripts) {
            hostPageContext.coreReferences.scripts.forEach(function (script) {
                if (script.isCoreModule) {
                    var alreadyLoaded = false;
                    var global = window;
                    if (script.identifier === "JQuery") {
                        alreadyLoaded = !!global.jQuery;
                    }
                    else if (script.identifier === "JQueryUI") {
                        alreadyLoaded = !!(global.jQuery && global.jQuery.ui && global.jQuery.ui.version);
                    }
                    else if (script.identifier === "MicrosoftAjax") {
                        alreadyLoaded = !!(global.Sys && global.Sys.Browser);
                    }
                    if (!alreadyLoaded) {
                        scripts.push({ source: getAbsoluteUrl(script.url, hostRootUri) });
                    }
                }
            });
        }
        // Define a new config for extension loader
        var newConfig = {
            baseUrl: extensionContext.baseUri,
            contributionPaths: null,
            paths: {},
            shim: {}
        };
        // See whether any configuration specified initially. If yes, copy them to new config
        if (initOptions.moduleLoaderConfig) {
            if (initOptions.moduleLoaderConfig.baseUrl) {
                newConfig.baseUrl = initOptions.moduleLoaderConfig.baseUrl;
            }
            // Copy paths
            extendLoaderPaths(initOptions.moduleLoaderConfig, newConfig);
            // Copy shim
            extendLoaderShim(initOptions.moduleLoaderConfig, newConfig);
        }
        // Use some of the host config to support VSSF and TFS platform as well as some 3rd party libraries
        if (hostPageContext.moduleLoaderConfig) {
            // Copy host shim
            extendLoaderShim(hostPageContext.moduleLoaderConfig, newConfig);
            // Add contribution paths to new config
            var contributionPaths = hostPageContext.moduleLoaderConfig.contributionPaths;
            if (contributionPaths) {
                for (var p in contributionPaths) {
                    if (contributionPaths.hasOwnProperty(p)) {
                        newConfig.paths[p] = hostRootUri + contributionPaths[p].value;
                    }
                }
            }
        }
        scripts.push({ content: "require.config(" + JSON.stringify(newConfig) + ");" });
        addScriptElements(scripts, 0, function () {
            loaderConfigured = true;
            triggerReady();
        });
    }
    function extendLoaderPaths(source, target, pathTranslator) {
        if (source.paths) {
            if (!target.paths) {
                target.paths = {};
            }
            for (var key in source.paths) {
                if (source.paths.hasOwnProperty(key)) {
                    var value = source.paths[key];
                    if (pathTranslator) {
                        value = pathTranslator(key, source.paths[key]);
                    }
                    if (value) {
                        target.paths[key] = value;
                    }
                }
            }
        }
    }
    function extendLoaderShim(source, target) {
        if (source.shim) {
            if (!target.shim) {
                target.shim = {};
            }
            for (var key in source.shim) {
                if (source.shim.hasOwnProperty(key)) {
                    target.shim[key] = source.shim[key];
                }
            }
        }
    }
    function getRootUri(webContext) {
        var hostContext = (webContext.account || webContext.host);
        var rootUri = hostContext.uri;
        var relativeUri = hostContext.relativeUri;
        if (rootUri && relativeUri) {
            // Ensure both relative and root paths end with a trailing slash before trimming the relative path.
            if (rootUri[rootUri.length - 1] !== "/") {
                rootUri += "/";
            }
            if (relativeUri[relativeUri.length - 1] !== "/") {
                relativeUri += "/";
            }
            rootUri = rootUri.substr(0, rootUri.length - relativeUri.length);
        }
        return rootUri;
    }
    function addScriptElements(scripts, index, callback) {
        var _this = this;
        if (index >= scripts.length) {
            callback.call(this);
            return;
        }
        var scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        if (scripts[index].source) {
            var scriptSource = scripts[index].source;
            scriptTag.src = scriptSource;
            scriptTag.addEventListener("load", function () {
                addScriptElements.call(_this, scripts, index + 1, callback);
            });
            scriptTag.addEventListener("error", function (e) {
                notifyLoadFailed("Failed to load script: " + scriptSource);
            });
            safeAppendToDom(scriptTag, "head");
        }
        else if (scripts[index].content) {
            scriptTag.innerText = scripts[index].content;
            safeAppendToDom(scriptTag, "head");
            addScriptElements.call(this, scripts, index + 1, callback);
        }
    }
    function safeAppendToDom(element, section) {
        var parent = document.getElementsByTagName(section)[0];
        if (!parent) {
            parent = document.createElement(section);
            document.appendChild(parent);
        }
        parent.appendChild(element);
    }
    function getAbsoluteUrl(url, baseUrl) {
        var lcUrl = (url || "").toLowerCase();
        if (lcUrl.substr(0, 2) !== "//" && lcUrl.substr(0, 5) !== "http:" && lcUrl.substr(0, 6) !== "https:") {
            url = baseUrl + (lcUrl[0] === "/" ? "" : "/") + url;
        }
        return url;
    }
    function translateLoaderConfigUrl(url, rootUrl, baseUrl) {
        var lcUrl = (url || "").toLowerCase();
        if (lcUrl.substr(0, 2) !== "//" && lcUrl.substr(0, 5) !== "http:" && lcUrl.substr(0, 6) !== "https:") {
            if (lcUrl[0] === "/") {
                url = rootUrl + url;
            }
            else {
                url = baseUrl + "/" + url;
            }
        }
        return url;
    }
    function triggerReady() {
        var _this = this;
        isReady = true;
        if (readyCallbacks) {
            readyCallbacks.forEach(function (callback) {
                callback.call(_this);
            });
            readyCallbacks = null;
        }
    }
})(VSS || (VSS = {}));
