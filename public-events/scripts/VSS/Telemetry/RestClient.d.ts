import Contracts = require("VSS/Telemetry/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class CustomerIntelligenceHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.CustomerIntelligenceEvent[]} events
     * @return IPromise<void>
     */
    publishEvents(events: Contracts.CustomerIntelligenceEvent[]): IPromise<void>;
}
