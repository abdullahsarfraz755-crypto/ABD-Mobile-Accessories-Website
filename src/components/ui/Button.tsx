import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import styles from './Button.module.css'
import { useMagnetic } from '../../hooks/useMagnetic'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost'

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonAsLink = CommonProps & Omit<LinkProps, 'className' | 'children'> & { as: 'link' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export function Button({ variant = 'primary', icon, children, className, as, ...rest }: ButtonProps) {
  const magneticRef = useMagnetic<HTMLElement>()
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(' ')

  if (as === 'link') {
    return (
      <Link ref={magneticRef as React.Ref<HTMLAnchorElement>} className={classes} {...(rest as LinkProps)}>
        {children}
        {icon && <span className={styles.icon}>{icon}</span>}
      </Link>
    )
  }

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
