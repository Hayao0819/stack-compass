// クライアント: SWR を使った useTechDetect フック
// サーバ: サーバーコンポーネントから使う fetchTechDetectServer を同梱

import type { ManifestContent } from "./base";

export type TechDetectResult = {
  languages?: Record<string, number>;
  files?: string[];
  manifests?: Record<string, ManifestContent>;
  detected?: string[];
};

// Server-side fetch for use in Server Components
export async function fetchTechDetectServer(
  owner: string,
  repo: string,
  branch = "main"
): Promise<TechDetectResult> {
  if (!owner || !repo) throw new Error("owner and repo are required");

  const url = `/api/detect/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo
  )}/${encodeURIComponent(branch)}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.error || `HTTP error ${res.status}`;
    throw new Error(msg);
  }
  const data = await res.json();
  return data as TechDetectResult;
}
