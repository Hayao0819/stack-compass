import { Octokit } from "@octokit/rest";
import { auth } from "@/auth";

export const githubToken = async () => {
  const session = await auth();
  return session?.accessToken;
};

export const getOctokit = async () => {
  const token = await githubToken();
  if (!token) return null;
  return new Octokit({
    auth: token,
  });
};
