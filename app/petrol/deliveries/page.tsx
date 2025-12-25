"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

interface Delivery {
  id: string
  state: string
  name: string
  barrels: string | number
  pricePerBarrel: number
  date: string
}

const STATES = ["Diinsoor", "Misire", "Yaaqbaraawe", "Raaxoole", "Cadadgarye", "Gurbaan", "Kanaana"]
const FUEL_TYPES = ["Banziin", "Nafto"]

// Format number with thousand separators
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Safely parse barrels to number for calculations
const parseBarrels = (barrels: string | number): number => {
  if (typeof barrels === "number") return barrels
  const parsed = Number.parseFloat(barrels)
  return isNaN(parsed) ? 0 : parsed
}

export default function DeliversPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [state, setState] = useState("")
  const [name, setName] = useState("")
  const [barrels, setBarrels] = useState("")
  const [pricePerBarrel, setPricePerBarrel] = useState("")
  const [date, setDate] = useState("")

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const persistLocal = (data: Delivery[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem("petrol_deliveries", JSON.stringify(data))
  }

  const loadLocal = (): Delivery[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("petrol_deliveries")
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  // Load deliveries from API (fallback to local)
  useEffect(() => {
    const adminFlag = typeof window !== "undefined" && localStorage.getItem("admin_mode") === "true"
    setIsAdmin(adminFlag)
    setIsHydrated(true)
    void fetchDeliveries()

    // Auto-refresh every 5 seconds to sync with other admins
    const interval = setInterval(() => {
      void fetchDeliveries()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const adminHeaders = useMemo((): Record<string, string> => {
    if (typeof window === "undefined") return {}
    const u = sessionStorage.getItem("admin_username") || ""
    const p = sessionStorage.getItem("admin_password") || ""
    return u && p ? { "x-admin-username": u, "x-admin-password": p } : {}
  }, [isAdmin])

  const fetchDeliveries = async () => {
    try {
      const res = await fetch("/api/petrol-deliveries")
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("API Error:", res.status, errorData)
        // If Supabase is not configured, show empty array (don't use localStorage)
        if (res.status === 503) {
          console.warn("Supabase not configured - data will not sync across devices")
          setDeliveries([])
          return
        }
        // For other errors, try localStorage as last resort
        const local = loadLocal()
        setDeliveries(local)
        return
      }
      const data: Delivery[] = await res.json()
      console.log("✅ Fetched deliveries from Supabase:", data.length)
      // Always use Supabase data when available - this ensures sync across devices
      setDeliveries(data)
      persistLocal(data) // Update localStorage with Supabase data
    } catch (err) {
      console.error("Error fetching deliveries:", err)
      // Only use localStorage if network completely fails
      const local = loadLocal()
      setDeliveries(local)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return
    if (!state || !name || !barrels || !pricePerBarrel || !date) return

    const payload = { state, name, barrels, pricePerBarrel, date }
    const res = await fetch(editingId ? `/api/petrol-deliveries/${editingId}` : "/api/petrol-deliveries", {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        ...adminHeaders,
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      console.log("✅ Delivery saved to Supabase successfully")
      await fetchDeliveries()
    } else {
      const errorData = await res.json().catch(() => ({}))
      console.error("❌ Failed to save to Supabase:", errorData)
      alert(`Failed to save to database: ${errorData.error || "Unknown error"}. Data will not sync across devices.`)
      // Only save to localStorage as last resort
      const newDelivery: Delivery = {
        id: editingId || Date.now().toString(),
        state,
        name,
        barrels,
        pricePerBarrel: Number.parseFloat(pricePerBarrel),
        date,
      }
      const next = editingId
        ? deliveries.map((d) => (d.id === editingId ? newDelivery : d))
        : [...deliveries, newDelivery]
      setDeliveries(next)
      persistLocal(next)
    }

    setEditingId(null)
    setState("")
    setName("")
    setBarrels("")
    setPricePerBarrel("")
    setDate("")
  }

  const handleEdit = (id: string) => {
    const delivery = deliveries.find((d) => d.id === id)
    if (delivery) {
      setEditingId(id)
      setState(delivery.state)
      setName(delivery.name)
      setBarrels(typeof delivery.barrels === "number" ? delivery.barrels.toString() : delivery.barrels)
      setPricePerBarrel(delivery.pricePerBarrel.toString())
      setDate(delivery.date)
      // Scroll to form
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setState("")
    setName("")
    setBarrels("")
    setPricePerBarrel("")
    setDate("")
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) return
    if (!confirm("Ma hubtaa inaad tirtirto diiwaankan?")) return

    const res = await fetch(`/api/petrol-deliveries/${id}`, {
      method: "DELETE",
      headers: {
        ...adminHeaders,
      },
    })
    if (res.ok) {
      await fetchDeliveries()
    } else {
      const next = deliveries.filter((d) => d.id !== id)
      setDeliveries(next)
      persistLocal(next)
    }
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(deliveries, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "petrol-deliveries.json"
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
        if (!Array.isArray(parsed)) throw new Error("Invalid file")
        const normalized = parsed.map((item: any): Delivery => ({
          id: item.id || Date.now().toString(),
          state: item.state || "",
          name: item.name || "",
          barrels: item.barrels ?? "",
          pricePerBarrel: Number.parseFloat(item.pricePerBarrel ?? "0"),
          date: item.date || new Date().toISOString(),
        }))
        setDeliveries(normalized)
        persistLocal(normalized)
        alert("Import succeeded")
      } catch (err) {
        alert("Import failed: invalid file")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  const deliveriesByState = STATES.map((stateName) => {
    const records = deliveries.filter((d) => d.state === stateName)
    const totalBarrels = records.reduce((sum, d) => sum + parseBarrels(d.barrels), 0)
    const totalMoney = records.reduce((sum, d) => sum + (parseBarrels(d.barrels) * d.pricePerBarrel || 0), 0)
    return {
      state: stateName,
      records,
      totalBarrels,
      totalMoney: totalMoney && !isNaN(totalMoney) ? totalMoney : 0,
    }
  }).sort((a, b) => {
    // States with records come first, then states without records
    if (a.records.length > 0 && b.records.length === 0) return -1
    if (a.records.length === 0 && b.records.length > 0) return 1
    return 0
  })

  const grandTotalBarrels = deliveries.reduce((sum, d) => sum + parseBarrels(d.barrels), 0)
  const grandTotalMoney = deliveries.reduce((sum, d) => sum + (parseBarrels(d.barrels) * d.pricePerBarrel || 0), 0)

  if (!isHydrated) {
    return (
      <main>
        <Header />
        <div className="max-w-7xl mx-auto container-padding-x py-16">
          <p className="text-slate-600">Waa la soo gelinayaa...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Header />

      <div className="max-w-7xl mx-auto container-padding-x py-16">
        {/* Back Navigation */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/petrol">
            <Button variant="ghost" className="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Ku Noqo Petrol
            </Button>
          </Link>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              Export JSON
            </Button>
            <Button onClick={handleImport}>Import JSON</Button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
          </div>
        </div>

        {/* Form Section (admin only) */}
        {isAdmin ? (
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Diiwaan Gelinta Inta Baxday</h1>
            <p className="text-slate-600 mb-8">Diiwaan gali inta fuusto baxday, mesha loo diray, waqtiga ay baxday, iyo qiimaha</p>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-8 max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dooro Gobol</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Dooro gobol...</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nooca</label>
                  <select
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Dooro nooca...</option>
                    {FUEL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tirada Fuustooyinka</label>
                  <input
                    type="text"
                    value={barrels}
                    onChange={(e) => setBarrels(e.target.value)}
                    placeholder="Geli tirada fuustooyinka ama qoraal"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Qiimaha Fuusto Kasta</label>
                  <input
                    type="number"
                    value={pricePerBarrel}
                    onChange={(e) => setPricePerBarrel(e.target.value)}
                    placeholder="Geli qiimaha fuusto kasta"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Taariikhda Gaadhista</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    {editingId ? "Cusbooneysii" : "Ku Dar Gaadhista"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-lg transition-colors"
                    >
                      Jooji
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : null}

        {/* Grand Totals */}
        {deliveries.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Wadarta Guud</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600 mb-1">Wadarta Fuustooyinka</p>
                <p className="text-3xl font-bold text-blue-600">{grandTotalBarrels}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Wadarta Dakhliga</p>
                <p className="text-3xl font-bold text-green-600">
                  ${formatNumber(grandTotalMoney && !isNaN(grandTotalMoney) ? grandTotalMoney : 0)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Records by State */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-900">Diiwaanka Gaadhista ee Gobolka</h2>

          <div className="grid grid-cols-1 gap-8">
            {deliveriesByState.map(({ state, records, totalBarrels, totalMoney }) => (
              <div key={state} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{state}</h3>
                  <div className="text-right space-y-1">
                    <div>
                      <p className="text-xs text-slate-600">Wadarta Fuustooyinka</p>
                      <p className="text-xl font-bold text-blue-600">{totalBarrels}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Wadarta Dakhliga</p>
                      <p className="text-xl font-bold text-green-600">
                        ${formatNumber(totalMoney && !isNaN(totalMoney) ? totalMoney : 0)}
                      </p>
                    </div>
                  </div>
                </div>

                {records.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Wali ma jiro gaadhista</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                    <tr className="border-b border-slate-200">
                      {isAdmin && <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Ficil</th>}
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Taariikh</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Nooca</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Fuusto</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Qiimaha/Fuusto</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Wadarta</th>
                    </tr>
                      </thead>
                      <tbody>
                        {records.map((record) => (
                          <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                        {isAdmin && (
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleEdit(record.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              Wax ka beddel
                            </button>
                          </td>
                        )}
                            <td className="py-3 px-4 text-slate-900">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-slate-900 font-medium">{record.name || "-"}</td>
                            <td className="py-3 px-4 text-slate-900 font-medium">{record.barrels}</td>
                            <td className="py-3 px-4 text-slate-900">${formatNumber(record.pricePerBarrel)}</td>
                            <td className="py-3 px-4 text-slate-900 font-bold text-green-600">
                              ${formatNumber(parseBarrels(record.barrels) * record.pricePerBarrel)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
