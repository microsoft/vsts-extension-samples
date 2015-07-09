/// <reference path='ref/VSS/VSS.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "VSS/Utils/Core", "VSS/Controls/Grids"], function (require, exports, Utils_Core, Grids) {
    var delegate = Utils_Core.delegate;
    /**
     * Represents a grid of note objects.
     * Displays notes, as well as handles context menu for editing and deleting.
     */
    var NotesGrid = (function (_super) {
        __extends(NotesGrid, _super);
        function NotesGrid() {
            _super.apply(this, arguments);
        }
        /**
         *
         * @param options
         */
        NotesGrid.prototype.initializeOptions = function (options) {
            _super.prototype.initializeOptions.call(this, $.extend({
                sharedMeasurements: false,
                allowMoveColumns: false,
                allowMultiSelect: true,
                gutter: {
                    contextMenu: true
                },
                contextMenu: {
                    items: delegate(this, this._getContextMenuItems),
                    updateCommandStates: delegate(this, this._updateCommandStates),
                    executeAction: delegate(this, this._onMenuItemClick)
                },
                cssClass: "notes-grid",
                columns: this._getColumns(),
                sortOrder: this._getSortOrder(),
                initialSelection: false
            }, options));
        };
        /**
         * Populates the grid with a collection of note objects.
         * Also attempts to maintain note selection.
         * @param rawSource The collection of notes to populate in the grid.
         */
        NotesGrid.prototype.setSource = function (rawSource) {
            var options = this._options;
            var prevSelection = this.getSelectedNote();
            options.source = rawSource;
            options.columns = this._columns;
            options.sortOrder = this._sortOrder;
            this.initializeDataSource();
            this.onSort(options.sortOrder);
            if (rawSource && rawSource.length > 0) {
                var indexToSelect = 0;
                if (prevSelection) {
                    for (var i = 0, l = rawSource.length; i < l; i++) {
                        if (rawSource[i] && prevSelection.noteId === rawSource[i].noteId) {
                            indexToSelect = this._getRowIndex(i);
                            break;
                        }
                    }
                }
                this._selectRow(indexToSelect);
            }
        };
        /**
         * Row double-click handler
         * @param eventArgs
         */
        NotesGrid.prototype.onRowDoubleClick = function (eventArgs) {
            var note = this.getSelectedNote();
            if (note) {
                this._fire(NotesGrid.Events.NOTE_DOUBLE_CLICK, note);
            }
        };
        /**
         * Returns a list of selected notes in the grid
         */
        NotesGrid.prototype.getSelectedNotes = function () {
            var selectedItems = [];
            for (var rowIndex in this._selectedRows) {
                if (this._selectedRows.hasOwnProperty(rowIndex)) {
                    selectedItems.push(this._dataSource[this._selectedRows[rowIndex]]);
                }
            }
            return selectedItems;
        };
        /**
         * Returns a single, selected note in the grid
         */
        NotesGrid.prototype.getSelectedNote = function () {
            var selectedDataIndex = this._selectedRows[this._selectedIndex];
            return (typeof (selectedDataIndex) === "number") ? this._dataSource[selectedDataIndex] : null;
        };
        /**
         * Updates the selected row index and fires an event
         * indicating the selected note has changed.
         */
        NotesGrid.prototype.selectedIndexChanged = function (selectedRowIndex, selectedDataIndex) {
            _super.prototype.selectedIndexChanged.call(this, selectedRowIndex, selectedDataIndex);
            this._fire(NotesGrid.Events.SELECTED_NOTE_CHANGED, this._dataSource[selectedDataIndex]);
        };
        NotesGrid.prototype._getContextMenuItems = function () {
            var that = this;
            function getActionArgs() {
                return {
                    selectedNote: that.getSelectedNotes(),
                    selectedNotes: that.getSelectedNote()
                };
            }
            var commands = [];
            commands.push({ rank: 5, id: NotesGrid.MenuCommands.EDIT_NOTE, text: "Edit Note", icon: "icon-edit", 'arguments': getActionArgs });
            commands.push({ rank: 10, id: NotesGrid.MenuCommands.DELETE_SELECTED_NOTE, text: "Delete Note", icon: "icon-delete", 'arguments': getActionArgs });
            return commands;
        };
        NotesGrid.prototype._updateCommandStates = function (menu) {
            var items = this.getSelectedNotes();
            var exactlyOneItem = items && items.length == 1;
            var states = [];
            states.push({ id: NotesGrid.MenuCommands.EDIT_NOTE, disabled: !exactlyOneItem });
            states.push({ id: NotesGrid.MenuCommands.DELETE_SELECTED_NOTE, disabled: !items || items.length < 1 });
            menu.updateCommandStates(states);
        };
        NotesGrid.prototype._onMenuItemClick = function (e) {
            this._fire(NotesGrid.Events.NOTE_MENU_ITEM_CLICKED, e);
        };
        NotesGrid.prototype._getColumns = function () {
            var columns = [];
            columns.push({
                index: "noteId",
                text: "Note Id",
                width: 150,
                getColumnValue: function (dataIndex, columnIndex, columnOrder) {
                    var note = this._dataSource[dataIndex];
                    return note.noteId;
                },
                comparer: function (column, order, item1, item2) {
                    return item1.noteId - item2.noteId;
                }
            });
            columns.push({
                index: "title",
                text: "Title",
                width: 150,
                getColumnValue: function (dataIndex, columnIndex, columnOrder) {
                    var note = this._dataSource[dataIndex];
                    return note.title;
                }
            });
            columns.push({
                index: "userOnly",
                text: "User Only",
                width: 150,
                getColumnValue: function (dataIndex, columnIndex, columnOrder) {
                    var note = this._dataSource[dataIndex];
                    return note.userOnly;
                }
            });
            return columns;
        };
        NotesGrid.prototype._getSortOrder = function () {
            var sortColumns = [];
            sortColumns.push({ index: "noteId", order: "asc" });
            return sortColumns;
        };
        NotesGrid.Events = {
            NOTE_DOUBLE_CLICK: "noteDoubleClick",
            SELECTED_NOTE_CHANGED: "selectedNoteChanged",
            NOTE_MENU_ITEM_CLICKED: "noteMenuItemClicked"
        };
        NotesGrid.MenuCommands = {
            EDIT_NOTE: "edit-note",
            DELETE_SELECTED_NOTE: "delete-selected-note"
        };
        return NotesGrid;
    })(Grids.GridO);
    exports.NotesGrid = NotesGrid;
});
