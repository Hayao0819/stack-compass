import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useGitHubToken = () => {
  const session = useSession();
  return session.data?.accessToken;
};

export const useOctokit = () => {
  const token = useGitHubToken();
  if (!token) return null;
  return new Octokit({
    auth: token,
  });
};

// TODO: Tanstack QueryかSWRを導入する
export const useAsyncResult = <T>(f: () => Promise<T> | null | undefined) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    f()?.then((d) => setData(d));
  }, [f]);
  return data;
};

export const useGitHubAuthenticated = () => {
  const client = useOctokit();
  return useAsyncResult(() => client?.users.getAuthenticated());
};
