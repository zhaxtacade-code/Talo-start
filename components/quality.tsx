export function Quality() {
  return (
    <section id="quality" className="section-padding-y bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-md text-primary">Guaranteed Purity</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Every bottle undergoes rigorous testing to ensure you receive the purest, safest water available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <img
                src="/water-purification-process-testing-laboratory.jpg"
                alt="Water Purification Process"
                className="w-full rounded-lg shadow-lg"
              />
              <h3 className="text-xl font-semibold text-primary">Advanced Purification</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-medium text-foreground">Multi-Stage Filtration</p>
                    <p className="text-sm text-foreground/60">Removes impurities while preserving minerals</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-medium text-foreground">Laboratory Tested</p>
                    <p className="text-sm text-foreground/60">Every batch meets international standards</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <img src="/bottling-facility-quality-control-water-production.jpg" alt="Bottling Facility" className="w-full rounded-lg shadow-lg" />
              <h3 className="text-xl font-semibold text-primary">Quality Assurance</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-primary font-bold text-xl flex-shrink-0">◆</span>
                  <div>
                    <p className="font-medium text-foreground">Tamper-Proof Sealing</p>
                    <p className="text-sm text-foreground/60">Your assurance of safety and purity</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold text-xl flex-shrink-0">◆</span>
                  <div>
                    <p className="font-medium text-foreground">24-Month Shelf Life</p>
                    <p className="text-sm text-foreground/60">Maintains freshness and quality</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
