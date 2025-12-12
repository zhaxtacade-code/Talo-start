"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Order = {
  id: string
  product: string
  quantity: string | number
  pricePerUnit: string | number
  deliveryDate: string
  notes?: string
}

export function WaterOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [pricePerUnit, setPricePerUnit] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [notes, setNotes] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const persistLocal = (data: Order[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem("water_orders", JSON.stringify(data))
  }

  const loadLocal = (): Order[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("water_orders")
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  // Load from API
  useEffect(() => {
    const adminFlag = typeof window !== "undefined" ? sessionStorage.getItem("admin_mode_water") === "true" : false
    setIsAdmin(adminFlag)
    setIsHydrated(true)
    void fetchOrders()
  }, [])

  const adminHeaders = useMemo(() => {
    if (typeof window === "undefined") return {}
    const u = sessionStorage.getItem("admin_username") || ""
    const p = sessionStorage.getItem("admin_password") || ""
    return u && p ? { "x-admin-username": u, "x-admin-password": p } : {}
  }, [isAdmin])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/water-orders")
      if (!res.ok) throw new Error("api")
      const data: Order[] = await res.json()
      setOrders(data)
      persistLocal(data)
    } catch {
      setOrders(loadLocal())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return
    if (!product || !pricePerUnit) return

    const payload = { product, quantity, pricePerUnit, deliveryDate, notes }
    const res = await fetch("/api/water-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...adminHeaders,
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      await fetchOrders()
    } else {
      const newOrder: Order = {
        id: Date.now().toString(),
        product,
        quantity,
        pricePerUnit,
        deliveryDate,
        notes,
      }
      const next = [...orders, newOrder]
      setOrders(next)
      persistLocal(next)
    }

    setProduct("")
    setQuantity("")
    setPricePerUnit("")
    setDeliveryDate("")
    setNotes("")
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) return
    const res = await fetch(`/api/water-orders/${id}`, {
      method: "DELETE",
      headers: {
        ...adminHeaders,
      },
    })
    if (res.ok) {
      await fetchOrders()
    } else {
      const next = orders.filter((o) => o.id !== id)
      setOrders(next)
      persistLocal(next)
    }
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "water-orders.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        if (!Array.isArray(parsed)) throw new Error("Invalid")
        const normalized = parsed.map((o: any): Order => ({
          id: o.id || Date.now().toString(),
          product: o.product || "",
          quantity: o.quantity ?? "",
          pricePerUnit: o.pricePerUnit ?? 0,
          deliveryDate: o.deliveryDate || "",
          notes: o.notes || "",
        }))
        setOrders(normalized)
        persistLocal(normalized)
        alert("Import succeeded")
      } catch {
        alert("Import failed: invalid file")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  const parseNumber = (value: string | number): number => {
    if (typeof value === "number") return value
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  const totalQuantity = useMemo(() => {
    return orders.reduce((sum, o) => sum + parseNumber(o.quantity), 0)
  }, [orders])

  const lineTotal = (o: Order) => {
    const qty = parseNumber(o.quantity)
    const unit = parseNumber(o.pricePerUnit)
    return (qty > 0 ? qty * unit : unit)
  }

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + lineTotal(o), 0)
  }, [orders])

  if (!isHydrated) {
    return (
      <section id="water-order" className="section-padding-y bg-background">
        <div className="max-w-7xl mx-auto container-padding-x">
          <p className="text-foreground/60">Loading orders...</p>
        </div>
      </section>
    )
  }

  // Hide the entire orders section unless admin session is active
  if (!isAdmin) {
    return null
  }

  return (
    <section id="water-order" className="section-padding-y bg-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="space-y-1 mb-6">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide">Warshada Qeybta Beeca</p>
              <h2 className="heading-md text-primary">Waxii Baxay</h2>
              <p className="text-foreground/70 text-sm">Geli badeecada, tirada, qiimaha iyo taariikhda dirista.</p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
                >
                  Export JSON
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
                >
                  Import JSON
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Magaca sheeyga baxay</label>
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. 5L Bottle, 19L Dispenser"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Imisa xabo (optional)</label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Tusaale: 10 xabo ama ka tag bannaan"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Qiimaha</label>
                  <input
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                      placeholder="Tusaale: 2.50"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Delivery Date (optional)</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Notes (optional)</label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus-border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Diiwaangeli
              </button>
            </form>
          </div>

          {/* Orders list */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-accent uppercase tracking-wide">Records</p>
                <h3 className="text-2xl font-bold text-primary">Your Orders</h3>
              </div>
              <div className="text-right space-y-1">
                <div>
                  <p className="text-xs text-foreground/60">Total Quantity</p>
                  <p className="text-2xl font-bold text-accent">{isAdmin ? totalQuantity : "--"}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    {isAdmin
                      ? `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "--"}
                  </p>
                </div>
              </div>
            </div>

            {orders.length === 0 ? (
              <p className="text-foreground/50 text-center py-10">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Magaca sheeyga baxay</th>
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Imisa xabo</th>
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Qiimaha</th>
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Total</th>
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Delivery</th>
                      <th className="py-3 px-4 text-sm font-medium text-slate-700">Notes</th>
                      {isAdmin && <th className="py-3 px-4 text-sm font-medium text-slate-700">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-900 font-medium">{order.product}</td>
                        <td className="py-3 px-4 text-slate-900">{order.quantity}</td>
                        <td className="py-3 px-4 text-slate-900">
                          ${parseNumber(order.pricePerUnit).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-bold text-green-600">
                          {lineTotal(order).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-3 px-4 text-slate-900">
                          {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="py-3 px-4 text-slate-900">{order.notes || "-"}</td>
                        {isAdmin && (
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

