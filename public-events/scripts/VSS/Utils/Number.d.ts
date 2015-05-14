/// <reference path="../References/VSS-Common.d.ts" />
/**
    * @param a
    * @param b
    * @return
    */
export declare function defaultComparer(a: any, b: any): number;
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
export declare function toDecimalLocaleString(num: number, includeGroupSeparators?: boolean, cultureInfo?: any): string;
/**
    * @param value
    * @return
    */
export declare function parseLocale(value: string): number;
/**
    * @param value
    * @return
    */
export declare function isPositiveNumber(value: any): boolean;
/**
    * @param value
    * @return
    */
export declare function parseInvariant(value: string): number;
/**
    * @param value
    * @param format
    * @return
    */
export declare function localeFormat(value: number, format: string): string;
