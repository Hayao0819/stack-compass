"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">リポジトリを選択</h1>
          <Link href="/" className="text-primary hover:underline">
            ← ホームに戻る
          </Link>
        </div>

        <Button asChild className="mb-8">
          <Link href="/repositories/register">
            新規登録
            <Plus />
          </Link>
        </Button>

        <div className="space-y-4">
          {repositories.map((repo) => (
            <Card key={repo.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">
                        <Link
                          href={`/repositories/${repo.id}`}
                          className="text-primary hover:underline"
                        >
                          {repo.name}
                        </Link>
                      </CardTitle>

                      {repo.isLoading ? (
                        <span className="text-muted-foreground text-sm flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          検出中...
                        </span>
                      ) : repo.isSupported ? (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          ✅ {repo.framework}
                        </span>
                      ) : (
                        <span className="text-destructive text-sm">
                          ❌ 非対応
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {repo.description && (
                  <p className="text-muted-foreground text-sm mb-2">
                    {repo.description}
                  </p>
                )}

                <p className="text-muted-foreground text-xs">
                  {repo.full_name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {repositories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              リポジトリが見つかりませんでした
            </p>
            <Button asChild size="lg">
              <Link href="/auth">GitHubでログイン</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
