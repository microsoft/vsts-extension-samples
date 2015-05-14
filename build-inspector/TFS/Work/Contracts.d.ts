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
    rows: BoardRow[];
}
export interface BoardCardSettings {
    value: CardTypeSetting[];
}
export interface BoardChart extends BoardChartReference {
    /**
    * The links for the resource
    */
    _links: any;
    /**
    * The settings for the resource
    */
    settings: {
        [key: string]: any;
    };
}
export interface BoardChartReference {
    /**
    * Name of the resource
    */
    name: string;
    /**
    * Full http link to the resource
    */
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
export declare enum BoardColumnType {
    Incoming = 0,
    InProgress = 1,
    Outgoing = 2,
}
export interface BoardReference extends ShallowReference {
}
export interface BoardRow {
    id: string;
    name: string;
}
export declare enum BugsBehavior {
    Off = 0,
    AsRequirements = 1,
    AsTasks = 2,
}
/**
* Collection of MemberCapacities
*/
export interface Capacities extends TeamSettingsDataContractBase {
    values: TeamMemberCapacity[];
}
/**
* Expected data from PATCH
*/
export interface CapacityPatch {
    activities: Activity[];
    daysOff: DateRange[];
}
export interface CardTypeSetting {
    fields: FieldSetting[];
    type: string;
}
export interface DateRange {
    /**
    * End of the date range.
    */
    end: Date;
    /**
    * Start of the date range.
    */
    start: Date;
}
/**
* An abstracted reference to a field
*/
export interface FieldReference {
    /**
    * fieldRefName for the field
    */
    referenceName: string;
    /**
    * Full http link to more information about the field
    */
    url: string;
}
export interface FieldSetting {
}
export interface Member {
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
}
/**
* An abstracted reference to some other resource. This class is used to provide the board data contracts with a uniform way to reference other resources in a way that provides easy traversal through links.
*/
export interface ShallowReference {
    /**
    * Id of the resource
    */
    id: string;
    /**
    * Name of the resource
    */
    name: string;
    /**
    * Full http link to the resource
    */
    url: string;
}
/**
* Represents a single TeamFieldValue
*/
export interface TeamFieldValue {
    includeChildren: boolean;
    value: string;
}
/**
* Essentially a collection of tem field values
*/
export interface TeamFieldValues extends TeamSettingsDataContractBase {
    /**
    * The default team field value
    */
    defaultValue: string;
    /**
    * Shallow ref to the field being used as a team field
    */
    field: FieldReference;
    /**
    * Collection of all valid team field values
    */
    values: TeamFieldValue[];
}
/**
* Expected data from PATCH
*/
export interface TeamFieldValuesPatch {
    defaultValue: string;
    values: TeamFieldValue[];
}
export interface TeamIterationAttributes {
    finishDate: Date;
    startDate: Date;
}
/**
* Represents capacity for a specific team member
*/
export interface TeamMemberCapacity extends TeamSettingsDataContractBase {
    /**
    * Collection of capacities associated with the team member
    */
    activities: Activity[];
    /**
    * The days off associated with the team member
    */
    daysOff: DateRange[];
    /**
    * Shallow Ref to the associated team member
    */
    teamMember: Member;
}
/**
* Data contract for TeamSettings
*/
export interface TeamSetting extends TeamSettingsDataContractBase {
    /**
    * Default Iteration
    */
    backlogIteration: TeamSettingsIteration;
    /**
    * Information about categories that are visible on the backlog.
    */
    backlogVisibilities: {
        [key: string]: boolean;
    };
    /**
    * BugsBehavior (Off, AsTasks, AsRequirements, ...)
    */
    bugsBehavior: BugsBehavior;
    /**
    * Days that the team is working
    */
    workingDays: System_Contracts.DayOfWeek[];
}
/**
* Base class for TeamSettings data contracts. Anything common goes here.
*/
export interface TeamSettingsDataContractBase {
    /**
    * Collection of links relevant to resource
    */
    _links: any;
    /**
    * Full http link to the resource
    */
    url: string;
}
export interface TeamSettingsDaysOff extends TeamSettingsDataContractBase {
    daysOff: DateRange[];
}
export interface TeamSettingsDaysOffPatch {
    daysOff: DateRange[];
}
/**
* Represents a shallow ref for a single iteration
*/
export interface TeamSettingsIteration extends TeamSettingsDataContractBase {
    /**
    * Attributes such as start and end date
    */
    attributes: TeamIterationAttributes;
    /**
    * Id of the resource
    */
    id: string;
    /**
    * Name of the resource
    */
    name: string;
    /**
    * Relative path of the iteration
    */
    path: string;
}
export interface TeamSettingsIterations extends TeamSettingsDataContractBase {
    values: TeamSettingsIteration[];
}
/**
* Data contract for what we expect to receive when PATCH
*/
export interface TeamSettingsPatch {
    backlogIteration: string;
    backlogVisibilities: {
        [key: string]: boolean;
    };
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
    BoardCardSettings: {
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
    BoardRow: {
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
    CardTypeSetting: {
        fields: any;
    };
    DateRange: {
        fields: any;
    };
    FieldReference: {
        fields: any;
    };
    FieldSetting: {
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
