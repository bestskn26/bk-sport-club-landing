import { kv } from "@vercel/kv";
import defaultContentJson from "../../data/content.json";

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

const KV_KEY = "bk-sport-club:site-content";

export const DEFAULT_CONTENT: SiteContent = defaultContentJson as SiteContent;

export async function readContent(): Promise<SiteContent> {
  try {
    const stored = await kv.get<Partial<SiteContent>>(KV_KEY);
    if (!stored) return DEFAULT_CONTENT;

    return {
      hero: { ...DEFAULT_CONTENT.hero, ...stored.hero },
      features: stored.features ?? DEFAULT_CONTENT.features,
      pricing: stored.pricing ?? DEFAULT_CONTENT.pricing,
      contact: { ...DEFAULT_CONTENT.contact, ...stored.contact },
    };
  } catch (err) {
    console.error("Failed to read content from Vercel KV:", err);
    return DEFAULT_CONTENT;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await kv.set(KV_KEY, content);
}
