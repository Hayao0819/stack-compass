import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A202C] text-[#F7FAFC]">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">StackCompass</h1>
          <p className="text-xl text-[#A0AEC0] mb-8">
            GitHub リポジトリから技術スタックを自動検出
          </p>
          <p className="text-[#A0AEC0] mb-12 max-w-2xl mx-auto">
            あなたのリポジトリを分析し、使用している技術スタックを検出して、
            他の開発者が技術選定の参考にできるプラットフォームです。
          </p>

          <div className="space-y-4">
            <Link
              href="/auth"
              className="inline-block bg-[#4299E1] text-[#F7FAFC] px-8 py-3 rounded-lg font-medium hover:bg-[#3182CE] transition-colors"
            >
              GitHubでログイン
            </Link>

            <div className="mt-8">
              <Link
                href="/repositories"
                className="text-[#4299E1] hover:underline"
              >
                登録済みプロジェクトを見る →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#2D3748] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🔍 自動検出</h3>
            <p className="text-[#A0AEC0]">
              package.json を分析してNext.jsプロジェクトを自動検出
            </p>
          </div>

          <div className="bg-[#2D3748] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📊 簡単登録</h3>
            <p className="text-[#A0AEC0]">
              検出結果をワンクリックでプラットフォームに登録
            </p>
          </div>

          <div className="bg-[#2D3748] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 技術選定支援</h3>
            <p className="text-[#A0AEC0]">
              他の開発者の技術選定理由を参考にして学習
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
