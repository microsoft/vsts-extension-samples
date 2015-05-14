/// <reference path="../References/VSS-Common.d.ts" />
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
import Service = require("VSS/Service");
export interface IArtifactData {
    uri?: string;
    tool: string;
    type: string;
    id: string;
}
export declare class Artifact {
    static _execute(artifact: Artifact, webContext: Contracts_Platform.WebContext): void;
    static ACTION_ARTIFACT_EXECUTE: string;
    _data: any;
    _error: any;
    constructor(data: IArtifactData);
    getUri(): string;
    getTool(): string;
    getType(): string;
    getId(): string;
    /**
     * @return
     */
    getTitle(): string;
    setError(error: any): void;
    getError(): any;
    execute(webContext: Contracts_Platform.WebContext): any;
    /**
     * @return
     */
    getUrl(webContext: Contracts_Platform.WebContext): string;
}
export declare class LinkingUtilities {
    static VSTFS: string;
    static URI_SEPARATOR: string;
    /**
     * Creates an artifact URI using specified artifact.
     *
     * @param artifact Artifact should have the following properties:
     *     - tool: Artifact tool name
     *     - type: Artifact type
     *     - id: Artifact tool specific id
     * @return
     */
    static encodeUri(artifact: any): string;
    /**
     * Decodes the specified artifact URI and creates artifact object which has tool, type and id properties.
     *
     * @param artifactUri URI to decode
     * @return
     */
    static decodeUri(artifactUri: string): IArtifactData;
    /**
     * Decodes a uri component, maintaining backwards compatibility with how URIs were encoded
     * from the rich client and in VS2010 and earlier versions.
     *
     * @param encodedURIComponent URI component to decode
     * @return
     */
    static legacyDecodeURIComponent(encodedURIComponent: string): string;
}
export declare class ClientLinking extends Service.VssService {
    static MODE_TRANSLATEURL: string;
    static registerArtifactResolver(toolName: string, resolver: any): void;
    static getArtifactResolver(toolName: string): any;
    constructor();
    beginResolveArtifacts(artifactUris: string[], options?: any, callback?: IResultCallback, errorCallback?: IErrorCallback): void;
}
