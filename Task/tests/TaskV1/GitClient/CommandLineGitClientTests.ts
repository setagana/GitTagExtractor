import { expect } from 'chai';
import { CommandLineGitClient } from '../../../TaskV1/GitClient/CommandLineGitClient';
import { ExecOutputReturnValue } from 'shelljs';

export default function CommandLineGitClientTests() {
    function mockSuccessWhich(command: string): string {
        return '/mingw64/bin/git';
    }

    function mockFailureWhich(command: string): string {
        return '';
    }

    class MockExecOutputReturnValue implements ExecOutputReturnValue {
        code: number = 0;
        output: string = '1.0.0';
    };

    function mockExec(command: string): ExecOutputReturnValue {
        if (command === 'git tag -l --points-at HEAD') {
            return new MockExecOutputReturnValue();
        } else {
            throw new Error('Git client attempted to execute an unexpected command: ' + command);
        }
    }

    it('should throw an error if no Git client is installed', () => {
        let gitClient = new CommandLineGitClient(mockFailureWhich, mockExec);
        
        expect(gitClient.getTagString.bind(gitClient)).to.throw('Executing machine does not appear to have a Git client installed.');
    });

    it('should return the output of git tag -l --points-at HEAD', () => {
        let gitClient = new CommandLineGitClient(mockSuccessWhich, mockExec);
        let expectedResult = '1.0.0';
        
        let result = gitClient.getTagString();
        
        expect(result).to.equal(expectedResult);
    });
}