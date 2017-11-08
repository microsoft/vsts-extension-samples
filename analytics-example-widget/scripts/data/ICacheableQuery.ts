/**
  * Expresses behavior of a data query  (Analytics, VSTS REST or otherwise) for which the configuration can be uniquely identified as a string and the results can be cached as an object.
    */
  export interface ICacheableQuery<T> {
    // Gets a unique key for describing the configuration of the query.
    getKey(): string;

    // Runs the query and provides the results.
    runQuery(): IPromise<T>;
}