export function Product() {
  return (
    <section id="product" className="section-padding-y bg-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-md text-primary">Premium Water Experience</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Talo Star Pure Mineral Water is carefully sourced and bottled to preserve the highest standards of purity
              and natural mineral content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Source",
                description: "Pristine waters from Diinsoor, Somalia with natural mineral composition",
                image: "/natural-water-spring-source-diinsoor-somalia.jpg",
              },
              {
                title: "5 Litre Premium",
                description: "Perfect family size with tamper-proof sealing for your safety",
                image: "/5-litre-water-bottle-premium-packaging.jpg",
              },
              {
                title: "Mineral Rich",
                description: "Contains 9 essential minerals naturally present for optimal wellness",
                image: "/mineral-water-composition-crystal-clear.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-4 text-center group hover:shadow-lg transition rounded-lg p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
