/// <reference path="../References/VSS-Common.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
export declare var OperationCanceledException: string;
export declare var utcOffset: number;
export declare var timeZoneMap: Contracts_Platform.DaylightSavingsAdjustmentEntry[];
/**
 * @param parameters
 * @param expectedParameters
 * @param validateParameterCount
 * @return
 */
export declare function validateParameters(parameters: any, expectedParameters: any, validateParameterCount?: boolean): Error;
/**
 * Wrap a function to ensure that a specific value of 'this' is passed to the function when it is invoked (regardless of the caller).
 *
 * @param instance The object that will be set to the value of 'this' when the function is invoked.
 * @param method The function to wrap.
 * @param data Arguments that will be appended to the arguments passed when the delegate is invoked.
 * @return The wrapper function
 */
export declare function delegate(instance: any, method: Function, data?: any): IArgsFunctionR<any>;
/**
 *     Curries a function with a set of arguments and returns the resulting function.
 *     When eventually evaluated, the returned function will call the original function
 *     with the current arguments prepended to the list of arguments.
 *
 *     var add3, result;
 *     function add(x, y) {
 *         return x + y;
 *     }
 *     add3 = add.curry(3);
 *     results = add3(4); // result === 7
 *
 *     See http://en.wikipedia.org/wiki/Curry_function
 *
 * @param fn
 * @param args
 */
export declare function curry(fn: Function, ...args: any[]): IArgsFunctionR<any>;
export declare function transformError(errorCallback?: IErrorCallback, message?: string, errorInfo?: any): IFunctionPR<MSAjaxError, void>;
export declare function transformError(errorCallback?: IErrorCallback, transform?: Function, errorInfo?: any): IFunctionPR<MSAjaxError, void>;
export declare function keys(obj: IDictionaryStringTo<any>, all?: boolean): string[];
export declare class DelayedFunction {
    private _interval;
    private _func;
    private _timeoutHandle;
    private _name;
    /**
     * Creates an object that can be used to delay-execute the specified method.
     *
     * @param instance Context to use when calling the provided function
     * @param ms Delay in milliseconds to wait before executing the Function
     * @param name Name to use when tracing this delayed function
     * @param method Method to execute
     * @param data Arguments to pass to the method
     */
    constructor(instance: any, ms: number, name: string, method: Function, data?: any[]);
    /**
     * Starts the timer (if not already started) which will invoke the method once expired.
     */
    start(): void;
    /**
     * Resets the timer (cancel, then re-start) which will invoke the method once expired.
     */
    reset(): void;
    /**
     * Cancels any pending operation (stops the timer).
     */
    cancel(): void;
    /**
     * Invokes the method immediately (canceling an existing timer).
     */
    invokeNow(): void;
    /**
     * Modifies the length of the delay timer (for subsequent starts).
     *
     * @param ms Delay in milliseconds to wait before executing the Function
     */
    setDelay(ms: number): void;
    /**
     * Modify the method being executed.
     *
     * @param instance Context to use when calling the provided function
     * @param method Method to execute
     * @param data (Optional) arguments to pass to the method
     */
    setMethod(instance: any, method: Function, data?: any[]): void;
    /**
     * Is the timer currently running (operation in progress)
     *
     * @return True if this operation is already in progress
     */
    isPending(): boolean;
}
/**
 * Executes the provided function after the specified amount of time
 *
 * @param instance Context to use when calling the provided function
 * @param ms Delay in milliseconds to wait before executing the Function
 * @param method Method to execute
 * @param data Arguments to pass to the method
 * @return The delayed function that was started
 */
export declare function delay(instance: any, ms: number, method: Function, data?: any[]): DelayedFunction;
/**
 * Creates a delegate that is delayed for the specified interval when invoked. Subsequent calls to the returned delegate reset the timer.
 *
 * @param instance Context to use when calling the provided function
 * @param ms Delay in milliseconds to wait before executing the Function
 * @param method Method to execute
 * @param data Arguments to pass to the method
 * @return The delayed delegate function.
 */
export declare function throttledDelegate(instance: any, ms: number, method: Function, data?: any[]): Function;
/**
 * Executes the provided function after the specified amount of time
 *
 * @param callback Function to execute
 * @param delay Delay in milliseconds to wait before executing the Function
 * @param firstDelay Delay in milliseconds to wait before executing the Function for the first time (default 0)
 * @param method Method to execute
 */
