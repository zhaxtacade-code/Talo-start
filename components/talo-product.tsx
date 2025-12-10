import { Card, CardContent } from "@/components/ui/card"

export function TaloProduct() {
  return (
    <section className="section-padding-y container-padding-x bg-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-blue-600 mb-4">Our Product</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            Talo Star 5L Pure Mineral Water is designed for daily hydration with balanced minerals and exceptional
            purity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="flex justify-center order-2 md:order-1">
            <Card className="w-full max-w-xs bg-blue-600 border-0 text-white">
              <CardContent className="pt-8 text-center space-y-6">
                <div className="text-6xl">🫗</div>
                <h3 className="text-3xl font-bold">5 Litres</h3>
                <p className="text-blue-100">Pure Mineral Water</p>
                <div className="space-y-2 text-sm pt-4 border-t border-blue-500">
                  <p>
                    <span className="font-semibold">MFG:</span> Dec 2025
                  </p>
                  <p>
                    <span className="font-semibold">EXP:</span> Dec 2027
                  </p>
                  <p className="text-xs text-blue-100">⚠️ Do not accept if seal is broken</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6 order-1 md:order-2">
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Ideal For:</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Homes and daily hydration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Offices and workplaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Events and gatherings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Travel and on-the-go</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h4 className="font-bold text-amber-900 mb-2">Quality Assurance</h4>
              <p className="text-amber-800 text-sm">
                Every bottle is carefully purified, balanced with essential minerals, and sealed to ensure maximum
                freshness and safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
