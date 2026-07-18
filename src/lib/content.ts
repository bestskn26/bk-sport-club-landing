import { promises as fs } from "fs";
import path from "path";

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  brandName: string;
  tagline: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export type FeatureItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  highlighted: boolean;
  features: string[];
};

export type ContactContent = {
  phone: string;
  email: string;
  lineId: string;
  businessHours: string;
};

export type SiteContent = {
  hero: HeroContent;
  features: FeatureItem[];
  pricing: PricingPlan[];
  contact: ContactContent;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    brandName: "BK Sport Club",
    tagline: "ระบบจองสนามกีฬาออนไลน์ครบวงจร",
    description:
      "บริหารสนามกีฬาของคุณอย่างมืออาชีพ ลูกค้าจองและชำระเงินได้เอง 24 ชั่วโมง พร้อมระบบหลังบ้านครบวงจรสำหรับเจ้าของสนาม ผู้ดูแล และพนักงาน รองรับกีฬากว่า 11 ประเภท",
    primaryCta: { label: "ขอ Demo ฟรี", href: "#demo" },
    secondaryCta: { label: "ติดต่อเรา", href: "#contact" },
  },
  features: [
    {
      id: "booking-24-7",
      icon: "CalendarClock",
      title: "จองสนามออนไลน์ได้ 24 ชม.",
      description:
        "ลูกค้าเช็กตารางว่างและจองสนามได้เองทุกที่ทุกเวลา ลดภาระการรับโทรศัพท์ของพนักงาน",
    },
    {
      id: "multi-sport",
      icon: "Shapes",
      title: "รองรับหลายกีฬา 11 ประเภท",
      description:
        "ฟุตซอล แบดมินตัน บาสเกตบอล เทนนิส วอลเลย์บอล และอีกมากมาย ในระบบเดียว",
    },
    {
      id: "payment",
      icon: "QrCode",
      title: "ชำระเงินผ่าน PromptPay / โอนเงิน",
      description:
        "รองรับ QR PromptPay และแจ้งโอนเงินพร้อมสลิป ตรวจสอบสถานะการชำระเงินได้ทันที",
    },
    {
      id: "backoffice",
      icon: "ShieldCheck",
      title: "ระบบหลังบ้านครบวงจร",
      description:
        "แบ่งสิทธิ์การใช้งานชัดเจนสำหรับ Owner, Admin และ Staff บริหารจัดการง่ายและปลอดภัย",
    },
    {
      id: "social-login",
      icon: "LogIn",
      title: "Login ด้วย LINE และ Google",
      description:
        "ลูกค้าสมัครและเข้าสู่ระบบได้ในไม่กี่วินาที ไม่ต้องจำรหัสผ่านเพิ่ม",
    },
    {
      id: "pos",
      icon: "Store",
      title: "ระบบ POS หน้าร้าน",
      description:
        "ขายสินค้าและบริการหน้าร้าน ออกบิล และเชื่อมสต๊อกกับระบบจองในที่เดียว",
    },
    {
      id: "crm",
      icon: "BarChart3",
      title: "CRM และ Analytics",
      description:
        "เก็บข้อมูลลูกค้า วิเคราะห์ยอดขายและอัตราการเข้าใช้สนาม เพื่อวางแผนธุรกิจได้แม่นยำ",
    },
    {
      id: "multi-branch",
      icon: "Building2",
      title: "รองรับหลายสาขา",
      description:
        "บริหารจัดการหลายสนาม หลายสาขา จากแดชบอร์ดเดียว เห็นภาพรวมธุรกิจทั้งหมด",
    },
  ],
  pricing: [
    {
      id: "basic",
      name: "Basic",
      tagline: "เหมาะสำหรับสนามเดี่ยวที่เริ่มต้นใช้งานระบบออนไลน์",
      price: "1,990",
      period: "บาท / เดือน",
      highlighted: false,
      features: [
        "ระบบจองสนามออนไลน์ 24 ชม.",
        "รองรับ 1 สาขา",
        "ชำระเงินผ่าน PromptPay / โอนเงิน",
        "Login ด้วย LINE และ Google",
        "แดชบอร์ดหลังบ้านพื้นฐาน",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "สำหรับสนามที่ต้องการบริหารจัดการครบวงจร",
      price: "3,990",
      period: "บาท / เดือน",
      highlighted: true,
      features: [
        "ทุกฟีเจอร์ในแพ็กเกจ Basic",
        "รองรับสูงสุด 3 สาขา",
        "ระบบ POS หน้าร้าน",
        "CRM และรายงาน Analytics",
        "จัดการสิทธิ์ Admin / Staff / Owner",
        "รองรับกีฬาครบ 11 ประเภท",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "สำหรับเชนสนามกีฬาหรือธุรกิจหลายสาขาขนาดใหญ่",
      price: "ติดต่อเรา",
      period: "ออกแบบราคาตามการใช้งาน",
      highlighted: false,
      features: [
        "ทุกฟีเจอร์ในแพ็กเกจ Pro",
        "รองรับหลายสาขาไม่จำกัด",
        "ระบบ Analytics และรายงานขั้นสูง",
        "ทีมงานช่วยติดตั้งและอบรมการใช้งาน",
        "ผู้ดูแลระบบเฉพาะ (Dedicated Support)",
        "ปรับแต่งฟีเจอร์ตามความต้องการ",
      ],
    },
  ],
  contact: {
    phone: "02-000-0000",
    email: "sales@bksportclub.com",
    lineId: "@bksportclub",
    businessHours: "จันทร์–เสาร์ 9:00–18:00 น.",
  },
};

export async function readContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      features: parsed.features ?? DEFAULT_CONTENT.features,
      pricing: parsed.pricing ?? DEFAULT_CONTENT.pricing,
      contact: { ...DEFAULT_CONTENT.contact, ...parsed.contact },
    };
  } catch {
    await writeContent(DEFAULT_CONTENT);
    return DEFAULT_CONTENT;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}
