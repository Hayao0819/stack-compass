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
    <div className="min-h-screen bg-[#1A202C] text-[#F7FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">プロジェクトの登録</h1>
            <Link
              href="/repositories"
              className="text-[#4299E1] hover:underline"
            >
              ← リポジトリ一覧に戻る
            </Link>
          </div>

          <div className="bg-[#2D3748] p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  リポジトリ名
                </label>
                <input
                  type="text"
                  value={repository.name}
                  disabled
                  className="w-full bg-[#4A5568] text-[#A0AEC0] px-4 py-2 rounded-lg border-none"
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
                  className="w-full bg-[#4A5568] text-[#A0AEC0] px-4 py-2 rounded-lg border-none"
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
                  className="w-full bg-[#4A5568] text-[#A0AEC0] px-4 py-2 rounded-lg border-none"
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
                  className="w-full bg-[#2D3748] text-[#F7FAFC] px-4 py-2 rounded-lg border border-[#4A5568] focus:border-[#4299E1] focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#4299E1] text-[#F7FAFC] px-6 py-3 rounded-lg font-medium hover:bg-[#3182CE] transition-colors"
                >
                  登録
                </button>
                <Link
                  href="/repositories"
                  className="border border-[#4299E1] text-[#4299E1] px-6 py-3 rounded-lg font-medium hover:bg-[#4299E1] hover:text-[#F7FAFC] transition-colors"
                >
                  キャンセル
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-[#2D3748] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Tips</h3>
            <ul className="text-[#A0AEC0] space-y-2 text-sm">
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
