"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

  // Load deliveries from localStorage
  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("petrol_deliveries")
    const adminFlag = localStorage.getItem("admin_mode") === "true"
    setIsAdmin(adminFlag)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Handle backward compatibility - add name field if missing
      const deliveriesWithName = parsed.map((d: Delivery) => ({
        ...d,
        name: d.name || "",
      }))
      setDeliveries(deliveriesWithName)
    }
  }, [])

  const handleAdminLogin = () => {
    const key = window.prompt("Enter admin key")
    if (key && key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem("admin_mode", "true")
      setIsAdmin(true)
    } else {
      alert("Invalid key")
    }
  }

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_mode")
    setIsAdmin(false)
    setEditingId(null)
  }

  // Save deliveries to localStorage
  const saveDeliveries = (newDeliveries: Delivery[]) => {
    setDeliveries(newDeliveries)
    localStorage.setItem("petrol_deliveries", JSON.stringify(newDeliveries))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return
    if (!state || !name || !barrels || !pricePerBarrel || !date) return

    if (editingId) {
      // Update existing delivery
      const updatedDeliveries = deliveries.map((d) =>
        d.id === editingId
          ? {
              id: editingId,
              state,
              name,
              barrels: barrels,
              pricePerBarrel: Number.parseFloat(pricePerBarrel),
              date,
            }
          : d
      )
      saveDeliveries(updatedDeliveries)
      setEditingId(null)
    } else {
      // Create new delivery
      const newDelivery: Delivery = {
        id: Date.now().toString(),
        state,
        name,
        barrels: Number.parseInt(barrels),
        pricePerBarrel: Number.parseFloat(pricePerBarrel),
        date,
      }
      saveDeliveries([...deliveries, newDelivery])
    }

    // Reset form
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

  const handleDelete = (id: string) => {
    if (!isAdmin) return
    if (confirm("Ma hubtaa inaad tirtirto diiwaankan?")) {
      saveDeliveries(deliveries.filter((d) => d.id !== id))
    }
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
        {/* Back Navigation + Admin */}
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
            {!isAdmin ? (
              <Button variant="outline" onClick={handleAdminLogin}>
                Admin Login
              </Button>
            ) : (
              <div className="flex gap-3">
                <span className="text-sm text-slate-600 self-center">Admin mode</span>
                <Button variant="outline" onClick={handleAdminLogout}>
                  Logout
                </Button>
              </div>
            )}
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
        ) : (
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Diiwaan Gelinta Inta Baxday</h1>
            <p className="text-slate-600">Fadlan gal admin si aad u diiwaangeliso gaadhista.</p>
          </div>
        )}

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
