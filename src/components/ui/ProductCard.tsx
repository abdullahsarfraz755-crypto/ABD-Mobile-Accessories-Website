import styles from './ProductCard.module.css'
import { PlaceholderTile } from './PlaceholderTile'
import type { Product } from '../../data/products'
import { CATEGORIES } from '../../data/categories'
import { formatPrice, discountPercent } from '../../lib/format'
import { whatsappHref } from '../../data/contact'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const href = whatsappHref(`Hi! I'd like to ask about the ${product.name}.`)
  const discount =
    product.oldPrice != null ? discountPercent(product.price, product.oldPrice) : null

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        {discount != null && <span className={styles.discount}>-{discount}%</span>}
        {category && <PlaceholderTile icon={category.icon} className={styles.media} />}
      </div>
      <div className={styles.body}>
        {category && <span className={styles.category}>{category.name}</span>}
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <div>
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.oldPrice != null && (
                <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            <span className={styles.availability}>
              <span
                className={[styles.dot, product.availability !== 'in-stock' ? styles.low : '']
                  .filter(Boolean)
                  .join(' ')}
              />
              {product.availability === 'in-stock'
                ? 'In stock'
                : product.availability === 'low-stock'
                  ? 'Low stock'
                  : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
      <a
        className={styles.cardLink}
        href={href ?? '#contact'}
        aria-label={`Ask about ${product.name} on WhatsApp`}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
      />
    </article>
  )
}
