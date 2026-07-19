import { kv } from "@vercel/kv";
import { promises as dns } from "dns";

export type SubdomainRecord = {
  subdomain: string;
  fqdn: string;
  createdAt: string;
};

const KV_KEY = "bk-sport-club:subdomains";

const SUBDOMAIN_PATTERN = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export function getRootDomain(): string {
  return process.env.PORKBUN_DOMAIN || "bksportclub.com";
}

export function isValidSubdomain(value: string): boolean {
  return SUBDOMAIN_PATTERN.test(value);
}

export function buildFqdn(subdomain: string): string {
  return `${subdomain}.${getRootDomain()}`;
}

export async function readSubdomains(): Promise<SubdomainRecord[]> {
  try {
    const stored = await kv.get<SubdomainRecord[]>(KV_KEY);
    return stored ?? [];
  } catch (err) {
    console.error("Failed to read subdomains from Vercel KV:", err);
    return [];
  }
}

export async function writeSubdomains(
  records: SubdomainRecord[],
): Promise<void> {
  await kv.set(KV_KEY, records);
}

export type DnsStatus = "ready" | "pending";

export async function checkDnsStatus(subdomain: string): Promise<DnsStatus> {
  try {
    const records = await dns.resolveCname(buildFqdn(subdomain));
    return records.some((record) => record.includes("vercel-dns.com"))
      ? "ready"
      : "pending";
  } catch {
    return "pending";
  }
}
