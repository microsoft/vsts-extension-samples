/// <reference path="../../References/jquery.d.ts" />
/// <reference path="../../References/VSS-Common.d.ts" />
import CommonControls = require("VSS/Controls/Common");
import Controls = require("VSS/Controls");
import Identities_Picker_RestClient = require("VSS/Identities/Picker/RestClient");
import Identities_Picker_Services = require("VSS/Identities/Picker/Services");
export interface IIdentityPickerDropdownOptions extends Identities_Picker_Services.IIdentityServiceOptions {
    /**
    *   type of identities - one or more of User or Group
    **/
    identityType?: Identities_Picker_Services.IIdentityType;
    /**
    *   scope - one or more of AAD, Local
    **/
    operationScope?: Identities_Picker_Services.IOperationScope;
    /**
    *   default identities to initialize the dropdown with
    **/
    items?: Identities_Picker_RestClient.IIdentity[];
    /**
    *   restrict displayed identities in dropdown
    **/
    pageSize?: number;
    /**
    *   what action (usually in parent) should execute when an item in this dropdown is selected
    **/
    onItemSelect?: (identity: Identities_Picker_RestClient.IIdentity) => any;
    /**
    *   whether to display the contact card icon for each identity in the dropdown. Default false.
    **/
    showContactCard?: boolean;
    /**
    *   the width of the dropdown control. Default is max(positioningElement width, 400px)
    **/
    width?: number;
    /**
    *   the vertex of the dropdown which coincides with the baseAlign (horizontal-vertical). See UI.Positioning for details. Default is "left-top"
    **/
    elementAlign?: string;
    /**
    *   the vertex of the base element used as a reference for positioning (horizontal-vertical). See UI.Positioning for details. Default is "left-bottom"
    **/
    baseAlign?: string;
    tfsContext?: any;
    coreCssClass?: string;
    /**
    *   an element, or a function which returns an element, to be used for determining the alignment and width of the dropdown control.
    *   Refer to the width, elementAlign, and baseAlign options. Default is the container
    **/
    positioningElement?: JQuery | (() => JQuery);
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
    private _prefix;
    private _isVisible;
    private _identityType;
    private _operationScope;
    constructor(options?: IIdentityPickerDropdownOptions);
    initializeOptions(options?: IIdentityPickerDropdownOptions): void;
    initialize(): void;
    /**
    * Set the prefix but do not expect an update to the list
    **/
    updatePrefix(prefix: string): void;
    /**
    * Returns true if the dropdown is currently being shown
    **/
    isVisible(): boolean;
    /**
    * Get Identities
    */
    getIdentities(prefix: string, successCallback?: (data?: Identities_Picker_RestClient.QueryTokenResultModel) => any, errorCallback?: (errorData?: any) => any): void;
    updateIdentities(items: Identities_Picker_RestClient.IIdentity[], keepIndex?: boolean): void;
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
    private getPositioningElement();
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
    getSelectedIndex(): number;
    getSelectedItem(): Identities_Picker_RestClient.IIdentity;
    private _highlightPrefix(textValue);
    /**
    * Create the li that shall represent an user item
    **/
    private _createItem(index);
    private _render();
    private _loadNextPage(force?);
}
export declare class IdCardDialog extends CommonControls.ModalDialog {
    static IDCARD_LOADED_EVENT: string;
    private _identityType;
    private _operationScope;
    private _$idCardDialog;
    constructor(options?: any);
    initializeOptions(options?: any): void;
    initialize(): void;
    private _getIdentitiesFailure(data);
    private _getIdentitiesSuccess(data);
    private _getThumbnailFailure(data);
    private _getThumbnailSuccess(thumbnails);
    private _orderAttributes(identity);
    private _displayIdCard(identity, attributes);
    private _onCloseClick(e?);
    private _onCancelClick(e?);
    private _createIdentityImageElement(tfsContext, identityId, size);
}
export interface IIdentityPickerSearchOptions extends Identities_Picker_Services.IIdentityServiceOptions {
    /**
    *   type of identities - one or more of User or Group
    **/
    identityType?: Identities_Picker_Services.IIdentityType;
    /**
    *   scope - one or more of AAD, Local
    **/
    operationScope?: Identities_Picker_Services.IOperationScope;
    /**
    *   default identities to initialise the dropdown with
    **/
    items?: Identities_Picker_RestClient.IIdentity[];
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
    /**
    *   whether to display the contact card icon for each identity in the dropdown. Default false.
    **/
    showContactCard?: boolean;
    /**
    *   whether to style the search control with a triangle that displays the MRU on click or not. Default false.
    **/
    showMruTriangle?: boolean;
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
    private _operationScope;
    private _selectedItems;
    private _unresolvedItems;
    private _$input;
    private _searchTerm;
    private _$focusedOn;
    private _typingTimer;
    private _doneTypingInterval;
    private _containerHeight;
    private _elementMargin;
    private _scrollBarWidth;
    private _triangleWidth;
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
    private _onInputClick(e?);
    private _onDropClick(e?);
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
    resolvedIdentities: Identities_Picker_RestClient.IIdentity[];
    unresolvedIdentities: string[];
}
