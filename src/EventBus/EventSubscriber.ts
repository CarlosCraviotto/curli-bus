import {Event} from "./Event";

export type EventSubscriber = {
    getEventName(): string;
    handle <T>(event: Event): T;
}