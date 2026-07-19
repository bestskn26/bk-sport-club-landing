const PORKBUN_API_BASE = "https://api.porkbun.com/api/json/v3";
const VERCEL_DNS_TARGET = "cname.vercel-dns.com";

type PorkbunResponse = {
  status?: string;
  message?: string;
};

function getCredentials() {
  const apikey = process.env.PORKBUN_API_KEY;
  const secretapikey = process.env.PORKBUN_SECRET_KEY;
  const domain = process.env.PORKBUN_DOMAIN || "bksportclub.com";

  if (!apikey || !secretapikey) {
    throw new Error(
      "ยังไม่ได้ตั้งค่า PORKBUN_API_KEY / PORKBUN_SECRET_KEY",
    );
  }

  return { apikey, secretapikey, domain };
}

async function callPorkbun(
  path: string,
  body: Record<string, string>,
): Promise<PorkbunResponse> {
  const res = await fetch(`${PORKBUN_API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => null)) as PorkbunResponse | null;

  if (!res.ok || data?.status !== "SUCCESS") {
    throw new Error(data?.message || `เรียก Porkbun API (${path}) ไม่สำเร็จ`);
  }

  return data;
}

export async function createCnameRecord(subdomain: string): Promise<void> {
  const { apikey, secretapikey, domain } = getCredentials();

  await callPorkbun(`/dns/create/${domain}`, {
    apikey,
    secretapikey,
    type: "CNAME",
    name: subdomain,
    content: VERCEL_DNS_TARGET,
    ttl: "600",
  });
}

export async function deleteCnameRecord(subdomain: string): Promise<void> {
  const { apikey, secretapikey, domain } = getCredentials();

  await callPorkbun(`/dns/deleteByNameType/${domain}/CNAME/${subdomain}`, {
    apikey,
    secretapikey,
  });
}
