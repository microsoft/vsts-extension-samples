export declare enum InputDataType {
    None = 0,
    String = 10,
    Number = 20,
    Boolean = 30,
    Guid = 40,
    Uri = 50,
}
export interface InputDescriptor {
    dependencyInputIds: string[];
    description: string;
    groupName: string;
    hasDynamicValueInformation: boolean;
    id: string;
    inputMode: InputMode;
    isConfidential: boolean;
    name: string;
    useInDefaultDescription: boolean;
    validation: InputValidation;
    valueHint: string;
    values: InputValues;
}
export interface InputFilter {
    conditions: InputFilterCondition[];
}
export interface InputFilterCondition {
    caseSensitive: boolean;
    inputId: string;
    inputValue: string;
    operator: InputFilterOperator;
}
export declare enum InputFilterOperator {
    Equals = 0,
    NotEquals = 1,
}
export declare enum InputMode {
    None = 0,
    TextBox = 10,
    PasswordBox = 20,
    Combo = 30,
    RadioButtons = 40,
    CheckBox = 50,
    TextArea = 60,
}
export interface InputValidation {
    dataType: InputDataType;
    isRequired: boolean;
    maxLength: number;
    maxValue: number;
    minLength: number;
    minValue: number;
    pattern: string;
    patternMismatchErrorMessage: string;
}
export interface InputValue {
    data: {
        [key: string]: any;
    };
    displayValue: string;
    value: string;
}
export interface InputValues {
    defaultValue: string;
    error: InputValuesError;
    inputId: string;
    isDisabled: boolean;
    isLimitedToPossibleValues: boolean;
    isReadOnly: boolean;
    possibleValues: InputValue[];
}
export interface InputValuesError {
    message: string;
}
export interface InputValuesQuery {
    currentValues: {
        [key: string]: string;
    };
    inputValues: InputValues[];
    resource: any;
}
export declare var TypeInfo: {
    InputDataType: {
        enumValues: {
            "none": number;
            "string": number;
            "number": number;
            "boolean": number;
            "guid": number;
            "uri": number;
        };
    };
    InputDescriptor: {
        fields: any;
    };
    InputFilter: {
        fields: any;
    };
    InputFilterCondition: {
        fields: any;
    };
    InputFilterOperator: {
        enumValues: {
            "equals": number;
            "notEquals": number;
        };
    };
    InputMode: {
        enumValues: {
            "none": number;
            "textBox": number;
            "passwordBox": number;
            "combo": number;
            "radioButtons": number;
            "checkBox": number;
            "textArea": number;
        };
    };
    InputValidation: {
        fields: any;
    };
    InputValue: {
        fields: any;
    };
    InputValues: {
        fields: any;
    };
    InputValuesError: {
        fields: any;
    };
    InputValuesQuery: {
        fields: any;
    };
};
