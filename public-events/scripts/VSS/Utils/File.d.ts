/// <reference path="../References/VSS-Common.d.ts" />
/**
* File encoding values.
*/
export declare enum FileEncoding {
    Unknown = 0,
    Binary = 1,
    ASCII = 2,
    UTF8 = 3,
    UTF32_BE = 4,
    UTF32_LE = 5,
    UTF16_BE = 6,
    UTF16_LE = 7,
}
export declare function tryDetectFileEncoding(base64Content: string): FileEncoding;
/**
* Combine 2 path segments using the given separator ("/" is the default)
*
* @param path1 First path segment
* @param path2 Second path segment
* @param pathSeparator Optional path separator ("/" is the default)
* @return combined string
*/
export declare function combinePaths(path1: string, path2: string, pathSeparator?: string): string;
/**
* Ensure that the given path ends with a separator. If not, add the separator to the end.
*
* @param path Path to verify
* @param pathSeparator Optional path separator ("/" is the default)
* @return resulting string that ends with the separator
*/
export declare function ensureTrailingSeparator(path: string, pathSeparator?: string): string;
