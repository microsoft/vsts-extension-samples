import Contracts = require("VSS/FileContainer/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class FileContainerHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * Creates the specified item in the container referenced container.
     *
     * @param {number} containerId
     * @param {string} itemPath
     * @param {string} scope - A guid representing the scope of the container. This is often the project id.
     * @return IPromise<Contracts.FileContainerItem>
     */
    createItem(containerId: number, itemPath: string, scope?: string): IPromise<Contracts.FileContainerItem>;
    /**
     * Creates the specified items in in the referenced container.
     *
     * @param {VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.FileContainerItem[]>} items
     * @param {number} containerId
     * @param {string} scope - A guid representing the scope of the container. This is often the project id.
     * @return IPromise<Contracts.FileContainerItem[]>
     */
    createItems(items: VSS_Common_Contracts.VssJsonCollectionWrapperV<Contracts.FileContainerItem[]>, containerId: number, scope?: string): IPromise<Contracts.FileContainerItem[]>;
    /**
     * Deletes the specified items in a container.
     *
     * @param {number} containerId - Container Id.
     * @param {string} itemPath - Path to delete.
     * @param {string} scope - A guid representing the scope of the container. This is often the project id.
     * @return IPromise<void>
     */
    deleteItem(containerId: number, itemPath: string, scope?: string): IPromise<void>;
    /**
     * Gets containers filtered by a comma separated list of artifact uris within the same scope, if not specified returns all containers
     *
     * @param {string} scope - A guid representing the scope of the container. This is often the project id.
     * @param {string} artifactUris
     * @return IPromise<Contracts.FileContainer[]>
     */
    getContainers(scope?: string, artifactUris?: string): IPromise<Contracts.FileContainer[]>;
    /**
     * Gets the specified file container object in a format dependent upon the given parameters or HTTP Accept request header
     *
     * @param {number} containerId - The requested container Id
     * @param {string} scope - A guid representing the scope of the container. This is often the project id.
     * @param {string} itemPath - The path to the item of interest
     * @param {boolean} metadata - If true, this overrides any specified format parameter or HTTP Accept request header to provide non-recursive information for the given itemPath
     * @param {string} format - If specified, this overrides the HTTP Accept request header to return either 'json' or 'zip'.  If $format is specified, then api-version should also be specified as a query parameter.
     * @param {string} downloadFileName - If specified and returning other than JSON format, then this download name will be used (else defaults to itemPath)
     * @param {boolean} includeDownloadTickets
     * @return IPromise<Contracts.FileContainerItem[]>
     */
    getItems(containerId: number, scope?: string, itemPath?: string, metadata?: boolean, format?: string, downloadFileName?: string, includeDownloadTickets?: boolean): IPromise<Contracts.FileContainerItem[]>;
}
