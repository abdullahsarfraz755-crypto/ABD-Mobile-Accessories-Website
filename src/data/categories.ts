import type { LucideIcon } from 'lucide-react'
import {
  Smartphone,
  ShieldCheck,
  BatteryCharging,
  Cable,
  Headphones,
  Ear,
  Gamepad2,
  Fan,
  Hand,
  Laptop,
  Package,
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  slug: string
  tagline: string
  icon: LucideIcon
  featured?: boolean
}

export const CATEGORIES: Category[] = [
  {
    id: 'phone-cases',
    name: 'Phone Cases',
    slug: 'phone-cases',
    tagline: 'Precision-fit protection',
    icon: Smartphone,
    featured: true,
  },
  {
    id: 'screen-protectors',
    name: 'Screen Protectors',
    slug: 'screen-protectors',
    tagline: 'Edge-to-edge clarity',
    icon: ShieldCheck,
  },
  {
    id: 'chargers',
    name: 'Chargers',
    slug: 'chargers',
    tagline: 'Fast, reliable power',
    icon: BatteryCharging,
    featured: true,
  },
  {
    id: 'data-cables',
    name: 'Data Cables',
    slug: 'data-cables',
    tagline: 'Built for daily use',
    icon: Cable,
  },
  {
    id: 'air-buds',
    name: 'Air Buds',
    slug: 'air-buds',
    tagline: 'Wireless, weightless',
    icon: Headphones,
    featured: true,
  },
  {
    id: 'handsfree',
    name: 'Handsfree',
    slug: 'handsfree',
    tagline: 'Clear calls, all day',
    icon: Ear,
  },
  {
    id: 'gaming-accessories',
    name: 'Gaming Accessories',
    slug: 'gaming-accessories',
    tagline: 'Built for the win',
    icon: Gamepad2,
    featured: true,
  },
  {
    id: 'cooling-fans',
    name: 'Cooling Fans',
    slug: 'cooling-fans',
    tagline: 'Stay cool under pressure',
    icon: Fan,
  },
  {
    id: 'thumb-sleeves',
    name: 'Thumb Sleeves',
    slug: 'thumb-sleeves',
    tagline: 'Sharper, faster control',
    icon: Hand,
  },
  {
    id: 'computer-accessories',
    name: 'Computer Accessories',
    slug: 'computer-accessories',
    tagline: 'Desk-ready essentials',
    icon: Laptop,
  },
  {
    id: 'other-accessories',
    name: 'Other Mobile Accessories',
    slug: 'other-accessories',
    tagline: 'The rest of the essentials',
    icon: Package,
  },
]
