import {
    CommandInstanceType,
    CommandTypeClass,
    HandlerType,
    HandlerFunctionType,
} from './Types';

import {
    Middleware,
    MiddlewareCollection,
    CommandsMiddleware,
} from './Middleware';

import {
    HandlersCollection,
} from './Handlers';

/**
 * Class for the BusSync
 */
export class BusSync {

    private readonly middlewareList: MiddlewareCollection;
    private readonly handlersCollection: HandlersCollection;
    private readonly commandsMiddleware: CommandsMiddleware;

    public constructor () {
        this.middlewareList = new MiddlewareCollection();
        this.handlersCollection = new HandlersCollection();
        this.commandsMiddleware = new CommandsMiddleware(this.handlersCollection);
    }

    /**
     * Add a middleware to the collection, it will be
     * executed during the dispatch.
     *
     * @param middleware
     */
    public addMiddleware (middleware: Middleware): void {
        this.middlewareList.add(middleware);
    }

    /**
     * Register a handler to be called when we dispatch that command.
     *
     * @param command A class command or a string with the name of the class command.
     * @param handler A function or a class with the method handleCommand declared.
     */
    public registerHandler (
        command: CommandTypeClass | string,
        handler: HandlerFunctionType | HandlerType
    ): void | never {
        const commandName: string =
            (typeof command === 'string') ? command : this.getNameOfCommandClass(command);
        this.handlersCollection.add(commandName, handler);
    }

    /**
     * Dispatch the command to the bus.
     *
     * @param command An instance of a class already declared in.
     * @param options It will be sent to all the middlewares an to the handler
     */
    public dispatch<T> (command: CommandInstanceType, options?: T): any {
        // add the commands to the list
        this.middlewareList.add(this.commandsMiddleware);
        // execute all the middlewares and return the result
        const result: any = this.middlewareList.execute(command, options);

        // remove the commandsMiddleware, so we have the list of
        // middlewares clean to add more in runtime if need it.
        this.middlewareList.removeLast();

        return result;
    }

    private getNameOfCommandClass (command: CommandTypeClass): string {
        return command.name;
    }

}
