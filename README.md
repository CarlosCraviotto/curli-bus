# Curli-Bus


[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-bus.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-bus)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-bus/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-bus?branch=master)

Simple Command/Query/Event Bus Implementation to use with CQRS or DDD for NodeJS/Typescript.


### Motivation
There are a lot of bus CQRS libraries for JavaScript/Typescript out there, this is not new.  The one thing we're trying to achieve here is the ability to take advantage of such a library but without coupling it into the application's domain. The main goal here is to create a library that you can use without using third part code into your domains.



### Installation

Install by `npm`

```sh
npm install --save curli-bus
```

#### Basic Usage

#### Command Bus:

```typescript
import {CommandBusSync, CommandInstanceType} from "curli-bus";

class CommandTest {
    public constructor (private name: string){
    }
}

const commandBus = new CommandBusSync();

bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
    container.get('useCase').execute(command);
});

const commandTest = new CommandTest('test');
bus.dispatch(commandTest);
```



#### Registering command using string name

```typescript

bus.registerHandler('CommandTest', function (command: CommandInstanceType): any {
    container.get('useCase').execute(command);
});

const commandTest = new CommandTest('test');
bus.dispatch(commandTest);
```



#### Using options

We can send options to the handler through all the middleware.

```typescript
bus.registerHandler('CommandTest', function (command: CommandInstanceType, options?: any): any {
    container.get('useCase').execute(command, options);
});

bus.dispatch(commandTest, {"dev": true});
```



#### Using middleware

```typescript
import {BusSync, CommandInstanceType, Middleware} from "curli-bus";

class CommandTest {
    public constructor (private name: string){
    }
    
    public addToName (toAdd: string) {
        this.name = this.name + ' - ' + toAdd + ' -';
    }
}

class MiddlewareTest extends Middleware {
    execute (command: CommandInstanceType, next: (a: any) => any): any {
        command.addToName('preHandler');
        command = next(command);
        command.addToName('postHandler');
        return command;
    }
}

const bus = new BusSync();
const commandTest = new CommandTest('test');

bus.addMiddleware(new MiddlewareTest());

bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
    command.addToName('hendler');
    container.get('useCase').execute(command);
});

commandTest = bus.dispatch(commandTest);

console.log(commandTest.name);
//test - preHandler - hendler - postHandler -


```

 

#### Query Bus:

```typescript
import {QueryBusSync, QueryInstanceType} from "curli-bus";

class QueryTest {
    public constructor (private query: object){
    }
}

const queryBus = new QueryBusSync();

bus.registerHandler(QueryTest, function (query: QueryInstanceType): any {
    container.get('useCase').execute(query);
});

const queryTest = new QueryTest({'name': 'test'});
const result = bus.ask(queryTest);
```



#### Registering query using string name

```typescript
bus.registerHandler('QueryTest', function (query: QueryInstanceType): any {
    container.get('useCase').execute(query);
});

const queryTest = new QueryTest({'name': 'test'});
const result = bus.ask(queryTest);
```



#### Using options

We can send options to the handler through all the middleware.

```typescript
bus.registerHandler('QueryTest', function (query: QueryInstanceType, options?: any): any {
    container.get('useCase').execute(query, options);
});

const result = bus.ask(queryTest, {"dev": true});
```



#### Using middleware

```typescript
import {BusSync, QueryInstanceType, Middleware} from "curli-bus";

class QueryTest {
    public constructor (private name: string){
    }
    
    public addToName (toAdd: string) {
        this.name = this.name + ' - ' + toAdd + ' -';
    }
}

class MiddlewareTest extends Middleware {
    execute (query: QueryInstanceType, next: (a: any) => any): any {
        query.addToName('preHandler');
        query = next(query);
        query.addToName('postHandler');
        return query;
    }
}

const bus = new BusSync();
const queryTest = new QueryTest('test');

bus.addMiddleware(new MiddlewareTest());

bus.registerHandler(QueryTest, function (query: QueryInstanceType): any {
    query.addToName('hendler');
    container.get('useCase').execute(query);
});

const result = bus.ask(queryTest);

console.log(result.name);
//test - preHandler - hendler - postHandler -


```


#### Event Bus

We can create an event bus and send events throw it.

```typescript
import {EventBus} from "curli-bus";

class UserCreatedEvent {
    public eventName = 'user_created';
    public dateTimeOccurred?: Date;
    public constructor(public data: {[key:string]: any}) {
    }
}

class OnUserCreatedEventSubscriber {
    public getEventName(): string {
    	return 'user_created';
    }
    public handle (event: Event): any{
       //... Do stuff with the event
    }
}

const eventBus = new EventBus();

eventBus.register(new OnUserCreatedEventSubscriber());

const event = new UserCreatedEvent(
    {userName: 'Josh', email:'josh@notexist.com'}
);
eventBus.publish(event);
```




#### Commands

 - `npm run build`: Build the project (Bus).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



#### Contributing

When submitting your pull-request try to follow those guides:

- https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github

- https://medium.com/@vadimdemedes/making-your-first-contribution-de6576ddb190

  

### Changelog

All notable changes to this project will be documented in this section.

### 0.2.1

#### Changed

- Expose Event interface and EventSubscriber type

### 0.2.0

#### Added

- Support publish multiple events (array) in event bus.

### 0.1.0

#### Added

- Event bus support

### 0.0.2

#### Added

- QueryBusSync support

#### Changed

- BusSync interface will be CommandBusSync 

### 0.0.1

#### Added

- CommandBusSync support



#### License

MIT