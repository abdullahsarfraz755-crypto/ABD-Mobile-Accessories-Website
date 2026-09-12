import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa6'
import styles from './Footer.module.css'
import { CATEGORIES } from '../../data/categories'
import { CONTACT } from '../../data/contact'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoMark}>ABD</span> Mobile Accessories
            </span>
            <p className={styles.tagline}>Premium mobile accessories for everyday tech.</p>
            <div className={styles.social}>
              <a
                className={styles.socialLink}
                href={CONTACT.social.instagram || '#'}
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                className={styles.socialLink}
                href={CONTACT.social.facebook || '#'}
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a className={styles.socialLink} href={CONTACT.social.tiktok || '#'} aria-label="TikTok">
                <FaTiktok size={15} />
              </a>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Categories</div>
            <ul className={styles.list}>
              {CATEGORIES.filter((c) => c.id !== 'all')
                .slice(0, 6)
                .map((c) => (
                  <li key={c.id}>
                    <Link to={`/shop?category=${c.id}`}>{c.name}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Contact</div>
            <ul className={styles.list}>
              <li>
                <span>WhatsApp: {CONTACT.phoneDisplay}</span>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneDial}`}>Call the store</a>
              </li>
              <li>
                <Link to="/#contact">Get in touch</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            &copy; {year} {CONTACT.brandName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
