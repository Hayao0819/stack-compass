import Link from "next/link";

export default async function RepositoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const repository = {
    id: parseInt(id),
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
    <div className="min-h-screen bg-[#1A202C] text-[#F7FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{repository.name}</h1>
            <Link
              href="/repositories"
              className="text-[#4299E1] hover:underline"
            >
              ← リポジトリ一覧に戻る
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メイン情報 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <div className="bg-[#2D3748] p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">基本情報</h2>
                    {repository.isRegistered && (
                      <span className="bg-[#48BB78] text-[#F7FAFC] px-2 py-1 rounded-full text-xs">
                        登録済み
                      </span>
                    )}
                  </div>
                  <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4299E1] hover:underline flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHubで見る
                  </a>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[#A0AEC0] text-sm">フルネーム:</span>
                    <p className="font-mono">{repository.full_name}</p>
                  </div>
                  <div>
                    <span className="text-[#A0AEC0] text-sm">説明:</span>
                    <p>{repository.description}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <span className="text-[#A0AEC0] text-sm">言語:</span>
                      <p className="font-semibold">{repository.language}</p>
                    </div>
                    <div>
                      <span className="text-[#A0AEC0] text-sm">
                        フレームワーク:
                      </span>
                      <p className="font-semibold text-[#48BB78]">
                        {repository.framework}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#A0AEC0] text-sm">Stars:</span>
                      <p className="font-semibold">⭐ {repository.stars}</p>
                    </div>
                    <div>
                      <span className="text-[#A0AEC0] text-sm">Forks:</span>
                      <p className="font-semibold">🔀 {repository.forks}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* フレームワーク選択理由 */}
              {repository.reason && (
                <div className="bg-[#2D3748] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    💡 なぜ{repository.framework}を選んだか
                  </h3>
                  <p className="text-[#A0AEC0] leading-relaxed">
                    {repository.reason}
                  </p>
                  <div className="mt-4 text-xs text-[#A0AEC0]">
                    登録日: {repository.registeredAt}
                  </div>
                </div>
              )}

              {/* ファイル構造 */}
              <div className="bg-[#2D3748] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                  📁 プロジェクト構造
                </h3>
                <pre className="text-sm text-[#A0AEC0] font-mono overflow-x-auto">
                  {repository.fileStructure.join("\n")}
                </pre>
              </div>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* 依存関係 */}
              <div className="bg-[#2D3748] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">
                  📦 主要な依存関係
                </h3>
                <div className="space-y-2">
                  {Object.entries(repository.dependencies).map(
                    ([name, version]) => (
                      <div
                        key={name}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-sm font-mono">{name}</span>
                        <span className="text-xs text-[#A0AEC0] font-mono">
                          {version}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* アクション */}
              <div className="bg-[#2D3748] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">⚙️ アクション</h3>
                <div className="space-y-3">
                  {!repository.isRegistered ? (
                    <Link
                      href={`/repositories/${repository.id}/register`}
                      className="block w-full bg-[#4299E1] text-[#F7FAFC] px-4 py-2 rounded-lg font-medium hover:bg-[#3182CE] transition-colors text-center"
                    >
                      StackCompassに登録
                    </Link>
                  ) : (
                    <div className="bg-[#48BB78] text-[#F7FAFC] px-4 py-2 rounded-lg text-center">
                      ✅ 登録済み
                    </div>
                  )}

                  <button className="w-full border border-[#4299E1] text-[#4299E1] px-4 py-2 rounded-lg font-medium hover:bg-[#4299E1] hover:text-[#F7FAFC] transition-colors">
                    類似プロジェクトを探す
                  </button>
                </div>
              </div>

              {/* 統計情報 */}
              <div className="bg-[#2D3748] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">📊 統計</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#A0AEC0] text-sm">作成日</span>
                    <span className="text-sm">2024-01-01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0AEC0] text-sm">最終更新</span>
                    <span className="text-sm">2024-01-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0AEC0] text-sm">サイズ</span>
                    <span className="text-sm">1.2 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
