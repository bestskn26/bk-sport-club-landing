const VERCEL_API_BASE = "https://api.vercel.com";

function getCredentials() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  console.log("[vercel-domains] process.env.VERCEL_PROJECT_ID =", projectId);
  console.log(
    "[vercel-domains] process.env.VERCEL_API_TOKEN is set =",
    Boolean(token),
    token ? `(starts with "${token.slice(0, 6)}...")` : "",
  );

  if (!token || !projectId) {
    throw new Error(
      "ยังไม่ได้ตั้งค่า VERCEL_API_TOKEN / VERCEL_PROJECT_ID",
    );
  }

  return { token, projectId };
}

export type VercelDomainStatus = {
  added: boolean;
  verified: boolean;
  misconfigured: boolean;
};

export async function addProjectDomain(fqdn: string): Promise<void> {
  const { token, projectId } = getCredentials();

  console.log(
    `[vercel-domains] Adding domain "${fqdn}" to Vercel project "${projectId}"`,
  );

  const res = await fetch(
    `${VERCEL_API_BASE}/v10/projects/${projectId}/domains`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: fqdn }),
    },
  );

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(
      data?.error?.message || "เพิ่ม domain ใน Vercel ไม่สำเร็จ",
    );
  }
}

export async function removeProjectDomain(fqdn: string): Promise<void> {
  const { token, projectId } = getCredentials();

  console.log(
    `[vercel-domains] Removing domain "${fqdn}" from Vercel project "${projectId}"`,
  );

  const res = await fetch(
    `${VERCEL_API_BASE}/v9/projects/${projectId}/domains/${fqdn}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok && res.status !== 404) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error?.message || "ลบ domain ใน Vercel ไม่สำเร็จ");
  }
}

export async function getProjectDomainStatus(
  fqdn: string,
): Promise<VercelDomainStatus> {
  const { token, projectId } = getCredentials();

  const domainRes = await fetch(
    `${VERCEL_API_BASE}/v9/projects/${projectId}/domains/${fqdn}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (domainRes.status === 404) {
    return { added: false, verified: false, misconfigured: false };
  }
  if (!domainRes.ok) {
    throw new Error("ตรวจสอบสถานะ domain ใน Vercel ไม่สำเร็จ");
  }

  const domainData = await domainRes.json();

  const configRes = await fetch(
    `${VERCEL_API_BASE}/v6/domains/${fqdn}/config`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const configData = configRes.ok ? await configRes.json() : null;

  return {
    added: true,
    verified: Boolean(domainData?.verified),
    misconfigured: Boolean(configData?.misconfigured),
  };
}
