export function Minerals() {
  return (
    <section id="composition" className="section-padding-y bg-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-md text-primary">Essential Minerals Composition</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Each litre of Talo Star naturally contains these vital minerals essential for your body's optimal health
              and wellness.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Calcium", value: "15", benefit: "Bone Health" },
                { name: "Magnesium", value: "2", benefit: "Muscle Function" },
                { name: "Sodium", value: "15", benefit: "Hydration" },
                { name: "Potassium", value: "1.0", benefit: "Heart Health" },
                { name: "Nitrate", value: "0.1", benefit: "Circulation" },
                { name: "Bicarbonates", value: "7.0", benefit: "pH Balance" },
                { name: "Fluoride", value: "1.2", benefit: "Dental Health" },
                { name: "Chloride", value: "21", benefit: "Body Fluids" },
                { name: "Sulfate", value: "2", benefit: "Detoxification" },
                { name: "T.D.S", value: "40", benefit: "Total Purity" },
              ].map((mineral) => (
                <div
                  key={mineral.name}
                  className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-lg text-center hover:shadow-lg transition border border-primary/10"
                >
                  <p className="text-3xl font-bold text-primary mb-2">{mineral.value}</p>
                  <p className="text-sm font-semibold text-foreground mb-1">{mineral.name}</p>
                  <p className="text-xs text-accent font-medium">{mineral.benefit}</p>
                  <p className="text-xs text-foreground/50 mt-2">mg/L</p>
                </div>
              ))}
            </div>

            <img
              src="/mineral-water-health-benefits-infographic.jpg"
              alt="Mineral Water Health Benefits"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
