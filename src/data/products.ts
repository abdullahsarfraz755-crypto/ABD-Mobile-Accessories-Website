/**
 * OFFICIAL CATALOG — supplied by the business owner. Names and prices are
 * authoritative and must not be changed, and no additional products,
 * specifications, reviews, or stock counts may be invented.
 *
 * `images` lists real product photography where the owner supplied it
 * (see /public/assets/products). Where `images` is empty, `comingSoon` is
 * true and the UI shows an honest "Product image coming soon" placeholder
 * instead of a fabricated photo.
 */

export type Condition = 'Original'

export interface Product {
  id: string
  name: string
  variant?: string
  categoryId: string
  price: number
  availabilityNote?: string
  condition?: Condition
  images: string[]
  comingSoon?: boolean
  featured?: boolean
}

export const CURRENCY = 'PKR'

export const PRODUCTS: Product[] = [
  {
    id: 'back-pouch',
    name: 'Back Pouch',
    categoryId: 'back-pouches',
    price: 499,
    availabilityNote: 'All Models Available',
    images: [],
    comingSoon: true,
  },
  {
    id: 'back-sheet',
    name: 'iPhone & Android Back Sheet',
    categoryId: 'back-sheets',
    price: 499,
    availabilityNote: 'All Models Available',
    images: [
      '/assets/products/back-sheet/design-2-map-color.jpg',
      '/assets/products/back-sheet/design-1-map-mono.jpg',
      '/assets/products/back-sheet/design-3-portraits.jpg',
      '/assets/products/back-sheet/design-4-portrait-duo.jpg',
      '/assets/products/back-sheet/design-5-brother-hand.jpg',
      '/assets/products/back-sheet/design-6-cherry-blossom.jpg',
      '/assets/products/back-sheet/design-7-brother-repeat.jpg',
    ],
    featured: true,
  },
  {
    id: 'front-glass',
    name: 'iPhone Borderless Front Glass',
    categoryId: 'phone-protection',
    price: 1500,
    availabilityNote: 'All Models Available',
    images: [
      '/assets/products/front-glass/borderless-glass-2.jpg',
      '/assets/products/front-glass/borderless-glass-1.jpg',
    ],
    featured: true,
  },
  {
    id: 'headphone-p9',
    name: 'Headphone P9',
    categoryId: 'airbuds-audio',
    price: 2250,
    images: ['/assets/products/headphone-p9/headphone-p9.jpg'],
    featured: true,
  },
  {
    id: 'google-pixel-adapter-30w',
    name: 'Google Pixel Adapter 30W',
    categoryId: 'chargers',
    price: 4500,
    condition: 'Original',
    images: [
      '/assets/products/google-pixel-adapter/adapter-box.jpg',
      '/assets/products/google-pixel-adapter/adapter-front.jpg',
      '/assets/products/google-pixel-adapter/adapter-back.jpg',
    ],
    featured: true,
  },
  {
    id: 'google-pixel-cable-30w',
    name: 'Google Pixel Cable 30W',
    categoryId: 'cables',
    price: 1500,
    condition: 'Original',
    images: [
      '/assets/products/google-pixel-cable/cable-box.jpg',
      '/assets/products/google-pixel-cable/cable-1.jpg',
    ],
  },
  {
    id: 'ring-light-26cm',
    name: 'Ring Light 26cm',
    categoryId: 'creator-accessories',
    price: 1250,
    images: ['/assets/products/ring-light/ring-light-box.jpg'],
  },
  {
    id: 'mic',
    name: 'Mic',
    categoryId: 'creator-accessories',
    price: 3850,
    images: ['/assets/products/mic/mic-open.jpg', '/assets/products/mic/mic-box.jpg'],
  },
  {
    id: 'airbuds-pro-2-white',
    name: 'Airbuds Pro 2',
    variant: 'White',
    categoryId: 'airbuds-audio',
    price: 1850,
    images: [],
    comingSoon: true,
  },
  {
    id: 'airbuds-pro-2-black',
    name: 'Airbuds Pro 2',
    variant: 'Black',
    categoryId: 'airbuds-audio',
    price: 2499,
    images: [],
    comingSoon: true,
  },
  {
    id: 'magnet-buzzer-white',
    name: 'Magnet Buzzer',
    variant: 'White Color + Black Pouch',
    categoryId: 'mobile-accessories',
    price: 2850,
    images: [],
    comingSoon: true,
  },
  {
    id: 'magnet-buzzer-black',
    name: 'Magnet Buzzer',
    variant: 'Black Color + Black Pouch',
    categoryId: 'mobile-accessories',
    price: 3850,
    images: [],
    comingSoon: true,
  },
  {
    id: 'airbuds-pro-3',
    name: 'Airbuds Pro 3',
    categoryId: 'airbuds-audio',
    price: 2850,
    images: [],
    comingSoon: true,
  },
  {
    id: 'airbuds-pro-5',
    name: 'Airbuds Pro 5',
    categoryId: 'airbuds-audio',
    price: 2550,
    images: [],
    comingSoon: true,
  },
]

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured)
}

export function getProductsByCategory(categoryId: string) {
  if (categoryId === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return PRODUCTS
  return PRODUCTS.filter((p) =>
    [p.name, p.variant, p.categoryId].filter(Boolean).join(' ').toLowerCase().includes(q),
  )
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(
    0,
    limit,
  )
}
