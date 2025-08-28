"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TechDetectResult } from "@/lib/detector/call";
import { fetcher } from "@/lib/fetcher";
import { registerRepository } from "./action";

export const registerFormSchema = z.object({
  owner: z.string().max(500),
  repository: z.string().max(500),
  branch: z.string().max(500),
  projectReason: z.string().max(500),
  libraryReasons: z.array(
    z.object({
      name: z.string().max(500),
      reason: z.string().max(1000),
    })
  ),
});

export default function RegisterProjectPage(_: { params: { id: string } }) {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      owner: "",
      repository: "",
      branch: "",
      projectReason: "",
      libraryReasons: [],
    },
    mode: "onChange",
  });
  const { fields: techFields, replace: replaceTechField } = useFieldArray({
    control: form.control,
    name: "libraryReasons",
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [detectedTech, setDetectedTech] = useState<TechDetectResult | null>(
    null
  );
  const [detectingError, setDetectingError] = useState<string | null>(null);

  const handleDetect = async () => {
    setDetectionComplete(false);
    setIsDetecting(true);
    const owner = form.getValues("owner");
    const repo = form.getValues("repository");
    const branch = form.getValues("branch");
    try {
      const res = (await fetcher(
        `/api/detect/${encodeURIComponent(owner)}/${encodeURIComponent(
          repo
        )}/${encodeURIComponent(branch)}`
      )) as TechDetectResult;

      setDetectedTech(res);

      replaceTechField(
        res.detected?.map((tech) => ({
          name: tech,
          reason: "",
        })) ?? []
      );
    } catch (error) {
      if (error instanceof Error) {
        setDetectingError(error.message);
      }
    }
    setIsDetecting(false);
    setDetectionComplete(true);
  };

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    await registerRepository(data, techFields);
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* ステップ1: GitHub URL入力 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    1. GitHub リポジトリURL
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>オーナー名</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repository"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>リポジトリ名</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ブランチ名</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    disabled={
                      !form.watch("owner") ||
                      !form.watch("repository") ||
                      !form.watch("branch") ||
                      isDetecting
                    }
                    onClick={handleDetect}
                  >
                    技術を検出
                  </Button>
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
                  <CardContent className="space-y-4">
                    {techFields.map((tech) => (
                      <FormField
                        key={tech.id}
                        control={form.control}
                        {...form.register(
                          `libraryReasons.${techFields.indexOf(tech)}.reason`
                        )}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tech.name}</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                id={`library-reason-${tech.id}`}
                                rows={2}
                                placeholder="例：このライブラリはパフォーマンスが高く、開発が容易です..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
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
                    <FormField
                      control={form.control}
                      name="projectReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>技術選定方針（任意）</FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              id="project-reason"
                              rows={4}
                              placeholder="例：このプロジェクトではパフォーマンスと開発体験を重視し、最新の技術を採用しました..."
                              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border-none focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* 登録ボタン */}
              {detectionComplete && (
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                  >
                    プロジェクトを登録
                  </Button>
                </div>
              )}
            </form>
          </Form>

          {/* Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>💡 Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc">
                <li>
                  技術選定の理由を詳しく書くと、他の開発者にとって参考になります
                </li>
                <li>
                  パフォーマンス、開発体験、チーム構成などの観点から記述してみてください
                </li>
                <li>
                  登録後は公開され、他のユーザーが閲覧できるようになります
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
