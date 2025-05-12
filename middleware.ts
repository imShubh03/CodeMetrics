import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    // Define which paths are protected (require authentication)
    const protectedPaths = ["/dashboard"]
    const isPathProtected = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

    if (isPathProtected) {
        const token = await getToken({ req })

        // Redirect to login if no token is found
        if (!token) {
            const url = new URL("/login", req.url)
            url.searchParams.set("callbackUrl", path)
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"],
}

