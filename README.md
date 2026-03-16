# inquire.jp ニュースサイト

[inquire.jp](https://inquire.jp/) の拡張ニュースサイト。ゼブラ企業・B Corp・サステナビリティ等の領域に特化したニュース・イベント・キュレーションを半自動的に収集・配信する。

**本番サイト**: https://inquirejp.github.io/news-site/

## アーキテクチャ

- **フレームワーク**: [Astro](https://astro.build/) 6（静的サイト生成）
- **コンテンツ管理**: Markdown + YAML frontmatter（Content Collections）
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions（mainマージ時に自動デプロイ）
- **コンテンツ生成**: Claude Code による半自動パイプライン

## コンテンツ構成

| 種別 | 説明 | 格納先 |
|------|------|--------|
| ニュース | AI生成＋編集レビュー済みの記事 | `src/content/articles/` |
| イベント | 関連イベントの紹介 | `src/content/events/` |
| キュレーション | 外部記事の選定＋編集コメント | `src/content/curations/` |

### バーティカル（テーマ領域）

| バーティカル | 定義ファイル |
|-------------|-------------|
| ゼブラ企業・B Corp | `src/content/verticals/zebra-bcorp.yaml` |
| サステナビリティ | `src/content/verticals/sustainability.yaml` |

## クイックスタート

```bash
# Node.js 22以上が必要
npm install
npm run dev
# → http://localhost:4321/news-site/
```

## ドキュメント

- [コントリビューションガイド](CONTRIBUTING.md) — 開発・コンテンツ追加の手順
- [運用ガイド](docs/operations.md) — 日次パイプライン、手動操作、デプロイ
- [自動化ガイド](docs/automation.md) — スケジュール設定、Slack連携

## 日次コンテンツパイプライン

```
7:00  ニュース・イベント収集（scripts/gather-news.md, gather-events.md）
7:15  記事生成＋セルフレビュー（scripts/generate-articles.md）
7:45  PR作成＋Slack通知（scripts/batch-review.md）
 ↓    人間が承認
承認後  PRマージ → 自動デプロイ
```

## 関連リポジトリ

- inquire.jp 本体（WordPress） — 将来的に本ニュースサイトとの統合を予定
