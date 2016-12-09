import VSS = require("VSS/VSS");
import Utils_Core = require("VSS/Utils/Core");
import Service = require("VSS/Service");
import Controls = require("VSS/Controls");
import Notifications = require("VSS/Controls/Notifications");
import Dialogs = require("VSS/Controls/Dialogs");
import Menus = require("VSS/Controls/Menus");
import Navigation = require("VSS/Controls/Navigation");
import Notes_Contracts = require("./notesContracts");
import Notes_Dialogs = require("./notesDialogs");
import Notes_Grids = require("./notesGrids");
import Notes_Services = require("./notesServices");


var delegate = Utils_Core.delegate;

/**
 * Creates a high-level view object the notes UI. 
 * Contains a grid and toolbar for viewing, adding, deleting and editing notes.
 */
export class NotesView extends Navigation.NavigationView {
    private _toolbar: Menus.MenuBar;
    private _grid: Notes_Grids.NotesGrid;
    private _notesService: Notes_Services.NotesService;
    private _noteValidationError: Notifications.MessageAreaControl;

    private static MenuCommands = {
        DELETE_SELECTED_NOTE: "delete-selected-note",
        EDIT_NOTE: "edit-note",
        NEW_NOTE: "new-note",
        REFRESH_NOTES: "refresh-notes",
    }

    /**
     * Initializes the view to populate data and wire up other controls
     */
    public initialize() {        
        this._notesService = Service.getService(Notes_Services.NotesService);
        this._notesService.initService(() => { this._onDataLoaded(); }, (e: Error) => { this._setError(e.message); });

        this._noteValidationError = <Notifications.MessageAreaControl>Controls.BaseControl.createIn(Notifications.MessageAreaControl, this._element, { closeable: true });

        var $toolbarContainer: JQuery = this._element.find(".notes-toolbar-container");
        this._toolbar = this._createMenuBar($toolbarContainer);

        var $gridContainer = this._element.find(".notes-grid-container");
        this._grid = <Notes_Grids.NotesGrid>Controls.BaseControl.createIn(Notes_Grids.NotesGrid, $gridContainer, {
            viewModel: this._notesService
        });

        this._updateMenubarItems();

        this._bind(Notes_Grids.NotesGrid.Events.NOTE_MENU_ITEM_CLICKED, delegate(this, this._onContextMenuItemClick));
        this._bind(Notes_Grids.NotesGrid.Events.SELECTED_NOTE_CHANGED, delegate(this, this._onSelectedNoteChanged));
        this._bind(Notes_Grids.NotesGrid.Events.NOTE_DOUBLE_CLICK, delegate(this, this._onNoteDoubleClick));

        $(".add-first-note-link").click(() => {
            this._createNewNote();
        });
    }

    private _setError(message: string) {
        this._noteValidationError.setError(message);
    }

    private _clearError() {
        this._noteValidationError.clear();
    }

    private _createMenuBar($container): Menus.MenuBar {
        return <Menus.MenuBar>Controls.BaseControl.createIn(Menus.MenuBar, $container, {
            items: this._createMenubarItems(),
            executeAction: Utils_Core.delegate(this, this._onMenuItemClick)
        });
    }

    private _createMenubarItems() {
        var items = [];

        items.push({ id: NotesView.MenuCommands.NEW_NOTE, text: "New", title: "New Note", showText: false, icon: "icon-add-small" });
        items.push({ separator: true });
        items.push({ id: NotesView.MenuCommands.EDIT_NOTE, text: "Edit", title: "Edit Note", showText: false, icon: "icon-edit" });
        items.push({ id: NotesView.MenuCommands.REFRESH_NOTES, text: "Refresh", title: "Refresh Notes", showText: false, icon: "icon-refresh" });
        items.push({ id: NotesView.MenuCommands.DELETE_SELECTED_NOTE, text: "Delete", title: "Delete Notes", showText: false, icon: "icon-delete" });

        return items;
    }

    private _onContextMenuItemClick(e?, args?) {
        this._onMenuItemClick(args);
    }

    private _onMenuItemClick(e?) {

        var command = e.get_commandName();

        switch (command) {
            case NotesView.MenuCommands.NEW_NOTE:
                this._createNewNote();
                break;
            case NotesView.MenuCommands.EDIT_NOTE:
                this._editNote(this._grid.getSelectedNote());
                break;
            case NotesView.MenuCommands.REFRESH_NOTES:
                this._refreshNotes();
                break;
            case NotesView.MenuCommands.DELETE_SELECTED_NOTE:
                this._deleteNotes(this._grid.getSelectedNotes());
                break;
        }
    }

    private _updateGrid(notes: Notes_Contracts.Note[]) {
        this._clearError();
        this._grid.setSource(notes);

        var noteExists = notes.length > 0;
        $(".no-notes").toggleClass("vssf-sdk-sample-hide", noteExists);
        $(".add-first-note-link").toggleClass("vssf-sdk-sample-hide", noteExists);
        $(".notes-content").toggleClass("vssf-sdk-sample-hide", !noteExists);
    }

    private _setSelectedNote(noteToSelect: Notes_Contracts.Note) {
        $.each(this._notesService.notes,(i: number, note: Notes_Contracts.Note) => {
            if (note.id == noteToSelect.id) {
                this._grid.setSelectedDataIndex(i);
                return false; // break
            }
        });
    }

    private _onSelectedNoteChanged(e?, selectedNote?) {
        this.delayExecute("updateMenuItems", 250, true, this._updateMenubarItems);
    }

    private _onNoteDoubleClick(e?, note?) {
        if (note) {
            this._editNote(note);
        }
    }
    
    private _showNoteDialog(title: string, note: Notes_Contracts.Note, okCallback: any) {
        Dialogs.show(Notes_Dialogs.NotesDialog, {
            height: 600,
            width: 600,
            resizable: true,
            okCallback: okCallback,
            title: title,
            note: note,
        });
    }     

    private _updateMenubarItems() {
        var selectedNotes = this._grid.getSelectedNotes();

        this._toolbar.updateCommandStates([{ id: NotesView.MenuCommands.EDIT_NOTE, disabled: selectedNotes.length !== 1 }]);
        this._toolbar.updateCommandStates([{ id: NotesView.MenuCommands.DELETE_SELECTED_NOTE, disabled: selectedNotes.length === 0 }]);
    }

    private _onDataLoaded() {
        this._updateGrid(this._notesService.notes);
    }

    private _createNewNote() {
        this._showNoteDialog("Create Note", null,(newNote: Notes_Contracts.Note) => {
            this._notesService.createNote(newNote,
                () => {
                    this._updateGrid(this._notesService.notes);
                    this._setSelectedNote(newNote);
                }
            );
        });
    }

    private _deleteNotes(notes: Notes_Contracts.Note[]) {

        if (confirm("Are you sure you want to delete this note?")) {
            $.each(notes,(i: number, note: Notes_Contracts.Note) => {
                this._notesService.deleteNote(note,
                    () => {
                        this._updateGrid(this._notesService.notes);
                    }
                );
            });
        }
    }

    private _editNote(note: Notes_Contracts.Note) {
        this._showNoteDialog("Edit Note", note, (editedNote: Notes_Contracts.Note) => {
            this._notesService.updateNote(note, editedNote, 
                () => {
                    this._updateGrid(this._notesService.notes);
                    this._setSelectedNote(editedNote);
                }
            );
        });
    }

    private _refreshNotes() {
        this._notesService.refresh();
    }
}

Controls.Enhancement.registerEnhancement(NotesView, ".notes-view");
