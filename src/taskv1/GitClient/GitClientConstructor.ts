import { ExecOutputReturnValue } from 'shelljs';
import { GitClientInterface } from './GitClientInterface';

export interface GitClientConstructor {
    new (whichFunc: (command: string) => string, execFunc: (command: string) => ExecOutputReturnValue) : GitClientInterface;
}