import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {EventBus, Event} from '../../EventBus';


let eventBus: EventBus;

class EventTest {
    public eventName = 'event_test';
    public dateTimeOccurred?: Date;
    public constructor(public data: {[key:string]: any}) {
    }
}

class EventHandler {
    public getEventName(): string {
    return 'event_test';
    }
    public handle (event: Event): any{
        console.log(event);
    }
}


describe('EventBus class tests', function () {

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('Should publish an event', function () {
        const handler = new EventHandler();

        handler.handle = (event: Event)=>{
            chai.assert.deepEqual('carlos', event.data.name);
        };

        eventBus.register(handler);

        const event = new EventTest({name: 'carlos'});
        eventBus.publish(event);
    });
    it('Should publish an event wit a few handlers', function () {
        const handler1 = new EventHandler();
        const handler2 = new EventHandler();
        const handler3 = new EventHandler();
        let timesHandlers = 0;

        const handlerFunction = (_event: Event)=>{
            timesHandlers++;
        };

        handler1.handle =handlerFunction;
        handler2.handle =handlerFunction;
        handler3.handle =handlerFunction;

        eventBus.register(handler1);
        eventBus.register(handler2);
        eventBus.register(handler3);

        const event = new EventTest({name: 'carlos'});
        event.dateTimeOccurred = new Date();
        eventBus.publish(event);

        chai.assert.deepEqual(3, timesHandlers);
    });


    it('Should throw an error if the EventBus', function () {
        const event = new EventTest({name: 'carlos'});
        chai.assert.throws(function () {
            eventBus.publish(event);
        }, 'There is not a handler for event_test event.');
    });

});
