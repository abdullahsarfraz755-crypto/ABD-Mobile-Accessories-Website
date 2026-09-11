import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import styles from './ProductShowcase3D.module.css'
import { ShowcaseScene } from '../../three/ShowcaseScene'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STAGES = [
  {
    title: 'Precision Fit',
    body: 'Every edge is measured against the device it protects — ports, buttons, and cameras line up exactly.',
  },
  {
    title: 'Premium Materials',
    body: 'Finishes that feel as good under your thumb as they look on a shelf — no brittle plastics, no shortcuts.',
  },
  {
    title: 'Everyday Durability',
    body: 'Tested against the reality of pockets, bags, and daily commutes — built to be lived with, not just looked at.',
  },
]

export function ProductShowcase3D() {
  const wrapperRef = useRef<HTMLElement>(null)
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null)
  const [stage, setStage] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    setWrapperEl(wrapperRef.current)
  }, [])

  const handleStageChange = useCallback((s: number) => setStage(s), [])

  const progressRef = useScrollProgress(wrapperEl, STAGES.length, handleStageChange, reducedMotion)

  return (
    <section id="showcase" ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={styles.canvasLayer}>
          <ShowcaseScene progressRef={progressRef} sectionEl={wrapperEl} />
        </div>

        <div className={['container', styles.overlay].join(' ')}>
          <div className={styles.headWrap}>
            <span className="eyebrow">3D Showcase</span>
          </div>

          <div className={styles.captions}>
            {STAGES.map((s, i) => (
              <div key={s.title} className={[styles.caption, i === stage ? styles.active : ''].join(' ')}>
                <span className={styles.captionIndex}>
                  0{i + 1} / 0{STAGES.length}
                </span>
                <h3 className={styles.captionTitle}>{s.title}</h3>
                <p className={styles.captionBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.progressRail}>
            {STAGES.map((s, i) => (
              <span
                key={s.title}
                className={[
                  styles.progressDot,
                  i === stage ? styles.active : '',
                  i < stage ? styles.done : '',
                ].join(' ')}
              >
                <span />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
