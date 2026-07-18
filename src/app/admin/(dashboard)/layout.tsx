"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  ExternalLink,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Trophy,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "เนื้อหาเว็บไซต์", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Logo & Favicon", icon: ImageIcon },
] as const;

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 sm:flex">
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white sm:flex sm:flex-col">
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Trophy size={18} />
          </span>
          <span className="text-base font-bold text-slate-900">
            BK Sport Club
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary"
          >
            <ExternalLink size={16} />
            ดูหน้าเว็บ
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-white sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Trophy size={16} />
            </span>
            <span className="text-sm font-bold text-slate-900">
              BK Sport Club Admin
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
            aria-label="ออกจากระบบ"
          >
            <LogOut size={18} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600"
          >
            ดูหน้าเว็บ
          </a>
        </div>
      </div>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
