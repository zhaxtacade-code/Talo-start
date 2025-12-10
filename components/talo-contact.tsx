import { Card, CardContent } from "@/components/ui/card"

export function TaloContact() {
  const contacts = ["0612325984", "0612325985", "0622325984", "0622325985"]

  return (
    <section className="section-padding-y container-padding-x bg-blue-600 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-blue-100 text-lg">For orders, delivery, or business partnerships, reach us anytime</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-blue-500 border-0 text-white">
            <CardContent className="pt-8">
              <h3 className="text-xl font-bold mb-4">Phone Numbers</h3>
              <div className="space-y-3">
                {contacts.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone}`}
                    className="block text-blue-100 hover:text-white transition-colors text-lg font-semibold"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500 border-0 text-white">
            <CardContent className="pt-8">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-blue-100 mb-2">
                <span className="font-semibold">Talo Star Headquarters</span>
              </p>
              <p className="text-blue-100">Diinsoor, Somalia</p>
              <p className="text-blue-100 mt-4 text-sm">
                Proudly serving clean, pure mineral water to families, businesses, and communities across the region.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
