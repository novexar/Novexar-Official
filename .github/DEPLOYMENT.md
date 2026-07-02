# GitHub Pages デプロイ設定

このプロジェクトはmainブランチへのpush時に自動的にGitHub Pagesにデプロイされます。

## 初回セットアップ手順

GitHubリポジトリで以下の設定を行ってください：

1. リポジトリの **Settings** タブを開く
2. 左サイドバーから **Pages** を選択
3. **Source** セクションで以下を設定：
   - Source: **GitHub Actions** を選択

これで設定完了です。

## デプロイ方法

mainブランチにコミットをpushすると、自動的にビルドとデプロイが実行されます：

```bash
git add .
git commit -m "your commit message"
git push origin main
```

## デプロイ状況の確認

1. リポジトリの **Actions** タブでワークフローの実行状況を確認できます
2. デプロイが完了すると、以下のURLでサイトにアクセスできます：
   - `https://novexar.github.io/Novexar-Official/`

## トラブルシューティング

### デプロイが失敗する場合

1. **Actions** タブでエラーログを確認
2. リポジトリの **Settings > Actions > General** で以下を確認：
   - **Workflow permissions**: "Read and write permissions" を選択
   - **Allow GitHub Actions to create and approve pull requests**: チェックを入れる

### ページが表示されない場合

1. **Settings > Pages** で設定を確認
2. ブラウザのキャッシュをクリア
3. 数分待ってから再度アクセス

## ローカルでのビルド確認

デプロイ前にローカルでビルドをテストする場合：

```bash
npm run build
npm run preview
```
