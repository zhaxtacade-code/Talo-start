"use client"

export function CompanyOverview() {
  const features = [
    {
      title: "Premium Quality",
      description: "Rigorously tested products meeting international standards",
    },
    {
      title: "Global Reach",
      description: "Serving customers across multiple continents with consistent excellence",
    },
    {
      title: "Local Expertise",
      description: "Deep roots in Somalia with decades of industry experience",
    },
  ]

  return (
    <section className="section-padding-y bg-white">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="heading-lg text-primary">Why Choose TALO STAR</h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              We've built our reputation on integrity, quality, and customer satisfaction. Our diverse product portfolio
              ensures we meet your needs with excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 bg-muted/30"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <span className="text-amber-700 font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="heading-sm text-primary mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
