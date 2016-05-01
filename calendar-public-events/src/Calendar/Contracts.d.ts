export interface IEventSource {
    id: string;
    name: string;
    order: number;
    background?: boolean;
    getEvents: (query?: IEventQuery) => IPromise<CalendarEvent[]>;
    getCategories(query: IEventQuery): IPromise<IEventCategory[]>;
    addEvents?: (events: CalendarEvent[]) => IPromise<CalendarEvent>;
    removeEvents?: (events: CalendarEvent[]) => IPromise<CalendarEvent[]>;
    updateEvents?: (events: CalendarEvent[]) => IPromise<CalendarEvent[]>;
    getTitleUrl(webContext: WebContext): IPromise<string>;
}
export interface IEventCategory {
    title: string;
    subTitle?: string;
    imageUrl?: string;
    color?: string;
}
export interface IEventQuery {
    startDate?: Date;
    endDate?: Date;
}
export interface CalendarEvent {
    title: string;
    __etag?: number;
    startDate: string;
    endDate?: string;
    id?: string;
    category?: string;
    member?: ICalendarMember;
}
export interface ICalendarMember {
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
}
export interface IExtendedCalendarEventObject {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    className?: string | string[];
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    rendering?: string;
    overlap?: boolean;
    constraint?: string;
    id?: string;
    __etag?: number;
    title: string;
    allDay?: boolean;
    start: Date | string;
    end?: Date | string;
    url?: string;
    source?: any | IExtendedCalendarEventSource;
    member?: ICalendarMember;
    category?: string;
    eventType?: string;
}
export interface IExtendedCalendarEventSource {
    events?: IExtendedCalendarEventObject[] | IEventSource;
}
