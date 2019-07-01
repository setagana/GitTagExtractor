export interface GitTagExtractorInterface {
    getGitTag(): string;
    formatTagString(str: string, separator: string): string;
}