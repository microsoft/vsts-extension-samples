import Contracts = require("TFS/Work/Contracts");
import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class WorkHttpClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Get board API
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @return IPromise<Contracts.Board>
     */
    getBoard(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.Board>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.BoardReference[]>
     */
    getBoards(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.BoardReference[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.Capacities>
     */
    getCapacities(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.Capacities>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    getCapacity(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * @param {Contracts.CapacityPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Contracts.TeamMemberCapacity>
     */
    updateCapacity(patch: Contracts.CapacityPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string, teamMemberId: string): IPromise<Contracts.TeamMemberCapacity>;
    /**
     * Get board card settings for the board id or board by name
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    getBoardCardSettings(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * Update board card settings for the board id or board by name
     *
     * @param {Contracts.BoardCardSettings} boardCardSettingsToSave
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardCardSettings>
     */
    updateBoardCardSettings(boardCardSettingsToSave: Contracts.BoardCardSettings, teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardCardSettings>;
    /**
     * Get a board chart
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    getBoardChart(teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * Get board charts
     *
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @return IPromise<Contracts.BoardChartReference[]>
     */
    getBoardCharts(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardChartReference[]>;
    /**
     * Update a board chart
     *
     * @param {{ [key: string] : any; }} settings - The settings to to be updated for the chart
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @param {string} name - The chart name
     * @return IPromise<Contracts.BoardChart>
     */
    updateBoardChart(settings: {
        [key: string]: any;
    }, teamContext: TFS_Core_Contracts.TeamContext, board: string, name: string): IPromise<Contracts.BoardChart>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    getBoardColumns(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * @param {Contracts.BoardColumn[]} boardColumns
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardColumn[]>
     */
    updateBoardColumns(boardColumns: Contracts.BoardColumn[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardColumn[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<void>
     */
    deleteTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<void>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} id
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    getTeamIteration(teamContext: TFS_Core_Contracts.TeamContext, id: string): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} timeframe
     * @return IPromise<Contracts.TeamSettingsIterations>
     */
    getTeamIterations(teamContext: TFS_Core_Contracts.TeamContext, timeframe?: string): IPromise<Contracts.TeamSettingsIterations>;
    /**
     * @param {string} iterationId
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSettingsIteration>
     */
    postTeamIteration(iterationId: string, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSettingsIteration>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    getBoardRows(teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * @param {Contracts.BoardRow[]} boardRows
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} board
     * @return IPromise<Contracts.BoardRow[]>
     */
    updateBoardRows(boardRows: Contracts.BoardRow[], teamContext: TFS_Core_Contracts.TeamContext, board: string): IPromise<Contracts.BoardRow[]>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    getTeamDaysOff(teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * @param {Contracts.TeamSettingsDaysOffPatch} daysOffPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @param {string} iterationId
     * @return IPromise<Contracts.TeamSettingsDaysOff>
     */
    updateTeamDaysOff(daysOffPatch: Contracts.TeamSettingsDaysOffPatch, teamContext: TFS_Core_Contracts.TeamContext, iterationId: string): IPromise<Contracts.TeamSettingsDaysOff>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    getTeamFieldValues(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * @param {Contracts.TeamFieldValuesPatch} patch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamFieldValues>
     */
    updateTeamFieldValues(patch: Contracts.TeamFieldValuesPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamFieldValues>;
    /**
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    getTeamSettings(teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
    /**
     * @param {Contracts.TeamSettingsPatch} teamSettingsPatch
     * @param {TFS_Core_Contracts.TeamContext} teamContext - The team context for the operation
     * @return IPromise<Contracts.TeamSetting>
     */
    updateTeamSettings(teamSettingsPatch: Contracts.TeamSettingsPatch, teamContext: TFS_Core_Contracts.TeamContext): IPromise<Contracts.TeamSetting>;
}
