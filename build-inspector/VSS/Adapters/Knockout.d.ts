/// <reference path="../References/VSS-Common.d.ts" />
/// <reference path="../References/knockout.d.ts" />
import Controls = require("VSS/Controls");
export interface ITemplateViewModel extends IDisposable {
    dispose(): void;
}
export declare class TemplateViewModel implements ITemplateViewModel, Controls.EnhancementOptions {
    /**
     * Manager for disposables.
     */
    private _disposalManager;
    constructor();
    /**
     * Disposes all disposables.
     */
    dispose(): void;
    /**
     * Proxy for a knockout subscription to keep track of it to ensure that when the control is disposed, subscription is also disposed.
     */
    subscribe(subscribable: KnockoutSubscribable<any>, callback: (newValue: any) => void): KnockoutSubscription<any>;
    /**
     * Proxy for a knockout computed to keep track of it to ensure that when the control is disposed, computed is also disposed.
     */
    computed(func: () => any): KnockoutComputed<any>;
    /**
     * Adds a disposable object to the list
     */
    _addDisposable(disposable: IDisposable): IDisposable;
}
export interface TemplateControlRegistration {
    /**
     * Type of the control to be registered.
     */
    controlType: any;
    /**
     * Delegate used to generate the view model for the registered control.
     */
    viewModelGenerator: (context?: any) => ITemplateViewModel;
}
export interface TemplateControlOptions {
    /**
     * Html template is going to be set as the html content for the element.
     */
    templateHtml?: string;
    /**
     * If templateId is used there needs to be a script element (with type="text/html")
     * in the DOM with the id equal to templateId.
     * This templateId will be used to get the template from the DOM.
     */
    templateId?: string;
}
export interface ITemplateControl {
    /**
     * Applies the template binding on the specified element.
     *
     * @param element Element owning the template and viewmodel to be bound.
     */
    applyBinding(element: JQuery): void;
    /**
     * Perform verious disposals for the control.
     */
    dispose(): void;
}
export declare class TemplateControl<TViewModel extends ITemplateViewModel> extends Controls.BaseControl implements ITemplateControl {
    /**
     * Registers a template control to be invoked later.
     *
     * @param templateId Id of the template.
     * @param controlType Type of the registered control.
     * @param viewModelGenerator Delegate to generate the viewmodel.
     */
    static registerBinding(templateId: string, controlType: any, viewModelGenerator: (context?: any) => ITemplateViewModel): void;
    /**
     * Creates a new template control using registered control specified by template id.
     *
     * @param templateId Id of the template.
     * @param element Element owning the template and viewmodel to be bound.
     * @param viewModelContext Context used to generate view model.
     * @return New instance of the control.
     */
    static applyRegisteredBinding<TControl extends ITemplateControl, TViewModel extends ITemplateViewModel>(templateId: string, element: JQuery, viewModelContext: any): TControl;
    /**
     * Creates a new template control using the specified type, element and options.
     *
     * @param controlType Type of the control.
     * @param element Element owning the template and viewmodel to be bound.
     * @param viewModel View model used for binding.
     * @param options Template options like templateHtml and templateId.
     * @return New instance of the control.
     */
    static applyBinding<TControl extends ITemplateControl, TViewModel>(controlType: any, element: JQuery, viewModel: TViewModel, options: TemplateControlOptions): TControl;
    /**
     * View model used for binding.
     */
    private _viewModel;
    /**
     * Manager for disposables.
     */
    private _disposalManager;
    /**
     * Do not use this! Instead, use TemplateControl.applyBinding.
     */
    constructor(viewModel: TViewModel, options?: TemplateControlOptions);
    /**
     * Gets the viewmodel bound to this control.
     */
    getViewModel(): TViewModel;
    /**
     * See interface.
     */
    applyBinding(element: JQuery): void;
    /**
     * Proxy for a knockout subscription to keep track of it to ensure that when the control is disposed, subscription is also disposed.
     */
    subscribe(subscribable: KnockoutSubscribable<any>, callback: (newValue: any) => void): KnockoutSubscription<any>;
    /**
     * Proxy for a knockout computed to keep track of it to ensure that when the control is disposed, computed is also disposed.
     */
    computed(func: () => any): KnockoutComputed<any>;
    /**
     * See base.
     */
    _cleanup(): void;
    /**
     * Default template binding which is knockout.
     * By overriding this method, a different binding pattern can be used.
     */
    _performBinding(element: JQuery, options: TemplateControlOptions): void;
}
