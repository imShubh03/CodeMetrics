"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code, User } from "lucide-react"
import { toast } from "sonner"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

export function DashboardHeader() {
    const { data: session } = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut({ redirect: false })
        toast("Logged out", {
            description: "You have been logged out successfully."
        })
        router.push("/")
    }

    return (
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px] flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Code className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">CodeMetrics</span>
                    </Link>
                </div>

                <nav className="flex items-center gap-4">
                    {session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image || "/placeholder.svg"}
                                            alt={session.user.name || "User"}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <User className="h-5 w-5" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{session.user.name || session.user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    )}
                </nav>
            </div>
        </header>
    )
}

