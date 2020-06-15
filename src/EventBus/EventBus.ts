import {EventSubscriber} from "./EventSubscriber";
import {Event} from "./Event";


export class EventBus {
    private subscribersMap: { [key: string]: Array<EventSubscriber> };

    public constructor() {
        this.subscribersMap = {};
    }

    /**
     * @method register
     * @desc Register a subscriber to a domain event.
     */
    public register(eventSubscriber: EventSubscriber): void {
        const eventClassName = eventSubscriber.getEventName();

        if (!this.subscribersMap.hasOwnProperty(eventClassName)) {
            this.subscribersMap[eventClassName] = [];
        }
        this.subscribersMap[eventClassName].push(eventSubscriber);
    }

    /**
     * Publish an event or a list of events.
     * @param {Event|Array<Event>} event
     */
    public publish(events: Event | Array<Event>): void {
        if (Array.isArray(events)) {
            events.forEach((event: Event) => {
                this.publishSingleEvent(event);
            });
        } else {
            this.publishSingleEvent(events);
        }
    }

    public publishSingleEvent(event: Event): void {

        if (!this.subscribersMap.hasOwnProperty(event.eventName)) {
            throw new Error(`There is not a subscriber for ${event.eventName} event.`);
        }

        event.dateTimeOccurred = event.dateTimeOccurred ?? new Date();

        this.subscribersMap[event.eventName].map((subscriber: EventSubscriber) => {
            subscriber.handle(event);
        });
    }
}

