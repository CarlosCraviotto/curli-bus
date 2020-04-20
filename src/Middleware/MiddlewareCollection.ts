
import {CommandInstanceType} from "../Types";
import {Middleware} from "./Middleware";

export class MiddlewareCollection {
    private collection: Array<Middleware>;

    public constructor() {
        this.collection = [];
    }

    /**
     * Add a middleware to the collection
     * @param middleware
     */
    public add(middleware: Middleware) {
        this.collection.push(middleware);
    }

    /**
     * Execute all the middlewares in the collection.
     *
     * @param command A command instance previously registered.
     * @param options It can be anything and it is sent all the times.
     */
    public execute<T>(command: CommandInstanceType, options?: T): any {
        const runCommandInMiddlewareCollection = this.collection.reduceRight(
            (next, middleware: Middleware) => {
                return middleware.execute.bind(middleware, command, next, options);
            },
            (results: any) => results
        );

        return runCommandInMiddlewareCollection(command);
    }

    /**
     * Remove the las item of the collection
     */
    public removeLast(): void {
        this.collection.pop();
    }
}