import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  center?: boolean
}

export function SectionHeading({ eyebrow, title, children, center }: SectionHeadingProps) {
  return (
    <Reveal
      as="div"
      stagger
      className={[styles.wrap, center ? styles.center : ''].filter(Boolean).join(' ')}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.body}>{children}</p>}
    </Reveal>
  )
}
