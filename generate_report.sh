#!/bin/bash

# ==========================================
# 📝 DotChain 開発日報 自動生成スクリプト
# ==========================================

# 1. 今日の日付を取得 (例: 20251230)
TODAY=$(date +'%Y%m%d')

# 2. 保存先のフォルダとファイル名を決める
# 保存先: docs/作業レポート
OUTPUT_DIR="docs/作業レポート"
# ファイル名: 20251230_daily_report.md
OUTPUT_FILE="${OUTPUT_DIR}/${TODAY}_daily_report.md"

# 3. フォルダが存在しない場合は作成する（念のため）
mkdir -p "$OUTPUT_DIR"

# 4. レポートを作成して書き込む
echo "⏳ レポートを作成中..."

(
  echo "# 📅 開発ログレポート: $(date +'%Y-%m-%d')"
  echo "> 生成時刻: $(date +'%H:%M')"
  echo ""
  echo "## 📊 1. 本日のハイライト（概要）"
  echo "今日の作業全体のボリュームです。"
  # 今日の変更量（夜中0時から現在まで）
  git diff --shortstat "@{midnight}" HEAD | sed 's/^/ - /'
  echo ""
  echo "## 📝 2. 作業履歴リスト"
  echo "どのような意図で修正を行ったかの記録です。"
  # コミットの一覧（マージコミットを除く）
  git log --since="midnight" --no-merges --reverse --pretty=format:"### ⏰ %ad : %s%n- **ID**: \`%h\`%n- **Files**:" --date=format:'%H:%M' --name-only | sed '/^[^#]/s/^/- /'
  echo ""
  echo "## 🔍 3. 技術的詳細（コード差分）"
  echo "AI解析および詳細確認用の生データです。"
  echo "\`\`\`diff"
  # 具体的なコードの変更点
  git log -p --since="midnight" --reverse --pretty=format:"# --------------------------------------------------%n# Commit: %h - %s%n# --------------------------------------------------"
  echo "\`\`\`"
) > "$OUTPUT_FILE"

# 5. 完了メッセージを表示
echo "✅ 完了！レポートを保存しました:"
echo "👉 $OUTPUT_FILE"
