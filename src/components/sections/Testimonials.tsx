import { Info } from 'lucide-react'
import styles from './Testimonials.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { TESTIMONIALS } from '../../data/testimonials'

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="Customer Feedback" title="What people say" center>
          <span className={styles.sampleNotice}>
            <Info size={14} strokeWidth={1.75} />
            Sample layout — real customer reviews go here
          </span>
        </SectionHeading>

        <Reveal as="div" stagger y={22} className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.meta}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.context}>{t.context}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
