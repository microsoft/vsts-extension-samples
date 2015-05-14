/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
import Data = require("VSS/Controls/Data");
import Menus = require("VSS/Controls/Menus");
import Search = require("VSS/Search");
/**
 * @publicapi
 */
export interface IGridOptions {
    /**
     * Data source of the grid. It can be array of arrays ([[], [], [], ...]),  array of objects ([{}, {}, {}, ...])
     * @defaultvalue "[]"
     */
    source?: any;
    /**
     * Specifies the expand states of each item in the source. If an item has a total of n descendants; -n makes the item collapsed, n makes the item expanded, 0 means no children and descendants.
     */
    expandStates?: number[];
    /**
     * Determines whether the header is displayed or not
     * @defaultvalue true
     */
    header?: boolean;
    /**
     * Height of the grid in px or %
     */
    height?: string;
    /**
     * Width of the grid in px or %
     */
    width?: string;
    /**
     * Determines whether multiple selection is allowed or not
     * @defaultvalue true
     */
    allowMultiSelect?: boolean;
    /**
     * Determines whether moving columns is allowed or not
     * @defaultvalue true
     */
    allowMoveColumns?: boolean;
    /**
     * Determines whether selecting text is allowed or not
     * @defaultvalue false
     */
    allowTextSelection?: boolean;
    /**
     * Determines whether the last cell should fill remaining content (if exists)
     * @defaultvalue false
     */
    lastCellFillsRemainingContent?: boolean;
    /**
     * List of columns to be displayed in the grid
     * @defaultvalue "[]"
     */
    columns?: IGridColumn[];
    /**
     * Options about the gutter. If specified false, gutter will be invisible
     * @defaultvalue false
     */
    gutter?: IGridGutterOptions;
    /**
     * Options about the context menu displayed when gutter clicked
     */
    contextMenu?: IGridContextMenu;
    /**
     * Initial sort info for the grid
     * @defaultvalue "[]"
     */
    sortOrder?: IGridSortOrder[];
    /**
     * Specifies whether grid should be sorted initially using the sortOrder option
     * @defaultvalue true
     */
    autoSort?: boolean;
    asyncInit?: boolean;
    initialSelection?: boolean;
    sharedMeasurements?: boolean;
    payloadSize?: number;
    extendViewportBy?: number;
    coreCssClass?: string;
    draggable?: any;
    droppable?: any;
    sort?: Function;
    enabledEvents?: any;
    openRowDetail?: any;
    suppressRedraw?: boolean;
    keepSelection?: boolean;
    /**
     * Type of the formatter which is used for retrieving the content from the grid
     * Used in beginTableFormat, called when triggering a copy action
     */
    formatterType?: new (grid: GridO<any>, options?: any) => Data.ITableFormatter;
}
export interface IGridContextMenu {
    /**
     * Menu items to be shown when gutter clicked. Value can be a list of menu items or a function which returns an a list of menu items
     */
    items?: any;
    /**
     * Execute action for the popup menu
     */
    executeAction?: (args: any) => any;
    contributionPoints?: any;
}
export interface IGridGutterOptions {
    /**
     * Determines whether a context menu is show in the gutter or not
     * @defaultValue false
     */
    contextMenu?: boolean;
    checkbox?: boolean;
    icon?: IGridGutterIconOptions;
}
export interface IGridGutterIconOptions {
    /**
     * String or number value to get the icon value from source item corresponding to current row
     */
    index?: any;
    /**
     * String or number value to get the icon tooltip value from source item corresponding to current row
     */
    tooltipIndex?: any;
}
export interface IGridColumn {
    /**
     * Index of the column which can be either number or string. If number specified, each item of the data source is expected to be an array. Then array[index] is displayed in the column. If string specified, each item if the data source is expected to be an object. Then object[index] is displayed in the column.
     * @defaultvalue "index in the columns array"
     */
    index?: any;
    /**
     * Name of the column used for identification purposes
     */
    name?: string;
    /**
     * Determines whether moving this column is enabled or not
     * @defaultvalue true
     */
    canSortBy?: boolean;
    /**
     * Determines whether sorting this column is enabled or not
     * @defaultvalue true
     */
    canMove?: boolean;
    /**
     * Width of the column in pixels
     * @defaultvalue 100
     */
    width?: number;
    /**
     * Css class to be added to the header cell
     */
    headerCss?: string;
    /**
     * Css class to be added to the cells under this column
     */
    rowCss?: string;
    /**
     * Display text of the column
     * @defaultvalue ""
     */
    text?: string;
    /**
     * Tooltip text of the column
     * @defaultvalue ""
     */
    tooltip?: string;
    /**
     * Specifies how ordering should be performed ("asc" or "desc")
     * @defaultvalue "asc"
     */
    order?: string;
    /**
     * Determines whether the column should be hidden or not
     * @defaultvalue false
     */
    hidden?: boolean;
    /**
     * Determines whether column moving effects this column or not
     * @defaultvalue false
     */
    fixed?: boolean;
    /**
     * If the value of cell is Date, format is used (like 'mm/dd/yyyy')
     */
    format?: string;
    hrefIndex?: number;
    indentOffset?: number;
    indent?: boolean;
    maxLength?: number;
    fieldId?: any;
    comparer?: (column: IGridColumn, order: number, rowA: any, rowB: any) => number;
    isSearchable?: boolean;
    getCellContents?: (rowInfo: any, dataIndex: number, expandedState: number, level: number, column: any, indentIndex: number, columnOrder: number) => void;
    getHeaderCellContents?: (IGridColumn) => JQuery;
    getColumnValue?: (dataIndex: number, columnIndex: number | string, columnOrder?: number) => any;
}
export interface IGridSortOrder {
    /**
     * Refers to column index
     */
    index: any;
    /**
     * Determines whether to sort ascending (default) or descending
     * @defaultvalue "asc"
     */
    order?: string;
}
export interface IGridRowInfo {
    dataIndex?: number;
    rowIndex?: number;
    row?: JQuery;
    dirty?: boolean;
    gutterRow?: any;
}
/**
 * @publicapi
 */
