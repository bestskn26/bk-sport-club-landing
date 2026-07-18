import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, sha256Hex } from "@/lib/auth";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า ADMIN_PASSWORD" },
      { status: 500 },
    );
  }

  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { error: "รหัสผ่านไม่ถูกต้อง" },
      { status: 401 },
    );
  }

  const token = await sha256Hex(adminPassword);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
