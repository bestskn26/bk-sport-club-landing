import { Plus, Trash2, X } from "lucide-react";
import type { PricingPlan } from "@/lib/content";
import { Field, inputClass } from "./fields";

function newPlan(): PricingPlan {
  return {
    id: crypto.randomUUID(),
    name: "แพ็กเกจใหม่",
    tagline: "",
    price: "0",
    period: "บาท / เดือน",
    highlighted: false,
    features: [],
  };
}

export default function PricingEditor({
  plans,
  onChange,
}: {
  plans: PricingPlan[];
  onChange: (plans: PricingPlan[]) => void;
}) {
  function updateAt(index: number, patch: Partial<PricingPlan>) {
    onChange(
      plans.map((plan, i) => (i === index ? { ...plan, ...patch } : plan)),
    );
  }

  function removeAt(index: number) {
    onChange(plans.filter((_, i) => i !== index));
  }

  function updateFeatureLine(
    planIndex: number,
    featureIndex: number,
    value: string,
  ) {
    const plan = plans[planIndex];
    const features = plan.features.map((f, i) =>
      i === featureIndex ? value : f,
    );
    updateAt(planIndex, { features });
  }

  function removeFeatureLine(planIndex: number, featureIndex: number) {
    const plan = plans[planIndex];
    updateAt(planIndex, {
      features: plan.features.filter((_, i) => i !== featureIndex),
    });
  }

  function addFeatureLine(planIndex: number) {
    const plan = plans[planIndex];
    updateAt(planIndex, { features: [...plan.features, ""] });
  }

  return (
    <div className="space-y-6">
      {plans.map((plan, index) => (
        <div key={plan.id} className="rounded-xl border border-slate-100 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="ชื่อแพ็กเกจ">
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => updateAt(index, { name: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="คำอธิบายสั้นๆ">
                <input
                  type="text"
                  value={plan.tagline}
                  onChange={(e) =>
                    updateAt(index, { tagline: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="ราคา (ตัวเลข หรือ 'ติดต่อเรา')">
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => updateAt(index, { price: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="หน่วย/คาบเวลา">
                <input
                  type="text"
                  value={plan.period}
                  onChange={(e) => updateAt(index, { period: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={() => removeAt(index)}
              className="flex-shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              aria-label="ลบแพ็กเกจ"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={plan.highlighted}
              onChange={(e) =>
                updateAt(index, { highlighted: e.target.checked })
              }
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30"
            />
            แนะนำมากที่สุด (ไฮไลต์แพ็กเกจนี้)
          </label>

          <div className="mt-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              รายการฟีเจอร์ในแพ็กเกจ
            </span>
            <div className="mt-2 space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      updateFeatureLine(index, featureIndex, e.target.value)
                    }
                    className={inputClass + " mt-0"}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeatureLine(index, featureIndex)}
                    className="flex-shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="ลบรายการนี้"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addFeatureLine(index)}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              <Plus size={14} />
              เพิ่มรายการ
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...plans, newPlan()])}
        className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary"
      >
        <Plus size={16} />
        เพิ่มแพ็กเกจ
      </button>
    </div>
  );
}
