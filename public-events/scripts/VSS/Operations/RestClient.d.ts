import Contracts = require("VSS/Operations/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class OperationsHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * Gets an operation from the the Id.
     *
     * @param {string} operationId - The id for the operation.
     * @return IPromise<Contracts.Operation>
     */
    getOperation(operationId: string): IPromise<Contracts.Operation>;
}
