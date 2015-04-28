/// <reference path="References/VSS-Common.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
/**
 * Parse out the web context information found in JSON island data in the given element.
 */
export declare function parseWebContext($element: JQuery): Contracts_Platform.WebContext;
/**
 * Get the raw JSON of the global context of the current page.
 */
export declare function _getDefaultRawPageContext(): Contracts_Platform.PageContext;
/**
 * Get the default web context for the current page.
 */
export declare function getDefaultWebContext(): Contracts_Platform.WebContext;
/**
 * Get the global page context for the current page.
 */
export declare function getPageContext(): Contracts_Platform.PageContext;
