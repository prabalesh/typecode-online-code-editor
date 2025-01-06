"use client";
import { RuntimeLanguage } from "@/types";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [languages, setLanguages] = useState<RuntimeLanguage[]>([]);
    const [selectedLanguage, setSelectedLanguage] =
        useState<RuntimeLanguage | null>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/runtimes`
            );
            const data = await response.json();
            setLanguages(data.runtimes);
            setSelectedLanguage(data.runtimes[0]);
        };

        fetchLanguages();
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const currLanguage = languages.find(
            (lang) => lang.language + lang.version === e.target.value
        );
        if (currLanguage) {
            setSelectedLanguage(currLanguage);
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl">Code Editor</div>
            <div className="flex gap-4 items-center">
                {languages.length > 0 ? (
                    <select
                        value={
                            selectedLanguage
                                ? selectedLanguage.language +
                                  selectedLanguage.version
                                : ""
                        }
                        onChange={handleLanguageChange}
                        className="bg-gray-600 p-2 rounded"
                    >
                        {languages.map((lang) => (
                            <option
                                key={lang.language + lang.version}
                                value={lang.language + lang.version}
                            >
                                {lang.language} {lang.version}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>No runtime languages available</div>
                )}
            </div>
        </nav>
    );
}
