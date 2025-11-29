-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for slug
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);

-- Create index for status
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);

-- Create index for published_at
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published news
CREATE POLICY "Anyone can read published news"
  ON news
  FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can manage news (for admin)
CREATE POLICY "Authenticated users can manage news"
  ON news
  FOR ALL
  USING (auth.role() = 'authenticated');
