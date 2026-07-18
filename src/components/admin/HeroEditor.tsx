import type { HeroContent } from "@/lib/content";
import { Field, inputClass } from "./fields";

export default function HeroEditor({
  hero,
  onChange,
}: {
  hero: HeroContent;
  onChange: (hero: HeroContent) => void;
}) {
  function update<K extends keyof HeroContent>(key: K, value: HeroContent[K]) {
    onChange({ ...hero, [key]: value });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="ชื่อแบรนด์ (Brand Name)">
          <input
            type="text"
            value={hero.brandName}
            onChange={(e) => update("brandName", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tagline">
          <input
            type="text"
            value={hero.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="คำอธิบายใต้ Tagline">
        <textarea
          rows={3}
          value={hero.description}
          onChange={(e) => update("description", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-sm font-semibold text-slate-900">
            ปุ่มหลัก (Primary CTA)
          </p>
          <div className="mt-4 space-y-4">
            <Field label="ข้อความปุ่ม">
              <input
                type="text"
                value={hero.primaryCta.label}
                onChange={(e) =>
                  update("primaryCta", {
                    ...hero.primaryCta,
                    label: e.target.value,
                  })
                }
                className={inputClass}
              />
            </Field>
            <Field label="ลิงก์ปุ่ม (href)">
              <input
                type="text"
                value={hero.primaryCta.href}
                onChange={(e) =>
                  update("primaryCta", {
                    ...hero.primaryCta,
                    href: e.target.value,
                  })
                }
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-sm font-semibold text-slate-900">
            ปุ่มรอง (Secondary CTA)
          </p>
          <div className="mt-4 space-y-4">
            <Field label="ข้อความปุ่ม">
              <input
                type="text"
                value={hero.secondaryCta.label}
                onChange={(e) =>
                  update("secondaryCta", {
                    ...hero.secondaryCta,
                    label: e.target.value,
                  })
                }
                className={inputClass}
              />
            </Field>
            <Field label="ลิงก์ปุ่ม (href)">
              <input
                type="text"
                value={hero.secondaryCta.href}
                onChange={(e) =>
                  update("secondaryCta", {
                    ...hero.secondaryCta,
                    href: e.target.value,
                  })
                }
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
