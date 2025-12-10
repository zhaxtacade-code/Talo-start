export function PetrolFeatures() {
  return (
    <section className="section-padding-y bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-md text-primary">Why Choose Talo Star Petrol</h2>
            <p className="text-lg text-foreground/70">Industry-leading standards and service</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl text-primary font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Advanced Additives</h3>
                  <p className="text-foreground/60">
                    Proprietary blend of detergents and performance enhancers for optimal engine health
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl text-primary font-bold">◆</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Quality Assurance</h3>
                  <p className="text-foreground/60">
                    Every batch tested against international standards for consistency and purity
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl text-primary font-bold">⚡</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Enhanced Performance</h3>
                  <p className="text-foreground/60">
                    Improved fuel efficiency and engine response with reduced emissions
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img src="/fuel-quality-testing-laboratory-scientist.jpg" alt="Quality Testing" className="rounded-lg shadow-lg" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-foreground/60">Stations Nationwide</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <p className="text-foreground/60">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-foreground/60">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
