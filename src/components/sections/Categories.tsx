import styles from './Categories.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { CATEGORIES } from '../../data/categories'
import { Link } from 'react-router-dom'

export function Categories() {
  const shopCategories = CATEGORIES.filter((c) => c.id !== 'all')

  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="Shop By Category" title="Everything for your phone, in one place">
          Every category is stocked with the same standard for quality and value.
        </SectionHeading>

        <Reveal as="div" stagger y={22} className={styles.grid}>
          {shopCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} to={`/shop?category=${category.id}`} className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className={styles.name}>{category.name}</span>
              </Link>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
