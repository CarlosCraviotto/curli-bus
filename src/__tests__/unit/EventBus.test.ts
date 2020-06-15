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

class EventSubscriber {
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
        const subscriber = new EventSubscriber();

        subscriber.handle = (event: Event)=>{
            chai.assert.deepEqual('carlos', event.data.name);
        };

        eventBus.register(subscriber);

        const event = new EventTest({name: 'carlos'});
        eventBus.publish(event);
    });

    it('Should publish a list of events', function () {
        const subscriber = new EventSubscriber();
        let checkTimesCallEventCarlos = 0;
        let checkTimesCallEventMiguel = 0;

        subscriber.handle = (event: Event) => {
            if ('carlos' === event.data.name) {
                checkTimesCallEventCarlos++;
            } else if ('miguel' === event.data.name) {
                checkTimesCallEventMiguel++;
            }
        };

        eventBus.register(subscriber);

        const event1 = new EventTest({name: 'carlos'});
        const event2 = new EventTest({name: 'carlos'});
        const event3 = new EventTest({name: 'carlos'});
        const event4 = new EventTest({name: 'miguel'});

        const eventsList: Array<Event> = [event1, event2, event3, event4];

        eventBus.publish(eventsList);

        chai.assert.deepEqual(3, checkTimesCallEventCarlos);
        chai.assert.deepEqual(1, checkTimesCallEventMiguel);
    });

    it('Should publish an event wit a few subscribers', function () {
        const subscriber1 = new EventSubscriber();
        const subscriber2 = new EventSubscriber();
        const subscriber3 = new EventSubscriber();
        let timesSubscribers = 0;

        const subscriberFunction = (_event: Event)=>{
            timesSubscribers++;
        };

        subscriber1.handle =subscriberFunction;
        subscriber2.handle =subscriberFunction;
        subscriber3.handle =subscriberFunction;

        eventBus.register(subscriber1);
        eventBus.register(subscriber2);
        eventBus.register(subscriber3);

        const event = new EventTest({name: 'carlos'});
        event.dateTimeOccurred = new Date();
        eventBus.publish(event);

        chai.assert.deepEqual(3, timesSubscribers);
    });


    it('Should throw an error if the EventBus', function () {
        const event = new EventTest({name: 'carlos'});
        chai.assert.throws(function () {
            eventBus.publish(event);
        }, 'There is not a subscriber for event_test event.');
    });

});
