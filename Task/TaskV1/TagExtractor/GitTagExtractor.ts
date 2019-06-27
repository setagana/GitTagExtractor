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
        var rawTagString = this.gitClient.getTagString();
        var formattedTagString = this.formatTagString(rawTagString, this.separator);

        return formattedTagString;
    }

    formatTagString(str: string, separator: string): string {
        var tags = str.split(this.separator);
        var filteredTags = tags.filter(function (element) {
            return !(element === '' || element == null);
        });
        var sortedTags = filteredTags.sort();
        return sortedTags.join(";");
    }
}

export { GitTagExtractor };