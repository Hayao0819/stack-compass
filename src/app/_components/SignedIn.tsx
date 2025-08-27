import { SignOutButton } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";

interface SignedInProps {
  session: Session;
}

export function SignedIn({ session }: SignedInProps) {
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
            <div className="bg-card p-6 rounded-lg border">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">sample-project</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Next.jsで作ったサンプルプロジェクト
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-secondary px-2 py-1 rounded text-xs">
                    TypeScript
                  </span>
                  <span>更新: 2025/01/15</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">検出された技術:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      ✅ Next.js
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      ✅ React
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      ✅ TypeScript
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/user/sample-project"
                    className="text-xs text-primary hover:underline"
                  >
                    GitHub で見る →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">portfolio-site</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  個人ポートフォリオサイト
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-secondary px-2 py-1 rounded text-xs">
                    JavaScript
                  </span>
                  <span>更新: 2025/01/10</span>
                </div>
              </div>

              <Button>技術スタックをスキャン</Button>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">old-project</h3>
                <p className="text-sm text-muted-foreground mb-2">説明なし</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-secondary px-2 py-1 rounded text-xs">
                    Python
                  </span>
                  <span>更新: 2024/12/20</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">検出された技術:</p>
                  <span className="text-muted-foreground text-xs">
                    ❌ 対応技術が見つかりませんでした
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/user/old-project"
                    className="text-xs text-primary hover:underline"
                  >
                    GitHub で見る →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">💡 ヒント</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 現在はNext.js、React、Express等の検出に対応しています</li>
            <li>
              • package.jsonとDockerfileを解析して技術スタックを特定します
            </li>
            <li>• 検出されたプロジェクトは今後データベースに登録予定です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
