import styles from './BrandIntro.module.css'
import { Reveal } from '../ui/Reveal'

const PILLARS = [
  {
    title: 'Considered selection',
    body: 'Every product in the store is chosen for fit, finish, and how it holds up after months of daily use — not just how it looks on day one.',
  },
  {
    title: 'Built for real life',
    body: "Cases that survive a dropped commute, cables that outlast a semester, chargers that keep up with how people actually use their phones.",
  },
  {
    title: 'Priced for Lahore',
    body: 'Premium quality shouldn’t mean import pricing. We keep the range accessible for students, professionals, and families alike.',
  },
]

export function BrandIntro() {
  return (
    <section className={styles.section}>
      <div className={['container', styles.grid].join(' ')}>
        <Reveal as="div">
          <span className="eyebrow">The ABD Standard</span>
          <h2 className={styles.statement} style={{ marginTop: 'var(--space-5)' }}>
            Accessories chosen the way we&rsquo;d choose them for ourselves.
          </h2>
        </Reveal>

        <Reveal as="div" stagger className={styles.pillars}>
          {PILLARS.map((pillar, i) => (
            <div className={styles.pillar} key={pillar.title}>
              <span className={styles.pillarIndex}>0{i + 1}</span>
              <div className={styles.pillarBody}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
