import Utils_Core = require("VSS/Utils/Core");
import Utils_String = require("VSS/Utils/String");
import Service = require("VSS/Service");
import Utils_UI = require("VSS/Utils/UI");
import Controls = require("VSS/Controls");
import Notifications = require("VSS/Controls/Notifications");
import Dialogs = require("VSS/Controls/Dialogs");
import Notes_Contracts = require("./notesContracts");

var domElem = Utils_UI.domElem;

export interface NotesDialogOptions extends Dialogs.IModalDialogOptions {
    note?: Notes_Contracts.Note;
}

/**
 * A dialog for creating or editing a note
 */
export class NotesDialog extends Dialogs.ModalDialogO<NotesDialogOptions> {

    private _note: Notes_Contracts.Note;

    private _$container: JQuery;
    private _$inputTitle: JQuery;
    private _$inputUserOnly: JQuery;
    private _noteValidationError: any;

    /**
     *
     * @param options 
     */
    public initializeOptions(options?: any) {
        super.initializeOptions($.extend({
        }, options));
    }

    /**
     * Adds input elements to the dialog
     */
    public initialize() {
        super.initialize();

        this._$container = $(domElem('div')).addClass('.edit-note-container').appendTo(this._element);
        this._noteValidationError = <Notifications.MessageAreaControl>Controls.BaseControl.createIn(Notifications.MessageAreaControl, this._$container, { closeable: false });

        var inputId = "noteTitle" + Controls.getId();

        $(domElem("label"))
            .attr("for", inputId)
            .text("Title:")
            .appendTo(this._$container);

        var titleDiv = $(domElem('div')).appendTo(this._$container);

        this._$inputTitle = $(domElem("textarea", "note-title"))
            .addClass('requiredInfoLight')
            .addClass('textbox')
            .attr("type", "text")
            .attr("id", inputId)
            .appendTo(titleDiv);

        this._$inputTitle.select();
        
        inputId = "noteUserOnly" + Controls.getId();
        $(domElem("label"))
            .attr("for", inputId)
            .text("User-Only")
            .appendTo(this._$container);
        var userOnlyDiv = $(domElem('div')).appendTo(this._$container);
        this._$inputUserOnly = $(domElem("input", "note-user-only"))
            .attr("type", "checkbox")
            .attr("id", inputId)
            .appendTo(userOnlyDiv);
        
        
        if (this._options.note) {
            this._$inputTitle.val(this._options.note.title);
            this._$inputUserOnly.prop('checked', this._options.note.userOnly);
            this._$inputTitle.select();
        }   
        
        this.updateOkButton(true);    
    }

    /**
     * Returns the title of the dialog
     */
    public getTitle(): string {
        return this._options.title;
    }

    /**
     * Processes the data that the user has entered and either
     * shows an error message, or returns the edited note.
     */
    public onOkClick(): any {

        var title = $.trim(this._$inputTitle.val());
        var userOnly = this._$inputUserOnly.prop('checked');
        this._note = { title: title, userOnly: userOnly };

        this.processResult(this._note);
    }    

    private _setError(errorMessage: string) {
        this._noteValidationError.setError($("<span />").html(errorMessage));
    }

    private _clearError() {
        this._noteValidationError.clear();
    }
}
