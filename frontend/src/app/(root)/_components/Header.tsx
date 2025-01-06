import LanguageSelector from "@/app/(root)/_components/LanguageSelector";
import RunButton from "@/app/(root)/_components/RunCode";
import ThemeSelector from "@/app/(root)/_components/ThemeSelector";
import { Blocks } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
    return (
        <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150 h-[10vh]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="max-w-7xl mx-auto px-4 h-full">
                <div className="relative h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group relative"
                        >
                            <div
                                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
                            />

                            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                                <Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                            </div>

                            <div className="relative">
                                <span
                                    className="block text-lg font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
                                >
                                    TypeCode
                                </span>
                                <span className="block text-xs text-blue-400/60 font-medium">
                                    Your Online Code Editor
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <ThemeSelector />
                            <LanguageSelector />
                            <RunButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationHeader;
