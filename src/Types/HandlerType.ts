import {CommandInstanceType} from './CommandInstanceType';
import {QueryInstanceType} from './QueryInstanceType';

export type HandlerType = {
    handleCommand <T>(request: CommandInstanceType | QueryInstanceType, options?: T): any;
};
