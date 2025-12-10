import { Button } from "@/components/ui/button"

export function TaloHero() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 overflow-hidden flex items-center justify-center px-4">
      {/* Background water wave effect */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1200 120" className="absolute bottom-0 w-full h-32" preserveAspectRatio="none">
          <path d="M0,40 Q300,10 600,40 T1200,40 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)" />
          <path d="M0,50 Q300,20 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">✦</span>
            </div>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Talo Star</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">Pure Mineral Water</p>
          <p className="text-base md:text-lg text-white/80">
            Clean, healthy, and refreshing water for every Somali home
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8 rounded-full shadow-lg"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  )
}
