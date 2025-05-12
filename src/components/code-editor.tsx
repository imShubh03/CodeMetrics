"use client"

import type React from "react"

import { useRef } from "react"

interface CodeEditorProps {
    value: string
    onChange: (value: string) => void
    language: string
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // This is a simplified code editor for the demo
    // In a real application, you would use a library like Monaco Editor or CodeMirror

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }

    const getPlaceholder = () => {
        switch (language) {
            case "python":
                return "# Enter your Python code here\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr"
            case "cpp":
                return "// Enter your C++ code here\n#include <iostream>\n#include <vector>\n\nvoid bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1])\n                std::swap(arr[j], arr[j + 1]);\n}"
            case "java":
                return "// Enter your Java code here\npublic class BubbleSort {\n    void bubbleSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n - i - 1; j++)\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                }\n    }\n}"
            default:
                return "// Enter your code here"
        }
    }

    return (
        <div ref={editorRef} className="relative border rounded-md overflow-hidden bg-muted/30 font-mono text-sm">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={getPlaceholder()}
                className="w-full h-[400px] p-4 bg-transparent resize-none focus:outline-none"
                spellCheck="false"
            />
        </div>
    )
}

