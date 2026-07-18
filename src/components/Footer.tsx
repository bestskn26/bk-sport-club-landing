import { Mail, MapPin, Phone, Trophy } from "lucide-react";
import type { ContactContent } from "@/lib/content";

const currentYear = new Date().getFullYear();

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export default function Footer({
  contact,
  logoUrl,
  logoHeight = 40,
}: {
  contact: ContactContent;
  logoUrl?: string | null;
  logoHeight?: number;
}) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
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
                    <Trophy size={18} />
                  </span>
                  <span className="text-lg font-bold text-white">
                    BK Sport Club
                  </span>
                </>
              )}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              ระบบจองสนามกีฬาออนไลน์ครบวงจร สำหรับผู้ประกอบการที่ต้องการบริหารสนามอย่างมืออาชีพ
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              เมนู
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#features" className="transition hover:text-white">
                  ฟีเจอร์
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition hover:text-white">
                  แพ็กเกจราคา
                </a>
              </li>
              <li>
                <a href="#demo" className="transition hover:text-white">
                  ขอ Demo ฟรี
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-white">
                  ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              ระบบจองสำหรับลูกค้า
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://app.bksportclub.com"
                  className="transition hover:text-white"
                >
                  app.bksportclub.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              ติดต่อเรา
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} />
                <a
                  href={telHref(contact.phone)}
                  className="transition hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} />
                กรุงเทพมหานคร ประเทศไทย
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © {currentYear} BK Sport Club. สงวนลิขสิทธิ์ทุกประการ
        </div>
      </div>
    </footer>
  );
}
