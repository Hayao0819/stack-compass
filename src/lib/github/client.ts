import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react";
import useSWR from "swr";

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

export const useGitHubAuthenticated = () => {
  const client = useOctokit();
  // return useAsyncResult(() => client?.users.getAuthenticated());
  const res = useSWR("github-authenticated", () =>
    client?.rest.users.getAuthenticated(),
  );
  return res.data;
};
