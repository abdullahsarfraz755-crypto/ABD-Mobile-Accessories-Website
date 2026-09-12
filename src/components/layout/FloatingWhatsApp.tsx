import { FaWhatsapp } from 'react-icons/fa6'
import styles from './FloatingWhatsApp.module.css'
import { whatsappHref, CONTACT } from '../../data/contact'

export function FloatingWhatsApp() {
  const href = whatsappHref(`Hello ${CONTACT.brandName}, I have a question.`)

  return (
    <a
      className={styles.fab}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ABD Mobile Accessories on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
