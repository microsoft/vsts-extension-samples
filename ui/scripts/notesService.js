/// <reference path='ref/VSS/VSS.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "VSS/Service"], function (require, exports, Service) {
    /**
     * Service layer for interacting with Notes Http Client
     */
    var NotesService = (function (_super) {
        __extends(NotesService, _super);
        function NotesService() {
            _super.apply(this, arguments);
        }
        /**
         * Builds the NotesService
         * @param dataLoadedCallback function to be invoked when data has been loaded
         * @param failureCallback function to be invoked when an http request has failed
         */
        NotesService.prototype.initService = function (dataLoadedCallback, failureCallback) {
            this._dataLoadedCallback = dataLoadedCallback;
            this._failureCallback = failureCallback;
            this._loadData();
        };
        /**
         * Issues a request to create the new note
         * @param note
         * @param successCallback function to be invoked if the request succeeds
         */
        NotesService.prototype.createNote = function (note, successCallback) {
            var _this = this;
            VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
                var scopeType = note.userOnly ? "User" : "Default";
                extensionSettingsService.createDocument("Notes", note, {scopeType: scopeType}).then(function (savedNote) {
                    _this._addNote(savedNote);
                    if ($.isFunction(successCallback)) {
                        successCallback(savedNote);
                    }
                }, function (error) {
                    if ($.isFunction(_this._failureCallback)) {
                        _this._failureCallback(error);
                    }
                });
            });
        };
        /**
         * Issues a request to delete note
         * @param note
         * @param successCallback function to be invoked if the request succeeds
         */
        NotesService.prototype.deleteNote = function (note, successCallback) {
            var _this = this;
            VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
                var scopeType = note.userOnly ? "User" : "Default";
                extensionSettingsService.deleteDocument("Notes", note.id, {scopeType: scopeType}).then(function () {
                    _this._removeNote(note);
                    if ($.isFunction(successCallback)) {
                        successCallback();
                    }
                }, function (error) {
                    if ($.isFunction(_this._failureCallback)) {
                        _this._failureCallback(error);
                    }
                });
            });
        };
        /**
         * Issues a request to update the note
         * @param note
         * @param successCallback function to be invoked if the request succeeds
         */
        NotesService.prototype.updateNote = function (originalNote, editedNote, successCallback) {
            var _this = this;
             VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
                if (originalNote.userOnly !== editedNote.userOnly) {
                    var oldScopeType = originalNote.userOnly ? "User" : "Default";
                    extensionSettingsService.deleteDocument("Notes", originalNote.id, {scopeType: oldScopeType}).then(function () {
                        var newScopeType = editedNote.userOnly ? "User" : "Default";
                        
                        extensionSettingsService.createDocument("Notes", editedNote, {scopeType: newScopeType}).then(function (savedNote) {
                        _this._replaceNote(editedNote, savedNote);
                        if ($.isFunction(successCallback)) {
                            successCallback();
                        }
                    }, function (error) {
                        if ($.isFunction(_this._failureCallback)) {
                            _this._failureCallback(error);
                        }
                    });
                    });
                }
                else {
                    var scopeType = editedNote.userOnly ? "User" : "Default";
                    extensionSettingsService.updateDocument("Notes", editedNote, {scopeType: scopeType}).then(function (savedNote) {
                        _this._replaceNote(editedNote, savedNote);
                        if ($.isFunction(successCallback)) {
                            successCallback();
                        }
                    }, function (error) {
                        if ($.isFunction(_this._failureCallback)) {
                            _this._failureCallback(error);
                        }
                    });
                }
             });
        };
        /**
         * Refreshes the cached notes from the server
         */
        NotesService.prototype.refresh = function () {
            this._loadData();
        };
        NotesService.prototype._loadData = function () {
            var _this = this;
            VSS.getService("ms.vss-web.data-service").then(function (extensionSettingsService) {
                _this.notes = [];
                extensionSettingsService.getDocuments("Notes")
                    .then(function (notes) {
                    _this._processData(notes);
                    if ($.isFunction(_this._dataLoadedCallback)) {
                        _this._dataLoadedCallback.call(_this);
                    }
                }, function (error) {
                    if ($.isFunction(_this._failureCallback)) {
                        //_this._failureCallback(error);
                    }
                });
                extensionSettingsService.getDocuments("Notes", {"scopeType": "User"})
                    .then(function (notes) {
                    _this._processData(notes);
                    if ($.isFunction(_this._dataLoadedCallback)) {
                        _this._dataLoadedCallback.call(_this);
                    }
                }, function (error) {
                    if ($.isFunction(_this._failureCallback)) {
                        //_this._failureCallback(error);
                    }
                });
            });
        };
        NotesService.prototype._processData = function (notes) {
            var _this = this;
            $.each(notes, function (i, note) {
               _this.notes.push(note);
            });
        };
        NotesService.prototype._addNote = function (note) {
            this.notes.push(note);
        };
        NotesService.prototype._replaceNote = function (oldNote, newNote) {
            var newNotes = [];
            $.each(this.notes, function (i, note) {
                if (note.id == oldNote.id) {
                    newNotes.push(newNote);
                }
                else {
                    newNotes.push(note);
                }
            });
            this.notes = newNotes;
        };
        NotesService.prototype._removeNote = function (noteToRemove) {
            var newNotes = [];
            $.each(this.notes, function (i, note) {
                if (noteToRemove.id != note.id) {
                    newNotes.push(note);
                }
            });
            this.notes = newNotes;
        };
        return NotesService;
    })(Service.VssService);
    exports.NotesService = NotesService;
});
