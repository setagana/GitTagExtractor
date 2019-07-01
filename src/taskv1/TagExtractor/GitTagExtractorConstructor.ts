import { GitClientInterface } from '../GitClient/GitClientInterface';
import { GitTagExtractorInterface } from './GitTagExtractorInterface';

export interface GitTagExtractorConstructor {
    new (gitClient: GitClientInterface, separator: string) : GitTagExtractorInterface;
}