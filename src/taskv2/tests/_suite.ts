import GitTagExtractorTests from './TagExtractor/GitTagExtractorTests';
import CommandLineGitClientTests from './GitClient/CommandLineGitClientTests';

describe('Task version 2 tests', function() {
    describe('Tag Extractor', GitTagExtractorTests.bind(this));
    describe('Command Line Git Client', CommandLineGitClientTests.bind(this));
});
