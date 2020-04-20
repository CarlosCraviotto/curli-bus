import {CommandInstanceType, HandlerType, HandlerFunctionType} from "../Types";

export class HandlerModel {

    public constructor(
        private commandName: string,
        private handler: HandlerType | HandlerFunctionType
    ) {
    }

    public isThisCommandName(commandName: string): boolean {
        return (this.commandName === commandName);
    }

    public callHandler<T>(command: CommandInstanceType, options?: T) {
        const handler = this.handler;
        if (this.determineHandlerIsFunction(handler)) {
            return <HandlerFunctionType>handler(command, options);

        } else {
            return <HandlerType>handler.handleCommand(command, options);
        }
    }

    private determineHandlerIsFunction(
        handler: HandlerType | HandlerFunctionType
    ): handler is HandlerFunctionType {

        //if it doesn't have the method handleCommand, it is a function.
        if (!(handler as HandlerType).handleCommand) {
            return true;
        }
        return false;
    }
}