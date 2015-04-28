/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
import Search = require("VSS/Search");
/**
 * @interface
 * An interface for SearchBoxControl options
 */
export interface ISearchBoxControlOptions {
    /**
    * filterTitle: Optional: Tooltip for the control.
    */
    filterTitle?: string;
    /**
     * activateSearchHandler: Optional: Callback when the control is activated.
     */
    activateSearchHandler?: Function;
    /**
     * deactivateSearchHandler: Optional: Callback when the control is deactivated.
     */
    deactivateSearchHandler?: Function;
    /**
     * inputChangedEventHandler: Optional: When the control input changed.
     */
    inputChangedEventHandler?: Function;
    /**
     * hideWatermark: Optional: Set to true to hide watermark for the control.
     */
    hideWatermark?: boolean;
    /**
     * searchIconTooltip: Optional: Tooltip for the search icon of ToggleSearchBoxControl.
     */
    searchIconTooltip?: string;
}
/**
 * A input box control for search or filter.
 */
export declare class SearchBoxControl extends Controls.Control<ISearchBoxControlOptions> {
    private static inputChangedEventThrottlingInterval;
    private _$searchInputTextbox;
    private _$searchIcon;
    private _active;
    private _suppressBlur;
    private _activateSearchHandler;
    private _deactivateSearchHandler;
    private _inputChangedEventHandler;
    private _value;
    private _inputChangedEventHandlerReset;
    private _subsequentInputChange;
    constructor(options?: ISearchBoxControlOptions);
    initialize(): void;
    /**
     * Return the triming value of the input box.
     */
    getValue(): string;
    /**
     * Return the value of the input box.
     */
    private _getValue();
    /**
     * Displays the search box and hides the search button.
     */
    activateSearch(): void;
    /**
     * Removes the search box and shows the search button instead.
     */
    deactivateSearch(): void;
    protected _displaySearchInputBox(isVisible: boolean): void;
    private _clearInput();
    private _createSearchInput();
    private _searchIconClickHandler(e?);
    private _bindInputChangedEventHandler();
    private _keyDown(e?);
    private _keyUp(e?);
    private _mouseDown(e?);
    private _mouseUp();
    private _mouseOut();
    /**
     * Handle the blur which deactivates search
     */
    private _handleBlur();
    /**
     * Handle the focus which activates search
     */
    private _handleFocus(e?);
}
/**
 * A search icon control. When click, it expands to input box control for search or filter.
 */
export declare class ToggleSearchBoxControl extends SearchBoxControl {
    private _$searchIconContainer;
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
     * Show the inputbox and hide the search icon.
     */
    activateSearch(): void;
    /**
     * Hide the inputbox and shows the search icon.
     */
    deactivateSearch(): void;
    private _addSearchToggleIcon();
    private _searchIconHoverIn();
    private _searchIconHoverOut();
    private _toggleSearchIcon(isVisible);
    private _searchIconKeyDownHandler(e?);
    private _searchIconkeyUpHandler(e?);
}
export interface ITextFilterControlOptions extends ISearchBoxControlOptions {
    adapter?: any;
}
export declare class TextFilterControl extends Controls.Control<ITextFilterControlOptions> {
    static tagName: string;
    static coreCssClass: string;
    _textFilterInput: SearchBoxControl;
    _searchCore: Search.SearchCore;
    private _active;
    private _suppressBlur;
    _searchAdapter: any;
    /**
     * Control for backlog search.
     *
     * @param options Options for the control
     */
    constructor(options?: ITextFilterControlOptions);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    isActive(): boolean;
    /**
     * Initializes the control. Creates the search box and initializes events.
     */
    initialize(): void;
    protected _createSearchStrategy(): Search.SearchStrategy;
    private _createSearchInputBox();
    /**
     * Displays the search box and hides the search button
     */
    activateSearch(): void;
    /**
     * Removes the search bar and shows the search button instead
     *
     * @param suppressClear Suppress the clearing event
     */
    deactivateSearch(suppressClear?: boolean): void;
    /**
     * Creates the index in the searchCore
     */
    createIndex(): void;
    /**
     * Clears the index in the Search Core
     */
    clearIndex(): void;
    /**
     * Clears the store and performs the search if search is active.
     */
    refreshResults(): void;
    /**
     * Handle input changed event.
     */
    attachEventOnKeyUp(e?: JQueryEventObject): void;
    /**
     * Perform the search.
     */
    _performSearch(): void;
}
