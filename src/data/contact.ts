/**
 * PLACEHOLDER CONTACT INFO
 * Per project instructions, no phone number, WhatsApp number, or Maps link
 * has been invented. Replace every "PLACEHOLDER" value below with the real
 * one before launch — see TODO.md.
 */
export const CONTACT = {
  brandName: 'ABD Mobile Accessories',
  addressLine1: 'Nishat Colony Main Road',
  addressLine2: 'Front of Rabbani Masjid',
  city: 'Lahore, Pakistan',

  // TODO: replace with the real WhatsApp number, digits only, country code first (e.g. 923001234567)
  whatsappNumber: '',
  // TODO: replace with the real phone number for tel: links
  phoneNumber: '',
  // TODO: replace with the real Google Maps share link for this location
  mapsUrl: '',

  social: {
    // TODO: add real profile URLs
    instagram: '',
    facebook: '',
    tiktok: '',
  },
} as const

export const whatsappHref = (message = "Hi! I'm interested in your accessories.") =>
  CONTACT.whatsappNumber
    ? `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
    : undefined

export const phoneHref = () => (CONTACT.phoneNumber ? `tel:${CONTACT.phoneNumber}` : undefined)
