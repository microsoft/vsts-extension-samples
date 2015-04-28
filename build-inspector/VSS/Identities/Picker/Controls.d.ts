/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import Common = require("VSS/Controls/Common");
import Controls = require("VSS/Controls");
import RestClient = require("VSS/Identities/Picker/RestClient");
import Services = require("VSS/Identities/Picker/Services");
export interface IIdentityPickerDropdownOptions extends Services.IIdentityServiceOptions {
    /**
    *   scope - one or more of Authority (AAD) or Account
    **/
    identityType?: Services.IdentityType;
    /**
    *   type of identities - one or more of User or Group
    **/
    identityScope?: Services.IdentityScope;
    /**
    *   default identities to initialise the dropdown with
    **/
    items?: RestClient.IIdentity[];
    /**
    *   restrict displayed identities in dropdown
    **/
    pageSize?: number;
    /**
    *   what action (usually in parent) should execute when an item in this dropdown is selected
    **/
    onItemSelect?: (identity: RestClient.IIdentity) => any;
    coreCssClass?: string;
}
export declare class IdentityPickerDropdownControl extends Controls.Control<IIdentityPickerDropdownOptions> {
    private static MIN_WIDTH;
    static UPDATE_THUMBNAILS_EVENT: string;
    private _identities;
    private _$itemsContainer;
    private _selectedIndex;
    private _numItemsDisplayed;
    private _scrollTimeout;
    private _$searchStatus;
    private _indexToItemMap;
    private _searchActive;
    private _query;
    private _isVisible;
    private _identityType;
    private _identityScope;
    constructor(options?: IIdentityPickerDropdownOptions);
    initializeOptions(options?: IIdentityPickerDropdownOptions): void;
    initialize(): void;
    /**
    * Set the query but do not expect an update to the list
    **/
    updateQuery(query: string): void;
    /**
    * Returns true if the dropdown is currently being shown
    **/
    isVisible(): boolean;
    /**
    * Get Identities
    */
    getIdentities(prefix: string, successCallback?: (data?: RestClient.QueryTokenResultModel) => any, errorCallback?: (errorData?: any) => any): void;
    updateIdentities(items: RestClient.IIdentity[], keepIndex?: boolean): void;
    /**
    * Show the dropdown
    **/
    show(): void;
    /**
    * Hide the dropdown
    **/
    hide(): void;
    private updateDropdown(options);
    /**
    * Scroll to selected item
    **/
    private setSelectedIndex(selectedIndex, scrollIntoView, position?);
    private _scrollItemIntoView(index, position);
    /**
    * Set the position of this control with respect to its parent
    **/
    private setPosition();
    /**
    * Show the status indicator till all users are loaded
    **/
    private showLoading();
    /**
    * Show error message in case of non-2xx response
    **/
    private _showError();
    handleKeyEvent(e: JQueryEventObject): boolean;
    private _nextPage();
    private _prevPage();
    private _nextItem();
    private _prevItem();
    getSelectedItem(): RestClient.IIdentity;
    /**
    * Create the li that shall represent an user item
    **/
    private _createItem(index);
    private _render();
    private _loadNextPage(force?);
}
export declare class IdCardDialog extends Common.ModalDialog {
    static IDCARD_LOADED_EVENT: string;
    private _identityType;
    private _identityScope;
    private _$idCardDialog;
    constructor(options?: any);
    initializeOptions(options?: any): void;
    initialize(): void;
    private _getIdentitiesFailure(data);
    private _getIdentitiesSuccess(data);
    private _getThumbnailFailure(data);
    private _getThumbnailSuccess(thumbnails);
    private _orderAttributes(user);
    private _displayIdCard(user, attributes);
    private _onCloseClick(e?);
    private _onCancelClick(e?);
    private _createIdentityImageElement(tfsContext, identityId, size);
}
export interface IIdentityPickerSearchOptions extends Services.IIdentityServiceOptions {
    /**
    *   scope - one or more of Authority (AAD) or Account
    **/
    identityType?: Services.IdentityType;
    /**
    *   type of identities - one or more of User or Group
    **/
    identityScope?: Services.IdentityScope;
    /**
    *   default identities to initialise the dropdown with
    **/
    items?: RestClient.IIdentity[];
    /**
    *   parent Jquery object
    **/
    container?: JQuery;
    /**
    *   restrict displayed identities in dropdown
    **/
    pageSize?: number;
    /**
    *   whether the search and dropdown controls should handle multiple identities
    **/
    multiIdentitySearch?: boolean;
    /**
    *   what action (usually in parent) should execute when an item in this dropdown is selected
    **/
    onItemSelect?: any;
    tfsContext?: any;
    coreCssClass?: string;
}
export declare class IdentityPickerSearchControl extends Controls.Control<IIdentityPickerSearchOptions> {
    static INVALID_INPUT_EVENT: string;
    static VALID_INPUT_EVENT: string;
    static DATA_SOURCE_FALLBACK_EVENT: string;
    static DATA_SOURCE_REEVALUATE_EVENT: string;
    static SEARCH_STARTED_EVENT: string;
    static SEARCH_FINISHED_EVENT: string;
    private _identityPickerDropdown;
    private _identityType;
    private _identityScope;
    private _selectedItems;
    private _unresolvedItems;
    private _$input;
    private _searchTerm;
    private _$focusedOn;
    private _typingTimer;
    private _doneTypingInterval;
    constructor(options?: IIdentityPickerSearchOptions);
    initialize(): void;
    getIdentitySearchResult(): IdentitySearchResult;
    clear(): void;
    isDropdownVisible(): boolean;
    private _showProgressCursor();
    private _stopProgressCursor();
    private _fireInvalidInput();
    private _fireValidInput();
    private _fireDataSourceFallback();
    private _fireDataSourceReevaluate();
    private _onInputChange(e?);
    private _onInputBlur(e?);
    private _onInputKeyDown(e?);
    private _onInputKeyUp(e?);
    private _removeFromUnresolved(item);
    private _removeFromResolved(item);
    private _getInputText();
    private _resolveInputToIdentities(input);
    private _getIdentities(searchTerm);
    private _updateThumbnail(data);
    private _recalculateInputWidth();
    private _replaceAndCleanup(email);
    private _findInSelectedItems(object);
    private _showUserIdCard(args);
    private _resolveItem(item, clearInput?, prefix?);
    private _getSearchPrefix(input);
    private _unresolveItem(token);
}
export interface IdentitySearchResult {
    resolvedIdentities: RestClient.IIdentity[];
    unresolvedIdentities: string[];
}
