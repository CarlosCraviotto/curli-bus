import {Event} from "./Event";

export type EventHandler = {
    getEventName(): string;
    handle <T>(event: Event): T;
}