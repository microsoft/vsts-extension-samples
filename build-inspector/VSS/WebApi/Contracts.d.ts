export interface ApiResourceLocation {
    area: string;
    id: string;
    maxVersion: string;
    minVersion: string;
    releasedVersion: string;
    resourceName: string;
    resourceVersion: number;
    routeTemplate: string;
}
export interface ApiResourceVersion {
    apiVersion: string;
    isPreview: boolean;
    resourceVersion: number;
}
export declare enum ConnectOptions {
    None = 0,
    IncludeServices = 1,
}
export interface IdentityRef {
    displayName: string;
    id: string;
    imageUrl: string;
    isAadIdentity: boolean;
    isContainer: boolean;
    profileUrl: string;
    uniqueName: string;
    url: string;
}
export interface JsonPatchDocument {
}
export interface JsonPatchOperation {
    from: string;
    op: Operation;
    path: string;
    value: any;
}
export interface JsonWebToken {
}
export declare enum JWTAlgorithm {
    None = 0,
    HS256 = 1,
    RS256 = 2,
}
export declare enum Operation {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Move = 3,
    Copy = 4,
    Test = 5,
}
export interface Publisher {
    name: string;
    serviceOwnerId: string;
}
export interface ReferenceLink {
    href: string;
}
export interface ResourceRef {
    id: string;
    url: string;
}
export interface ServiceEvent {
    eventType: string;
    publisher: Publisher;
    resource: any;
    resourceContainers: {
        [key: string]: any;
    };
    resourceVersion: string;
}
export interface VssJsonCollectionWrapper extends VssJsonCollectionWrapperBase {
    value: any[];
}
export interface VssJsonCollectionWrapperV<T> extends VssJsonCollectionWrapperBase {
    value: T;
}
export interface VssJsonCollectionWrapperBase {
    count: number;
}
export interface WrappedException {
    errorCode: number;
    eventId: number;
    helpLink: string;
    innerException: WrappedException;
    message: string;
    stackTrace: string;
    typeKey: string;
    typeName: string;
}
export declare var TypeInfo: {
    ApiResourceLocation: {
        fields: any;
    };
    ApiResourceVersion: {
        fields: any;
    };
    ConnectOptions: {
        enumValues: {
            "none": number;
            "includeServices": number;
        };
    };
    IdentityRef: {
        fields: any;
    };
    JsonPatchDocument: {
        fields: any;
    };
    JsonPatchOperation: {
        fields: any;
    };
    JsonWebToken: {
        fields: any;
    };
    JWTAlgorithm: {
        enumValues: {
            "none": number;
            "hS256": number;
            "rS256": number;
        };
    };
    Operation: {
        enumValues: {
            "add": number;
            "remove": number;
            "replace": number;
            "move": number;
            "copy": number;
            "test": number;
        };
    };
    Publisher: {
        fields: any;
    };
    ReferenceLink: {
        fields: any;
    };
    ResourceRef: {
        fields: any;
    };
    ServiceEvent: {
        fields: any;
    };
    VssJsonCollectionWrapper: {
        fields: any;
    };
    VssJsonCollectionWrapperV: {
        fields: any;
    };
    VssJsonCollectionWrapperBase: {
        fields: any;
    };
    WrappedException: {
        fields: any;
    };
};
