#!/bin/bash

# Script to run site settings migration
# This extends the site_settings table with homepage content fields

echo "🚀 Running site settings migration..."

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Run the migration
psql "$NEXT_PUBLIC_SUPABASE_URL" -f supabase/migrations/20251212_extend_site_settings.sql

if [ $? -eq 0 ]; then
  echo "✅ Migration completed successfully!"
  echo ""
  echo "📝 Next steps:"
  echo "1. Go to /admin/site-settings to edit homepage content"
  echo "2. Update hero text, stats, brand section, why choose us, and testimonials"
  echo "3. Changes will be reflected on the homepage immediately"
else
  echo "❌ Migration failed. Please check the error messages above."
  exit 1
fi
