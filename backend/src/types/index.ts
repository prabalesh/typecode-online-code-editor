export interface LanguageConfig {
    label: string;
    monacoLanguage: string;
    defaultCode: string;
}

export interface Runtime {
    language: string;
    version: string;
    aliases: string[];
    runtime?: string;
    mocanoLanguageName?: string;
    label?: string;
    defaultCode?: string;
}