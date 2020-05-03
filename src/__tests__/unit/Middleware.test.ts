import chai = require('chai');
import {CommandBusSync} from '../../CommandBusSync';
import {CommandInstanceType} from '../../Types';
import {Middleware} from '../../Middleware/Middleware';

let bus: CommandBusSync;

class CommandTest {

    public name?: string;

    public addToName (toAdd: string) {
        this.name = this.name + ' - ' + toAdd + ' -';
    }

    [key: string]: any

}

class MiddlewareTest extends Middleware {

    execute (command: CommandInstanceType, next: (a: any) => any): any {
        command.addToName('preHandler');
        command = next(command);
        command.addToName('postHandler');
        return command;
    }

}

let nameProperty = 'test';
let commandTest: CommandTest = new CommandTest();

describe('Middleware tests', function () {

    beforeEach(() => {
        bus = new CommandBusSync();
        nameProperty = 'test';
        commandTest = new CommandTest();
        commandTest.name = nameProperty;
    });

    it('Should register middleware and be executed it.', function () {
        // register a middleware
        bus.addMiddleware(new MiddlewareTest());

        bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
            command.addToName('handler');
            return command;
        });

        commandTest = bus.dispatch(commandTest);

        const txtAdded = ' - preHandler - - handler - - postHandler -';
        chai.assert.deepEqual(nameProperty + txtAdded, commandTest.name);
    });

    it(
        'Should register two middlewares and be executed first one, ant then the other one.',
        function () {

            // register a middleware
            bus.addMiddleware(new MiddlewareTest());

            bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
                command.addToName('handler');
                return command;
            });

            commandTest = bus.dispatch(commandTest);

            const txtAdded = ' - preHandler - - handler - - postHandler -';
            chai.assert.deepEqual(nameProperty + txtAdded, commandTest.name);

            // register a second middleware
            bus.addMiddleware(new MiddlewareTest());

            // create a second instance of the command
            let commandTest2 = new CommandTest();
            const nameProperty2 = 'test';
            commandTest2.name = nameProperty2;

            commandTest2 = bus.dispatch(commandTest2);

            const txtAdded2 =
                ' - preHandler - - preHandler - - handler - - postHandler - - postHandler -';
            // console.log(nameProperty2 + txtAdded2, commandTest2.name);
            chai.assert.deepEqual(nameProperty2 + txtAdded2, commandTest2.name);

        }
    );

    it('Should return null the command through the middlewares.', function () {
        class MiddlewareTestNull extends Middleware {

            execute (_command: CommandInstanceType, next: (a?: any) => any): any {
                next(undefined);
                return null;
            }

        }
        // register a middleware
        bus.addMiddleware(new MiddlewareTestNull());

        bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
            chai.assert.deepEqual(nameProperty, command.name);
            return null;
        });

        commandTest = bus.dispatch(commandTest);

        chai.assert.deepEqual(null, commandTest);
    });

    it(
        'Should send options through the middlewares till the handler same each time.',
        function () {
            class MiddlewareTesNotCallingNext extends Middleware {

                execute (command: CommandInstanceType, next: (a?: any) => any, options?: any): any {
                    command.name = command.name + '-' + options.name;
                    // rewrite the options and it still working
                    options = 'no toni more.';
                    next(options);
                    return command;
                }

            }
            // register a middleware
            bus.addMiddleware(new MiddlewareTesNotCallingNext());

            bus.registerHandler(
                CommandTest,
                function (command: CommandInstanceType, options?: any): any {
                    command.name = command.name + '-' + options.name;
                    return command;
                }
            );

            const result = bus.dispatch(commandTest, {name: 'toni'});

            chai.assert.deepEqual('test-toni-toni', result.name);
        }
    );

    it(
        'Should throw exception if we want to create an instance of Middleware class.',
        function () {
            const middlewareInstance = new Middleware();
            chai.assert.throws(function () {
                middlewareInstance.execute(commandTest, (results: any) => results);
            }, 'Execute method must be implemented in Middleware class.');
        }
    );
});
