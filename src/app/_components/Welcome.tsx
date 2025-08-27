import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Welcome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">StackCompass</h1>
          <p className="text-xl text-muted-foreground mb-8">
            GitHub リポジトリから技術スタックを自動検出
          </p>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            あなたのリポジトリを分析し、使用している技術スタックを検出して、
            他の開発者が技術選定の参考にできるプラットフォームです。
          </p>

          <div className="space-y-4">
            <Button size="lg" asChild>
              <Link href="/auth">GitHubでログイン</Link>
            </Button>

            <div className="mt-8">
              <Link
                href="/repositories"
                className="text-primary hover:underline"
              >
                登録済みプロジェクトを見る →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">🔍 自動検出</h3>
            <p className="text-muted-foreground">
              package.json を分析してNext.jsプロジェクトを自動検出
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">📊 簡単登録</h3>
            <p className="text-muted-foreground">
              検出結果をワンクリックでプラットフォームに登録
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">💡 技術選定支援</h3>
            <p className="text-muted-foreground">
              他の開発者の技術選定理由を参考にして学習
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
