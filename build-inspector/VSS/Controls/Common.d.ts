/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
import Utils_Core = require("VSS/Utils/Core");
import Validation = require("VSS/Controls/Validation");
export declare class ToastNotification extends Controls.BaseControl {
    private _messageArea;
    private _fadeInTime;
    private _fadeOutTime;
    private _toastTime;
    private _toasting;
    private _delayedFunction;
    constructor(options?: any);
    initialize(): void;
    initializeOptions(options?: any): void;
    private _processOptions();
    private _getOptions();
    private _getDefaultOptions();
    /**
     * Pop up a toast with the supplied message
     *
     * @param message This can be a string or JQuery object
     * @param messageType The type of message area you want displayed. Defaults to Info.
     */
    toast(message: any, messageType?: MessageAreaType): void;
    /**
     * If toasting ensure we cancel all in-progress toasting activities
     */
    private _ensureNoActiveToast();
}
export declare class BaseComboBehavior {
    private _onForceHideDropPopupDelegate;
    combo: any;
    _options: any;
    _dropPopup: any;
    _dataSource: Controls.BaseDataSource;
    constructor(combo: any, options?: any);
    initialize(): void;
    dispose(): void;
    isDropVisible(): any;
    setMode(value: any): void;
    canType(): boolean;
    getDataSource(): Controls.BaseDataSource;
    /**
     * @return
     */
    getDropOptions(): any;
    getDropWidth(): any;
    showDropPopup(): boolean;
    hideDropPopup(): boolean;
    toggleDropDown(): void;
    isDropPopupOpen(): boolean;
    setSource(source: any): void;
    /**
     * @return
     */
    getSelectedIndex(): number;
    setSelectedIndex(selectedIndex: any, fireEvent: any): void;
    /**
     * @return
     */
    getText(): string;
    /**
     * @param value
     * @param fireEvent
     */
    setText(value: string, fireEvent?: boolean): void;
    /**
     * @param e
     * @return
     */
    upKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    downKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageUpKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageDownKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    leftKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    rightKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyDown(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyPress(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyUp(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    onForceHideDropPopup(e?: JQueryEventObject): any;
    private _attachGlobalEvents();
    private _detachGlobalEvents();
}
export declare class BaseComboDropPopup extends Controls.BaseControl {
    combo: any;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    setPosition(): void;
    /**
     * @param e
     * @return
     */
    private _onMouseDown(e?);
}
export declare class Combo extends Controls.BaseControl {
    static enhancementTypeName: string;
    static registerBehavior(behaviorMode: any, behaviorType: any): void;
    static attachBehavior(combo: any, options?: any): any;
    _blockBlur: boolean;
    _dropPopup: any;
    _input: any;
    $dropButton: any;
    _behavior: any;
    _currentText: string;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    _dispose(): void;
    _createIn(container: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    initialize(): void;
    getBehavior(): any;
    /**
     * @return
     */
    getText(): string;
    /**
     * @param value
     * @param fireEvent
     */
    setText(text: any, fireEvent?: boolean): any;
    /**
     * Gets the input element of combo
     *
     * @return
     */
    getInput(): any;
    getInputText(): any;
    setInputText(text: any, fireEvent: any): void;
    /**
     * @return
     */
    getSelectedIndex(): number;
    setSelectedIndex(selectedIndex: any, fireEvent: any): void;
    /**
     * @param newValue
     */
    fireChangeIfNecessary(newValue?: string): any;
    toggleDropDown(): void;
    /**
     * @param e
     * @return
     */
    showDropPopup(e?: JQueryEventObject): any;
    hideDropPopup(): any;
    isDropPopupOpen(): any;
    blockBlur(): void;
    cancelBlockBlur(): void;
    /**
     * @param e
     * @return
     */
    _onInputKeyDown(e?: JQueryEventObject): any;
    setTextSelection(selectionStart: any): void;
    setSource(source: any): void;
    getEnabled(): boolean;
    setEnabled(value: any): void;
    getMode(): any;
    setMode(value: any): void;
    setType(type: any): void;
    getComboType(): string;
    setInvalid(value: any): void;
    private _ensureBehavior();
    private _decorate();
    private _updateStyles();
    /**
     * @param e
     * @return
     */
    private _onDropButtonClick(e?);
    /**
     * @param e
     * @return
     */
    private _onInputClick(e?);
    /**
     * @param e
     * @return
     */
    private _onInputFocus(e?);
    /**
     * @param e
     * @return
     */
    private _onInputBlur(e?);
    /**
     * @param e
     * @return
     */
    private _onMouseDown(e?);
    /**
     * @param e
     * @return
     */
    private _onInputKeyPress(e?);
    /**
     * @param e
     * @return
     */
    private _onInputKeyUp(e?);
}
export declare class ComboListDropPopup extends BaseComboDropPopup {
    virtualizingListView: VirtualizingListView;
    dataSource: Controls.BaseDataSource;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
     * @param page
     * @return
     */
    selectPrev(page?: boolean): boolean;
    /**
     * @param page
     * @return
     */
    selectNext(page?: boolean): boolean;
    /**
     * @return
     */
    getSelectedIndex(): number;
    getSelectedValue(): string;
    setSelectedValue(value: any): void;
}
export declare class ComboListBehavior extends BaseComboBehavior {
    private _enableAutoFill;
    private _maxItemLength;
    constructor(combo: any, options?: any);
    initialize(): void;
    setSource(source: any): void;
    /**
     * @return
     */
    getDropOptions(): any;
    /**
     * Finds the max item length inside the data source
     */
    getMaxItemLength(): any;
    /**
     * Gets the drop width of this behavior
     */
    getDropWidth(): number;
    /**
     * @param value
     * @return
     */
    getSelectedIndex(value?: string, all?: any): number;
    setSelectedIndex(selectedIndex: any, fireEvent: any): void;
    /**
     * @param value
     * @param fireEvent
     */
    setText(value: string, fireEvent?: boolean): void;
    /**
     * @param e
     * @return
     */
    upKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    downKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageUpKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageDownKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyDown(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyPress(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    keyUp(e?: JQueryEventObject): any;
    /**
     * @param page
     * @return
     */
    selectPrev(page?: boolean): boolean;
    /**
     * @param page
     * @return
     */
    selectNext(page?: boolean): any;
    _createDataSource(): Controls.BaseDataSource;
    _dropSelectionChanged(selectedIndex: any, accept: any): void;
    /**
     * Set selected index
     *
     * @param selectedIndex new selected index
     * @param fireEvent flag to whether to fire index changed
     */
    private _setSelectedIndex(selectedIndex, fireEvent);
    private _tryAutoFill();
}
export declare class ComboControlValidatior extends Validation.BaseValidator<Validation.BaseValidatorOptions> {
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * @return
     */
    isValid(): boolean;
}
export declare class DatePanel extends Controls.BaseControl {
    private _date;
    private _selectedDate;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    prevMonth(): void;
    nextMonth(): void;
    prevYear(): void;
    nextYear(): void;
    selectDate(date: any): void;
    setSelectedDate(date: any): void;
    getSelectedDate(): any;
    private _draw(calendarDate, focusElementClass?);
    private _drawCalendarTable(date);
    /**
     * @param e
     * @return
     */
    private _onKeyDown(e?);
    /**
     * @param e
     * @return
     */
    private _onClick(e?);
}
export declare class ComboDateDropPopup extends BaseComboDropPopup {
    private _datePanel;
    private _selectedDate;
    constructor(options?: any);
    initialize(): void;
    getSelectedDate(): any;
    setSelectedDate(date: any): void;
    /**
     * @param e
     * @return
     */
    private _onChange(e?);
}
export declare class ComboDateBehavior extends BaseComboBehavior {
    private _timeValue;
    constructor(combo: any, options?: any);
    initialize(): void;
    canType(): boolean;
    /**
     * @return
     */
    getDropOptions(): any;
    getDropWidth(): any;
    /**
     * Get's the current value as a date or null if there is no (valid) date.
     *
     * @return
     */
    getSelectedDate(): Date;
    /**
     * Sets a date value on the combo using the behavior's dateTime format
     *
     * @param selectedDate The date value to set
     */
    setSelectedDate(selectedDate: Date, fireChange?: boolean): void;
    /**
     * @param e
     * @return
     */
    upKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    downKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageUpKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    pageDownKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    leftKey(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    rightKey(e?: JQueryEventObject): any;
    private _onChange();
    private _getSelectedDate();
    private _addDays(date, days);
    private _getMonthLength(month, year);
}
export declare class DatePicker extends Combo {
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
}
export declare class CollapsiblePanel extends Controls.BaseControl {
    static EVENT_CONTENT_EXPANDED: string;
    static EVENT_CONTENT_COLLAPSED: string;
    static enhancementTypeName: string;
    private _dynamicContents;
    private _header;
    private _content;
    private _$toggleIcon;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    _createIn(container: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    /**
     * Appends the specified plain text to the header section of the CollapsiblePanel
     *
     * @param header Content to append to the header section
     * @return
     */
    replaceHeaderTextIfPresent(headerText: any): JQuery;
    /**
     * Appends the specified plain text to the header section of the CollapsiblePanel
     *
     * @param headerText Content to append to the header section
     * @return
     */
    appendHeaderText(headerText: any): CollapsiblePanel;
    /**
     * Appends the specified HTML, DOM element or jQuery object to the
     * header section of the CollapsiblePanel
     *
     * @param element Content to append to the header section
     * @return
     */
    appendHeader(element: any): CollapsiblePanel;
    /**
     * Appends the specified content to the display content of the control
     *
     * @param content This might be a jQuery selector or function.
     * If a function is provided, that function will be executed whenever collapse icon is clicked.
     * The function should return a content
     * @return
     */
    appendContent(element: any): CollapsiblePanel;
    isExpanded(): boolean;
    expand(): void;
    collapse(): void;
    toggleExpandedState(): boolean;
    private _createControl();
}
export declare class AjaxPanel extends Controls.BaseControl {
    static enhancementTypeName: string;
    private _cancelable;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    _dispose(): void;
    beginLoad(url: any, params?: any, callback?: any, errorcallback?: any): void;
    onLoadCompleted(content: any): void;
    onLoadError(error: any, handled: any): void;
    showError(error: any): void;
    private _cancelPendingLoad();
}
export declare class Dialog extends AjaxPanel {
    static enhancementTypeName: string;
    static _dialogActionInProgress: boolean;
    /**
     *     This should be used in cases where you don't want the user to execute more than 1 particular action involving a Dialog
     *     in parallel. For example, clicking a link that does some server processing before opening a dialog. On slow connections
     *     the user may be able to click the link several times before the first dialog ever opens.
     *
     * @param actionDelegate
     *     The function to execute which will involve initializing a Dialog. It takes a single optional
     *     paramater which is a cancellation routine. Call this when you encounter a situation (such as an error)
     *     where you wish to cancel the operation and have subsequent dialog actions execute without being blocked.
     *
     */
    static beginExecuteDialogAction(actionDelegate: Function): void;
    static create(dialogType: any, options?: any): Controls.Enhancement<any>;
    private static _getNextDialogZIndex();
    static show(dialogType: any, options?: any): Controls.Enhancement<any>;
    private _title;
    private _dialogResult;
    private _resizeDelegate;
    private _progressElement;
    /**
     * Creates a new dialog with the provided options
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    onLoadCompleted(content: any): void;
    /**
     * Tries to set the focus using the specified or default selector
     */
    setInitialFocus(): void;
    /**
     * Sets focus on the first enabled input element in the dialog.
     *
     * @param field The field to set focus.
     */
    setFormFocusDelayed($field: any): void;
    setTitle(title: any): void;
    /**
     * @return
     */
    getTitle(): string;
    getDialogResult(): any;
    setDialogResult(dialogResult: any): void;
    show(): void;
    /**
     * @param e
     * @return
     */
    onOpen(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    onClose(e?: JQueryEventObject): any;
    close(): void;
    /**
     * @param e
     * @return
     */
    onDialogResize(e?: JQueryEventObject): any;
    private _updateTitle();
    /**
     * @param e
     * @return
     */
    private _onWindowResize(e?);
    /**
     * @param e
     * @return
     */
    private _onDialogResizing(e?, ui?);
}
export declare class ModalDialog extends Dialog {
    static enhancementTypeName: string;
    static EVENT_BUTTON_STATUS_CHANGE: string;
    /**
     * Creates a new modal dialog with specified options.By default, it has ok and cancel buttons
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    updateOkButton(enabled: any): void;
    processResult(result: any): void;
    /**
     * @param e
     * @return
     */
    onOkClick(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    onResultReady(e?: JQueryEventObject, args?: any): any;
    /**
     * @param e
     * @return
     */
    onCancelClick(e?: JQueryEventObject): any;
    /**
     * @param e
     * @return
     */
    onButtonStatusChange(e?: JQueryEventObject, args?: any): any;
}
export declare class ConfirmationDialog extends ModalDialog {
    $errorContainer: any;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    _onSuccess(data: any): void;
    _onError(error: any): void;
    /**
     * @param e
     * @return
     */
    onOkClick(e?: JQueryEventObject): any;
}
export interface RichEditorAttachmentRequestData {
    fileName: string;
    binaryData: any;
}
export interface RichEditorAttachmentOperationResult {
    attachments: RichEditorAttachmentResult[];
}
export interface RichEditorAttachmentResult {
    Url: string;
}
export interface RichEditorAttachmentHandler {
    (attachment: RichEditorAttachmentRequestData): JQueryPromise<RichEditorAttachmentOperationResult>;
}
export declare class RichEditor extends Controls.BaseControl {
    static enhancementTypeName: string;
    static INSERT_IMAGE_COMMAND: string;
    static RESTORE_COMMAND: string;
    static MAXIMIZE_COMMAND: string;
    static IMAGE_AUTOFIT_SCALE_FACTOR: number;
    private _iframe;
    private _window;
    private _textArea;
    private _isReady;
    private _readyList;
    private _editable;
    private _toolbar;
    private _urlToolTip;
    private _editor;
    private _hasFocus;
    private _explicitFocus;
    private _keyDownInDocument;
    private _customCommandHandlersMap;
    private _originalValue;
    private _currentValue;
    private _textAreaId;
    private _hasWaterMark;
    private _fieldRequired;
    private _uploadAttachmentHandler;
    /**
     * Creates a new rich editor with the provided options
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    _createIn(container: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    ready(fn: any): void;
    setEnabled(value: any): void;
    getValue(): string;
    isEmpty(value: any): boolean;
    setValue(value: any): void;
    /**
     * Inserts an image tag pointing to the specified url at the current caret position if possible.
     * If the current caret position cannot be determined, the image tag is inserted at the editor root node.
     *
     * @param url The url containing an image in which to link to the document.
     */
    insertImage(url: string): void;
    focus(): void;
    selectText(collapseToEnd?: boolean): void;
    bindOnCopy(handler: any): void;
    private _resizeImageOnLoadComplete(url, loadCompleteCallback?);
    setFieldRequired(value: any): void;
    setUploadAttachmentHandler(handler: RichEditorAttachmentHandler): void;
    getTextAreaId(): any;
    private _pasteImage(url);
    private _getToolbar();
    private _createToolbar();
    /**
     * Creates a toolbar button group.
     *
     * @param customGroup An object representing a toolbar button group.
     */
    private _createToolbarButtonGroup(customGroup);
    /**
     * @param opacity
     */
    private _showPanel(panel, opacity?);
    /**
     * @param opacity
     */
    private _showToolbar(opacity?);
    private _getUrlToolTip();
    private _createUrlToolTip();
    private _showUrlToolTip(e?, doShow?);
    private _decorate();
    private _initialize();
    private _cleanUp();
    /**
     * Attaches necessary events to catch the changes if the control is enabled
     */
    private _attachEvents();
    private _detachEvents();
    /**
     * @param e
     * @return
     */
    private _onDblClick(e?);
    private _onDocumentReady();
    private _trySettingWaterMark(val);
    private _clearWaterMark();
    private _textAreaFocus();
    /**
     * @param e
     * @return
     */
    private _onFocusIn(e?);
    /**
     * @param e
     * @return
     */
    private _onFocusOut(e?);
    private _onPaste(e?);
    private _getImageItem(items);
    private _getRandomFileName(fileType?);
    private _onFileReadComplete(e, fileType?);
    private _uploadAttachment(attachment);
    private _onUploadComplete(result);
    private _onUploadError(error);
    /**
     * @param e
     * @return
     */
    private _onClick(e?);
    /**
     * @param e
     * @return
     */
    private _onMouseUp(e?);
    /**
     * @param e
     * @return
     */
    private _onMouseDown(e?);
    private _reTriggerEvent(e?);
    /**
     * @param e
     * @return
     */
    private _onKeyDown(e?);
    /**
     * @param e
     * @return
     */
    private _onKeyPress(e?);
    /**
     * @param e
     * @return
     */
    private _onKeyUp(e?);
    /**
     * @param e
     * @return
     */
    private _onInput(e?);
    /**
     * @param e
     * @return
     */
    private _onToolbarButtonClick(e?, args?);
    private _getNodeUnderCaret(tagName);
    /**
     * Finds the node in the ancestors with the specified tag name
     */
    private _getNodeAncestor(node, tagName);
    /**
     *  Gets a W3C Range or Microsoft TextRange object depending on the running browser.
     * These object types are completely incompatible, so the caller must branch
     * on platform or simply compare for equality.
     */
    private _getTextRange();
    /**
     * Checks whether clicked element is a link and launches url
     *
     * @param e
     */
    private _checkForCtrlClick(e?);
    /**
     * launch the Url associated with a linkNode
     */
    private _processAndLaunchHref(linkNode, e?);
    /**
     * Checks whether the value of the control is changed or not
     *
     * @param e
     * @return
     */
    private _checkModified(e?);
    private _executeCommand(commandInfo);
    /**
     * Creates a hyperlink in this window and selects the new link.
     *
     * @param args The new link address.
     */
    private _createHyperlink(args);
    private _setEditable(value);
    private _processReadyList();
    private _ensureControlReadiness();
    private _normalizeValue(value);
    private _setFieldRequiredStyle();
}
export declare class Splitter extends Controls.BaseControl {
    static enhancementTypeName: string;
    private static _noSplitCssClass;
    static CORE_CSS_CLASS: string;
    static HORIZONTAL_CLASS: string;
    static VERTICAL_CLASS: string;
    static TOGGLE_BUTTON_LENGTH: number;
    static TOGGLE_BUTTON_MARGIN: number;
    static COLLAPSED_CLASS_NAME: string;
    static TOGGLE_BUTTON_ENABLED_CLASS_NAME: string;
    static TOGGLE_BUTTON_HOTKEY_ENABLED_CLASS_NAME: string;
    static AUTO_COLLAPSE_THRESHOLD: number;
    static DEFAULT_ANIMATION_SPEED: number;
    static HANDLE_BAR_CLONE_SIZE: number;
    private _screenXY;
    private _cssPosProp;
    private _cssSizeProp;
    private _leftFix;
    private _fixedSide;
    private _fillSide;
    private _deltaMultiplier;
    private _dragStart;
    private _fixedSidePixels;
    private _splitterOverlay;
    private _$handleBarClone;
    private _ignoreWindowResize;
    private _$toggleButton;
    private _$toggleButtonIcon;
    private _minWidth;
    private _maxWidth;
    leftPane: JQuery;
    rightPane: JQuery;
    handleBar: JQuery;
    expandState: any;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * @param element
     */
    _enhance(element: JQuery): void;
    initialize(): void;
    /**
     * Set's the minimum midth of the splitter's fixed side.
     *
     * @param minWidth minimum number of pixels the fixed side will fill.
     */
    setMinWidth(minWidth: number): void;
    /**
     * Set's the maximum midth of the splitter's fixed side.
     *
     * @param maxWidth maximum number of pixels the fixed side will fill.
     */
    setMaxWidth(maxWidth: number): void;
    /**
     * @param suppressFireResize
     * @param useAnimation
     */
    resize(newSize: any, suppressFireResize?: boolean, useAnimation?: boolean): void;
    /**
     * Expand or collapse the splitter.
     *
     * @param expanded [OPTIONAL]true to expand the splitter; false to collpase it.
     * If not provided, the expansion state toggles.
     */
    toggleExpanded(expanded?: boolean): void;
    isExpanded(): boolean;
    /**
     * @param suppressResize
     */
    removeExpand(suppressResize?: boolean): void;
    /**
     * @param side
     */
    expand(side?: string): void;
    /**
     * Gets the fixed-side pixels.
     *
     * @return
     */
    getFixedSidePixels(): number;
    /**
     * @param visible
     */
    toggleSplit(visible?: boolean, animate?: boolean, defaultExpandToPixels?: number): void;
    noSplit(): void;
    split(animate?: boolean, defaultExpandToPixels?: number): void;
    /**
     * @param newSize
     */
    toggleOrientation(vertical: any, newSize?: number): void;
    vertical(): void;
    horizontal(): void;
    /**
     * Sets the label that is shown when the splitter is collapsed
     *
     * @param labelText Text displayed when the splitter is collapsed (null/empty for none)
     */
    setCollapsedLabel(labelText: string): void;
    _createElement(): void;
    private _configureCssProps();
    private _attachEvents();
    /**
     * Gets the collapse/expand toggle button of this splitter control.
     */
    private _ensureToggleButton();
    /**
     * Re-position the toggle button.
     *
     * @param useAnimation true if the layout change is animated; false, otherwise.
     */
    private _layoutToggleButton(useAnimation?);
    /**
     * Set toggle button icon class for rendering
     *
     * @param isExpanded true if to show expanded icon; false, otherwise.
     */
    private _setToggleButtonIconClass(isExpanded);
    /**
     * Sets the tooltip for the toggle button.
     */
    private _setToggleButtonTooltip();
    /**
     * Measures the full size of the fixed side pane.
     */
    private _measureFixedSide();
    private _handleBarMouseDown(e?);
    /**
     * Checks if the toggle button is enabled.
     */
    private _isToggleButtonEnabled();
    /**
     * Checks if the toggle button hotkey is enabled.
     */
    private _isToggleButtonHotkeyEnabled();
    /**
     * Checks if the splitter is marked as collapsed.
     */
    private _isCollapsed();
    /**
     * Handles the keyup event for the toggle button.
     *
     * @param e
     * @return
     */
    private _onToggleButtonKeyup(e?);
    /**
     * Handles the keyup event for the document.
     *
     * @param e
     * @return
     */
    private _onDocumentKeyup(e?);
    /**
     * Handles the click event for the toggle button.
     *
     * @param e
     * @return
     */
    private _onToggleButtonClick(e?);
    /**
     * Ensures that a clone of the handlebar is available.
     */
    private _ensureHandleBarClone();
    /**
     * Removes the handlebar clone.
     */
    private _removeHandleBarClone();
    private _setupDragEvents();
    private _ensureOverlay();
    private _removeOverlay();
    private _clearDragEvents();
    /**
     * @param e
     * @return
     */
    private _documentMouseMove(e?);
    /**
     * @param e
     * @return
     */
    private _documentMouseUp(e?);
    private _onWindowResize();
    private _fireWindowResize();
    /**
     * Attaches the splitter to the window resize event, performing a resize immediately if specified
     * by the input parameter. This is primarily useful for attaching to the resize event after the
     * splitter has just been re-attached to the DOM and needs to see if the viewwport size has changed.
     *
     * @param resizeNow Whether or not the splitter should perform resize now.
     */
    attachResize(resizeNow?: boolean): void;
    /**
     * Detaches the splitter from the window resize event (tells it to ignore the event).
     */
    detachResize(): void;
    /**
     * Creates an option object to be used with $.animate().
     *
     * @param cssPropertyName The CSS property for the animation.
     * @param cssPropertyValue The target CSS property value for the animation.
     */
    private _createAnimationOption(cssPropertyName, cssPropertyValue);
    /**
     * @param e
     * @return
     */
    private _handleBarDoubleClick(e?);
    _dispose(): void;
}
/**
 * Recommended structure for an item in a CheckboxList control.
 * Not enforced - you may supply raw string items if preferred.
 */
export interface ICheckboxListItem {
    /**
     * The item's identifier or representative value.
     */
    value: any;
    /**
     * The item's display text. Ignored if 'content' is supplied.
     */
    text?: string;
    /**
     * Custom display element to render instead of 'text'.
     */
    content?: JQuery;
    /**
     * The item's tooltip.
     */
    title?: string;
    /**
     * Whether the item is checked.
     */
    checked: boolean;
}
/**
 * Presents a list view of items, with checkboxes for each item.
 */
export declare class CheckboxList extends Controls.BaseControl {
    static enhancementTypeName: string;
    private _items;
    private _checkedItems;
    private _idMap;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    enableElement(enabled: boolean): void;
    setItems(items: any[]): void;
    getCheckedValues(): any[];
    getCheckedItems(): any[];
    getUncheckedValues(): any[];
    getUncheckedItems(): any[];
    setCheckedValues(values: any[]): void;
    _initializeElement(): void;
    private _checkItemState(item, state);
    private _draw();
    /**
     * @param e
     * @return
     */
    private _onCheckClick(e?);
}
export declare class FilterControl extends Controls.BaseControl {
    static enhancementTypeName: string;
    private _clauseTable;
    private _groupHeaderCell;
    private _filter;
    constructor(options?: any);
    /**
     * Get the default clause for this filter.
     */
    _getDefaultClause(): void;
    /**
     * Update the and/or dropdown based on the given clause
     *
     * @param andOrControl The control to be updated.
     * @param clause The clause associated with the control.
     */
    _updateAndOrControl(andOrControl: any, clause: any): void;
    /**
     * Update the field dropdown based on the given clause
     *
     * @param fieldControl The control to be updated.
     * @param clause The clause associated with the control.
     */
    _updateFieldControl(fieldControl: any, clause: any): void;
    /**
     * Update the operator dropdown based on the given clause
     *
     * @param operatorControl The control to be updated.
     * @param clause The clause associated with the control.
     * @param updateClause True to update the clause with the new operator/value.
     */
    _updateOperatorControl(operatorControl: any, clause: any, updateClause?: boolean): void;
    /**
     * Update the value dropdown based on the given clause
     *
     * @param valueControl The control to be updated.
     * @param clause The clause associated with the control.
     */
    _updateValueControl(valueControl: any, clause: any): void;
    /**
     * Validate the given clause.
     *
     * @param clauseInfo The clause info.
     */
    _validateClause(clauseInfo: any): void;
    /**
     * Handler called when the field name control's value is changed.
     *
     * @param clauseInfo The clause info.
     * @param oldValue The old field name.
     */
    _handleFieldNameChanged(clauseInfo: any, oldValue: string): void;
    /**
     * Handler called when the operator control's value is changed.
     *
     * @param clauseInfo The clause info.
     * @param oldValue The old operator value.
     */
    _handleOperatorChanged(clauseInfo: any, oldValue: string): void;
    /**
     * Mark this filter as dirty.
     */
    _setDirty(): void;
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    setFilter(filter: any): void;
    private _createClauseTable();
    private _createHeaderRow();
    _getInsertClauseTooltipText(): string;
    _getRemoveClauseTooltipText(): string;
    private _createClauseRow(clause);
    createClauseValueControl(container: JQuery, options?: any): any;
    /**
     * Gets the string to be displayed in place of "add new clause" hyperlink.
     */
    _getAddNewClauseText(): string;
    private _createAddClauseRow();
    private _onClauseChange(change, clauseInfo);
    getClauseValue(valueControl: any, clause: any): string;
    /**
     * @param e
     * @return
     */
    private _addClauseClick(e?, clauseInfo?);
    /**
     * @param e
     * @return
     */
    private _removeClauseClick(e?, clauseInfo?);
    private _updateGroupLink();
    private _groupSelectedClauses();
    /**
     * @param e
     * @return
     */
    private _ungroupClick(e?, clauseInfo?);
    private _handleFilterModified();
}
export declare class StatusIndicator extends Controls.BaseControl {
    static enhancementTypeName: string;
    private _lastError;
    private _statusDiv;
    private _image;
    private _throttleMinTime;
    private _delayStart;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    _dispose(): void;
    /**
     * @param event
     */
    start(event?: any, options?: any): void;
    /**
     * @param delay
     */
    delayStart(delay: number): void;
    private _start();
    complete(): void;
    error(exception: any): void;
    setMessage(message: string): void;
    private _draw();
    private _onClick();
    private _setImageClass();
    private _bindEvents();
    private _show();
    private _hide();
    private _error(e?, xhr?, settings?, exception?);
    private _startHandler(event, options?);
    private _clearTimeout();
}
export declare class Histogram extends Controls.BaseControl {
    constructor(options?: any);
    _getBarCount(): any;
    initialize(): void;
    refresh(items: any): void;
    _clearBars(): void;
    private _getBarWidth();
    private _getBarSpacing();
    private _getBarMaxHeight();
    private _load(items);
    private _decorate();
    private _renderDefaultBars();
    private _renderBars(items);
    /**
     * @param index
     * @param item
     * @return
     */
    private _createBar(index, item?);
}
export declare class CommonMenuItems {
    static ADD_TO_MY_FAVORITES_ACTION: string;
    static ADD_TO_TEAM_FAVORITES_ACTION: string;
    static REMOVE_FROM_MY_FAVORITES_ACTION: string;
    static REMOVE_FROM_TEAM_FAVORITES_ACTION: string;
    static PIN_TO_HOMEPAGE_ACTION: string;
    static UNPIN_FROM_HOMEPAGE_ACTION: string;
    static ITEM_SECURITY_ACTION: string;
    static addToMyFavs(): {
        id: string;
        text: string;
        title: string;
        icon: string;
        groupName: string;
    };
    static addToTeamFavs(disabled?: boolean): {
        id: string;
        text: string;
        title: string;
        disabled: boolean;
        groupName: string;
    };
    static removeFromMyFavs(): {
        id: string;
        text: string;
        title: string;
        icon: string;
        groupName: string;
    };
    static removeFromTeamFavs(disabled?: boolean): {
        id: string;
        text: string;
        title: string;
        disabled: boolean;
        groupName: string;
    };
    static security(): {
        id: string;
        text: string;
        title: string;
        icon: string;
        groupName: string;
    };
    static pinToHomePage(disabled?: boolean): {
        id: string;
        text: string;
        title: string;
        icon: string;
        disabled: boolean;
        groupName: string;
    };
    static unpinFromHomePage(disabled?: boolean): {
        id: string;
        text: string;
        title: string;
        icon: string;
        disabled: boolean;
        groupName: string;
    };
    constructor();
}
export declare class LongRunningOperation {
    private _cancelable;
    private _options;
    private _$rootElement;
    private _waitControl;
    private _state;
    private _cancelled;
    /**
     * Creates a new long running operation, showing a blocking indicator in a cancellable means overtop the specified container until the operation has completed.
     *
     * @param container A DOM object that contains the control on the page in which to overlay the progress indicator.
     * @param options A collection of configuration name/value pairs.  The following are supported:
     *     Name                  Type        Value
     *     cancellable           boolean     Boolean value indicating whether the operation may be cancelled while it is running.
     *
     */
    constructor(container: any, options?: any);
    /**
     * Begins the long running operation, invoking the specified operationCallback when necessary.
     *
     * @param operationCallback An operation that may take a long time to complete.
     */
    beginOperation(operationCallback: IResultCallback): void;
    getCancellableOperation(): Utils_Core.Cancelable;
    getWaitControl(): WaitControl;
    /**
     * Signals the completion of a long running operation.
     */
    endOperation(): void;
    /**
     * Gets a boolean value indicating whether the current operation has a pending cancel request.
     */
    isCancelled(): boolean;
    /**
     * Cancels the current operation.
     */
    cancelOperation(): void;
    /**
     * Initializes the long running operation.
     */
    private _initialize();
    createWaitControl(state: any): WaitControl;
}
export declare class Clipboard {
    /**
     * Copies the specified data in the specified format to the clipboard using native clipboard support based on the W3C HTML5 clipboard interaction specification (http://www.w3.org/TR/clipboard-apis).
     *
     * @param data The data to copy.
     */
    private static _nativeCopy(data, options?);
    /**
     * Copies the specified data in HTML format using the old execCommand("copy") API
     *
     * @param data The HTML string to copy.
     */
    private static _nativeHtmlCopy(data);
    /**
     * To support non-IE browser copy, opens a new popup window and writes the table to the window allowing the user to copy manually.
     *
     * @param data The data to place on the clipboard (via a popup window).
     */
    private static _copyUsingNewWindow(data, options?);
    static FORMAT_TEXT: string;
    /**
     * Copies the specified data to the clipboard in the TEXT format using a progressively degrading experience.
     *
     * @param data The data to copy.
     */
    static copyToClipboard(data: string, options?: any): void;
    /**
     * Gets a boolean value indicating whether the current browser supports native clipboard access.
     */
    static supportsNativeCopy(): boolean;
    /**
     * Gets a boolean value indicating whether the current browser supports native clipboard access for HTML content.
     */
    static supportsNativeHtmlCopy(): boolean;
    constructor();
}
export declare class CopyContentDialog extends ModalDialog {
    static enhancementTypeName: string;
    private _$textArea;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * Initializes the dialog.
     */
    initialize(): void;
    /**
     * Initializes the dialog UI.
     */
    private _decorate();
    private _initializeRichEditor($container);
    /**
     * Initializes the text area panel
     *
     * @param $container The text area panel container.
     */
    private _initializeTextPanel($container);
}
export declare class WaitControl {
    private static _instanceIdSeed;
    static DefaultShowDelay: number;
    static MinLifeTime: number;
    static WaitingState: any;
    private _options;
    private _waitContext;
    private _waitingState;
    private _keyDownEventHandler;
    /**
     * Constructs a WaitControl object.
     *
     * @param options The options to initialize the control. It has the following properties:
     *   {
     *       image: hostConfig.getResourcesFile('big-progress.gif'),   // optional
     *       message: "Please wait...",                                // optional
     *       target: $('.feedbackrequest-form-container')              // optional
     *       cancellable: true                                         // optional
     *       cancelCallback: function() { // do something }            // optional and only effective when cancellable is true
     *   }
     *
     * @return A WaitControl object.
     */
    constructor(options?: any);
    /**
     * Starts waiting.
     *
     * @param cancelable [optional] A VSS.Core.Cancelable object for additional cancel state signaling.
     */
    startWait(cancelable?: any): void;
    /**
     * Ends waiting.
     */
    endWait(): void;
    /**
     * Cancels waiting.
     */
    cancelWait(): void;
    /**
     * Determines if the current waiting session can be started.
     */
    private _canStartWait();
    /**
     * Determines if the current waiting session can be ended.
     */
    private _canEndWait();
    /**
     * Determines if the current waiting session can be cancelled.
     */
    private _canCancelWait();
    /**
     * Starts the waiting.
     */
    private _startWait();
    /**
     * Ends the waiting.
     */
    private _tryEndWait();
    /**
     * Cancels the waiting.
     */
    private _tryCancelWait();
    /**
     * Sets this wait control.
     */
    private _reset();
    updateWaitElements(wait: any): void;
    /**
     * Shows the wait control.
     */
    private _showWait();
    getWaitingState(): any;
    getWaitingContext(): any;
    /**
     * Resizes the waiting control.
     */
    private _resizeWait();
    /**
     * Handles the keydown event.
     *
     * @param e
     * @return
     */
    private _onKeyDown(e?);
    /**
     * Handles the events to cancel wait.
     *
     * @param e
     * @return
     */
    private _handleCancelEvent(e?);
    /**
     * Binds the keydown event
     *
     * @param cancelLinkId The id of the cancel hyperlink.
     */
    private _bindKeydownEvent(cancelLinkId);
    /**
     * Unbinds the keydown event
     */
    private _unbindKeydownEvent();
    /**
     * Removes the wait element.
     */
    private _removeWaitElement();
    /**
     * Removes the timers used by this controls.
     */
    private _removeShowTimer();
    /**
     * Gets the unique resize event id for the wait control.
     *
     * @return The resize event id.
     */
    private _getResizeEventId(instanceId);
    /**
     * Gets the text message to show in the wait control.
     *
     * @param wait The wait options.
     */
    private _getWaitMessage(wait);
    getWaitMessageFormatString(): string;
}
export declare enum MessageAreaType {
    None = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
}
export declare class MessageAreaControl extends Controls.BaseControl {
    static EVENT_DISPLAY_COMPLETE: string;
    static EVENT_DISPLAY_CLEARED: string;
    static ERROR_DETAILS_TOGGLED: string;
    private _errorHeader;
    private _errorContent;
    private _messageType;
    private _showErrorLink;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    /**
     * Set the message
     *
     * @param message Message string (plain text), jQuery (html) or
     *     message = {
     *         type: MessageAreaType,
     *         header: String for plain text or jQuery for html,
     *         content: String for plain text or jQuery for html,
     *         click: function
     *     }
     *
     * @param messageType Type of message
     */
    setMessage(message: any, messageType?: MessageAreaType): void;
    /**
     * Set the error message
     *
     * @param message Message string (plain text), jQuery (html) or
     *     message = {
     *         type: MessageAreaType,
     *         header: String for plain text or jQuery for html,
     *         content: String for plain text or jQuery for html,
     *         click: function
     *     }
     *
     * @param clickCallback Click callback function
     */
    setError(message: any, clickCallback?: Function): void;
    /**
     * Gets the current message type.
     */
    getMessageType(): MessageAreaType;
    /**
     * Clear the shown message
     */
    clear(): void;
    /**
     * Set the display message
     *
     * @param message
     *     message = {
     *         type: MessageAreaType,
     *         header: String,
     *         content: html String OR jQuery,
     *         click: function
     *     }
     *
     */
    private _setDisplayMessage(message);
    private _toggle();
    setErrorDetailsVisibility(show: any): void;
    /**
     * Clear the shown message
     *
     * @param raiseDisplayCompleteEvent Indicates if the display complete event should be raised.
     */
    private _clear(raiseDisplayCompleteEvent);
    private _raiseDisplayComplete();
}
export declare class UnsupportedBrowserMessageControl extends Controls.BaseControl {
    private _messageArea;
    /**
     * A message area control that displays a message to a user until they dismiss it.
     */
    constructor(options?: any);
    /**
     * Initialize the control, creating the message area and binding to the dismiss event
     */
    initialize(): void;
}
export declare class InformationAreaControl extends Controls.BaseControl {
    private _$collapseIndicator;
    private _$content;
    private _$caption;
    private _collapsed;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    appendDetailHeaderContent($headerContent: JQuery): void;
    appendDetailContent($detailContent: JQuery): void;
    appendCodeContent($codeContent: JQuery): void;
    appendDetailHeaderHtml(headerHtml: string): void;
    appendDetailHtml(detailHtml: string): void;
    appendCodeHtml(codeHtml: string): void;
    _updateCollapsedState(collapsed: boolean): void;
}
export declare class IFrameControl extends Controls.BaseControl {
    static CORE_CSS_CLASS: string;
    constructor(options?: any);
    initialize(): void;
    private _getSandboxAttributes();
}
/**
 * The responsive grid is a layout control which changes its width depending on the screen of the user.
 * The responsive grid comprises of 3 sections.
 * Section 1 is a fix sized section of width 640px.
 * Section 2 is a grid of width 320px.
 * Section 3 is a grid of width 320px.
 * When the screen resolution is >= 1280 section 1, section2 and section 3 appear side by side on the same line.
 * When the screen resolution is > 960 and < 1280. Section 3 floats under section 1 or section 2 and wraps around.
 * When the screen resolution is < 960 section 2 and section 3 float under section 1.
 */
export declare class ResponsiveGrid {
    private _gridElement;
    private static _instance;
    private static cellSize;
    constructor();
    private _adjustGridSections();
    private _adjustGridWidth();
    private _adjustSection3Top();
    static GetInstance(): ResponsiveGrid;
    /**
     * Scans the html for grid items and adds them to the grid.
     */
    scanViewImports(): void;
    getElement(): any;
    /**
     * @param sectionNumber The section in grid.
     */
    getSection(sectionNumber: number): JQuery;
    /**
     * Adds the control in the grid.
     *
     * @param sectionNumber The section in which the control should be put.
     * @param rows The number of rows the control will use.
     * @param columns The number of columns the control will use.
     * @param adjustHeight A value indicating whether the height of the control in the grid
     * should be adjusted to fit the control.
     * @param control The control string or html element.
     * @return The container containing the control.
     */
    addControlInGrid(sectionNumber: number, rows: number, columns: number, adjustHeight: boolean, control?: any): JQuery;
    /**
     * Creates a container in the grid.
     *
     * @param sectionNumber The section in which the control should be put.
     * @param rows The number of rows the control will use.
     * @param columns The number of columns the control will use.
     */
    createContainer(sectionNumber: number, rows: number, columns: number): JQuery;
    /**
     * Creates the control in the grid.
     *
     * @param sectionNumber The section in which the control should be put.
     * @param rows The number of rows the control will use.
     * @param columns The number of columns the control will use.
     * @param type The control type.
     * @param options The options for the control.
     * @return
     */
    createInGrid(sectionNumber: number, rows: number, columns: number, type?: any, options?: any): Controls.BaseControl;
    /**
     * Expands or contracts the height of the control container inside the grid.
     *
     * @param controlElement The element containing the control.
     */
    adjustHeight(controlElement: any): void;
    removeContainer(controlElement: any): void;
    getContainer(controlElement: any): JQuery;
    private _getAdjustedContainerHeight(container);
}
export declare class VirtualizingListView extends Controls.BaseControl {
    static enhancementTypeName: string;
    private _itemsContainer;
    private _scrollContainer;
    private _scrollSpacer;
    private _dataSource;
    private _firstVisible;
    private _selectedIndex;
    private _ignoreScrollEvent;
    private _rowHeight;
    private _enableMouseOver;
    private _prevMousePos;
    visibleRowCount: number;
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    initialize(): void;
    update(): void;
    scrollItemIntoView(index: any): void;
    /**
     * @param page
     * @return
     */
    selectNext(page?: boolean): boolean;
    /**
     * @param page
     * @return
     */
    selectPrev(page?: boolean): boolean;
    getSelectedIndex(): number;
    /**
     * @param noScrollIntoView
     */
    setSelectedIndex(selectedIndex: any, noScrollIntoView?: any): void;
    private _setVisibleBounds(visibleItemIndex);
    private _createItem(index);
    private _drawItems();
    private _updateItemStyles();
    private _setupScrollbar(height);
    private _updateScrollbar();
    private _onScroll(e?);
    private _onMouseMove(e?);
    private _onMouseOver(e?);
    private _onMouseWheel(e?);
    private _onClick(e?);
    /**
     * @param accept
     */
    private _fireSelectionChanged(accept?);
}
