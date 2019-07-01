import { expect } from 'chai';
import { GitTagExtractor } from '../../../TagExtractor/GitTagExtractor';
import { GitClientInterface } from '../../../GitClient/GitClientInterface';

export default function GitExtractorTests() {
    class MockGitClient implements GitClientInterface {
        
        returnValue: string;
        
        constructor(valueToReturn: string) {
            this.returnValue = valueToReturn;
        }
        
        getTagString(): string {
            return this.returnValue;
        }
    };

    it('should semi-colon separate multiple tags', () => {
        let input = '1.0.0/prerelease';
        let gitClient = new MockGitClient(input);
        let tagExtractor = new GitTagExtractor(gitClient, '/');
        
        let actualResult = tagExtractor.getGitTag();
        let tagCount = actualResult.split(';').length;

        expect(actualResult).to.equal('1.0.0;prerelease');
        expect(tagCount).to.equal(2);
    });

    it('should order all found tags', () => {
        let input = 'prerelease|1.0.0';
        let gitClient = new MockGitClient(input);
        let tagExtractor = new GitTagExtractor(gitClient, '|');
        let expectedResult = '1.0.0;prerelease';

        let actualResult = tagExtractor.getGitTag();

        expect(actualResult).to.equal(expectedResult);
    });

    it('should remove any empty values', () => {
        let input = '|1.0.0||';
        let gitClient = new MockGitClient(input);
        let tagExtractor = new GitTagExtractor(gitClient, '|');
        let expectedResult = '1.0.0';

        let actualResult = tagExtractor.getGitTag();

        expect(actualResult).to.equal(expectedResult);
    });
}