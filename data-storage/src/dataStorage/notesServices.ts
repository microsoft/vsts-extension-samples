import Service = require("VSS/Service");
import Extension_Data = require("VSS/SDK/Services/ExtensionData");
import Notes_Contracts = require("./notesContracts");
import Utils_Notifications = require("./notesNotificationUtils");

/**
 * Service layer for interacting with Notes Http Client
 */
export class NotesService extends Service.VssService {
    private _dataLoadedCallback: any;
    private _failureCallback: any;

    /**
     * Cached notes which have been retrieved through the http client.
     */
    public notes: Notes_Contracts.Note[];

    /**
     * Builds the NotesService
     * @param dataLoadedCallback function to be invoked when data has been loaded
     * @param failureCallback function to be invoked when an http request has failed
     */
    public initService(dataLoadedCallback: any, failureCallback: any) {
        this._dataLoadedCallback = dataLoadedCallback;
        this._failureCallback = failureCallback;

        this._loadData();
    }

    /**
     * Issues a request to create the new note
     * @param note
     * @param successCallback function to be invoked if the request succeeds
     */
    public createNote(note: Notes_Contracts.Note, successCallback: any) {
        VSS.getService(VSS.ServiceIds.ExtensionData).then((extensionDataService: Extension_Data.ExtensionDataService) => {
            const scopeType = note.userOnly ? "User" : "Default";
            extensionDataService.createDocument("Notes", note, {scopeType: scopeType}).then((savedNote: Notes_Contracts.Note) => {
                this._addNote(savedNote);

                Utils_Notifications.publishEvent(note, "added");

                if ($.isFunction(successCallback)) {
                    successCallback(savedNote);
                }
            }, (reason: any) => {
                if ($.isFunction(this._failureCallback)) {
                    this._failureCallback(reason);
                }
            });
        });
    }

    /**
     * Issues a request to delete note
     * @param note
     * @param successCallback function to be invoked if the request succeeds
     */
    public deleteNote(note: Notes_Contracts.Note, successCallback: any) {
        VSS.getService(VSS.ServiceIds.ExtensionData).then((extensionDataService: Extension_Data.ExtensionDataService) => {
            const scopeType = note.userOnly ? "User" : "Default";
            extensionDataService.deleteDocument("Notes", note.id, {scopeType: scopeType}).then(() => {
                this._removeNote(note);

                Utils_Notifications.publishEvent(note, "deleted");

                if ($.isFunction(successCallback)) {
                    successCallback();
                }
            },  (reason: any) => {
                if ($.isFunction(this._failureCallback)) {
                    this._failureCallback(reason);
                }
            });
        });
    }

    /**
     * Issues a request to update the note
     * @param note
     * @param successCallback function to be invoked if the request succeeds
     */
    public updateNote(originalNote: Notes_Contracts.Note, editedNote: Notes_Contracts.Note, successCallback: any) {
        editedNote.__etag = originalNote.__etag;
        editedNote.id = originalNote.id;
        VSS.getService(VSS.ServiceIds.ExtensionData).then((extensionDataService: Extension_Data.ExtensionDataService) => {
            if (originalNote.userOnly !== editedNote.userOnly) {
                const oldScopeType = originalNote.userOnly ? "User" : "Default";
                extensionDataService.deleteDocument("Notes", originalNote.id, {scopeType: oldScopeType}).then(() => {
                    const newScopeType = editedNote.userOnly ? "User" : "Default";
                    
                    extensionDataService.createDocument("Notes", editedNote, {scopeType: newScopeType}).then((savedNote: Notes_Contracts.Note) => {
                        this._replaceNote(editedNote, savedNote);
                        if ($.isFunction(successCallback)) {
                            successCallback();
                        }
                    }, (reason: any) => {
                        if ($.isFunction(this._failureCallback)) {
                            this._failureCallback(reason);
                        }
                    });
                });
            }
            else {
                var scopeType = editedNote.userOnly ? "User" : "Default";
                extensionDataService.updateDocument("Notes", editedNote, {scopeType: scopeType}).then((savedNote: Notes_Contracts.Note) => {
                    this._replaceNote(editedNote, savedNote);
                    if ($.isFunction(successCallback)) {
                        successCallback();
                    }
                }, (reason: any) => {
                    if ($.isFunction(this._failureCallback)) {
                        this._failureCallback(reason);
                    }
                });
            }
        });
    }

    /**
     * Refreshes the cached notes from the server
     */
    public refresh() {
        this._loadData();
    }

    private _loadData() {
        VSS.getService(VSS.ServiceIds.ExtensionData).then((extensionDataService: Extension_Data.ExtensionDataService) => {
            this.notes = [];
            extensionDataService.getDocuments("Notes").then((notes: Notes_Contracts.Note[]) => {
                this._processData(notes);
                if ($.isFunction(this._dataLoadedCallback)) {
                    this._dataLoadedCallback(this);
                }
            });
            
            extensionDataService.getDocuments("Notes", {"scopeType": "User"}).then((notes: Notes_Contracts.Note[]) => {
                this._processData(notes);
                if ($.isFunction(this._dataLoadedCallback)) {
                    this._dataLoadedCallback(this);
                }
            });
        });
    }

    private _processData(notes: Notes_Contracts.Note[]) {
        $.each(notes, (i: number, note: Notes_Contracts.Note) => {
            this.notes.push(note);
        });
    }

    private _addNote(note: Notes_Contracts.Note) {
        this.notes.push(note);
    }

    private _replaceNote(oldNote: Notes_Contracts.Note, newNote: Notes_Contracts.Note) {
        let newNotes = [];
        $.each(this.notes, (i: number, note: Notes_Contracts.Note) => {
            if (note.id == oldNote.id) {
                newNotes.push(newNote);
            }
            else {
                newNotes.push(note);
            }
        });
        this.notes = newNotes;
    }

    private _removeNote(noteToRemove: Notes_Contracts.Note) {
        let newNotes = [];
        $.each(this.notes, (i: number, note: Notes_Contracts.Note) => {
            if (noteToRemove.id != note.id) {
                newNotes.push(note);
            }
        });
        this.notes = newNotes;
    }
}
