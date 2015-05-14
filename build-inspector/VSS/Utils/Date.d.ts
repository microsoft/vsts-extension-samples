/// <reference path="../References/VSS-Common.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
export declare var utcOffset: number;
export declare var timeZoneMap: Contracts_Platform.DaylightSavingsAdjustmentEntry[];
export declare var MILLISECONDS_IN_MINUTE: number;
export declare var MILLISECONDS_IN_HOUR: number;
export declare var MILLISECONDS_IN_DAY: number;
export declare var MILLISECONDS_IN_WEEK: number;
export declare var DATETIME_MINDATE_UTC_MS: number;
/**
    * Checks whether this date object corresponds to a min date or not
    *
    * @return
    */
export declare function isMinDate(date: Date): boolean;
/**
    * Compares this date object with the given date object
    *
    * @param date1 Date object to compare
    * @param date2 Date object to compare
    * @return
    */
export declare function compare(date1: Date, date2: Date): number;
/**
    * Compare two dates to see if they are equal - returning true if they are equal.
    *
    * @param date1 The first value to compare
    * @param date2 The second value to compare
    * @return
    */
export declare function equals(date1: Date, date2: Date): boolean;
/**
    * Shifts the date to match the UTC date.  This is done by removing the timezone offset which is applied.
    *
    * @param date The date to be converted.
    * @return
    */
export declare function shiftToUTC(date: Date): Date;
/**
    * Shifts the date to match the local date.  This is done by adding the timezone offset to the date.
    *
    * @param date The date to be converted.
    * @return
    */
export declare function shiftToLocal(date: Date): Date;
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
export declare function parseDateString(dateString: string, parseFormat?: string, ignoreTimeZone?: boolean): Date;
/**
    * Returns the number of days between the two dates. Note that any time component is ignored and the dates
    * can be supplied in any order
    *
    * @param startDate The first date
    * @param endDate The second date
    * @param exclusive If true then the result is exclusive of the second date (Mon->Fri==4).
    * Otherwise the date includes the later date (Mon->Fri==5)
    */
export declare function daysBetweenDates(startDate: Date, endDate: Date, exclusive?: boolean): number;
/**
    * @param value Date string
    * @param formats Date string formats
    * @param ignoreTimeZone
    * @return
    */
export declare function parseLocale(value: string, formats?: string[] | string, ignoreTimeZone?: boolean): Date;
/**
    * @param date The Date object to format
    * @param format Date string format
    * @param ignoreTimeZone
    * @return
    */
export declare function localeFormat(date: Date, format?: string, ignoreTimeZone?: boolean): string;
/**
    * Converts a time from the client (e.g. new Date()) to the user's preferred timezone
    *
    * @param date The Date object to convert
    * @param adjustOffset
    *     If true, consider the date portion when converting (get the timezone offset at that particular date).
    *     False indicates to use the current (today's) timezone offset regardless of the date given.
    *
    */
export declare function convertClientTimeToUserTimeZone(date: Date, adjustOffset?: boolean): Date;
/**
    * Converts a time from the user's preferred timezone to the client (e.g. new Date()) timezone
    *
    * @param date The Date object to convert
    * @param adjustOffset
    *     If true, consider the date portion when converting (get the timezone offset at that particular date).
    *     False indicates to use the current (today's) timezone offset regardless of the date given.
    *
    */
export declare function convertUserTimeToClientTimeZone(date: Date, adjustOffset?: boolean): Date;
/**
    * Strip the time from the given date (return a new date) such that the new date is of 12:00:00 AM
    */
export declare function stripTimeFromDate(date: Date): Date;
/**
    * Get the equivalent of "Now" in the user's time zone.
    */
export declare function getNowInUserTimeZone(): Date;
/**
    * Get the equivalent of "Today" (date as of midnight) in the user's time zone
    */
export declare function getTodayInUserTimeZone(): Date;
/**
    * @param date The Date object to format
    * @param format Date string format
    * @return
    */
export declare function format(date: Date, format?: string): string;
/**
    * Generate a string indicating how long ago the date is.
    *
    * @param date The Date object to format
    * @param now
    * @return A friendly string
    */
export declare function ago(date: Date, now?: Date): string;
/**
    * Adds days to a given date
    *
    * @param date The Date object to add to
    * @param days Number of days to add
    * @param adjustOffset is true then the offset will be adjusted if the offset between the date passed
    * and the date obtained after adding days is different.
    *
    */
export declare function addDays(date: Date, days: number, adjustOffset?: boolean): Date;
/**
    * Adds hours to a given date
    *
    * @param date The Date object to add to
    * @param hours Number of hours to add
    * @param adjustOffset is true then the offset will be adjusted if the offset between the date passed
    * and the date obtained after adding hours is different.
    *
    */
export declare function addHours(date: Date, hours: number, adjustOffset?: boolean): Date;
/**
    * Adjusts the time zone offset by applying the time difference in the offsets.
    *
    * @param oldDate The Date object which was used before time zone changed.
    * @param newDate The Date object which was used after time zone changed.
    */
export declare function adjustOffsetForTimes(oldDate: Date, newDate: Date, applicationDate?: Date): Date;
/**
    * Gets the offset of the date passed in.
    *
    * @param date The Date object for which the offset is required.
    * @param defaultToUtcOffset A value indicating whether the server side set utc offset should be returned if no offset for date is returned.
    */
export declare function getOffsetForDate(date: Date): number;
/**
    * Checks whether given day is today in user timezone
    *
    * @param date The Date object to check
    */
export declare function isGivenDayToday(date: Date): boolean;
/**
    * Checks whether given day is a day in past in user timezone
    *
    * @param date The Date object to check
    */
export declare function isGivenDayInPast(date: Date): boolean;
/**
    * Checks whether given day is a day in future in user timezone
    *
    * @param date The Date object to check
    */
export declare function isGivenDayInFuture(date: Date): boolean;
/**
    * Get a user friendly string for a date that indicates how long ago the date was. e.g. "4 hours ago", "Tuesday", "7/4/2012".
    *
    * @param date The Date object to format
    * @param now
    * @return A string version of the date.
    */
export declare function friendly(date: Date, now?: Date): string;
