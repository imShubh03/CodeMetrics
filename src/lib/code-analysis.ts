// This is a more accurate implementation of code analysis

type Language = "cpp" | "java" | "python"

interface AnalysisResult {
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

export async function analyzeCode(code: string, language: Language): Promise<AnalysisResult> {
    // In a real application, this would be a server-side API call
    // For demo purposes, we'll analyze the code directly

    return new Promise((resolve) => {
        setTimeout(() => {
            const result = performAnalysis(code, language)
            resolve(result)
        }, 1000)
    })
}

function performAnalysis(code: string, language: Language): AnalysisResult {
    // Count loops
    const loops = countLoops(code, language)

    // Check for recursion
    const hasRecursion = checkRecursion(code, language)

    // Identify data structures
    const dataStructures = identifyDataStructures(code, language)

    // Determine time complexity based on code patterns
    const timeComplexity = determineTimeComplexity(code, language, loops, hasRecursion)

    // Determine space complexity
    const spaceComplexity = determineSpaceComplexity(code, language, dataStructures, hasRecursion)

    return {
        timeComplexity,
        spaceComplexity,
        codeStructure: {
            loops,
            recursion: hasRecursion,
            dataStructures,
        },
    }
}

function countLoops(code: string, language: Language): number {
    let count = 0

    switch (language) {
        case "python":
            // Count 'for' and 'while' loops in Python
            count += (code.match(/\bfor\b\s+\w+\s+in/g) || []).length
            count += (code.match(/\bwhile\b\s+/g) || []).length
            break

        case "cpp":
        case "java":
            // Count 'for', 'while', and 'do-while' loops in C++ and Java
            count += (code.match(/\bfor\b\s*\(/g) || []).length
            count += (code.match(/\bwhile\b\s*\(/g) || []).length
            count += (code.match(/\bdo\b\s*\{/g) || []).length
            break
    }

    return count
}

function checkRecursion(code: string, language: Language): boolean {
    // Extract function/method names
    let functionNames: string[] = []

    switch (language) {
        case "python":
            const pythonFunctionMatches = code.match(/def\s+(\w+)\s*\(/g)
            if (pythonFunctionMatches) {
                functionNames = pythonFunctionMatches
                    .map((fn) => {
                        const match = fn.match(/def\s+(\w+)/)
                        return match ? match[1] : ""
                    })
                    .filter(Boolean)
            }
            break

        case "cpp":
        case "java":
            // This is a simplified regex for C++ and Java functions/methods
            const cppJavaFunctionMatches = code.match(/\b\w+\s+(\w+)\s*\(/g)
            if (cppJavaFunctionMatches) {
                functionNames = cppJavaFunctionMatches
                    .map((fn) => {
                        const match = fn.match(/\s+(\w+)\s*\(/)
                        return match ? match[1] : ""
                    })
                    .filter(Boolean)
            }
            break
    }

    // Check if any function calls itself within its definition
    for (const name of functionNames) {
        if (name) {
            // Create a regex to find the function definition and its body
            let functionBodyRegex
            let functionBody = ""

            switch (language) {
                case "python":
                    functionBodyRegex = new RegExp(`def\\s+${name}\\s*\$$[^)]*\$$\\s*:([\\s\\S]*?)(?=\\n\\S|$)`, "g")
                    const pythonMatch = functionBodyRegex.exec(code)
                    if (pythonMatch && pythonMatch[1]) {
                        functionBody = pythonMatch[1]
                    }
                    break

                case "cpp":
                case "java":
                    // This is a very simplified approach and might not work for all cases
                    functionBodyRegex = new RegExp(`\\b\\w+\\s+${name}\\s*\$$[^)]*\$$\\s*\\{([\\s\\S]*?)\\}`, "g")
                    const cppJavaMatch = functionBodyRegex.exec(code)
                    if (cppJavaMatch && cppJavaMatch[1]) {
                        functionBody = cppJavaMatch[1]
                    }
                    break
            }

            // Check if the function calls itself in its body
            if (functionBody && new RegExp(`\\b${name}\\s*\\(`, "g").test(functionBody)) {
                return true
            }
        }
    }

    return false
}

function identifyDataStructures(code: string, language: Language): string[] {
    const dataStructures: string[] = []

    switch (language) {
        case "python":
            if (code.includes("list(") || /\[\s*[\w'"]\s*,/.test(code)) dataStructures.push("List")
            if (code.includes("dict(") || /\{\s*['"]?\w+['"]?\s*:/.test(code)) dataStructures.push("Dictionary")
            if (code.includes("set(")) dataStructures.push("Set")
            if (code.includes("tuple(") || /\(\s*[\w'"]\s*,/.test(code)) dataStructures.push("Tuple")
            break

        case "cpp":
            if (code.includes("vector<")) dataStructures.push("Vector")
            if (code.includes("map<")) dataStructures.push("Map")
            if (code.includes("set<")) dataStructures.push("Set")
            if (code.includes("unordered_map<")) dataStructures.push("HashMap")
            if (code.includes("queue<")) dataStructures.push("Queue")
            if (code.includes("stack<")) dataStructures.push("Stack")
            break

        case "java":
            if (code.includes("ArrayList<")) dataStructures.push("ArrayList")
            if (code.includes("HashMap<")) dataStructures.push("HashMap")
            if (code.includes("HashSet<")) dataStructures.push("HashSet")
            if (code.includes("LinkedList<")) dataStructures.push("LinkedList")
            if (code.includes("Queue<")) dataStructures.push("Queue")
            if (code.includes("Stack<")) dataStructures.push("Stack")
            break
    }

    // If no specific data structures are found, add "Array" if array syntax is detected
    if (dataStructures.length === 0) {
        if (
            (language === "python" && /\[\s*\d+\s*\]/.test(code)) ||
            ((language === "cpp" || language === "java") && /\[\s*\d*\s*\]/.test(code))
        ) {
            dataStructures.push("Array")
        }
    }

    return dataStructures
}

function determineTimeComplexity(
    code: string,
    language: Language,
    loopCount: number,
    hasRecursion: boolean,
): { notation: string; explanation: string } {
    // Check for nested loops
    let nestedLoopDepth = 0

    if (loopCount > 1) {
        // Simple check for nested loops based on indentation
        const lines = code.split("\n")
        let currentIndentation = -1
        let maxNestingLevel = 0
        let currentNestingLevel = 0

        for (const line of lines) {
            const trimmedLine = line.trim()
            if (!trimmedLine) continue

            const indentation = line.search(/\S/)

            // If this is a loop statement
            if (
                (trimmedLine.startsWith("for") && (trimmedLine.includes(" in ") || trimmedLine.includes("("))) ||
                trimmedLine.startsWith("while")
            ) {
                if (currentIndentation === -1 || indentation === currentIndentation) {
                    // Same level loop
                    currentIndentation = indentation
                    currentNestingLevel = 1
                } else if (indentation > currentIndentation) {
                    // Nested loop
                    currentNestingLevel++
                    currentIndentation = indentation
                }

                maxNestingLevel = Math.max(maxNestingLevel, currentNestingLevel)
            }
            // If this is a closing bracket or dedent
            else if ((language === "cpp" || language === "java") && trimmedLine === "}") {
                if (indentation < currentIndentation) {
                    currentNestingLevel = Math.max(0, currentNestingLevel - 1)
                    currentIndentation = indentation
                }
            }
        }

        nestedLoopDepth = maxNestingLevel
    } else {
        nestedLoopDepth = loopCount
    }

    // Check for binary search pattern
    const hasBinarySearchPattern =
        code.includes("/= 2") ||
        code.includes("/ 2") ||
        code.includes(">> 1") ||
        code.includes("mid = left + (right - left) / 2") ||
        code.includes("mid = (left + right) / 2")

    // Check for divide and conquer pattern
    const hasDivideAndConquerPattern = code.includes("merge") && (code.includes("sort") || code.includes("divide"))

    // Determine complexity based on code patterns
    if (hasRecursion) {
        // Check for common recursive patterns
        if (hasBinarySearchPattern) {
            return {
                notation: "O(log n)",
                explanation:
                    "Your code uses recursive binary search, which divides the problem size in half with each recursive call, resulting in logarithmic time complexity.",
            }
        } else if (hasDivideAndConquerPattern) {
            return {
                notation: "O(n log n)",
                explanation:
                    "Your code appears to use a divide-and-conquer approach like merge sort, which typically has linearithmic time complexity.",
            }
        } else if (code.includes("fibonacci") || /fib\s*\(/.test(code)) {
            return {
                notation: "O(2^n)",
                explanation:
                    "Your code appears to calculate Fibonacci numbers using naive recursion, which has exponential time complexity due to redundant calculations.",
            }
        } else {
            // Generic recursive function
            return {
                notation: "O(n)",
                explanation:
                    "Your code contains recursive function calls with linear recursion depth, resulting in linear time complexity.",
            }
        }
    } else if (nestedLoopDepth >= 3) {
        return {
            notation: "O(n³)",
            explanation:
                "Your code contains three levels of nested loops, resulting in cubic time complexity. Each nested loop multiplies the number of operations by the size of the input.",
        }
    } else if (nestedLoopDepth === 2) {
        return {
            notation: "O(n²)",
            explanation:
                "Your code contains nested loops, resulting in quadratic time complexity. Each nested loop multiplies the number of operations by the size of the input.",
        }
    } else if (nestedLoopDepth === 1) {
        // Check if the loop has logarithmic pattern (like binary search)
        if (hasBinarySearchPattern) {
            return {
                notation: "O(log n)",
                explanation:
                    "Your code appears to divide the problem size by a constant factor in each iteration, resulting in logarithmic time complexity.",
            }
        } else {
            return {
                notation: "O(n)",
                explanation:
                    "Your code contains a single loop that iterates through the input, resulting in linear time complexity.",
            }
        }
    } else {
        return {
            notation: "O(1)",
            explanation:
                "Your code doesn't contain loops or recursion, resulting in constant time complexity. The execution time doesn't depend on the input size.",
        }
    }
}

function determineSpaceComplexity(
    code: string,
    language: Language,
    dataStructures: string[],
    hasRecursion: boolean,
): { notation: string; explanation: string } {
    // Check if the code creates new data structures proportional to input
    const createsNewDataStructures =
        dataStructures.length > 0 &&
        (code.includes("new ") ||
            code.includes("malloc") ||
            code.includes("= []") ||
            code.includes("= {}") ||
            code.includes("= list(") ||
            code.includes("= dict("))

    // Check if the code uses in-place algorithms
    const usesInPlaceAlgorithm = code.includes("in-place") || code.includes("inplace") || code.includes("swap(")

    if (hasRecursion) {
        // Check for tail recursion optimization
        const hasTailRecursion = code.includes("return") && !code.match(/return[^;]*\w+\s*$$[^;]*$$/)

        if (hasTailRecursion) {
            return {
                notation: "O(1)",
                explanation: "Your code uses tail recursion, which can be optimized by the compiler to use constant space.",
            }
        } else {
            return {
                notation: "O(n)",
                explanation:
                    "Your code uses recursion, which typically requires stack space proportional to the depth of recursion, resulting in linear space complexity.",
            }
        }
    } else if (createsNewDataStructures) {
        if (usesInPlaceAlgorithm) {
            return {
                notation: "O(1)",
                explanation:
                    "Although your code uses data structures, it appears to use in-place algorithms that don't require additional space proportional to the input size.",
            }
        } else {
            return {
                notation: "O(n)",
                explanation: `Your code creates new data structures (${dataStructures.join(", ")}) that store elements from the input, resulting in linear space complexity.`,
            }
        }
    } else {
        return {
            notation: "O(1)",
            explanation:
                "Your code uses a constant amount of space regardless of input size, resulting in constant space complexity.",
        }
    }
}

