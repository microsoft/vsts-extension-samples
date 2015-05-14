/// <reference path="References/VSS-Common.d.ts" />
export declare var perfCollector: PerfTracePointCollector;
export declare var logLevel: number;
export declare function getDebugMode(): boolean;
export declare function setDebugMode(debugModeEnabled: boolean): void;
export declare enum StampEvent {
    SinglePoint = 0,
    Enter = 1,
    Leave = 2,
}
export declare function timeStamp(label: string, event: StampEvent): void;
export declare class Measurement {
    private label;
    /**
     * Begin new measurement
     *
     * @param label Name of the measurement
     * @param callback Callback to end measurement
     */
    static start(label: string, callback: (measurement: Measurement) => void): void;
    constructor(label: string);
    /**
     * Ends this measurement
     */
    finish(): void;
}
export declare enum LogVerbosity {
    Off = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Verbose = 4,
}
/**
 * Log a message to the debug output windows and all other trace listeners
 *
 * @param level A log verbosity value from VSS.Diag.logVerbosity
 * @param message Message to send to all trace listeners
 */
export declare function log(level: number, message: string): void;
export declare function logError(message: string): void;
export declare function logWarning(message: string): void;
export declare function logInfo(message: string): void;
export declare function logVerbose(message: string): void;
/**
 * Add a listener to listen for logged messages
 *
 * @param callback A callback method that gets called whenever something is logged
 */
export declare function listen(callback: IResultCallback): void;
/**
 * Remove a log message listener
 *
 * @param callback Listener to remove
 */
export declare function unlisten(callback: IResultCallback): void;
/**
 * Updates the start/end trace points used when creating a profile.
 *
 * @param startTracePointName The trace point to begin the profile.
 * @param endTracePointName The trace point that will ned the profile.
 */
export declare function profile(startTracePointName: string, endTracePointName: string): void;
/**
 * Explicitly end the profile.
 */
export declare function profileEnd(): void;
/**
 * Logs a trace point which can be consumed by a trace point collector for performance analysis.
 *
 * @param tracePointName Name of the trace point
 * @param data (Optional) Data corresponding to the event that occurred.
 */
export declare function logTracePoint(tracePointName: string, data?: any): void;
/**
 * Add a collector to handle trace points
 *
 * @param collector Method(tracePointName, data) called when trace points are logged.
 */
export declare function addTracePointCollector(collector: Function): void;
/**
 * Remove a trace point collector
 *
 * @param collector Collector to remove
 */
export declare function removeTracePointCollector(collector: Function): void;
/**
 * Sets the minimum level at which logged statements get captured and reported to the browser console.
 *
 * @param level Level which gets logged to the console
 */
