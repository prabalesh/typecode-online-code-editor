"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Terminal } from "lucide-react";

export default function InputPanel() {
    const { stdin, setStdin } = useCodeEditorStore();

    return (
        <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
                        <Terminal className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                        Input
                    </span>
                </div>
            </div>

            {/* Input Area */}
            <div className="relative">
                <div
                    className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
          rounded-xl p-4 h-[280px] overflow-auto font-mono text-sm"
                >
                    <textarea
                        className="w-full h-full bg-transparent text-white rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter your standard input here..."
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
