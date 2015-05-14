/// <reference path="../References/VSS-Common.d.ts" />
export declare function getWheelDelta(e?: any): number;
/**
 * @param element
 * @param enable
 */
export declare function enableElement(element: any, enable: boolean): void;
export declare function makeElementUnselectable(element: any): void;
/**
 * Best-effort attempt to set focus on the specified element. Exceptions will be caught and logged to console.
 *
 * @param element Element to set focus on (DomElement or jQuery element)
 * @param delay Optional delay in ms before calling focus
 */
export declare function tryFocus(element: any, delay?: number): void;
export declare function alignWidth(element: any, baseWidth: any): void;
export declare function isInDomTree(element: any): boolean;
export declare function getCustomData(element: any, key: any): any;
export declare enum KeyCode {
    ALT = 18,
    BACKSPACE = 8,
    CAPS_LOCK = 20,
    COMMA = 188,
    CONTROL = 17,
    DELETE = 46,
    DOWN = 40,
    END = 35,
    ENTER = 13,
    ESCAPE = 27,
    HOME = 36,
    INSERT = 45,
    LEFT = 37,
    PAGE_DOWN = 34,
    PAGE_UP = 33,
    PERIOD = 190,
    RIGHT = 39,
    SEMI_COLON = 186,
    FIREFOX_SEMI_COLON = 59,
    SHIFT = 16,
    SPACE = 32,
    TAB = 9,
    UP = 38,
    F1 = 112,
    F2 = 113,
    F10 = 121,
    IME_INPUT = 229,
    N = 78,
    P = 80,
    Q = 81,
    S = 83,
    A = 65,
    C = 67,
    H = 72,
    T = 84,
    QUESTION_MARK = 191,
}
/**
 * Check if only the ctrl key modifier was pressed.
 *
 * @param e The event object.
 */
export declare module KeyUtils {
    function isExclusivelyCtrl(e: JQueryKeyEventObject): boolean;
}
export declare module Constants {
    var HtmlNewLine: string;
    var BlurTimeout: any;
}
export declare module Measurement {
    var _PROBE_ID: string;
    function _createProbe($parent: any): JQuery;
    /**
     * Get a probe element to use to measure
     *
     * @param $parent Parent element to create a probe under (null for document body)
     * @return
     */
    function _getProbe($parent?: JQuery): JQuery;
    /**
     * Get the pixel equivalent for em's
     *
     * @return
     */
    function getUnitEm(): number;
    /**
     * Get the pixel equivalent for ex's
     *
     * @return
     */
    function getUnitEx(): number;
    /**
     * Get the pixel equivalent for inches
     *
     * @return
     */
    function getUnitIn(): number;
    /**
     * Get the scrollbar width in pixels
     *
     * @param $parent The element to measure
     * @return
     */
    function getScrollbarWidth($parent: JQuery): number;
    /**
     * Get the scrollbar height in pixels
     *
     * @param $parent The element to measure
     * @return
     */
    function getScrollbarHeight($parent: JQuery): number;
    /**
     * Get the number of pixels for the given measurement
     *
     * @param unit Measurement (e.g. "14.5 px" or "2 em")
     * @return
     */
    function getUnitAsPixel(unit: string): number;
}
/**
 * @param tagName
 * @param className
 */
