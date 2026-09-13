import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa6'
import styles from './ProductDetail.module.css'
import { Button } from '../components/ui/Button'
import { ProductCard } from '../components/ui/ProductCard'
import { PlaceholderTile } from '../components/ui/PlaceholderTile'
import { getProductById, getRelatedProducts } from '../data/products'
import { CATEGORIES } from '../data/categories'
import { formatPrice, discountPercent } from '../lib/format'
import { whatsappHref, productWhatsappMessage } from '../data/contact'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product not found</h1>
          <p>
            <Link to="/shop">Back to Shop</Link>
          </p>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const displayName = product.variant ? `${product.name} (${product.variant})` : product.name
  const waHref = whatsappHref(productWhatsappMessage(displayName))
  const related = getRelatedProducts(product)
  const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : null

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link to="/shop">Shop</Link> / {category?.name} / {product.name}
          </p>

          <div className={styles.grid}>
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                {product.images.length > 0 ? (
                  <img src={product.images[activeImage]} alt={displayName} />
                ) : (
                  <PlaceholderTile icon={category?.icon} label="Product image coming soon" />
                )}
              </div>
              {product.images.length > 1 && (
                <div className={styles.thumbRow}>
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      className={[styles.thumb, i === activeImage ? styles.thumbActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {category && <span className={styles.category}>{category.name}</span>}
              <h1 className={styles.name}>{product.name}</h1>
              {product.variant && <p className={styles.variant}>{product.variant}</p>}

              <div className={styles.metaRow}>
                {product.condition && (
                  <span className={[styles.badge, styles.badgeCondition].join(' ')}>
                    {product.condition}
                  </span>
                )}
                {product.availabilityNote && (
                  <span className={[styles.badge, styles.badgeAvailability].join(' ')}>
                    {product.availabilityNote}
                  </span>
                )}
                {discount != null && (
                  <span className={[styles.badge, styles.badgeDiscount].join(' ')}>
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className={styles.description}>{product.description}</p>

              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {product.oldPrice != null && (
                  <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                )}
              </div>

              <div className={styles.ctaRow}>
                <Button
                  as="a"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  icon={<FaWhatsapp size={18} />}
                >
                  Ask on WhatsApp
                </Button>
                <Button as="link" to="/shop" variant="secondary">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>You may also like</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
