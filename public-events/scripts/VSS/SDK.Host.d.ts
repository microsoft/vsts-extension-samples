/// <reference path="References/VSS-Common.d.ts" />
/// <reference path="References/VSS.SDK.Interfaces.d.ts" />
/// <reference path="References/q.d.ts" />
import ControlsCommon = require("VSS/Controls/Common");
/**
* Class which manages showing dialogs in the parent frame
*/
export declare class HostDialogService implements IHostDialogService {
    /**
    * Open a modal dialog in the host frame which will get its content from a contributed control.
    *
    * @param contribution url for dialog contents
    * @param dialogOptions options.title - title of dialog
    * @param contributionConfig Initial configuration to pass to the contribution control.
    * @param postContent Optional data to post to the contribution endpoint. If not specified, a GET request will be performed.
    */
    openDialog(contribution: IContribution, dialogOptions: IHostDialogOptions, contributionConfig?: Object, postContent?: Object): IPromise<IExternalDialog>;
}
/**
* Represents a dialog which hosts an ExternalPart.
*/
export declare class ExternalDialog extends ControlsCommon.ModalDialog implements IExternalDialog {
    private _loadingPromise;
    private _contribution;
    initialize(): void;
    /**
    * Gets an object registered in the dialog's contribution control.
    *
    * @param instanceId Id of the instance to get
    * @param contextData Optional data to pass to the extension for it to use when creating the instance
    * @return Promise that is resolved to the instance (a proxy object that talks to the instance)
    */
    getContributionInstance<T>(instanceId: string, contextData?: any): IPromise<T>;
    onOkClick(e?: JQueryEventObject): any;
}
/**
* Class which manages history of the parent frame
*/
export declare class HostHistoryManager {
    /**
    * Add a callback to be invoked each time the hash navigation has changed
    *
    * @param callback Method invoked on each navigation hash change
    */
    onHashChanged(callback: (hash: string) => void): void;
    /**
    * Gets the current hash.
    */
    getHash(): any;
    /**
    * Sets the provided hash from the hosted content.
    */
    setHash(hash: string): void;
    /**
    * Replace existing hash with the provided hash from the hosted content.
    */
    replaceHash(hash: string): void;
}
