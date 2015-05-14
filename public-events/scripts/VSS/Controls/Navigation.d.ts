/// <reference path="../References/VSS-Common.d.ts" />
import CommonControls = require("VSS/Controls/Common");
import Controls = require("VSS/Controls");
import Menus = require("VSS/Controls/Menus");
/**
 * Creates a high-level view object for a given page which captures page/hash navigations,
 * handles setting page title, etc.
 */
export declare class NavigationView extends Controls.BaseControl {
    private _chromelessMode;
    private _leftPaneVisible;
    private _useHostedTitle;
    /**
     * Creates an instance of the object for the given page
     *
     * @param options
     *     attachNavigate: If true, listen for page/hash navigations
     *
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
     * Function invoked when a page/hash navigation has occurred
     *
     * @param state Hash object containing the hash-url parameters
     */
    onNavigate(state: any): void;
    /**
     * Get the element that holds the title
     */
    _getViewTitle(): JQuery;
    /**
     *     Sets the (text) title of the page
     *
     * @param title
     *     Title of the page
     *
     * @param tooltip
     *     Optional tooltip for the page's title element
     *
     */
    setViewTitle(title?: string, tooltip?: string): void;
    /**
     *     Sets the raw-html title element for the page
     *
     * @param title
     *     Text title of the page to be used as the document title
     *
     * @param titleContent
     *     Raw HTML to inject into the title element (will not be escaped)
     *
     */
    setViewTitleContent(title: string, titleContent: string): void;
    /**
     *     Sets the document's title
     *
     * @param title
     *     Title of the page (text)
     *
     */
    setWindowTitle(title: string): void;
    /**
     * Shows or hides the Left (tree) section of the explorer page
     *
     * @param visible If true, show the left side of the explorer page. False to hide it.
     */
    setLeftHubPaneVisibility(visible: boolean): void;
    /**
     *     Set full-screen mode. If true, hide the chrome (hubs, etc.) around the main hub content, hide the splitter, etc.
     *
     * @param fullScreenMode True to enter full screen mode. False to exit full screen mode.
     */
    setFullScreenMode(fullScreenMode: boolean, showLeftPaneInFullScreenMode?: boolean): void;
    /**
     * Set the desired title mode for the current page.
     * Callers must specify directly, as navigation cannot take dependency on TFSOM.
     */
    _setTitleMode(isHosted: boolean): void;
    /**
     * Protected API: returns the desired title format string for use by SetWindowTitle()
     */
    _getPageTitleString(): string;
    private _attachNavigate();
    _onNavigate(state: any): void;
}
/**
 * A high-level singleton wrapper class for a Tri-Split page, providing lightweight
 * functionality such as retrieving the left/right/center hub content, left/right
 * panes, setting the view title, etc.
 *
 * This class is designed to enhance the hub view of a Tri-Split page, and depends
 * on the structure defined in the HubPageExplorerTriSplitPivot.master page.
 */
