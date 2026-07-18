import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  venueName?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body: ContactPayload = await request.json();
  const { name, phone, email, venueName } = body;

  if (!name || !phone || !venueName) {
    return NextResponse.json(
      { error: "กรุณากรอกชื่อ เบอร์โทร และชื่อสนามให้ครบถ้วน" },
      { status: 400 },
    );
  }

  // TODO: ต่อเชื่อมกับอีเมล/CRM จริง (เช่น ส่งอีเมลแจ้งทีมขาย หรือบันทึกลงระบบ CRM)
  console.log("New demo request:", { name, phone, email, venueName });

  return NextResponse.json({ ok: true });
}
