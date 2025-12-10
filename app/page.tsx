import { Header } from "@/components/header"
import { HomeHero } from "@/components/home-hero"
import { CompanyOverview } from "@/components/company-overview"
import { ProductSelector } from "@/components/product-selector"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <HomeHero />
      <CompanyOverview />
      <ProductSelector />
      <Contact />
      <Footer />
    </main>
  )
}
