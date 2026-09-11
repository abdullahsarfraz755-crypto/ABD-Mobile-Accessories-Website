import styles from './Categories.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { CATEGORIES } from '../../data/categories'

export function Categories() {
  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="What We Carry" title="Eleven categories. One standard.">
          From daily essentials to gaming gear — every category is curated to the same bar for
          quality and finish.
        </SectionHeading>

        <Reveal as="div" stagger y={22} className={styles.grid}>
          {CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <a key={category.id} href="#products" className={styles.card}>
                {category.featured && <span className={styles.featuredTag}>Popular</span>}
                <Icon className={styles.bgIcon} strokeWidth={1} />
                <span className={styles.iconWrap}>
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className={styles.name}>{category.name}</span>
                <span className={styles.tagline}>{category.tagline}</span>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
