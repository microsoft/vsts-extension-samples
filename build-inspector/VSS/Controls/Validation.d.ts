/// <reference path="../References/VSS-Common.d.ts" />
import Controls = require("VSS/Controls");
export interface BaseValidatorOptions {
    bindtokeystrokes?: boolean;
    invalidCssClass?: string;
    message?: string | (() => string);
    group?: string;
    allowEmptyString?: boolean;
    testEmptyString?: boolean;
}
export declare class BaseValidator<TOptions extends BaseValidatorOptions> extends Controls.Enhancement<TOptions> {
    static optionsPrefix: string;
    static EVENT_VALIDATE: string;
    static EVENT_VALIDATE_STATUS: string;
    instanceId: any;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    initialize(): void;
    getValue(): any;
    /**
     * @return
     */
    isValid(): boolean;
    getValidationGroup(): string;
    getMessage(): string | (() => string);
    onKeyUp(): void;
    onChanged(): void;
    onValidationRequired(e?: any, group?: any): void;
    validate(): void;
    private _testEmptyString();
}
export declare class RequiredValidator<TOptions extends BaseValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    isValid(): boolean;
}
export declare class RangeValidator<TOptions extends BaseValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    isValid(): boolean;
    getMessage(): string;
}
export interface RegexValidatorOptions extends BaseValidatorOptions {
    regex?: string;
}
export declare class RegexValidator<TOptions extends RegexValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    isValid(): boolean;
    getMessage(): any;
}
export interface CustomValidatorOptions extends BaseValidatorOptions {
    validate?: (val: any) => boolean;
}
export declare class CustomValidator<TOptions extends CustomValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     *     A validator which checks the text in the input by passing it to a function,
     *     which then returns true if the input is valid, and false if it is invalid.
     *
     * @param options  Options to apply to the validator:
     *     message: A message logged by the validation summary if the input is invalid / string
     *     testEmptyString: A boolean which indicates whether or not to test the empty string / boolean
     *     validate: The function to validate the input against
     *
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: any): void;
    /**
     * Tests if the current input satisfies the function
     *
     * @return True if the input does satisfy, false if it does not
     */
    isValid(): boolean;
    /**
     *  Set the function the validator tests
     *
     * @param newFxn  The new function to test against
     */
    setValidate(newValidateFunction: any): void;
    /**
     *  Gets the message that would be logged in the validation summary if the input were to be invalid
     *
     * @return  The message
     */
    getMessage(): string;
}
export interface DateValidatorOptions extends BaseValidatorOptions {
    parseFormat?: string;
}
export declare class DateValidator<TOptions extends DateValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    isValid(): boolean;
    getMessage(): any;
}
export interface IntegerRangeValidatorOptions extends BaseValidatorOptions {
    minValue?: number;
    maxValue?: number;
}
export declare class IntegerRangeValidator<TOptions extends IntegerRangeValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     *     A validator that ensures only whole integers between an upper and lower limit are entered.
     *
     * @param options  Options to apply to the validator:
     *     minValue: The minimum value (inclusive)
     *     maxValue: The maximum value (inclusive)
     *
     */
    constructor(options?: TOptions);
    /**
     * OVERRIDE: Determines whether the input control bound to this validator contains valid input
     *
     * @return True if valid, false otherwise
     */
    isValid(): boolean;
    /**
     * OVERRIDE: Gets the error message for display purposes
     *
     * @return The error message
     */
    getMessage(): string;
    /**
     * Gets the min and max boundaries of the validator
     *
     * @return {min, max}
     */
    private _getBounds();
}
export interface MaxLengthValidatorOptions extends BaseValidatorOptions {
    maxLength?: number;
}
export declare class MaxLengthValidator<TOptions extends MaxLengthValidatorOptions> extends BaseValidator<TOptions> {
    static optionsPrefix: string;
    /**
     * @param options
     */
    constructor(options?: TOptions);
    /**
     * @param options
     */
    initializeOptions(options?: TOptions): void;
    /**
     * @return
     */
    isValid(): boolean;
}
export interface ValidationSummaryOptions {
    context: Node;
    group: string;
}
export declare class ValidationSummary extends Controls.Control<ValidationSummaryOptions> {
    private _messages;
    private _ignoreUIUpdate;
    private _fixedHeight;
    private _singleMessage;
    private _showAsWarning;
    /**
     * @param options
     */
    constructor(options?: any);
    /**
     * @param options
     */
    initializeOptions(options?: ValidationSummaryOptions): void;
    initialize(): void;
    onValidationStatus(e?: any, validator?: any, group?: any, valid?: any): void;
    validate(): void;
    private _updateUI();
}
/**
 * @param validationResult
 * @param context
 * @return
 */
export declare function validateGroup(group: any, validationResult?: any[], context?: any): boolean;
