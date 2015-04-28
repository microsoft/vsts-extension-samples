/// <reference path="References/VSS-Common.d.ts" />
export declare var notificationService: EventManager;
export declare var history: History;
export declare var urlHelper: UrlHelper;
export declare var runningDocumentsTable: RunningDocumentsTable;
export declare var hostServiceManager: HostServiceManager;
/**
* A service available for host environment.
* A host can be the browser, an IDE (e.g. Eclipse, Visual Studio)
*/
export declare class HostService {
    /**
     * @param type
     */
    static getServiceName(type?: any): string;
    getServiceName(): string;
}
export declare class HostServiceManager {
    services: IDictionaryStringTo<any>;
    constructor();
    /**
     * Get the specified service.  Example: hostServiceManager.getService(DocumentService)
     *
     * @param serviceType Service object type name
     * @return
     */
    getService<T>(serviceType: any): T;
}
/**
* Represents a document to a host.
*  A host can be tha browser, an IDE (e.g. Eclipse, Visual Studio)
*/
export declare class Document {
    save(successCallback: IResultCallback, errorCallback?: IErrorCallback): void;
    getMoniker(): void;
}
/**
* Service for host environment to interact with documents in Web Access
*  A host environment can be tha browser, an IDE (e.g. Eclipse, Visual Studio)
*/
export declare class DocumentService extends HostService {
    addDeleteListener(callBack: Function): void;
    removeDeleteListener(callBack: IEventHandler): void;
    addBuildPropertyChangedListener(callBack: IEventHandler): void;
    removeBuildPropertyChangedListener(callBack: IEventHandler): void;
    addBuildStoppedListener(callBack: IEventHandler): void;
    removeBuildStoppedListener(callBack: IEventHandler): void;
    addModifiedChangedListener(callBack: IEventHandler): void;
    removeModifiedChangedListener(callBack: IEventHandler): void;
    isModified(args?: string): boolean;
    save(successCallback: IResultCallback, errorCallback?: IErrorCallback): void;
    getActiveDocument(): any;
    _setActiveDocument(activeDocument: any): void;
}
export declare enum NavigationContextLevels {
    None = 0,
    Deployment = 1,
    Application = 2,
    Collection = 4,
    Project = 8,
    Team = 16,
    ApplicationAll = 15,
    All = 31,
}
export declare enum TeamFoundationHostType {
    Parent = -1,
    Unknown = 0,
    Deployment = 1,
    Application = 2,
    ProjectCollection = 4,
}
export interface IContextIdentity {
    id: string;
    isContainer: boolean;
    isActive: boolean;
    displayName: string;
    uniqueName: string;
    email?: string;
}
export interface ITeam {
    identity: IContextIdentity;
    name: string;
}
export interface IServiceHost {
    instanceId: string;
    name: string;
    hostType: number;
    vDir: string;
    relVDir: string;
    uri?: string;
}
export interface INavigation {
    topMostLevel: number;
    area: string;
    areaPrefix: string;
    currentController: string;
    currentAction: string;
    controllerPrefix: string;
    serviceHost: IServiceHost;
    applicationServiceHost: IServiceHost;
    collection: IServiceHost;
    project: string;
    projectId: string;
    team: string;
    teamId: string;
    publicAccessPoint: {
        uri: string;
        scheme: string;
        authority: string;
    };
}
export declare class EventManager {
    private _events;
    fire(eventName: string, sender?: any, eventArgs?: any): boolean;
    /**
     * Invoke the specified event passing the specified arguments.
     *
     * @param eventName The event to invoke.
     * @param sender The sender of the event.
     * @param args The arguments to pass through to the specified event.
     */
    _fireEvent(eventName: string, sender?: any, args?: any): boolean;
    /**
     * Attatch a handler to an event.
     *
     * @param eventName The event name.
     * @param handler The handler to attach.
     */
    attachEvent(eventName: string, handler: IEventHandler): void;
    /**
     * Detatch a handler from an event.
     *
     * @param eventName The event name.
     * @param handler The handler to detach.
     */
    detachEvent(eventName: string, handler: IEventHandler): void;
}
export declare class History {
    private _events;
    private _suppressNavigate;
    private _initialized;
    _currentHashString: string;
    constructor();
    getCurrentFragment(): string;
    deSerializeState(state: string): any;
    getCurrentState(): any;
    checkCurrentState(): boolean;
    replaceHistoryPoint(action: string, data: any, windowTitle?: string, suppressNavigate?: boolean): void;
    addHistoryPoint(action: string, data?: any, windowTitle?: string, suppressNavigate?: boolean): void;
    attachNavigate(action: IFunctionPPR<any, any, void>, handler?: IFunctionPPR<any, any, void>, checkCurrentState?: boolean): void;
    attachNavigate(action: string, handler: IFunctionPPR<any, any, void>, checkCurrentState?: boolean): void;
    detachNavigate(action: IFunctionPPR<any, any, void>): void;
    detachNavigate(action: string, handler?: IFunctionPPR<any, any, void>): void;
    private _ensureInitialized();
    private _onNavigate();
}
export declare class UrlHelper {
    static SAFE_URI_SCHEME_LIST: string[];
    private _urlTranslators;
    constructor();
    /**
     * Creates a fragment url to be used in flight navigation.
     *
     * @param action The action name
     * @param data Action parameters
     * @return fragment URL in the form of #_a=[action]&routevalue1=routevalue2...
     */
    getFragmentActionLink(action: string, data?: any): string;
    /**
     * Return a new url that add (if the given parameter name does not exist in the url),
     * or replace the value of given parameter name with the given parameter value.
     *  The original url.  The parameter name to replace in the url.  The parameter value to replace in the url.
     */
    replaceUrlParam(url: string, paramName: string, paramValue: string): string;
    /**
     * Verifies that the given url is within the constraints of 2000 characters.
     *
     * @param url The url to verify.
     * @return Returns true if url is within constraints, false otherwise.
     */
    isUrlWithinConstraints(url: string): boolean;
    /**
     * Check if specified URL is safe - i.e. part of an approved list of URL schemes.
     *
     * @param url Url to check
     * @return
     */
    isSafeProtocol(url: string): boolean;
    /**
     * Registers a URL translator function.
     *
     * @param translatorFunction The translator function of the form function(url, options, successCallback, errorCallback, nextTranslator){}
     * @param order The order of the translator function.
     */
    registerUrlTranslator(translatorFunction: Function, order?: number): void;
    beginTranslateUrl(url: string, options?: any, callback?: IFunctionPR<string, any>, errorCallback?: IErrorCallback): void;
    /**
     * Remove the leading part of urlPath that identifies the team and return the rest of the url
     * e.g.  /tfs/collection/project/team/restOfTheUrl
     *       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     */
    getTeamRelativeUrl(navigation: INavigation, urlPath: string): string;
}
export interface IActionWorker {
    (actionArgs: any, next: (actionArgs: any) => any): any;
}
export declare class ActionManager {
    static MaxOrder: any;
    /**
     * Register a handler for an action. The handler participates in the Chain of Responsibility pattern.
     *
     * @param action The action to register
     * @param actionWorker Function(actionArgs, next), The handler to invoke for the given action when the performAction
     *     operation is called for the registered action.
     *     The function is passed the action arguments for next which it should call with the actionsArgs UNLESS
     *     it explicitly wants to be the end of the chain.
     *     e.g.
     *     registerActionWorker('some.action', function (actionArgs, next) {
     *         if (iCanHandle(actionArgs)) {
     *             return doProcessing(actionArgs);
     *         }
     *         else {
     *             return next(actionArgs);
     *         }
     *     }, 50);
     *
     * if ActionWorker functions are asynchronous they can still participate in the chain
     *
     *     registerActionWorker('some.async.action', function (actionArgs, next) {
     *         beginDoSomeStuff(function (result) {
     *             if (that.imDone(results)) {
     *                 actionArgs.onSuccess.call(this, results);
     *             }
     *             else {
     *                 next(actionArgs);
     *             }
     *         });
     *     }, 50);
     *
     * @param order The order of the action (default:100).
     *       Action workers are executed in increasing order. Order must be less than MaxOrder (inclusive)
     */
    static registerActionWorker(action: string, actionWorker: IActionWorker, order?: number): void;
    /**
     * Invoke the registered action workers for the an action
     *
     * @param action The action identifier
     * @param actionArgs An object passed to the registered action workers.
     */
    static performAction(action: string, actionArgs?: any): any;
    /**
     *  Clears all action workers
     */
    static clearActionWorkers(): void;
    /**
     * Manage actions and the workers that are invoked when those actions are performed.
     * Action workers register to handle specific actions. They take whatever action they desire
     * and usually call the "next" handler in the chain (see the Chain of Responsibility pattern).
     */
    constructor();
}
export declare module CommonActions {
    var ACTION_WINDOW_OPEN: string;
    var ACTION_WINDOW_NAVIGATE: string;
    var ACTION_WINDOW_RELOAD: string;
    var ACTION_WINDOW_UNLOAD: string;
}
export declare class RunningDocumentsTableEntry {
    document: any;
    moniker: string;
    constructor(moniker: string, document: any);
}
export declare class RunningDocumentsTable {
    rdt: RunningDocumentsTableEntry[];
    constructor();
    /**
     *   Add specified document to the running document table
     *   The document must have a method named isDirty that returns boolean
     *
     * @param moniker Name for this document type
     * @param document Object that will be called to determine state (e.g. dirty//modified)
     * @return A handle to the entry in the running document table. The handle can be used to remove the entry
     */
    add(moniker: string, document: any): RunningDocumentsTableEntry;
    /**
     *   Remove an entry from the running document table
     *
     * @param entry The handle to the entry that will be removed. The handle is returned from the add function
     */
    remove(entry: RunningDocumentsTableEntry): void;
    /**
     *   Check if the specified document is modified.  If specified moniker is null or undefined
     *   will return true if any currently opened documents are modified
     *
     * @param moniker Name for this document type
     * @return True if the specified moniker\document is modified, false otherwise.
     *   Null or undefined moniker will return true if any opened documents are modified
     */
    isModified(moniker?: string): boolean;
    beginSave(callback: IResultCallback, errorCallback?: IErrorCallback): void;
    getUnsavedItemsMessage(): string;
    private _isAnyModified();
}
