# Novexar Official

**Modern Portfolio Website for Azure IT Consultant & Engineer**

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Latest-black)](https://ui.shadcn.com/)

## 概要

Azure/AI関連のITコンサルタント・エンジニアのための、モダンでプロフェッショナルなポートフォリオサイトです。
Shadcn UIを使用したシックなデザインと、データ駆動型アーキテクチャによる高い保守性を実現しています。

## 主な特徴

- **モダンなデザイン**: Shadcn UIベースのシックでプロフェッショナルなデザイン
- **データ駆動型**: JSONファイルでコンテンツを管理、コードとデータを完全分離
- **高い保守性**: コンポーネント指向設計により、拡張・修正が容易
- **完全な型安全性**: TypeScriptによる型定義で開発効率を向上
- **レスポンシブ**: モバイル・タブレット・デスクトップすべてに対応
- **アニメーション**: Framer Motionによる洗練されたアニメーション

## 技術スタック

### コア技術
- **React 18.3** - UIライブラリ
- **TypeScript 5.5** - 型安全な開発
- **Vite 5.4** - 高速ビルドツール

### UIとスタイリング
- **Shadcn UI** - UIコンポーネントライブラリ
- **Tailwind CSS 3.4** - ユーティリティファーストCSS
- **Framer Motion 11.0** - アニメーションライブラリ
- **Lucide React** - アイコンライブラリ

### 開発ツール
- **ESLint** - コード品質管理
- **PostCSS** - CSS処理
- **Autoprefixer** - ベンダープレフィックス自動付与

## プロジェクト構成

```
Novexar Official/
├── docs/                       # プロジェクトドキュメント
│   ├── DESIGN.md              # 設計書
│   ├── PROGRESS.md            # 進捗管理
│   └── TODO.md                # タスク管理
│
├── src/
│   ├── components/            # Reactコンポーネント
│   │   ├── layout/           # ヘッダー・フッター
│   │   ├── sections/         # セクションコンポーネント
│   │   └── ui/               # Shadcn UIコンポーネント
│   │
│   ├── data/                  # JSONデータファイル
│   │   ├── content.json      # サイトコンテンツ
│   │   ├── projects.json     # プロジェクト情報
│   │   └── services.json     # サービス情報
│   │
│   ├── types/                 # TypeScript型定義
│   ├── lib/                   # ユーティリティ関数
│   └── assets/                # 静的アセット
│
├── public/                    # 公開ファイル
└── dist/                      # ビルド出力

```

## セットアップ

### 必要な環境

- Node.js 18.0以上
- npm 9.0以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/novexar/Novexar-Official.git
cd Novexar-Official

# 依存関係をインストール
npm install
```

### 開発

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173/Novexar-Official/ を開く
```

### ビルド

```bash
# プロダクションビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

### デプロイ

```bash
# GitHub Pagesへデプロイ
npm run deploy
```

## コンテンツの更新

### プロジェクトの追加

`src/data/projects.json` を編集:

```json
{
  "id": "new-project",
  "title": "プロジェクト名",
  "description": "プロジェクトの説明",
  "image": "画像URL",
  "url": "GitHubリポジトリURL",
  "tags": ["Tag1", "Tag2"],
  "featured": true,
  "category": "frontend"
}
```

### サービスの追加

`src/data/services.json` を編集:

```json
{
  "id": "new-service",
  "icon": "Cloud",
  "title": "サービス名",
  "description": "サービスの説明",
  "tags": ["Azure", "Cloud"]
}
```

### テキスト内容の変更

`src/data/content.json` を編集して、サイト全体のテキストを変更できます。

## ドキュメント

詳細なドキュメントは`docs/`フォルダを参照してください:

- **[DESIGN.md](docs/DESIGN.md)** - アーキテクチャとデザインシステムの詳細
- **[PROGRESS.md](docs/PROGRESS.md)** - プロジェクトの進捗状況
- **[TODO.md](docs/TODO.md)** - タスク一覧と計画

## ライセンス

MIT License

## 作者

**Novexar**
Azure IT Consultant, Engineer

- GitHub: [@novexar](https://github.com/novexar)
- Website: [Novexar Official](https://novexar.github.io/Novexar-Official/)

---

**Built with ❤️ using React, TypeScript, and Shadcn UI**