/// <reference path="../References/VSS-Common.d.ts" />
import CommonControls = require("VSS/Controls/Common");
import Controls = require("VSS/Controls");
export declare class TreeDataSource extends Controls.BaseDataSource {
    root: any;
    constructor(options?: any);
    setSource(source: any): void;
    /**
     * @param source
     */
    prepareSource(source?: any): void;
    /**
     * Update the flat content representation from the current tree
     */
    updateItemsFromSource(): void;
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
    expandNode(node: any): void;
    collapseNode(node: any): void;
    _initRoot(): void;
    private _prepareCurrentItems();
}
export declare class TreeNode {
    /**
     * @param text
     * @param config
     * @param children
     * @return
     */
    static create(text: string, config?: any, children?: TreeNode[]): TreeNode;
    id: number;
    root: boolean;
    text: any;
    parent: TreeNode;
    children: TreeNode[];
    config: any;
    expanded: boolean;
    selected: boolean;
    icon: any;
    tag: any;
    noFocus: boolean;
    noContextMenu: boolean;
    noTreeIcon: boolean;
    folder: any;
    type: any;
    link: string;
    title: string;
    droppable: any;
    iterationPath: string;
    definition: any;
    linkDelegate: any;
    hasExpanded: boolean;
    owner: any;
    application: any;
    emptyFolderNodeText: string;
    isEmptyFolderChildNode: boolean;
    isSearchHit: boolean;
    /**
     * @param text
     * @param config
     * @param children
     */
    constructor(text: string, config?: any, children?: TreeNode[]);
    hasChildren(): boolean;
    clear(): void;
    remove(): void;
    add(node: TreeNode): void;
    /**
     *  Move this node to reside under the specified new parent.
     *
     * @param newParent The destination to reparent the source under.
     */
    moveTo(newParent: any): void;
    addRange(nodes: any): void;
    /**
     * Finds a node using the given path
     *
     * @param path Path to find
     * @param sepChar Path separator, if not given default will be used
     * @param comparer Comparer used to compare nodes in the path, if not given default will be used
     */
    findNode(path: string, sepChar?: string, comparer?: (a: string, b: string) => number): TreeNode;
    sort(recursive: any, treeNodeComparer: any): void;
    path(includeRoot: any, sepChar: any): any;
    level(noRoot: any): number;
    getContributionContext(): TreeNode;
    private _ensureNodeId();
    private _sort(recursive, treeNodeComparer);
}
export declare class TreeView extends Controls.BaseControl {
    static _typeName: string;
    static NODE_DATA_NAME: string;
    static LEVEL_DATA_NAME: string;
    static EXPANDED_CLASS: string;
    static COLLAPSED_CLASS: string;
    private _focusDelegate;
    private _blurDelegate;
    private _dragStartDelegate;
    private _hasFocus;
    private _draggable;
    private _droppable;
    _focusedNode: JQuery;
    private _popupMenu;
    rootNode: TreeNode;
    _selectedNode: any;
    /**
     * Creates new Grid Control
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    _draw(): void;
    _getNodeElement(node: any): JQuery;
    /**
     * Get the node associated with the element
     *
     * @param $element The jQuery object wrapping the tree node's DOM element
     * @return
     */
    _getNode($element: JQuery): TreeNode;
    getSelectedNode(): any;
    /**
     * @param suppressChangeEvent
     */
    setSelectedNode(node: any, suppressChangeEvent?: boolean): void;
    focus(): void;
    _expandNodeParents(node: any, suppressChangeEvent?: boolean): void;
    _updateSelections(): void;
    _updateNode(li: JQuery, node: TreeNode, level: number): any;
    /**
     * @param level
     */
    _drawChildren(node: any, nodeElement: any, level?: number): void;
    /**
     * @return
     */
    _toggle(node: any, nodeElement: any, suppressChangeEvent?: boolean): any;
    /**
     * Ensure the tree node's expansion state is set to a particular value
     *
     * @param node The tree node
     * @param nodeElement The element associated with the node
     * @param expand The desired expand state of the node - true = expanded, false = collapsed
     * @return true = the node's expansion state was changed, false otherwise
     */
    _setNodeExpansion(node: TreeNode, nodeElement: JQuery, expand: boolean): boolean;
    removeNode(node: any): void;
    updateNode(node: any): void;
    /**
     * @param e
     * @return
     */
    onItemClick(node: any, nodeElement: any, e?: JQueryEventObject): any;
    onShowPopupMenu(node: any, options?: any): void;
    /**
     * Indicate whether the element that has focus should be styled differently.
     * The current focus element will be updated to match the new preference
     *
     * @param enabled true, if focus element should be styled.
     */
    enableFocusStyling(enabled: boolean): void;
    _setFocusElement(element: JQuery): void;
    /**
     * Gets the node associated with the provided element.
     *
     * @param element Element to get the node for.
     * @return
     */
    getNodeFromElement(element: any): TreeNode;
    private _drawNode(node, parentElement, level);
    private _drawEmptyFolderNode(parentElement, level, text);
    /**
     * @param e
     * @return
     */
    private _click(e?);
    /**
     * Handle key down events (node selection & expansion)
     *
     * @param e
     * @return
     */
    _onInputKeyDown(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    private _onToggle(e?);
    /**
     * @param e
     * @return
     */
    private _itemClick(e?);
    /**
     * @param e
     * @return
     */
    private _onContextMenu(e?);
    private _showPopupMenu(node);
    /**
     * @param e
     * @return
     */
    private _onFocus(e?);
    /**
     * @param e
     * @return
     */
    _onBlur(e?: JQueryEventObject): any;
    _clearFocusOnElement(): void;
    /**
     * Suppress browser default drag behavior associated with the supplied element to prevent conflicting behavior (text selection/HTML5 default DnD) with JQuery Drag Drop.
     *
     * @param e
     * @return
     */
    private _onDragStart(e?);
    /**
     * Set the droppable
     *
     * @param droppable
     */
    setDroppable(droppable: any): void;
    private _getFirstTabbableChild(nodeElement);
    private _setNodeElementExpandState(nodeElement, expand, hasChildren?);
}
export declare class ComboTreeDropPopup extends CommonControls.ComboListDropPopup {
    dataSource: TreeDataSource;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    expandNode(): boolean;
    collapseNode(): boolean;
    _createItem(index: any): any;
    _onItemClick(e?: any, itemIndex?: any, $target?: any, $li?: any): boolean;
    _getSelectedNode(): any;
}
export declare class ComboTreeBehavior extends CommonControls.ComboListBehavior {
    constructor(combo: any, options?: any);
    canType(): boolean;
    /**
     * @param e
     * @return
     */
    leftKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    rightKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyUp(e?: JQueryEventObject): any;
    _createDataSource(): Controls.BaseDataSource;
}
export declare class SearchComboTreeBehavior extends CommonControls.ComboListBehavior {
    private hitText;
    private selectedHitIndex;
    private originalNodes;
    private lastSearchText;
    private searchDebounceTimeout;
    private debounceWaitTime;
    private textHasChanged;
    constructor(combo: any, options?: any);
    initialize(): void;
    canType(): boolean;
    /**
     * @param e
     * @return
     */
    leftKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    rightKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyDown(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyUp(e?: JQueryEventObject): any;
    _createDataSource(): Controls.BaseDataSource;
    private mouseUp();
    private clearSearchDebounce();
    private debounceSearch(waitInMilliseconds);
    private isComboTextPath();
    private searchNodes();
    private _ensureOriginalNodesStored();
    private getNodesToSearch(searchText);
    private createCopyOfSubtreeWhichMatchesSearch(searchText, nodesToSearch);
    private stringContains(text, contains);
    private modifyDatasourceAndDropdownWithResults(searchHitsFound);
    private expandAncestors(node);
    private performSearchHitProcessing(alreadyCopiedNodes, node);
    private copyNodeToArray(array, node);
    private copyNodeAndAncestorsToArray(array, node);
    private copyDecendantsToArray(array, node);
    private setHit(index);
    private acceptSelectedIndex();
}
export declare function flatten(node: any, items: any, all: any): void;
