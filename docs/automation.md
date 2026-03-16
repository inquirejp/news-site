# 自動化ガイド

コンテンツパイプラインの自動化設定について。

## 現在の自動化状況

| コンポーネント | 状態 | 備考 |
|--------------|------|------|
| GitHub Pagesデプロイ | 稼働中 | mainマージで自動実行 |
| ニュース収集 | 定義済み・未スケジュール | `scripts/gather-news.md` |
| イベント収集 | 定義済み・未スケジュール | `scripts/gather-events.md` |
| 記事生成 | 定義済み・未スケジュール | `scripts/generate-articles.md` |
| バッチレビュー | 定義済み・未設定 | `scripts/batch-review.md` |
| Slack通知 | 設計済み・未設定 | batch-review内で定義 |

## 日次パイプラインの自動化

### 方法: Claude Code Scheduled Tasks

Claude Codeのスケジュール機能を使って日次パイプラインを自動実行する。

#### セットアップ手順

1. Claude Codeで以下のスケジュールタスクを作成:

```
タスク名: inquire-news-daily-pipeline
スケジュール: 毎日 7:00 JST
実行内容:
  1. scripts/gather-news.md を実行（ニュース収集）
  2. scripts/gather-events.md を実行（イベント収集）
  3. scripts/generate-articles.md を実行（記事生成）
  4. scripts/batch-review.md を実行（PR作成＋Slack通知）
```

2. Slack Webhook URLを設定（`scripts/batch-review.md`内で使用）

3. テスト実行で動作確認

#### 前提条件

- Claude Codeが稼働していること（ローカルまたはクラウド）
- GitHubへのpush権限
- Slack Webhook URL（通知用）

### 代替案: 手動実行

スケジュール設定前でも、Claude Codeに直接指示して実行可能:

```
「scripts/gather-news.md を実行して、今日のニュースを収集して」
「scripts/batch-review.md を実行して、PRを作って」
```

## Slack連携

### バッチレビュー通知

`scripts/batch-review.md` で定義済みの通知フォーマット:

```
デイリーニュース候補（2026/03/16）— 8件

1. ゼブラ企業・B Corp
   「パタゴニアが新たなB Corp基準を提案」
   品質スコア: 92/100

2. サステナビリティ
   「EU循環経済規制、2027年施行へ」
   品質スコア: 88/100
...

全承認 →「all」とリプライ
個別除外 → 番号指定（例:「3,5除外」）
修正指示 → 番号+指示
```

### 設定に必要なもの

1. Slackワークスペースにチャネルを作成（例: `#news-review`）
2. Incoming Webhookを設定
3. Webhook URLを `scripts/batch-review.md` のワークフローに組み込む

## 将来的な自動化拡張

### 過去イベントの自動アーカイブ

GitHub Actions cronジョブで実装可能:

```yaml
# .github/workflows/archive-events.yml（将来実装）
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日 0:00 UTC
jobs:
  archive:
    # event_dateが過去のイベントのstatusを「archived」に変更
```

### コンテンツ鮮度チェック

- 30日以上前の記事にラベル付け
- source_urlのリンク切れを定期チェック

### RSS フィード生成

- バーティカル別のRSSフィード出力
- Astroの `@astrojs/rss` パッケージで実装可能

### アナリティクス連携

- Cloudflare AnalyticsまたはPlausibleの導入
- 閲覧データをコンテンツ選定基準にフィードバック
