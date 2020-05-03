import {CommandInstanceType} from './CommandInstanceType';
import {QueryInstanceType} from './QueryInstanceType';

export type HandlerFunctionType = <T>(
    request: CommandInstanceType | QueryInstanceType,
    options?: T
) => any;
// export type HandlerFunctionType =
