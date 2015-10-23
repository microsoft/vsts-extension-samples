/// <reference path='ref/VSS.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define([
    "require", 
    "exports", 
    "VSS/Utils/Core", 
    "Scripts/notesDialog", 
    "Scripts/notesGrid", 
    "Scripts/notesService", 
    "VSS/Service", 
    "VSS/Controls", 
    "VSS/Controls/Menus", 
    "VSS/Controls/Navigation", 
    "VSS/Controls/Notifications"], function (require, exports, Utils_Core, NotesDialog, NotesGrid, NotesService, Service, Controls, Menus, Navigation, Notifications) {
    var delegate = Utils_Core.delegate;
    /**
     * Creates a high-level view object the notes UI.
     * Contains a grid and toolbar for viewing, adding, deleting and editing notes.
     */
    var NotesView = (function (_super) {
        __extends(NotesView, _super);
        function NotesView() {
            _super.apply(this, arguments);
        }
        /**
         * Initializes the view to populate data and wire up other controls
         */
        NotesView.prototype.initialize = function () {
            var _this = this;
            this._notesService = Service.getService(NotesService.NotesService);
            this._notesService.initService(function () { _this._onDataLoaded(); }, function (e) { _this._setError(e.message); });
            this._noteValidationError = Controls.BaseControl.createIn(Notifications.MessageAreaControl, this._element, { closeable: true });
            var $toolbarContainer = this._element.find(".notes-toolbar-container");
            this._toolbar = this._createMenuBar($toolbarContainer);
            var $gridContainer = this._element.find(".notes-grid-container");
            this._grid = Controls.BaseControl.createIn(NotesGrid.NotesGrid, $gridContainer, {
                viewModel: this._notesService
            });
            this._updateMenubarItems();
            this._bind(NotesGrid.NotesGrid.Events.NOTE_MENU_ITEM_CLICKED, delegate(this, this._onContextMenuItemClick));
            this._bind(NotesGrid.NotesGrid.Events.SELECTED_NOTE_CHANGED, delegate(this, this._onSelectedNoteChanged));
            this._bind(NotesGrid.NotesGrid.Events.NOTE_DOUBLE_CLICK, delegate(this, this._onNoteDoubleClick));

        };
        NotesView.prototype._setError = function (message) {
            this._noteValidationError.setError(message);
        };
        NotesView.prototype._clearError = function () {
            this._noteValidationError.clear();
        };
        NotesView.prototype._createMenuBar = function ($container) {
            return Controls.BaseControl.createIn(Menus.MenuBar, $container, {
                items: this._createMenubarItems(),
                executeAction: Utils_Core.delegate(this, this._onMenuItemClick)
            });
        };
        NotesView.prototype._createMenubarItems = function () {
            var items = [];
            items.push({ id: NotesView.MenuCommands.NEW_NOTE, text: "New", title: "New Note", showText: false, icon: "icon-add-small" });
            items.push({ separator: true });
            items.push({ id: NotesView.MenuCommands.EDIT_NOTE, text: "Edit", title: "Edit Note", showText: false, icon: "icon-edit" });
            items.push({ id: NotesView.MenuCommands.REFRESH_NOTES, text: "Refresh", title: "Refresh Notes", showText: false, icon: "icon-refresh" });
            items.push({ id: NotesView.MenuCommands.DELETE_SELECTED_NOTE, text: "Delete", title: "Delete Note", showText: false, icon: "icon-delete" });
            return items;
        };
        NotesView.prototype._onContextMenuItemClick = function (e, args) {
            this._onMenuItemClick(args);
        };
        NotesView.prototype._onMenuItemClick = function (e) {
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
        };
        NotesView.prototype._updateGrid = function (notes) {
            this._clearError();
            this._grid.setSource(notes);
            var noteExists = notes.length > 0;
            $(".no-notes").toggleClass("vssf-sdk-sample-hide", noteExists);
            $(".add-first-note-link").toggleClass("vssf-sdk-sample-hide", noteExists);
            $(".notes-content").toggleClass("vssf-sdk-sample-hide", !noteExists);
        };
        NotesView.prototype._setSelectedNote = function (noteToSelect) {
            var _this = this;
            $.each(this._notesService.notes, function (i, note) {
                if (note.noteId == noteToSelect.noteId) {
                    _this._grid.setSelectedDataIndex(i);
                    return false; // break
                }
            });
        };
        NotesView.prototype._onSelectedNoteChanged = function (e, selectedNote) {
            this.delayExecute("updateMenuItems", 250, true, this._updateMenubarItems);
        };
        NotesView.prototype._onNoteDoubleClick = function (e, note) {
            if (note) {
                this._editNote(note);
            }
        };
        NotesView.prototype._showNoteDialog = function (title, note, okCallback) {
            ControlsCommon.Dialog.show(NotesDialog.NotesDialog, {
                height: 600,
                width: 600,
                resizable: true,
                okCallback: okCallback,
                title: title,
                note: note
            });
        };
        NotesView.prototype._updateMenubarItems = function () {
            var selectedNotes = this._grid.getSelectedNotes();
            this._toolbar.updateCommandStates([{ id: NotesView.MenuCommands.EDIT_NOTE, disabled: selectedNotes.length !== 1 }]);
            this._toolbar.updateCommandStates([{ id: NotesView.MenuCommands.DELETE_SELECTED_NOTE, disabled: selectedNotes.length === 0 }]);
        };
        NotesView.prototype._onDataLoaded = function () {
            this._updateGrid(this._notesService.notes);
        };
        NotesView.prototype._createNewNote = function () {
            var _this = this;
            this._showNoteDialog("Create Note", null, function (newNote) {
                _this._notesService.createNote(newNote, function () {
                    _this._updateGrid(_this._notesService.notes);
                    _this._setSelectedNote(newNote);
                });
            });
        };
        NotesView.prototype._deleteNotes = function (notes) {
            var _this = this;
            if (confirm("Are you sure you want to delete this note?")) {
                $.each(notes, function (i, note) {
                    _this._notesService.deleteNote(note, function () {
                        _this._updateGrid(_this._notesService.notes);
                    });
                });
            }
        };
        NotesView.prototype._editNote = function (note) {
            var _this = this;
            this._showNoteDialog("Edit Note", note, function (editedNote) {
                _this._notesService.updateNote(note, editedNote, function () {
                    _this._updateGrid(_this._notesService.notes);
                    _this._setSelectedNote(editedNote);
                });
            });
        };
        NotesView.prototype._refreshNotes = function () {
            this._notesService.refresh();
        };
        NotesView.MenuCommands = {
            DELETE_SELECTED_NOTE: "delete-selected-note",
            EDIT_NOTE: "edit-note",
            NEW_NOTE: "new-note",
            REFRESH_NOTES: "refresh-notes"
        };
        return NotesView;
    })(Navigation.NavigationView);
    exports.NotesView = NotesView;
});
