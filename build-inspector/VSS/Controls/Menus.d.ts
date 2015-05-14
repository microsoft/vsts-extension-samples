/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/VSS.SDK.Interfaces.d.ts" />
import Controls = require("VSS/Controls");
export declare var menuManager: any;
export declare enum MenuItemState {
    None = 0,
    Disabled = 1,
    Hidden = 2,
    Toggled = 4,
}
export interface IMenuItemSpec {
    id?: string;
    contributionId?: string;
    rank?: number;
    text?: string;
    title?: string;
    separator?: boolean;
    disabled?: boolean;
    icon?: string;
    childItems?: any;
    group?: string;
    arguments?: any;
    action?: (commandArgs: any) => void;
}
export interface MenuBaseOptions {
    type: string;
    contextInfo: any;
    arguments: any;
    updateCommandStates: Function;
    getCommandState: Function;
    overflow: string;
    align: string;
    cssClass: string;
    cssCoreClass: string;
}
export declare class MenuBase<TOptions extends MenuBaseOptions> extends Controls.Control<TOptions> {
    _type: any;
    _parent: any;
    _children: any;
    _commandStates: any;
    actionArguments: any;
    /**
     * @param options
     */
    constructor(options?: any);
    getOwner(): any;
    getContextInfo(): any;
    /**
     * @return
     */
    getActionArguments(): any;
    /**
     * Returns the menu type. The values are outlines in the MenuType enumeration
     *
     * @return The menu type value
     */
    getMenuType(): number;
    updateCommandStates(commands: ICommand[]): void;
    isMenuBar(): boolean;
    _fireUpdateCommandStates(context: any): void;
    _clear(): void;
    private _updateCommandStates(commands);
}
export interface MenuItemOptions extends MenuBaseOptions {
    item: any;
    immediateShowHide: boolean;
    clickToggles: boolean;
}
export declare class MenuItem extends MenuBase<MenuItemOptions> {
    static enhancementTypeName: string;
    static getScopedCommandId(id: any, scope: any): any;
    private _highlightHover;
    private _highlightPressed;
    private _index;
    _item: any;
    _align: any;
    /**
     * @param options
     */
    constructor(options?: MenuItemOptions);
    /**
     * @param options
     */
    initializeOptions(options?: MenuItemOptions): void;
    getCommandId(): any;
    getAction(): any;
    hasAction(): boolean;
    hasSubMenu(): any;
    isDecorated(): boolean;
    isDefault(): boolean;
    isSeparator(): boolean;
    /**
     * Returns if this menu item is a label.  Labels are menu items that aren't actions, like separators, but contain content, such as text.
     *     NOTE: Currently, Labels are implemented using separators.  However, there are plans to revisit this.
     */
    isLabel(): any;
    isSelected(): boolean;
    getCommandState(commandId?: string, context?: any): MenuItemState;
    getIndex(): number;
    setIndex(value: number): void;
    isHidden(): boolean;
    isEnabled(): boolean;
    isToggled(): boolean;
    initialize(): void;
    update(item: any): void;
    updateItems(items: any): void;
    _decorate(): void;
    private _getExternalIcon(url);
    select(): void;
    deselect(): void;
    escaped(): void;
    /**
     * @param options
     */
    execute(options?: any): any;
    executeAction(args?: any): any;
    collapse(options?: any): void;
    setFocus(): void;
    removeFocus(): void;
    /**
     * Called to show the hover highlight the button
     */
    showHoverHighlight(): void;
    /**
     * Called to make the button appear to be 'pressed'
     */
    showPressedHighlight(): void;
    /**
     * Called to make the button appear to be 'pressed'
     */
    removePressedHighlight(): void;
    /**
     * Called to remove all highlighting on the button
     */
    removeHighlight(): void;
    /**
     * Updates the title of a menu item using either the specified text or
     * the function provided in the options
     *
     * @param text New title to be displayed
     */
    updateTitle(text: string): void;
    /**
     * Updates the text of a menu item using either the specified text or
     * the function provided in the options
     *
     * @param text New text to be displayed
     */
    updateText(text: string): void;
    getSubMenu(): any;
    tryShowSubMenu(options?: any): boolean;
    showSubMenu(options?: any): void;
    hideSubMenu(options?: any): void;
    hideSiblings(options?: any): void;
    private _attachMenuEvents();
    private _createIconElement();
    private _createTextElement();
    private _createDropElement();
    private _createSeparatorElement();
    private _updateState();
    private _onMouseOver(e?);
    private _onMouseOut(e?);
    private _onMouseDown(e?);
    private _onMouseUp(e?);
    private _onClick(e?);
    private _onDropClick(e?);
    private _onKeyDown(e);
}
export interface MenuContributionProviderOptions {
    defaultTextToTitle?: boolean;
}
export interface MenuOptions extends MenuBaseOptions {
    suppressInitContributions: boolean;
    contributionPoints: string[];
    items: IMenuItemSpec[];
    executeAction: Function;
    getContributionContext?: Function;
}
export declare class Menu<TOptions extends MenuOptions> extends MenuBase<TOptions> {
    static enhancementTypeName: string;
    private _items;
    private _itemsSource;
    private _defaultMenuItem;
    private _childrenCreated;
    private _popupElement;
    private _skipUpdateMenuItemStates;
    private _positioningRoutine;
    private _pinElement;
    private _menuContributionProvider;
    protected _contributedItems: IContributedMenuItem[];
    protected _contributionProviderOptions: MenuContributionProviderOptions;
    _menuItems: any;
    _selectedItem: any;
    _visible: boolean;
    _active: boolean;
    _blockBlur: boolean;
    _focusItem: any;
    /**
     * @param options
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    private _initializeItemsSource();
    _decorate(): void;
    /**
     * Gets the item which has the specified id
     *
     * @param tag Associated with the menu item
     * @return
     */
    getItem(id: any): MenuItem;
    /**
     * Gets an array of all menu items.
     *
     * @return
     */
    getItems(): MenuItem[];
    /**
     * Gets the item which has the specified tag
     *
     * @param tag Associated with the menu item
     * @return
     */
    getItemByTag(tag: string): MenuItem;
    getCommandState(commandId: string, context: any): MenuItemState;
    updateCommandStates(commands: ICommand[]): void;
    updateItems(items: any): void;
    protected _updateItemsWithContributions(items: any, contributedMenuItems: IContributedMenuItem[]): void;
    protected _updateCombinedSource(items: any): void;
    /**
     * Create a list from itemsSource to reflect the order of items after grouping is done.
     * Groups of items come before all ungrouped items.
     * A separator goes between each group of items.
     * Ungrouped items remain at the end of the menu with their manually-specified separators still in tact.
     * If any groups are defined, separators are guaranteed not to be the first or last item in the menu.
     */
    getGroupedItems(): IMenuItemSpec[];
    appendItems(appendedItems: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    /**
     * @return
     */
    _getMenuItemType(): any;
    /**
     * @param extraOptions
     * @return
     */
    _getMenuItemOptions(item: any, extraOptions?: any): any;
    _getFirstMenuItem(): any;
    /**
     * @param item
     * @param ignoreFocus
     */
    _selectItem(item?: any, ignoreFocus?: any): void;
    selectDefaultItem(ignoreFocus?: any): void;
    selectFirstItem(): boolean;
    selectNextItem(): boolean;
    selectPrevItem(): boolean;
    /**
     * @param options
     * @return
     */
    selectDown(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectUp(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectRight(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectLeft(options?: any): boolean;
    show(options?: any): boolean;
    /**
     * @param options
     */
    hide(options?: any): void;
    hideChildren(excludedItem: MenuItem, options?: any): void;
    /**
     * @param options
     * @return
     */
    escape(options?: any): boolean;
    ownFocus(): void;
    attach(parent: any): void;
    /**
     * @return
     */
    _getMenuItemAlignment(): string;
    updateMenuItemStates(): void;
    executeAction(eventArgs: any): any;
    /**
     * Scrolls to ensure that the MenuItem is visible
     *
     * @param item MenuItem which is to be shown
     */
    private _ensureVisible(item);
    private _getItems();
    _clear(): void;
    /**
     * @param menuItemElement
     */
    private _createChildMenuItem(item, menuItemElement?);
    private _createSplitDropMenuItem(item, menuItem);
    private _ensureChildren();
    private _enhanceChildren();
    private _getDefaultMenuItem();
    /**
     * @param options
     */
    private _getNextEnabledItem(index, options?);
    /**
     * @param options
     */
    private _getPrevEnabledItem(index, options?);
    private _ensurePopup();
    private _getPopupAlign(align);
    private _showPopup(element, align);
    _hidePopup(): void;
    private _updateMenuItemStates();
    private _startShowTimeout(element, align);
    private _startHideTimeout();
    private _clearTimeouts();
    private _attachAncestorScroll(element);
    private _detachAncestorScroll(element);
    _onParentScroll(e?: any): void;
    private _onMouseDown(e?);
    private _blockBlurUntilTimeout();
    refreshContributedItems(): void;
    private _refreshContributedMenuItems();
    private _getContributionContext();
}
export interface MenuOwnerOptions extends MenuOptions {
    showIcon: boolean;
    markUnselectable: boolean;
    showTimeout: number;
    hideTimeout: number;
    popupAlign: string;
    onActivate: Function;
    onDeactivate: Function;
}
export declare class MenuOwner<TOptions extends MenuOwnerOptions> extends Menu<TOptions> {
    private _focusElement;
    private _activating;
    private _canBlur;
    private _immediateBlur;
    _subMenuVisible: boolean;
    _align: any;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * Sets showIcon option.
     *
     * @param showIcon New state for the showIcon option.
     */
    setShowIcon(showIcon: boolean): void;
    initialize(): void;
    _decorate(): void;
    /**
     * @return
     */
    _getMenuItemAlignment(): string;
    /**
     * @param extraOptions
     */
    _getMenuItemOptions(item: any, extraOptions?: any): any;
    /**
     * @param options
     * @return
     */
    escape(options?: any): boolean;
    escaped(options?: any): void;
    isActive(): boolean;
    activate(): void;
    /**
     * This is especially necessary for screen readers to read each
     * row when the selection changes.
     */
    private _updateAriaAttribute(item);
    private _hide();
    private _blur();
    private _updateSubMenuVisibleState();
    private _onKeyDown(e?);
    private _onFocus(e?);
    /**
     * @param e
     * @return
     */
    private _onBlur(e?);
    private _proceedBlur();
    private _startBlurTimeout();
    private _clearBlurTimeout();
    _onParentScroll(e?: any): void;
    private _onResize(e?);
    private _onContextMenu(e?);
}
export interface MenuBarOptions extends MenuOwnerOptions {
    orientation: string;
}
export declare class MenuBarO<TOptions extends MenuBarOptions> extends MenuOwner<TOptions> {
    static enhancementTypeName: string;
    private _orientation;
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
    _getMenuItemAlignment(): string;
    /**
     * @param options
     * @return
     */
    selectUp(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectDown(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectLeft(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectRight(options?: any): boolean;
}
export declare class MenuBar extends MenuBarO<MenuBarOptions> {
    /**
     * Tries to activate the menubar associated with the element matched by the selector.
     * @param selector Selector to match the element.
     * @returns Menu activated or not.
     */
    static tryActivate(selector: string): boolean;
    /**
     * Sets focus to the control
     */
    focus(): void;
}
export interface PopupMenuOptions extends MenuOwnerOptions {
    hidden: boolean;
    onPopupEscaped: Function;
    onHide: Function;
}
export declare class PopupMenuO<TOptions extends PopupMenuOptions> extends MenuOwner<TOptions> {
    static enhancementTypeName: string;
    private _floating;
    private _escapeFocusReceiver;
    private _popupPinElement;
    private _onHide;
    _hidden: boolean;
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    _getMenuItemType(): any;
    _decorate(): void;
    popup(focusElement: any, pinElement: any): void;
    private _showPopupMenu();
    protected _updateItemsWithContributions(items: any, contributedMenuItems: IContributedMenuItem[]): void;
    protected _updateCombinedSource(items: any): void;
    /**
     * @param options
     * @return
     */
    selectUp(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectDown(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectLeft(options?: any): boolean;
    /**
     * @param options
     * @return
     */
    selectRight(options?: any): boolean;
    escaped(): void;
    _hidePopup(): void;
}
export declare class PopupMenu extends PopupMenuO<PopupMenuOptions> {
}
/**
 * The command id.
 */
export interface ICommand {
    /**
     * Optional disabled state.  True makes it visible in the menu but not selectable or clickable.
     */
    id: string;
    /**
     * Optional hidden state.  True hides it from the menu.
     */
    disabled?: boolean;
    /**
     * Optional toggled state.  True shows the item as toggled.
     */
    hidden?: boolean;
    toggled?: boolean;
}
/**
 * Sort the menu items by rank, pushing those without a rank to the bottom of the list.
 */
/**
 * Sort the menu items by rank, pushing those without a rank to the bottom of the list.
 */
export declare function sortMenuItems(items: any): any;
