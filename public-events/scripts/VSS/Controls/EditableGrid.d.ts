/// <reference path="../References/VSS-Common.d.ts" />
import CommonControls = require("VSS/Controls/Common");
import Controls = require("VSS/Controls");
import Grids = require("VSS/Controls/Grids");
export declare class CellEditor extends Controls.BaseControl {
    constructor(options: any);
    initialize(): void;
    getValue(): string;
    getDisplayValue(): string;
    setValue(value: string, doNotSavePrevious?: boolean): void;
    clearValue(setEmpty?: boolean): void;
    setSize($cellContext: JQuery): void;
    dispose(): void;
    setPosition(top: number, left: number): void;
    getHeight(): number;
    focus(): void;
    fireEndEdit(e?: JQueryEventObject): void;
    beginEdit(initValue: string): void;
    _attachEvents(): void;
    _detachEvents(): void;
    _fireChangedIfNeeded(): void;
    _handleKeydown(e: JQueryEventObject): boolean;
    _insertNewLineAtCursor(): void;
    _setCaretPositionToEnd($element: JQuery): void;
    _decorateElement(): void;
    _resetPosition(): void;
    valueChanged: () => void;
    endEdit: (e?: JQueryEventObject) => void;
    _prevValue: string;
    private _inEditMode;
    private _initValue;
}
export declare class TextCellEditor extends CellEditor {
    initialize(): void;
    setPosition(top: number, left: number): void;
    getHeight(): number;
    focus(): void;
    _attachEvents(): void;
    _detachEvents(): void;
    _handleKeydown(e: JQueryEventObject): boolean;
    _resetPosition(): void;
    _editableArea: JQuery;
}
export declare class RichTextCellEditor extends TextCellEditor {
    getValue(): string;
    private _getLastHtmlTag($searchElem?);
    private _hasNonbreakingSpaceAtEnd($element);
    setValue(htmlString: string, doNotSavePrevious?: boolean): void;
    clearValue(setEmpty?: boolean): void;
    setSize($cellContext: JQuery): void;
    _insertNewLineAtCursor(): void;
    _attachEvents(): void;
    _detachEvents(): void;
    _createElement(): void;
    _decorateElement(): void;
    _handleKeydown(e: JQueryEventObject): boolean;
    _setCaretPositionToEnd($element: JQuery): void;
}
export declare class PlainTextCellEditor extends TextCellEditor {
    constructor(options: any);
    getValue(): string;
    setValue(value: string, doNotSavePrevious?: boolean): void;
    clearValue(setEmpty?: boolean): void;
    setSize($cellContext: JQuery): void;
    _createElement(): void;
    _attachEvents(): void;
    _detachEvents(): void;
    _setCaretPositionToEnd($element: JQuery): void;
}
export declare class ComboCellEditor extends CellEditor {
    private _comboControl;
    initialize(): void;
    _populateUINodes(node: any, uiNode: any): any;
    _updateEditControl(values: string[], controlType: string): void;
    getComboControl(): CommonControls.Combo;
    createIn(container: any): void;
    _attachEvents(): void;
    _detachEvents(): void;
    setSize($cellContext: JQuery): void;
    setPosition(top: number, left: number): void;
    getHeight(): number;
    focus(): void;
    _resetPosition(): void;
    getValue(): string;
    setValue(value: string, doNotSavePrevious?: boolean): void;
    clearValue(setEmpty?: boolean): void;
    _createElement(): void;
}
export declare class CellInfo {
    constructor(rowInfo: any, dataIndex: number, columnInfo: any, columnOrder: number);
    rowInfo: any;
    columnInfo: any;
    dataIndex: number;
    columnOrder: number;
}
export declare class RowHeightInfo {
    constructor(height: number);
    height: number;
    isInvalid: boolean;
}
export declare class EditableGrid extends Grids.GridO<any> {
    static Commands: {
        CMD_APPEND: string;
        CMD_CUT: string;
        CMD_COPY: string;
        CMD_PASTE: string;
        CMD_INSERT_ROW: string;
        CMD_DELETE_ROWS: string;
        CMD_CLEAR_ROWS: string;
        CMD_INSERT_COLUMNS: string;
        CMD_DELETE_COLUMNS: string;
        CMD_RENAME_COLUMN: string;
    };
    constructor(options?: any);
    initialize(): void;
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    getPinAndFocusElementForContextMenu(eventArgs: any): {
        pinElement: JQuery;
        focusElement: JQuery;
    };
    _getClickedColumnIndex(e?: JQueryEventObject): number;
    _shouldAttachContextMenuEvents(): boolean;
    onContextMenu(eventArgs: any): any;
    /**
     * gets context menu items list
     *
     * @return new list of context menu items
     */
    _getContextMenuItems(): any;
    _updateContextMenuCommandStates(menu: any): void;
    _onContextMenuItemClick(e?: any): void;
    _onInsertRow(selectedDataIndices: number[], selectedRowIndices: number[]): void;
    _onDeleteRows(selectedDataIndices: number[], selectedRowIndices: number[]): void;
    _onClearRows(selectedDataIndices: number[], selectedRowIndices: number[]): void;
    getSelectedRowIndices(): number[];
    _drawCell(rowInfo: any, dataIndex: number, expandedState: number, level: number, column: any, indentIndex: number, columnOrder: number): any;
    onHyperLinkClick(dataIndex: number, columnIndex: string): void;
    onBeginCellEdit(dataIndex: number, columnIndex: string): void;
    onEndCellEdit(dataIndex: number, columnIndex: string, newValue: string, ignoreValueChange?: boolean): void;
    canEditCell(dataIndex: number, columnIndex: string): boolean;
    onCellChanged(dataIndex: number, columnIndex: string, newValue: string): void;
    _appendRow(): void;
    _applyColumnSizing(columnIndex: number, initialWidth?: number, finish?: boolean): void;
    _invalidateRowHeights(): void;
    ensureRowSelectionWhenLayoutComplete(command: any, indicesToSelect?: number[]): void;
    private _focusGrid();
    whenLayoutComplete(command: any, indicesToSelect?: number[]): void;
    private _setSelection(indicesToSelect);
    private _validateIndicesToSelect(indicesToSelect);
    onLayoutComplete(command: any, indicesToSelect?: number[]): void;
    _getRowHeightInfo(dataIndex: number): RowHeightInfo;
    _setRowHeight(dataIndex: number, height: number): void;
    private _setCellValue($cell, value, isRichText, title?);
    _setColumnInfo(column: any, index: number): void;
    getCellEditorForColumn(index: any): CellEditor;
    getCurrentEditRowIndex(): number;
    layout(): void;
    private _layoutInternal();
    _getSelectedCellInfo(): CellInfo;
    _onContainerMouseDown(e?: any): void;
    private _setCellEditor($currentCell, clearExisting);
    _handleEditorEndEdit(e?: JQueryEventObject, $currentCell?: JQuery): void;
    private _handleEndEdit($currentCell, ignoreValueChange?);
    private _allowCellResize($row);
    private _resizeCellsInRowToHeight($row, dataIndex);
    _onKeyDown(e?: JQueryEventObject): any;
    _createFocusElement(): JQuery;
    private _selectCellForSelectedRowIndex(delayEdit?);
    private _getCellForRow($row, columnIndex);
    _onUpKey(e?: JQueryEventObject, bounds?: any): void;
    _onDownKey(e?: JQueryEventObject, bounds?: any): void;
    _onRightKey(e?: JQueryEventObject): void;
    _onLeftKey(e?: JQueryEventObject): void;
    _selectNextOrPrevCell(next: boolean, doNotGetCellIntoView?: boolean): boolean;
    _getRowsPerPage(e?: JQueryEventObject): number;
    _onPageUpPageDownKey(e?: JQueryEventObject, bounds?: any): void;
    _onHomeKey(e?: JQueryEventObject, bounds?: any): void;
    _onEndKey(e?: JQueryEventObject, bounds?: any): void;
    _handleCellSelectionAfterViewPortUpdate(): void;
    handleHeaderSelectionAfterViewPortUpdate(): void;
    _onEnterKey(e?: JQueryEventObject, bounds?: any): any;
    _isHyperLinkCell(cellInfo: CellInfo): boolean;
    _onBackSpaceKey(e?: JQueryEventObject): void;
    _onDeleteKey(e?: JQueryEventObject): any;
    _onTabKey(e?: JQueryEventObject): void;
    cacheRows(aboveRange: any, visibleRange: any, belowRange: any): void;
    _drawRows(visibleRange: any, includeNonDirtyRows: any): void;
    setHeightForLowerContentSpacer(height: number): void;
    setHeightForUpperContentSpacer(height: number): void;
    _includeNewlyInsertedRowsInViewport(affectedIndices: number[]): void;
    _adjustContentSpacerHeightsPostDelete(): void;
    private _calculateHeightForUpperContentSpacer(firstVisibleIndex, firstVisibleIndexTop);
    private _calculateHeightForLowerContentSpacer(lastVisibleIndex, lastVisibleIndexTop, totalHeight);
    _getOuterRowHeight(index: number): number;
    _addSpacingElements(): void;
    getSelectedCellIntoView(): boolean;
    _getVisibleRowIndices(): {
        first: number;
        last: number;
    };
    _getVisibleRowIndicesAndDoCalculations(): {
        first: number;
        last: number;
    };
    _layoutContentSpacer(): void;
    _onCanvasScroll(e?: any): boolean;
    private _onScroll(e?);
    _onLastRowVisible(rowIndex: number): void;
    private _isScrolledIntoView($elem);
    _tryFinishColumnSizing(cancel: any): void;
    _onContainerResize(e?: JQueryEventObject): any;
    _selectRowAndCell($cell: JQuery, doNotGetCellIntoView?: boolean): void;
    getSelectedCell(): JQuery;
    selectSameRowNthCell(n: number, doNotGetCellIntoView?: boolean): boolean;
    _selectNextRowNthCell(n: number, doNotGetCellIntoView?: boolean): boolean;
    _selectPrevRowLastCell(doNotGetCellIntoView?: boolean): boolean;
    _selectNextRowFirstCell(doNotGetCellIntoView?: boolean): boolean;
    private _areEqual($cell1, $cell2);
    _onKeyPress(e?: JQueryEventObject): any;
    private _isChar(e?);
    _onRowDoubleClick(e?: JQueryEventObject): any;
    _cleanUpGrid(): void;
    private _deleteEditors();
    _editCell($cell: JQuery, delayEdit: boolean, clearExisting: boolean, charCode?: number): void;
    private _editCellInternal($cell, cellInfo, clearExisting, charCode?);
    _canEdit(cellInfo: CellInfo): boolean;
    _onRowMouseDown(e?: JQueryEventObject): any;
    _onRowClick(e?: JQueryEventObject): any;
    private _getRowFromCell($cell);
    private _getRowFromEvent(e?, selector?);
    private _areCellInfoEqual(cellInfo1, cellInfo2);
    onCellSelectionChanged($cell?: JQuery, delayEdit?: boolean): void;
    private _selectCell($cell, doNotBringRowToView?, doNotFireEndEdit?, doNotBringCellIntoView?, delayEdit?, preventEdit?);
    private _getCellFromEvent(e?, selector?);
    private _getCellInfoFromEvent(e?, selector?);
    _updateViewport(includeNonDirtyRows?: boolean): void;
    postUpdateViewPort(): void;
    _ensureRowDrawn(dataIndex: any): boolean;
    /**
     * @param rowIndex
     * @param force
     * @return
     */
    _getRowIntoView(rowIndex: number, force?: boolean): boolean;
    private _getRowHeightBetweenRows(startIndex, endIndex);
    private _scrollCanvasUp(startIndex, endIndex);
    private _scrollCanvasDown(startIndex, endIndex);
    updateRows(indices?: number[]): void;
    _updateRow(rowInfo: any, rowIndex: number, dataIndex: number, expandedState: any, level: number, columnsToUpdate?: {
        [id: number]: boolean;
    }, forceUpdateHeight?: boolean): void;
    _updateRowStyle(rowInfo: any): void;
    private _isCellEmpty($cell);
    private _getEmptyRowOuterHeight(dataIndex, $row);
    _updateRowAndCellHeights(dataIndex: number, $row: JQuery, forceUpdate?: boolean): void;
    _clearSelections(): void;
    _fireEndEdit(): void;
    _rowHeightsDifferencePostDelete: number;
    _emptyRowOuterHeight: number;
    _gettingRowIntoView: boolean;
    _inEditMode: boolean;
    _lastVisibleRange: any;
    private _currentCellEditor;
    private _editRowIndex;
    private _heightForUpperContentSpacer;
    private _heightForLowerContentSpacer;
    private _rowMaxHeight;
    private _$selectedCell;
    private _selectedCellInfo;
    private _columnIndexToEditorMap;
    private _columnResizeInProgress;
    private _gridRowHolder;
    private _belowContentSpacer;
    private _isLayoutInProgress;
    private _borderHeight;
    private _selectCellOnLayoutComplete;
}
