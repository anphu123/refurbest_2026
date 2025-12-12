#!/bin/bash

echo "🚀 Site Settings Migration"
echo "=========================="
echo ""
echo "Để chạy migration, bạn có 2 cách:"
echo ""
echo "📌 CÁCH 1: Sử dụng Supabase Dashboard (Khuyến nghị)"
echo "1. Truy cập: https://supabase.com/dashboard"
echo "2. Chọn project của bạn"
echo "3. Vào SQL Editor (menu bên trái)"
echo "4. Tạo New Query"
echo "5. Copy toàn bộ nội dung file: supabase/migrations/20251212_extend_site_settings.sql"
echo "6. Paste vào SQL Editor và nhấn Run"
echo ""
echo "📌 CÁCH 2: Sử dụng Supabase CLI"
echo "1. Cài đặt Supabase CLI: npm install -g supabase"
echo "2. Login: supabase login"
echo "3. Link project: supabase link --project-ref hnbigvumieyawanbzhdo"
echo "4. Chạy migration: supabase db push"
echo ""
echo "📝 File migration: supabase/migrations/20251212_extend_site_settings.sql"
echo ""
read -p "Nhấn Enter để mở file migration trong editor..."

# Detect OS and open file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open supabase/migrations/20251212_extend_site_settings.sql
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open supabase/migrations/20251212_extend_site_settings.sql
else
    # Windows
    start supabase/migrations/20251212_extend_site_settings.sql
fi

echo ""
echo "✅ Sau khi chạy migration thành công:"
echo "   - Truy cập: /admin/site-settings"
echo "   - Chỉnh sửa nội dung trang chủ"
echo "   - Nhấn Lưu thay đổi"
echo ""
