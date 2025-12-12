import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  const ok = await verifyAdmin(req)
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = params
  const { error } = await supabaseAdmin.from("water_orders").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function verifyAdmin(req: Request) {
  const adminUser = process.env.ADMIN_USERNAME || "talostar"
  const adminPass = process.env.ADMIN_PASSWORD || "talo22##00"
  const u = req.headers.get("x-admin-username")
  const p = req.headers.get("x-admin-password")
  return u === adminUser && p === adminPass
}

