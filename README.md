# Curli-Bus


[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-bus.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-bus)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-bus/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-bus?branch=master)

Simple Command Bus Implementation (CQRS) for NodeJS/Typescript.


### Motivation
There are a lot of bus CQRS libraries for JavaScript/Typescript out there, this is not new.  The one thing we're trying to achieve here is the ability to take advantage of such a library but without coupling it into the application's domain. The main goal here is to create a library that you can use without using third part code into your domains.



### Installation

Install by `npm`

```sh
npm install --save curli-bus
```


#### Basic Usage

```typescript
import {BusSync, CommandInstanceType} from "curli-bus";

class CommandTest {
    public constructor (private name: string){
    }
}

const bus = new BusSync();

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


### 

### Commands

 - `npm run build`: Build the project (Bus).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



### License

MIT