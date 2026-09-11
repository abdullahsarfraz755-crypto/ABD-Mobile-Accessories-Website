import { Gem, Layers, Wrench, BadgePercent, HeartHandshake, Cpu } from 'lucide-react'
import styles from './WhyABD.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const REASONS = [
  {
    icon: Gem,
    title: 'Quality-focused selection',
    desc: 'Nothing reaches the shelf without being checked against our own standard first.',
  },
  {
    icon: Layers,
    title: 'Modern designs',
    desc: 'A range that keeps pace with current devices and current taste, not last year’s stock.',
  },
  {
    icon: Wrench,
    title: 'Practical accessories',
    desc: 'Products chosen for how they’re actually used, day to day — not just how they photograph.',
  },
  {
    icon: BadgePercent,
    title: 'Competitive pricing',
    desc: 'Premium feel without the premium markup — fair pricing for real budgets.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-first service',
    desc: 'Straightforward advice in-store, no pressure, no upselling you don’t need.',
  },
  {
    icon: Cpu,
    title: 'Latest technology accessories',
    desc: 'Fast charging, wireless audio, and gaming gear that keep up with new devices.',
  },
]

export function WhyABD() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="Why ABD" title="Reasons customers come back">
          The principles behind every product we stock.
        </SectionHeading>

        <Reveal as="div" stagger y={24} className={styles.grid}>
          {REASONS.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className={styles.card}>
                <Icon className={styles.icon} size={28} strokeWidth={1.4} />
                <h3 className={styles.title}>{reason.title}</h3>
                <p className={styles.desc}>{reason.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
