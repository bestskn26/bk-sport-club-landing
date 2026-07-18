import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, sha256Hex } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const expected = adminPassword ? await sha256Hex(adminPassword) : null;
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authorized = Boolean(expected) && token === expected;

  if (authorized) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
