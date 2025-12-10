import { Card, CardContent } from "@/components/ui/card"

export function TaloMinerals() {
  const minerals = [
    { name: "Calcium", value: "15 mg/L" },
    { name: "Magnesium", value: "2 mg/L" },
    { name: "Sodium", value: "15 mg/L" },
    { name: "Potassium", value: "1.0 mg/L" },
    { name: "Nitrate", value: "0.1 mg/L" },
    { name: "Bicarbonates", value: "7.0 mg/L" },
    { name: "Fluoride", value: "1.2 mg/L" },
    { name: "Chloride", value: "21 mg/L" },
    { name: "Sulphate", value: "2 mg/L" },
    { name: "T.D.S", value: "40 mg/L" },
    { name: "pH Level", value: "7" },
  ]

  return (
    <section className="section-padding-y container-padding-x mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="heading-lg text-blue-600 mb-4">Mineral Composition</h2>
        <p className="text-foreground max-w-2xl mx-auto">
          Balanced minerals per litre for optimal health and hydration
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {minerals.map((mineral) => (
          <Card key={mineral.name} className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-900">{mineral.name}</h3>
                <span className="text-blue-600 font-bold">{mineral.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Why These Minerals Matter</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">Bone Health</p>
            <p className="text-sm text-foreground">Calcium and magnesium support strong bones and teeth</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">Electrolyte Balance</p>
            <p className="text-sm text-foreground">Sodium and potassium maintain proper hydration levels</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">Dental Health</p>
            <p className="text-sm text-foreground">Fluoride protects tooth enamel naturally</p>
          </div>
        </div>
      </div>
    </section>
  )
}
