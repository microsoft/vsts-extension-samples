/// <reference path='ref/VSS/VSS.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "VSS/Utils/String", "VSS/Service", "VSS/Utils/UI", "VSS/Controls", "VSS/Controls/Common"], function (require, exports, Utils_String, Service, Utils_UI, Controls, ControlsCommon) {
    var domElem = Utils_UI.domElem;
    /**
     * A dialog for creating or editing a note
     */
    var NotesDialog = (function (_super) {
        __extends(NotesDialog, _super);
        function NotesDialog() {
            _super.apply(this, arguments);
        }
        /**
         *
         * @param options
         */
        NotesDialog.prototype.initializeOptions = function (options) {
            _super.prototype.initializeOptions.call(this, $.extend({}, options));
        };
        /**
         * Adds input elements to the dialog
         */
        NotesDialog.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._$container = $(domElem('div')).addClass('.edit-note-container').appendTo(this._element);
            this._noteValidationError = Controls.BaseControl.createIn(ControlsCommon.MessageAreaControl, this._$container, { closeable: false });
            var inputId = "noteId" + Controls.getId();
            $(domElem("label"))
                .attr("for", inputId)
                .text("ID")
                .appendTo(this._$container);
            var idDiv = $(domElem('div')).appendTo(this._$container);
            this._$inputId = $(domElem("input", "note-id"))
                .addClass('requiredInfoLight')
                .addClass('textbox')
                .attr("type", "text")
                .attr("id", inputId)
                .appendTo(idDiv)
                .bind("input keyup", function (e) {
                if (e.keyCode !== Utils_UI.KeyCode.ENTER) {
                    var isValid = _this._validateId();
                    _this.updateOkButton(isValid && $.trim(_this._$inputId.val()).length > 0);
                    if (isValid) {
                        _this._clearError();
                    }
                }
            });
            inputId = "noteTitle" + Controls.getId();
            $(domElem("label"))
                .attr("for", inputId)
                .text("Title")
                .appendTo(this._$container);
            var titleDiv = $(domElem('div')).appendTo(this._$container);
            this._$inputTitle = $(domElem("textarea", "note-title"))
                .addClass('requiredInfoLight')
                .addClass('textbox')
                .attr("type", "text")
                .attr("id", inputId)
                .appendTo(titleDiv)
                .bind("input keyup", function (e) {
                if (e.keyCode !== Utils_UI.KeyCode.ENTER) {
                    if (_this._options.note) {
                        _this.updateOkButton($.trim(_this._$inputTitle.val()) !== _this._options.note.title);
                    }
                }
            });
            this._$inputId.select();
            
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
                this._$inputId.val(this._options.note.noteId);
                this._$inputUserOnly.prop('checked', this._options.note.userOnly);
                this._$inputId.attr('disabled', 'disabled');
                this._$inputId.removeClass('requiredInfoLight');
                this._$inputTitle.select();
            }
        };
        /**
         * Returns the title of the dialog
         */
        NotesDialog.prototype.getTitle = function () {
            return this._options.title;
        };
        /**
         * Processes the data that the user has entered and either
         * shows an error message, or returns the edited note.
         */
        NotesDialog.prototype.onOkClick = function () {
            var _this = this;
            var noteId = parseInt($.trim(this._$inputId.val()));
            var title = $.trim(this._$inputTitle.val());
            var userOnly = this._$inputUserOnly.prop('checked');
            this._note = { noteId: noteId, title: title, userOnly: userOnly};
            if (this._options.note) {
                this._note.__etag = this._options.note.__etag;
                this._note.id = this._options.note.id;
            }
            // if (!this._options.note) {
            //     var notesClient = Service.getClient(VSS_VssfSdkSample_WebApi.VssfSdkSampleHttpClient);
            //     notesClient.getNote(this._note.noteId).then(function (note) {
            //         _this._setError(Utils_String.format(VSS_Resources_VssfSdkSample.NoteExistsMessage, _this._note.noteId));
            //     }, function (e) {
            //         _this.processResult(_this._note);
            //     });
            // }
            // else {
                this.processResult(this._note);
            //}
        };
        NotesDialog.prototype._validateId = function () {
            var id = $.trim(this._$inputId.val());
            var idNum = parseInt(id, 10);
            var isValid = !isNaN(idNum) && 0 < idNum && idNum < 2147483648; // 0 < idNum < int32.MaxValue + 1
            if (id.length === 0 || isValid) {
                this._clearError();
            }
            else if (id.length > 0) {
                this._setError(Utils_String.format("ID {0} is invalid.", id));
            }
            return isValid;
        };
        NotesDialog.prototype._setError = function (errorMessage) {
            this._noteValidationError.setError($("<span />").html(errorMessage));
        };
        NotesDialog.prototype._clearError = function () {
            this._noteValidationError.clear();
        };
        return NotesDialog;
    })(ControlsCommon.ModalDialog);
    exports.NotesDialog = NotesDialog;
});
