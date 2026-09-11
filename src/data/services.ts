import type { LucideIcon } from 'lucide-react'
import { Wallet, Smartphone, Zap, Package2, Landmark, PhoneCall } from 'lucide-react'

export interface Service {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    description: 'Send and receive payments in-store, instantly.',
    icon: Wallet,
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    description: 'Quick, secure mobile wallet transactions.',
    icon: Smartphone,
  },
  {
    id: 'easyload',
    name: 'Easy Load',
    description: 'Top up any network in seconds.',
    icon: Zap,
  },
  {
    id: 'mobile-packages',
    name: 'Mobile Packages',
    description: 'Data, call, and SMS bundles for every network.',
    icon: Package2,
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct transfers for larger purchases.',
    icon: Landmark,
  },
  {
    id: 'mobile-balance',
    name: 'Mobile Balance',
    description: 'Instant balance top-up while you shop.',
    icon: PhoneCall,
  },
]
