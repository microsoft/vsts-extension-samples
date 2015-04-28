import System_Contracts = require("VSS/Common/Contracts/System");
export interface Activity {
    capacityPerDay: number;
    name: string;
}
export interface Board extends ShallowReference {
    _links: any;
    allowedMappings: {
        [key: string]: {
            [key: string]: string[];
        };
    };
    canEdit: boolean;
    columns: BoardColumn[];
    isValid: boolean;
    revision: number;
}
export interface BoardChart extends BoardChartReference {
    _links: any;
    settings: {
        [key: string]: any;
    };
}
export interface BoardChartReference {
    name: string;
    url: string;
}
export interface BoardColumn {
    columnType: BoardColumnType;
    description: string;
    id: string;
    isSplit: boolean;
    itemLimit: number;
    name: string;
    stateMappings: {
        [key: string]: string;
    };
}
export interface BoardColumns {
    columns: BoardColumn[];
    revision: number;
}
export declare enum BoardColumnType {
    Incoming = 0,
    InProgress = 1,
    Outgoing = 2,
}
export interface BoardReference extends ShallowReference {
}
export declare enum BugsBehavior {
    Off = 0,
    AsRequirements = 1,
    AsTasks = 2,
}
export interface Capacities extends TeamSettingsDataContractBase {
    values: TeamMemberCapacityReference[];
}
export interface CapacityPatch {
    activities: Activity[];
}
export interface DateRange {
    end: Date;
    start: Date;
}
export interface FieldReference {
    referenceName: string;
    url: string;
}
export interface IterationShallowReference extends ShallowReference {
}
export interface Member {
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
}
export interface ShallowReference {
    id: string;
    name: string;
    url: string;
}
export interface TeamFieldValue {
    includeChildren: boolean;
    value: string;
}
export interface TeamFieldValues extends TeamSettingsDataContractBase {
    defaultValue: string;
    field: FieldReference;
    values: TeamFieldValue[];
}
export interface TeamFieldValuesPatch {
    defaultValue: string;
    values: TeamFieldValue[];
}
export interface TeamIterationAttributes {
    finishDate: Date;
    startDate: Date;
}
export interface TeamMemberCapacity extends TeamMemberCapacityReference {
    _links: any;
}
export interface TeamMemberCapacityReference {
    activities: Activity[];
    daysOff: DateRange[];
    teamMember: Member;
    url: string;
}
export interface TeamSetting extends TeamSettingsDataContractBase {
    backlogIteration: IterationShallowReference;
    bugsBehavior: BugsBehavior;
    workingDays: System_Contracts.DayOfWeek[];
}
export interface TeamSettingsDataContractBase {
    _links: any;
    url: string;
}
export interface TeamSettingsDaysOff extends TeamSettingsDataContractBase {
    daysOff: DateRange[];
}
export interface TeamSettingsDaysOffPatch {
    daysOff: DateRange[];
}
export interface TeamSettingsIteration extends TeamSettingsDataContractBase {
    attributes: TeamIterationAttributes;
    id: string;
    name: string;
    path: string;
}
export interface TeamSettingsIterations extends TeamSettingsDataContractBase {
    values: IterationShallowReference[];
}
export interface TeamSettingsPatch {
    backlogIteration: string;
    bugsBehavior: BugsBehavior;
    workingDays: System_Contracts.DayOfWeek[];
}
export declare var TypeInfo: {
    Activity: {
        fields: any;
    };
    Board: {
        fields: any;
    };
    BoardChart: {
        fields: any;
    };
    BoardChartReference: {
        fields: any;
    };
    BoardColumn: {
        fields: any;
    };
    BoardColumns: {
        fields: any;
    };
    BoardColumnType: {
        enumValues: {
            "incoming": number;
            "inProgress": number;
            "outgoing": number;
        };
    };
    BoardReference: {
        fields: any;
    };
    BugsBehavior: {
        enumValues: {
            "off": number;
            "asRequirements": number;
            "asTasks": number;
        };
    };
    Capacities: {
        fields: any;
    };
    CapacityPatch: {
        fields: any;
    };
    DateRange: {
        fields: any;
    };
    FieldReference: {
        fields: any;
    };
    IterationShallowReference: {
        fields: any;
    };
    Member: {
        fields: any;
    };
    ShallowReference: {
        fields: any;
    };
    TeamFieldValue: {
        fields: any;
    };
    TeamFieldValues: {
        fields: any;
    };
    TeamFieldValuesPatch: {
        fields: any;
    };
    TeamIterationAttributes: {
        fields: any;
    };
    TeamMemberCapacity: {
        fields: any;
    };
    TeamMemberCapacityReference: {
        fields: any;
    };
    TeamSetting: {
        fields: any;
    };
    TeamSettingsDataContractBase: {
        fields: any;
    };
    TeamSettingsDaysOff: {
        fields: any;
    };
    TeamSettingsDaysOffPatch: {
        fields: any;
    };
    TeamSettingsIteration: {
        fields: any;
    };
    TeamSettingsIterations: {
        fields: any;
    };
    TeamSettingsPatch: {
        fields: any;
    };
};
