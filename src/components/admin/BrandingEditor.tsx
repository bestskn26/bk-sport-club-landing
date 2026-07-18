"use client";

import { useState, type ChangeEvent } from "react";
import { Loader2, Trash2, Upload, X } from "lucide-react";
import {
  processFaviconFile,
  processLogoFile,
  type ProcessedImage,
} from "@/lib/image-resize";

export type BrandingKind = "logo" | "favicon";

export default function BrandingEditor({
  kind,
  title,
  description,
  accept,
  currentUrl,
  onUpdated,
}: {
  kind: BrandingKind;
  title: string;
  description: string;
  accept: string;
  currentUrl: string | null;
  onUpdated: (url: string | null) => void;
}) {
  const [pending, setPending] = useState<ProcessedImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError("");
    try {
      const processed =
        kind === "logo"
          ? await processLogoFile(file)
          : await processFaviconFile(file);
      setPending(processed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ไม่สามารถประมวลผลรูปภาพได้",
      );
    }
  }

  function handleCancelPending() {
    setPending(null);
    setError("");
  }

  async function handleSave() {
    if (!pending) return;
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("kind", kind);
      formData.append("file", pending.blob, pending.filename);

      const res = await fetch("/api/admin/branding", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "อัปโหลดไม่สำเร็จ");

      onUpdated(data.url as string);
      setPending(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/branding", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "ลบไม่สำเร็จ");

      onUpdated(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ลบไม่สำเร็จ");
    } finally {
      setDeleting(false);
    }
  }

  const imageClass = kind === "logo" ? "h-14 w-auto" : "h-8 w-8";
  const previewBoxClass =
    kind === "logo"
      ? "flex h-20 min-w-[8rem] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4"
      : "flex h-20 w-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50";

  const displayUrl = pending?.previewUrl ?? currentUrl;

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className={previewBoxClass}>
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote/blob preview URL, not optimizable via next/image
            <img
              src={displayUrl}
              alt={title}
              className={imageClass}
            />
          ) : (
            <span className="text-xs text-slate-400">ไม่มีรูป</span>
          )}
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary">
            <Upload size={15} />
            {currentUrl || pending ? "เลือกรูปใหม่" : "อัปโหลดรูป"}
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {pending && (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                บันทึก
              </button>
              <button
                type="button"
                onClick={handleCancelPending}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
                ยกเลิก
              </button>
            </>
          )}

          {!pending && currentUrl && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {deleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              ลบรูปนี้
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
