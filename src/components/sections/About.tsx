import { Gem, Sparkles, Smartphone } from 'lucide-react'
import styles from './About.module.css'
import { Reveal } from '../ui/Reveal'

const PILLARS = [
  {
    icon: Gem,
    title: 'Quality first',
    body: 'Every product is chosen for how it looks and holds up in everyday use.',
  },
  {
    icon: Sparkles,
    title: 'Style that stands out',
    body: 'Designs and finishes picked to match current taste, not last season’s stock.',
  },
  {
    icon: Smartphone,
    title: 'Everyday technology',
    body: 'Chargers, cables, audio, and protection built around how phones are actually used.',
  },
]

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={['container', styles.grid].join(' ')}>
        <Reveal as="div">
          <span className="eyebrow">About ABD</span>
          <h2 className={styles.statement} style={{ marginTop: 'var(--space-5)' }}>
            Mobile accessories, done right.
          </h2>
          <p className={styles.body}>
            ABD Mobile Accessories is a mobile accessories store focused on quality, style, and
            everyday technology — cases, protection, chargers, audio, and creator gear, picked
            with the same standard every time.
          </p>
        </Reveal>

        <Reveal as="div" stagger className={styles.pillars}>
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div className={styles.pillar} key={pillar.title}>
                <span className={styles.pillarIcon}>
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div className={styles.pillarBody}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
