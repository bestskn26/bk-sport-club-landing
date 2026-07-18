"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Trophy } from "lucide-react";
import { LOGO_HEIGHT_MAX, LOGO_HEIGHT_MIN } from "@/lib/branding";

function SizeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-primary">{value}px</span>
      </div>
      <input
        type="range"
        min={LOGO_HEIGHT_MIN}
        max={LOGO_HEIGHT_MAX}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{LOGO_HEIGHT_MIN}px</span>
        <span>{LOGO_HEIGHT_MAX}px</span>
      </div>
    </label>
  );
}

export default function LogoSizeEditor({
  logoPreviewUrl,
  navbarLogoHeight,
  footerLogoHeight,
  onSaved,
}: {
  logoPreviewUrl: string | null;
  navbarLogoHeight: number;
  footerLogoHeight: number;
  onSaved: (sizes: { navbarLogoHeight: number; footerLogoHeight: number }) => void;
}) {
  const [navbarHeight, setNavbarHeight] = useState(navbarLogoHeight);
  const [footerHeight, setFooterHeight] = useState(footerLogoHeight);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/branding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          navbarLogoHeight: navbarHeight,
          footerLogoHeight: footerHeight,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "บันทึกไม่สำเร็จ");

      setNavbarHeight(data.navbarLogoHeight);
      setFooterHeight(data.footerLogoHeight);
      onSaved({
        navbarLogoHeight: data.navbarLogoHeight,
        footerLogoHeight: data.footerLogoHeight,
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900">ขนาด Logo</h3>
      <p className="mt-1 text-sm text-slate-500">
        กำหนดความสูงของ Logo แยกกันสำหรับ Navbar และ Footer — ความกว้างจะปรับตามสัดส่วนภาพอัตโนมัติ
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <SizeSlider
            label="ความสูง Logo ใน Navbar"
            value={navbarHeight}
            onChange={setNavbarHeight}
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Preview Navbar
            </p>
            <div className="mt-2 flex h-24 items-center rounded-xl border border-slate-200 bg-white px-4">
              {logoPreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote/blob preview URL, not optimizable via next/image
                <img
                  src={logoPreviewUrl}
                  alt="ตัวอย่าง Logo ใน Navbar"
                  style={{ height: navbarHeight }}
                  className="w-auto"
                />
              ) : (
                <span className="flex items-center gap-2 text-slate-400">
                  <Trophy size={20} />
                  <span className="text-sm">
                    ยังไม่มี Logo — จะแสดงข้อความ &quot;BK Sport Club&quot; แทน
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SizeSlider
            label="ความสูง Logo ใน Footer"
            value={footerHeight}
            onChange={setFooterHeight}
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Preview Footer
            </p>
            <div className="mt-2 flex h-24 items-center rounded-xl border border-slate-800 bg-slate-950 px-4">
              {logoPreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote/blob preview URL, not optimizable via next/image
                <img
                  src={logoPreviewUrl}
                  alt="ตัวอย่าง Logo ใน Footer"
                  style={{ height: footerHeight }}
                  className="w-auto"
                />
              ) : (
                <span className="flex items-center gap-2 text-slate-500">
                  <Trophy size={20} />
                  <span className="text-sm">
                    ยังไม่มี Logo — จะแสดงข้อความ &quot;BK Sport Club&quot; แทน
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          บันทึกขนาด Logo
        </button>

        {saved && !saving && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <CheckCircle2 size={14} />
            บันทึกแล้ว
          </span>
        )}
        {error && <span className="text-sm font-medium text-red-600">{error}</span>}
      </div>
    </div>
  );
}
