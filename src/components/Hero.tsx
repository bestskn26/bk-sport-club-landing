import { ArrowRight, Phone, Star } from "lucide-react";
import CourtIllustration from "./CourtIllustration";
import type { HeroContent } from "@/lib/content";

export default function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-primary/5 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Star size={14} className="fill-primary text-primary" />
            ระบบจองสนามกีฬาสำหรับผู้ประกอบการ
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="text-primary">{hero.brandName}</span>
            <br />
            {hero.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {hero.primaryCta.label}
              <ArrowRight size={18} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              <Phone size={18} />
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            <div>
              <p className="text-2xl font-bold text-slate-900">11+</p>
              <p className="mt-1 text-sm text-slate-500">ประเภทกีฬา</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">24 ชม.</p>
              <p className="mt-1 text-sm text-slate-500">จองได้ตลอดเวลา</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">หลายสาขา</p>
              <p className="mt-1 text-sm text-slate-500">บริหารจากที่เดียว</p>
            </div>
          </div>
        </div>

        <CourtIllustration />
      </div>
    </section>
  );
}
