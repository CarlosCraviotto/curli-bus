import {Middleware} from './Middleware';
import {CommandInstanceType} from '../Types';
import {NextFunctionType} from '../Types/NextFunctionType';
import {HandlersCollection} from '../Handlers/HandlersCollection';

export class CommandsMiddleware extends Middleware {

    public constructor (private handlersCollection: HandlersCollection) {
        super();
    }

    public execute<T> (command: CommandInstanceType, _next: NextFunctionType, options?: T) {
        const commandName: string = this.getNameOfCommandInstance(command);

        return this.handlersCollection.dispatch(commandName, command, options);
    }

    private getNameOfCommandInstance (command: CommandInstanceType): string {
        return command.constructor.name;
    }

}
