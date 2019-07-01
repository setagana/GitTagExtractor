import taskLibrary = require('azure-pipelines-task-lib/task');
import shell = require('shelljs');
import { CommandLineGitClient } from './GitClient/CommandLineGitClient';
import { GitTagExtractor } from './TagExtractor/GitTagExtractor';

async function run() {
    taskLibrary.debug('Git Tag Extractor: Running');

    // TODO: Test if this works on Windows and Linux hosted agents
    let separator = decodeURI('%0A');
    
    let gitClient = new CommandLineGitClient(shell.which, shell.exec);
    let gitTagExtractor = new GitTagExtractor(gitClient, separator);

    try {
        let tag = gitTagExtractor.getGitTag();
        taskLibrary.setVariable('ExtractedGitTag', tag);
        taskLibrary.debug('Git Tag Extractor: Set ExtractedGitTag variable: ' + tag);
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }

    taskLibrary.debug('Git Tag Extractor: Finished');
}

run();