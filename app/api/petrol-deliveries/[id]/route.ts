import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  const ok = await verifyAdmin(req)
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Handle params as Promise (Next.js 15+) or object (Next.js 14)
  const resolvedParams = params instanceof Promise ? await params : params
  const { id } = resolvedParams
  
  if (!id || id === "undefined") {
    return NextResponse.json({ error: "ID is required and cannot be undefined" }, { status: 400 })
  }
  
  // Validate that ID is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: `Invalid UUID format: ${id}. Cannot update record with non-UUID ID.` }, { status: 400 })
  }

  const body = await req.json()
  const { state, name, barrels, pricePerBarrel, date } = body

  const updatePayload: Record<string, unknown> = {}
  if (state) updatePayload.state = state
  if (name) updatePayload.name = name
  if (barrels !== undefined) updatePayload.barrels = Number.parseFloat(barrels)
  if (pricePerBarrel !== undefined) updatePayload.pricePerBarrel = Number.parseFloat(pricePerBarrel)
  if (date) updatePayload.date = date

  const { data, error } = await supabaseAdmin.from("petrol_deliveries").update(updatePayload).eq("id", id).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  const ok = await verifyAdmin(req)
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Handle params as Promise (Next.js 15+) or object (Next.js 14)
  const resolvedParams = params instanceof Promise ? await params : params
  const { id } = resolvedParams
  
  if (!id || id === "undefined") {
    return NextResponse.json({ error: "ID is required and cannot be undefined" }, { status: 400 })
  }
  const { error } = await supabaseAdmin.from("petrol_deliveries").delete().eq("id", id)
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

