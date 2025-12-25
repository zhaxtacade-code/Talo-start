# Supabase Setup Guide

This guide will help you connect your application to Supabase for database storage.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Your project name (e.g., "mind-space-app")
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 3: Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** (gear icon) → **API**
2. You'll need two values:
   - **Project URL** (under "Project URL")
   - **Service Role Key** (under "Project API keys" → "service_role" key)
     - ⚠️ **Important**: This is a secret key - never expose it in client-side code!

## Step 4: Set Environment Variables

### For Local Development

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
SUPABASE_URL=your_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace `your_project_url_here` and `your_service_role_key_here` with the values from Step 3.

### For Production (Vercel/Netlify/etc.)

1. Go to your hosting platform's environment variables settings
2. Add the same two variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Step 5: Verify the Setup

1. Restart your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Test the connection:
   - Navigate to `/water/orders` or `/petrol/deliveries`
   - The pages should load without "Supabase not configured" errors
   - Try creating a new order/delivery (in admin mode) to verify writes work

## Troubleshooting

### "Supabase not configured" error
- Check that `.env.local` exists and has the correct variable names
- Make sure you restarted the dev server after adding environment variables
- Verify the values are correct (no extra spaces or quotes)

### Database errors
- Check that you ran the SQL script successfully
- Verify table names match: `water_orders` and `petrol_deliveries`
- Check that column names match (note: SQL uses snake_case, but the API converts them)

### Permission errors
- Make sure you're using the **Service Role Key**, not the anon key
- Check that RLS policies were created successfully

## Database Schema

### `water_orders` table
- `id` (UUID, primary key, auto-generated)
- `product` (TEXT, required)
- `quantity` (TEXT, optional)
- `pricePerUnit` (DECIMAL, required) - Note: camelCase to match API
- `deliveryDate` (TEXT, optional) - Note: camelCase to match API
- `notes` (TEXT, optional)
- `created_at` (TIMESTAMP, auto-generated)

### `petrol_deliveries` table
- `id` (UUID, primary key, auto-generated)
- `state` (TEXT, required)
- `name` (TEXT, required)
- `barrels` (DECIMAL, required)
- `pricePerBarrel` (DECIMAL, required) - Note: camelCase to match API
- `date` (TEXT, required)
- `created_at` (TIMESTAMP, auto-generated)

## Security Notes

- The Service Role Key bypasses Row Level Security (RLS) - keep it secret!
- Never commit `.env.local` to version control
- For production, use environment variables in your hosting platform
- Consider implementing additional authentication/authorization for admin operations

