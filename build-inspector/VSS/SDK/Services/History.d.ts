/// <reference path="../../References/VSS-Common.d.ts" />
/// <reference path="../../References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="../../References/q.d.ts" />
/**
* Class which manages history of the parent frame
*/
export declare class HostHistoryService implements IHostHistoryService {
    /**
    * Add a callback to be invoked each time the hash navigation has changed
    *
    * @param callback Method invoked on each navigation hash change
    */
    onHashChanged(callback: (hash: string) => void): void;
    /**
    * Gets the current hash.
    */
    getHash(): any;
    /**
     * Reloads the parent frame
     */
    reload(): void;
    /**
    * Sets the provided hash from the hosted content.
    */
    setHash(hash: string): void;
    /**
    * Replace existing hash with the provided hash from the hosted content.
    */
    replaceHash(hash: string): void;
}
