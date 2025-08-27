import { getOctokit } from "@/lib/github/server";

export default async function GitHubAPITest() {
  const octokit = await getOctokit();

  return JSON.stringify(await octokit?.rest.users.getAuthenticated());
}
