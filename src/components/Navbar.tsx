"use client";

import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "ฟีเจอร์" },
  { href: "#pricing", label: "ราคา" },
  { href: "#contact", label: "ติดต่อเรา" },
];

export default function Navbar({
  logoUrl,
  logoHeight = 56,
}: {
  logoUrl?: string | null;
  logoHeight?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote/blob logo URL, not optimizable via next/image
            <img
              src={logoUrl}
              alt="BK Sport Club"
              style={{ height: logoHeight }}
              className="w-auto"
            />
          ) : (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <Trophy size={20} />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                BK Sport Club
              </span>
            </>
          )}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-primary"
          >
            ติดต่อเรา
          </a>
          <a
            href="#demo"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:bg-primary-dark"
          >
            ขอ Demo ฟรี
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="เปิดเมนู"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
            >
              ขอ Demo ฟรี
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
