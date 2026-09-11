import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { BrandIntro } from './components/sections/BrandIntro'
import { Categories } from './components/sections/Categories'
import { FeaturedProducts } from './components/sections/FeaturedProducts'
import { ProductShowcase3D } from './components/sections/ProductShowcase3D'
import { Services } from './components/sections/Services'
import { WhyABD } from './components/sections/WhyABD'
import { Gaming } from './components/sections/Gaming'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <BrandIntro />
        <Categories />
        <FeaturedProducts />
        <ProductShowcase3D />
        <Services />
        <WhyABD />
        <Gaming />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
