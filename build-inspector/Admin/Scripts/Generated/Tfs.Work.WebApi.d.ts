import Tfs_Work_Contracts = require("Admin/Scripts/Generated/Tfs.Work.Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class WorkHttpClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * Get board API
     *
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} id - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @return IPromise<Tfs_Work_Contracts.Board>
     */
    getBoard(project: string, team: string, id: string): IPromise<Tfs_Work_Contracts.Board>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Tfs_Work_Contracts.BoardReference[]>
     */
    getBoards(project: string, team: string): IPromise<Tfs_Work_Contracts.BoardReference[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} iterationId
     * @return IPromise<Tfs_Work_Contracts.Capacities>
     */
    getCapacities(project: string, team: string, iterationId: string): IPromise<Tfs_Work_Contracts.Capacities>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Tfs_Work_Contracts.TeamMemberCapacity>
     */
    getCapacity(project: string, team: string, iterationId: string, teamMemberId: string): IPromise<Tfs_Work_Contracts.TeamMemberCapacity>;
    /**
     * @param {Tfs_Work_Contracts.CapacityPatch} patch
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} iterationId
     * @param {string} teamMemberId
     * @return IPromise<Tfs_Work_Contracts.TeamMemberCapacity>
     */
    patchCapacity(patch: Tfs_Work_Contracts.CapacityPatch, project: string, team: string, iterationId: string, teamMemberId: string): IPromise<Tfs_Work_Contracts.TeamMemberCapacity>;
    /**
     * Get a board chart
     *
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @param {string} name - The chart name
     * @return IPromise<Tfs_Work_Contracts.BoardChart>
     */
    getBoardChart(project: string, team: string, board: string, name: string): IPromise<Tfs_Work_Contracts.BoardChart>;
    /**
     * Get board charts
     *
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board - Identifier for board, either category plural name (Eg:&quot;Stories&quot;) or Guid
     * @return IPromise<Tfs_Work_Contracts.BoardChartReference[]>
     */
    getBoardCharts(project: string, team: string, board: string): IPromise<Tfs_Work_Contracts.BoardChartReference[]>;
    /**
     * @param {{ [key: string] : any; }} settings
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board
     * @param {string} name
     * @return IPromise<Tfs_Work_Contracts.BoardChart>
     */
    updateBoardChart(settings: {
        [key: string]: any;
    }, project: string, team: string, board: string, name: string): IPromise<Tfs_Work_Contracts.BoardChart>;
    /**
     * @param {{ [key: string] : any; }} settings
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board
     * @param {string} boardCategoryReferenceName
     * @return IPromise<{ [key: string] : any; }>
     */
    updateCumulativeFlowChart(settings: {
        [key: string]: any;
    }, project: string, team: string, board: string, boardCategoryReferenceName: string): IPromise<{
        [key: string]: any;
    }>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board
     * @return IPromise<Tfs_Work_Contracts.BoardColumns>
     */
    getBoardColumns(project: string, team: string, board: string): IPromise<Tfs_Work_Contracts.BoardColumns>;
    /**
     * @param {Tfs_Work_Contracts.BoardColumns} boardColumns
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} board
     * @return IPromise<Tfs_Work_Contracts.BoardColumns>
     */
    updateBoardColumns(boardColumns: Tfs_Work_Contracts.BoardColumns, project: string, team: string, board: string): IPromise<Tfs_Work_Contracts.BoardColumns>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} id
     * @return IPromise<void>
     */
    deleteTeamIteration(project: string, team: string, id: string): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} id
     * @return IPromise<Tfs_Work_Contracts.TeamSettingsIteration>
     */
    getTeamIteration(project: string, team: string, id: string): IPromise<Tfs_Work_Contracts.TeamSettingsIteration>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} timeframe
     * @return IPromise<Tfs_Work_Contracts.TeamSettingsIterations>
     */
    getTeamIterations(project: string, team: string, timeframe?: string): IPromise<Tfs_Work_Contracts.TeamSettingsIterations>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} id
     * @return IPromise<void>
     */
    postTeamIteration(project: string, team: string, id: string): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} iterationId
     * @return IPromise<Tfs_Work_Contracts.TeamSettingsDaysOff>
     */
    getTeamDaysOff(project: string, team: string, iterationId: string): IPromise<Tfs_Work_Contracts.TeamSettingsDaysOff>;
    /**
     * @param {Tfs_Work_Contracts.TeamSettingsDaysOffPatch} daysOffPatch
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @param {string} iterationId
     * @return IPromise<Tfs_Work_Contracts.TeamSettingsDaysOff>
     */
    patchTeamDaysOff(daysOffPatch: Tfs_Work_Contracts.TeamSettingsDaysOffPatch, project: string, team: string, iterationId: string): IPromise<Tfs_Work_Contracts.TeamSettingsDaysOff>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Tfs_Work_Contracts.TeamFieldValues>
     */
    getTeamFieldValues(project: string, team: string): IPromise<Tfs_Work_Contracts.TeamFieldValues>;
    /**
     * @param {Tfs_Work_Contracts.TeamFieldValuesPatch} patch
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Tfs_Work_Contracts.TeamFieldValues>
     */
    patchTeamFieldValues(patch: Tfs_Work_Contracts.TeamFieldValuesPatch, project: string, team: string): IPromise<Tfs_Work_Contracts.TeamFieldValues>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Tfs_Work_Contracts.TeamSetting>
     */
    getTeamSettings(project: string, team: string): IPromise<Tfs_Work_Contracts.TeamSetting>;
    /**
     * @param {Tfs_Work_Contracts.TeamSettingsPatch} patch
     * @param {string} project - Project ID or project name
     * @param {string} team - Team ID or team name
     * @return IPromise<Tfs_Work_Contracts.TeamSetting>
     */
    patchTeamSettings(patch: Tfs_Work_Contracts.TeamSettingsPatch, project: string, team: string): IPromise<Tfs_Work_Contracts.TeamSetting>;
}