export declare class TriSplitNavigationView extends NavigationView {
    private static _instance;
    private _leftPane;
    private _rightPane;
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
     * Retrieve the singleton instance of the class for the current page.
     */
    static getInstance(): TriSplitNavigationView;
    /**
     * Retrieve the left pane element within the current backlog view
     */
    getLeftPane(): JQuery;
    /**
     * Retrieve the right pane element within the current backlog view.
     * NOTE: This retrieves the right pane of the left splitter, which has the center
     * hub content as well as the right hub content (e.g. the product backlog mapping pane).
     */
    getRightPane(): JQuery;
}
export interface IPivotFilterItem {
    encoded?: boolean;
    id?: string;
    selected?: boolean;
    text?: string;
    title?: string;
    value?: any;
}
export declare class PivotFilter extends Controls.BaseControl {
    static enhancementTypeName: string;
    private static _behaviors;
    /**
     * Registers a filter behavior for the pivot filter
     *
     * @param behaviorType Type of the registered behavior
     */
    static registerBehavior(behaviorType: any): void;
    /**
     * Creates a behavior using the specified names. First found behavior is used
     *
     * @param names Names of the behaviors to probe
     * @param options Options of the behavior
     * @return
     */
    static createBehavior(names: any[], options?: any): any;
    private _behavior;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    initialize(): void;
    /**
     * Gets all selected items of the pivot filter
     *
     * @return items
     */
    getSelectedItems(): IPivotFilterItem[];
    /**
     * Gets the currently selected item
     *
     * @return item
     */
    getSelectedItem(): IPivotFilterItem;
    /**
     * Gets the item of the specified value
     *
     * @param value Value of the item (String or Number)
     * @return item
     */
    getItem(value: any): IPivotFilterItem;
    /**
     * Gets all of the items
     * @return the items
     */
    getItems(): IPivotFilterItem[];
    /**
     * Gets the specified item selected
     *
     * @param item Item to select
     * @param fireChange Determines whether the control shoudl fire the change event
     */
    setSelectedItem(item: IPivotFilterItem, fireChange?: boolean): void;
    /**
     * Updates the pivot filter using the specified items
     *
     * @param items New set of items for the pivot filter
     */
    updateItems(items: IPivotFilterItem[], options?: any): void;
    /**
     * Initializes behavior of this pivot filter using specified behavior names
     */
    private _initBehavior(behaviorNames);
    /**
     * This method is called when the control is created in the client using createIn.
     * DOM needs to be built by the control itself
     */
    _createElement(): void;
    private _buildDom();
    private _attachEvents();
    private _onFilterChanged(e?, item?);
}
export declare class PivotView extends Controls.BaseControl {
    static enhancementTypeName: string;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    /**
     * @param selector
     * @return the array of items
     */
    getItems(selector?: any): any[];
    initialize(): void;
    updateItems(): void;
    /**
     * Set a particular view's link to a new link.
     *
     * @param id The view whose link needs an update.
     * @param link The new link for the specified view.
     */
    setViewLink(id: string, link: string): void;
    getSelectedView(): any;
    /**
     * Set a particular view to be enabled or disabled.
     */
    setViewEnabled(id: any, isEnabled: any): void;
    getView(id: any): any;
    setSelectedView(view: any): void;
    onChanged(view: any): void;
    _createElement(): void;
    private _buildDom();
    private _populateItems(ul);
    private _attachEvents();
    private _onClick(e?);
}
export declare class NavigationViewTab extends Controls.BaseControl {
    /**
     * Creates a control which is used to populate a navigation tab's content section
     */
    constructor(options?: any);
    /**
     * Called whenever navigation occurs with this tab as the selected tab
     *
     * @param rawState The raw/unprocessed hash/url state parameters (string key/value pairs)
     * @param parsedState Resolved state objects parsed by the view
     */
    onNavigate(rawState: any, parsedState: any): void;
    /**
     * Called whenever this tab is active and a navigation occurs that is switching to another tab
     */
    onNavigateAway(): void;
}
export declare class TabbedNavigationView extends NavigationView {
    private _hubContent;
    private _tabsControl;
    private _tabsMap;
    private _tabOptionsMap;
    private _tabs;
    private _currentTab;
    private _currentTabId;
    private _errorTab;
    private _infoTab;
    private _$infoContent;
    private _currentRawState;
    private _currentParsedState;
    private _currentNavigationContextId;
    private _lastParsedNavigationContextId;
    private _showingError;
    private _showingInfo;
    private _skipTabHideOnAsyncNavigate;
    /**
     * Creates a high-level view object for a given page that has different tabs which are
     * displayed based on the current hash/navigation.
     *
     * @param options
     *     tabs: (Object) Mapping of action id to a NavigationViewTab containing the contents of the tab
     *     hubContentSelector: (String) jQuery selector for the hub content div
     *     pivotTabsSelector: (String) jQuery selector for the hub tabs div
     *     hubSplitterSelector: (String) jQuery selector for the hub splitter control
     *
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    getTab(tabId: string): NavigationViewTab;
    showError(error: any): void;
    showErrorContent(title: any, $contentHtml: any, messageType: any, expand: any): void;
    showInformationTab(title: string, description: string): void;
    appendInformationContent(caption: string, collapsed: boolean): CommonControls.InformationAreaControl;
    appendSectionTitle(content: string): void;
    appendSectionSummary(content: string): void;
    appendElement(element: JQuery): void;
    /**
     * Refresh the current tab (causes setState to be called on the currently visible tab)
     */
    refreshCurrentTab(): void;
    /**
     * Get the action/tab id for the current state
     *
     * @return Tab id, specified in the _a parameter
     */
    getCurrentAction(): string;
    /**
     * Get the current (parsed) state objects for the current navigation state
     *
     * @return State Object that was parsed by the view
     */
    getState(): any;
    /**
     * Set the current (parsed) state objects for the current navigation state
     */
    setState(parsedState: any): void;
    /**
     * Get a state hash with null entries for each hash key that exists in the current
     * url hash. This state can be extended and passed to VSS.Host.history.addHistoryPoint
     * so that existing hash parameters are NOT included in the new url.
     *
     * @return
     */
    getEmptyState(): any;
    /**
     * Get the raw (unparsed) state objects for the current navigation state (key/value pairs from the hash/url)
     *
     * @return Object with string values from the url hash portion
     */
    getRawState(): any;
    /**
     * Parse the state info and fetch any artificacts necessary to render the tab/view. Invoke the 'callback'
     * method with the new state info object when the state information has been successfully parsed.
     *
     * @param action The action parameter (_a) in the url hash
     * @param rawState The raw state info from the hash url for the new navigation
     * @param callback
     *    Callback that should be called when the state was successfully parsed. The callback takes 2 parameters: the tab id (typically
     *    the action), and the parsed state info object.
     *
     *    callback(tabId, parsedStateInfo);
     *
     *
     */
    parseStateInfo(action: string, rawState: any, callback: IResultCallback): void;
    /**
     * Get the visibility state of the specified tab based on the current tab/navigation state. True to show this tab. False to hide it.
     *
     * @param tabId The Id to get the visiblility state for
     * @param currentTabId Id of the currently selected tab
     * @param rawState The raw/unprocessed hash/url state parameters (string key/value pairs)
     * @param parsedState Resolved state objects parsed by the view
     * @return True to show the tab. False to hide it.
     */
    getTabVisibility(tabId: any, currentTabId: string, rawState: any, parsedState: any): boolean;
    /**
     * Get the updated tab label for the specified tab based on the current tab/navigation state. null/undefined to keep the existing label.
     *
     * @param tabId The Id to get the tab label for
     * @param currentTabId Id of the currently selected tab
     * @param rawState The raw/unprocessed hash/url state parameters (string key/value pairs)
     * @param parsedState Resolved state objects parsed by the view
     */
    getTabLabel(tabId: any, currentTabId: string, rawState: any, parsedState: any): void;
    /**
     * Shows or hides the Hub pivot section (navigation tab strip + filters)
     *
     * @param visible If true, show the hub pivot (tabs/filters). If false, hide them
     */
    setHubPivotVisibility(visible: boolean): void;
    private _getErrorTab();
    private _getInfoTab();
    _onNavigate(state: any): void;
    _redirectNavigation(action: string, state: any, replaceHistory?: boolean): void;
    private _onParseStateInfoSuccess(tabId, rawState, parsedState, navigationContextId);
    private _updateTabsControl(selectedTabId, rawState, parsedState);
    private _showTab(tab);
    private _getTab(tabId);
    private _createTab(tabControlType, tabOptions?);
}
export interface NavigationLinkOptions {
    state?: any;
    getUrl?: (state: any) => string;
    target?: string;
    text?: string;
    title?: string;
    $content: JQuery;
    initialState?: any;
}
export declare class NavigationLink extends Controls.BaseControl {
    private _navigateHandler;
    private _navigationLinkOptions;
    initializeOptions(options?: any): void;
    constructor(options: NavigationLinkOptions);
    initialize(): void;
    dispose(): void;
    private onNavigate(sender, state);
    private updateLink(state);
    getLocation(state: any): any;
}
export declare module FullScreenHelper {
    var FULLSCREEN_HASH_PARAMETER: string;
    var _events: any;
    /**
     * Initialize the full screen helper. Sets up event handlers.
     *
     * @param menuBar A toggle button for full screen mode will be added to the menu bar (if it does not already exist).
     */
    function initialize(menuBar: Menus.MenuBar, options?: any): void;
    /**
     * Gets a value indicating whether full screen mode is active.
     */
    function getFullScreen(): boolean;
    /**
     * Set full screen value. Update full screen view and button.
     * Update url with full screen tag if addHistoryPoint is true.
     *
     * @param value  The full screen value to set to.
     * @param addHistoryPoint  If true, update url with full screen tag.
     */
    function setFullScreen(value: boolean, addHistoryPoint?: boolean, showLeftLane?: boolean): void;
    /**
     * Get state object for the current full screen mode state.
     *
     * @param value Optional value to set for fullscreen mode.
     * If undefined will use current setting.
     */
    function getUrlData(value?: boolean): any;
    /**
     * Gets full screen icon.
     */
    function getFullScreenIcon(): string;
    /**
     * Gets full screen tooltip.
     */
    function getFullScreenTooltip(): string;
    /**
     * Attaches a fullscreen customer intelligence change event handler.
     * This event handler will be triggered for publishing full screen customer intelligence.
     *
     * @param handler Event handler callback.
     */
    function attachFullScreenCI(handler: IEventHandler): void;
    /**
     * Removes fullscreen customer intelligence change handler from the event handler list.
     *
     * @param handler Event handler callback.
     */
    function detachFullScreenCI(handler: IEventHandler): void;
    /**
     * Attaches a fullscreen customer intelligence change event handler.
     * This event handler will be triggered for publishing full screen customer intelligence.
     *
     * @param handler Event handler callback.
     */
    function attachFullScreenUrlUpdateEvent(handler: IEventHandler): void;
    /**
     * Removes fullscreen customer intelligence change handler from the event handler list.
     *
     * @param handler Event handler callback.
     */
    function detachFullScreenUrlUpdateEvent(handler: IEventHandler): void;
}
