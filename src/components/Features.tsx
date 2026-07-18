import {
  BarChart3,
  Building2,
  CalendarClock,
  LogIn,
  QrCode,
  Shapes,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: CalendarClock,
    title: "จองสนามออนไลน์ได้ 24 ชม.",
    description:
      "ลูกค้าเช็กตารางว่างและจองสนามได้เองทุกที่ทุกเวลา ลดภาระการรับโทรศัพท์ของพนักงาน",
  },
  {
    icon: Shapes,
    title: "รองรับหลายกีฬา 11 ประเภท",
    description:
      "ฟุตซอล แบดมินตัน บาสเกตบอล เทนนิส วอลเลย์บอล และอีกมากมาย ในระบบเดียว",
  },
  {
    icon: QrCode,
    title: "ชำระเงินผ่าน PromptPay / โอนเงิน",
    description:
      "รองรับ QR PromptPay และแจ้งโอนเงินพร้อมสลิป ตรวจสอบสถานะการชำระเงินได้ทันที",
  },
  {
    icon: ShieldCheck,
    title: "ระบบหลังบ้านครบวงจร",
    description:
      "แบ่งสิทธิ์การใช้งานชัดเจนสำหรับ Owner, Admin และ Staff บริหารจัดการง่ายและปลอดภัย",
  },
  {
    icon: LogIn,
    title: "Login ด้วย LINE และ Google",
    description:
      "ลูกค้าสมัครและเข้าสู่ระบบได้ในไม่กี่วินาที ไม่ต้องจำรหัสผ่านเพิ่ม",
  },
  {
    icon: Store,
    title: "ระบบ POS หน้าร้าน",
    description:
      "ขายสินค้าและบริการหน้าร้าน ออกบิล และเชื่อมสต๊อกกับระบบจองในที่เดียว",
  },
  {
    icon: BarChart3,
    title: "CRM และ Analytics",
    description:
      "เก็บข้อมูลลูกค้า วิเคราะห์ยอดขายและอัตราการเข้าใช้สนาม เพื่อวางแผนธุรกิจได้แม่นยำ",
  },
  {
    icon: Building2,
    title: "รองรับหลายสาขา",
    description:
      "บริหารจัดการหลายสนาม หลายสาขา จากแดชบอร์ดเดียว เห็นภาพรวมธุรกิจทั้งหมด",
  },
];

export default function Features() {
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
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
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
          ))}
        </div>
      </div>
    </section>
  );
}
