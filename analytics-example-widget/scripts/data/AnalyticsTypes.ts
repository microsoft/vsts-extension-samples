export interface Team {
    TeamSK: string;
    ProjectSK: string;
    TeamId: string;
    TeamName: string;
}

export interface Project {
    ProjectSK: string;
    ProjectId: string;
    ProjectName: string;
}

export interface WorkItemTypeField {
    ProjectSK: string;
    FieldName: string;
    FieldReferenceName: string;
    FieldType: string;
    WorkItemTypeCategory: string;
    WorkItemType: string;
}

export interface AnalyticsDate {
    Date: string;
    DateSK: number;
    DayName: string;
    DayShortName: string;
    DayOfWeek: string;
    DayOfMonth: string;
    DayOfYear: string;
    WeekStartingDate: string;
    WeekEndingDate: string;
    Month: string;
    MonthName: string;
    MonthShortName: string;
    MonthOfYear:number;
    YearMonth: number;
    Year: number;
    IsLastDayOfPeriod: string;
}
