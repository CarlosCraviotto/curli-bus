
import {CommandInstanceType, QueryInstanceType} from '../Types';
import {Middleware} from './Middleware';

export class MiddlewareCollection {

    private collection: Array<Middleware>;

    public constructor () {
        this.collection = [];
    }

    /**
     * Add a middleware to the collection
     * @param middleware
     */
    public add (middleware: Middleware) {
        this.collection.push(middleware);
    }

    /**
     * Execute all the middlewares in the collection.
     *
     * @param request A command | query instance previously registered.
     * @param options It can be anything and it is sent all the times.
     */
    public execute<T> (request: CommandInstanceType | QueryInstanceType, options?: T): any {
        const runRequestInMiddlewareCollection = this.collection.reduceRight(
            (next, middleware: Middleware) => {
                return middleware.execute.bind(middleware, request, next, options);
            },
            (results: any) => results
        );

        return runRequestInMiddlewareCollection(request);
    }

    /**
     * Remove the las item of the collection
     */
    public removeLast (): void {
        this.collection.pop();
    }

}
