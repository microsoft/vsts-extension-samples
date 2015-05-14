/// <reference path="../References/VSS-Common.d.ts" />
export declare var EmptyGuidString: string;
export declare var empty: string;
export declare var newLine: string;
export declare var tab: string;
export declare var lineFeed: string;
/**
    * 		HTML Encodes the string. Use this method to help prevent cross site scripting attacks
    *     by cleaning text which may contain HTML elements before the string is display in a web page.
    *
    *
    * @param str The string to be encoded
    * @return A copy of the current string which has been HTML encoded
    */
export declare function htmlEncode(str: string): string;
/**
    * 		HTML Encodes the string. Use this method to help prevent cross site scripting attacks
    *     by cleaning text which may contain HTML elements before the string is display in a web page.
    *     Does not encode single quotes.
    *
    *
    * @param str The string to be encoded
    * @return A copy of the current string which has been HTML encoded
    */
export declare function htmlEncodeJavascriptAttribute(str: string): string;
/**
    * 		HTML Decodes the string.
    *
    *
    * @param str The string to be decoded
    * @return A copy of the current string which has been HTML decoded
    */
export declare function htmlDecode(str: string): string;
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
export declare function decodeHtmlSpecialChars(str: string): string;
/**
    * 		HTML encodes the string and replaces newlines with HTML break tags.
    * 		Use this method to maintain line breaks when displaying strings.
    *
    *
    * @param str The string to be encoded.
    * @return A copy of the current string which has been HTML encoded
    */
export declare function nl2br(str: string): string;
/**
*	returns a string with the first letter as UpperCase and the rest lower case
*   Assumes the string is trimmed (no leading white-space) and starts with a valid character
*   if the first char is not an alphabet, no char will be made upper case
* @param str  The string to be converted.</param>
* @return A copy of the current string which has been sentence cased
*/
export declare function toSentenceCase(str: string): string;
/**
    * @param a
    * @param b
    * @return
    */
export declare function defaultComparer(a: string, b: string): number;
/**
    * @param a
    * @param b
    * @return
    */
export declare function ignoreCaseComparer(a: string, b: string): number;
/**
    * @param a
    * @param b
    * @return
    */
export declare function localeComparer(a: string, b: string): number;
/**
    * @param a
    * @param b
    * @return
    */
export declare function localeIgnoreCaseComparer(a: string, b: string): number;
/**
* Compares 2 strings for equality.
*
* @param a First string to compare
* @param b Second string to compare
* @param ignoreCase If true, do a case-insensitive comparison.
*/
export declare function equals(a: string, b: string, ignoreCase?: boolean): boolean;
/**
    * @param str
    * @param prefix
    * @param comparer
    * @return
    */
export declare function startsWith(str: string, prefix: string, comparer?: IComparer<string>): boolean;
/**
    * @param str
    * @param suffix
    * @param comparer
    * @return
    */
export declare function endsWith(str: string, suffix: string, comparer?: IComparer<string>): boolean;
/**
    * @param str
    * @param subStr
    * @return
    */
export declare function caseInsensitiveContains(str: string, subStr: string): boolean;
/**
    * @param format
    * @param args
    * @return
    */
export declare function format(format: string, ...args: any[]): string;
/**
    * @param format
    * @param args
    * @return
    */
export declare function localeFormat(format: string, ...args: any[]): string;
export declare function containsControlChars(str: string): boolean;
export declare function containsMismatchedSurrogateChars(str: string): boolean;
/**
    *  Base64 encodes the string. Uses the native version if available.
    *  @param s The string that should be encoded.
    *  @return The string in base64 encoding.
    */
export declare function base64Encode(s: string): string;
export declare function isGuid(str: string): boolean;
export declare function isEmptyGuid(str: string): boolean;
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
