/// <reference path='jquery.d.ts' />
/// <reference path='VSS.WebPlatform.Interfaces.d.ts' />

declare var Sys;

interface EventTarget {
    checked: boolean;
    nodeType: number;
}

interface Date {
    toGMTString(): string;
}

interface IErrorCallback {
    (error: any): void;
}

interface IResultCallback extends Function {
}

interface IArgsFunctionR<TResult> {
    (...args: any[]): TResult;
}

interface IFunctionPR<TParam, TResult> {
    (param: TParam): TResult;
}

interface IFunctionPPR<TParam1, TParam2, TResult> {
    (param1: TParam1, param2: TParam2): TResult;
}

interface IFunctionPPPR<TParam1, TParam2, TParam3, TResult> {
    (param1: TParam1, param2: TParam2, param3: TParam3): TResult;
}

interface IComparer<T> extends IFunctionPPR<T, T, number> {
}

interface IDictionaryStringTo<T> {
    [key: string]: T;
}

interface IDictionaryNumberTo<T> {
    [key: number]: T;
}

interface IEventHandler extends Function {
}

interface IWebApiArrayResult {
    count: number;
    value: any[];
}

interface Window {
    ActiveXObject: any;
    DOMParser: any;
    XSLTProcessor: any;
    vsSdkOnLoad:() => void;
}

interface MSAjaxError extends Error {
    popStackFrame: () => void;
}

interface TfsError extends Error {
    status?: string;
    stack?: string;
}

//These variables defined by server.
declare var exports: any;

declare var _disabledPlugins: string[];

interface IWebAccessPlugin {
    namespace: string;
    loadAfter: string;
}

declare var _plugins: IWebAccessPlugin[];
declare var _builtinPlugins: IWebAccessPlugin[];

interface IWebAccessPluginBase {
    namespace: string;
    base: string;
}

declare var _builtInBases: IWebAccessPluginBase[];
declare var _bases: IWebAccessPluginBase[];

interface IRequire {
    (moduleName: string): any;
    (moduleNames: string[], moduleFunc: Function): any;
    config: (config: any, shouldOverwrite?: boolean) => void;
}

interface IDefine {
    (moduleNames: string[], moduleFunc: Function): any;
    (id: string, moduleNames: string[], moduleFunc: Function): any;
}

interface IDisposable {
    dispose(): void;
}

interface IKeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

declare var require: IRequire;
declare var define: IDefine;
// defined in Loader.debug.js.  We need for config
// TODO - need to expose this in a better way
declare var __moduleManager: any;
