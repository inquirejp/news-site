# Contributing

inquire.jp ニュースサイトへの貢献ガイド。

## 開発環境セットアップ

```bash
# 前提: Node.js 22以上
node -v  # v22.x.x

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:4321/news-site/

# ビルド
npm run build
```

## ブランチ命名規則

| 用途 | 命名パターン | 例 |
|------|-------------|-----|
| 日次コンテンツ | `articles/YYYY-MM-DD` | `articles/2026-03-16` |
| 機能追加 | `feature/簡潔な説明` | `feature/rss-feed` |
| バグ修正 | `fix/簡潔な説明` | `fix/broken-links` |
| ドキュメント | `docs/簡潔な説明` | `docs/operations-guide` |

## コンテンツの追加

### 記事（ニュース）

`src/content/articles/YYYY-MM-DD-slug.md` を作成:

```yaml
---
title: "記事タイトル"
vertical: "zebra-bcorp"          # or "sustainability"
source_url: "https://..."        # 元記事の実URL（必須）
source_name: "メディア名"
published_date: 2026-03-16
status: "draft"                  # draft → review → approved → published
quality_tier: "standard"         # brief / standard / deep
tags: ["タグ1", "タグ2"]
summary: "1-2行の要約"
---

本文（Markdown）
```

### イベント

`src/content/events/YYYY-MM-DD-slug.md` — 記事と同じフィールドに加え:

```yaml
event_name: "イベント名"
event_date: 2026-04-15
venue_name: "会場名"
venue_type: "online"             # online / offline / hybrid
organizer: "主催者名"
registration_url: "https://..."  # 申込ページの実URL
fee: "無料"
```

### キュレーション

`src/content/curations/YYYY-MM-DD-slug.md`:

```yaml
---
title: "タイトル"
vertical: "zebra-bcorp"
source_url: "https://..."        # 元記事の実URL（必須）
source_name: "メディア名"
published_date: 2026-03-16
status: "published"
tags: ["タグ"]
summary: "要約"
editorial_comment: "編集コメント（200-400字）"
feed_source: "rss-source-id"
---
```

### バーティカル追加

`src/content/verticals/slug.yaml`（ニュース用）または `src/content/event-verticals/slug.yaml`（イベント用）にYAMLファイルを追加。既存ファイルを参考にすること。

## 編集基準

`scripts/editorial-rules.md` に準拠。主なルール:

- **文体**: だである調
- **表記**: 英数字は半角、引用は「」、作品名は『』
- **メタファー**: ガーデニング/生態系OK、戦争/機械/競争NG
- **source_url**: 必ず実在するページにリンクすること

## PR作成〜マージ

1. ブランチを作成（命名規則に従う）
2. 変更をコミット・プッシュ
3. PRを作成（テンプレートに沿って記入）
4. GitHub Actionsのビルドチェックが通ることを確認
5. マージ → GitHub Pagesに自動デプロイ

## inquire.jp合流に向けて

将来的にinquire.jp本体への統合を予定しています。以下の点に留意してください:

- コンテンツはMarkdown + YAML frontmatterの標準形式を維持する
- タグ名はinquire.jpのWordPressタグと整合性を保つ
- 独自の拡張（frontmatterフィールド追加等）は事前に相談する
