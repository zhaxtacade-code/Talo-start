-- Supabase Database Setup Script
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Create water_orders table
-- Note: Column names use camelCase (quoted) to match the API payload structure
-- created_at uses snake_case (unquoted) as used in the API queries
CREATE TABLE IF NOT EXISTS water_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product TEXT NOT NULL,
  quantity TEXT,
  "pricePerUnit" DECIMAL(10, 2) NOT NULL,
  "deliveryDate" TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create petrol_deliveries table
-- Note: Column names use camelCase (quoted) to match the API payload structure
-- created_at uses snake_case (unquoted) as used in the API queries
CREATE TABLE IF NOT EXISTS petrol_deliveries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state TEXT NOT NULL,
  name TEXT NOT NULL,
  barrels DECIMAL(10, 2) NOT NULL,
  "pricePerBarrel" DECIMAL(10, 2) NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE water_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE petrol_deliveries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role to access all data
-- Since we're using service role key, these policies allow full access
CREATE POLICY "Allow service role full access to water_orders"
  ON water_orders
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to petrol_deliveries"
  ON petrol_deliveries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_water_orders_created_at ON water_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_petrol_deliveries_created_at ON petrol_deliveries(created_at);
CREATE INDEX IF NOT EXISTS idx_petrol_deliveries_state ON petrol_deliveries(state);

