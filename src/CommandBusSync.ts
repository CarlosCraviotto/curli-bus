import {
    CommandInstanceType
} from './Types';

import {BaseBusSync} from "./BaseBusSync";

/**
 * Class for the BusSync
 */
export class CommandBusSync extends BaseBusSync{

    public constructor () {
       super();
    }

    /**
     * Dispatch the command to the bus.
     *
     * @param command An instance of a class already declared in.
     * @param options It will be sent to all the middlewares an to the handler
     */
    public dispatch<T> (command: CommandInstanceType, options?: T): any {
        return this.process(command, options);
    }

}
