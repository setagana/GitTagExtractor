import { GitClientInterface } from '../GitClient/GitClientInterface';
import { GitTagExtractorInterface } from './GitTagExtractorInterface';
import { OutputOptions } from '../output-options';

export interface GitTagExtractorConstructor {
    new (gitClient: GitClientInterface, separator: string, output: OutputOptions) : GitTagExtractorInterface;
}