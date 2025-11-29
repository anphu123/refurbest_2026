-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'Refurbest',
  site_description TEXT DEFAULT 'Thiết bị Refurbish chính hãng, giá tốt',
  email TEXT DEFAULT 'info@refurbest.vn',
  phone TEXT DEFAULT '1800 2097',
  address TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  zalo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings (only one row)
INSERT INTO site_settings (id, site_name, site_description, email, phone, address)
VALUES (
  '00000000-0000-0000-0000-000000000001', 
  'Refurbest', 
  'Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng', 
  'baohanh@refurbest.vn', 
  '0288 993 889',
  '350-352 Võ Văn Kiệt, Quận 1, TP. Hồ Chí Minh'
)
ON CONFLICT (id) DO NOTHING;

-- Update trigger
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();

-- RLS Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can view settings
CREATE POLICY "Anyone can view site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Only admin can update settings
CREATE POLICY "Admin can update site_settings"
  ON site_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
