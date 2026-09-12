/**
 * Single source of truth for contact/WhatsApp info. Every CTA in the app
 * must read from here — never hard-code the number in a component.
 */
export const CONTACT = {
  brandName: 'ABD Mobile Accessories',

  // Official number, digits only, no leading zero — WhatsApp requires the
  // country code first.
  phoneDisplay: '0324 5696942',
  phoneDial: '03245696942',
  whatsappNumber: '923245696942',

  // Store address — not currently provided by the owner. Left blank
  // deliberately rather than invented; fill in when available.
  addressLine1: '',
  addressLine2: '',
  city: '',
  mapsUrl: '',

  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
} as const

export function whatsappHref(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function productWhatsappMessage(productName: string): string {
  return `Hello ${CONTACT.brandName}, I am interested in ${productName}. Please share more details.`
}

export function phoneHref(): string {
  return `tel:${CONTACT.phoneDial}`
}
