import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Database, Info } from "lucide-react"

interface ComplexityResultProps {
    result: {
        timeComplexity: {
            notation: string
            explanation: string
        }
        spaceComplexity: {
            notation: string
            explanation: string
        }
        codeStructure: {
            loops: number
            recursion: boolean
            dataStructures: string[]
        }
    }
}

export function ComplexityResult({ result }: ComplexityResultProps) {
    const getTimeComplexityColor = (notation: string) => {
        if (notation.includes("O(1)") || notation.includes("O(log n)")) return "bg-green-500/10 text-green-600"
        if (notation.includes("O(n)")) return "bg-blue-500/10 text-blue-600"
        if (notation.includes("O(n log n)")) return "bg-yellow-500/10 text-yellow-600"
        if (notation.includes("O(n²)") || notation.includes("O(n^2)")) return "bg-orange-500/10 text-orange-600"
        return "bg-red-500/10 text-red-600"
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <CardTitle className="text-lg">Time Complexity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Badge className={`text-sm px-2 py-1 ${getTimeComplexityColor(result.timeComplexity.notation)}`}>
                            {result.timeComplexity.notation}
                        </Badge>
                        <p className="mt-4 text-sm text-muted-foreground">{result.timeComplexity.explanation}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary" />
                            <CardTitle className="text-lg">Space Complexity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Badge className="bg-blue-500/10 text-blue-600 text-sm px-2 py-1">{result.spaceComplexity.notation}</Badge>
                        <p className="mt-4 text-sm text-muted-foreground">{result.spaceComplexity.explanation}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        <CardTitle className="text-lg">Code Structure Analysis</CardTitle>
                    </div>
                    <CardDescription>Key elements identified in your code</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-md p-3">
                            <div className="font-medium mb-1">Loops</div>
                            <div className="text-2xl font-bold">{result.codeStructure.loops}</div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="font-medium mb-1">Recursion</div>
                            <div className="text-2xl font-bold">{result.codeStructure.recursion ? "Yes" : "No"}</div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="font-medium mb-1">Data Structures</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {result.codeStructure.dataStructures.map((ds, index) => (
                                    <Badge key={index} variant="outline">
                                        {ds}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

