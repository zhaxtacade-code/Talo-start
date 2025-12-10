"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const isHome = pathname === "/"
  const isPetrol = pathname === "/petrol"
  const isWater = pathname === "/water"
  const isDeliveries = pathname === "/petrol/deliveries"

  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto container-padding-x py-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Talo Star"
              width={200}
              height={200}
              className="h-32 md:h-40 lg:h-48 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {isHome ? (
              <>
                <Link href="/petrol" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Petrol
                </Link>
                <Link href="/water" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Pure Mineral Water
                </Link>
                <button
                  onClick={() => scrollToSection("selector")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </>
            ) : isPetrol ? (
              <>
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/water" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Pure Water
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </>
            ) : isWater ? (
              <>
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link
                  href="/petrol"
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Petrol
                </Link>
                <button
                  onClick={() => scrollToSection("product")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Product
                </button>
                <button
                  onClick={() => scrollToSection("quality")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Quality
                </button>
                <button
                  onClick={() => scrollToSection("composition")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Composition
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </>
            ) : isDeliveries ? (
              <>
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/petrol" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Petrol
                </Link>
                <Link href="/water" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
                  Pure Water
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
