-- Add missing columns to news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE news ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE news ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE news ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE news ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE news ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add check constraint for status if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'news_status_check'
  ) THEN
    ALTER TABLE news ADD CONSTRAINT news_status_check CHECK (status IN ('draft', 'published', 'archived'));
  END IF;
END $$;

-- Create indexes if not exist
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);
