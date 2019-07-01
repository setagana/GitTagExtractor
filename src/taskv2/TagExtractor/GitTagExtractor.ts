import taskLibrary = require('azure-pipelines-task-lib/task');
import { GitClientInterface } from '../GitClient/GitClientInterface';
import { GitTagExtractorInterface } from './GitTagExtractorInterface';
import { GitTagExtractorConstructor } from './GitTagExtractorConstructor';

const GitTagExtractor: GitTagExtractorConstructor = class GitTagExtractor implements GitTagExtractorInterface {
    gitClient: GitClientInterface;
    separator: string;

    constructor(client: GitClientInterface, tagSeparator: string) {
        this.gitClient = client;
        this.separator = tagSeparator;
    }

    getGitTag(): string {
        let rawTagString = this.gitClient.getTagString();
        let formattedTagString = this.formatTagString(rawTagString, this.separator);

        return formattedTagString;
    }

    formatTagString(str: string, separator: string): string {
        let tags = str.split(separator);
        let filteredTags = tags.filter(function (element) {
            return !(element === '' || element == null);
        });
        let sortedTags = filteredTags.sort();
        return sortedTags.join(";");
    }
}

export { GitTagExtractor };