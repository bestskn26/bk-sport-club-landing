import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BK Sport Club — ระบบจองสนามกีฬาออนไลน์ครบวงจร",
  description:
    "แพลตฟอร์มจองสนามกีฬาออนไลน์สำหรับผู้ประกอบการสนามกีฬา รองรับ 11 ประเภทกีฬา ชำระเงินผ่าน PromptPay ระบบหลังบ้านครบวงจร พร้อม POS, CRM และรองรับหลายสาขา",
  keywords: [
    "จองสนามกีฬา",
    "ระบบจองสนาม",
    "BK Sport Club",
    "sport booking system",
    "จองสนามออนไลน์",
  ],
  openGraph: {
    title: "BK Sport Club — ระบบจองสนามกีฬาออนไลน์ครบวงจร",
    description:
      "บริหารจัดการสนามกีฬาของคุณอย่างมืออาชีพ จองออนไลน์ 24 ชม. ชำระเงินง่าย มีระบบหลังบ้านครบ",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
