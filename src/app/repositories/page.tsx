"use client";

import { useState } from "react";
import Link from "next/link";

export default function RepositoriesPage() {
  const [repositories] = useState([
    {
      id: 1,
      name: "my-next-app",
      full_name: "user/my-next-app",
      html_url: "https://github.com/user/my-next-app",
      description: "A Next.js application with TypeScript",
      framework: "Next.js",
      isSupported: true,
      isLoading: false,
    },
    {
      id: 2,
      name: "react-component-lib",
      full_name: "user/react-component-lib",
      html_url: "https://github.com/user/react-component-lib",
      description: "React component library",
      framework: null,
      isSupported: false,
      isLoading: false,
    },
    {
      id: 3,
      name: "node-api-server",
      full_name: "user/node-api-server",
      html_url: "https://github.com/user/node-api-server",
      description: "Express.js API server",
      framework: null,
      isSupported: false,
      isLoading: true,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#1A202C] text-[#F7FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">リポジトリを選択</h1>
          <Link href="/" className="text-[#4299E1] hover:underline">
            ← ホームに戻る
          </Link>
        </div>

        <div className="space-y-4">
          {repositories.map((repo) => (
            <div key={repo.id} className="bg-[#2D3748] p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">
                      <Link
                        href={`/repositories/${repo.id}`}
                        className="text-[#4299E1] hover:underline"
                      >
                        {repo.name}
                      </Link>
                    </h3>

                    {repo.isLoading ? (
                      <span className="text-[#A0AEC0] text-sm flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#4299E1] border-t-transparent rounded-full animate-spin"></div>
                        検出中...
                      </span>
                    ) : repo.isSupported ? (
                      <span className="text-[#48BB78] text-sm flex items-center gap-1">
                        ✅ {repo.framework}
                      </span>
                    ) : (
                      <span className="text-[#F56565] text-sm">❌ 非対応</span>
                    )}
                  </div>

                  {repo.description && (
                    <p className="text-[#A0AEC0] text-sm mb-2">
                      {repo.description}
                    </p>
                  )}

                  <p className="text-[#A0AEC0] text-xs">{repo.full_name}</p>
                </div>

                {repo.isSupported && !repo.isLoading && (
                  <Link
                    href={`/repositories/${repo.id}/register`}
                    className="bg-[#4299E1] text-[#F7FAFC] px-4 py-2 rounded-lg font-medium hover:bg-[#3182CE] transition-colors"
                  >
                    登録
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {repositories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A0AEC0] mb-4">
              リポジトリが見つかりませんでした
            </p>
            <Link
              href="/auth"
              className="bg-[#4299E1] text-[#F7FAFC] px-6 py-2 rounded-lg font-medium hover:bg-[#3182CE] transition-colors"
            >
              GitHubでログイン
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
