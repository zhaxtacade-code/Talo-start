"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  const isWater = pathname === "/water"

  return (
    <footer className="bg-background border-t border-border" id="contact">
      <div className="max-w-7xl mx-auto container-padding-x py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-primary">Talo Star</h3>
            <p className="text-sm text-foreground/60">
              {isWater ? "Pure Mineral Water from Somalia" : "Premium Petrol & Water Products"}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-primary text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              {isWater && (
                <>
                  <li>
                    <Link href="/water#product" className="hover:text-accent transition">
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link href="/water#quality" className="hover:text-accent transition">
                      Quality
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/petrol" className="hover:text-accent transition">
                  Petrol
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-primary text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>+252 612325984</li>
              <li>Diinsoor, Somalia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-foreground/60">© 2025 Talo Star. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