export declare function poll(callback: IFunctionPR<IArgsFunctionR<any>, void>, delay: number, firstDelay?: number): void;
/**
 * Splits a string that contains a list of comma-separated (signed) integer values into an array
 *
 * @param stringRepresentation String representation of comma-separated integer array
 * @return Array of parsed integers
 */
export declare function parseIntArray(stringRepresentation: string): number[];
export declare class Cancelable {
    private _callbacks;
    canceled: boolean;
    context: any;
    /**
     * Manage cancellable operations.
     *
     * @param context The context for the cancellable operation.
     * The context is passed to actions when they are called.
     */
    constructor(context: any);
    /**
     * Perform the action if not cancelled.
     *
     * @param action The action to call if the current operation has not been cancelled.
     */
    perform(action: Function): void;
    /**
     * Wrap an action to make it cancellable.
     *
     * @param action The action to wrap.
     * @return The cancellable action.
     */
    wrap(action: Function): IFunctionPR<void, any>;
    /**
     * Cancel the operation.
     */
    cancel(): void;
    /**
     * Register a callback to be called when the object is cancelled.
     *
     * @param callback The callback function.
     */
    register(callback: Function): void;
}
export declare class TypeFactory {
    private _ctors;
    /**
     * An add-in object used to extend a constructor function's behavior to allow it to
     * act as a factory for registered sub-classes. Instances can be created by passing the appropriate
     * registration key and constructor arguments.
     *
     * Usage:
     *     function Foo() {... }
     *     Foo.extend(new TypeFactory());
     *
     *     function Bar(arg1, arg2) {...}
     *     Bar.inherit(Foo, { });
     *     Foo.registerConstructor("bar", Bar);
     *
     *     var bar = Foo.createInstance("bar", [arg1value, arg2value]);
     */
    constructor();
    /**
     * Register a constructor with the factory
     *
     * @param key The key for the constructor that is use later when creating instances.
     * @param ctor The constructor being registered.
     */
    registerConstructor(key: string, ctor: Function): void;
    /**
     * Get the constructor registered with the specified key.
     *
     * @param key The key to use when looking up the registered constructor.
     * @return Returns the constructor registered with the specified key, or undefined.
     */
    getConstructor(key: string): Function;
    /**
     * Create an instance of a registered type.
     *
     * @param key The key for the registered constructor function.
     * @param args Arguments to pass to the constructor function.
     * @return An instance of the type registered with the key.
     */
    createInstance(key: string, args?: any[]): any;
}
/**
 * Gets the anti-forgery token value.
 *
 * @return The INPUT element that holds the token value.
 */
export declare function getAntiForgeryTokenValue(): string;
/**
 * Get the anti-forgery token value (version 2).
 *
 * @return The INPUT element that holds the token value.
 */
export declare function getAntiForgeryTokenValue2(): string;
/**
 * Set a token on the specified to the current anti-forgery token. Expects an INPUT element with a specific name - __RequestVerificationToken
 *
 * @param form The form on which to look for the INPUT element.
 * @return The form value (if the token was set), otherwise undefined.
 */
