// クライアント: SWR を使った useTechDetect フック
// サーバ: サーバーコンポーネントから使う fetchTechDetectServer を同梱

import { useCallback } from "react";
import useSWR from "swr";
import type { ManifestContent } from "./base";

export type TechDetectResult = {
  languages?: Record<string, number>;
  files?: string[];
  manifests?: Record<string, ManifestContent>;
  detected?: string[];
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Client-side hook using SWR
export function useTechDetect(owner?: string, repo?: string, branch = "main") {
  const key =
    owner && repo
      ? `/api/detect/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<TechDetectResult | null>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const detect = useCallback(
    async (o: string, r: string, b = "main") => {
      const url = `/api/detect/${encodeURIComponent(o)}/${encodeURIComponent(r)}/${encodeURIComponent(b)}`;
      // mutate を使って即時フェッチ＆キャッシュ更新
      return mutate(() => fetcher(url), { revalidate: true });
    },
    [mutate],
  );

  return {
    result: data ?? null,
    error: error ? (error as Error).message : null,
    isLoading,
    detect,
    // expose mutate for manual cache control
    refresh: mutate,
  } as const;
}

// Server-side fetch for use in Server Components
export async function fetchTechDetectServer(
  owner: string,
  repo: string,
  branch = "main",
): Promise<TechDetectResult> {
  if (!owner || !repo) throw new Error("owner and repo are required");

  const url = `/api/detect/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.error || `HTTP error ${res.status}`;
    throw new Error(msg);
  }
  const data = await res.json();
  return data as TechDetectResult;
}
