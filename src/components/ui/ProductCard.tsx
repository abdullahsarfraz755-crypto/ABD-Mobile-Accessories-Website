import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa6'
import styles from './ProductCard.module.css'
import { PlaceholderTile } from './PlaceholderTile'
import type { Product } from '../../data/products'
import { CATEGORIES } from '../../data/categories'
import { formatPrice } from '../../lib/format'
import { whatsappHref, productWhatsappMessage } from '../../data/contact'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const displayName = product.variant ? `${product.name} (${product.variant})` : product.name
  const waHref = whatsappHref(productWhatsappMessage(displayName))

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        {product.condition && <span className={styles.conditionBadge}>{product.condition}</span>}
        <div className={styles.media}>
          {product.images.length > 0 ? (
            <img src={product.images[0]} alt={displayName} loading="lazy" />
          ) : (
            <PlaceholderTile icon={category?.icon} label="Photo coming soon" />
          )}
        </div>
      </div>
      <div className={styles.body}>
        {category && <span className={styles.category}>{category.name}</span>}
        <h3 className={styles.name}>{product.name}</h3>
        {product.variant && <span className={styles.variant}>{product.variant}</span>}
        {product.availabilityNote && (
          <span className={styles.availabilityNote}>{product.availabilityNote}</span>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <div className={styles.actions}>
            <Link to={`/product/${product.id}`} className={styles.viewBtn}>
              View Product
            </Link>
            <a
              className={styles.waBtn}
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${displayName} on WhatsApp`}
            >
              <FaWhatsapp size={19} />
            </a>
          </div>
        </div>
      </div>
      <Link className={styles.cardLink} to={`/product/${product.id}`} aria-label={displayName} />
    </article>
  )
}
