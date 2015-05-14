/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
import Utils_Core = require("VSS/Utils/Core");
/**
* Options for the file input control.
*/
export interface FileInputControlOptions {
    initialFiles?: FileList;
    maximumNumberOfFiles?: number;
    maximumTotalFileSize?: number;
    maximumSingleFileSize?: number;
    detectEncoding?: boolean;
    fileNamesCaseSensitive?: boolean;
    resultContentType?: FileInputControlContentType;
    updateHandler: (updateEvent: FileInputControlUpdateEventData) => void;
}
/**
* File result from files uploaded to the FileInputControl.
*/
export interface FileInputControlResult {
    name: string;
    type: string;
    size: number;
    lastModifiedDate: Date;
    content?: string;
    encoding?: Utils_Core.FileUtils.FileEncoding;
}
export declare enum FileInputControlContentType {
    Base64EncodedText = 0,
    RawText = 1,
}
/**
* Event data passed to FileInputControl update events.
*/
export interface FileInputControlUpdateEventData {
    loading: boolean;
    files: FileInputControlResult[];
}
/**
* Information about a row in the file input control
*/
export interface FileInputControlRow {
    $listElement: JQuery;
    $statusElement: JQuery;
    $fileNameElement: JQuery;
    result: FileInputControlResult;
}
/**
* HTML5 based file input control which accepts one or multiple files with
* browse and drag/drop support. Reads content as a base64 encoded string.
*/
export declare class FileInputControl extends Controls.Control<FileInputControlOptions> {
    private _$fileInputContainer;
    private _$fileList;
    private _inputOptions;
    private _results;
    private _pendingResults;
    private _rows;
    private _$overallStatusContainer;
    private _$overallStatusText;
    private _$errorMessageContainer;
    static createControl($container: JQuery, options: FileInputControlOptions): FileInputControl;
    /**
    * Is this control supported on the current browser? Requires HTML5 FileReader support which
    * is present on all supported browsers except IE9.
    */
    static isSupported(): boolean;
    initializeOptions(options?: any): void;
    initialize(): void;
    private _triggerUpdateEvent();
    private _updateOverallStatus();
    private _getTotalFilesSize();
    private _addFiles(files);
    private _addFile(file);
    private _getFriendlySizeString(numBytes, decimalPlaces?);
    private _clearError();
    private _displayError(errorText);
    getFiles(): FileInputControlResult[];
    isLoadInProgress(): boolean;
    getRows(): FileInputControlRow[];
}
export interface FileDropTargetOptions {
    filesDroppedCallback: (fileList: FileList) => any;
    dragEnterCallback?: (e: JQueryEventObject) => boolean;
    dragLeaveCallback?: (e: JQueryEventObject) => boolean;
    dragOverCssClass?: string;
}
export declare class FileDropTarget extends Controls.Enhancement<FileDropTargetOptions> {
    static makeDropTarget($element: JQuery, options: FileDropTargetOptions): FileDropTarget;
    private _dropTargetOptions;
    private _dragEventDelegate;
    private _dragLeaveEventDelegate;
    private _dropEventDelegate;
    private _dragOverClassName;
    _enhance($element: JQuery): void;
    _dispose(): void;
    private _handleDragEvent(e);
    private _handleDragLeaveEvent(e);
    private _handleDropEvent(e);
}