export declare function setAntiForgeryToken(form: JQuery): JQuery;
export declare class StringBuilder {
    private _textBuilder;
    /**
     * Utility class for building strings - similar to the System.Text.StringBuilder .NET class.
     */
    constructor();
    /**
     * Appends the specified text to the end of the string buffer.
     *
     * @param text The text to append.
     */
    append(text: string): void;
    /**
     * Appends a new-line to the current text buffer.
     */
    appendNewLine(): void;
    /**
     * Concatenates all text in the string buffer into a single string value.
     *
     * @return The string version of the accumulated text.
     */
    toString(): string;
}
export declare class OperationQueue {
    private _operationQueue;
    private _isProcessingOperation;
    /**
     * Allows for sequential processing of asyncronous operations.
     */
    constructor();
    /**
     * Queues the provided operation.  Operations are processed sequentially.
     *
     * @param operation
     * Function for the operation to be performed.  The function should have the following signature:
     *         function operation(completedCallback)
     *
     * The completed callback needs to be invoked when the operation is completed in order to allow subsequent
     * operations to be performed.
     *
     */
    queueOperation(operation: IFunctionPR<Function, void>): void;
    /**
     * Begins processing the next operation in the queue if there is not one already in progress.
     */
    private _processQueue();
}
export declare module DateUtils {
    var MILLISECONDS_IN_MINUTE: number;
    var MILLISECONDS_IN_HOUR: number;
    var MILLISECONDS_IN_DAY: number;
    var MILLISECONDS_IN_WEEK: number;
    var DATETIME_MINDATE_UTC_MS: number;
    /**
     * Checks whether this date object corresponds to a min date or not
     *
     * @return
     */
    function isMinDate(date: Date): boolean;
    /**
     * Compares this date object with the given date object
     *
     * @param date1 Date object to compare
     * @param date2 Date object to compare
     * @return
     */
    function compare(date1: Date, date2: Date): number;
    /**
     * Compare two dates to see if they are equal - returning true if they are equal.
     *
     * @param date1 The first value to compare
     * @param date2 The second value to compare
     * @return
     */
    function equals(date1: Date, date2: Date): boolean;
    /**
     * Shifts the date to match the UTC date.  This is done by removing the timezone offset which is applied.
     *
     * @param date The date to be converted.
     * @return
     */
    function shiftToUTC(date: Date): Date;
    /**
     * Shifts the date to match the local date.  This is done by adding the timezone offset to the date.
     *
     * @param date The date to be converted.
     * @return
     */
    function shiftToLocal(date: Date): Date;
    /**
     * Parses the string into a date.
     *
     * @param dateString Date string to parse.
     * @param parseFormat Optional format string to use in parsing the date. May be null or undefined
     * @param ignoreTimeZone
     *     Optional value indicating to ignore the time zone set set in user preferences?
     *     Should be set to true when a Date string should be parsed irrespective of the user's time zone (e.g. calendar control).
     *
     * @return
     */
    function parseDateString(dateString: string, parseFormat?: string, ignoreTimeZone?: boolean): Date;
    /**
     * Returns the number of days between the two dates. Note that any time component is ignored and the dates
     * can be supplied in any order
     *
     * @param startDate The first date
     * @param endDate The second date
     * @param exclusive If true then the result is exclusive of the second date (Mon->Fri==4).
     * Otherwise the date includes the later date (Mon->Fri==5)
     */
    function daysBetweenDates(startDate: Date, endDate: Date, exclusive?: boolean): number;
    /**
     * @param value Date string
     * @param formats Date string formats
     * @param ignoreTimeZone
     * @return
     */
    function parseLocale(value: string, formats?: string[] | string, ignoreTimeZone?: boolean): Date;
    /**
     * @param date The Date object to format
     * @param format Date string format
     * @param ignoreTimeZone
     * @return
     */
    function localeFormat(date: Date, format?: string, ignoreTimeZone?: boolean): string;
    /**
     * Converts a time from the client (e.g. new Date()) to the user's preferred timezone
     *
     * @param date The Date object to convert
     * @param adjustOffset
     *     If true, consider the date portion when converting (get the timezone offset at that particular date).
     *     False indicates to use the current (today's) timezone offset regardless of the date given.
     *
     */
    function convertClientTimeToUserTimeZone(date: Date, adjustOffset?: boolean): Date;
    /**
     * Converts a time from the user's preferred timezone to the client (e.g. new Date()) timezone
     *
     * @param date The Date object to convert
     * @param adjustOffset
     *     If true, consider the date portion when converting (get the timezone offset at that particular date).
     *     False indicates to use the current (today's) timezone offset regardless of the date given.
     *
     */
    function convertUserTimeToClientTimeZone(date: Date, adjustOffset?: boolean): Date;
    /**
     * Strip the time from the given date (return a new date) such that the new date is of 12:00:00 AM
     */
    function stripTimeFromDate(date: Date): Date;
    /**
     * Get the equivalent of "Now" in the user's time zone.
     */
    function getNowInUserTimeZone(): Date;
    /**
     * Get the equivalent of "Today" (date as of midnight) in the user's time zone
     */
    function getTodayInUserTimeZone(): Date;
    /**
     * @param date The Date object to format
     * @param format Date string format
     * @return
     */
    function format(date: Date, format?: string): string;
    /**
     * Generate a string indicating how long ago the date is.
     *
     * @param date The Date object to format
     * @param now
     * @return A friendly string
     */
    function ago(date: Date, now?: Date): string;
    /**
     * Adds days to a given date
     *
     * @param date The Date object to add to
     * @param days Number of days to add
     * @param adjustOffset is true then the offset will be adjusted if the offset between the date passed
     * and the date obtained after adding days is different.
     *
     */
    function addDays(date: Date, days: number, adjustOffset?: boolean): Date;
    /**
     * Adds hours to a given date
     *
     * @param date The Date object to add to
     * @param hours Number of hours to add
     * @param adjustOffset is true then the offset will be adjusted if the offset between the date passed
     * and the date obtained after adding hours is different.
     *
     */
    function addHours(date: Date, hours: number, adjustOffset?: boolean): Date;
    /**
     * Adjusts the time zone offset by applying the time difference in the offsets.
     *
     * @param oldDate The Date object which was used before time zone changed.
     * @param newDate The Date object which was used after time zone changed.
     */
    function adjustOffsetForTimes(oldDate: Date, newDate: Date, applicationDate?: Date): Date;
    /**
     * Gets the offset of the date passed in.
     *
     * @param date The Date object for which the offset is required.
     * @param defaultToUtcOffset A value indicating whether the server side set utc offset should be returned if no offset for date is returned.
     */
    function getOffsetForDate(date: Date): number;
    /**
     * Checks whether given day is today in user timezone
     *
     * @param date The Date object to check
     */
    function isGivenDayToday(date: Date): boolean;
    /**
     * Checks whether given day is a day in past in user timezone
     *
     * @param date The Date object to check
     */
    function isGivenDayInPast(date: Date): boolean;
    /**
     * Checks whether given day is a day in future in user timezone
     *
     * @param date The Date object to check
     */
    function isGivenDayInFuture(date: Date): boolean;
    /**
     * Get a user friendly string for a date that indicates how long ago the date was. e.g. "4 hours ago", "Tuesday", "7/4/2012".
     *
     * @param date The Date object to format
     * @param now
     * @return A string version of the date.
     */
    function friendly(date: Date, now?: Date): string;
}
export declare module ArrayUtils {
    /**
     * Returns the first element of an array that matches the predicate.
     *
     * @param array Array used to perform predicate.
     * @param predicate The Predicate function.
     * @return The first element that matches the predicate.
     */
    function first<T>(array: T[], predicate?: (value: T) => boolean): T;
    function arrayContains<S, T>(value: S, target: T[], comparer?: (s: S, t: T) => boolean): boolean;
    function arrayEquals<S, T>(source: S[], target: T[], comparer?: (s: S, t: T) => boolean, nullResult?: boolean): boolean;
    /**
     * Take an array of values and convert it to a dictionary/lookup table.
     * @param array Values to convert
     * @param getKey Function to get the key for a given item
     * @param getValue Optional function to get teh value for a given item (defaults to the item itself)
     * @param throwOnDuplicateKeys Optional value indicating to throw an error when duplicate keys are present. Otherwise just overwrite any duplicates
     * @return
     */
    function toDictionary<TArray, TValue>(array: TArray[], getKey: (item: TArray, index: number) => string, getValue?: (item: TArray, index: number) => TValue, throwOnDuplicateKeys?: boolean): IDictionaryStringTo<TValue>;
    /**
     * @param array
     * @param value
     * @param comparer
     * @return
     */
    function contains<T>(array: T[], value: T, comparer?: IComparer<any>): boolean;
    /**
     * @param array
     * @param predicate
     * @return
     */
    function findIndex<T>(array: T[], predicate: IFunctionPR<T, boolean>): number;
    /**
     * @param arrayA
     * @param arrayB
     * @param comparer
     * @return
     */
    function intersect<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
    /**
     * Helper method used to intersect arrays of strings or numbers
     *
     * @param arrayA
     * @param arrayB
     * @param caseInsensitive
     * @return
     */
    function intersectPrimitives<T>(arrayA: T[], arrayB: T[], caseInsensitive?: boolean): T[];
    /**
     * @param arrayA
     * @param arrayB
     * @param comparer
     * @return
     */
    function union<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
    /**
     * Sorts and removes duplicate elements
     *
     * @param array
     * @param comparer
     * @return
     */
    function uniqueSort<T>(array: T[], comparer?: IComparer<T>): T[];
    /**
     * @param array
     * @param comparer
     * @return
     */
    function unique<T>(array: T[], comparer?: IComparer<T>): T[];
    /**
     * @param arrayA
     * @param arrayB
     * @param comparer
     * @return
     */
    function subtract<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
    /**
     * Reorders an array by moving oldIndex + the "count" next elements to the newIndex in the array
     *
     * @param array
     * @param oldIndex The index of the array element to move
     * @param newIndex The index of the array to insert the element at
     * @param count The number of subsequent, contiguous elements to take with the oldIndex in the reorder
     */
    function reorder<T>(array: T[], oldIndex: number, newIndex: number, count: number): T[];
    /**
     * @param array
     * @param comparer
     * @return
     */
    function flagSorted<T>(array: T[], comparer: IComparer<T>): void;
    /**
     * @param toArray
     * @param fromArray
     * @return
     */
    function copySortFlag<T>(toArray: T[], fromArray: T[]): void;
    /**
     * @param array
     * @param comparer
     * @return
     */
    function isSorted<T>(array: T[], comparer: IComparer<T>): boolean;
    /**
     * @param array
     * @param comparer
     * @return
     */
    function sortIfNotSorted<T>(array: T[], comparer: IComparer<T>): boolean;
    /**
     * @param array
     * @return
     */
    function clone<T>(array: T[]): T[];
    /**
     * @param array
     * @param item
     * @return
     */
    function indexOf<T>(array: T[], item: T): number;
    /**
     * @param array
     * @param item
     */
    function add<T>(array: T[], item: T): void;
    /**
     * @param array
     * @param items
     */
    function addRange<T>(array: T[], items: T[]): void;
    /**
     * @param array
     * @param item
     * @return
     */
    function remove<T>(array: T[], item: T): boolean;
    /**
     * @param array
     */
    function clear<T>(array: T[]): void;
}
export declare module StringUtils {
    var EmptyGuidString: string;
    var empty: string;
    var newLine: string;
    var tab: string;
    var lineFeed: string;
    /**
     * 		HTML Encodes the string. Use this method to help prevent cross site scripting attacks
     *     by cleaning text which may contain HTML elements before the string is display in a web page.
     *
     *
     * @param str The string to be encoded
     * @return A copy of the current string which has been HTML encoded
     */
    function htmlEncode(str: string): string;
    /**
     * 		HTML Encodes the string. Use this method to help prevent cross site scripting attacks
     *     by cleaning text which may contain HTML elements before the string is display in a web page.
     *     Does not encode single quotes.
     *
     *
     * @param str The string to be encoded
     * @return A copy of the current string which has been HTML encoded
     */
    function htmlEncodeJavascriptAttribute(str: string): string;
    /**
     * 		HTML Decodes the string.
     *
     *
     * @param str The string to be decoded
     * @return A copy of the current string which has been HTML decoded
     */
    function htmlDecode(str: string): string;
    /**
     * 		HTML Decodes the string.
     *
     *
     * @param str The string to be decoded
     * @return
     *    A copy of the current string which has been HTML decoded.
     *    > < etc are converted back to HTML form(<, > etc)
     *
     */
    function decodeHtmlSpecialChars(str: string): string;
    /**
     * 		HTML encodes the string and replaces newlines with HTML break tags.
     * 		Use this method to maintain line breaks when displaying strings.
     *
     *
     * @param str The string to be encoded.
     * @return A copy of the current string which has been HTML encoded
     */
    function nl2br(str: string): string;
    /**
    *	returns a string with the first letter as UpperCase and the rest lower case
    *   Assumes the string is trimmed (no leading white-space) and starts with a valid character
    *   if the first char is not an alphabet, no char will be made upper case
    * @param str  The string to be converted.</param>
    * @return A copy of the current string which has been sentence cased
    */
    function toSentenceCase(str: string): string;
    /**
     * @param a
     * @param b
     * @return
     */
    function defaultComparer(a: string, b: string): number;
    /**
     * @param a
     * @param b
     * @return
     */
    function ignoreCaseComparer(a: string, b: string): number;
    /**
     * @param a
     * @param b
     * @return
     */
    function localeComparer(a: string, b: string): number;
    /**
     * @param a
     * @param b
     * @return
     */
    function localeIgnoreCaseComparer(a: string, b: string): number;
    /**
    * Compares 2 strings for equality.
    *
    * @param a First string to compare
    * @param b Second string to compare
    * @param ignoreCase If true, do a case-insensitive comparison.
    */
    function equals(a: string, b: string, ignoreCase?: boolean): boolean;
    /**
     * @param str
     * @param prefix
     * @param comparer
     * @return
     */
    function startsWith(str: string, prefix: string, comparer?: IComparer<string>): boolean;
    /**
     * @param str
     * @param suffix
     * @param comparer
     * @return
     */
    function endsWith(str: string, suffix: string, comparer?: IComparer<string>): boolean;
    /**
     * @param str
     * @param subStr
     * @return
     */
    function caseInsensitiveContains(str: string, subStr: string): boolean;
    /**
     * @param format
     * @param args
     * @return
     */
    function format(format: string, ...args: any[]): string;
    /**
     * @param format
     * @param args
     * @return
     */
    function localeFormat(format: string, ...args: any[]): string;
    function containsControlChars(str: string): boolean;
    function containsMismatchedSurrogateChars(str: string): boolean;
    /**
     *  Base64 encodes the string. Uses the native version if available.
     *  @param s The string that should be encoded.
     *  @return The string in base64 encoding.
     */
    function base64Encode(s: string): string;
    function isGuid(str: string): boolean;
}
export declare module NumberUtils {
    /**
     * @param a
     * @param b
     * @return
     */
    function defaultComparer(a: any, b: any): number;
    /**
     * Converts this number to a string in the current culture's locale
     * without specifying a precision. So, for example, with Spanish culture,
     * (3) gets translated to "3", and (3.1416) becomes "3,1416". The jQuery's
     * localeFormat requires a precision (the default is "2" if not specified).
     * So 3.localeFormat("N") become "3,00".
     *
     * @param num  The Number to format
     * @param includeGroupSeparators If true, use locale-specific
     * group separators (i.e. 3,000) in the output
     * @param cultureInfo Culture info (CurrentCulture if not specified)
     * @return
     */
    function toDecimalLocaleString(num: number, includeGroupSeparators?: boolean, cultureInfo?: any): string;
    /**
     * @param value
     * @return
     */
    function parseLocale(value: string): number;
    /**
     * @param value
     * @return
     */
    function isPositiveNumber(value: any): boolean;
    /**
     * @param value
     * @return
     */
    function parseInvariant(value: string): number;
    /**
     * @param value
     * @param format
     * @return
     */
    function localeFormat(value: number, format: string): string;
}
/**
* Utility class for file-related operations.
*/
export declare module FileUtils {
    /**
    * File encoding values.
    */
    enum FileEncoding {
        Unknown = 0,
        Binary = 1,
        ASCII = 2,
        UTF8 = 3,
        UTF32_BE = 4,
        UTF32_LE = 5,
        UTF16_BE = 6,
        UTF16_LE = 7,
    }
    function tryDetectFileEncoding(base64Content: string): FileEncoding;
}
/**
* Path-related Utility methods
*/
export declare module PathUtils {
    /**
    * Combine 2 path segments using the given separator ("/" is the default)
    *
    * @param path1 First path segment
    * @param path2 Second path segment
    * @param pathSeparator Optional path separator ("/" is the default)
    * @return combined string
    */
    function combinePaths(path1: string, path2: string, pathSeparator?: string): string;
    /**
    * Ensure that the given path ends with a separator. If not, add the separator to the end.
    *
    * @param path Path to verify
    * @param pathSeparator Optional path separator ("/" is the default)
    * @return resulting string that ends with the separator
    */
    function ensureTrailingSeparator(path: string, pathSeparator?: string): string;
}
export declare module BoolUtils {
    /**
     * @param value
     * @return
     */
    function parse(value: string): boolean;
}
export declare module UserAgentUtils {
    function isWindowsClient(): boolean;
    function getUserAgent(): string;
}
export declare class DisposalManager implements IDisposable {
    /**
     * List of disposables.
     */
    private _disposables;
    constructor();
    /**
     * Add the specified disposable to the list.
     *
     * @param disposable Disposable to be added to the list.
     */
    addDisposable<TDisposable extends IDisposable>(disposable: TDisposable): TDisposable;
    /**
     * Disposes all disposables.
     */
    dispose(): void;
}
export declare module AnchorLinkUtils {
    /**
    * Finds an anchor according to HTML 5 Specifications - Navigating to a fragment identifier
    * Relevant parts:
    *  If there is an element in the DOM that has an ID exactly equal to decoded fragid, then the
    *    first such element in tree order is the indicated part of the document; stop the
    *    algorithm here.
    *  No decoded fragid: If there is an a element in the DOM that has a name attribute whose
    *    value is exactly equal to fragid (not decoded fragid), then the first such element in
    *    tree order is the indicated part of the document; stop the algorithm here.
    *  If fragid is an ASCII case-insensitive match for the string top, then the indicated part of
    *    the document is the top of the document; stop the algorithm here.
    *  Otherwise, there is no indicated part of the document.
    *
    * @param name The name of the anchor.
    * @param container The container in which to search for the anchor.
    * @return The element corresponding to the anchor or the container itself if the anchor refers
    *         to the top.
    */
    function findAnchorInContainer(name: string, container: JQuery): JQuery;
}
export declare module GUIDUtils {
    /**
     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
     * @return New GUID.(UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
     * @notes This code is taken from \WebAccess\Search\Scripts\TFS.Search.Helpers.ts and \WebAccess\Build\Scripts\TFS.BuildvNext.WebApi.ts
     * @notes Disclaimer: This implementation uses non-cryptographic random number generator so absolute uniqueness is not guarantee.
     */
    function newGuid(): string;
}
export declare function unpackIntegerArray(array: number[]): number[];
export declare function getCookie(cookieName: string): string;
export declare function parseMSJSON(data: any, secure: boolean): any;
export declare function stringifyMSJSON(object: any): string;
/**
 * Parse data from a JSON Island into an object
 *
 * @param $context The context in which to search for the JSON data
 * @param selectionFilter An optional selector that will filter the selection of JSON islands found.
 * @param remove .
 * @return
 */
