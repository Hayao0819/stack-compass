StackCompass ハッカソン版 要件定義（Next.js \+ Server Actions \+ framework-info）

## **1\. プロダクト概要**

「StackCompass」は、GitHub リポジトリからプロダクトの技術スタックを自動検出し、開発者や企業が技術選定の参考にできるプラットフォームです。本ハッカソン版では、**Next.js のみ**を対象とした自動検出機能を実装します。  
---

## **2\. 主要機能要件**

### **2.1 GitHub リポジトリ連携**

* ユーザーは GitHub OAuth でログインできること  
* ユーザーのリポジトリ一覧を取得し、対象リポジトリを選択できること  
* 選択されたリポジトリの `package.json` を取得して検出処理に利用

### **2.2 フレームワーク自動検出**

* [Netlify/framework-info](https://github.com/netlify/framework-info) を使用  
* 選択したリポジトリが Next.js プロジェクトか判定  
  * Next.js が `dependencies` または `devDependencies` に含まれる場合のみ検出成功  
* Next.js 以外のプロジェクトは「非対応」と表示

### **2.3 プロジェクト登録**

* Next.js と判定された場合のみ、プロジェクト情報を登録可能  
* 登録情報には以下を含む：  
  * リポジトリ名 / GitHub URL  
  * 検出フレームワーク（Next.js）  
  * 登録日時  
  * 任意で「なぜこのフレームワークを選んだか」の説明

### **2.4 UI / UX**

* リポジトリ一覧表示画面  
  * 検出結果を一覧で表示（Next.js ✅ / 非対応 ❌）  
  * 「登録」ボタンで選択リポジトリを StackCompass に追加  
* 登録フォーム画面  
  * 検出結果を確認し、必要に応じて補足情報を入力

### **2.5 Server Actions 利用**

* Next.js `app/` ディレクトリで Server Actions を使用してサーバー処理を実装  
* GitHub API 連携、フレームワーク検出、DB 登録を Server Actions で実行  
* フロントエンドはすべて Client Components で構築可能

---

## **3\. 非機能要件**

### **3.1 技術スタック**

* **フロントエンド / サーバーサイド**: Next.js 14 (app router \+ Server Actions)  
* **フレームワーク検出**: Node.js \+ `@netlify/framework-info`  
* **データベース**: SQLite / PostgreSQL（ハッカソン用は SQLite で十分）  
* **認証**: GitHub OAuth  
* **デプロイ環境**: さくらインターネット AppRun (β)  
* **CI/CD**: GitHub Actions（リポジトリ検出用スクリプト実行、AppRun デプロイ）

### **3.2 パフォーマンス**

* GitHub リポジトリ検出・登録処理は 5 秒以内を目標  
* Server Actions で非同期処理を活用して UI ブロッキングを避ける

### **3.3 セキュリティ**

* OAuth トークンはサーバー側で安全に保管し、フロントエンドに露出しない  
* HTTPS 通信を必須とする  
* 登録情報はユーザー権限に応じて閲覧制限（公開 / 非公開）を設定可能

### **3.4 スケーラビリティ**

* 初期は Next.js \+ SQLite で MVP を実装  
* 将来的に他フレームワーク追加や大量リポジトリ対応のため、DB を PostgreSQL に移行可能

---

## **4\. 制約条件**

* ハッカソン期間中は **Next.js のみ検出対象**  
* GitHub プライベートリポジトリは OAuth 権限でアクセス可能なものに限定  
* リポジトリをフルクローンせず、API で `package.json` を取得して検出する

---

## **5\. ハッカソン MVP フロー**

1. ユーザーが GitHub でログイン  
2. リポジトリ一覧を取得・選択  
3. `@netlify/framework-info` で Next.js 検出  
4. 検出結果を表示（✅ Next.js / ❌ 非対応）  
5. ユーザーが登録ボタンを押すと Server Actions 経由で DB に保存  
6. 登録されたプロジェクトは StackCompass 上で一覧表示

