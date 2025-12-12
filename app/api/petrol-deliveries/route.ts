import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  const { data, error } = await supabaseAdmin.from("petrol_deliveries").select("*").order("created_at", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  const ok = await verifyAdmin(req)
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { state, name, barrels, pricePerBarrel, date } = body

  if (!state || !name || !barrels || !pricePerBarrel || !date) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const payload = {
    state,
    name,
    barrels: Number.parseFloat(barrels),
    pricePerBarrel: Number.parseFloat(pricePerBarrel),
    date,
  }

  const { data, error } = await supabaseAdmin.from("petrol_deliveries").insert(payload).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

async function verifyAdmin(req: Request) {
  const adminUser = process.env.ADMIN_USERNAME || "talostar"
  const adminPass = process.env.ADMIN_PASSWORD || "talo22##00"
  const u = req.headers.get("x-admin-username")
  const p = req.headers.get("x-admin-password")
  return u === adminUser && p === adminPass
}

