"use client";

import { useEffect, useState } from "react";
import type { BrandingContent } from "@/lib/branding";
import BrandingEditor from "@/components/admin/BrandingEditor";

export default function AdminSettingsPage() {
  const [branding, setBranding] = useState<BrandingContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/api/admin/branding")
      .then((res) => {
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => setBranding(data))
      .catch(() => setLoadError("โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้า"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!branding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-600">{loadError || "ไม่สามารถโหลดข้อมูลได้"}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">ตั้งค่า Logo และ Favicon</h1>
      <p className="mt-1 text-sm text-slate-500">
        อัปโหลดรูปเพื่อแสดงแทนข้อความ/ไอคอนเริ่มต้นบนหน้าเว็บ — บันทึกทันทีไม่ต้องกด &quot;บันทึกการเปลี่ยนแปลง&quot; แยก
      </p>

      <div className="mt-8 space-y-8">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <BrandingEditor
            kind="logo"
            title="Logo (แสดงใน Navbar)"
            description="รองรับ PNG, JPG, SVG — ระบบจะปรับขนาดความสูงเป็น 56px โดยรักษาสัดส่วนภาพอัตโนมัติ"
            accept="image/png,image/jpeg,image/svg+xml"
            currentUrl={branding.logoUrl}
            onUpdated={(url) =>
              setBranding((prev) => (prev ? { ...prev, logoUrl: url } : prev))
            }
          />
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <BrandingEditor
            kind="favicon"
            title="Favicon (แสดงบน Browser Tab)"
            description="รองรับ PNG, JPG, ICO — ระบบจะปรับขนาดเป็น 32x32px อัตโนมัติ"
            accept="image/png,image/jpeg,image/x-icon,.ico"
            currentUrl={branding.faviconUrl}
            onUpdated={(url) =>
              setBranding((prev) => (prev ? { ...prev, faviconUrl: url } : prev))
            }
          />
        </div>
      </div>
    </div>
  );
}
