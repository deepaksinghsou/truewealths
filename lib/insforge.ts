import { CmsContent } from "@/types/cms";

const INSFORGE_BASE_URL = process.env.INSFORGE_BASE_URL;
const INSFORGE_API_KEY = process.env.INSFORGE_API_KEY;

async function insforgeRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!INSFORGE_BASE_URL || !INSFORGE_API_KEY) return null;

  const res = await fetch(`${INSFORGE_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INSFORGE_API_KEY}`,
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`InsForge error: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function readCmsContent(): Promise<CmsContent | null> {
  const data = await insforgeRequest<{ content: CmsContent }>("/cms/content", { method: "GET" });
  return data?.content ?? null;
}

export async function writeCmsContent(content: CmsContent): Promise<boolean> {
  const result = await insforgeRequest<{ ok: boolean }>("/cms/content", {
    method: "PUT",
    body: JSON.stringify({ content })
  });
  return result?.ok ?? false;
}

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
  const result = await insforgeRequest<{ valid: boolean }>("/auth/admin-login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  return result?.valid ?? false;
}
