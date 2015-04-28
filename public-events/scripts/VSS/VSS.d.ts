/// <reference path="References/VSS-Common.d.ts" />
export declare var uiCulture: string;
export declare var errorHandler: ErrorHandler;
export declare var globalProgressIndicator: GlobalProgressIndicator;
export declare var activtyStatsCollector: ActivtyStatsCollector;
/**
 * @param data
 */
export declare function queueCallbacks(context: any, callback: IResultCallback, errorCallback: IErrorCallback, data?: any): IQueueCallbacksResult;
export interface IQueueCallbacksResult {
    cookie: number;
    count: IFunctionPR<void, number>;
    finish: IArgsFunctionR<void>;
    error: IArgsFunctionR<void>;
    register: (callback: IResultCallback, errorCallback: IErrorCallback, data: any) => number;
    unregister: (cookie: number) => void;
}
/**
 * Queues a request for a piece of data.  Handles situations where the data has already been
 * retrieved as well as when multiple requests are pending for the same data.  When the data has
 * already been retrieved, the successCallback will be invoked immediately.  When multiple
 * requests are pending for the same data, each of the callers will be notified when the data
 * request has been completed (worker will only be invoked once).
 *
 * Sample usage:  This will invoke the worker function using the current object as the context.  The "_teamSettings"
 *                property of the current object will be checked for a value before invoking the worker.  If the value
 *                needs to be looked up, the worker will be invoked and it will make a request for the data.  If the
 *                request is completed successfully the data is passed to the succeeded callback.  If there is an error
 *                with the request the failed callback is invoked.
 *
 *     queueRequest(this, this, "_teamSettings", successCallback, errorCallback,
 *         function (succeeded, failed) {
 *             Ajax.getMSJSON(url, null, function (teamSettings) {
 *                 succeeded(teamSettings);
 *             }, failed);
 *         });
 *
 * @param context The "this" that the worker and successCallback functions will be invoked with.
 * @param target
 * The object which the propName property should be checked on to see if the request has already been performed.
 * If the property has a value (that is not a function), then the success callback is invoked immediately with the properties value as the result.
 * If the property does not have a value, the request is processed and the result is stored in the property.
 *
 * @param propName Name of the property on the target to store the result in and check to see if the request is needed.
 * @param successCallback Function invoked when the request is completed.  The function should take the "result" as its first parameter.
 * @param errroCallback Function invoked when the request has completed with an error. The function should take the "error" as its first parameter.
 * @param worker
 * This is the which performs the work to retrieve the data.  The function should have the following signature:
 *     function worker(succeeded, failed)
 *
 * The worker should invoke the "succeeded" function that it is provided passing it the result.  If an error occurs the worker should invoke the
 * "failed" function with the error.
 *
 * NOTE: It is important to note that the "successCallback" is not the same as the "succeeded" callback provided to the worker
 *       function.  It is important for the worker to invoke the callbacks it is provided with rather than the callbacks which are
 *       provided to the queueRequest method.  The same holds true for the failed callback provided to the worker function.
 *
 */
export declare function queueRequest(context: any, target: any, propName: string, successCallback: IResultCallback, errorCallback: IErrorCallback, worker: IResultCallback): void;
/**
 * Checks if a queued request has been completed.
 *
 * @param cachedResult The property passed to queueRequest as target[propName]
 */
export declare function queuedRequestHasResult(cachedResult: any): boolean;
export declare function getErrorMessage(errorString: string): string;
export declare function getErrorMessage(errorFunction: Function): string;
export declare function getErrorMessage(error: Error): string;
export declare class ErrorHandler {
    $error: JQuery;
    visible: boolean;
    /**
     * Global error handler class which is attached to TFS
     */
    constructor();
    /**
     * (Internal function) Initializes error handler
     */
    initialize(): void;
    /**
     * (Internal function) Checks whether error container exists or not
     */
    exists(): boolean;
    /**
     * (Internal function) Shows error in the container
     */
    showError(message: string, status?: string, stackTrace?: string): void;
    /**
     * (Internal function) Hides the error when clicked
     */
    hideError(): void;
    /**
     * Displays error in a container. If no container is found, error
     * message is displayed in an alert dialog
     */
    show(error: TfsError): void;
}
/**
 * @param callback
 * @param context
 */
export declare function handleError(error: TfsError, callback?: IErrorCallback, context?: any): void;
export declare class ActivtyStatistic {
    name: string;
    id: string;
    parentId: string;
    status: number;
    actionDate: Date;
    constructor();
}
export interface ActivtyStatsCollectionAllowedCallback {
    (): boolean;
}
export declare class ActivtyStatsCollector {
    static ACTIVITY_COLLECTION_STATUS: string;
    static ACTIVITY_ID_STORAGE_ITEM: string;
    static CURRENT_PAGE: string;
    private _activtyIdHeader;
    private _progressPendingActions;
    private _progressPendingActionsNewId;
    private _activtyStatsCollectionAllowedCallbacks;
    /**
     * Global handler for logging activity data
     */
    constructor();
    addActivtyStatsCollectionAllowedCallback(activtyStatsCollectionAllowedCallback: ActivtyStatsCollectionAllowedCallback): void;
    actionStarted(name: string): number;
    actionCompleted(id: number, jqXHR: JQueryXHR): void;
    logActivity(activityId: string, page: string): void;
    getActivtyStatistics(): ActivtyStatistic[];
    clearStats(): void;
    collectStats(shouldCollect: boolean): void;
    getCurrentPage(): ActivtyStatistic;
    setCurrentPage(currentPage: ActivtyStatistic): void;
    isCollectingStats(): boolean;
    private _saveActivity(stat, isCurrentPage?);
    private _allowStatsCollection();
}
export declare class GlobalProgressIndicator {
    private _progressPendingActions;
    private _progressPendingActionsCount;
    private _progressPendingActionsNewId;
    private _pageProgressElements;
    private _pageProgressDelayShowTimeout;
    private _pageProgressMinShowTimeout;
    private _showingProgress;
    /**
     * Global handler for displaying progress during page loads, module_ loads, ajax requests, or any other registered long-running operations
     */
    constructor();
    getProgressElements(): JQuery[];
    registerProgressElement(element: JQuery): void;
    unRegisterProgressElement(element: JQuery): void;
    private _addProgressElement(element);
    private _showProgressElements();
    private _hideProgressElements();
    actionStarted(name: string, immediate?: boolean): number;
    actionCompleted(id: number): void;
    getPendingActions(): string[];
}
export declare function hasUnloadRequest(): boolean;
export declare function classExtend(ctor: any, members: any): any;
export declare function getTypeName(type: any): string;
export declare function initClassPrototype(ctor: Function, members: any): void;
export declare function getModuleBase(moduleName: string): string;
export declare function using(moduleNames: string[], moduleLoaded: any): void;
export declare function tfsModuleLoaded(moduleName: string, moduleExports: any): void;
