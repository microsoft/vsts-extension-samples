/// <reference path="References/VSS-Common.d.ts" />
export declare function getId(): number;
export interface EnhancementOptions {
    earlyInitialize?: boolean;
    cssClass?: string;
    coreCssClass?: string;
    tagName?: string;
    width?: number | string;
    height?: number | string;
    title?: string;
    role?: string;
    id?: number | string;
    prepend?: boolean;
    change?: Function;
}
export declare class Enhancement<TOptions> {
    static ENHANCEMENTS_DATA_KEY: string;
    static ENHANCEMENT_OPTIONS_KEY: string;
    static ENHANCEMENT_OPTIONPREFIX_KEY: string;
    static optionsPrefix: string;
    private static enhancementList;
    private _id;
    private _typeName;
    private _eventNamespace;
    private _trackedElements;
    private _delayedFunctions;
    protected _enhancementOptions: EnhancementOptions;
    _options: TOptions;
    _initialized: boolean;
    _element: JQuery;
    _disposed: boolean;
    /**
     * @param options
     */
    constructor(options?: TOptions, enhancementOptions?: EnhancementOptions);
    /**
     * @param type
     * @return
     */
    static getTypeName(type?: any): string;
    /**
     * @return
     */
    static getOptionPrefix(type: any): string;
    /**
     * @param type
     * @param element
     */
    static getEnhancementOptions(type: any, element: any): any;
    /**
     * @param type
     * @param element
     * @param options
     * @return
     */
    static enhance<TOptions>(type: new (options: TOptions, enhancementOptions: EnhancementOptions) => Enhancement<TOptions>, element: Enhancement<any> | JQuery | Node | string, options?: ((element: JQuery) => TOptions) | TOptions, enhancementOptions?: EnhancementOptions): Enhancement<TOptions>;
    /**
     * @param type
     * @param element
     * @return
     */
    static getInstance(type?: any, element?: any): Enhancement<any>;
    static getInstanceO<TOptions>(type?: any, element?: any): Enhancement<TOptions>;
    /**
     * @param type
     * @param selector
     * @param options
     * @param errorCallback
     */
    static registerEnhancement<TOptions>(type?: {
        new (options: TOptions): Enhancement<TOptions>;
    }, selector?: string, options?: TOptions, errorCallback?: IErrorCallback, enhancementOptions?: EnhancementOptions): void;
    /**
     * @param type
     * @param context
     * @param errorCallback
     * @return
     */
    static ensureEnhancements(type?: any, context?: any, errorCallback?: any): Enhancement<any>[];
    /**
     * @param type
     * @param context
     * @param errorCallback
     * @return
     */
    static ensureEnhancement(type?: any, context?: any, errorCallback?: any): Enhancement<any>;
    /**
     * @param type
     * @param widgetName
     * @param widgetOptions
     */
    static registerJQueryWidget<TOptions>(type?: any, widgetName?: any, widgetOptions?: TOptions, enhancementOptions?: EnhancementOptions): void;
    /**
     * @return
     */
    protected _getUniqueId(): string;
    /**
     * @return
     */
    getId(): string;
    /**
     * @param id
     */
    protected _setId(id: string): void;
    /**
     * Sets options related to the creation of this control or enhancement of an element as this control.
     * Note: Options are merged.
     * @param EnhancementOptions
     */
    setEnhancementOptions(enhancementOptions: EnhancementOptions): void;
    /**
     * @return
     */
    getTypeName(): string;
    /**
     * @return
     */
    protected _getEventNameSpace(): string;
    getType(): Function;
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    initialize(): void;
    /**
     * @return
     */
    _ensureInitialized(): boolean;
    protected _attemptInitialize(): void;
    enhance($element: any): void;
    /**
     * @param element
     */
    protected _enhance(element: JQuery): void;
    /**
     * @param element
     */
    protected _setElement(element: JQuery): void;
    protected _setStyles(): void;
    /**
     * Gets the element associated with this control.
     *
     * @return
     */
    getElement(): JQuery;
    /**
     * @param element
     * @param eventType
     * @param args
     */
    _fire(element?: any, eventType?: any, args?: any): any;
    /**
     * @param element
     * @param eventType
     * @param handler
     * @param track
     */
    _bind(element?: any, eventType?: any, handler?: any, track?: any): Enhancement<TOptions>;
    /**
     * @param element
     * @param eventType
     * @param handler
     * @param track
     */
    _unbind(element?: any, eventType?: any, handler?: any, track?: any): Enhancement<TOptions>;
    /**
     * Executes the provided function after the specified amount of time
     *
     * @param name (Optional) Name for this operation. Allows subsequent calls to cancel this action.
     * @param msDelay Delay in milliseconds to wait before executing the Function
     * @param cancelPendingOps If true, cancel any pending requests with this name. If false, and there are outstanding requests with this name already in progress, then do nothing.
     * @param func Method to execute after the delay
     */
    delayExecute(name?: string, msDelay?: number, cancelPendingOps?: boolean, func?: Function): void;
    /**
     * Cancels any pending delayed functions (delayExecute calls) with the specified name
     *
     * @param name Name (supplied in the delayExecute call) of the operations to cancel
     * @return True if any operation was canceled. False if no operations with the specified name were in progress
     */
    cancelDelayedFunction(name: string): boolean;
    protected _cleanup(): void;
    protected _dispose(): void;
    dispose(): void;
    /**
     * @return
     */
    isDisposed(): boolean;
    protected _getEnhancementOption(key: string): any;
    private _trackElement(domElement);
    private _untrackElement(domElement);
}
/**
 * Creates a the control specified by TControl in the given container.
 * @typeparam TControl extends Control<TOptions> - a reference to the type of control to create. Should be the
 *            same type as the constructor function passed as the first parameter to this function. Note: TypeScript
 *            doesn't support the constraint of a type parameter referencing any other type parameter in the same
 *            list, but callers should ensure that TControl extends Control<TOptions>.
 * @typeparam TOptions - The type that is passed in as the options for this control. The instantiated control must
 *            an options parameter of this type.
 * @param controlType: new (options: TOptions) => TControl - the constructor function (ClassName) of this type.
 * @param container: JQuery - a JQuery element to place the control in.
 * @param controlOptions: TOptions - Options to pass in for this control. See the interface for the options type
 *        for more details.
 * @param enhancementOptions?: EnhancementOptions - Optional options for the control enhancement.
 * @return TControl - returns an instance of the controlType (first parameter), typed as a TControl (first type param).
 */
