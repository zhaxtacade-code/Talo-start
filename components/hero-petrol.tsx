"use client"

import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()

  const handleProtectedNav = () => {
    const username = window.prompt("Username")
    const password = window.prompt("Password")
    const expectedUser = process.env.NEXT_PUBLIC_ADMIN_USER || "admin"
    const expectedPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin"

    if (username === expectedUser && password === expectedPass) {
      // Grant admin mode for deliveries
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_mode", "true")
      }
      router.push("/petrol/deliveries")
    } else {
      alert("Invalid credentials")
    }
  }
  return (
    <section className="section-padding-y bg-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Premium Energy</p>
              <h1 className="heading-xl">
                <span className="text-primary">Talo Star</span>
                <br />
                <span className="text-accent">Premium Petrol</span>
                <br />
                <span className="text-primary">Excellence in Every Drop</span>
              </h1>
            </div>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
              Delivering premium quality fuel with advanced additives and consistent performance for your vehicles and
              business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleProtectedNav}
                className="px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-primary/90 transition text-center"
              >
                View Deliveries
              </button>
              <button
                onClick={handleProtectedNav}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition text-center"
              >
                Order / Add Delivery
              </button>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center">
            <img src="/modern-petrol-pump-station-at-sunset.jpg" alt="Premium petrol pump" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
