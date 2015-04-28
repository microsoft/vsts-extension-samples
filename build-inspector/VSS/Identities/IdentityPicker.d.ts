/// <reference path="../References/jquery.d.ts" />
/// <reference path="../References/VSS-Common.d.ts" />
import SpsIdentityPicker_RestClient = require("VSS/Identities/SpsIdentityPickerRestClient");
import Utils_UI = require("VSS/Utils/UI");
import Controls = require("VSS/Controls");
export declare class IdentitySourceTypes {
    Authority: boolean;
    Account: boolean;
    Collection: boolean;
    Project: boolean;
    Team: boolean;
    Mru: boolean;
    Cache: boolean;
}
export declare class IdentityPickerDropdownControl extends Controls.BaseControl {
    private static MIN_WIDTH;
    private _identities;
    private _itemsContainer;
    private _selectedIndex;
    private _numItemsDisplayed;
    private _scrollTimeout;
    private _$searchStatus;
    private _indexToItemMap;
    private _searchDisabled;
    constructor(options?: any);
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
    * Scroll to selected item
    **/
    setSelectedIndex(selectedIndex: number, scrollIntoView: boolean, position?: Utils_UI.Positioning.VerticalScrollBehavior): void;
    private _scrollItemIntoView(index, position);
    /**
    * Show the dropdown
    **/
    showElement(): void;
    /**
    * Hide the dropdown
    **/
    hideElement(): void;
    update(items: SpsIdentityPicker_RestClient.IIdentity[], highlightTerm: string, disableSearch: boolean, keepIndex?: boolean): void;
    /**
    * Set the position of this control with repect to its parent
    **/
    setPosition(): void;
    /**
    * Show the status indicator till all users are loaded
    **/
    showLoading(): void;
    /**
    * Show error message in case of non-2xx response
    * todo: this message should depend on the IdentitySourceType
    **/
    showError(): void;
    nextPage(): boolean;
    prevPage(): boolean;
    nextItem(): boolean;
    prevItem(): boolean;
    getSelectedItem(): SpsIdentityPicker_RestClient.IIdentity;
    /**
    * Create the li that shall represent an user item
    **/
    private _createItem(index);
    private _render();
    private _loadNextPage(force?);
    /**
    * Future helpers
    **/
    private getSelectedIndex();
    private isSearchDisabled();
    dispose(): void;
}
