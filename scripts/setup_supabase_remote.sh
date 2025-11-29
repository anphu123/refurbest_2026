#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/setup_supabase_remote.sh hnbigvumieyawanbzhdo
# Requires: Supabase CLI installed and you are logged in (supabase login) with the target account.
# Notes:
# - This script links the project, then executes all SQL files in supabase/ in order.
# - It supports both `supabase db execute` (new) and `supabase db query` (older) commands.

PROJECT_REF=${1:-}
if [[ -z "$PROJECT_REF" ]]; then
  echo "❌ Missing project ref. Example: ./scripts/setup_supabase_remote.sh hnbigvumieyawanbzhdo"
  exit 1
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "❌ Supabase CLI not found. Install: https://supabase.com/docs/reference/cli/installing"
  exit 1
fi

echo "🔐 Ensure you are logged in with the correct account (e.g. trdo1309@gmail.com)"
read -r -p "Press Enter to continue (or Ctrl+C to abort)..." _

# Link the project
supabase link --project-ref "$PROJECT_REF"

echo "📦 Executing SQL files to create schema + seed data..."
SQL_FILES=(
  "supabase/00_schema.sql"
  "supabase/01_chat_setup.sql"
  "supabase/02_questions_setup.sql"
  "supabase/03_admin_setup.sql"
  "supabase/03_admin_setup_orders_update.sql"
  "supabase/04_seed_data.sql"
  "supabase/05_ai_chatbot_setup.sql"
)

# Detect which command is available: db execute or db query
CMD=""
if supabase db --help | grep -q "execute"; then
  CMD="execute"
elif supabase db --help | grep -q "query"; then
  CMD="query"
else
  echo "❌ Neither 'supabase db execute' nor 'supabase db query' found in your CLI. Please update: supabase update"
  exit 1
fi

for f in "${SQL_FILES[@]}"; do
  if [[ -f "$f" ]]; then
    echo "➡️  Running: $f"
    if [[ "$CMD" == "execute" ]]; then
      supabase db execute --project-ref "$PROJECT_REF" --file "$f"
    else
      supabase db query --project-ref "$PROJECT_REF" --file "$f"
    fi
  else
    echo "⚠️  Skip missing file: $f"
  fi
done

echo "✅ Done. Your remote Supabase project ($PROJECT_REF) now has all tables, RLS policies and seed data."

echo "ℹ️ Next steps:"
echo "  1) Put your credentials into .env.local (already prepared in code)."
echo "  2) Restart 'npm run dev' and test the site."
echo "  3) If you need an admin account email, update SQL/email in repo and create that user in Auth."

