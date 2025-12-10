export function CompanyInfo() {
  return (
    <section id="about" className="section-padding-y bg-muted/10">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="heading-md text-primary">About Talo Star</h2>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              We are a leading company based in Somalia, dedicated to providing premium products and services with
              uncompromising quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">🌍</span>
              </div>
              <h3 className="heading-sm text-primary mb-3">Global Reach</h3>
              <p className="text-foreground/70">
                Serving customers across multiple regions with consistent quality and reliable delivery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-accent">⭐</span>
              </div>
              <h3 className="heading-sm text-primary mb-3">Quality Assurance</h3>
              <p className="text-foreground/70">
                Every product undergoes rigorous testing to meet international standards and customer expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">✓</span>
              </div>
              <h3 className="heading-sm text-primary mb-3">Customer First</h3>
              <p className="text-foreground/70">
                Your satisfaction is our priority. We provide dedicated support and professional service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
