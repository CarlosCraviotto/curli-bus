import {CommandInstanceType, QueryInstanceType} from '../Types';
import {NextFunctionType} from '../Types/NextFunctionType';

/**
 * Abstract class for a middleware
 */
export class Middleware {

    /**
     * Should implement the logic for the middleware and call function next with the command|result
     *
     * @param command | query
     * @param next
     * @param options
     */
    public execute <T> (_command: CommandInstanceType | QueryInstanceType, _next: NextFunctionType, _options?: T): any {
        throw new Error('Execute method must be implemented in Middleware class.');
    }

}
