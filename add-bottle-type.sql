-- Add bottleType column to water_orders table
-- Run this in Supabase SQL Editor

ALTER TABLE water_orders 
ADD COLUMN IF NOT EXISTS "bottleType" TEXT DEFAULT 'large';

-- Update existing records to be 'large' (20L bottles)
UPDATE water_orders 
SET "bottleType" = 'large' 
WHERE "bottleType" IS NULL;

-- Create index for better filtering performance
CREATE INDEX IF NOT EXISTS idx_water_orders_bottle_type ON water_orders("bottleType");
CREATE INDEX IF NOT EXISTS idx_water_orders_delivery_date ON water_orders("deliveryDate");

