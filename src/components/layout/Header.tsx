import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import styles from './Header.module.css'
import { Button } from '../ui/Button'
import { whatsappHref } from '../../data/contact'

const NAV_LINKS = [
  { href: '#categories', label: 'Categories' },
  { href: '#products', label: 'Products' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#gaming', label: 'Gaming' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const waHref = whatsappHref()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
        <div className={['container', styles.inner].join(' ')}>
          <a href="#top" className={styles.logo} aria-label="ABD Mobile Accessories — home">
            <span className={styles.logoMark}>ABD</span>
            <span className={styles.logoSub}>Mobile Accessories</span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button
              as="a"
              href={waHref ?? '#contact'}
              target={waHref ? '_blank' : undefined}
              rel={waHref ? 'noopener noreferrer' : undefined}
              variant="secondary"
              className={styles.ctaDesktop}
              icon={<MessageCircle strokeWidth={1.75} />}
            >
              WhatsApp Us
            </Button>
            <button
              className={styles.menuBtn}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobilePanel} role="dialog" aria-modal="true">
          <nav className={styles.mobileNav} aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            as="a"
            href={waHref ?? '#contact'}
            target={waHref ? '_blank' : undefined}
            rel={waHref ? 'noopener noreferrer' : undefined}
            variant="primary"
            icon={<MessageCircle strokeWidth={1.75} />}
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp Us
          </Button>
        </div>
      )}
    </>
  )
}
