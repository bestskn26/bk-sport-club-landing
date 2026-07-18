import { getIcon } from "@/lib/icons";
import type { FeatureItem } from "@/lib/content";

export default function Features({ features }: { features: FeatureItem[] }) {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            ฟีเจอร์หลัก
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            ทุกสิ่งที่สนามกีฬาต้องการ ในระบบเดียว
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ออกแบบมาเพื่อผู้ประกอบการสนามกีฬาโดยเฉพาะ ครอบคลุมตั้งแต่หน้าบ้านถึงหลังบ้าน
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ id, icon, title, description }) => {
            const Icon = getIcon(icon);
            return (
              <div
                key={id}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
