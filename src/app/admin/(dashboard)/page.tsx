"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Save } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import HeroEditor from "@/components/admin/HeroEditor";
import FeaturesEditor from "@/components/admin/FeaturesEditor";
import PricingEditor from "@/components/admin/PricingEditor";
import ContactEditor from "@/components/admin/ContactEditor";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => {
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => setContent(data))
      .catch(() =>
        setMessage({ type: "error", text: "โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้า" }),
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "บันทึกไม่สำเร็จ");
      }
      setMessage({ type: "success", text: "บันทึกข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "บันทึกไม่สำเร็จ",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-600">
          {message?.text ?? "ไม่สามารถโหลดข้อมูลได้"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold text-slate-900">เนื้อหาเว็บไซต์</h1>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={16} />
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </div>

        {message && (
          <div
            className={`mx-auto max-w-5xl px-6 pb-3 text-sm font-medium ${
              message.type === "success" ? "text-primary" : "text-red-600"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {message.type === "success" && <CheckCircle2 size={14} />}
              {message.text}
            </span>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "bg-white text-slate-600 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          {activeTab === "hero" && (
            <HeroEditor
              hero={content.hero}
              onChange={(hero) => setContent({ ...content, hero })}
            />
          )}
          {activeTab === "features" && (
            <FeaturesEditor
              features={content.features}
              onChange={(features) => setContent({ ...content, features })}
            />
          )}
          {activeTab === "pricing" && (
            <PricingEditor
              plans={content.pricing}
              onChange={(pricing) => setContent({ ...content, pricing })}
            />
          )}
          {activeTab === "contact" && (
            <ContactEditor
              contact={content.contact}
              onChange={(contact) => setContent({ ...content, contact })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
