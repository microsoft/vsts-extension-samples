/**
 * Content to be rendered by the Add Event Dialog
 */
export interface IAddEventContent {
    /** 
     * Include text input for event title
     */
    title?: boolean;
    
    /**
     * Include start date picker
     */
    start?: boolean;
    
    /**
     * Include end date picker
     */
    end?: boolean;
    
    /**
     * List of text input fields
     */
    textFields?: IAddEventTextField[]
    
    /**
     * List of combo input fields
     */
    comboFields?: IAddEventComboField[];
    
    /**
     * Error message to display if contributed content is not valid
     */
    validationErrorMessage?: string;
}

/**
 * Text input field for Add Event Dialog 
 */
export interface IAddEventTextField {
    /**
     * Field Label
     */
    label: string;
    
    /**
     * Initial value of the text input
     */
    initialValue?: string;
    
    /**
     * Determines if the field is required to save the dialog content
     */
    requiredField?: boolean;
    
    /**
     * Returns true if the current input for the field is valid
     */
    checkValid?: (value: string) => IPromise<boolean>
    
    /**
     * Error message to display if field is not valid
     */
    validationErrorMessage?: string;
    
    /**
     * Disabled state of the input
     */
    disabled?: boolean
    
    /**
     * Property on the calendar event the input should set
     */
    eventProperty?: string;
    
    /**
     * Executed by the Add Event Dialog on Ok click
     */
    okCallback?: (value: string) => IPromise<any>;
}

/**
 * Field for Add Event Dialog to be populated by a Combo Control
 */
export interface IAddEventComboField {
    /**
     * Field label
     */    
    label: string;
    
    /**
     * Initial value of the combo
     */
    initialValue?: string;
    
    /**
     * Items to populate the combo
     */
    items: string[];
    
    /**
     * Determines if the field is required to save the dialog content
     */
    requiredField?: boolean;
    
    /**
     * Returns true if the current input for the field is valid
     */
    checkValid?: (value: string) => IPromise<boolean>
    
    /**
     * Error message to display if field is not valid
     */
    validationErrorMessage?: string;
    
    /**
     * Disabled state of the input
     */
    disabled?: boolean
    
    /**
     * Property on the calendar event the input should set
     */
    eventProperty?: string;
    
    /**
     * Executed by the Add Event Dialog on Ok click
     */
    okCallback?: (value: string) => IPromise<any>;
}

/**
 * Interface for Add Event dialog content
 */
export interface IDialogContent{
    /**
     * Returns the updated calendar item
     */
    onOkClick: () => IPromise<any>; 
    
    /**
     * Returns the current title of the dialog
     */
    getTitle?: () => IPromise<string>;
    
    /**
     * Return height of the contributed content, defaults to 0
     */
    getContributedHeight?: () => IPromise<number>;
    
    /**
     * Returns the fields for the Add Event dialog to display
     */
    getFields?: () => IPromise<IAddEventContent>;
    
    /**
     * Returns true if the state of the customized contributed content is valid
     */
    checkValid?: () => IPromise<boolean>;
}

/**
* Interface for a calendar event provider view
*/
export interface IEventEnhancer {
    
    /**
    * Unique id of the enhancer
    */
    id: string;

    /**
    * Unique id of the add dialog content control
    */
    addDialogId?: string;
    
    /**
    * Unique id of the side panel control
    */
    sidePanelId?: string;
    
    /**
    * optional customizable add-icon for context menu
    */
    icon?: string;
    
    /**
    * Determines whether an event is editable in the current context
    *
    * @param event
    */
    canEdit: (event: CalendarEvent, member: ICalendarMember) => IPromise<boolean>;

    /**
     * Determines whether an event can be added
     */
    canAdd: (event: CalendarEvent, member: ICalendarMember) => IPromise<boolean>;
}

/**
* Interface for a calendar event provider
*/
export interface IEventSource {

    /**
    * Unique id of the event source
    */
    id: string;

    /**
    * Friendly display name of the event source
    */
    name: string;

    /**
    * Order used in sorting the event sources
    */
    order: number;

    /**
     * Returns the UI enhancer for the event source
     */
    getEnhancer?: () => IPromise<IEventEnhancer>;

    /**
    * Set to true if events from this source should be rendered in the background.
    */
    background?: boolean;
    
