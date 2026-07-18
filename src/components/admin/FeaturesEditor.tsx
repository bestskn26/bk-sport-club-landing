import { Plus, Trash2 } from "lucide-react";
import type { FeatureItem } from "@/lib/content";
import { getIcon, ICON_NAMES } from "@/lib/icons";
import { Field, inputClass } from "./fields";

function newFeature(): FeatureItem {
  return {
    id: crypto.randomUUID(),
    icon: "Sparkles",
    title: "",
    description: "",
  };
}

export default function FeaturesEditor({
  features,
  onChange,
}: {
  features: FeatureItem[];
  onChange: (features: FeatureItem[]) => void;
}) {
  function updateAt(index: number, patch: Partial<FeatureItem>) {
    onChange(
      features.map((feature, i) =>
        i === index ? { ...feature, ...patch } : feature,
      ),
    );
  }

  function removeAt(index: number) {
    onChange(features.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);
        return (
          <div
            key={feature.id}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={20} />
              </span>

              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
                <Field label="ไอคอน">
                  <select
                    value={feature.icon}
                    onChange={(e) => updateAt(index, { icon: e.target.value })}
                    className={inputClass}
                  >
                    {ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="ชื่อฟีเจอร์">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      updateAt(index, { title: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <button
                type="button"
                onClick={() => removeAt(index)}
                className="mt-1 flex-shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                aria-label="ลบฟีเจอร์"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mt-4">
              <Field label="คำอธิบาย">
                <textarea
                  rows={2}
                  value={feature.description}
                  onChange={(e) =>
                    updateAt(index, { description: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onChange([...features, newFeature()])}
        className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary"
      >
        <Plus size={16} />
        เพิ่มฟีเจอร์
      </button>
    </div>
  );
}
