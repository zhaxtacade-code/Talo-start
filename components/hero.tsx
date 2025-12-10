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
      sessionStorage.setItem("admin_mode_water", "true")
      router.push("/water/orders")
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
              <p className="text-sm font-semibold text-accent uppercase tracking-wide">Pure Mineral Water</p>
              <h1 className="heading-xl">
                <span className="text-primary">Crystal Pure</span>
                <br />
                <span className="text-accent">Mineral Water</span>
                <br />
                <span className="text-primary">From Somalia</span>
              </h1>
            </div>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
              Experience the pristine purity of water sourced from the heart of Diinsoor, Somalia. Every bottle contains
              nature's perfect balance of essential minerals for your wellness and vitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-accent text-white font-semibold rounded hover:bg-accent/90 transition">
                Learn More
              </button>
              <button
                onClick={handleProtectedNav}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition text-center"
              >
                Order Now
              </button>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-80 h-96 bg-gradient-to-br from-cyan-100 to-blue-50 rounded-3xl opacity-40 absolute blur-2xl" />
            <img
              src="/crystal-clear-pure-mineral-water-bottle-5-litre-pr.jpg"
              alt="Talo Star Pure Mineral Water Bottle"
              className="relative z-10 rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
