/// <reference path="../References/VSS-Common.d.ts" />
import Service = require("VSS/Service");
/**
* Service to manage file container data
*/
export declare class FileContainerService extends Service.VssService {
    private _httpClient;
    /**
     * Returns a list of file container items
     *
     * @param containerId The id of the container
     * @param callback
     * Success callback, taking one parameter (Contracts.FileContainer[])
     *
     * @param errorCallback Error callback
     */
    beginGetItems(containerId: number, callback: IResultCallback, errorCallback?: IErrorCallback): void;
}
