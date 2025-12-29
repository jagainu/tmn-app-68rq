# tmn-memo-240103

> **Status**: 🎨 DESIGNING

## 概要

シンプルで使いやすいメモアプリケーション。メモの作成、編集、削除が可能です。

## 機能

- [ ] メモ作成
- [ ] メモ編集
- [ ] メモ削除
- [ ] メモ一覧表示

## 画面

| パス | 画面名 | 説明 |
|------|--------|------|
| `/` | メモ一覧 | 全てのメモを表示するトップページ |
| `/new` | 新規メモ作成 | 新しいメモを作成するページ |
| `/edit/[id]` | メモ編集 | 既存のメモを編集するページ |

## データ

### Memo

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | メモの一意のID |
| title | string | メモのタイトル |
| content | string | メモの内容 |
| createdAt | string | メモ作成日時 |
| updatedAt | string | メモ最終更新日時 |

## 認証

なし

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Database: Vercel KV
- Hosting: Vercel
