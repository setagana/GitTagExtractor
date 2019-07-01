import taskLibrary = require('azure-pipelines-task-lib/task');
import { GitClientInterface } from '../GitClient/GitClientInterface';
import { GitTagExtractorInterface } from './GitTagExtractorInterface';
import { GitTagExtractorConstructor } from './GitTagExtractorConstructor';
import { OutputOptions } from '../output-options';

const GitTagExtractor: GitTagExtractorConstructor = class GitTagExtractor implements GitTagExtractorInterface {
    gitClient: GitClientInterface;
    separator: string;
    outputOption: OutputOptions;

    constructor(client: GitClientInterface, tagSeparator: string, output: OutputOptions) {
        this.gitClient = client;
        this.separator = tagSeparator;
        this.outputOption = output;
    }

    getGitTag(): string {
        let rawTagString = this.gitClient.getTagString();
        let formattedTagString = this.formatTagString(rawTagString, this.separator);

        return formattedTagString;
    }

    formatTagString(str: string, separator: string): string {
        // Saving 'this' for use in the filter scope without shadowing
        let container = this;
        
        let tags = str.split(separator);
        let filteredTags = tags.filter(function (element) {
            let elementIsNotEmpty = !(element === '' || element == null);
            if (container.outputOption === OutputOptions.SemanticVersionTagOnly) {
                return elementIsNotEmpty && container.isSemanticVersionTag(element);
            }
            return elementIsNotEmpty;
        });
        let sortedTags = filteredTags.sort();
        
        // If user requested the Semantic Version tag only, we return the first value alphabetically sorted.
        // If the commit has been tagged with multiple semantic versions, e.g. '1.0.0,1.0.0-alpha16' this means we'll return the 1.0.0 tag, which is likely more useful.
        if (container.outputOption === OutputOptions.SemanticVersionTagOnly) 
        {
            return sortedTags[0];
        }
        
        return sortedTags.join(';');
    }

    private isSemanticVersionTag(tag: string): boolean {
        // Pattern courtesy of DavidFichtmueller https://github.com/semver/semver/issues/232#issue-48635632
        let semanticVersionPattern = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/);
        return semanticVersionPattern.test(tag);
    }
}

export { GitTagExtractor };