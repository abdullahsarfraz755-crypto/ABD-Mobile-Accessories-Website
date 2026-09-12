import type { LucideIcon } from 'lucide-react'
import { ImageOff } from 'lucide-react'
import styles from './PlaceholderTile.module.css'

interface PlaceholderTileProps {
  icon?: LucideIcon
  className?: string
  label?: string
}

export function PlaceholderTile({ icon: Icon = ImageOff, className, label }: PlaceholderTileProps) {
  return (
    <div className={[styles.tile, className].filter(Boolean).join(' ')}>
      <Icon className={styles.icon} strokeWidth={1.25} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
