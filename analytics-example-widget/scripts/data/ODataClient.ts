import * as Q from 'q';
import { authTokenManager } from "VSS/Authentication/Services";

/**Responsiblities:
 * 1-Provides methods for determining Analytics Service OData endpoint address.
 * 2-Constructs OData HTTP requests via GET and POST method  
 * 
 * Note: VSTS Reporting team intends to provide a generated OData Client API from Analytics service, on a similar pattern to VSTS REST API's,
 * however client generation for OData is not a ready capability at the time this sample was authored.
 **/
export class ODataClient {
    private static instance: IPromise<ODataClient> = null;
    private authToken: string;
    private static oDataVersion = "v1.0";
    public static valueKey = "value";

    private constructor(authToken: string) {
        this.authToken = authToken;
    }

    /**
     * Get or create promise to a shared Instance of client, initialized with VSS Auth token.
     */
    public static getInstance(): IPromise<ODataClient> {
        if (ODataClient.instance) {
            return ODataClient.instance;
        } else {
            ODataClient.instance = VSS.getAccessToken().then((token) => {
                let authToken = authTokenManager.getAuthorizationHeader(token);
                return new ODataClient(authToken);
            });
            return ODataClient.instance;
        }
    }

    public getODataEndpoint(accountName: string, projectName: string): string {
        let projectSegment = projectName != null ? `${projectName}/` : "";
        return `https://${accountName}.analytics.visualstudio.com/${projectSegment}_odata/${ODataClient.oDataVersion}/`;
    }

    private constructJsonRequest(authToken: string, type: string, url: string): JQuery.AjaxSettings {
        return {
            type: type,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', authToken);
            }
        }
    }

    private constructXmlRequest(authToken: string, type: string, url: string): JQuery.AjaxSettings {
        return {
            type: type,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', authToken);
            }
        }
    }

    /* Generates an account scoped odata url, which spans across projects.*/
    public generateAccountLink(oDataQuery: string) {
        var accountName = VSS.getWebContext().account.name;
        return this.getODataEndpoint(accountName, null) + oDataQuery;
    }

    /**
     * Generates an OData url scoped to the specified project name or guid
     */
    public generateProjectLink(project: string, oDataQuery: string) {
        var accountName = VSS.getWebContext().account.name;
        return this.getODataEndpoint(accountName, project) + oDataQuery;
    }

    /**
     * Generates an OData url scoped to the current project
     */
    public generateCurrentProjectLink(oDataQuery: string) {
        var accountName = VSS.getWebContext().account.name;
        var project = VSS.getWebContext().project.name;
        return this.getODataEndpoint(accountName, project) + oDataQuery;
    }

    /**
     * OData traditional OData GET Queries is fine for common/simple queries, less than ~4k long.
     */
    public runGetQuery(fullQueryUrl: string): IPromise<any> {
        return $.ajax(this.constructJsonRequest(this.authToken, "GET", fullQueryUrl));
    }

    /**
     * OData POST Query is neccessary for long queries, particularly user config-driven options which can entail long lists of params.
     */
    public runPostQuery(fullQueryUrl: string): IPromise<any> {
        let contentRequest = this.constructJsonRequest(this.authToken, "POST", this.generateAccountLink("$batch"));

        let batchIdentifier = GUIDUtil.newGuid();
        contentRequest.data = this.generateODataPostPayload(fullQueryUrl, batchIdentifier);
        contentRequest.processData = false; // payload is already a string
        contentRequest.headers = {
            "Content-Type": `multipart/mixed; boundary=batch_${batchIdentifier}`,
            "Accept": `text/plain;api-version=${ODataClient.oDataVersion}`
        };

        return $.ajax(contentRequest);
    }

   
    /**
     * Generates an OData Payload, acccording to OData POST/Batch contract. Note, this only supplies a single request
     * @param getUrl The long-form URL for the request
     * @param batchIdentifier Unique identifier of this batch request
     */
    private generateODataPostPayload(getUrl: string, batchIdentifier: string): string {
        let newLine = "\n";
        return `--batch_${batchIdentifier}` + newLine +
            "Content-Type: application/http" + newLine +
            "Content-Transfer-Encoding: binary" + newLine + newLine +
            `GET ${getUrl} HTTP/1.1` + newLine + newLine +
            `--batch_${batchIdentifier}`;
    }

    /**
     * Handles Requests for Metadata Queries on Entities.
     */
    public runMetadataQuery(projectName:string, entityName: string): IPromise<any> {        
        return $.ajax(this.constructXmlRequest(this.authToken, "GET", this.generateProjectLink(projectName, entityName)));
    }

}

class GUIDUtil {
    /**
     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
     * @return New GUID.(UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
     * @notes Disclaimer: This implementation uses non-cryptographic random number generator so absolute uniqueness is not guaranteed.
     */
    public static newGuid(): string {
        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        var clockSequenceHi = (128 + Math.floor(Math.random() * 64)).toString(16);
        return GUIDUtil.oct(8) + "-" + GUIDUtil.oct(4) + "-4" + GUIDUtil.oct(3) + "-" + clockSequenceHi + GUIDUtil.oct(2) + "-" + GUIDUtil.oct(12);
    }

    /**
     * Generated non-zero octet sequences for use with GUID generation.
     *
     * @param length Length required.
     * @return Non-Zero hex sequences.
     */
    private static oct(length?: number): string {
        if (!length) {
            return (Math.floor(Math.random() * 0x10)).toString(16);
        }

        var result: string = "";
        for (var i: number = 0; i < length; i++) {
            result += GUIDUtil.oct();
        }

        return result;
    }
}