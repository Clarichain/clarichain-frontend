import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth") && session?.user) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  if (pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