export declare function domElem(tagName: string, className?: string): HTMLElement;
export declare function htmlEncode(input: any): any;
export declare module Positioning {
    enum VerticalScrollBehavior {
        Default = 0,
        Top = 1,
        Middle = 2,
        Bottom = 3,
    }
    function _topOverflow(top: any): number;
    function _bottomOverflow(bottom: any): number;
    function _fitHorizontal(position: any, data: any): void;
    function _flipHorizontal(position: any, data: any): void;
    /**
     * Tries to fit the positioned element by using the base element if any overflow exists.
     * If still overflow exists after flipping, it shrinks the element where it best fits.
     */
    function _fitVertical(position: any, data: any): {
        top: any;
        shrink: number;
    };
    /**
     * Tries to flip the positioned element by using the base element if any overflow exists.
     * If still overflow exists after flipping, it shrinks the element where it best fits.
     */
    function _flipVertical(position: any, data: any): {
        top: any;
        shrink: any;
    };
    /**
     * Positions the given element by taking the given base element
     * as a reference using the options provided
     *
     * @param element Element to position
     * @param baseElement Reference element for positioning
     * @param options The following options are supported:
     *
     *     - elementAlign: where to align the element (horizontal-vertical)
     *     - baseAlign: where to align the element against base element (horizontal-vertical)
     *     - overflow: behavior when the element overflows the window (horizontal-vertical)
     *     - alignToMarkerHorizontal: flag to specify that markers should be used to horizontally align the elements rather than the elements themselves.
     *     - alignToMarkerVertical: flag to specify that markers should be used to vertically align the elements rather than the elements themselves.
     *     - elementAlignmentMarker: jQuery object inside the element that should be aligned with the base
     *     - baseAlignmentMarker: jQuery object inside the base element that should be aligned with the element
     *     - leftOffsetPixels: how much extra left offset (if any) should be given to the target element versus the reference element.
     *     - topOffsetPixels: how much extra top offset (if any) should be given to the target element versus the reference element.
     *
     *     Example usage:
     *     VSS.UI.Positioning.position(element, baseElement, { elementAlign: "left-top", baseAlign: "left-bottom" });
     *
     */
    function position(element: any, baseElement: any, options?: any): void;
    /**
     * Get the first parent of the given element that allows scrolling
     *
     * @param $element Element to scroll into view
     */
    function getVerticalScrollContainer($element: JQuery): JQuery;
    /**
     * Sets the scroll (top) position of the $container element so that the $element is visible.
     * This is a no-op if the element is already visible.
     *
     * @param $element Element to scroll into view
     * @param position The destination position of the element after scrolling (top, middle, bottom)
     * @param scrollIfAlreadyVisible
     *    If true, perform the scroll even if the element is already in view
     *
     * @param scrollAnimationDuration
     *    If true, scroll with animation using the given animation time
     *
     */
    function scrollIntoViewVertical($element: JQuery, position?: Positioning.VerticalScrollBehavior, scrollIfAlreadyVisible?: boolean, scrollAnimationDuration?: number): void;
}
export declare function attachResize(element: any, handler: (e: JQueryEventObject, args?) => void): void;
export declare function detachResize(element: any): void;
export declare function clearResizeHandlers(): void;
export interface SelectionRange {
    $startNode: JQuery;
    $endNode: JQuery;
    startNodeOffset: number;
    endNodeOffset: number;
}
export interface IBrowserInformation {
    msie?: boolean;
    chrome?: boolean;
    safari?: boolean;
    mozilla?: boolean;
    webkit?: boolean;
    version?: string;
}
export declare module BrowserCheckUtils {
    function isFirefox(): boolean;
    function isChrome(): boolean;
    function isMozilla(): boolean;
    function isMsie(): boolean;
    function isIE(): boolean;
    function getVersion(): string;
    function isIEVersion(version: number): boolean;
    function isLessThanOrEqualToIE9(): boolean;
    function isLessThanOrEqualToIE8(): boolean;
}
export declare module SelectionUtils {
    function getSelection(): SelectionRange;
    function selectInputText($input: JQuery, startPosition: number, endPosition: number, focus: boolean): void;
}
export declare module HtmlInsertionUtils {
    function pasteHtmlAtCaret(html: string, parentWindow?: Window): void;
}
export declare enum HotKeyCombination {
    None = 0,
    Ctrl = 1,
    Alt = 2,
    Shift = 3,
    CtrlShift = 4,
    CtrlAlt = 5,
}
export interface HotKey {
    combination: HotKeyCombination;
    which: number;
    displayText: string;
    handler: () => boolean;
}
export interface IGlobalHotKeyManager {
    registerHotKey: (hotKey: HotKey) => void;
    registerCtrlAltHotkey: (which: number, text: string, handler: () => boolean) => void;
    dispose: () => void;
}
export declare var globalHotKeyManager: IGlobalHotKeyManager;
export interface ISectionManager {
    identifySections: () => void;
    nextSection: () => boolean;
    previousSection: () => boolean;
}
export declare var sectionManager: ISectionManager;
