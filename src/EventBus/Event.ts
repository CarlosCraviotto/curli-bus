export type Event = {
    /**
     * The event name, It must be the same as the event Subscriber return in getEventName
     */
    eventName: string,

    /**
     * The event data
     */
    data: {[key:string]: any}

    /**
     * The date when it occurred, The service set it if none is provided.
     */
    dateTimeOccurred?: Date;

    /**
     * An id for the event
     */
    id?: string,
}