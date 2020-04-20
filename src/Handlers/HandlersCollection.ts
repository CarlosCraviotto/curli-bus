import {HandlerModel} from './HandlerModel';

import {CommandInstanceType, HandlerType, HandlerFunctionType} from '../Types';

export class HandlersCollection {

    private collection: Array<HandlerModel>;

    public constructor () {
        this.collection = [];
    }

    public add (commandName: string, handler: HandlerType | HandlerFunctionType): void {
        this.checkIfAlreadyExistCommandWithSameName(commandName);
        this.collection.push(new HandlerModel(commandName, handler));
    }

    public dispatch<T> (commandName: string, command: CommandInstanceType, options?: T): any {
        let result: any;
        const handlerModel = this.findHandlerByCommand(commandName);

        if (handlerModel) {
            result = handlerModel.callHandler(command, options);
        } else {
            throw new Error('Unable to find a handler for the command ' + commandName + '.');
        }

        return result;
    }

    private checkIfAlreadyExistCommandWithSameName (commandName: string): void | never {
        if (this.findHandlerByCommand(commandName)) {
            throw new Error('This command (' + commandName + ') is already registered.');
        }
    }

    private findHandlerByCommand (commandName: string): HandlerModel | undefined {
        return this.collection.find((handlerModel: HandlerModel) => {
            return handlerModel.isThisCommandName(commandName);
        });
    }

}
