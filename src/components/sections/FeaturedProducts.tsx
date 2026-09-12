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
    <section id="featured" className={styles.section}>
      <div className="container">
        <div className={styles.headRow}>
          <SectionHeading eyebrow="Featured" title="What customers reach for most">
            A short list of our most popular accessories.
          </SectionHeading>
          <Button as="link" to="/shop" variant="ghost" icon={<ArrowRight size={16} strokeWidth={1.75} />}>
            View all products
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
