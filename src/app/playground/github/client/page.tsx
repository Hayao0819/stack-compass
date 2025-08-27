"use client";
import { useGitHubAuthenticated } from "@/lib/github/client";
export default function GitHubAPITest() {
  const me = useGitHubAuthenticated();

  return JSON.stringify(me);
}
