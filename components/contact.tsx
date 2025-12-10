export function Contact() {
  return (
    <section id="contact" className="section-padding-y bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto container-padding-x">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="heading-md">Get In Touch</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Have questions or ready to order? Contact our team in Somalia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">Phone Numbers</h3>
              <div className="space-y-3">
                <p className="text-xl font-semibold">+252 612325984</p>
                <p className="text-xl font-semibold">+252 612325985</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">Alternative Lines</h3>
              <div className="space-y-3">
                <p className="text-xl font-semibold">+252 622325984</p>
                <p className="text-xl font-semibold">+252 622325985</p>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-primary-foreground/20 pt-8">
            <p className="text-sm text-primary-foreground/90">Based in Diinsoor, Somalia</p>
          </div>
        </div>
      </div>
    </section>
  )
}
