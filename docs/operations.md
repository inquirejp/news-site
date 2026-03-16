# 運用ガイド

inquire.jpニュースサイトの日常運用マニュアル。

## 日次コンテンツパイプライン

| 時刻 | 工程 | スクリプト | 現在の状態 |
|------|------|-----------|-----------|
| 7:00 | ニュース収集 | `scripts/gather-news.md` | 定義済み・未スケジュール |
| 7:00 | イベント収集 | `scripts/gather-events.md` | 定義済み・未スケジュール |
| 7:15 | 記事生成＋セルフレビュー | `scripts/generate-articles.md` | 定義済み・未スケジュール |
| 7:45 | PR作成＋Slack通知 | `scripts/batch-review.md` | 定義済み・未スケジュール |
| 随時 | 承認→マージ→自動デプロイ | `.github/workflows/deploy.yml` | **稼働中** |

### パイプラインの流れ

1. **ニュース収集**: `src/content/verticals/`のYAML定義に基づき、指定ソースからニュースを検索。スコアリング（適時性・読者価値・コンセプト整合性・独自性）で候補を選定
2. **イベント収集**: `src/content/event-verticals/`の定義に基づき、Peatix・connpass等からイベントを発見。未来日程のみ、重複除去
3. **記事生成**: 選定された候補からMarkdown記事を生成。`scripts/editorial-rules.md`に準拠したセルフレビューを実施
4. **バッチレビュー**: `articles/YYYY-MM-DD`ブランチにPRを作成。Slackに候補一覧を通知
5. **承認・公開**: 人間が承認→PRマージ→GitHub Actionsで自動ビルド・デプロイ

## 手動コンテンツ操作

### 記事を手動で追加する

1. `src/content/articles/YYYY-MM-DD-slug.md` を作成
2. frontmatterを記入（スキーマ: `src/content.config.ts`）
3. statusを `published` に設定
4. コミット→PRまたはmainにプッシュ

### イベントを追加する

1. `src/content/events/YYYY-MM-DD-slug.md` を作成
2. 記事と同じフィールド＋イベント固有フィールド（event_date, venue_name等）
3. `registration_url`は実在する申込ページのURLを設定すること

### キュレーションを追加する

1. `src/content/curations/YYYY-MM-DD-slug.md` を作成
2. `editorial_comment`に編集コメント（200-400字）を記載
3. `source_url`は必ず元記事の実在URLを設定すること

### ステータスフロー

```
draft → review → approved → published
```

- `draft`: 下書き（サイトに表示されない）
- `review`: レビュー待ち（サイトに表示されない）
- `approved`: 承認済み（サイトに表示される）
- `published`: 公開済み（サイトに表示される）

## バーティカル（テーマ領域）の追加

### ニュース用バーティカル

1. `src/content/verticals/` に新しいYAMLファイルを作成
2. 既存ファイル（`zebra-bcorp.yaml`）を参考にフィールドを設定:
   - `name`, `slug`, `active`
   - `sources`（日本語・英語のソースとクエリ）
   - `daily_target`（日次目標件数）
   - `editorial`（編集角度、キーコンセプト、禁止事項）
   - `selection_weights`（スコアリング重み）
3. GitHubに `vertical:slug` ラベルを追加

### イベント用バーティカル

1. `src/content/event-verticals/` に新しいYAMLファイルを作成
2. 既存ファイルを参考に設定

## デプロイ

### 自動デプロイ（通常）

mainブランチへのマージ時にGitHub Actionsが自動実行:
1. Node.js 22でビルド（`npm ci && npm run build`）
2. `dist/`をGitHub Pagesにデプロイ

### 手動デプロイ

GitHub > Actions > Deploy Astro site > Run workflow > `main`ブランチを選択

### ビルドの確認

```bash
npm run build    # ローカルでビルド
npm run preview  # ビルド結果をプレビュー
```

## inquire.jp との合流方針

### 現在の設計判断

- コンテンツはMarkdown + 標準的YAML frontmatterで管理
- タグ名はinquire.jpのWordPressタグと整合性を保つ
- 静的サイト（Astro）として独立運用

### 合流時の選択肢

**Option A: WordPress REST API連携**
- Astroサイトのコンテンツ（Markdown）をWordPress REST APIで投稿
- inquire.jp上でタグ・カテゴリと統合
- SEO・回遊性のメリットが大きい

**Option B: リバースプロキシ**
- inquire.jp/news/ 以下をAstroサイトにプロキシ
- 各サイトは独立したまま、URLだけ統合
- 技術的に低リスクだが、サイト内回遊やタグ統合は制限される

### 移行時に注意すべきこと

- frontmatterの `tags` フィールドとWordPressタグのマッピング
- URLスラッグの一貫性（現在: `/articles/YYYY-MM-DD-slug/`）
- OGP・構造化データの引き継ぎ
