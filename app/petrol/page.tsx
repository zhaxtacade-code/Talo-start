import { Header } from "@/components/header"
import { Hero } from "@/components/hero-petrol"
import { ProductPetrol } from "@/components/product-petrol"
import { PetrolGallery } from "@/components/petrol-gallery"
import { PetrolFeatures } from "@/components/petrol-features"
import { Footer } from "@/components/footer"

export default function PetrolPage() {
  return (
    <main>
      <Header />
      <Hero />
      <ProductPetrol />
      <PetrolGallery />
      <PetrolFeatures />
      <Footer />
    </main>
  )
}
