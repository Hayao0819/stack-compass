// app/api/detect/[user]/[reponame]/[branch]/route.ts

import { Octokit } from "@octokit/rest";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import toml from "toml";
import { auth } from "@/auth";
import { runDetectors } from "@/lib/detector";
import type { ManifestContent } from "@/lib/detector/base";

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: { params: Promise<{ user: string; reponame: string; branch?: string }> },
) {
  const { user: owner, reponame: repo, branch = "main" } = await params;
  const session = await auth();

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "owner and repo are required" },
      { status: 400 },
    );
  }

  const octokit = new Octokit({ auth: session?.accessToken });

  try {
    const { data: languages } = await octokit.repos.listLanguages({
      owner: owner as string,
      repo: repo as string,
    });

    const { data: tree } = await octokit.git.getTree({
      owner: owner as string,
      repo: repo as string,
      tree_sha: branch,
      recursive: "true",
    });

    const files: string[] = tree.tree
      .filter((f) => f.type === "blob")
      .map((f) => f.path as string);

    const manifests: Record<string, ManifestContent> = {};

    async function fetchIfExists(path: string) {
      try {
        const { data } = await octokit.repos.getContent({
          owner: owner as string,
          repo: repo as string,
          path,
          ref: branch,
        });
        if ("content" in data) {
          return Buffer.from(data.content, "base64").toString("utf-8");
        }
      } catch (_e) {
        // ignore
      }
      return null;
    }

    const manifestBasenames = [
      "package.json",
      "composer.json",
      "requirements.txt",
      "pyproject.toml",
      "go.mod",
      "Cargo.toml",
      "docker-compose.yml",
      "docker-compose.yaml",
    ];

    for (const base of manifestBasenames) {
      const candidate = files.find((p) => p.toLowerCase().endsWith(base));
      if (!candidate) continue;
      const content = await fetchIfExists(candidate);
      if (!content) continue;

      if (base === "package.json" || base === "composer.json") {
        try {
          manifests[base] = {
            type: "json",
            content: JSON.parse(content),
          } as ManifestContent;
        } catch (_e) {
          manifests[base] = { type: "raw", content } as ManifestContent;
        }
        continue;
      }

      if (base === "pyproject.toml" || base === "Cargo.toml") {
        try {
          manifests[base] = {
            type: "toml",
            content: toml.parse(content),
          } as ManifestContent;
        } catch (_e) {
          manifests[base] = { type: "raw", content } as ManifestContent;
        }
        continue;
      }

      if (base === "go.mod") {
        const lines = content.split(/\r?\n/);
        const moduleLine = lines.find((l) => l.trim().startsWith("module "));
        const requireLines = lines.filter((l) =>
          l.trim().startsWith("require "),
        );
        manifests[base] = {
          type: "gomod",
          content: {
            module: moduleLine
              ? moduleLine.replace(/^module\s+/, "").trim()
              : "",
            require: requireLines.map((l) =>
              l.replace(/^require\s+/, "").trim(),
            ),
          },
        } as ManifestContent;
        continue;
      }

      manifests[base] = { type: "raw", content } as ManifestContent;
    }

    const dockerCandidates = files.filter(
      (p) => p.split("/").pop()?.toLowerCase() === "dockerfile",
    );
    for (const d of dockerCandidates) {
      const c = await fetchIfExists(d);
      if (!c) continue;
      manifests[d] = { type: "raw", content: c } as ManifestContent;
    }

    const tfCandidates = files.filter((p) => p.toLowerCase().endsWith(".tf"));
    for (const t of tfCandidates) {
      const c = await fetchIfExists(t);
      if (!c) continue;
      manifests[t] = { type: "raw", content: c } as ManifestContent;
    }

    const langs = Object.keys(languages || {});

    const detected = runDetectors(files, manifests, langs);

    return NextResponse.json({ languages, files, manifests, detected });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
