"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";
import { RuntimeLanguage } from "@/types";

function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useMounted();

    const { language, setLanguage, runtimeLanguages, fetchRuntimeLanguages } =
        useCodeEditorStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchRuntimeLanguages();
    }, [fetchRuntimeLanguages]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (langId: RuntimeLanguage) => {
        setLanguage(langId);
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all 
        duration-200 border border-gray-800/50 hover:border-gray-700
        `}
            >
                <div className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
                    {runtimeLanguages.find(
                        (lang) =>
                            lang.language + lang.version ===
                            language.language + language.version
                    )
                        ? `${
                              runtimeLanguages.find(
                                  (lang) =>
                                      lang.language + lang.version ===
                                      language.language + language.version
                              )?.label
                          } (${
                              runtimeLanguages.find(
                                  (lang) =>
                                      lang.language + lang.version ===
                                      language.language + language.version
                              )?.version
                          })`
                        : "Select Language"}
                </div>

                <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
            rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
                    >
                        <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
                            <p className="text-xs font-medium text-gray-400">
                                Select Language
                            </p>
                        </div>

                        <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
                            {runtimeLanguages.map((lang, index) => {
                                return (
                                    <motion.div
                                        key={lang.language + lang.version}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group px-2"
                                    >
                                        <button
                                            className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${
                            language.language + language.version ===
                            lang.language + lang.version
                                ? "bg-blue-500/10 text-blue-400"
                                : "text-gray-300"
                        }
                      `}
                                            onClick={() =>
                                                handleLanguageSelect(lang)
                                            }
                                        >
                                            <span className="flex-1 text-left group-hover:text-white transition-colors">
                                                {lang.label} {lang.version}
                                            </span>

                                            {language.language +
                                                language.version ===
                                                lang.language +
                                                    lang.version && (
                                                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LanguageSelector;
