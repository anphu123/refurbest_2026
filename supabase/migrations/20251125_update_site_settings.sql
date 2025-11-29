-- Update existing settings to new values
UPDATE site_settings 
SET 
  site_name = 'Refurbest',
  site_description = 'Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng',
  email = 'baohanh@refurbest.vn',
  phone = '0288 993 889',
  address = '350-352 Võ Văn Kiệt, Quận 1, TP. Hồ Chí Minh',
  updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001';
