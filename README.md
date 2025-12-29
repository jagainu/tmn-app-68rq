# TMN Memo - シンプルなメモアプリ

Next.js 14とVercel KVを使用したシンプルで使いやすいメモアプリケーションです。

## 機能

- ✅ メモ作成
- ✅ メモ編集
- ✅ メモ削除
- ✅ メモ一覧表示
- ✅ レスポンシブデザイン
- ✅ モダンなUI（shadcn/ui）

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **データベース**: Vercel KV
- **デプロイ**: Vercel

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd tmn-memo-240103
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 3. 環境変数の設定

`.env.example`を`.env.local`にコピーし、Vercel KVの認証情報を設定してください：

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
KV_REST_API_URL=your_actual_kv_rest_api_url
KV_REST_API_TOKEN=your_actual_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_actual_kv_read_only_token
```

### 4. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Vercel KVのセットアップ

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. "Storage" タブに移動
4. "Create Database" > "KV" を選択
5. データベース名を入力して作成
6. "Settings" タブで環境変数を確認し、`.env.local`に設定

## デプロイ

### Vercelでのデプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. デプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 使用方法

### メモの作成
1. トップページの「新しいメモ」ボタンをクリック
2. タイトルと内容を入力
3. 「保存」ボタンをクリック

### メモの編集
1. メモカードの「編集」ボタンをクリック
2. 内容を変更
3. 「更新」ボタンをクリック

### メモの削除
1. メモカードの「削除」ボタンをクリック
2. 確認ダイアログで「削除」を選択

## プロジェクト構造

```
src/
├── app/
│   ├── actions/          # Server Actions
│   ├── edit/[id]/        # メモ編集ページ
│   ├── new/              # 新規メモ作成ページ
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # トップページ（メモ一覧）
├── components/
│   ├── ui/               # shadcn/uiコンポーネント
│   └── delete-memo-button.tsx
├── lib/
│   └── utils.ts          # ユーティリティ関数
└── types/
    └── memo.ts           # 型定義
```

## ライセンス

MIT
