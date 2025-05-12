"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Clock, CheckCircle, Github, Terminal, Menu } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
              CodeMetrics
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
              Demo
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register">
              <Button className="shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow bg-indigo-500 hover:bg-indigo-600 text-white">
                Sign Up Free
              </Button>
            </Link>
          </nav>
          <button 
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link 
                href="#features" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#demo" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link 
                href="/login" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow bg-indigo-500 hover:bg-indigo-600 text-white">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="mx-auto flex flex-col items-center space-y-6 text-center max-w-4xl">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 animate-fade-in">
              <span className="text-xs sm:text-sm font-medium">Professional Code Analysis</span>
              <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
              <span className="text-xs sm:text-sm">Beta</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Understand Your Code's{" "}
              <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
                  Complexity
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-indigo-300"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 Q50,12 100,0"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl px-4">
              Instantly analyze and optimize your code's performance with expert insights.
              Get detailed time and space complexity analysis in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-105 bg-indigo-500 hover:bg-indigo-600">
                  Start Analyzing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/your-repo" target="_blank" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 hover:scale-105 transition-transform">
                  <Github className="h-4 w-4" /> Star on GitHub
                </Button>
              </Link>
            </div>
            <div className="pt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-500" />
                <span>C++</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-500" />
                <span>Python</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-500" />
                <span>Java</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">See it in Action</h2>
            <p className="text-muted-foreground max-w-3xl px-4">
              Paste your code and get instant analysis of its time and space complexity,
              along with detailed explanations and suggestions for optimization.
            </p>
          </div>
          <div className="rounded-xl border bg-card shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="flex items-center gap-2 bg-muted p-4 border-b">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-medium">Quick Sort Implementation Analysis</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
              {/* Code Section */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-medium">Source Code</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Python</span>
                </div>
                <div className="bg-muted rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre">
                  {`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)`}
                </div>
              </div>

              {/* Analysis Section */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium">Complexity Analysis</span>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      <h4 className="font-medium">Time Complexity</h4>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Average Case:</span>
                        <code className="text-sm bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded">O(n log n)</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Worst Case:</span>
                        <code className="text-sm bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded">O(n²)</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-indigo-500" />
                      <h4 className="font-medium">Space Complexity</h4>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Recursive Stack:</span>
                        <code className="text-sm bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded">O(log n)</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-500 mt-1 shrink-0" />
                        <span>Efficient divide-and-conquer algorithm with optimal average-case performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-500 mt-1 shrink-0" />
                        <span>In-place sorting possible with optimized implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-500 mt-1 shrink-0" />
                        <span>Performance depends on pivot selection strategy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto px-4">
              Everything you need to understand and optimize your code's performance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
            <div className="group relative p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:shadow-indigo-500/5">
              <div className="rounded-xl bg-indigo-500/10 p-4 w-fit mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Code className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Multi-Language Support</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Analyze code written in C++, Java, and Python with language-specific insights.
              </p>
            </div>
            <div className="group relative p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:shadow-indigo-500/5">
              <div className="rounded-xl bg-indigo-500/10 p-4 w-fit mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Clock className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Time Complexity</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get accurate Big O notation analysis with clear explanations of your algorithm's efficiency.
              </p>
            </div>
            <div className="group relative p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:shadow-indigo-500/5">
              <div className="rounded-xl bg-indigo-500/10 p-4 w-fit mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Database className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Space Complexity</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Understand memory usage patterns and optimize your code for better performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Optimize Your Code?</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join developers worldwide who are writing better, more efficient code with CodeMetrics.
            </p>
            <Link href="/register" className="block w-full sm:w-auto sm:inline-block">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-105 bg-indigo-500 hover:bg-indigo-600">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-indigo-500" />
              <span className="font-semibold">CodeMetrics</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-indigo-500">Features</Link>
              <Link href="#demo" className="text-sm text-muted-foreground hover:text-indigo-500">Demo</Link>
              <Link href="https://github.com/codemetrics" className="text-sm text-muted-foreground hover:text-indigo-500">GitHub</Link>
            </div>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} CodeMetrics
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

