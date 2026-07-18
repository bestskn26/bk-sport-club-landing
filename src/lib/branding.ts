import { kv } from "@vercel/kv";

export type BrandingContent = {
  logoUrl: string | null;
  faviconUrl: string | null;
};

const KV_KEY = "bk-sport-club:branding";

export const DEFAULT_BRANDING: BrandingContent = {
  logoUrl: null,
  faviconUrl: null,
};

export async function readBranding(): Promise<BrandingContent> {
  try {
    const stored = await kv.get<Partial<BrandingContent>>(KV_KEY);
    if (!stored) return DEFAULT_BRANDING;
    return { ...DEFAULT_BRANDING, ...stored };
  } catch (err) {
    console.error("Failed to read branding from Vercel KV:", err);
    return DEFAULT_BRANDING;
  }
}

export async function writeBranding(branding: BrandingContent): Promise<void> {
  await kv.set(KV_KEY, branding);
}
