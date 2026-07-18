"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      venueName: formData.get("venueName"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <p className="text-lg font-semibold text-primary">
          ขอบคุณสำหรับความสนใจ!
        </p>
        <p className="mt-2 text-sm text-slate-600">
          ทีมงาน BK Sport Club จะติดต่อกลับเพื่อนัดหมาย Demo โดยเร็วที่สุด
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
        >
          ส่งข้อมูลอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            ชื่อ-นามสกุล <span className="text-secondary-dark">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="เช่น สมชาย ใจดี"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            เบอร์โทรศัพท์ <span className="text-secondary-dark">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="08X-XXX-XXXX"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            อีเมล
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="venueName"
            className="text-sm font-medium text-slate-700"
          >
            ชื่อสนาม <span className="text-secondary-dark">*</span>
          </label>
          <input
            id="venueName"
            name="venueName"
            type="text"
            required
            placeholder="เช่น BK Futsal Arena"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-700">
          รายละเอียดเพิ่มเติม
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="จำนวนสนาม ประเภทกีฬา หรือความต้องการอื่นๆ"
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            กำลังส่งข้อมูล...
          </>
        ) : (
          <>
            <Send size={18} />
            ขอ Demo ฟรี
          </>
        )}
      </button>
    </form>
  );
}
