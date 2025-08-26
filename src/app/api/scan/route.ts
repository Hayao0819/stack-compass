// app/api/scan/route.ts

import { Octokit } from "@octokit/rest";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest, _: NextResponse) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const branch = searchParams.get("branch") || "main";
  const session = await auth();

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "owner and repo are required" },
      { status: 400 },
    );
  }

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  try {
    // --- 言語情報の取得 ---
    const { data: languages } = await octokit.repos.listLanguages({
      owner,
      repo,
    });

    // --- リポジトリのツリー取得 ---
    const { data: tree } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: branch,
      recursive: "true",
    });

    // package.json と Dockerfile をツリー全体から探す（サブディレクトリ対応）
    // tree.tree の各エントリは { path, type, ... } なのでファイルであることを確認する
    const packageJsonFile = tree.tree.find(
      (f) =>
        f.type === "blob" && f.path?.toLowerCase().endsWith("package.json"),
    );
    // Dockerfile は拡張子が無いことが多いのでパスの末尾が 'dockerfile' のものを探す
    const dockerFile = tree.tree.find(
      (f) =>
        f.type === "blob" &&
        f.path?.split("/").pop()?.toLowerCase() === "dockerfile",
    );

    let packageJson: any = null;
    let dockerContent: string | null = null;

    // --- package.json の取得 ---
    if (packageJsonFile?.path) {
      const { data: pkg } = await octokit.repos.getContent({
        owner,
        repo,
        path: packageJsonFile.path,
        ref: branch,
      });
      if ("content" in pkg) {
        const decoded = Buffer.from(pkg.content, "base64").toString("utf-8");
        try {
          packageJson = JSON.parse(decoded);
        } catch (e) {
          // JSON parse error はログに出すが処理は続ける
          console.warn(
            "Failed to parse package.json at",
            packageJsonFile.path,
            e,
          );
        }
      }
    }

    // --- Dockerfile の取得 ---
    if (dockerFile?.path) {
      const { data: docker } = await octokit.repos.getContent({
        owner,
        repo,
        path: dockerFile.path,
        ref: branch,
      });
      if ("content" in docker) {
        dockerContent = Buffer.from(docker.content, "base64").toString("utf-8");
      }
    }

    // --- 簡易的な技術検出 ---
    const tech: string[] = [];

    // 言語ベース
    if (languages.TypeScript) tech.push("TypeScript");
    if (languages.JavaScript) tech.push("JavaScript");
    if (languages.Python) tech.push("Python");
    if (languages.Go) tech.push("Go");

    // package.json ベース
    if (packageJson?.dependencies?.next) tech.push("Next.js");
    if (packageJson?.dependencies?.react) tech.push("React");
    if (packageJson?.dependencies?.express) tech.push("Express");

    // Dockerfile ベース
    if (dockerContent?.includes("FROM node")) tech.push("Node.js (Docker)");
    if (dockerContent?.includes("FROM python")) tech.push("Python (Docker)");

    return NextResponse.json({
      languages,
      //   files: tree.tree.map((f) => f.path),
      packageJson,
      //   dockerfile: dockerContent,
      detectedTech: [...new Set(tech)],
    });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
