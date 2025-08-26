import { useSession } from "next-auth/react";

export const useGitHubToken = () => {
  const sessin = useSession();
  return sessin.data?.accessToken;
};
