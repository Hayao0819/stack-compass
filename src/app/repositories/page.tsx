import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { repositories } from "@/db/schema";
import { db } from "@/index";

export default async function RepositoriesPage() {
  const repositoriesData = await db.select().from(repositories);

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
          {repositoriesData.map((repo) => (
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
                  {repo.url}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {repositoriesData.length === 0 && (
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
