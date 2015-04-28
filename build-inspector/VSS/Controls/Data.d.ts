/// <reference path="../References/VSS-Common.d.ts" />
import Grids = require("VSS/Controls/Grids");
export declare class FieldDataProvider {
    static TREE_PATH_SEPERATER_CHAR: string;
    static EVENT_NEW_ITEM: string;
    static EVENT_REMOVED_ITEM: string;
    static EVENT_UPDATE_ITEM: string;
    private _events;
    private _nodes;
    private _idToNodeMap;
    private _pathToNodeMap;
    private _isTree;
    private _options;
    /**
     * Populates the provider with the given items (nodes).
     *
     * @param nodes A collection of nodes in the following format:
     *
     *    Every node of the tree has the following format:
     *    {
     *         id:       unique id, string, required
     *         parentId: parent id, string, required (may be null)
     *         text:     text for the node
     *         values:   node values, array, required
     *         children: array of nodes, node, optional
     *    }
     *
     *    Here is a sample declaration of grid items:
     *
     *    gridItems: [{
     *        id: 0,
     *        values: ["Root 1", "red", 100],
     *        children: [{
     *            id: 1,
     *            values: ["Node 1-2", "green", 10],
     *            children: [{
     *                id: 2,
     *                values: ["Leaf 1-2-1", "yellow", 70]
     *            },
     *            {
     *                id: 3,
     *                values: ["Leaf 1-2-2", "blue", 30]
     *            }]
     *        },
     *        {
     *            id: 4,
     *            values: ["Root 2", "white", 50]
     *        }]
     *
     *        "checked" is an array of tree item ids that must be initially checked in the grid.
     *        If this parameter is not provided nothing is checked.
     *
     *
     * @param options
     * OPTIONAL: Object with the following structure:
     *   {
     *     allowEmpty: boolean: Indicates if empty values should be treated as valid or not.
     *     sort: comparison function for nodes if sorting is required
     *   }
     *
     */
    constructor(nodes: any, options?: any);
    /**
     * Move the node to a new parent.
     *
     * @param node Node to be re-parented.
     * @param newParent The new parent for the node.
     */
    reparentNode(node: any, newParent: any): void;
    /**
     * Return true if the value is valid
     *
     * @param value The value to check
     * @return
     */
    isValidValue(value: string): boolean;
    /**
     * return true if the data represented is tree
     *
     * @return
     */
    isTree(): boolean;
    /**
     * get Nodes to use in the combo box
     *
     * @return
     */
    getNodes(): any;
    /**
     * Get a node by its text
     *
     * @param nodeText text of the node to lookup
     * @return
     */
    getNode(nodeText: string): any;
    /**
     * Get the node associated with the id provided.
     *
     * @param nodeId id of the node
     * @return
     */
    getNodeFromId(nodeId: string): any;
    /**
     * Update node in the tree.
     *
     * @param node Node to update.
     * @return The updated node data
     */
    updateNode(node: any): any;
    /**
     * Gets the first root node of the payload.
     */
    getRootNode(): any;
    /**
     * Get the previous sibling node of the node identified by "id"
     *
     * @param id The id (Guid string) for the node
     */
    getPreviousSiblingNode(id: string): any;
    /**
     * Deletes the specified node from the source list and all cached indexes.
     * Returns the removed node
     *
     * @param id The ID of the node in which to remove.
     * @return
     */
    removeNode(id: any): any;
    /**
     * Add the provided node to the tree.
     *
     * @param node New node to add.
     * @param parent The node to parent under
     */
    addNode(node: any, parent: any): any;
    /**
     * Returns a clone, or deep-copy, of the source collection.
     */
    cloneSource(): any[];
    /**
     *  Attach a handler for the EVENT_NEW_ITEM event.
     *
     * @param handler The handler to attach
     */
    attachNewItem(handler: IEventHandler): void;
    /**
     * Remove a handler for the EVENT_NEW_ITEM event
     *
     * @param handler The handler to remove
     */
    detachNewItem(handler: IEventHandler): void;
    /**
     * Attach a handler for the removed item event.
     *
     * @param handler
     * The handler to attach.  This will be invoked with an argument in the following format:
     *   {
     *     workItemIndex: index,
     *     treeSize: treeSize
     *   }
     *
     */
    attachRemovedItem(handler: IEventHandler): void;
    /**
     * Remove a handler for the removed item event.
     *
     * @param handler The handler to remove
     */
    detachRemovedItem(handler: IEventHandler): void;
    /**
     *  Attach a handler for the EVENT_UPDATE_ITEM event.
     *
     * @param handler The handler to attach
     */
    attachUpdateItem(handler: IEventHandler): void;
    /**
     * Remove a handler for the EVENT_UPDATE_ITEM event
     *
     * @param handler The handler to remove
     */
    detachUpdateItem(handler: IEventHandler): void;
    /**
     * Populate the mapping of path to associated node and id to node.
     */
    private _populateNodeMappings();
    /**
     * Sort the children of a node (possibly recursively)
     *
     * @param node The node whose children will be sorted
     * @param recursive (optional)If true, then the sort will proceed recursively through descendents
     * @param sort (optional) Comparison function for sorting the nodes.
     *     If not supplied, the sort function from the options will be used.
     */
    private _sortChildren(node, recursive?, sort?);
    /**
     * Adds the specified node to all cached indexes.
     *
     * @param node The node in which to add.
     * @param parent The parent of the node in which to add.
     */
    private _addNode(parent, node);
    private _clearCache(node);
    /**
     * Cleans up the path removing any trailing \'s
     *
     * @param path Path to be cleaned up.
     */
    private _cleanupPath(path);
    /**
     * Gets a count of all the specified nodes' children, recursively.
     *
     * @param node The node whose children to count.
     */
    private _getChildrenCount(node);
    /**
     * Notifies listeners of NewItem
     *
     * @param args args
     */
    private _raiseNewItem(args?);
    /**
     * Notifies listeners of that a work item was removed.
     *
     * @param args args
     */
    private _raiseRemovedItem(args?);
    /**
     * Notifies listeners of updateItem
     *
     * @param args args
     */
    private _raiseUpdateItem(args?);
}
export declare class HierarchicalGridDataAdapter {
    static _ITEM_ID_DATA_SOURCE_INDEX: number;
    /**
     * Binds a field data provider to a grid control.
     */
    static bindAdapter(adapterType: any, fieldDataProvider: any, grid: any, options?: any): any;
    /**
     * Clones the specified node and all its children, returning the cloned node.
     *
     * @param node The node to clone.
     */
    static cloneNode(node: any): any;
    private _options;
    private _expandStatesManager;
    _flattenedItems: any;
    _grid: Grids.Grid;
    _expandStates: any[];
    dataProvider: any;
    fieldDataHelper: any;
    /**
     * Creates an adapter to provide data from a field data provider to a grid control.
     *
     * @param fieldDataProvider The field data provider that represents a tree graph of data.
     * @param grid The grid control in which to bind to the data provider.
     * @param options Options that may be used to customize the behavior of this provider.
     */
    constructor(fieldDataProvider: any, grid: any, options?: any);
    /**
     * Gets the grid that this adapter is associated with
     *
     * @return
     */
    getGrid(): Grids.Grid;
    /**
     * Refreshes the contents of the grid with the current contents of the field data provider.
     *
     * @param calculateOnly Indicates whether the refresh should update the bound grids' data
     * source and expand states or should just rebuild all internal indexes.  When true, this function will
     * only rebuild the internal indexes and caches without updating the bound grid.  This is sometimes useful when
     * you need to recalculate indexes during a reparent but don't want to update the grid until the reparent has
     * completed.
     */
    refresh(calculateOnly?: boolean): void;
    /**
     * Gets the node associated with the data index.
     *
     * @param dataIndex Data index of the node to lookup.
     */
    getNodeForDataIndex(dataIndex: number): any;
    /**
     * Gets the parent of the node associated with the data index.
     *
     * @param dataIndex Data index of the node to lookup.
     * @return A grid row index for the parent node of the node in the specified dataIndex of the grid.
     */
    getParentNodeIndexForDataIndex(dataIndex: number): number;
    /**
     * Gets the data index for the specified node ID.
     *
     * @param node The node whose data index is to be retrieved.
     */
    getDataIndexFromNode(node: any): any;
    /**
     * Returns a clone, or deep-copy, of the source collection.
     */
    cloneSource(): any[];
    /**
     * Overridable wrapper for populateDataSource
     */
    _createDataSource(items: any, source: any, expandStates: any, level: any): void;
    /**
     * Constructs an array of values from the source row which is used
     * by the Checklist grid control to managed the items checked/unchecked.
     *
     * @param sourceRow A row from the source data set.
     */
    _constructRow(sourceRow: any): any[];
    /**
     * Creates source data for the given items.
     *
     * @param items The structure defining the tree for the grid.
     * See CheckboxSelectionGrid function for details about gridItems format.
     * @param source Array of grid rows where every row is an array of values.
     * @param expandStates Array of numbers of the same size as 'source' argument
     *     containing number of children in the tree under every row recursively.
     * @param checkedItems The table allows for fast lookup of checked item IDs.
     * @param level Current level of the tree (1 is for the roots).
     * @return Returns number of given items including their children recursively.
     */
    private _populateDataSource(items, source, expandStates, level);
    /**
     * Responds to a new item added to the data provider.
     *
     * @param node The node added to the data provider.
     * @param parent The parent the specified node was added to.
     */
    private _addNewItem(node, parent);
    /**
     * Remove a work item from the grid.
     *
     * @param node The node removed from the data provider.
     * @param parent The parent of the node removed.
     * @param treeSize The total number of children of the node removed (including the node itself).
     */
    private _removeItem(node, parent, treeSize);
    /**
     * Update a work item in the grid.
     *
     * @param node The edited node from the data provider.
     */
    private _updateItem(node);
    /**
     * Updates the expand states to account for changes in the grid data.
     *
     * @param itemIndex Index of the item to start updating at.
     * @param increment Number of items added or removed.  The expand states will be incremented by this value.
     */
    private _updateExpandStates(itemIndex, increment);
    /**
     * Moves the expand states for a node and all its children from oldNodeIndex to newNodeIndex.
     *
     * @param oldNodeIndex The source location of the node states to move.
     * @param newNodeIndex The destination location of the node states ot move.
     */
    private _moveExpandStatesForNode(oldNodeIndex, newNodeIndex);
}
export declare class ChecklistDataAdapter extends HierarchicalGridDataAdapter {
    static _CHECKBOX_COLUMN_INDEX: number;
    static _LABEL_COLUMN_INDEX: number;
    static _CHECK_CHANGED: string;
    static CHECK_COLUMN_NAME: string;
    private _checkedItems;
    private _itemStates;
    private _events;
    private _disabledTooltip;
    private _checkboxRangeRootId;
    private _checkboxRangeBegin;
    private _checkboxRangeEnd;
    private _allEnabled;
    private _blockedCheckIds;
    private _disableChildren;
    private _noCheckboxes;
    private _onBeforeCheckChanged;
    /**
     * Description
     *
     * @param fieldDataProvider field Data Provider
     * @param grid grid
     * @param option options that could include
     * allEnabled: if all checkboxes are enabled or disabled
     * rootNodeId: the root element to display checkboxes under
     * noColumn: whether to add the column for checkboxes to the grid
     * disabledTooltip: the tooltip text to show on disabled checkboxes
     *
     */
    constructor(fieldDataProvider: any, grid: any, options?: any);
    /**
     * Initializes the data provider and prepares it for use
     * by the checklist selection grid.
     *
     * @param checkedItemIds A collection of item IDs representing the checked
     * items.
     */
    initialize(checkedItemIds: any): void;
    /**
     * Determine if a row has a checkbox
     *
     * @param dataIndex index of the row to check
     * @return
     */
    hasCheckBox(dataIndex: number): boolean;
    /**
     * Updates the checkbox range
     *
     * @param expandStates The expand states
     */
    updateCheckboxesRange(expandStates: any[]): void;
    /**
     * Determines whether the node is a leaf node
     *
     * @param node A tree node
     * @return
     */
    isLeafNode(node: any): boolean;
    /**
     * Disables and blocks the checking operation for the provided data index
     *
     * @param id The id the row in the grid
     */
    blockCheck(id: string): void;
    /**
     * Ensures enablement of the checking operation for the provided data index
     *
     * @param id The id of the row in the grid
     */
    unblockCheck(id: string): void;
    /**
     * Sets the root of the check box range
     *
     * @param id Id of the node to be the root of check boxes
     */
    setCheckboxRangeRoot(id: string): void;
    /**
     * Gets the currently selected check boxes root id
     *
     * @return The id of the checkbox range root
     */
    getCheckboxRangeRoot(): number;
    /**
     * Attach a handler for the removed item event.
     *
     * @param handler function
     */
    attachCheckedItemsChanged(handler: IEventHandler): void;
    /**
     * Remove a handler for the removed item event.
     *
     * @param handler The handler to remove
     */
    detachCheckedItemsChanged(handler: IEventHandler): void;
    /**
     * OVERRIDE: create the datasource for the grid
     */
    _createDataSource(items: any, source: any, expandStates: any, level: any): void;
    /**
     * Sets the enabled state of the row
     *
     * @param id The item ID used to look up the item in the state cache.
     * @param enabled The new state of the row.
     */
    setItemState(id: string, enabled: boolean): void;
    /**
     * Return Whether the item at the dataIndex is checked
     *
     * @param dataIndex index of item to check if checked
     * @return
     */
    getItemChecked(dataIndex: number): boolean;
    /**
     * Set the title of the checkbox identified by a given item id
     *
     * @param id The item ID used to look up the item in the state cache.
     * @param title The title to set.
     */
    setItemTitle(id: string, title: string): void;
    /**
     * Reset the title of the checkbox identified by a given item id
     *
     * @param id The item ID used to look up the item in the state cache.
     */
    resetItemTitle(id: string): void;
    /**
     * Allows accessing the list of grid items that are currently checked.
     *
     * @return Returns array of checked item ids.
     */
    getCheckedItemIds(): any[];
    /**
     * Updates checkbox related data for grid row with the new state (without touching the actual checkbox element).
     *
     * @param dataIndex The row index.
     * @param state New state for the row's checkbox.
     */
    setCheckboxStateData(dataIndex: number, state: boolean): void;
    /**
     * Gets the checkbox state for the provided data index.
     *
     * @param dataIndex The data index to get the checkbox state for.
     * @return True when the checkbox is checked and false otherwise.
     */
    getCheckboxState(dataIndex: number): boolean;
    /**
     * Determine whether the checkbox at the specified dataIndex is enabled
     *
     * @return
     */
    getItemEnabled(dataIndex: any): boolean;
    /**
     * Gets the branch-level checked state based on the state grid items.
     *
     * @return
     */
    getBranchCheckedState(): boolean;
    /**
     * OVERRIDE: Constructs an array of values from the source row which is used
     * by the Checklist grid control to managed the items checked/unchecked.
     *
     * @param sourceRow A row from the source data set.
     */
    _constructRow(sourceRow: any): any[];
    /**
     * Gets the value used for the ID attribute of the checkbox DOM element at a given index
     *
     * @param dataIndex data index of the row
     * @return A (unique) id for the checkbox
     */
    private _getCheckboxCellId(dataIndex);
    /**
     * Attempts to find the checkbox associated with a given dataIndex
     *
     * @param dataIndex data index of the row
     * @return A jQuery object containing the checkbox for the given dataIndex (or an empty jQuery object if one doesn't exist.
     */
    private _findCheckbox(dataIndex);
    /**
     * create checkbox cell at specific row in a column
     *
     * @param dataIndex index of the row
     * @param column column object
     * @return The checkbox cell
     */
    private _createCheckboxCell(dataIndex, column);
    /**
     * The handler is invoked when a checkbox on a grid row is clicked.
     *
     * @param e jQuery event object.
     */
    private _onCheckboxClicked(e?);
    private _setCheckedState($checkbox, dataIndex, checked);
    /**
     * Notifies listeners of that a work item was removed.
     *
     * @param args args
     */
    private _raiseCheckedItemsChanged(args?);
    /**
     * Sets the title of the checkbox to the default value
     *
     * @param $checkbox The jQuery object for the checkbox
     */
    private _setCheckboxDefaultTitle($checkbox);
    /**
     * Get the id of the row at the specified dataIndex
     *
     * @return
     */
    private _getIdFromDataIndex(dataIndex);
    /**
     * Get the dataIndex of the row for the specified item id
     *
     * @param id The item ID used to look up the item in the state cache.
     * @return
     */
    private _getDataIndexFromId(id);
}
export interface ITableFormatter {
    getTableFromSelectedItems(): string;
}
export declare class TabDelimitedTableFormatter implements ITableFormatter {
    _options: any;
    _grid: Grids.Grid;
    constructor(grid: Grids.Grid, options?: any);
    /**
     * Iterates through the selected rows and builds a table containing the results.
     *
     * @return A tab-delimited plain-text table containing all rows and all columns in the current selection.
     */
    getTableFromSelectedItems(): string;
    getFormattedColumnValue(column: any, value: string): string;
}
export declare class HtmlTableFormatter implements ITableFormatter {
    private static HEADER_BACKGROUND_COLOR;
    private static HEADER_COLOR;
    private static FONT_SIZE;
    private static FONT_FAMILY;
    private static BORDER_COLLAPSE;
    private static COLUMN_BORDER;
    private static COLUMN_VERTICAL_ALIGN;
    private static COLUMN_PADDING;
    private static ROW_BACKGROUND_COLOR;
    private static ROW_ALT_BACKGROUND_COLOR;
    _options: any;
    _grid: Grids.Grid;
    constructor(grid: Grids.Grid, options?: any);
    processColumns(columns: any[]): any[];
    getTableFromSelectedItems(): string;
    getFormattedColumnValue(column: any, value: string): string;
    /**
     * Iterates through the selected rows and builds a HTML table containing the results.
     *
     * @return A HTML table containing all rows and all columns in the current selection.
     */
    _getJQTableFromSelectedItems(): JQuery;
}
