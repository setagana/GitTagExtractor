import { ExecOutputReturnValue } from 'shelljs';
import { GitClientConstructor } from './GitClientConstructor';
import { GitClientInterface } from './GitClientInterface';

const CommandLineGitClient: GitClientConstructor = class CommandLineGitClient implements GitClientInterface {
    which: (command: string) => string;
    exec: (command: string) => ExecOutputReturnValue;

    constructor(whichFunc: (command: string) => string, execFunc: (command: string) => ExecOutputReturnValue) {
        this.which = whichFunc;
        this.exec = execFunc;
    }

    getTagString(): string {
        if (!this.which('git')) {
            throw new Error('Executing machine does not appear to have a Git client installed.');
        }
    
        let tagString = this.exec('git tag -l --points-at HEAD')
            .output;
        return tagString; 
    }
}

export { CommandLineGitClient };