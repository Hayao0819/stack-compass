import { eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { repositories } from "@/db/schema";
import { db } from "@/index";

export const dynamic = "force-dynamic";

export default async function RepositoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const repository = await db.query.repositories.findFirst({
    where: eq(repositories.id, id),
    with: { libraries: true },
  });

  if (!repository) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              リポジトリが見つかりません
            </h1>
            <Link href="/repositories" className="text-primary hover:underline">
              ← リポジトリ一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{repository.name}</h1>
            <Link href="/repositories" className="text-primary hover:underline">
              ← リポジトリ一覧に戻る
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メイン情報 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">基本情報</CardTitle>
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                        登録済み
                      </span>
                    </div>
                    <a
                      href={repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      GitHubで見る
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground text-sm">
                        名前:
                      </span>
                      <p className="font-mono">{repository.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">
                        説明:
                      </span>
                      <p>{repository.description}</p>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <span className="text-muted-foreground text-sm">
                          URL:
                        </span>
                        <p className="font-semibold break-all">
                          {repository.url}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ライブラリ情報 */}
              {repository.libraries.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📦 使用ライブラリ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {repository.libraries.map((library) => (
                        <div key={library.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{library.name}</h3>
                              <a
                                href={library.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline break-all"
                              >
                                {library.url}
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground">
                              選択理由:
                            </span>
                            <p className="text-sm mt-1">{library.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* 統計情報 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 統計</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        作成日
                      </span>
                      <span className="text-sm">
                        {repository.createdAt
                          ? new Date(repository.createdAt).toLocaleDateString(
                              "ja-JP",
                            )
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        最終更新
                      </span>
                      <span className="text-sm">
                        {repository.updatedAt
                          ? new Date(repository.updatedAt).toLocaleDateString(
                              "ja-JP",
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
