/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
/**
* Info for the hubs and hub groups applicable for a given context
*/
export interface HubsContext {
    hubGroupsContributionPointId: string;
    selectedHubGroupId: string;
    hubGroups: HubGroup[];
    hubs: Hub[];
}
/**
* Represents a hub group - the first level of navigation
*/
export interface HubGroup {
    id: string;
    name: string;
    uri: string;
    order: number;
    hasHubs: boolean;
}
/**
* Represents a hub - the second level of navigation
*/
export interface Hub {
    id: string;
    name: string;
    groupId: string;
    uri: string;
    order: number;
    isSelected: boolean;
}
/**
* Class to manage fetching hub context
*/
export declare module HubsContextManager {
    /**
    * Get the hub context information from the current page
    */
    function getHubsContext(): HubsContext;
    function getDefaultHubNavigationView(): HubNavigationView;
    function addHub(hub: Hub): void;
    function addHubGroup(hubGroup: HubGroup): void;
    function getSelectedHub(): IPromise<Hub>;
}
/**
* Control that renders the hubs/navigation area at the top of a page
*/
export declare class HubNavigationView extends Controls.BaseControl {
    private static EXTENSION_PATH;
    static MAIN_NAVIGATION_HUB_SELECTOR: string;
    private _$hubgroupSection;
    private _$hubgroupContainer;
    private _$hubContainer;
    private _$hubSection;
    private _hubGroupsInitialized;
    private _hubsInitialized;
    private _selectedHubGroupSet;
    initialize(): void;
    private _loadHubsFromDevModeContributions();
    private _setHubGroupUris(hub?);
    private _decorate();
    updateHubGroupLink(groupId: string, newUrl: string, clickHandler?: (eventObject: JQueryEventObject) => any): void;
    private _drawHubGroups();
    private _drawHubs();
    private _findHubGroup(id);
    private _doesHubGroupExist(id);
    private _doesHubExist(id);
}
/**
* ExternalHub inherits from ExternalPart to support new XDMChannel
*/
export declare class ExternalHub extends Controls.BaseControl {
    private _host;
    private createHost(contribution);
    private beginGetHubContentUri(contribution);
    initialize(): void;
}
