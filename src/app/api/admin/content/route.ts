import { NextResponse } from "next/server";
import { readContent, writeContent, type SiteContent } from "@/lib/content";

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteContent | null;

  if (!body || !body.hero || !body.features || !body.pricing || !body.contact) {
    return NextResponse.json(
      { error: "รูปแบบข้อมูลไม่ถูกต้อง" },
      { status: 400 },
    );
  }

  await writeContent(body);
  return NextResponse.json({ ok: true, content: body });
}
