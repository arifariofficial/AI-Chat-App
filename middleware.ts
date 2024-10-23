import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow unauthenticated access to "/", "/miesta", and login page "/auth/login"
  const publicPaths = ["/", "/meista", "/yhteystiedot", "/chat", "/auth/login"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access a protected route
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If user is authenticated and tries to access the login page, redirect them to "/chat"
  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