export declare class GridO<TOptions extends IGridOptions> extends Controls.Control<TOptions> {
    static enhancementTypeName: string;
    static MAX_COPY_SIZE: number;
    static PAYLOAD_SIZE: number;
    static EVENT_ROW_UPDATED: string;
    static EVENT_ROW_TOGGLED: string;
    static EVENT_SELECTED_INDEX_CHANGED: string;
    static DATA_DRAGGING_ROWINFO: string;
    static DATA_DROPPING_ROWINFO: string;
    private _selectionStart;
    private _header;
    private _gutterHeader;
    private _columnSizing;
    private _columnMoving;
    private _columnMovingElement;
    private _columnMovingPinElement;
    private _columnInsert;
    private _unitEx;
    private _sizingElement;
    private _ddRowAcceptStatus;
    private _ddRowOverStatus;
    private _ddDropStarted;
    private _activeAriaId;
    private _copyInProgress;
    private _previousCanvasHeight;
    private _previousCanvasWidth;
    /**
     *  Offset height, that shifts the row boundaries up and determines whether the pointer is over a particular row or not
     *  e.g. An offset percentage (passed in by the consumer of the grid) of 50 shifts each row boundary up half the row height for the purposes of calculating whether the mouse
     *  pointer is over the current row or not. The net effect of this is, if the pointer is in the top half of the current row/bottom half of the previous row,
     *  then the pointer is assumed to interesect with the current row.
     */
    private _rowOffsetHeight;
    private _isAboveFirstOrBelowLastRow;
    _contentSpacer: any;
    _dataSource: any[];
    _expandStates: any;
    _indentLevels: any;
    _columns: IGridColumn[];
    _sortOrder: any[];
    _visibleRange: any[];
    _count: number;
    _expandedCount: number;
    _selectedIndex: number;
    _indentIndex: number;
    _selectionCount: number;
    _selectedRows: any;
    _rowHeight: number;
    _cellOffset: number;
    _gutterWidth: number;
    _contentSize: any;
    _rows: any;
    _focus: any;
    _scroller: any;
    _canvasDroppable: any;
    _canvas: any;
    _canvasHeight: number;
    _canvasWidth: number;
    _headerCanvas: any;
    _gutter: any;
    _popupMenu: any;
    _resetScroll: boolean;
    _ignoreScroll: boolean;
    _scrollTop: number;
    _scrollLeft: number;
    _droppable: any;
    _draggable: any;
    _draggingRowInfo: any;
    _cancelable: any;
    _active: boolean;
    _cellMinWidth: number;
    private _draggableOverGrid;
    /**
     * Creates new Grid Control
     *
     * @param options The initialization options for the grid which have the following properties
     *
     *    "columns" is a required property containing the array of grid column descriptors that have the following structure:
     *    {
     *        index: The index for the
     *        text:      column header text, string, optional, default: "",
     *        width:     width in pixels of the column, number, optional, default: 100,
     *        canSortBy: true if the grid can be sorted by the column, boolean, optional, default: true
     *        canMove: true if this column can be moved (has effect only if allowMoveColumns is set to true for the grid as well), boolean, optional, default: true
     *        getCellContents: function that returns cell contents, function, optional, default: this._drawCell
     *            The function takes the same parameters as _drawCell and should return a jQuery object
     *            that represents the cell's contents. The first element will be appended to the row.
     *            If the function returns null or undefined nothing will be appended for that cell.
     *        getHeaderCellContents: function that returns column header cell contents, function, optional, default: this._drawHeaderCellValue
     *            The function takes the same parameters as _drawHeaderCellValue and should return a jQuery object
     *            that represents the cell's contents. The first element will be appended to the header cell's contents.
     *            If the function returns null or undefined nothing will be appended for that header cell.
     *        getColumnValue: function that returns the value for a cell contents, function, optional, default: this.getColumnValue;
     *            The return value of the function will be converted to a string an added as the cell contents.
     *    }
     *    "enabledEvents" is an optional property containing an object with properties for each of the enabled events.
     *    {
     *        GridO.EVENT_ROW_UPDATED: true
     *    }
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * Gets the number of selected items
     * @returns {number}
     * @publicapi
     */
    getSelectionCount(): number;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    initialize(): void;
    /**
     * Gets the row information for the item currently being dragged.
     *
     * @return
     */
    getDraggingRowInfo(): any;
    /**
     * Get the rows that currently have a draggable item "over" them
     */
    _getDragOverRows(): any;
    _getAcceptStatus(dataIndex: number): any;
    /**
     * Clear the cached row acceptance map
     */
    _resetRowAcceptStatus(): void;
    /**
     * See if the row has accepted and activate if it has.
     */
    _rowDropTryActivate(droppingRowInfo: any, e?: any, ui?: any): any;
    _rowIntersect(draggable: any, targetRowInfo: any): any;
    initializeDataSource(suppressRedraw?: boolean): void;
    /**
     * Sets the data source, expands states, columns and sort order of the grid
     *
     * @param source New source for the grid (See grid options for details)
     * @param expandStates Expand states for the new source. If source is not in hierarchical structure, specify null (See grid options for details)
     * @param columns New columns for the grid (See grid options for details)
     * @param sortOrder New sort order for the grid (See grid options for details)
     * @param selectedIndex Index of the rows to be selected after new data source is set
     * @param suppressRedraw If true, grid is not redrawn after data source is set
     * @publicapi
     */
    setDataSource(source?: any[], expandStates?: any[], columns?: IGridColumn[], sortOrder?: IGridSortOrder[], selectedIndex?: number, suppressRedraw?: boolean): void;
    _setColumnInfo(column: IGridColumn, index: number): void;
    /**
     * Gets the information about a row associated with the given data index
     *
     * Returns a rowInfo object containing rowIndex, dataIndex and a jQuery wrapper for the actual row
     *
     * @param dataIndex The data index for the record to retrieve
     * @returns {IGridRowInfo}
     * @publicapi
     */
    getRowInfo(dataIndex: number): IGridRowInfo;
    /**
     * Gets the data being used to display the row at the provided data index.
     *
     * @param dataIndex The data index for the record to retrieve.
     * @return {any}
     * @publicapi
     */
    getRowData(dataIndex: number): any;
    /**
     * Gets the columns currently being displayed in the grid
     * @returns {IGridColumn[]}
     * @publicapi
     */
    getColumns(): IGridColumn[];
    /**
     * Gets the current sort order being used in the grid
     * @returns {IGridSortOrder[]}
     * @publicapi
     */
    getSortOrder(): IGridSortOrder[];
    /**
     * Set new column info for the column associated with the specified column name
     *
     * @param columnName Name of the column to change the options
     * @param options New column options
     * @publicapi
     */
    setColumnOptions(columnName: string, options?: IGridColumn): void;
    _getDataIndex(visibleIndex: any): any;
    _getRowIndex(dataIndex: any): number;
    expandNode(dataIndex: any): void;
    collapseNode(dataIndex: any): void;
    expandAllNodes(): boolean;
    collapseAllNodes(): boolean;
    expandAll(): void;
    collapseAll(): void;
    /**
     * Expand or collapse node(s), and set selection focus at a given target index or at the current selected index as default behavior
     *
     * @param expand If true, expands the node, otherwise collapsed
     * @param applyToAllRows True to expand or collapse all nodes, false to expand or collapse the node at a given target index, or at the current selected index as default behavior
     * @param targetIndex The node index to be expanded or collapsed, and get selection focus
     * @returns {boolean}
     * @publicapi
     */
    tryToggle(expand: boolean, applyToAllRows: boolean, targetIndex?: number): boolean;
    _getVisibleRowIndices(): {
        first: number;
        last: number;
    };
    /**
     * @param rowIndex
     * @param force
     * @return
     */
    _getRowIntoView(rowIndex: number, force?: boolean): boolean;
    /**
     * @param force
     */
    getSelectedRowIntoView(force?: boolean): boolean;
    cacheRows(aboveRange: any, visibleRange: any, belowRange: any): void;
    _drawRowsInternal(visibleRange: any, includeNonDirtyRows: any): {
        rowsFragment: any;
        gutterFragment: any;
    };
    _drawRows(visibleRange: any, includeNonDirtyRows: any): void;
    /**
     * Updates the row identified by the given rowIndex.
     *
     * @param rowIndex Index of row to be updated
     * @param dataIndex DataIndex of row to be updated
     * @param columnsToUpdate HashSet of column indices. If given,
     * only columns in this set will be updated.
     */
    updateRow(rowIndex: number, dataIndex?: number, columnsToUpdate?: {
        [id: number]: boolean;
    }): void;
    _updateRow(rowInfo: any, rowIndex: any, dataIndex: any, expandedState: any, level: any, columnsToUpdate?: {
        [id: number]: boolean;
    }): void;
    /**
     * Updates the container element for the row identified by rowIndex
     *
     * @param rowIndex Index of row to be updated
     * @param keepContent If set, the content of the container element (i.e.,
     * any column data) will not be removed
     * @return Returns DOM row container element
     */
    _updateRowSize(rowIndex: number, row: any, keepContent?: boolean): any;
    /**
     * Default implementation for creating the contents of a given cell.
     *
     * Custom Drawn Columns:
     * If you want a custom drawn column, then the preferred method is to set a "getCellContents" property
     * on the column to a function that takes the same parameters as this function and returns a jQuery
     * object that represents the contents.
     *
     * @param rowInfo The information about grid row that is being rendered.
     * @param dataIndex The index of the row.
     * @param expandedState Number of children in the tree under this row recursively.
     * @param level The hierarchy level of the row.
     * @param column Information about the column that is being rendered.
     * @param indentIndex Index of the column that is used for the indentation.
     * @param columnOrder The display order of the column.
     * @return Returns jQuery element representing the requested grid cell. The first returned element will be appended
     * to the row (unless the function returns null or undefined).
     */
    _drawCell(rowInfo: any, dataIndex: number, expandedState: number, level: number, column: any, indentIndex: number, columnOrder: number): any;
    /**
     * Default implementation for creating the element that represents content of a header cell.
     *
     * Custom Drawn Column Header:
     * If you want a custom drawn column header, then the preferred method is to set a "getHeaderCellContents" property
     * on the column to a function that takes the same parameters as this function and returns a jQuery
     * object that represents the contents.
     *
     * @param column Information about the header column that is being rendered.
     * @return Returns jQuery element representing the requested header cell contents.
     */
    _drawHeaderCellValue(column: any): JQuery;
    _layoutHeader(): void;
    layout(): void;
    redraw(): void;
    /**
     * Gets the value for a column. The default use of the return value is to
     * convert it to a string and set it as the cell's text value.
     *
     * @param dataIndex The index for the row data in the data source
     * @param columnIndex The index of the column's data in the row's data array
     * @param columnOrder The index of the column in the grid's column array. This is the current visible order of the column
     * @return
     */
    getColumnValue(dataIndex: number, columnIndex: number | string, columnOrder?: number): any;
    getColumnText(dataIndex: any, column: any, columnOrder?: any): any;
    _getExpandState(dataIndex: any): number;
    /**
     * @param rowIndex
     * @param dataIndex
     * @param options
     */
    _selectRow(rowIndex: number, dataIndex?: number, options?: any): void;
    /**
     * @return
     */
    getSelectedRowIndex(): number;
    setSelectedRowIndex(selectedRowIndex: any): void;
    /**
     * @return
     */
    getSelectedDataIndex(): number;
    /**
     * @return The last data index of the grid
     */
    getLastRowDataIndex(): number;
    /**
     * @return
     */
    getSelectedDataIndices(): number[];
    /**
     * Ensures that an item (identified by a data index) has an associated row by
     * expanding any enclosing collapsed rows. Returns the rowIndex of the associated row.
     *
     * @param dataIndex The data index of the item to ensure is expanded
     * @return
     */
    ensureDataIndexExpanded(dataIndex: number): number;
    /**
     * Sets the selected item in the grid by the data index.
     * Optionally ensure that the item is not hidden by collapsed rows.
     *
     * @param dataIndex The data index of item to show
     * @param expandNodes If true, all containing collapsed nodes will be expanded
     */
    setSelectedDataIndex(dataIndex: number, expandNodes?: boolean): void;
    selectionChanged(selectedIndex: any, selectedCount: any, selectedRows: any): void;
    selectedIndexChanged(selectedRowIndex: any, selectedDataIndex: any): void;
    _updateRowSelectionStyle(rowInfo: any, selectedRows: any, focusIndex: any): void;
    /**
     * @param timeout
     */
    focus(timeout?: number): void;
    /**
     * Gets info about the row on which context menu is opened
     *
     * If no context menu is open, returns null
     *
     * @returns {IGridRowInfo}
     * @publicapi
     */
    getContextMenuRowInfo(): IGridRowInfo;
    /**
     * Creates the context menu options. This function is intended to be overriden by derived objects.
     *
     * @param rowInfo The information about the row with context
     * @param menuOptions The menu information. See _createContextPopupMenuControl
     * @return
     */
    _createContextMenu(rowInfo: any, menuOptions: any): Menus.PopupMenu;
    /**
     *     Creates the PopupMenu control that houses the context menu items for the Grid. Note: this is intentionally
     *     abstracted from _createContextMenu to allow directly calling it from deep derivations and avoiding inheritance
     *     base propagation.
     *
     * @param menuOptions
     *     The menu information:
     *     {
     *         contextInfo: { item, rowInfo}
     *         items: the list of menu items
     *     }
     *
     * @return
     */
    _createContextPopupMenuControl(menuOptions: any): Menus.PopupMenu;
    /**
     * @param e
     * @return
     */
    _onContainerResize(e?: JQueryEventObject): any;
    /**
     * @return
     */
    _onColumnResize(column: any): any;
    /**
     * @return
     */
    _onColumnMove(sourceIndex: any, targetIndex: any): any;
    /**
     * @param column
     * @param add
     */
    _sortBy(column?: any, add?: boolean): void;
    /**
     * @param sortOrder
     * @param sortColumns
     * @return
     */
    onSort(sortOrder: any, sortColumns?: any): any;
    /**
     * @param sortOrder
     * @param sortColumns
     * @return
     */
    _trySorting(sortOrder: any, sortColumns?: any): any;
    /**
     * @param e
     * @param selector
     */
    _getRowInfoFromEvent(e?: JQueryEventObject, selector?: string): any;
    /**
     * @param e
     * @return
     */
    _onRowMouseDown(e?: JQueryEventObject): any;
    /**
     * @return
     */
    onRowMouseDown(eventArgs: any): any;
    /**
     * @return
     */
    onRowClick(eventArgs: any): any;
    /**
     * @return
     */
    onRowDoubleClick(eventArgs: any): any;
    /**
     * @return
     */
    onGutterClick(eventArgs: any): any;
    /**
     * @return
     */
    onEnterKey(eventArgs: any): any;
    /**
     * @return
     */
    onDeleteKey(eventArgs: any): any;
    _onOpenRowDetail(e?: any, eventArgs?: any): boolean;
    /**
     * @return
     */
    onOpenRowDetail(eventArgs: any): any;
    /**
     * @return
     */
    onContextMenu(eventArgs: any): any;
    /**
     * @param e
     * @return
     */
    _onBlur(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    _onFocus(e?: JQueryEventObject): any;
    _onKeyPress(e?: JQueryKeyEventObject): any;
    /**
     * @param e
     * @return
     */
    _onKeyDown(e?: JQueryKeyEventObject): any;
    _onBackSpaceKey(e?: JQueryKeyEventObject): void;
    _onUpKey(e?: JQueryKeyEventObject, bounds?: any): void;
    _onDownKey(e?: JQueryKeyEventObject, bounds?: any): void;
    _onRightKey(e?: JQueryKeyEventObject): void;
    _onLeftKey(e?: JQueryKeyEventObject): void;
    _onPageUpPageDownKey(e?: JQueryKeyEventObject, bounds?: any): void;
    _getRowsPerPage(e?: BaseJQueryEventObject): number;
    _onHomeKey(e?: JQueryKeyEventObject, bounds?: any): void;
    _onEndKey(e?: JQueryKeyEventObject, bounds?: any): void;
    _onTabKey(e?: JQueryKeyEventObject): void;
    _onEscapeKey(e?: JQueryKeyEventObject): void;
    /**
     * @param e
     * @return
     */
    _onKeyUp(e?: JQueryKeyEventObject): any;
    /**
     * Enables raising the custom event with the provided event name.
     *
     * @param eventName Name of the event to enable.
     */
    enableEvent(eventName: string): void;
    /**
     * Disables raising the custom event with the provided event name.
     *
     * @param eventName Name of the event to disable.
     */
    disableEvent(eventName: string): void;
    /**
     * Gets the collection of expand states for the grid.
     */
    getExpandStates(): any;
    /**
     * Generates a table of the selected items in the grid.
     *
     * @param operationCompleteCallback A callback function invoked when the
     * current selection is available to the client for processing.
     * @param errorCallback
     */
    beginFormatTable(operationCompleteCallback: IResultCallback, errorCallback?: IErrorCallback, formatterType?: new (grid: GridO<TOptions>, options?: any) => Data.ITableFormatter, options?: any): void;
    _createElement(): void;
    _addSpacingElements(): void;
    _createFocusElement(): JQuery;
    private _buildDom();
    _shouldAttachContextMenuEvents(): boolean;
    _attachEvents(): void;
    _getDraggedRowsInfo(e?: JQueryEventObject): any;
    private _setupDragDrop();
    /**
     * Setup the provided draggable and droppable options
     */
    setupDragDrop(draggableOptions: any, droppableOptions: any): void;
    disableDragDrop(): void;
    enableDragDrop(): void;
    /**
     * Delegate out to the row accept handlers to determine if the dragging item will be accepted.
     */
    private _droppableAcceptHandler($element, draggingRowInfo);
    private _droppableDropHandler(e, ui);
    /**
     * Called when an item is being dragged that will be accepted by rows in this grid.
     */
    private _droppableActivateHandler(e, ui);
    /**
     * Called when an item stops being dragged that will be accepted by rows in this grid.
     */
    private _droppableDeactivateHandler(e, ui);
    /**
     * Called when a draggable item is over the grid.
     */
    private _droppableOverHandler(e, ui);
    /**
     * Called when a draggable item is no longer over the grid.
     */
    private _droppableOutHandler(e, ui);
    /**
     * Called when the mouse moves while the draggable item is over the grid.
     *
     * @param outOfGrid Indicates if this move event is being triggered as the mouse is leaving the grid.
     */
    private _droppableOverMoveHandler(e, ui);
    /**
     * Gets the draggable instance from the element which is being dragged.
     */
    private _getDraggable($draggedElement);
    /**
     * Clean up all state stored during drag/drop operations.
     */
    private _cleanupDragDropState();
    /**
     * Unregister the mouse move event which is setup during drag/drop operations.
     */
    private _unregisterDragMouseMove();
    /**
     * Clear the record of which rows the draggable objects are "over"
     */
    private _resetRowOverStatus();
    private _rowDropAccept(droppingRowInfo, $element);
    private _rowDropActivate(droppingRowInfo, e?, ui?);
    private _rowDropDeactivate(droppingRowInfo, e?, ui?);
    private _rowDropOver(droppingRowInfo, e?, ui?);
    private _rowDropOut(droppingRowInfo, e?, ui?);
    private _rowDrop(droppingRowInfo, draggingRowInfo, e?, ui?);
    private _rowDragCreateHelper(draggingRowInfo, e?, ui?);
    /**
     * Invokes the provided handler
     */
    private _invokeDragHandler(e, ui, handlerCallback);
    private _takeMeasurements();
    /**
     *     Ensures that the selected index is correctly set. That is, it will be a noop if the index doesnt change
     *     and will handle indexes that are out of bounds.
     *
     * @param index OPTIONAL: The index to select
     */
    private _ensureSelectedIndex(index?);
    _determineIndentIndex(): void;
    private _updateRanges();
    private _updateExpansionStateAndRedraw(action);
    /**
     * @param includeNonDirtyRows
     */
    _updateViewport(includeNonDirtyRows?: boolean): void;
    _cleanUpRows(): void;
    private _getGutterIconClass(rowIndex, dataIndex, expandedState, level);
    private _drawGutterCell(rowInfo, rowIndex, dataIndex, expandedState, level);
    _drawHeader(): void;
    private _fixColumnsWidth(width);
    _layoutContentSpacer(): void;
    _fixScrollPos(): void;
    /**
     * @param includeNonDirtyRows
     */
    _redraw(includeNonDirtyRows?: boolean): void;
    selectAll(): void;
    _clearSelection(): void;
    /**
     * Highlights the row at the specified rowIndex
     *
     * @param rowIndex Index of the row in the visible source (taking the expand/collapse states into account)
     * @param dataIndex Index of the row in the overall source
     * @param options Specifies options such as:
     *     - keepSelectionStart: Keepd the rowIndex as the basis for range selection
     *     - doNotFireEvent: Prevents firing events
     *     - toggle: Toggles the row in the selection
     */
    _addSelection(rowIndex: number, dataIndex?: number, options?: any): void;
    /**
     * Highlights the rows beginning from the selection start until the row at the specified rowIndex
     *
     * @param rowIndex Index of the row in the visible source (taking the expand/collapse states into account)
     * @param dataIndex Index of the row in the overall source
     */
    private _addSelectionRange(rowIndex, dataIndex?, options?);
    /**
     * This is especially necessary for screen readers to read each
     * row when the selection changes.
     */
    private _updateAriaAttribute();
    private _updateSelectionStyles();
    private _selectionChanged();
    private _selectedIndexChanged(selectedRowIndex, selectedDataIndex);
    _showContextMenu(eventArgs: any): void;
    getPinAndFocusElementForContextMenu(eventArgs: any): {
        pinElement: JQuery;
        focusElement: JQuery;
    };
    /**
     * @param e
     * @return
     */
    _onContainerMouseDown(e?: JQueryEventObject): any;
    _measureCanvasSize(): void;
    private _setupDragEvents();
    private _clearDragEvents();
    /**
     * @param e
     * @return
     */
    private _onDocumentMouseMove(e?);
    /**
     * @param e
     * @return
     */
    private _onDocumentMouseUp(e?);
    /**
     * @param e
     * @return
     */
    private _onHeaderMouseDown(e?);
    /**
     * @param e
     * @return
     */
    private _onHeaderMouseUp(e?);
    /**
     * @param e
     * @return
     */
    _onHeaderClick(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    _onHeaderDblClick(e?: JQueryEventObject): any;
    private _moveSizingElement(columnIndex);
    /**
     *     Given a column index will provide the visible index of this column. That is, it will take in to consideration any
     *     hidden columns and omit them from the index count.
     *
     * @param columnIndex The 0-based global column index
     * @return The 0-based visible column index
     */
    private _getVisibleColumnIndex(columnIndex);
    /**
     * @param columnIndex
     * @param initialWidth
     * @param finish
     */
    _applyColumnSizing(columnIndex: number, initialWidth?: number, finish?: boolean): void;
    _tryFinishColumnSizing(cancel: any): void;
    /**
     * @param columnIndex
     * @param left
     */
    private _moveColumnMovingElement(columnIndex, left?);
    private _applyColumnMoving(sourceIndex, targetIndex);
    private _tryFinishColumnMoving(cancel);
    _getSortColumns(sortOrder: any): any[];
    /**
     * @param sortOrder
     * @param sortColumns
     * @return
     */
    private _onSort(sortOrder, sortColumns?);
    /**
     * @param e
     * @return
     */
    _onSelectStart(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    _onCanvasScroll(e?: JQueryEventObject): any;
    /**
     * @param e
     * @param handler
     * @param eventName
     * @param args
     */
    private _handleEvent(e?, handler?, eventName?, args?);
    /**
     * @param e
     * @return
     */
    _onRowClick(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    _onRowDoubleClick(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    private _onGutterClick(e?);
    /**
     * @param e
     * @return
     */
    _onEnterKey(e?: JQueryKeyEventObject, bounds?: any): any;
    /**
     * @param e
     * @return
     */
    _onDeleteKey(e?: JQueryKeyEventObject): any;
    /**
     * @param e
     * @return
     */
    private _onContextMenu(e?, args?);
    /**
     * @return
     */
    private _onToggle(rowInfo);
    private _isAncestorFolderToggled(rowInfo);
    ancestorFolderToggled(rowInfo: any): void;
    nonAncestorFolderToggled(rowInfo: any, currSelectedDataIndex: any): void;
    afterOnToggle(rowInfo: any): void;
    private _folderToggled(rowInfo);
    private _raiseToggleEvent(rowInfo, isExpanded);
    copySelectedItems(formatterType?: new (grid: GridO<TOptions>, options?: any) => Data.ITableFormatter, copyAsHtml?: boolean, options?: any): void;
    _ensureRowDrawn(dataIndex: any): boolean;
    /**
     * Ensures that all data objects in the selection have been downloaded and are available to process.
     *
     * @param itemsAvailableCallback
     * @param errorCallback
     */
    _beginEnsureSelectionIsAvailable(itemsAvailableCallback?: IResultCallback, errorCallback?: IErrorCallback): void;
    /**
     * Copies the selection into the clipboard.
     *
     * @param operationCompleteCallback
     * @param errorCallback
     */
    private _beginCopySelection(operationCompleteCallback?, errorCallback?, formatterType?, copyAsHtml?, options?);
    _dispose(): void;
}
export declare class Grid extends GridO<IGridOptions> {
}
export interface ICheckboxSelectionGridOptions extends IGridOptions {
    selectAllLabel: string;
    labelColumnIndex: number;
}
export declare class CheckboxSelectionGridO<TOptions extends ICheckboxSelectionGridOptions> extends GridO<TOptions> {
    static enhancementTypeName: string;
    static _DEFAULT_LABEL_COLUMN: number;
    static _HEADER_CHECKBOX_ID: string;
    private _labelColumnIndex;
    private _selectAllLabel;
    dataProvider: any;
    gridAdapter: any;
    /**
     * Creates new Checkbox Selection Grid Control
     *
     * @param options The initialization options for the grid which have the following properties
     *
     *    "columns" is a required property containing the array of grid column descriptors that have the following structure:
     *    {
     *        text:      column header text, string, optional, default: "",
     *        width:     width in pixels of the column, number, optional, default: 100,
     *        canSortBy: true if the grid can be sorted by the column, boolean, optional, default: true
     *    }
     *    "selectAllLabel" is the text used as a label for select all check box
     *    "labelColumnIndex" is the index of the column whose values to be used as labels for check boxes
     *    "sort" is an optional comparison function that will be used to sort the data.
     *         function (left, right) returns [0, 0, 0] depending on whether left is smaller, equal or larger than right.
     *
     *
     * @return Returns the new Checkbox Selection Grid object.
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * Populates the grid control with the given items
     *
     * @param gridItems This is an array of root nodes that recursively define the tree of the grid.
     *
     *    Every node of the tree has the following format:
     *    {
     *         id:       unique node id, number, required
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
     * @param checkedItemIds
     *     This is an array of tree item ids that must be initially checked in the grid.
     *     If this parameter is not provided nothing is checked.
     *
     */
    setGridItems(gridItems: any[], checkedItemIds: any[]): void;
    /**
     * Allows accessing the list of grid items that are currently checked.
     *
     * @return Returns array of checked item ids.
     */
    getCheckedItemIds(): any[];
    /**
     * OVERRIDE: Creates the element that represents content of a header cell.
     *
     * @param column Information about the header column that is being rendered.
     * @return Returns jQuery element representing the requested header cell.
     */
    _drawHeaderCellValue(column: any): JQuery;
    /**
     * Sets row checkbox into the given state.
     *
     * @param dataIndex The row index.
     * @param newState New state for the row's checkbox.
     */
    setCheckboxState(dataIndex: number, newState: boolean): void;
    /**
     * Updates checkbox related data for grid row with the new state (without touching the actual checkbox element).
     *
     * @param dataIndex The row index.
     * @param state New state for the row's checkbox.
     */
    _setCheckboxStateData(dataIndex: number, state: boolean): void;
    /**
     * Prepares options for the base grid control.
     *
     * @param options Original options passed into the control.
     * See CheckboxSelectionGrid function for details about options format.
     */
    private _updateOptions(options?);
    /**
     * OVERRIDE: Set the column that follows the checkbox one as the indent one.
     */
    _determineIndentIndex(): void;
    /**
     * Create a hidden Label to describe a control for screen readers
     *
     * @param controlId id of the control the label is attached to
     * @param text label text
     * @return
     */
    private _createLabel(controlId, text);
    /**
     * OVERRIDE: Creates the element that represents content of a content cell.
     */
    _drawCell(rowInfo: any, dataIndex: any, expandedState: any, level: any, column: any, indentIndex: any, columnOrder: any): any;
    /**
     * The handler is invoked when the header is checkbox is clicked.
     *
     * @param e
     * @return
     */
    private _onHeaderCheckboxClicked(e?);
    /**
     * The handler is invoked when a checkbox on a grid row is clicked.
     *
     * @param e
     * @return
     */
    private _onCheckboxClicked(e?);
    /**
     * Calculated the checkbox element ID used to locate individual checkboxes on the grid.
     *
     * @param dataIndex The row index of the grid cell.
     * @param columnIndex The column index of the grid cell.
     * @return Returns string representing a checkbox element ID.
     */
    private _createCheckboxId(dataIndex, columnIndex);
    /**
     * Sets header checkbox into the given state.
     *
     * @param checked The state to set for the header checkbox.
     */
    private _setHeaderCheckboxState(checked);
    /**
     * OVERRIDE: Calls the base method and checks for space bar key.
     *
     * @param e
     * @return
     */
    _onKeyDown(e?: JQueryEventObject): any;
    /**
     * Trigger the selection of the selected row.
     *
     * @param e
     * @return
     */
    private _onSpaceKey(e?);
}
export declare class CheckboxSelectionGrid extends CheckboxSelectionGridO<ICheckboxSelectionGridOptions> {
}
export declare class ListView extends Grid {
    static enhancementTypeName: string;
    constructor(options?: any);
}
export declare class GridSearchAdapter extends Search.SearchAdapter {
    private _grid;
    private _gridData;
    private _results;
    private _searchableColumns;
    constructor();
    /**
     *     Attaches the Grid to the filter provider to allow for retrieval of paged data.
     *     The grid is loaded asynchronously, so can't be attached on page load when initialized.
     *
     * @param grid The grid to get data from
     */
    attachGrid(grid: Grid): void;
    /**
     * Adds additional items to the search strategy
     *
     * @param addItemsCallback The function which adds items to the search strategy.
     * @param searchCallback The function which searches the newly updated strategy.
     */
    addMoreItems(addItemsCallback: Function, searchCallback: () => any): void;
    /**
     * Creates SearchableObjects for all available work items
     *
     * @return An array of SearchableObjects.
     */
    createSearchableObjects(): any[];
    /**
     *     Creates the SearchableObject for a row in the grid.
     *
     * @param dataIndex The data index for the item in the grid.
     * @return The SearchableObject representing the row in the grid.
     */
    private _createSearchableObject(dataIndex);
    /**
     *     Handles the results in the UI by filtering through all available items to the ones
     *     provided in the results array.
     *
     * @param results An array of items
     * @param finished Represents whether or not the search is finished
     */
    handleResults(results: any[], finished: boolean): void;
    /**
     *     Handles an error being thrown in the search process.
     *
     * @param message Specific error message if provided.
     */
    handleError(message: string): void;
    /**
     *     Handles the search results being cleared and the view resetting to normal.
     */
    handleClear(): void;
    /**
     *     Returns whether or not there is more data to be loaded.
     *
     * @return True if no more data needs to be loaded, false otherwise
     */
    isDataSetComplete(): boolean;
    /**
     *     Build the list of searchable columns.
     */
    private getSearchableColumns();
}
