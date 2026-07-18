import { kv } from "@vercel/kv";

export type BrandingContent = {
  logoUrl: string | null;
  faviconUrl: string | null;
  navbarLogoHeight: number;
  footerLogoHeight: number;
};

export const LOGO_HEIGHT_MIN = 32;
export const LOGO_HEIGHT_MAX = 120;

const KV_KEY = "bk-sport-club:branding";

export const DEFAULT_BRANDING: BrandingContent = {
  logoUrl: null,
  faviconUrl: null,
  navbarLogoHeight: 56,
  footerLogoHeight: 40,
};

export function clampLogoHeight(value: unknown, fallback: number): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(LOGO_HEIGHT_MAX, Math.max(LOGO_HEIGHT_MIN, Math.round(num)));
}

export async function readBranding(): Promise<BrandingContent> {
  try {
    const stored = await kv.get<Partial<BrandingContent>>(KV_KEY);
    if (!stored) return DEFAULT_BRANDING;
    return {
      ...DEFAULT_BRANDING,
      ...stored,
      navbarLogoHeight: clampLogoHeight(
        stored.navbarLogoHeight,
        DEFAULT_BRANDING.navbarLogoHeight,
      ),
      footerLogoHeight: clampLogoHeight(
        stored.footerLogoHeight,
        DEFAULT_BRANDING.footerLogoHeight,
      ),
    };
  } catch (err) {
    console.error("Failed to read branding from Vercel KV:", err);
    return DEFAULT_BRANDING;
  }
}

export async function writeBranding(branding: BrandingContent): Promise<void> {
  await kv.set(KV_KEY, branding);
}
