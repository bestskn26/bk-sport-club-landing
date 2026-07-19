import { NextResponse } from "next/server";
import {
  buildFqdn,
  checkDnsStatus,
  getRootDomain,
  isValidSubdomain,
  readSubdomains,
  writeSubdomains,
  type SubdomainRecord,
} from "@/lib/subdomains";
import { createCnameRecord, deleteCnameRecord } from "@/lib/porkbun";
import {
  addProjectDomain,
  getProjectDomainStatus,
  removeProjectDomain,
} from "@/lib/vercel-domains";

export async function GET() {
  const records = await readSubdomains();

  const withStatus = await Promise.all(
    records.map(async (record) => {
      const [dnsStatus, vercelStatus] = await Promise.all([
        checkDnsStatus(record.subdomain),
        getProjectDomainStatus(record.fqdn).catch((err) => {
          console.error("Failed to read Vercel domain status:", err);
          return null;
        }),
      ]);
      return { ...record, dnsStatus, vercelStatus };
    }),
  );

  return NextResponse.json({
    domain: getRootDomain(),
    subdomains: withStatus,
  });
}

export async function POST(request: Request) {
  console.log(
    "[api/admin/subdomains] POST — process.env.VERCEL_PROJECT_ID =",
    process.env.VERCEL_PROJECT_ID,
  );

  const body = (await request.json().catch(() => null)) as {
    subdomain?: string;
  } | null;

  const subdomain = body?.subdomain?.trim().toLowerCase();

  if (!subdomain || !isValidSubdomain(subdomain)) {
    return NextResponse.json(
      {
        error:
          "ชื่อ subdomain ไม่ถูกต้อง ใช้ได้เฉพาะตัวอักษรภาษาอังกฤษพิมพ์เล็ก ตัวเลข และขีดกลาง",
      },
      { status: 400 },
    );
  }

  const records = await readSubdomains();
  if (records.some((r) => r.subdomain === subdomain)) {
    return NextResponse.json(
      { error: `subdomain "${subdomain}" มีอยู่แล้ว` },
      { status: 409 },
    );
  }

  const fqdn = buildFqdn(subdomain);

  try {
    await createCnameRecord(subdomain);
  } catch (err) {
    console.error("Failed to create Porkbun CNAME record:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "เพิ่ม DNS record ไม่สำเร็จ",
      },
      { status: 500 },
    );
  }

  try {
    await addProjectDomain(fqdn);
  } catch (err) {
    console.error("Failed to add Vercel domain:", err);
    await deleteCnameRecord(subdomain).catch((cleanupErr) =>
      console.error(
        "Failed to roll back Porkbun CNAME record after Vercel failure:",
        cleanupErr,
      ),
    );
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "เพิ่ม domain ใน Vercel ไม่สำเร็จ",
      },
      { status: 500 },
    );
  }

  const newRecord: SubdomainRecord = {
    subdomain,
    fqdn,
    createdAt: new Date().toISOString(),
  };

  try {
    await writeSubdomains([...records, newRecord]);
  } catch (err) {
    console.error("Failed to write subdomains to Vercel KV:", err);
    return NextResponse.json(
      {
        error:
          "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel KV (KV_REST_API_URL / KV_REST_API_TOKEN)",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, subdomain: newRecord });
}

export async function DELETE(request: Request) {
  console.log(
    "[api/admin/subdomains] DELETE — process.env.VERCEL_PROJECT_ID =",
    process.env.VERCEL_PROJECT_ID,
  );

  const body = (await request.json().catch(() => null)) as {
    subdomain?: string;
  } | null;

  const subdomain = body?.subdomain?.trim().toLowerCase();
  if (!subdomain) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const records = await readSubdomains();
  const record = records.find((r) => r.subdomain === subdomain);
  if (!record) {
    return NextResponse.json(
      { error: `ไม่พบ subdomain "${subdomain}"` },
      { status: 404 },
    );
  }

  try {
    await removeProjectDomain(record.fqdn);
  } catch (err) {
    console.error("Failed to remove Vercel domain:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "ลบ domain ใน Vercel ไม่สำเร็จ",
      },
      { status: 500 },
    );
  }

  try {
    await deleteCnameRecord(subdomain);
  } catch (err) {
    console.error("Failed to delete Porkbun CNAME record:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "ลบ DNS record ไม่สำเร็จ",
      },
      { status: 500 },
    );
  }

  try {
    await writeSubdomains(records.filter((r) => r.subdomain !== subdomain));
  } catch (err) {
    console.error("Failed to write subdomains to Vercel KV:", err);
    return NextResponse.json(
      {
        error:
          "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า Vercel KV (KV_REST_API_URL / KV_REST_API_TOKEN)",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
