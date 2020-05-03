import {Middleware} from './Middleware';
import {CommandInstanceType, QueryInstanceType} from '../Types';
import {NextFunctionType} from '../Types/NextFunctionType';
import {HandlersCollection} from '../Handlers/HandlersCollection';

export class HandlersMiddleware extends Middleware {

    public constructor (private handlersCollection: HandlersCollection) {
        super();
    }

    public execute<T, Q> (
        request: CommandInstanceType | QueryInstanceType,
        _next: NextFunctionType, options?: T): Q
    {
        const requestName: string = this.getNameOfRequestInstance(request);

        return this.handlersCollection.dispatch(requestName, request, options);
    }

    private getNameOfRequestInstance (
        request: CommandInstanceType | QueryInstanceType
    ): string {
        return request.constructor.name;
    }

}
