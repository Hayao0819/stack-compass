import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";

export default async function RepositoryDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const repository = {
    id,
    name: "my-next-app",
    full_name: "user/my-next-app",
    html_url: "https://github.com/user/my-next-app",
    description: "A Next.js application with TypeScript and Tailwind CSS",
    framework: "Next.js",
    language: "TypeScript",
    stars: 42,
    forks: 8,
    isRegistered: true,
    registeredAt: "2024-01-15",
    reason:
      "開発速度を重視し、SSRとSSGの両方が必要だったため。また、TypeScriptとの親和性が高く、チーム開発に適していると判断した。Vercelへのデプロイも簡単で、開発から本番環境までの流れがスムーズだった。",
    dependencies: {
      next: "15.5.0",
      react: "19.1.0",
      "react-dom": "19.1.0",
      typescript: "^5.0.0",
      tailwindcss: "^4.0.0",
      "@types/react": "^19.0.0",
      "@types/node": "^20.0.0",
    },
    fileStructure: [
      "src/",
      "├── app/",
      "│   ├── page.tsx",
      "│   ├── layout.tsx",
      "│   └── globals.css",
      "├── components/",
      "│   ├── ui/",
      "│   └── common/",
      "├── lib/",
      "│   └── utils.ts",
      "package.json",
      "next.config.js",
      "tailwind.config.js",
      "tsconfig.json",
    ],
  };

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
                      {repository.isRegistered && (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                          登録済み
                        </span>
                      )}
                    </div>
                    <a
                      href={repository.html_url}
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
                        フルネーム:
                      </span>
                      <p className="font-mono">{repository.full_name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">説明:</span>
                      <p>{repository.description}</p>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <span className="text-muted-foreground text-sm">
                          言語:
                        </span>
                        <p className="font-semibold">{repository.language}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          フレームワーク:
                        </span>
                        <p className="font-semibold text-green-600">
                          {repository.framework}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Stars:
                        </span>
                        <p className="font-semibold">⭐ {repository.stars}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Forks:
                        </span>
                        <p className="font-semibold">🔀 {repository.forks}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* フレームワーク選択理由 */}
              {repository.reason && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      💡 なぜ{repository.framework}を選んだか
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {repository.reason}
                    </p>
                    <div className="mt-4 text-xs text-muted-foreground">
                      登録日: {repository.registeredAt}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ファイル構造 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    📁 プロジェクト構造
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
                    {repository.fileStructure.join("\n")}
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* 依存関係 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    📦 主要な依存関係
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(repository.dependencies).map(
                      ([name, version]) => (
                        <div
                          key={name}
                          className="flex justify-between items-center py-1"
                        >
                          <span className="text-sm font-mono">{name}</span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {version}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* アクション */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚙️ アクション</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {!repository.isRegistered ? (
                      <Button asChild className="w-full">
                        <Link href={`/repositories/${repository.id}/register`}>
                          StackCompassに登録
                        </Link>
                      </Button>
                    ) : (
                      <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                        ✅ 登録済み
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      類似プロジェクトを探す
                    </Button>
                  </div>
                </CardContent>
              </Card>

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
                      <span className="text-sm">2024-01-01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        最終更新
                      </span>
                      <span className="text-sm">2024-01-20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        サイズ
                      </span>
                      <span className="text-sm">1.2 MB</span>
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
