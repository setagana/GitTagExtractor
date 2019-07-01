import taskLibrary = require('azure-pipelines-task-lib/task');
import { ExecOutputReturnValue } from 'shelljs';
import { GitClientConstructor } from './GitClientConstructor';
import { GitClientInterface } from './GitClientInterface';

const CommandLineGitClient: GitClientConstructor = class CommandLineGitClient implements GitClientInterface {
    which: (command: string) => string;
    exec: (command: string) => ExecOutputReturnValue;
    commitSha: string;

    constructor(whichFunc: (command: string) => string, execFunc: (command: string) => ExecOutputReturnValue, selectedCommit: string) {
        this.which = whichFunc;
        this.exec = execFunc;
        this.commitSha = selectedCommit;
    }

    getTagString(): string {
        if (!this.which('git')) {
            throw new Error('Executing machine does not appear to have a Git client installed.');
        }

        const commandString: string = this.commitSha === '' ? 'git tag -l --points-at HEAD' : 'git tag -l --points-at ' + this.commitSha;
        let commandResult = this.exec(commandString);
        if (this.commitSha !== '' && commandResult.code !== 0) {
            throw new Error('No commit found with SHA: ' + this.commitSha);
        }
        return commandResult.output; 
    }
}

export { CommandLineGitClient };