export declare function parseJsonIsland($context: JQuery, selectionFilter?: string, remove?: boolean): any;
export declare function findTreeNode(path: string, separator: string, comparer: IComparer<string>, textField: string): any;
export declare function calculateTreePath(includeRoot: boolean, separator: string, textField: string, rootField: string): string;
export declare function walkTree(f: IFunctionPPR<any, any, void>): void;
export interface IFilterGroup {
    start: number;
    end: number;
    level: number;
}
export declare function updateFilterGroups(groups: IFilterGroup[], clauseNumber: number, insert: boolean): IFilterGroup[];
export declare function updateFilterGroupLevels(groups: IFilterGroup[]): number;
/**
 * Converts the specified value to a display string.
 *
 * @param value The value to convert.
 * @param format The value to convert.
 */
export declare function convertValueToDisplayString(value: any, format?: string): string;
/**
 * Parses a comma and/or semicolumn delimited string of email addresses into an array of the addresses.
 *
 * @param emailAddressesString A comma and/or semicolumn delimited string of email addresses
 * @return The parsed array of email addresses.
 */
export declare function parseEmailAddressesStringToArray(emailAddressesString: string): string[];
export declare function domToXml(xmlNode: any): string;
export declare function parseXml(xml: string): any;
export declare class Dictionary {
    private _TKey;
    private _TValue;
    private _items;
    private _allowNullKey;
    private _throwOnKeyMissing;
    private _count;
    /**
     * A 'typed' dictionary that mirrors the .NET IDictionary interface.
     *
     * @param TKey The type for the dictionary keys.
     * @param TValue The type for the dictionary values.
     * @param options Options for controlling the dictionary:
     *    allowNullKey: if true, allows null values for the key. Default: false
     *    throwOnKeyMissing: if true, will throw when retrieving a value who's key does not exist in the dictionary. Default false.
     */
    constructor(TKey: any, TValue: any, options?: any);
    count(): number;
    /**
     * @param value
     */
    item(key: any, value?: any): any;
    keys(): any;
    values(): any;
    add(key: any, value: any): void;
    clear(): void;
    containsKey(key: any): any;
    get(key: any): any;
    remove(key: any): void;
    set(key: any, value: any): void;
    tryGetValue(key: any, out: any): boolean;
    private _checkKey(key);
    private _set(key, value);
}
