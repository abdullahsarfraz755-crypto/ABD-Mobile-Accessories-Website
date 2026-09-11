import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import styles from './Hero.module.css'
import { Button } from '../ui/Button'
import { HeroScene } from '../../three/HeroScene'
import { ensureGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { whatsappHref } from '../../data/contact'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const waHref = whatsappHref()

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
        <HeroScene sectionEl={sectionEl} />
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
              <span className={styles.lineGold}>Elevated Everyday.</span>
            </span>
          </h1>

          <div ref={introRef}>
            <p className={styles.subcopy}>
              Thoughtfully selected mobile and computer accessories for Lahore&rsquo;s students,
              professionals, and tech lovers — quality you can feel, priced for everyday life.
            </p>

            <div className={styles.ctaRow}>
              <Button as="a" href="#categories" variant="primary" icon={<ArrowRight strokeWidth={1.75} />}>
                Explore Collection
              </Button>
              <Button
                as="a"
                href={waHref ?? '#contact'}
                target={waHref ? '_blank' : undefined}
                rel={waHref ? 'noopener noreferrer' : undefined}
                variant="secondary"
                icon={<MessageCircle strokeWidth={1.75} />}
              >
                WhatsApp Us
              </Button>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>11+</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>Lahore</span>
                <span className={styles.statLabel}>Nishat Colony</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>In-Store</span>
                <span className={styles.statLabel}>Easypaisa &amp; JazzCash</span>
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
