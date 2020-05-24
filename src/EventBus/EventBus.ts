import {EventHandler} from "./EventHandler";
import {Event} from "./Event";


export class EventBus {
    private handlersMap: { [key: string]: Array<EventHandler> };

    public constructor() {
        this.handlersMap = {};
    }

    /**
     * @method register
     * @desc Register a handler to a domain event.
     */
    public register(eventHandler: EventHandler): void {
        const eventClassName = eventHandler.getEventName();

        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(eventHandler);
    }

    /**
     * Publish an event
     * @param {Event} event
     */
    public publish(event: Event): void {

        if (!this.handlersMap.hasOwnProperty(event.eventName)) {
            throw new Error(`There is not a handler for ${event.eventName} event.`);
        }

        event.dateTimeOccurred = event.dateTimeOccurred ?? new Date();

        this.handlersMap[event.eventName].map((handler: EventHandler) => {
            handler.handle(event);
        });
    }
}

