"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "@/components/code-editor"
import { ComplexityResult } from "@/components/complexity-result"
import { DashboardHeader } from "@/components/dashboard-header"
import { analyzeCode } from "@/lib/code-analysis"

type Language = "cpp" | "java" | "python"

export default function DashboardPage() {
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState<Language>("python")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = async () => {
        if (!code.trim()) return

        setIsAnalyzing(true)

        try {
            const analysisResult = await analyzeCode(code, language)
            setResult(analysisResult)
        } catch (error) {
            console.error("Analysis error:", error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <DashboardHeader />

            <main className="flex-1 container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px] py-6 md:py-10">
                <h1 className="text-3xl font-bold mb-6">Code Complexity Analyzer</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <Card className="shadow-md">
                        <CardContent className="p-5 sm:p-6 lg:p-8">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h2 className="text-xl font-semibold">Your Code</h2>
                                <Tabs value={language} onValueChange={(value) => setLanguage(value as Language)}>
                                    <TabsList>
                                        <TabsTrigger value="python">Python</TabsTrigger>
                                        <TabsTrigger value="cpp">C++</TabsTrigger>
                                        <TabsTrigger value="java">Java</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <CodeEditor value={code} onChange={setCode} language={language} />

                            <Button className="mt-6 w-full" onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()}>
                                {isAnalyzing ? "Analyzing..." : "Analyze Complexity"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardContent className="p-5 sm:p-6 lg:p-8">
                            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                            {result ? (
                                <ComplexityResult result={result} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                                    <p>Enter your code and click "Analyze Complexity" to see the results.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

