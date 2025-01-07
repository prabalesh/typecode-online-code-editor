import { Monaco } from "@monaco-editor/react";

export interface RuntimeLanguage {
    language: string;
    version: string;
    monacoLanguage?: string;
    label?: string;
    defaultCode?: string;
}

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

export interface CodeEditorState {
  language: RuntimeLanguage;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: Monaco | null;
  stdin: string;
  executionResult: ExecutionResult | null;
  runtimeLanguages: RuntimeLanguage[];

  getCode: () => string;
  setEditor: (editor: Monaco) => void;
  setStdin: (input: string) => void;
  setLanguage: (language: RuntimeLanguage) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  fetchRuntimeLanguages: () => Promise<void>; 
  runCode: () => Promise<void>;
}