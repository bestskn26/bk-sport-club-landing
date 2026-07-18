import { Mail, MessageCircle, Phone, QrCode } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div id="demo" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            เริ่มต้นใช้งาน
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            ขอ Demo ฟรี วันนี้
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อนัดสาธิตการใช้งานระบบ
            ไม่มีค่าใช้จ่าย
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-3 lg:p-10">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-3xl bg-primary p-8 text-white">
              <h3 className="text-lg font-bold">แอด LINE คุยกับทีมงานได้ทันที</h3>
              <p className="mt-2 text-sm text-white/80">
                สแกน QR หรือค้นหา LINE Official Account เพื่อสอบถามและนัด Demo
              </p>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-white/40 bg-white/10">
                  <QrCode size={36} className="text-white/70" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    LINE Official Account
                  </p>
                  <p className="mt-1 text-lg font-bold">@bksportclub</p>
                  <p className="mt-1 text-xs text-white/70">
                    (ตัวอย่าง QR — แทนที่ด้วยของจริงก่อนเผยแพร่)
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">ช่องทางติดต่ออื่นๆ</h3>
              <div className="mt-6 space-y-4">
                <a
                  href="tel:020000000"
                  className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">โทรหาเรา</p>
                    <p className="font-semibold text-slate-900">02-000-0000</p>
                  </div>
                </a>
                <a
                  href="mailto:sales@bksportclub.com"
                  className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">อีเมล</p>
                    <p className="font-semibold text-slate-900">
                      sales@bksportclub.com
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-xl p-2">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageCircle size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">เวลาทำการ</p>
                    <p className="font-semibold text-slate-900">
                      จันทร์–เสาร์ 9:00–18:00 น.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
