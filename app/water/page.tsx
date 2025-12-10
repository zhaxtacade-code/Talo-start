import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Product } from "@/components/product"
import { Minerals } from "@/components/minerals"
import { Quality } from "@/components/quality"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function WaterPage() {
  return (
    <main>
      <Header />
      <Hero />
      <Product />
      <Quality />
      <Minerals />
      <Contact />
      <Footer />
    </main>
  )
}
