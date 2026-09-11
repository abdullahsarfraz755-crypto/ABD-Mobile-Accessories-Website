/**
 * Sample catalog data. Prices are illustrative placeholders (PKR) so the
 * pricing UI (discount badges, strike-through, etc.) has something real to
 * render — replace with actual inventory before launch. No technical
 * specifications are claimed; descriptions stay general on purpose.
 *
 * `image` is left undefined for every entry: no product photography was
 * supplied, so ProductCard renders a designed placeholder tile instead of a
 * fake stock photo. Add a real image path once photography is available.
 */

export type Availability = 'in-stock' | 'low-stock' | 'out-of-stock'
export type Badge = 'New' | 'Bestseller' | 'Limited'

export interface Product {
  id: string
  name: string
  categoryId: string
  description: string
  price: number
  oldPrice?: number
  image?: string
  featured?: boolean
  badge?: Badge
  availability: Availability
}

export const CURRENCY = 'PKR'

export const PRODUCTS: Product[] = [
  {
    id: 'case-aegis-clear',
    name: 'Aegis Clear Case',
    categoryId: 'phone-cases',
    description: 'Slim transparent case with reinforced corners for everyday protection.',
    price: 1499,
    oldPrice: 1899,
    featured: true,
    badge: 'Bestseller',
    availability: 'in-stock',
  },
  {
    id: 'case-noir-leather',
    name: 'Noir Leather Case',
    categoryId: 'phone-cases',
    description: 'Textured leatherette finish with a soft-touch matte grip.',
    price: 2299,
    featured: true,
    badge: 'New',
    availability: 'in-stock',
  },
  {
    id: 'screen-guard-glass',
    name: '9H Tempered Glass Guard',
    categoryId: 'screen-protectors',
    description: 'Case-friendly edges with an oleophobic coating for smudge resistance.',
    price: 699,
    oldPrice: 999,
    availability: 'in-stock',
  },
  {
    id: 'charger-fastcharge-33w',
    name: 'FastCharge 33W Adapter',
    categoryId: 'chargers',
    description: 'Compact wall adapter with intelligent overcharge protection.',
    price: 2199,
    featured: true,
    badge: 'Bestseller',
    availability: 'in-stock',
  },
  {
    id: 'charger-wireless-pad',
    name: 'Aura Wireless Charging Pad',
    categoryId: 'chargers',
    description: 'Slim charging pad with a soft ambient LED ring.',
    price: 2899,
    badge: 'New',
    availability: 'low-stock',
  },
  {
    id: 'cable-braided-usbc',
    name: 'Braided USB-C Cable',
    categoryId: 'data-cables',
    description: 'Woven nylon jacket built to resist daily wear and tangling.',
    price: 799,
    availability: 'in-stock',
  },
  {
    id: 'airbuds-pulse-pro',
    name: 'Pulse Pro Air Buds',
    categoryId: 'air-buds',
    description: 'True wireless earbuds with a pocket-sized charging case.',
    price: 4499,
    oldPrice: 5499,
    featured: true,
    badge: 'Bestseller',
    availability: 'in-stock',
  },
  {
    id: 'handsfree-clear-call',
    name: 'ClearCall Handsfree',
    categoryId: 'handsfree',
    description: 'Lightweight wired handsfree with an in-line remote and mic.',
    price: 599,
    availability: 'in-stock',
  },
  {
    id: 'gaming-trigger-grip',
    name: 'Trigger Grip Controller Mount',
    categoryId: 'gaming-accessories',
    description: 'Ergonomic mobile game trigger mount for extended sessions.',
    price: 1299,
    featured: true,
    badge: 'New',
    availability: 'in-stock',
  },
  {
    id: 'cooling-fan-icebreeze',
    name: 'IceBreeze Clip-On Fan',
    categoryId: 'cooling-fans',
    description: 'Clip-on phone cooling fan for long gaming sessions.',
    price: 1799,
    featured: true,
    availability: 'in-stock',
  },
  {
    id: 'thumb-sleeve-precision',
    name: 'Precision Thumb Sleeves',
    categoryId: 'thumb-sleeves',
    description: 'Breathable sleeves that keep fingertips fast and sweat-free.',
    price: 449,
    availability: 'in-stock',
  },
  {
    id: 'laptop-sleeve-vault',
    name: 'Vault Laptop Sleeve',
    categoryId: 'computer-accessories',
    description: 'Padded protective sleeve with a soft interior lining.',
    price: 2499,
    availability: 'in-stock',
  },
  {
    id: 'usb-hub-slim',
    name: 'Slim Multiport USB Hub',
    categoryId: 'computer-accessories',
    description: 'Compact multiport hub for everyday desk and travel use.',
    price: 3199,
    badge: 'New',
    availability: 'low-stock',
  },
  {
    id: 'popsocket-grip',
    name: 'Grip & Stand Holder',
    categoryId: 'other-accessories',
    description: 'Collapsible grip that doubles as a hands-free media stand.',
    price: 549,
    availability: 'in-stock',
  },
]

export function getProductsByCategory(categoryId: string) {
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured)
}
