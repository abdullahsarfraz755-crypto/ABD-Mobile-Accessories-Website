import type { LucideIcon } from 'lucide-react'
import styles from './PlaceholderTile.module.css'

interface PlaceholderTileProps {
  icon: LucideIcon
  className?: string
}

export function PlaceholderTile({ icon: Icon, className }: PlaceholderTileProps) {
  return (
    <div className={[styles.tile, className].filter(Boolean).join(' ')} aria-hidden="true">
      <Icon className={styles.icon} strokeWidth={1.25} />
    </div>
  )
}
