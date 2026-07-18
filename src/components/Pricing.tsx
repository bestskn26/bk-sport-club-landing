import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/content";

export default function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            แพ็กเกจราคา
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            เลือกแพ็กเกจที่เหมาะกับสนามของคุณ
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ไม่มีค่าใช้จ่ายแอบแฝง ยกเลิกเมื่อไหร่ก็ได้ ทีมงานพร้อมให้คำปรึกษาก่อนตัดสินใจ
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-white shadow-2xl shadow-primary/20 lg:-translate-y-4"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                  แนะนำมากที่สุด
                </span>
              )}

              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-2 min-h-[3rem] text-sm text-slate-600">
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                {plan.price === "ติดต่อเรา" ? (
                  <span className="text-3xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-slate-500">
                      ฿
                    </span>
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plan.price}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500">{plan.period}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        plan.highlighted
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark"
                    : "border border-slate-200 text-slate-700 hover:border-primary/30 hover:text-primary"
                }`}
              >
                ติดต่อสอบถาม
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
