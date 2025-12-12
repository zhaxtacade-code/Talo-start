import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let supabaseAdmin: SupabaseClient | null | undefined

export function getSupabaseAdmin(): SupabaseClient | null {
  if (supabaseAdmin !== undefined) return supabaseAdmin
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (supabaseUrl && supabaseServiceRoleKey) {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
  } else {
    supabaseAdmin = null
  }
  return supabaseAdmin
}

