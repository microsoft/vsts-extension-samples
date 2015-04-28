/// <reference path="References/VSS-Common.d.ts" />
export declare class SearchCore {
    private _strategy;
    private _adapter;
    /**
     * The search core, allows users to perform searches on data using a custom strategy.
     *
     * @param strategy The search strategy to use.
     * @param adapter The search adapter to use.
     */
    constructor(strategy: SearchStrategy, adapter: SearchAdapter);
    /**
     * Add items to the search strategy
     *
     * @param items Items to add
     */
    addItems(items: any[]): void;
    /**
     * Performs a search using the Indexer and then runs the adapter's resultHandler on the results
     *
     * @param query Query to run search on
     */
    beginSearch(query: string): void;
    /**
     * Returns the search strategy currently being used.
     *
     * @return The strategy in use
     */
    getStrategy(): SearchStrategy;
    /**
     * Clears the stored items in the strategy
     */
    clearStrategyStore(): void;
}
export interface ISearchStrategyOptions {
    specialCharacters?: string[];
    delimiter?: string;
}
export declare class SearchStrategy {
    /**
     * Tokenizes the searchText into separate words using a regex.
     *
     * @param searchText The searchText to split up.
     * @return An array of strings, the separate words.
     */
    static getTerms(searchText: string[], delimiter?: string): any[];
    private _options;
    private _specialCharactersHashSet;
    /**
     * Abstract Class to inherit from in order to implement the methods needed to store items and search on them.
     */
    constructor(options?: ISearchStrategyOptions);
    private _buildSpecialCharacterHashSet(specialCharacters);
    _getTerms(searchTerms: string[]): string[];
    /**
     *     Stores items and terms for each item in order to later retrieve
     *     and search upon.
     *
     * @param searchableObjects SearchableObjects to add
     */
    processItems(searchableObjects: any[]): void;
    /**
     * Clears the items stored in the strategy.
     */
    clearStrategyStore(): void;
    /**
     *     Searches the item store for the query given to it. Returns an
     *     array of documents representing the documents which match the query.
     *
     * @param query The query to search for
     * @return The list of items which match the query
     */
    search(query: string): any[];
    /**
     * Checks whether data exists in the search strategy
     *
     * @return True if data exists in the strategy, false if it doesn't.
     */
    dataExists(): boolean;
    /**
     * Return the total count of item indexed.
     */
    getIndexedItemsCount(): number;
    /**
     * Return the total size of the indexed store.
     */
    getIndexTotalSize(): number;
}
export declare class IndexedSearchStrategy extends SearchStrategy {
    private _searchStore;
    private _dataExists;
    private _indexedItems;
    constructor(store?: IndexedSearchStore, options?: ISearchStrategyOptions);
    getIndexTotalSize(): number;
    /**
     * Clears the items stored in the strategy.
     */
    clearStrategyStore(): void;
    /**
     * Return the total count of item indexed.
     */
    getIndexedItemsCount(): any;
    /**
     * Processes all SearchableObjects and adds them to the index
     *
     * @param searchableObjects SearchableObjects to add
     */
    processItems(searchableObjects: any[]): void;
    /**
     * Performs a search using the Indexer and then runs the resultHandler on the results.
     *
     * @param query Query to run search on
     * @return The search results
     */
    search(query: string): any[];
    /**
     * Checks whether data exists in the search strategy
     *
     * @return True if data exists in the strategy, false if it doesn't.
     */
    dataExists(): boolean;
}
export declare class IndexedSearchStore {
    /**
     *  Abstract function allowing for additional stores for an IndexedSearchStrategy
     */
    constructor();
    /**
     * Runs a query on the index.
     *
     * @param query The query to run.
     * @return An array of items, representing the results.
     */
    search(query: string): any[];
    /**
     * Adds an item to the index, under its token and its subparts.
     *
     * @param item The item to add to the index.
     * @param tokens The tokens to add the item under.
     */
    addToIndex(item: any, tokens: any[]): void;
    /**
     * Clears the items stored in the strategy.
     */
    clearStrategyStore(): void;
    /**
     * totalsize of the index store
     */
    getStoreTotalSize(): number;
}
export declare class TrieStore extends IndexedSearchStore {
    private _trie;
    constructor();
    search(query: string): any[];
    /**
     * Adds an item to the index, under its token and its subparts.
     *
     * @param item The item to add to the index.
     * @param tokens The tokens to add the item under.
     */
    addToIndex(item: any, tokens: any[]): void;
    clearStrategyStore(): void;
    getStoreTotalSize(): number;
}
export declare class InvertedIndexStore extends IndexedSearchStore {
    private _index;
    private _tokenCache;
    constructor();
    /**
     * Runs a query on the index.
     *
     * @param query The query to run.
     * @return An array of items, representing the results.
     */
    search(query: string): any[];
    /**
     * Adds an item to the index, under its token and its subparts.
     *
     * @param item The item to add to the index.
     * @param tokens The tokens to add the item under.
     */
    addToIndex(item: any, tokens: any[]): void;
    /**
     * Clears the items stored in the strategy.
     */
    clearStrategyStore(): void;
    /**
     * Adds a item to the index, under a single key's location.
     *
     * @param item The item to add.
     * @param key The key to add the item under
     */
    private _addItemToIndex(item, key);
}
export declare class SearchAdapter {
    /**
     * Abstract Class to inherit from in order to implement the UI methods for search.
     */
    constructor();
    /**
     * Adds additional items to the search strategy
     *
     * @param addItemsCallback The function which adds items to the search strategy.
     * @param searchCallback The function which searches the newly updated strategy.
     */
    addMoreItems(addItemsCallback: Function, searchCallback: () => any): void;
    /**
     * Creates SearchableObjects for all available work items
     *
     * @return An array of SearchableObjects.
     */
    createSearchableObjects(): any[];
    /**
     *     Handles the results in the UI by filtering through all available items to the ones
     *     provided in the results array.
     *
     * @param results An array of items
     * @param finished Represents whether or not the search is finished
     */
    handleResults(results: any[], finished: boolean): void;
    /**
     *     Handles an error being thrown in the search process.
     *
     * @param message Specific error message if provided.
     */
    handleError(message: string): void;
    /**
     *     Handles the search results being cleared and the view resetting to normal.
     */
    handleClear(): void;
    /**
     *     Returns whether or not there is more data to be loaded.
     *
     * @return True if no more data needs to be loaded, false otherwise
     */
    isDataSetComplete(): boolean;
}
export declare class SearchableObject {
    item: any;
    terms: any;
    /**
     * Represents a single item to be placed in the index.
     *
     * @param item The item to be added
     * @param terms The terms associated to the item.
     */
    constructor(item: any, terms: any[]);
    /**
     * Set the terms for this item
     *
     * @param terms The new terms
     */
    setTerms(terms: any[]): void;
    /**
     * Add a term to the item
     *
     * @param term The additional term
     */
    addTerm(term: string): void;
}
