/**
 * SAMPLE CONTENT — not real customer reviews.
 * The Testimonials section renders these with a visible "Sample" label per
 * project instructions. Replace with real, attributed customer feedback
 * (or remove the section) before launch.
 */
export interface Testimonial {
  id: string
  quote: string
  name: string
  context: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sample-1',
    quote:
      'This is placeholder review text showing how a customer quote will be laid out on the live site.',
    name: 'Sample Customer',
    context: 'Placeholder — replace with a real review',
  },
  {
    id: 'sample-2',
    quote:
      'Another placeholder quote, sized to preview how longer feedback wraps within the card.',
    name: 'Sample Customer',
    context: 'Placeholder — replace with a real review',
  },
  {
    id: 'sample-3',
    quote: 'A shorter placeholder quote for layout variety.',
    name: 'Sample Customer',
    context: 'Placeholder — replace with a real review',
  },
]
