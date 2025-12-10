"use client"

export function HomeHero() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto container-padding-x text-center space-y-6">
        <h1 className="heading-xl text-white">
          Welcome to <span className="text-amber-500">TALO STAR</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Delivering excellence through two powerful divisions: Premium Petrol and Pure Mineral Water from the heart of
          Somalia.
        </p>
        <p className="text-lg text-gray-300">Trusted quality. Global reach. Local roots.</p>
      </div>
    </section>
  )
}
