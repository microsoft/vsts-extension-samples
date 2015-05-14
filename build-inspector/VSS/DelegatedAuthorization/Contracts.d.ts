import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export interface AccessTokenResult {
    accessToken: VSS_Common_Contracts.JsonWebToken;
    accessTokenError: TokenError;
    authorizationId: string;
    hasError: boolean;
    refreshToken: RefreshTokenGrant;
    tokenType: string;
    validTo: Date;
}
export declare enum AppSessionTokenError {
    None = 0,
    UserIdRequired = 1,
    ClientIdRequired = 2,
    InvalidUserId = 3,
    InvalidUserType = 4,
    AccessDenied = 5,
    FailedToIssueAppSessionToken = 6,
    InvalidClientId = 7,
}
export interface AuthorizationGrant {
    grantType: GrantType;
}
export declare enum ClientType {
    Confidential = 0,
    Public = 1,
    MediumTrust = 2,
}
export declare enum GrantType {
    None = 0,
    JwtBearer = 1,
    RefreshToken = 2,
    Implicit = 3,
}
export declare enum HostAuthorizationError {
    None = 0,
    ClientIdRequired = 1,
    AccessDenied = 2,
    FailedToAuthorizeHost = 3,
    ClientIdNotFound = 4,
    InvalidClientId = 5,
}
export interface RefreshTokenGrant extends AuthorizationGrant {
    jwt: VSS_Common_Contracts.JsonWebToken;
}
export interface Registration {
    clientType: ClientType;
    identityId: string;
    isValid: boolean;
    isWellKnown: boolean;
    organizationLocation: string;
    organizationName: string;
    /**
    * Raw cert data string from public key. This will be used for authenticating medium trust clients.
    */
    publicKey: string;
    redirectUris: string[];
    registrationDescription: string;
    registrationId: string;
    registrationLocation: string;
    registrationLogoSecureLocation: string;
    registrationName: string;
    registrationPrivacyStatementLocation: string;
    registrationTermsOfServiceLocation: string;
    responseTypes: string;
    scopes: string;
    secrect: string;
    secretVersionId: string;
}
export declare enum SessionTokenError {
    None = 0,
    DisplayNameRequired = 1,
    InvalidDisplayName = 2,
    InvalidValidTo = 3,
    InvalidScope = 4,
    UserIdRequired = 5,
    InvalidUserId = 6,
    InvalidUserType = 7,
    AccessDenied = 8,
    FailedToIssueAccessToken = 9,
    InvalidClient = 10,
    InvalidClientType = 11,
    InvalidClientId = 12,
    InvalidTargetAccounts = 13,
    HostAuthorizationNotFound = 14,
    AuthorizationNotFound = 15,
    FailedToUpdateAccessToken = 16,
}
export declare enum SessionTokenType {
    SelfDescribing = 0,
    Compact = 1,
}
export declare enum TokenError {
    None = 0,
    GrantTypeRequired = 1,
    AuthorizationGrantRequired = 2,
    ClientSecretRequired = 3,
    RedirectUriRequired = 4,
    InvalidAuthorizationGrant = 5,
    InvalidAuthorizationScopes = 6,
    InvalidRefreshToken = 7,
    AuthorizationNotFound = 8,
    AuthorizationGrantExpired = 9,
    AccessAlreadyIssued = 10,
    InvalidRedirectUri = 11,
    AccessTokenNotFound = 12,
    InvalidAccessToken = 13,
    AccessTokenAlreadyRefreshed = 14,
    InvalidClientSecret = 15,
    ClientSecretExpired = 16,
    ServerError = 17,
    AccessDenied = 18,
    AccessTokenKeyRequired = 19,
    InvalidAccessTokenKey = 20,
    FailedToGetAccessToken = 21,
    InvalidClientId = 22,
    InvalidClient = 23,
    InvalidValidTo = 24,
    InvalidUserId = 25,
    FailedToIssueAccessToken = 26,
}
export interface TokenPairResult {
    accessToken: string;
    hasError: boolean;
    refreshToken: string;
    tokenError: TokenError;
}
export declare var TypeInfo: {
    AccessTokenResult: {
        fields: any;
    };
    AppSessionTokenError: {
        enumValues: {
            "none": number;
            "userIdRequired": number;
            "clientIdRequired": number;
            "invalidUserId": number;
            "invalidUserType": number;
            "accessDenied": number;
            "failedToIssueAppSessionToken": number;
            "invalidClientId": number;
        };
    };
    AuthorizationGrant: {
        fields: any;
    };
    ClientType: {
        enumValues: {
            "confidential": number;
            "public": number;
            "mediumTrust": number;
        };
    };
    GrantType: {
        enumValues: {
            "none": number;
            "jwtBearer": number;
            "refreshToken": number;
            "implicit": number;
        };
    };
    HostAuthorizationError: {
        enumValues: {
            "none": number;
            "clientIdRequired": number;
            "accessDenied": number;
            "failedToAuthorizeHost": number;
            "clientIdNotFound": number;
            "invalidClientId": number;
        };
    };
    RefreshTokenGrant: {
        fields: any;
    };
    Registration: {
        fields: any;
    };
    SessionTokenError: {
        enumValues: {
            "none": number;
            "displayNameRequired": number;
            "invalidDisplayName": number;
            "invalidValidTo": number;
            "invalidScope": number;
            "userIdRequired": number;
            "invalidUserId": number;
            "invalidUserType": number;
            "accessDenied": number;
            "failedToIssueAccessToken": number;
            "invalidClient": number;
            "invalidClientType": number;
            "invalidClientId": number;
            "invalidTargetAccounts": number;
            "hostAuthorizationNotFound": number;
            "authorizationNotFound": number;
            "failedToUpdateAccessToken": number;
        };
    };
    SessionTokenType: {
        enumValues: {
            "selfDescribing": number;
            "compact": number;
        };
    };
    TokenError: {
        enumValues: {
            "none": number;
            "grantTypeRequired": number;
            "authorizationGrantRequired": number;
            "clientSecretRequired": number;
            "redirectUriRequired": number;
            "invalidAuthorizationGrant": number;
            "invalidAuthorizationScopes": number;
            "invalidRefreshToken": number;
            "authorizationNotFound": number;
            "authorizationGrantExpired": number;
            "accessAlreadyIssued": number;
            "invalidRedirectUri": number;
            "accessTokenNotFound": number;
            "invalidAccessToken": number;
            "accessTokenAlreadyRefreshed": number;
            "invalidClientSecret": number;
            "clientSecretExpired": number;
            "serverError": number;
            "accessDenied": number;
            "accessTokenKeyRequired": number;
            "invalidAccessTokenKey": number;
            "failedToGetAccessToken": number;
            "invalidClientId": number;
            "invalidClient": number;
            "invalidValidTo": number;
            "invalidUserId": number;
            "failedToIssueAccessToken": number;
        };
    };
    TokenPairResult: {
        fields: any;
    };
};
