import { useCallback } from "react";
import useSWR from "swr";
import type { TechDetectResult } from "@/lib/detector/call";
import { fetcher } from "@/lib/fetcher";

// Client-side hook using SWR
export function useTechDetect(owner?: string, repo?: string, branch = "main") {
  const key =
    owner && repo
      ? `/api/detect/${encodeURIComponent(owner)}/${encodeURIComponent(
          repo,
        )}/${encodeURIComponent(branch)}`
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
      const url = `/api/detect/${encodeURIComponent(o)}/${encodeURIComponent(
        r,
      )}/${encodeURIComponent(b)}`;
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