    /**
     * Returns true when the event source is loaded
     */
    load: () => IPromise<CalendarEvent[]>;

    /**
    * Get the events that match a certain criteria
    *
    * @param query Events query
    */
    getEvents: (query?: IEventQuery) => IPromise<CalendarEvent[]>;

    /**
     * Get the event categories that match a certain criteria
     */
    getCategories(query?: IEventQuery): IPromise<IEventCategory[]>;

    /**
    * Optional method to add events to a given source
    */
    addEvent?: (events: CalendarEvent) => IPromise<CalendarEvent>;

    /**
    * Optional method to remove events from this event source
    */
    removeEvent?: (events: CalendarEvent) => IPromise<CalendarEvent[]>;

    /**
    * Optional method to update an event in this event source
    */
    updateEvent?: (oldEvent: CalendarEvent, newEvent: CalendarEvent) => IPromise<CalendarEvent>;
    
    /**
    * Forms the url which is linked to the title of the summary section for the source
    */
    getTitleUrl(webContext: WebContext): IPromise<string>;
}

/**
 * Summary item for events
 */
export interface IEventCategory {
    /**
     * Unique id of the category
     * {source id}.{category title}
     */
    id: string;
    /**
     * Title of the event category
     */
    title: string;

    /**
     * Sub title of the event category
     */
    subTitle?: string;
    
    /**
     * Ids of the events in the category
     */
    events?: string[];

    /**
     * Image url of the category
     */
    imageUrl?: string;

    /**
     * Color of the category
     */
    color?: string;
    
    /**
     * Text color of the category
     */
    textColor?: string;
}

/**
* Query criteria for events
*/
export interface IEventQuery {

    /**
    * If specified, only include events on or after the given date
    */
    startDate?: Date;
    
    /**
    * If specified, only include events on or before the given date
    */
    endDate?: Date;
}

/**
* Represents a single calendar event
*/
export interface CalendarEvent {
    /**
    * Title of the event
    */
    title: string;
    
    __etag?: number;

    /**
    * Event start date
    */
    startDate: string;

    /**
    * Event end date
    */
    endDate?: string;

    /**
    * Unique id for the event
    */
    id?: string;
    
    /**
     * Category of the service
     */
    category?: IEventCategory;
    
    /**
     * Id of the iteration to which the event is linked
     */
    iterationId?: string;
    
    /**
     * Whether the event is movable on the calendar
     */
    movable?: boolean;

    /**
     * The member associated with this event
     */
    member?: ICalendarMember;
    
    /**
     * A description of the event
     */
    description?: string;
        
    /**
     * Icons to be displayed on the event
     */
    icons?: IEventIcon[];
    
    /**
     * Data to be attached to the event
     */
    eventData?: any;
}

export interface ICalendarMember {
    /**
    * Display name of the member
    */
    displayName: string;

    /**
    * Unique ID for the member
    */
    id: string;

    /**
    * URL to the identity image for the member
    */
    imageUrl: string;

    /**
    * Unique name for the member
    */
    uniqueName: string;

    /**
    * URL for the member
    */
    url: string;
}

/**
 * An icon displayed on the calendar representing an event
 */
export interface IEventIcon {
    /**
     * src url for the icon
     */
    src?: string;
    
    /**
     * css class for the icon
     */
    cssClass?: string;
    
    /**
     * tooltip for icon
     */
    title?: string;
    
    /**
     * The action executed when the icon is clicked
     */
    action?: (event: CalendarEvent) => IPromise<any>;
    
    /**
     * The event to edit or delete when the icon is selected
     */
    linkedEvent?: CalendarEvent;
    
}

/**
* Represents a single calendar event
*/
export interface IExtendedCalendarEventObject {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    className?: string|string[];
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    rendering?: string;
    overlap?: boolean;
    constraint?: string;
    id?: string;
    __etag?: number;
    title: string;
    description?: string;
    allDay?: boolean;
    start: Date|string;
    end?: Date|string;
    url?: string;
    source?: any | IExtendedCalendarEventSource;
    member?: ICalendarMember;
    category?: IEventCategory;
    iterationId?: string;
    icons?: IEventIcon[];
    eventType?: string;
    eventData?: any;
}

/**
* Represents a single calendar event
*/
export interface IExtendedCalendarEventSource {
    events?: IExtendedCalendarEventObject[] | IEventSource;
}


