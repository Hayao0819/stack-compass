import { useCallback } from "react";
import useSWR from "swr";
import type { ManifestContent } from "./base";

export type TechDetectResult = {
  languages?: Record<string, number>;
  files?: string[];
  manifests?: Record<string, ManifestContent>;
  detected?: string[];
};

export async function fetchTechDetect(
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

export function useTechDetect(owner: string, repo: string, branch = "main") {
  const key = `${owner}/${repo}/${branch}`;

  const fetcher = useCallback(
    () => fetchTechDetect(owner, repo, branch),
    [owner, repo, branch],
  );

  const { data, error, isLoading, mutate } = useSWR<TechDetectResult | null>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    result: data ?? null,
    error: error ? (error as Error).message : null,
    isLoading,
    refresh: mutate,
  } as const;
}
