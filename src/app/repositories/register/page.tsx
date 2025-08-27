"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

// モックデータ - 検出結果
const detectedLibraries = [
  { name: "Next.js", status: "success", detected: true },
  { name: "TypeScript", status: "success", detected: true },
  { name: "Tailwind CSS", status: "success", detected: true },
  { name: "Vue.js", status: "error", detected: false },
];

export default function RegisterProjectPage(_: { params: { id: string } }) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [formData, setFormData] = useState({
    projectReason: "",
    libraryReasons: {
      "Next.js": "",
      TypeScript: "",
      "Tailwind CSS": "",
    },
  });

  const handleDetection = () => {
    if (!githubUrl) return;

    setIsDetecting(true);
    // モックの検出処理
    setTimeout(() => {
      setIsDetecting(false);
      setDetectionComplete(true);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("登録データ:", { githubUrl, ...formData });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">プロジェクトの登録</h1>
            <Link href="/repositories" className="text-primary hover:underline">
              ← リポジトリ一覧に戻る
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ステップ1: GitHub URL入力 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  1. GitHub リポジトリURL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="github-url"
                      className="block text-sm font-medium mb-2"
                    >
                      GitHub URL
                    </label>
                    <input
                      id="github-url"
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border-none focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleDetection}
                    disabled={!githubUrl || isDetecting}
                    className="w-fit"
                  >
                    {isDetecting ? "検出中..." : "技術スタックを検出"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ステップ2: 検出結果表示 */}
            {isDetecting && (
              <Card className="mb-6">
                <CardContent>
                  <div className="flex items-center space-x-2 py-4">
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span className="text-muted-foreground">
                      技術スタックを検出中...
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ステップ3: 検出結果とライブラリごとの選定理由 */}
            {detectionComplete && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    2. 検出結果
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detectedLibraries.map((library) => (
                      <div key={library.name} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`text-lg ${
                              library.detected
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {library.detected ? "✅" : "❌"}
                          </span>
                          <span className="font-medium">{library.name}</span>
                          {!library.detected && (
                            <span className="text-sm text-muted-foreground">
                              (非対応)
                            </span>
                          )}
                        </div>

                        {/* 検出されたライブラリのみ選定理由入力欄を表示 */}
                        {library.detected && (
                          <div className="ml-6">
                            <label
                              htmlFor={`reason-${library.name}`}
                              className="block text-sm font-medium mb-2 text-muted-foreground"
                            >
                              選定理由（任意）
                            </label>
                            <textarea
                              id={`reason-${library.name}`}
                              value={
                                formData.libraryReasons[
                                  library.name as keyof typeof formData.libraryReasons
                                ] || ""
                              }
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  libraryReasons: {
                                    ...formData.libraryReasons,
                                    [library.name]: e.target.value,
                                  },
                                })
                              }
                              rows={3}
                              placeholder={`${library.name}を選んだ理由を入力してください...`}
                              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border-none focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ステップ4: プロジェクト全体の選定方針 */}
            {detectionComplete && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    3. プロジェクト全体の技術選定方針
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label
                      htmlFor="project-reason"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      技術選定の全体的な方針・考え方（任意）
                    </label>
                    <textarea
                      id="project-reason"
                      value={formData.projectReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectReason: e.target.value,
                        })
                      }
                      rows={4}
                      placeholder="例：チーム全体の開発効率を重視し、TypeScriptで型安全性を確保。パフォーマンスとSEOのバランスを取るためNext.jsを採用。デザインシステムの構築を効率化するためTailwind CSSを選択..."
                      className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 登録ボタン */}
            {detectionComplete && (
              <div className="flex gap-4">
                <Button type="submit">プロジェクトを登録</Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/repositories">キャンセル</Link>
                </Button>
              </div>
            )}
          </form>

          {/* Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>💡 Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  •
                  技術選定の理由を詳しく書くと、他の開発者にとって参考になります
                </li>
                <li>
                  •
                  パフォーマンス、開発体験、チーム構成などの観点から記述してみてください
                </li>
                <li>
                  • 登録後は公開され、他のユーザーが閲覧できるようになります
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
