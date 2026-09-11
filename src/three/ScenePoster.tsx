import styles from './ScenePoster.module.css'

/** Static fallback shown when WebGL is unavailable or a 3D scene errors. */
export function ScenePoster() {
  return (
    <div className={styles.poster} role="img" aria-label="ABD device studio visual">
      <div className={styles.glow} />
      <div className={styles.device} />
    </div>
  )
}
