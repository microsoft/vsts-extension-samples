export interface CustomerIntelligenceEvent {
    area: string;
    feature: string;
    properties: {
        [key: string]: any;
    };
}
export interface WebSessionToken {
    appId: string;
    force: boolean;
    name: string;
    token: string;
}
export declare var TypeInfo: {
    CustomerIntelligenceEvent: {
        fields: any;
    };
    WebSessionToken: {
        fields: any;
    };
};
