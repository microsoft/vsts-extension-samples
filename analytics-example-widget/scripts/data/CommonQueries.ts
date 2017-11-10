/// <reference types="vss-web-extension-sdk" />
import { ODataClient} from "./ODataClient";
import { Project, Team, WorkItemTypeField, AnalyticsDate } from "./AnalyticsTypes";
import { ICacheableQuery } from "./ICacheableQuery";

/**
 * Implements a query of available Projects
 */
export class ProjectsQuery implements ICacheableQuery<Project[]> {
    public getKey():string{
        return "Projects()";
    }

    public runQuery() :IPromise<Project[]>{
        return ODataClient.getInstance().then((client) => {
            let fullQueryUrl = client.generateAccountLink("Projects");
            
            return client.runGetQuery(fullQueryUrl).then((results) => {
                return results[ODataClient.valueKey];
            });
        });
    }
}

/**
 * Implements a query of available Teams, scoped to Team
 */
export class TeamsQuery implements ICacheableQuery<Team[]> {
    private projectId:string;
    constructor(projectId:string){
        this.projectId = projectId;
    }

    public getKey():string{
        return `Teams(${this.projectId})`;
    }

    public runQuery() :IPromise<Team[]>{
        return ODataClient.getInstance().then((client) => {
            let fullQueryUrl = client.generateProjectLink(this.projectId, "Teams");            
            return client.runGetQuery(fullQueryUrl).then((results) => {
                return results[ODataClient.valueKey];
            });
        });
    }
}

/**
 * Implements a query of available Dates
 */
export class WitFieldsQuery implements ICacheableQuery<WorkItemTypeField[]> {
    private projectId:string;
    constructor(projectId:string){
        this.projectId = projectId;
    }

    public getKey():string{
        return `WorkItemTypeFields(${this.projectId})`;
    }

    public runQuery() :IPromise<WorkItemTypeField[]>{
        return ODataClient.getInstance().then((client) => {
            let fullQueryUrl = client.generateAccountLink("WorkItemTypeFields");
            return client.runGetQuery(fullQueryUrl).then((results) => {
                return results[ODataClient.valueKey];
            });
        });
    }
}

/**
 * Implements a query of available Dates
 */
export class DatesQuery implements ICacheableQuery<AnalyticsDate[]> {
    public getKey():string{
        return `Dates()`;
    }

    public runQuery() :IPromise<AnalyticsDate[]>{
        return ODataClient.getInstance().then((client) => {
            let fullQueryUrl = client.generateAccountLink("Dates");
            return client.runGetQuery(fullQueryUrl).then((results) => {
                return results[ODataClient.valueKey];
            });
        });
    }
}