export declare function create<TControl extends Control<any>, TOptions>(controlType: new (options: TOptions) => TControl, container: JQuery, controlOptions: TOptions, enhancementOptions?: EnhancementOptions): TControl;
export declare class Control<TOptions> extends Enhancement<TOptions> {
    /**
     * Creates a the control specified by TControl in the given container.
     * @typeparam TControl extends Control<TOptions> - a reference to the type of control to create. Should be the
     *            same type as the constructor function passed as the first parameter to this function. Note: TypeScript
     *            doesn't support the constraint of a type parameter referencing any other type parameter in the same
     *            list, but callers should ensure that TControl extends Control<TOptions>.
     * @typeparam TOptions - The type that is passed in as the options for this control. The instantiated control must
     *            an options parameter of this type.
     * @param controlType: new (options: TOptions) => TControl - the constructor function (ClassName) of this type.
     * @param container: JQuery - a JQuery element to place the control in.
     * @param controlOptions: TOptions - Options to pass in for this control. See the interface for the options type
     *        for more details.
     * @param enhancementOptions?: EnhancementOptions - Optional options for the control enhancement.
     * @return TControl - returns an instance of the controlType (first parameter), typed as a TControl (first type param).
     */
    static create<TControl extends Control<any>, TOptions>(controlType: new (options: TOptions) => TControl, container: JQuery, controlOptions: TOptions, enhancementOptions?: EnhancementOptions): TControl;
    /**
     * @param type
     * @param container
     * @param options
     * @return
     */
    static createIn<TOptions>(type?: any, container?: any, options?: TOptions, koCompatable?: boolean): Control<any>;
    private _overlay;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    _getUniqueId(): string;
    /**
     * @param id
     */
    _setId(id: string): void;
    dispose(): void;
    showElement(): void;
    hideElement(): void;
    enableElement(enabled: any): void;
    showBusyOverlay(): JQuery;
    hideBusyOverlay(): void;
    _createElement(): void;
    _initializeElement(): void;
    _setStyles(): void;
    createIn(container: JQuery): void;
    protected _createIn(container: JQuery): void;
    /**
     * Set Focus to the control
     */
    focus(): void;
    /**
     * Fires the change event for the control immediately
     *
     * @param sender Source element of the event
     */
    protected _fireChange(sender?: any): any;
}
export declare class BaseControl extends Control<any> {
}
export declare class BaseDataSource {
    private _source;
    private _items;
    private _allItems;
    _options: any;
    constructor(options?: any);
    setSource(source: any): void;
    getSource(): any;
    /**
     * @param source
     */
    prepareSource(source?: any): void;
    getComparer(): any;
    ensureItems(): void;
    /**
     * @param all
     */
    getItems(all?: any): any;
    /**
     * @param allItems
     */
    setItems(items: any, allItems?: any): void;
    /**
     * @param all
     */
    getCount(all?: any): any;
    /**
     * @param all
     */
    getItem(index: any, all?: any): any;
    /**
     * @param all
     * @param textOnly
     * @return
     */
    getItemText(index: any, all?: any, textOnly?: any): string;
    /**
     * @param startsWith
     * @param all
     */
    getItemIndex(itemText: any, startsWith?: any, all?: any): any;
    nextIndex(selectedIndex: any, delta: any, all: any): number;
}
export declare class ListDataSource extends BaseDataSource {
    constructor(options?: any);
}
