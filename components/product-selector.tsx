"use client"

import Link from "next/link"
import Image from "next/image"

export function ProductSelector() {
  return (
    <section id="selector" className="section-padding-y bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="heading-md text-primary">Explore Our Products</h2>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Each product line represents our commitment to excellence and quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pure Mineral Water Card */}
            <Link href="/water" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <Image
                  src="/crystal-clear-mineral-water-bottle.jpg"
                  alt="Pure Mineral Water"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="heading-sm text-white mb-2">Pure Mineral Water</h3>
                  <p className="text-gray-200 text-sm mb-4">Premium 5L bottles sourced from Diinsoor</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">✓</span>
                      <span>100% Pure & Naturally Filtered</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">✓</span>
                      <span>9 Essential Minerals</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">✓</span>
                      <span>Tamper-Proof Sealed</span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded transition duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            </Link>

            {/* Petrol Card */}
            <Link href="/petrol" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <Image
                  src="/modern-petrol-station-fuel-pump.jpg"
                  alt="Petrol"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="heading-sm text-white mb-2">Premium Petrol</h3>
                  <p className="text-gray-200 text-sm mb-4">Quality fuel for optimal performance</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">◆</span>
                      <span>High-Grade Fuel Quality</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">◆</span>
                      <span>Reliable Supply Chain</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <span className="text-amber-500">◆</span>
                      <span>Professional Service</span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded transition duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
