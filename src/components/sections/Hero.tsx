import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import styles from './Hero.module.css'
import { Button } from '../ui/Button'
import { ScenePoster } from '../../three/ScenePoster'
import { ensureGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { whatsappHref, CONTACT } from '../../data/contact'

const HeroScene = lazy(() => import('../../three/HeroScene').then((m) => ({ default: m.HeroScene })))
import { PRODUCTS } from '../../data/products'
import { CATEGORIES } from '../../data/categories'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const waHref = whatsappHref(`Hello ${CONTACT.brandName}, I'm interested in your accessories.`)

  useLayoutEffect(() => {
    setSectionEl(sectionRef.current)
  }, [])

  useLayoutEffect(() => {
    if (!headlineRef.current || !introRef.current) return
    const { gsap } = ensureGsap()

    const lines = headlineRef.current.querySelectorAll(`.${styles.line} span`)
    const introChildren = introRef.current.children

    if (reducedMotion) {
      gsap.set(lines, { opacity: 1, y: 0 })
      gsap.set(introChildren, { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
    ).fromTo(
      introChildren,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09 },
      '-=0.55',
    )
  }, [reducedMotion])

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <div className={styles.canvasLayer}>
        <Suspense fallback={<ScenePoster />}>
          <HeroScene sectionEl={sectionEl} />
        </Suspense>
      </div>
      <div className={styles.scrim} />

      <div className={['container', styles.content].join(' ')}>
        <div className={styles.inner}>
          <span className={['eyebrow', styles.eyebrow].join(' ')}>ABD Mobile Accessories</span>

          <h1 ref={headlineRef} className={styles.headline}>
            <span className={styles.line}>
              <span>Premium Accessories.</span>
            </span>
            <span className={styles.line}>
              <span className={styles.lineAccent}>Smarter Everyday.</span>
            </span>
          </h1>

          <div ref={introRef}>
            <p className={styles.subcopy}>
              Discover premium mobile accessories designed for your everyday tech.
            </p>

            <div className={styles.ctaRow}>
              <Button as="link" to="/shop" variant="primary" icon={<ArrowRight strokeWidth={1.75} />}>
                Shop Products
              </Button>
              <Button
                as="a"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<FaWhatsapp size={17} />}
              >
                Chat on WhatsApp
              </Button>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{PRODUCTS.length}+</span>
                <span className={styles.statLabel}>Curated Products</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{CATEGORIES.length - 1}</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>Fast</span>
                <span className={styles.statLabel}>WhatsApp Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span style={{ fontSize: 'var(--fs-micro)', letterSpacing: '0.1em' }}>SCROLL</span>
      </div>
    </section>
  )
}
