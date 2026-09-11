import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'
import { useMagnetic } from '../../hooks/useMagnetic'

type Variant = 'primary' | 'secondary' | 'ghost'

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({ variant = 'primary', icon, children, className, as, ...rest }: ButtonProps) {
  const magneticRef = useMagnetic<HTMLElement>()
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(' ')

  if (as === 'a') {
    return (
      <a
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {icon && <span className={styles.icon}>{icon}</span>}
      </a>
    )
  }

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}
