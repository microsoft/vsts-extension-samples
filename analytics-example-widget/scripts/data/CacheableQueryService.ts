import * as  Events_Action from "VSS/Events/Action";
import Service = require("VSS/Service");
import {ICacheableQuery} from "./ICacheableQuery";

export interface ICacheableQueryService {
    getCacheableQueryResult<T>(query: ICacheableQuery<T>): IPromise<T>;
}
/**
 * Implements a cache for queries, with a lifespan tied to the Dashboard page.
 */
export class CacheableQueryService extends Service.VssService implements ICacheableQueryService {
    private _cache: IDictionaryStringTo<IPromise<any>>;

    constructor() {
        super();
        this.resetCache();            
        // Note: This aspect tightly couples consumption of this service to Dashboard. We may want to decouple this relation as part of cache responsabilty in future.
        this.clearCacheOnDashboardAutoRefresh();
    }

    public getCacheableQueryResult<T>(query: ICacheableQuery<T>): PromiseLike<T> {
        let key = query.getKey();
        let cachedResult = this.getCachedData(key);

        if (cachedResult) {
            return cachedResult;
        } else {
            let resultPromise = query.runQuery();
            this.setCachedData(key, resultPromise);
            return resultPromise;
        }
    }


    /** Exposes cached promise for specified key. */
    protected getCachedData(key: string): IPromise<any> {
        return this._cache[key];
    }

    /** Passes a promise to the keyed query */
    protected setCachedData(key: string, promise: IPromise<any>) {
        this._cache[key] = promise;
    }

    /**
     * On Dashboard auto refresh, clear the cache and get fresh data
     */
    private clearCacheOnDashboardAutoRefresh() {
        Events_Action.getService().registerActionWorker("refreshtimer.on.refresh",
            (args: any, next: (actionArgs: any) => any) => {
                this.resetCache();

                // continue with the chain of responsibility
                if ($.isFunction(next)) {
                    next(args);
                }
            });
    }

    private resetCache(): void {
        this._cache = {};
    }
}