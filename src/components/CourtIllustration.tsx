import { CheckCircle2, Wallet } from "lucide-react";

export default function CourtIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-2xl animate-pulse-glow" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-primary-dark to-primary p-6 shadow-2xl shadow-primary/30 sm:p-8">
        <svg
          viewBox="0 0 400 300"
          className="w-full"
          role="img"
          aria-label="ภาพประกอบสนามกีฬาและการจองออนไลน์"
        >
          <rect x="10" y="10" width="380" height="280" rx="16" fill="#0f9163" />
          <rect
            x="30"
            y="30"
            width="340"
            height="240"
            rx="10"
            fill="none"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          <line
            x1="200"
            y1="30"
            x2="200"
            y2="270"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          <circle
            cx="200"
            cy="150"
            r="42"
            fill="none"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          <rect
            x="30"
            y="110"
            width="16"
            height="80"
            fill="none"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          <rect
            x="354"
            y="110"
            width="16"
            height="80"
            fill="none"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
        </svg>

        <div className="pointer-events-none absolute left-[38%] top-[38%] h-6 w-6 animate-bounce-ball rounded-full bg-secondary shadow-lg shadow-black/30" />
      </div>

      <div className="absolute -left-6 top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl animate-float sm:-left-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-slate-900">จองสำเร็จ</p>
          <p className="text-[11px] text-slate-500">สนามฟุตซอล 18:00 น.</p>
        </div>
      </div>

      <div className="absolute -right-4 bottom-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl animate-float-slow sm:-right-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
          <Wallet size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-slate-900">ชำระเงินแล้ว</p>
          <p className="text-[11px] text-slate-500">PromptPay ฿300</p>
        </div>
      </div>
    </div>
  );
}
