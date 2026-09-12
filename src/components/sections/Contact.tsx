import { PhoneCall } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import styles from './Contact.module.css'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { CONTACT, whatsappHref, phoneHref } from '../../data/contact'

export function Contact() {
  const waHref = whatsappHref(`Hello ${CONTACT.brandName}, I have a question.`)

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <Reveal as="div" stagger className={styles.wrap}>
          <span className="eyebrow">Get In Touch</span>
          <h2 className={styles.title}>Questions about a product?</h2>
          <p className={styles.body}>
            Message us on WhatsApp and we&rsquo;ll help you find the right accessory.
          </p>
          <span className={styles.number}>{CONTACT.phoneDisplay}</span>

          <div className={styles.ctaRow}>
            <Button
              as="a"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="accent"
              icon={<FaWhatsapp size={18} />}
            >
              Chat on WhatsApp
            </Button>
            <Button as="a" href={phoneHref()} variant="secondary" icon={<PhoneCall strokeWidth={1.75} />}>
              Call Store
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
