import taskLibrary = require('azure-pipelines-task-lib/task');
import shell = require('shelljs');
import { CommandLineGitClient } from './GitClient/CommandLineGitClient';
import { GitTagExtractor } from './TagExtractor/GitTagExtractor';

async function run() {
    // TODO: Test if this works on Windows and Linux hosted agents
    var separator = decodeURI('%0A');
    
    var gitClient = new CommandLineGitClient(shell.which, shell.exec);
    var gitTagExtractor = new GitTagExtractor(gitClient, separator);

    try {
        var tag = gitTagExtractor.getGitTag();
        taskLibrary.setVariable('ExtractedGitTag', tag);
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }
}

run();