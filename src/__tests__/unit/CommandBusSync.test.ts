import chai = require('chai');
import {CommandBusSync} from '../../CommandBusSync';
import {CommandInstanceType} from '../../Types';

let bus: CommandBusSync;

class CommandTest {

    public name?: string;
    [key: string]: any

}

class CommandTest2 extends CommandTest {
}

let nameProperty = 'test';
let commandTest: CommandTest = new CommandTest();
let commandTest2: CommandTest2 = new CommandTest2();

describe('Command BusSync app', function () {

    beforeEach(()=>{

        bus = new CommandBusSync();

        nameProperty = 'test';
        commandTest = new CommandTest();
        commandTest.name = nameProperty;
    });

    it('Should register a handler function and be called after the dispatch.', function () {

        bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
            chai.assert.deepEqual(nameProperty, command.name);
        });

        bus.dispatch(commandTest);
    });

    it(
        'Should register a handler function and be ' +
        'called after the dispatch passing an option object.',
        function () {

            const options: object = {property1: 'string1'};

            bus.registerHandler(
                CommandTest,
                function (command: CommandInstanceType, optionsGot: any): any {
                    chai.assert.deepEqual(nameProperty, command.name);
                    chai.assert.deepEqual(options, optionsGot);
                }
            );

            bus.dispatch(commandTest, options);
        }
    );

    it('Should register a handler class and be called after the dispatch.', function () {

        class HandlerClass {

            handleCommand (command: CommandInstanceType): any {
                chai.assert.deepEqual(nameProperty, command.name);
            }

        }
        const handler = new HandlerClass();

        bus.registerHandler(CommandTest, handler);

        bus.dispatch(commandTest);
    });

    it(
        'Should register two handlers functions and call both after the dispatch action.',
        function () {
            const nameProperty2 = 'test->2';
            commandTest2 = new CommandTest2();
            commandTest2.name = nameProperty2;

            bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
                chai.assert.deepEqual(nameProperty, command.name);
            });

            bus.registerHandler(CommandTest2, function (command: CommandInstanceType): any {
                chai.assert.deepEqual(nameProperty2, command.name);
            });

            bus.dispatch(commandTest);
            bus.dispatch(commandTest2);
        }
    );

    it(
        'Should try to register two handlers for same command', function () {

            bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
                chai.assert.deepEqual(nameProperty, command.name);
            });

            chai.assert.throws(function () {
                bus.registerHandler(CommandTest, function (command: CommandInstanceType): any {
                    chai.assert.deepEqual(nameProperty, command.name);
                });
            }, 'This command (CommandTest) is already registered');
        }
    );

    it(
        'Should dispatch a command unregistered', function () {
            chai.assert.throws(function () {
                bus.dispatch(commandTest);
            }, 'Unable to find a handler for the command CommandTest.');
        }
    );

    it(
        'Should register a handler function using a string as the command name.',
        function () {

            bus.registerHandler('CommandTest', function (command: CommandInstanceType): any {
                chai.assert.deepEqual(nameProperty, command.name);
            });

            bus.dispatch(commandTest);
        }
    );

});
