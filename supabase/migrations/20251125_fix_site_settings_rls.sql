-- =====================================================
-- FIX SITE SETTINGS RLS POLICIES
-- =====================================================

-- Create is_admin function if not exists
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user email is admin email
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id 
    AND email = 'admin@refurbest.vn'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admin can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admin can insert site_settings" ON site_settings;

-- Everyone can view settings
CREATE POLICY "Anyone can view site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Only admin can update settings
CREATE POLICY "Admin can update site_settings"
  ON site_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Only admin can insert settings
CREATE POLICY "Admin can insert site_settings"
  ON site_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));
