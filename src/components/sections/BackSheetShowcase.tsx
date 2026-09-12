import { lazy, Suspense, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import styles from './BackSheetShowcase.module.css'
import { ScenePoster } from '../../three/ScenePoster'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'

const ShowcaseScene = lazy(() =>
  import('../../three/ShowcaseScene').then((m) => ({ default: m.ShowcaseScene })),
)

const STAGES = [
  {
    title: 'Real Designs',
    body: 'Dozens of ready-made back sheet designs — from world maps to portraits to seasonal art.',
  },
  {
    title: 'Made For Your Phone',
    body: 'Cut and applied to fit the back of your iPhone or Android device, camera cutout included.',
  },
  {
    title: 'See It Before You Buy',
    body: 'All models available — message us on WhatsApp and we’ll show you the full design catalog.',
  },
]

export function BackSheetShowcase() {
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
    <section id="back-sheet" ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={styles.canvasLayer}>
          <Suspense fallback={<ScenePoster />}>
            <ShowcaseScene progressRef={progressRef} sectionEl={wrapperEl} />
          </Suspense>
        </div>

        <div className={['container', styles.overlay].join(' ')}>
          <div className={styles.headWrap}>
            <span className="eyebrow">Back Sheet Showcase</span>
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

          <div className={styles.ctaRow}>
            <Button as="link" to="/product/back-sheet" variant="accent" icon={<ArrowRight strokeWidth={1.75} />}>
              View Back Sheet Designs
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
