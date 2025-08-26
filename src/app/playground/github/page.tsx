"use client";

import { useGitHubAuthenticated } from "@/lib/github";

export default function GitHubAPITest() {
  const me = useGitHubAuthenticated();

  return JSON.stringify(me);
}