export declare function setLogLevel(level: number): void;
export interface ITracePoint {
    name: string;
    time: number;
    data: any;
}
export declare class PerfTracePointCollector {
    private _tracePoints;
    private _overallCounts;
    private _activeCounts;
    private _moduleInitTime;
    private _lastResetTime;
    private _lastResetIndex;
    constructor();
    register(): void;
    getOverallCount(tracePointName: string): number;
    getActiveCount(tracePointName: string): number;
    getLastTracePoint(tracePointName: string): ITracePoint;
    getLastTracePointTime(tracePointName: string): number;
    resetActiveCount(tracePointName: string): void;
    resetActiveCounts(): void;
    getModuleInitTime(): number;
    getTracePoints(activeOnly: boolean): ITracePoint[];
    getTracePointCountData(tracePointNames: string[]): string;
    dumpTracePoints(activeOnly: boolean): string;
    private _updateCount(dictionary, eventName);
    private _handleTracePoint(tracePointName, tracePointData);
}
export declare function measurePerformance(action: Function, message: string, logLevel?: LogVerbosity): void;
/**
* Any function calls to any members of this class will be stripped out in minified version, see WebPlatform.targets file AjaxMin task call with -debug switch.
* NOTE: You must use Diag or VSS_Diag as alias for the import statment for it to work.
* e.g. import Diag = require("VSS/Diag")
* This will be useful as follows
* 1) We will not have overhead of extra function calls in release version specially in the functions that are called many-many times (e.g. event handlers/processors)
* 2) The size of minified version will not be bloated with the size of message strings and function names
* 3) While debugging will still have flexibility to see the logs depending on the Log level
*/
export declare class Debug {
    /**
     * Sets whether or not to display callers in the stack on assert failures.
     *
     * @param showCallers If true, display callers in the stack of assert failures.
     */
    static setDisplayCallers(showCallers: boolean): void;
    /**
     * Displays a message in the debugger's output window and breaks into the debugger
     *
     * @param message Message to display in the debugger's output window
     */
    static fail(message: string): void;
    /**
     * Checks for a condition, and if the condition is false, displays a message and prompts the user to break into the debuggeription
     *
     * @param condition true to continue to execute code; false to display message and break into the debugger
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assert(condition: boolean, message?: string): void;
    /**
     * Assert that the value is an object and not null.
     *
     * @param value Value to ensure is an object.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsObject(value: any, message?: string): void;
    /**
     * Assert that the value is an object and not null.
     *
     * @param value Value to ensure is an object.
     * @param paramName Name of the parameter that this value is associated with.
     * @param optional If true then the assert will accept falsy values
     */
    static assertParamIsObject(value: any, paramName: string, optional?: boolean): void;
    /**
     * Assert that the value is an array.
     *
     * @param value Value to ensure is an array.
     * @param message (Optional) The message to display. The default is an empty string
     * @param requireNotEmpty (Optional) If true the array will be checked to ensure it is not empty.
     */
    static assertIsArray(value: any, message?: string, requireNotEmpty?: boolean): void;
    /**
     * Assert that the value is an array.
     *
     * @param value Value to ensure is an array.
     * @param paramName (Optional) Name of the parameter that this value is associated with.
     * @param requireNotEmpty (Optional) If true the array will be checked to ensure it is not empty.
     */
    static assertParamIsArray(value: any, paramName?: string, requireNotEmpty?: boolean): void;
    /**
     * Assert that the value is a boolean.
     *
     * @param value Value to ensure is a boolean.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsBool(value: boolean, message?: string): void;
    /**
     * Assert that the value is a boolean.
     *
     * @param value Value to ensure is a boolean.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsBool(value: boolean, paramName: string): void;
    /**
     * Assert that the value is a number.
     *
     * @param value Value to ensure is a number.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsNumber(value: number, message?: string): void;
    /**
     * Assert that the value is a number.
     *
     * @param value Value to ensure is a number.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsNumber(value: number, paramName: string): void;
    /**
     * Assert that the value is an integer.
     *
     * @param value Value to ensure is an integer.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsInteger(value: number, message?: string): void;
    /**
     * Assert that the value is an integer.
     *
     * @param value Value to ensure is an integer.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsInteger(value: number, paramName: string): void;
    /**
     * Assert that the value is a string.
     *
     * @param value Value to ensure is a string.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsString(value: string, message?: string): void;
    /**
     * Assert that the value is a string.
     *
     * @param value Value to ensure is a string.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsString(value: string, paramName: string): void;
    /**
     * Assert that the value is a string and not empty.
     *
     * @param value Value to ensure is a string and not empty.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsStringNotEmpty(value: string, message?: string): void;
    /**
     * Assert that the value is a string and not empty.
     *
     * @param value Value to ensure is a string and not empty.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsStringNotEmpty(value: string, paramName: string): void;
    /**
     * Assert that the value is a function.
     *
     * @param value Value to ensure is a function.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsFunction(value: any, message?: string): void;
    /**
     * Assert that the value is a function.
     *
     * @param value Value to ensure is a function.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsFunction(value: any, paramName: string): void;
    /**
     * Assert that the value is a date.
     *
     * @param value Value to ensure is a date.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsDate(value: any, message?: string): void;
    /**
     * Assert that the value is a date.
     *
     * @param value Value to ensure is a date.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsDate(value: any, paramName: string): void;
    /**
     * Assert that the value is not null or undefined.
     *
     * @param value Value to ensure is not null or undefined.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsNotNull(value: any, message?: string): void;
    /**
     * Assert that the value is not null or undefined.
     *
     * @param value Value to ensure is not null or undefined.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsNotNull(value: any, paramName: string): void;
    /**
     * Assert that the value is not undefined.
     *
     * @param value Value to ensure is not undefined.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsNotUndefined(value: any, message?: string): void;
    /**
     * Assert that the value is undefined.
     *
     * @param value Value to ensure is not undefined.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsNotUndefined(value: any, paramName: string): void;
    /**
     * Assert that the value is a jQuery object.
     *
     * @param value Value to ensure is a jQuery object.
     * @param message (Optional) The message to display. The default is an empty string
     */
    static assertIsJQueryObject(value: any, message?: string): void;
    /**
     * Assert that the value is a jQuery object.
     *
     * @param value Value to ensure is a jQuery object.
     * @param paramName Name of the parameter that this value is associated with.
     */
    static assertParamIsJQueryObject(value: any, paramName: string): void;
    /**
     * Assert that the value is an instance of the expected type.
     *
     * @param value The value to test for the correct type
     * @param type Either the constructor function for a type,
     * or a string matching the return value of the typeof operator. This specified the type
     * to test for.
     * @param message The messge to display on Debug.failure.
     * @param optional Flag to determine whether null and undefined are accepted as values.
     */
    static assertIsType(value: any, type: any, message: string, optional?: boolean): void;
    /**
     * Gets the display name for a type.
     *
     * @param type The string value (from the typeof operator) or a constructor function.
     * @return
     */
    static getTypeName(type: any): string;
    /**
     * Assert that the parameter is an instance of the expected type.
     *
     * @param value The value to test for the correct type
     * @param type Either the constructor function for a type,
     * or a string matching the return value of the typeof operator. This specified the type
     * to test for.
     * @param paramName The name of the parameter.
     * @param optional Flag to determine whether null and undefined are accepted as values.
     */
    static assertParamIsType(value: any, type: any, paramName: string, optional?: boolean): void;
    static logInfo(message: string): void;
    static logVerbose(message: string): void;
}
