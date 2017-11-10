/**
    Very simple batch response parser. Only processes the first operation's response.

    Expects well formed batch responses like:
        --batchresponse_08764fd4-3946-4cd6-97cf-1ec7d9740551
        Content-Type: application/http
        Content-Transfer-Encoding: binary

        HTTP/1.1 200 OK
        Content-Type: application/json; odata.metadata=minimal; odata.streaming=true
        OData-Version: 4.0

        {"@odata.context":"https://app.me.tfsallin.net:43526/_odata/$metadata#Projects","value":[{"ProjectSK":"ed2c5089-ffba-4ffc-a6cb-3fcdc0cef924","ProjectId":"ed2c5089-ffba-4ffc-a6cb-3fcdc0cef924","ProjectName":"ODataBatchTest"}]}
        --batchresponse_08764fd4-3946-4cd6-97cf-1ec7d9740551
*/
export class BatchResponseParser {
    private static ResponseStatusRegex: RegExp = /^HTTP\/1\.\d (\d{3}) (.*)/i;
    private static ResponseHeaderRegex: RegExp = /^([^()<>@,;:\\"\/[\]?={} \t]+)\s?:\s?(.*)/;

    // instance vars
    private position : number = 0;
    private content: string;
    private batchSeparator: string;
    private responseLine: any;          // {StatusCode: int, StatusText: string}
    private responseHeaders: any;       // {Content-Type: "", OData-Version: ""}
    private responseContent: string;

    // supply the raw response payload content along with the batch separator (usually a guid like 08764fd4-3946-4cd6-97cf-1ec7d9740551 in example above)
    constructor(content: string, batchSeparator: string)
    {
        this.content = content;
        this.batchSeparator = batchSeparator;

        this.parseRawResponse();
    }

    // read and return the content from current position until next instance of {until}
    private readTo(until: string) : string {
        var start = this.position;
        var end = this.content.indexOf(until, this.position);
        if (end === -1) {
            return null;
        }
        this.position = end + until.length;

        return this.content.substring(start, end);
    }

    private readLine(): string {
        return this.readTo("\r\n");
    }

    /**
     * Parses the raw response content and sets the responseLine, responseHeader, and responseContent values
     */
    private parseRawResponse()
    {
        var responseSeparator = `--${this.batchSeparator}`;
        // read past the start separator
        this.readTo(responseSeparator);

        // read through the emtpy line before the response line skipping batch response headers.
        this.readTo("\r\n\r\n");

        this.responseLine = this.readResponseLine();
        this.responseHeaders = this.readResponseHeaders();

        // read the emtpy line before the response body
        this.readLine();

        this.responseContent = this.readLine();
    }

    // returns response line properties { StatusCode: int, StatusText: string } or null
    private readResponseLine(): any {
        var start = this.position;
        var resLine = this.readLine();
        var match = BatchResponseParser.ResponseStatusRegex.exec(resLine);
        if (match) {
            return { StatusCode: match[1], StatusText: match[2] };
        } else {
            this.position = start; // whatever we read was not the status line
        }
        return null;
    }

    // returns response headers like {Content-Type: string, OData-Version: string}
    private readResponseHeaders(): any {
        var headers = {};
        var start = this.position;
        var line : string;
        var match;

        do {
            start = this.position;
            line = this.readLine();
            match = BatchResponseParser.ResponseHeaderRegex.exec(line);
            if (match !== null) {
                headers[match[1]] = match[2];
            } else {
                this.position = start; // whatever we read was not a header line
            }
        } while (line && match);

        return headers;
    }

    // getters
    public getResponseLine(): any {
        return this.responseLine;
    }
    public getResponseHeaders(): any {
        return this.responseHeaders;
    }
    public getResponseContent(): string {
        return this.responseContent;
    }
}
