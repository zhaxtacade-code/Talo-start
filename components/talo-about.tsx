export function TaloAbout() {
  return (
    <section className="section-padding-y container-padding-x mx-auto max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Side */}
        <div className="flex justify-center">
          <div className="w-64 h-80 bg-gradient-to-b from-blue-400 to-blue-300 rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">💧</div>
              <p className="text-sm font-semibold">5 Litres</p>
              <p className="text-xs mt-2">Pure Mineral Water</p>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-6">
          <div>
            <h2 className="heading-lg text-blue-600 mb-4">About Talo Star</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Talo Star is a premium pure mineral water brand based in Diinsoor, Somalia. We are dedicated to providing
              clean, safe, and refreshing drinking water using modern purification standards.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Every drop is filtered and balanced with essential minerals to support your health and well-being.
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">Our Mission</h3>
            <p className="text-blue-800">
              Deliver pure, trusted water for families, businesses, and communities across Somalia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
