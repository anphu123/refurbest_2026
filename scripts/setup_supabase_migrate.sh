#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/setup_supabase_migrate.sh hnbigvumieyawanbzhdo
# This script concatenates all SQL in supabase/*.sql into a migration
# and pushes it to the linked remote project using Supabase CLI >= 2.56.

PROJECT_REF=${1:-}
if [[ -z "$PROJECT_REF" ]]; then
  echo "❌ Missing project ref. Example: ./scripts/setup_supabase_migrate.sh hnbigvumieyawanbzhdo"
  exit 1
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "❌ Supabase CLI not found. Install: https://supabase.com/docs/reference/cli/installing"
  exit 1
fi

# Ensure link
supabase link --project-ref "$PROJECT_REF"

# Prepare migrations directory
mkdir -p supabase/migrations
MIG_NAME="$(date +%Y%m%d%H%M%S)_init_phone.sql"
MIG_PATH="supabase/migrations/${MIG_NAME}"

# Build migration by concatenating existing SQL files
SQL_FILES=(
  "supabase/00_schema.sql"
  "supabase/01_chat_setup.sql"
  "supabase/02_questions_setup.sql"
  "supabase/03_admin_setup.sql"
  "supabase/03_admin_setup_orders_update.sql"
  "supabase/04_seed_data.sql"
  "supabase/05_ai_chatbot_setup.sql"
)

: > "$MIG_PATH"
for f in "${SQL_FILES[@]}"; do
  if [[ -f "$f" ]]; then
    printf "\n-- ===== BEGIN: %s =====\n\n" "$f" >> "$MIG_PATH"
    cat "$f" >> "$MIG_PATH"
    printf "\n-- ===== END: %s =====\n\n" "$f" >> "$MIG_PATH"
  else
    echo "⚠️  Skip missing file: $f"
  fi
done

echo "🚀 Pushing migration $MIG_NAME to remote project $PROJECT_REF..."
# Try multiple invocations for different CLI variants
if supabase db push --help 2>/dev/null | grep -qi "--linked"; then
  supabase db push --linked || true
fi
# Try with explicit project ref
supabase db push --yes || true
# Last attempt: plain push (if linked picks remote by default)
supabase db push --yes

echo "✅ Migration push attempted. If you see errors above, open Supabase Studio → SQL Editor and run files manually in order."

