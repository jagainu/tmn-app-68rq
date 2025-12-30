# TMN Memo - シンプルなメモアプリ

Next.js 14とlocalStorageを使用したシンプルで使いやすいメモアプリケーションです。

## 機能

- ✅ メモ作成
- ✅ メモ編集
- ✅ メモ削除
- ✅ メモ一覧表示
- ✅ レスポンシブデザイン
- ✅ データ永続化（localStorage）
- ✅ モダンなUI（Tailwind CSS）

## 技術スタック

- **フレームワーク**: Next.js 14.2.5 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **データ保存**: localStorage

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd tmn-memo
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

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
│   ├── edit/[id]/        # メモ編集ページ
│   ├── new/              # 新規メモ作成ページ
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # トップページ（メモ一覧）
├── components/
│   ├── ui/               # UIコンポーネント
│   └── memo-card.tsx     # メモカードコンポーネント
├── lib/
│   └── utils.ts          # ユーティリティ関数
└── types/
    └── memo.ts           # 型定義
```

## 特徴

- **シンプルな操作**: 直感的なUIでストレスなくメモを管理
- **レスポンシブデザイン**: デスクトップ・モバイル両対応
- **高速**: localStorageによる高速なデータ読み込み
- **プライバシー**: データは全てブラウザ内に保存
- **オフライン対応**: ネット接続不要で利用可能

## ライセンス

MIT

## 開発者向け情報

### ビルド

```bash
npm run build
```

### 本番環境での実行

```bash
npm run start
```

### コードの品質チェック

```bash
npm run lint
```