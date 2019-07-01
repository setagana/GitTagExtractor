import taskLibrary = require('azure-pipelines-task-lib/task');
import shell = require('shelljs');
import { CommandLineGitClient } from './GitClient/CommandLineGitClient';
import { GitTagExtractor } from './TagExtractor/GitTagExtractor';
import { OutputOptions } from './output-options';

async function run() {
    const selectedOutputOption: string = taskLibrary.getInput('outputOption', true);
    const outputOption: OutputOptions = selectedOutputOption === 'SemanticVersionTagOnly' ? OutputOptions.SemanticVersionTagOnly : OutputOptions.AllTags;
    const selectedCommit: string = taskLibrary.getInput('commitSha', false);

    if (selectedCommit != '' && !isValidCommitHash(selectedCommit)) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, 'The entered short commit SHA does not appear to be valid: ' + selectedCommit);
        return;
    }

    let separator = decodeURI('%0A');
    
    let gitClient = new CommandLineGitClient(shell.which, shell.exec, selectedCommit);
    let gitTagExtractor = new GitTagExtractor(gitClient, separator, outputOption);

    try {
        let tag = gitTagExtractor.getGitTag();
        taskLibrary.setVariable('ExtractedGitTag', tag);
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }
}

function isValidCommitHash(hash: string) {
    let commitHashPattern = new RegExp(/^([0-9a-zA-Z]{6,8})$/);
    return commitHashPattern.test(hash);
}

run();