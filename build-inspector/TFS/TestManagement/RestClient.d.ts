import Contracts = require("TFS/TestManagement/Contracts");
import VSS_WebApi = require("VSS/WebApi/RestClient");
export declare class TestHttpClient extends VSS_WebApi.VssHttpClient {
    static serviceInstanceId: string;
    constructor(rootRequestPath: string);
    /**
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestResultAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * @param {Contracts.TestAttachmentRequestModel} attachmentRequestModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestAttachmentReference>
     */
    createTestRunAttachment(attachmentRequestModel: Contracts.TestAttachmentRequestModel, project: string, runId: number): IPromise<Contracts.TestAttachmentReference>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} buildId
     * @param {number} flags
     * @return IPromise<Contracts.BuildCoverage[]>
     */
    getBuildCodeCoverage(project: string, buildId: number, flags: number): IPromise<Contracts.BuildCoverage[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} flags
     * @return IPromise<Contracts.TestRunCoverage[]>
     */
    getTestRunCodeCoverage(project: string, runId: number, flags: number): IPromise<Contracts.TestRunCoverage[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestMessageLogDetails[]>
     */
    getTestRunLogs(project: string, runId: number): IPromise<Contracts.TestMessageLogDetails[]>;
    /**
     * @param {Contracts.PlanUpdateModel} testPlan
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestPlan>
     */
    createTestPlan(testPlan: Contracts.PlanUpdateModel, project: string): IPromise<Contracts.TestPlan>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    getPlanById(project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} owner
     * @param {number} skip
     * @param {number} top
     * @param {boolean} includePlanDetails
     * @param {boolean} filterActivePlans
     * @return IPromise<Contracts.TestPlan[]>
     */
    getPlans(project: string, owner?: string, skip?: number, top?: number, includePlanDetails?: boolean, filterActivePlans?: boolean): IPromise<Contracts.TestPlan[]>;
    /**
     * @param {Contracts.PlanUpdateModel} planUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @return IPromise<Contracts.TestPlan>
     */
    updateTestPlan(planUpdateModel: Contracts.PlanUpdateModel, project: string, planId: number): IPromise<Contracts.TestPlan>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} pointIds
     * @param {string} witFields
     * @return IPromise<Contracts.TestPoint>
     */
    getPoint(project: string, planId: number, suiteId: number, pointIds: number, witFields?: string): IPromise<Contracts.TestPoint>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} witFields
     * @param {string} configurationId
     * @param {string} testCaseId
     * @param {string} testPointIds
     * @param {boolean} includePointDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestPoint[]>
     */
    getPoints(project: string, planId: number, suiteId: number, witFields?: string, configurationId?: string, testCaseId?: string, testPointIds?: string, includePointDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestPoint[]>;
    /**
     * @param {Contracts.PointUpdateModel} pointUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} pointIds
     * @return IPromise<Contracts.TestPoint[]>
     */
    updateTestPoints(pointUpdateModel: Contracts.PointUpdateModel, project: string, planId: number, suiteId: number, pointIds: string): IPromise<Contracts.TestPoint[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel>
     */
    getTestIteration(project: string, runId: number, testCaseResultId: number, iterationId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeActionResults
     * @return IPromise<Contracts.TestIterationDetailsModel[]>
     */
    getTestIterations(project: string, runId: number, testCaseResultId: number, includeActionResults?: boolean): IPromise<Contracts.TestIterationDetailsModel[]>;
    /**
     * @param {Contracts.TestResultCreateModel[]} resultCreateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    addTestResultsToTestRun(resultCreateModels: Contracts.TestResultCreateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {Contracts.TestCaseResultUpdateModel} resultUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number[]} resultIds
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    bulkUpdateTestResults(resultUpdateModel: Contracts.TestCaseResultUpdateModel, project: string, runId: number, resultIds: number[]): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {boolean} includeIterationDetails
     * @return IPromise<Contracts.TestCaseResult>
     */
    getTestCaseResultById(project: string, runId: number, testCaseResultId: number, includeIterationDetails?: boolean): IPromise<Contracts.TestCaseResult>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {boolean} includeIterationDetails
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestCaseResults(project: string, runId: number, includeIterationDetails?: boolean): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {Contracts.TestCaseResultUpdateModel[]} resultUpdateModels
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    updateTestResults(resultUpdateModels: Contracts.TestCaseResultUpdateModel[], project: string, runId: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} actionPath
     * @return IPromise<Contracts.TestActionResultModel[]>
     */
    getActionResults(project: string, runId: number, testCaseResultId: number, iterationId: number, actionPath?: string): IPromise<Contracts.TestActionResultModel[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @return IPromise<Contracts.TestCaseResultAttachmentModel[]>
     */
    getTestResultAttachments(project: string, runId: number, testCaseResultId: number, iterationId: number): IPromise<Contracts.TestCaseResultAttachmentModel[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {number} testCaseResultId
     * @param {number} iterationId
     * @param {string} paramName
     * @return IPromise<Contracts.TestResultParameterModel[]>
     */
    getResultParameters(project: string, runId: number, testCaseResultId: number, iterationId: number, paramName?: string): IPromise<Contracts.TestResultParameterModel[]>;
    /**
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeResultDetails
     * @param {boolean} includeIterationDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestCaseResult[]>
     */
    getTestResultsByQuery(query: Contracts.QueryModel, project: string, includeResultDetails?: boolean, includeIterationDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestCaseResult[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @param {string} buildUri
     * @param {number} flags
     * @return IPromise<Contracts.BuildCoverage[]>
     */
    getBuildCoverage(project: string, runId: number, buildUri: string, flags: number): IPromise<Contracts.BuildCoverage[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRunStatistic>
     */
    getTestRunStatistics(project: string, runId: number): IPromise<Contracts.TestRunStatistic>;
    /**
     * @param {Contracts.QueryModel} query
     * @param {string} project - Project ID or project name
     * @param {boolean} includeRunDetails
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRunsByQuery(query: Contracts.QueryModel, project: string, includeRunDetails?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * @param {Contracts.RunCreateModel} testRun
     * @param {string} project - Project ID or project name
     * @return IPromise<Contracts.TestRun>
     */
    createTestRun(testRun: Contracts.RunCreateModel, project: string): IPromise<Contracts.TestRun>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<void>
     */
    deleteTestRun(project: string, runId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    getTestRunById(project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * @param {string} project - Project ID or project name
     * @param {string} buildUri
     * @param {string} owner
     * @param {string} tmiRunId
     * @param {number} planId
     * @param {boolean} includeRunDetails
     * @param {boolean} automated
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestRun[]>
     */
    getTestRuns(project: string, buildUri?: string, owner?: string, tmiRunId?: string, planId?: number, includeRunDetails?: boolean, automated?: boolean, skip?: number, top?: number): IPromise<Contracts.TestRun[]>;
    /**
     * @param {Contracts.RunUpdateModel} runUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} runId
     * @return IPromise<Contracts.TestRun>
     */
    updateTestRun(runUpdateModel: Contracts.RunUpdateModel, project: string, runId: number): IPromise<Contracts.TestRun>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    addTestCasesToSuite(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {number} testCaseIds
     * @return IPromise<Contracts.SuiteTestCase>
     */
    getTestCaseById(project: string, planId: number, suiteId: number, testCaseIds: number): IPromise<Contracts.SuiteTestCase>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.SuiteTestCase[]>
     */
    getTestCases(project: string, planId: number, suiteId: number): IPromise<Contracts.SuiteTestCase[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {string} testCaseIds
     * @return IPromise<void>
     */
    removeTestCasesFromSuiteUrl(project: string, planId: number, suiteId: number, testCaseIds: string): IPromise<void>;
    /**
     * @param {Contracts.SuiteCreateModel} testSuite
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite[]>
     */
    createTestSuite(testSuite: Contracts.SuiteCreateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<void>
     */
    deleteTestSuite(project: string, planId: number, suiteId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @param {boolean} includeChildSuites
     * @return IPromise<Contracts.TestSuite>
     */
    getTestSuiteById(project: string, planId: number, suiteId: number, includeChildSuites?: boolean): IPromise<Contracts.TestSuite>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {boolean} includeSuites
     * @param {number} skip
     * @param {number} top
     * @return IPromise<Contracts.TestSuite[]>
     */
    getTestSuitesForPlan(project: string, planId: number, includeSuites?: boolean, skip?: number, top?: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @param {Contracts.SuiteUpdateModel} suiteUpdateModel
     * @param {string} project - Project ID or project name
     * @param {number} planId
     * @param {number} suiteId
     * @return IPromise<Contracts.TestSuite>
     */
    updateTestSuite(suiteUpdateModel: Contracts.SuiteUpdateModel, project: string, planId: number, suiteId: number): IPromise<Contracts.TestSuite>;
    /**
     * @param {number} testCaseId
     * @return IPromise<Contracts.TestSuite[]>
     */
    getSuitesByTestCaseId(testCaseId: number): IPromise<Contracts.TestSuite[]>;
    /**
     * @param {Contracts.TestSettings} testSettings
     * @param {string} project - Project ID or project name
     * @return IPromise<number>
     */
    createTestSettings(testSettings: Contracts.TestSettings, project: string): IPromise<number>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<void>
     */
    deleteTestSettings(project: string, testSettingsId: number): IPromise<void>;
    /**
     * @param {string} project - Project ID or project name
     * @param {number} testSettingsId
     * @return IPromise<Contracts.TestSettings>
     */
    getTestSettingsById(project: string, testSettingsId: number): IPromise<Contracts.TestSettings>;
}
