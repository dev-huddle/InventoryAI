import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

// List of public paths that do not require authentication
const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Retrieve access token from cookies
    const accessToken = request.cookies.get("accessToken");

    // If user is authenticated, restrict access to public paths
    if (accessToken && PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }

    // Protect all routes inside the "dashboard" folder
    if (!accessToken && pathname.startsWith("/app")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/", "/login", "/register"]
};