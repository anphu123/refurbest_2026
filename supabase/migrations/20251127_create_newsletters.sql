-- Create newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_newsletters_email ON newsletters(email);
CREATE INDEX IF NOT EXISTS idx_newsletters_is_active ON newsletters(is_active);

-- Enable RLS
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletters FOR INSERT
  WITH CHECK (true);

-- Anyone can view (for checking if already subscribed)
CREATE POLICY "Anyone can view newsletters"
  ON newsletters FOR SELECT
  USING (true);

-- Only admin can update/delete
CREATE POLICY "Admin can update newsletters"
  ON newsletters FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete newsletters"
  ON newsletters FOR DELETE
  USING (public.is_admin(auth.uid()));
