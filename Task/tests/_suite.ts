import GitTagExtractorTests from './TaskV1/TagExtractor/GitTagExtractorTests';
import CommandLineGitClientTests from './TaskV1/GitClient/CommandLineGitClientTests';

describe('Task tests', function() {
    describe('Version 1', function() {
        describe('Tag Extractor', GitTagExtractorTests.bind(this));
        describe('Command Line Git Client', CommandLineGitClientTests.bind(this));
    });
});
