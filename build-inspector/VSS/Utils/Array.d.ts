/// <reference path="../References/VSS-Common.d.ts" />
/**
* Returns the first element of an array that matches the predicate.
*
* @param array Array used to perform predicate.
* @param predicate The Predicate function.
* @return The first element that matches the predicate.
*/
export declare function first<T>(array: T[], predicate?: (value: T) => boolean): T;
export declare function arrayContains<S, T>(value: S, target: T[], comparer?: (s: S, t: T) => boolean): boolean;
export declare function arrayEquals<S, T>(source: S[], target: T[], comparer?: (s: S, t: T) => boolean, nullResult?: boolean): boolean;
/**
    * Take an array of values and convert it to a dictionary/lookup table.
    * @param array Values to convert
    * @param getKey Function to get the key for a given item
    * @param getValue Optional function to get teh value for a given item (defaults to the item itself)
    * @param throwOnDuplicateKeys Optional value indicating to throw an error when duplicate keys are present. Otherwise just overwrite any duplicates
    * @return
    */
export declare function toDictionary<TArray, TValue>(array: TArray[], getKey: (item: TArray, index: number) => string, getValue?: (item: TArray, index: number) => TValue, throwOnDuplicateKeys?: boolean): IDictionaryStringTo<TValue>;
/**
    * @param array
    * @param value
    * @param comparer
    * @return
    */
export declare function contains<T>(array: T[], value: T, comparer?: IComparer<any>): boolean;
/**
    * @param array
    * @param predicate
    * @return
    */
export declare function findIndex<T>(array: T[], predicate: IFunctionPR<T, boolean>): number;
/**
    * @param arrayA
    * @param arrayB
    * @param comparer
    * @return
    */
export declare function intersect<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
/**
    * Helper method used to intersect arrays of strings or numbers
    *
    * @param arrayA
    * @param arrayB
    * @param caseInsensitive
    * @return
    */
export declare function intersectPrimitives<T>(arrayA: T[], arrayB: T[], caseInsensitive?: boolean): T[];
/**
    * @param arrayA
    * @param arrayB
    * @param comparer
    * @return
    */
export declare function union<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
/**
    * Sorts and removes duplicate elements
    *
    * @param array
    * @param comparer
    * @return
    */
export declare function uniqueSort<T>(array: T[], comparer?: IComparer<T>): T[];
/**
    * @param array
    * @param comparer
    * @return
    */
export declare function unique<T>(array: T[], comparer?: IComparer<T>): T[];
/**
    * @param arrayA
    * @param arrayB
    * @param comparer
    * @return
    */
export declare function subtract<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
/**
    * Reorders an array by moving oldIndex + the "count" next elements to the newIndex in the array
    *
    * @param array
    * @param oldIndex The index of the array element to move
    * @param newIndex The index of the array to insert the element at
    * @param count The number of subsequent, contiguous elements to take with the oldIndex in the reorder
    */
export declare function reorder<T>(array: T[], oldIndex: number, newIndex: number, count: number): T[];
/**
    * @param array
    * @param comparer
    * @return
    */
export declare function flagSorted<T>(array: T[], comparer: IComparer<T>): void;
/**
    * @param toArray
    * @param fromArray
    * @return
    */
export declare function copySortFlag<T>(toArray: T[], fromArray: T[]): void;
/**
    * @param array
    * @param comparer
    * @return
    */
export declare function isSorted<T>(array: T[], comparer: IComparer<T>): boolean;
/**
    * @param array
    * @param comparer
    * @return
    */
export declare function sortIfNotSorted<T>(array: T[], comparer: IComparer<T>): boolean;
/**
    * @param array
    * @return
    */
export declare function clone<T>(array: T[]): T[];
/**
    * @param array
    * @param item
    * @return
    */
export declare function indexOf<T>(array: T[], item: T): number;
/**
    * @param array
    * @param item
    */
export declare function add<T>(array: T[], item: T): void;
/**
    * @param array
    * @param items
    */
export declare function addRange<T>(array: T[], items: T[]): void;
/**
    * @param array
    * @param item
    * @return
    */
export declare function remove<T>(array: T[], item: T): boolean;
/**
    * @param array
    */
export declare function clear<T>(array: T[]): void;
