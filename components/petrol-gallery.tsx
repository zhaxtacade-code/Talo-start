export function PetrolGallery() {
  return (
    <section className="section-padding-y bg-background">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="heading-md text-primary">Our Petrol Stations & Infrastructure</h2>
            <p className="text-lg text-foreground/70">Modern facilities across the region</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/petrol-station-exterior-modern-design.jpg"
                alt="Station 1"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/fuel-pump-nozzles-close-up.jpg"
                alt="Fuel Pumps"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/petrol-station-night-lighting.jpg"
                alt="Station Night"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/electric-fuel-dispenser-digital-display.jpg"
                alt="Dispenser"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/petrol-station-convenience-store-interior.jpg"
                alt="Store"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/fuel-tanker-truck-delivery-service.jpg"
                alt="Tanker"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/petrol-station-customer-service-area.jpg"
                alt="Service"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
              <img
                src="/fuel-quality-testing-laboratory-equipment.jpg"
                alt="Quality"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
