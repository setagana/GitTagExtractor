import taskLibrary = require('azure-pipelines-task-lib/task');
import shell = require('shelljs');
import { CommandLineGitClient } from './GitClient/CommandLineGitClient';
import { GitTagExtractor } from './TagExtractor/GitTagExtractor';

async function run() {
    // TODO: Test if this works on Windows and Linux hosted agents
    let separator = decodeURI('%0A');
    
    let gitClient = new CommandLineGitClient(shell.which, shell.exec);
    let gitTagExtractor = new GitTagExtractor(gitClient, separator);

    try {
        let tag = gitTagExtractor.getGitTag();
        taskLibrary.setVariable('ExtractedGitTag', tag);
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }
}

run();