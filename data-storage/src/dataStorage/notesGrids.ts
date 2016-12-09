import Utils_Core = require("VSS/Utils/Core");
import Grids = require("VSS/Controls/Grids");
import Notes_Contracts = require("./notesContracts");


var delegate = Utils_Core.delegate;

/**
 * Represents a grid of note objects.
 * Displays notes, as well as handles context menu for editing and deleting.
 */
export class NotesGrid extends Grids.GridO<any> {

    public static Events = {
        NOTE_DOUBLE_CLICK: "noteDoubleClick",
        SELECTED_NOTE_CHANGED: "selectedNoteChanged",
        NOTE_MENU_ITEM_CLICKED: "noteMenuItemClicked",
    }

    private static MenuCommands = {
        EDIT_NOTE: "edit-note",
        DELETE_SELECTED_NOTE: "delete-selected-note",
    }

    /**
     *
     * @param options 
     */
    public initializeOptions(options?: any) {

        super.initializeOptions($.extend({
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
    }

    /**
     * Populates the grid with a collection of note objects.
     * Also attempts to maintain note selection.
     * @param rawSource The collection of notes to populate in the grid.
     */
    public setSource(rawSource: Notes_Contracts.Note[]) {
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
                    if (rawSource[i] && prevSelection.id === rawSource[i].id) {
                        indexToSelect = this._getRowIndex(i);
                        break;
                    }
                }
            }
            this._selectRow(indexToSelect);
        }
    }

    /**
     * Row double-click handler
     * @param eventArgs
     */
    public onRowDoubleClick(eventArgs): any {
        var note = this.getSelectedNote();
        if (note) {
            this._fire(NotesGrid.Events.NOTE_DOUBLE_CLICK, note);
        }
    }

    /**
     * Returns a list of selected notes in the grid
     */
    public getSelectedNotes() {
        var selectedItems = [];

        for (var rowIndex in this._selectedRows) {
            if (this._selectedRows.hasOwnProperty(rowIndex)) {
                selectedItems.push(this._dataSource[this._selectedRows[rowIndex]]);
            }
        }

        return selectedItems;
    }

    /**
     * Returns a single, selected note in the grid
     */
    public getSelectedNote(): Notes_Contracts.Note {
        var selectedDataIndex = this._selectedRows[this._selectedIndex];
        return (typeof (selectedDataIndex) === "number") ? this._dataSource[selectedDataIndex] : null;
    }

    /**
     * Updates the selected row index and fires an event
     * indicating the selected note has changed.
     */
    public selectedIndexChanged(selectedRowIndex, selectedDataIndex) {
        super.selectedIndexChanged(selectedRowIndex, selectedDataIndex);
        this._fire(NotesGrid.Events.SELECTED_NOTE_CHANGED, this._dataSource[selectedDataIndex]);
    }

    private _getContextMenuItems() {
        var that = this;

        function getActionArgs() {
            return {
                selectedNote: that.getSelectedNotes(),
                selectedNotes: that.getSelectedNote()
            };
        }

        var commands = [];

        commands.push({ rank: 5, id: NotesGrid.MenuCommands.EDIT_NOTE, text: "Edit note", icon: "icon-edit", 'arguments': getActionArgs });
        commands.push({ rank: 10, id: NotesGrid.MenuCommands.DELETE_SELECTED_NOTE, text: "Delete note", icon: "icon-delete", 'arguments': getActionArgs });

        return commands;
    }

    private _updateCommandStates(menu) {

        var items = this.getSelectedNotes();
        var exactlyOneItem = items && items.length == 1;

        var states = [];
        states.push({ id: NotesGrid.MenuCommands.EDIT_NOTE, disabled: !exactlyOneItem });
        states.push({ id: NotesGrid.MenuCommands.DELETE_SELECTED_NOTE, disabled: !items || items.length < 1 });

        menu.updateCommandStates(states);
    }

    private _onMenuItemClick(e?) {
        this._fire(NotesGrid.Events.NOTE_MENU_ITEM_CLICKED, e);
    }    

    private _getColumns() {
        var columns = [];

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
    }

    private _getSortOrder() {
        var sortColumns = [];
        sortColumns.push({ index: "userOnly", order: "asc" });
        return sortColumns;
    }
}
