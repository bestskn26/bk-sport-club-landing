"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Globe, Loader2, Plus, Trash2 } from "lucide-react";

type VercelStatus = {
  added: boolean;
  verified: boolean;
  misconfigured: boolean;
} | null;

type SubdomainItem = {
  subdomain: string;
  fqdn: string;
  createdAt: string;
  dnsStatus: "ready" | "pending";
  vercelStatus: VercelStatus;
};

type Message = { type: "success" | "error"; text: string };

export default function AdminSubdomainsPage() {
  const [domain, setDomain] = useState("bksportclub.com");
  const [items, setItems] = useState<SubdomainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSubdomain, setNewSubdomain] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingSubdomain, setDeletingSubdomain] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState<Message | null>(null);

  function load() {
    setLoading(true);
    return fetch("/api/admin/subdomains")
      .then((res) => {
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => {
        setDomain(data.domain);
        setItems(data.subdomains);
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้า",
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch("/api/admin/subdomains")
      .then((res) => {
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => {
        setDomain(data.domain);
        setItems(data.subdomains);
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้า",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/subdomains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomain: newSubdomain }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "เพิ่ม subdomain ไม่สำเร็จ");

      setNewSubdomain("");
      setMessage({
        type: "success",
        text: `เพิ่ม ${data.subdomain.fqdn} สำเร็จ`,
      });
      await load();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "เกิดข้อผิดพลาด",
      });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(subdomain: string) {
    if (!confirm(`ต้องการลบ ${subdomain}.${domain} ใช่หรือไม่?`)) return;

    setDeletingSubdomain(subdomain);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/subdomains", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomain }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "ลบ subdomain ไม่สำเร็จ");

      setMessage({ type: "success", text: `ลบ ${subdomain}.${domain} สำเร็จ` });
      await load();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "เกิดข้อผิดพลาด",
      });
    } finally {
      setDeletingSubdomain(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">จัดการ Subdomain</h1>
      <p className="mt-1 text-sm text-slate-500">
        เพิ่มหรือลบ subdomain สำหรับลูกค้าแต่ละราย
        ระบบจะสร้าง DNS record ผ่าน Porkbun และเพิ่ม domain ใน Vercel ให้อัตโนมัติ
      </p>

      {message && (
        <div
          className={`mt-6 rounded-xl px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleCreate}
        className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-base font-semibold text-slate-900">
          เพิ่ม Subdomain ใหม่
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center rounded-xl border border-slate-200 px-4 focus-within:border-primary">
            <input
              value={newSubdomain}
              onChange={(e) => setNewSubdomain(e.target.value)}
              placeholder="bpro"
              pattern="[a-z0-9-]+"
              className="w-full min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none"
              required
            />
            <span className="flex-shrink-0 text-sm text-slate-400">
              .{domain}
            </span>
          </div>
          <button
            type="submit"
            disabled={creating || !newSubdomain}
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            เพิ่ม
          </button>
        </div>
      </form>

      <div className="mt-8 rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Subdomain ทั้งหมด
          </h2>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            กำลังโหลดข้อมูล...
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            ยังไม่มี subdomain
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li
                key={item.subdomain}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Globe size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.fqdn}
                    </p>
                    <p className="text-xs text-slate-400">
                      สร้างเมื่อ{" "}
                      {new Date(item.createdAt).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge
                    label="DNS"
                    ready={item.dnsStatus === "ready"}
                  />
                  <StatusBadge
                    label="Vercel"
                    ready={Boolean(item.vercelStatus?.verified)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(item.subdomain)}
                    disabled={deletingSubdomain === item.subdomain}
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`ลบ ${item.subdomain}`}
                  >
                    {deletingSubdomain === item.subdomain ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ label, ready }: { label: string; ready: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        ready
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {label}: {ready ? "พร้อมใช้งาน" : "กำลังตั้งค่า"}
    </span>
  );
}
