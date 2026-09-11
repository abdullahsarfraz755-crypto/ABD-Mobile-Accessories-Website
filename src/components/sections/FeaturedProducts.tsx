import { ArrowRight } from 'lucide-react'
import styles from './FeaturedProducts.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { ProductCard } from '../ui/ProductCard'
import { getFeaturedProducts } from '../../data/products'

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section id="products" className={styles.section}>
      <div className="container">
        <div className={styles.headRow}>
          <SectionHeading eyebrow="Featured" title="This month's standouts">
            A short list of what customers are reaching for most right now.
          </SectionHeading>
          <Button as="a" href="#contact" variant="ghost" icon={<ArrowRight size={16} strokeWidth={1.75} />}>
            View all categories
          </Button>
        </div>

        <Reveal as="div" stagger y={30} className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
