import styles from './Services.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { SERVICES } from '../../data/services'

export function Services() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="In-Store Services" title="More than a checkout counter" center>
          Convenience services available in-store alongside your purchase.
        </SectionHeading>

        <Reveal as="div" stagger y={20} className={styles.grid}>
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className={styles.item}>
                <span className={styles.iconWrap}>
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <div className={styles.name}>{service.name}</div>
                  <p className={styles.desc}>{service.description}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
