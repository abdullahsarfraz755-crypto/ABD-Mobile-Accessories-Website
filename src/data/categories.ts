import type { LucideIcon } from 'lucide-react'
import {
  LayoutGrid,
  Headphones,
  ShieldCheck,
  Package,
  Layers,
  BatteryCharging,
  Cable,
  Video,
  Smartphone,
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  icon: LucideIcon
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products', icon: LayoutGrid },
  { id: 'airbuds-audio', name: 'Airbuds & Audio', icon: Headphones },
  { id: 'phone-protection', name: 'Phone Protection', icon: ShieldCheck },
  { id: 'back-pouches', name: 'Back Pouches', icon: Package },
  { id: 'back-sheets', name: 'Back Sheets', icon: Layers },
  { id: 'chargers', name: 'Chargers', icon: BatteryCharging },
  { id: 'cables', name: 'Cables', icon: Cable },
  { id: 'creator-accessories', name: 'Creator Accessories', icon: Video },
  { id: 'mobile-accessories', name: 'Mobile Accessories', icon: Smartphone },
]
