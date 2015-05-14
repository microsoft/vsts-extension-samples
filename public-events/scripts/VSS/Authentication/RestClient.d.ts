import Contracts = require("VSS/Authentication/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class AuthenticationHttpClient extends VSS_WebApi.VssHttpClient {
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.WebSessionToken} sessionToken
     * @return IPromise<Contracts.WebSessionToken>
     */
    createSessionToken(sessionToken: Contracts.WebSessionToken): IPromise<Contracts.WebSessionToken>;
}
