# TODO.md

## Before launch — real info still needed
- [ ] Store address / Google Maps link (owner has not provided one this round — `CONTACT` fields left blank, no Contact/location map section on the site until supplied)
- [ ] Social media profile URLs (Instagram/Facebook/TikTok — footer icons currently point to `#`)
- [ ] Real product photos for: Back Pouch, Power Bank, Airbuds Pro 2 (White & Black), Magnet Buzzer (both variants), Airbuds Pro 3, Airbuds Pro 5 — these currently show an honest "Photo coming soon" placeholder in `src/data/products.ts`. Stock photos were deliberately **not** sourced for these — see "Image sourcing" below.
- [ ] Confirm the picked back-sheet design used in the 3D showcase texture (`design-2-map-color.jpg`) is one the owner wants front-and-center, or swap for another from `/public/assets/products/raw/back-sheet/`

## Image processing (2026-09-13)

- Raw owner-supplied photos moved to `/public/assets/products/raw/<slug>/` (kept, untouched, as the source of truth).
- The site now displays a processed version from `/public/assets/products/studio/<slug>/`: center-cropped to a consistent square and given a soft radial vignette that fades busy backgrounds (shop shelving, plastic wrap) toward white — done with a local .NET/PowerShell script (`Add-Type -AssemblyName System.Drawing`), not an AI image tool. **No pixels of the product itself are altered** — this is crop + a white fade overlay, not background removal or relighting.
- **Honest limitation:** this is not full studio photography. Several photos still show a hand holding the product (inherent to how they were shot) — a vignette can't remove that without fabricating what's underneath, which would misrepresent the product. True background removal would need either a working browser extension (Claude in Chrome wasn't connected this session) or the owner having the products re-shot flat/isolated.

## Image sourcing (2026-09-13)

For the 7 products with no owner photo, no stock image was sourced online. Reasoning: these are generic reseller names (Airbuds Pro 2/3/5, Magnet Buzzer, Power Bank) with no stated brand/model — there is no way to confirm any web image is the *exact* item this store sells rather than a similar-looking unit from a different factory, so per the standing "no random similar product" rule they default to the "Photo coming soon" placeholder instead.

## Rebrand completed this session (2026-09-12)
- [x] Removed the black/graphite/gold identity entirely — new white/blue/lime/navy system
- [x] Removed all computer/laptop accessory content and categories
- [x] Removed all financial-service content (Easypaisa, JazzCash, Easy Load, Mobile Balance, Bank Transfer, etc.)
- [x] Removed Gaming section and its categories (not part of the real 14-product catalog)
- [x] Removed Testimonials section (not requested in the new site architecture; avoids implying real reviews exist)
- [x] Business name corrected to "ABD Mobile Accessories" everywhere
- [x] Centralized WhatsApp config (`src/data/contact.ts`) — number `923245696942`, dynamic per-product messages
- [x] Floating WhatsApp button on every page
- [x] Official 14-product catalog with exact names/prices in `src/data/products.ts`
- [x] Real product photography organized into `/public/assets/products/<slug>/` and wired into product cards/detail pages
- [x] Routing added (react-router-dom): `/`, `/shop` (search + category filters), `/product/:id`
- [x] Back Sheet Showcase: dedicated 3D section with a real design texture-mapped onto the phone back
- [x] Route- and scene-level code splitting (Three.js and the Shop/Product pages no longer bloat the initial bundle)
- [x] SEO title/meta updated, new favicon

## Known limitation (see PROJECT_STATUS.md for detail)
- Hero/Showcase 3D scenes are intentionally disabled below 560px viewport width (falls back to a static poster) due to an unresolved WebGL rendering quirk found during testing on a narrow viewport. Worth re-testing on a real phone.
