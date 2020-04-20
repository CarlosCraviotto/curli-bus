import {CommandInstanceType} from './CommandInstanceType';

export type HandlerFunctionType = <T>(command: CommandInstanceType, options?: T) => any;
// export type HandlerFunctionType =
