import { MapPin, MessageCircle, PhoneCall, Navigation } from 'lucide-react'
import styles from './Contact.module.css'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { CONTACT, whatsappHref, phoneHref } from '../../data/contact'

export function Contact() {
  const waHref = whatsappHref()
  const callHref = phoneHref()
  const mapsHref = CONTACT.mapsUrl || undefined

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <SectionHeading eyebrow="Visit Us" title="Come see the collection in person">
          Every category, in hand, at our Lahore store.
        </SectionHeading>

        <Reveal as="div" className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.address}>
              <span className={styles.addressLine}>{CONTACT.addressLine1}</span>
              <span className={styles.addressLine}>{CONTACT.addressLine2}</span>
              <span className={styles.addressCity}>{CONTACT.city}</span>
            </div>

            <div className={styles.ctaRow}>
              <Button
                as="a"
                href={waHref ?? '#'}
                target={waHref ? '_blank' : undefined}
                rel={waHref ? 'noopener noreferrer' : undefined}
                aria-disabled={!waHref}
                tabIndex={waHref ? undefined : -1}
                variant="primary"
                icon={<MessageCircle strokeWidth={1.75} />}
                style={!waHref ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
              >
                WhatsApp
              </Button>
              <Button
                as="a"
                href={callHref ?? '#'}
                aria-disabled={!callHref}
                tabIndex={callHref ? undefined : -1}
                variant="secondary"
                icon={<PhoneCall strokeWidth={1.75} />}
                style={!callHref ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
              >
                Call Store
              </Button>
              <Button
                as="a"
                href={mapsHref ?? '#'}
                target={mapsHref ? '_blank' : undefined}
                rel={mapsHref ? 'noopener noreferrer' : undefined}
                aria-disabled={!mapsHref}
                tabIndex={mapsHref ? undefined : -1}
                variant="secondary"
                icon={<Navigation strokeWidth={1.75} />}
                style={!mapsHref ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
              >
                Get Directions
              </Button>
            </div>

            <div className={styles.hours}>
              <div className={styles.hoursRow}>
                <span>Monday – Saturday</span>
                <span>11:00 AM – 10:00 PM</span>
              </div>
              <div className={styles.hoursRow}>
                <span>Sunday</span>
                <span>2:00 PM – 10:00 PM</span>
              </div>
            </div>
          </div>

          <div className={styles.mapCard}>
            <div className={styles.mapPin}>
              <MapPin className={styles.pinIcon} size={36} strokeWidth={1.3} />
              <span className={styles.mapNote}>
                Google Maps link to be added — find us on {CONTACT.addressLine1}, opposite Rabbani
                Masjid.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
