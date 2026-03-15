# ニュース収集ワークフロー

## 概要

全アクティブバーティカルに対して並行でニュース検索を行い、候補リストを生成する。

## 実行タイミング

毎日 7:00（scheduled task）

## 手順

### Step 1: バーティカル定義の読み込み

`src/content/verticals/` 配下の全 YAML ファイルを読み込み、`active: true` のバーティカルのみを対象とする。

### Step 2: 並行ニュース検索

各バーティカルについて以下を実行:

1. YAML の `sources` に定義された各ソースの検索クエリで Web 検索を実行する
2. 各カテゴリ 3〜5 件の候補を収集する
3. 重複を除去する（同一ニュースが複数ソースで報じられている場合）

### Step 3: 候補リストの生成

収集した候補を以下のフォーマットで整理する:

```json
{
  "date": "YYYY-MM-DD",
  "candidates": [
    {
      "vertical": "zebra-bcorp",
      "title": "ニュースタイトル",
      "summary": "概要（2〜3文）",
      "source_name": "メディア名",
      "source_url": "URL",
      "published_date": "YYYY-MM-DD",
      "relevance_score": 85,
      "scoring_rationale": {
        "timeliness": 90,
        "reader_value": 80,
        "concept_alignment": 85,
        "uniqueness": 75
      }
    }
  ]
}
```

### Step 4: 候補の選定

各バーティカルの `daily_target` と `selection_weights` に基づいてスコアリングし、合計 5〜10 件を選定する。

**スコア計算**:
```
total_score = timeliness × weight_timeliness
            + reader_value × weight_reader_value
            + concept_alignment × weight_concept_alignment
            + uniqueness × weight_uniqueness
```

### Step 5: 選定結果の出力

選定されたニュースのリストを `generate-articles.md` ワークフローに渡す。

## 注意事項

- 著作権に配慮し、記事本文の引用は最小限にすること
- 日本語圏と海外の両方のソースをバランスよく含めること
- ソースURLが有効であることを確認すること
- 同日に同じトピックを複数バーティカルから取り上げないこと
