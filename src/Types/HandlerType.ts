import {CommandInstanceType} from './CommandInstanceType';

export type HandlerType = {
    handleCommand <T>(command: CommandInstanceType, options?: T): any;
};
