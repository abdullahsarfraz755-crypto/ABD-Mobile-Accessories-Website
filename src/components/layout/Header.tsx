import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import styles from './Header.module.css'
import { Button } from '../ui/Button'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
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

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
        <div className={['container', styles.inner].join(' ')}>
          <NavLink to="/" className={styles.logo} aria-label="ABD Mobile Accessories — home">
            <span className={styles.logoMark}>ABD</span>
            <span className={styles.logoSub}>Mobile Accessories</span>
          </NavLink>

          <nav className={styles.nav} aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button
              as="link"
              to="/shop"
              variant="primary"
              className={styles.ctaDesktop}
              icon={<ShoppingBag strokeWidth={1.75} size={17} />}
            >
              Shop Now
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
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button
            as="link"
            to="/shop"
            variant="primary"
            icon={<ShoppingBag strokeWidth={1.75} size={17} />}
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Button>
        </div>
      )}
    </>
  )
}
