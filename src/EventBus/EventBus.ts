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
     * Publish an event
     * @param {Event} event
     */
    public publish(event: Event): void {

        if (!this.subscribersMap.hasOwnProperty(event.eventName)) {
            throw new Error(`There is not a subscriber for ${event.eventName} event.`);
        }

        event.dateTimeOccurred = event.dateTimeOccurred ?? new Date();

        this.subscribersMap[event.eventName].map((subscriber: EventSubscriber) => {
            subscriber.handle(event);
        });
    }
}

