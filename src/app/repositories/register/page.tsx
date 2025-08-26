"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState({
    reason: "",
  });

  const repository = {
    name: "my-next-app",
    html_url: "https://github.com/user/my-next-app",
    framework: "Next.js",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("登録データ:", { ...repository, ...formData });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">プロジェクトの登録</h1>
            <Link
              href="/repositories"
              className="text-primary hover:underline"
            >
              ← リポジトリ一覧に戻る
            </Link>
          </div>

          <div className="bg-card p-8 rounded-lg border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  リポジトリ名
                </label>
                <input
                  type="text"
                  value={repository.name}
                  disabled
                  className="w-full bg-muted text-muted-foreground px-4 py-2 rounded-lg border-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={repository.html_url}
                  disabled
                  className="w-full bg-muted text-muted-foreground px-4 py-2 rounded-lg border-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  検出フレームワーク
                </label>
                <input
                  type="text"
                  value={repository.framework}
                  disabled
                  className="w-full bg-muted text-muted-foreground px-4 py-2 rounded-lg border-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  なぜこのフレームワークを選んだか（任意）
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  rows={4}
                  placeholder="例：開発速度を重視し、SSRが必要だったため..."
                  className="w-full bg-background text-foreground px-4 py-2 rounded-lg border border-input focus:border-ring focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  登録
                </button>
                <Link
                  href="/repositories"
                  className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  キャンセル
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">💡 Tips</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                • 技術選定の理由を詳しく書くと、他の開発者にとって参考になります
              </li>
              <li>
                •
                パフォーマンス、開発体験、チーム構成などの観点から記述してみてください
              </li>
              <li>
                • 登録後は公開され、他のユーザーが閲覧できるようになります
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
