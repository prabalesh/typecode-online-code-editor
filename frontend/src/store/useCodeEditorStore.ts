import { CodeEditorState, RuntimeLanguage } from "@/types";
import { Monaco } from "@monaco-editor/react";
import { create } from "zustand";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: { language: "javascript", version: "20.11.1" },
      fontSize: 16,
      theme: "vs-dark",
      runtimeLanguages: [],
      stdin: "",
    };
  }

  const savedLanguage = JSON.parse(localStorage.getItem("editor-language") || '{"language": "javascript", "version": "20.11.1"}');
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;  
  const savedStdin = localStorage.getItem("editor-stdin") || ""; 

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
    stdin: savedStdin,
    runtimeLanguages: [],
  };
};


export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setStdin: (input: string) => {
      localStorage.setItem("editor-stdin", input || "")
      set({stdin: input || ""})
    },
    
    setEditor: (editor: Monaco) => {
      const codeLanguage = (get().language.language)
      const savedCode = localStorage.getItem(`editor-code-bc${codeLanguage}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: RuntimeLanguage) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language.language}`, currentCode);
      }

      localStorage.setItem("editor-language", JSON.stringify(language));

      set({
        language,
        output: "",
        error: null,
      });
    },

    fetchRuntimeLanguages: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/runtimes`);
        const data = await response.json();
        set({ runtimeLanguages: data.runtimes });
      } catch (error) {
        set({ error: "Failed to fetch runtime languages" });
      }
    },
    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();
      console.log(code)

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/execute`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: language.language,
            version: language.version,
            content: code,
            stdin: get().stdin || ""
          }),
        });

        let data = await response.json();
        data = data.result

        if (data.message) {
          set({ error: data.message, executionResult: { code, output: "", error: data.message } });
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        const output = data.run.output;

        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});
