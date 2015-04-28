/// <reference path="References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="References/VSS-Common.d.ts" />
export declare function createChannel(targetWindow: Window): IXDMChannel;
/**
* Manages XDM channels per target window/frame
*/
export declare var channelManager: IXDMChannelManager;
/**
* Registered XDM objects
*/
export declare var globalObjectRegistry: IXDMObjectRegistry;
