export function ProductPetrol() {
  return (
    <section id="product" className="section-padding-y bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-md text-primary">Our Petrol Products</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Three premium grades designed for every vehicle and performance requirement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img src="/premium-fuel-grade-petrol-pump.jpg" alt="Regular Grade" className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">Regular Grade</h3>
                <p className="text-foreground/60">Reliable fuel for everyday vehicles with excellent value</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ 87 Octane Rating</li>
                  <li>✓ Detergents Included</li>
                  <li>✓ Standard Performance</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition border-2 border-accent">
              <img src="/premium-plus-fuel-grade-high-octane.jpg" alt="Plus Grade" className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-accent">Plus Grade</h3>
                <p className="text-foreground/60">Enhanced performance fuel for modern engines</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ 91 Octane Rating</li>
                  <li>✓ Advanced Additives</li>
                  <li>✓ Better Performance</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img src="/premium-ultra-fuel-high-performance-racing.jpg" alt="Ultra Grade" className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">Ultra Grade</h3>
                <p className="text-foreground/60">Top-tier fuel for high-performance vehicles</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ 95 Octane Rating</li>
                  <li>✓ Premium Additives</li>
                  <li>✓ Maximum Performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
