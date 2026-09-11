import styles from './Gaming.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { CATEGORIES } from '../../data/categories'

const GAMING_IDS = ['gaming-accessories', 'cooling-fans', 'thumb-sleeves', 'air-buds']

export function Gaming() {
  const tiles = GAMING_IDS.map((id) => CATEGORIES.find((c) => c.id === id)!).filter(Boolean)

  return (
    <section id="gaming" className={styles.section}>
      <span className={styles.bgText} aria-hidden="true">
        GAME ON
      </span>
      <div className={['container', styles.content].join(' ')}>
        <SectionHeading eyebrow="Built To Play" title="Gear for longer sessions">
          Cooling, control, and audio built for serious mobile gaming.
        </SectionHeading>

        <Reveal as="div" stagger y={26} className={styles.grid}>
          {tiles.map((tile, i) => {
            const Icon = tile.icon
            return (
              <a
                key={tile.id}
                href="#products"
                className={[styles.tile, i === 0 ? styles.tileLarge : ''].filter(Boolean).join(' ')}
              >
                <Icon className={styles.tileIcon} size={i === 0 ? 40 : 28} strokeWidth={1.3} />
                <span className={styles.tileName}>{tile.name}</span>
                <span className={styles.tileTagline}>{tile.tagline}</span>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
