import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import {
  clampLogoHeight,
  readBranding,
  writeBranding,
  type BrandingContent,
} from "@/lib/branding";

const KINDS = ["logo", "favicon"] as const;
type Kind = (typeof KINDS)[number];

function isKind(value: unknown): value is Kind {
  return typeof value === "string" && (KINDS as readonly string[]).includes(value);
}

function fieldFor(kind: Kind): "logoUrl" | "faviconUrl" {
  return kind === "logo" ? "logoUrl" : "faviconUrl";
}

export async function GET() {
  const branding = await readBranding();
  return NextResponse.json(branding);
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const kind = formData?.get("kind");
  const file = formData?.get("file");

  if (!isKind(kind) || !(file instanceof File)) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const pathname = `branding/${kind}-${Date.now()}.${extension}`;

  let uploaded;
  try {
    uploaded = await put(pathname, file, {
      access: "public",
      contentType: file.type || "application/octet-stream",
    });
  } catch (err) {
    console.error("Failed to upload to Vercel Blob:", err);
    return NextResponse.json(
      {
        error:
          "อัปโหลดไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel Blob (BLOB_READ_WRITE_TOKEN)",
      },
      { status: 500 },
    );
  }

  const field = fieldFor(kind);
  const branding = await readBranding();
  const previousUrl = branding[field];

  try {
    await writeBranding({ ...branding, [field]: uploaded.url });
  } catch (err) {
    console.error("Failed to write branding to Vercel KV:", err);
    del(uploaded.url).catch((delErr) =>
      console.error("Failed to clean up orphaned blob:", delErr),
    );
    return NextResponse.json(
      {
        error:
          "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel KV (KV_REST_API_URL / KV_REST_API_TOKEN)",
      },
      { status: 500 },
    );
  }

  if (previousUrl) {
    del(previousUrl).catch((err) =>
      console.error("Failed to delete previous blob:", err),
    );
  }

  return NextResponse.json({ ok: true, url: uploaded.url });
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    navbarLogoHeight?: unknown;
    footerLogoHeight?: unknown;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const branding = await readBranding();
  const updated: BrandingContent = {
    ...branding,
    navbarLogoHeight:
      body.navbarLogoHeight !== undefined
        ? clampLogoHeight(body.navbarLogoHeight, branding.navbarLogoHeight)
        : branding.navbarLogoHeight,
    footerLogoHeight:
      body.footerLogoHeight !== undefined
        ? clampLogoHeight(body.footerLogoHeight, branding.footerLogoHeight)
        : branding.footerLogoHeight,
  };

  try {
    await writeBranding(updated);
  } catch (err) {
    console.error("Failed to write branding to Vercel KV:", err);
    return NextResponse.json(
      {
        error:
          "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel KV (KV_REST_API_URL / KV_REST_API_TOKEN)",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    kind?: string;
  } | null;

  if (!body || !isKind(body.kind)) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const field = fieldFor(body.kind);
  const branding = await readBranding();
  const currentUrl = branding[field];

  try {
    await writeBranding({ ...branding, [field]: null });
  } catch (err) {
    console.error("Failed to write branding to Vercel KV:", err);
    return NextResponse.json(
      {
        error:
          "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel KV (KV_REST_API_URL / KV_REST_API_TOKEN)",
      },
      { status: 500 },
    );
  }

  if (currentUrl) {
    try {
      await del(currentUrl);
    } catch (err) {
      console.error("Failed to delete blob:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
