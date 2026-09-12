import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import styles from './Shop.module.css'
import { ProductCard } from '../components/ui/ProductCard'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'
  const [query, setQuery] = useState('')

  const setCategory = (id: string) => {
    if (id === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', id)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.categoryId === activeCategory
      const matchesQuery =
        !q || [p.name, p.variant, p.categoryId].filter(Boolean).join(' ').toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Shop All Products</h1>
          <p className={styles.subtitle}>
            Browse the full ABD Mobile Accessories catalog — every product, one place.
          </p>
        </div>
      </section>

      <section className={styles.controls}>
        <div className="container">
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} size={17} strokeWidth={1.75} />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <div className={styles.chips} role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={[styles.chip, activeCategory === c.id ? styles.chipActive : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setCategory(c.id)}
                aria-pressed={activeCategory === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>

          <p className={styles.resultCount}>
            {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No products match your search.</p>
          )}
        </div>
      </section>
    </>
  )
}
