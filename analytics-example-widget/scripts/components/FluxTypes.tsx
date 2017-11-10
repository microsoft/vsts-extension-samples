/// <reference types="vss-web-extension-sdk" />

import * as Q from 'q';
import * as React from 'react';

import { QueryExpand, QueryHierarchyItem } from "TFS/WorkItemTracking/Contracts";
import * as FluxTypes from "./FluxTypes";

import { Store } from "VSS/Flux/Store";
import { Action } from "VSS/Flux/Action";

export interface Props { }
export interface State { }

export interface ConfigurationState extends State {}

export class StoreBase<T> extends Store {
    private state: T;
    private actions: ActionsBase;

    constructor(actions: ActionsBase, initialState: T) {
        super();
        this.actions = actions;
        this.state = initialState;
        this.actions.stateChanged.addListener((data: T) => { this.recieveAndNotify(data) });
    }

    public getState(): T {
        return this.state
    }
    public setState(state: T) {
        this.state = state;
    }

    private recieveAndNotify(state: T) {
        this.setState(state);
        this.emitChanged();
    }
}


export class ActionsBase {    
    public stateChanged: Action<State>;

    constructor() {
        this.stateChanged = new Action<State>();
    }
}

export class ActionCreator<T extends State>{
    private actions: ActionsBase;

    constructor(actions:ActionsBase){
        this.actions = actions;
    }

    public getDefaultState(): T {
        return {} as T;
    }

    public requestInitialState(): IPromise<T> {
        let promise = this.requestData();
         promise.then((state:T) =>{
             
            //The notify here will start rendering with loaded state.
            return this.notifyListenersOfStateChange(state);
        });        
        return promise;
    }

    public requestData(): IPromise<T> {
        return Q({} as T) as IPromise<T>;
    }
    
    public notifyListenersOfStateChange(state: T) : void{
        this.actions.stateChanged.invoke(state);        
    }
}

export class ComponentBase<P extends Props,S extends State> extends React.Component<P, S> {
    protected actionCreator: ActionCreator<S>;
    protected store: StoreBase<S>;
    protected actions: ActionsBase;

    private setStoreStateDelegate = () => this.setStoreState();
    private setStateDelegate = (state:S) => {this.setState(state)};


    //Set the stage for initial rendering
    public componentWillMount(): void {        
        this.actions = this.createActions();
        this.actionCreator = this.createActionCreator();
        this.store = this.createStore();        
        this.registerStateListener();

        this.initiateRequest();
    }

    private registerStateListener(){
        this.actions.stateChanged.addListener(this.setStateDelegate);
    }

    protected initiateRequest(): void{
        this.actionCreator.requestInitialState();
    }

    //Note: store handling with base is awkward. This part needs to be revisited.
    private setStoreState(): void {
        this.setState(this.getStoreState());
    }

    public getStoreState() {
        return this.store.getState();
    }

    protected createActionCreator(): ActionCreator<S> {
        return new ActionCreator<S>(this.actions);
    }

    protected createActions(): ActionsBase {
        return new ActionsBase();
    }

    protected createStore(): StoreBase<S> {
        return new StoreBase<S>(this.actions, this.actionCreator.getDefaultState() as S);
    }

    public componentDidMount(): void {
        this.store && this.store.addChangedListener(this.setStoreStateDelegate);
    }

    public componentWillUnmount(): void {
        this.store && this.store.removeChangedListener(this.setStoreStateDelegate);
        this.actions.stateChanged.removeListener(this.setStateDelegate)
    }
}