# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロダクト概要

StackCompass は、GitHub リポジトリから技術スタックを自動検出し、開発者が技術選定の参考にできるプラットフォーム。ハッカソン版では Next.js のみを対象とした自動検出機能を実装。

## 技術スタック

- **フレームワーク**: Next.js 15.5.0 (app router + Server Actions)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **フォーマット/リント**: Biome
- **パッケージマネージャー**: pnpm
- **Node.js**: 22.18.0 (Volta で管理)

## 開発コマンド

```bash
# セットアップ
volta install corepack
pnpm install

# 開発サーバー起動 (Turbopack使用)
pnpm dev

# ビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リント & フォーマット
pnpm lint
pnpm format
```

## アーキテクチャ

### Server Actions 中心設計

- GitHub API 連携、フレームワーク検出、DB 登録はすべて Server Actions で実行
- フロントエンドは Client Components で構築
- UI ブロッキングを避けるため非同期処理を重視

### 主要機能フロー

1. GitHub OAuth によるユーザー認証
2. リポジトリ一覧の取得と選択
3. `@netlify/framework-info` による Next.js 検出
4. 検出結果の表示 (✅ Next.js / ❌ 非対応)
5. Server Actions 経由での DB 登録
6. 登録済みプロジェクトの一覧表示

### ディレクトリ構造

```txt
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # ルートレイアウト
│   ├── page.tsx      # ホームページ
│   └── globals.css   # グローバルスタイル
```

## デザインシステム

### カラーパレット

- **Primary**: #1A202C (背景色)
- **Secondary**: #2D3748 (カード背景)
- **Accent**: #4299E1 (インタラクション要素)
- **Success**: #48BB78 (検出成功)
- **Error**: #F56565 (非対応/エラー)

### フォント

- **Sans**: Geist
- **Mono**: Geist Mono

## 実装上の注意点

### セキュリティ

- OAuth トークンはサーバー側で安全に保管
- フロントエンドに露出しない
- HTTPS 通信必須

### パフォーマンス

- GitHub リポジトリ検出・登録処理は 5 秒以内を目標
- package.json のみ取得（フルクローンしない）

### データベース

- 初期実装: SQLite
- 将来: PostgreSQL への移行を想定
