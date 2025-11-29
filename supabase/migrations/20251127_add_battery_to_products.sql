-- Add battery_health column to product_variants table
ALTER TABLE product_variants 
ADD COLUMN IF NOT EXISTS battery_health INTEGER;

-- Add comment to explain the column
COMMENT ON COLUMN product_variants.battery_health IS 'Battery health percentage (0-100). Typically 80-100% for refurbished devices. A+ grade usually 87%+';

-- Create index for filtering by battery health
CREATE INDEX IF NOT EXISTS idx_product_variants_battery_health ON product_variants(battery_health);
