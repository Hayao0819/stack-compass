import { eq } from "drizzle-orm";
import type { Session } from "next-auth";

import { SignOutButton } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/index";

interface SignedInProps {
  session: Session;
}

export async function SignedIn({ session }: SignedInProps) {
  const userRepositories = await db.query.repositories.findMany({
    limit: 3,
    with: { libraries: true },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">StackCompass</h1>
            <p className="text-muted-foreground mt-2">
              こんにちは、{session.user?.name}さん
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">あなたのリポジトリ</h2>
          <p className="text-muted-foreground mb-6">
            リポジトリをスキャンして技術スタックを検出できます
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRepositories.map(
              ({ id, name, url, description, updatedAt, libraries: lib }) => (
                <Card key={id}>
                  <CardHeader>
                    <CardTitle className="font-semibold text-lg">
                      {name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mb-2">
                      {description || "説明なし"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        更新:{" "}
                        {new Date(updatedAt || Date.now()).toLocaleDateString(
                          "ja-JP"
                        )}
                      </span>
                    </div>
                    {lib && (
                      <div className="space-y-3 mt-3">
                        <div>
                          <p className="font-medium text-sm mb-2">
                            検出された技術:
                          </p>
                          <div className="flex gap-2">
                            {lib.map((tech) => (
                              <div
                                className="flex flex-wrap gap-2"
                                key={tech.id}
                              >
                                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                                  ✅ {tech.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <CardAction>
                      <Button variant="ghost" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          GitHub で見る →
                        </a>
                      </Button>
                    </CardAction>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-semibold text-lg">
                登録済みリポジトリ
              </CardTitle>
              <CardDescription>
                これまでにスキャンして登録したリポジトリを確認できます
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <CardAction>
                <Button asChild>
                  <a href="/repositories">登録済みリポジトリを見る →</a>
                </Button>
              </CardAction>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">💡 ヒント</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc ml-6">
            <li>現在はNext.js、React、Express等の検出に対応しています</li>
            <li>package.jsonとDockerfileを解析して技術スタックを特定します</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
