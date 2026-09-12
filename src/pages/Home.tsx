import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Categories } from '../components/sections/Categories'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { BackSheetShowcase } from '../components/sections/BackSheetShowcase'
import { Contact } from '../components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <FeaturedProducts />
      <BackSheetShowcase />
      <Contact />
    </>
  )
}
