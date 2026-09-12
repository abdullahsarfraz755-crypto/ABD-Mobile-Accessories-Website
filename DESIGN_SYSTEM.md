# DESIGN_SYSTEM.md — ABD Mobile Accessories

> **Rebrand note (2026-09-12):** The original black/graphite/gold "studio showroom" identity documented here previously has been fully replaced per the business owner's directive. This file now documents the current (second) identity. Nothing below describes gold/black — if you see either in code, it's a bug.

## Concept

A clean, white-canvas mobile accessories storefront: **Apple-level simplicity + everyday tech energy**, built around the brand's own white / blue / lime-green / dark-navy relationship (matched to the ABD reference logo colors). White is the dominant surface; navy carries weight (headings, footer, dark showcase stage); blue is the primary action color; lime green is a strategic accent (badges, active states, one dedicated dark CTA), never a flood color.

## Color system

Defined as CSS custom properties in `src/styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--white` | `#ffffff` | Page background |
| `--surface` | `#f4f7fc` | Section alternation, card backgrounds |
| `--navy` | `#0b1f3a` | Headings, footer bg, dark showcase stage |
| `--blue-500` | `#0b63f6` | Primary buttons, links, active nav |
| `--blue-gradient` | `linear-gradient(135deg,#2f7bff,#0b63f6,#0847b8)` | Primary CTA fill |
| `--lime-500` | `#a3e635` | Accent CTA, badges, active progress dots |
| `--ink` / `--ink-70` / `--ink-45` | navy at 100/72/50% | Text hierarchy on light surfaces |
| `--on-dark` / `--on-dark-70` | near-white | Text on navy sections (Footer, Contact, Back Sheet Showcase) |

## Typography

- **Display — Space Grotesk (variable).** Geometric, tech-forward sans used for all headings and the price figure. Self-hosted via `@fontsource-variable/space-grotesk`.
- **Body/UI — Manrope (variable).** Same as before — clean, modern, not a default system font.

The previous identity's serif (Fraunces) is gone; the brand no longer has a "luxury jewelry showroom" undertone.

## 3D system

Same procedural Three.js/React Three Fiber approach as before, retextured:
- Hero device: navy-blue glass-metal body, blue emissive screen, lime accent band, white case/earbuds, blue cable, lime sparkles, light reflective floor.
- **Back Sheet Showcase** (`src/components/sections/BackSheetShowcase.tsx` + `src/three/ShowcaseDevice.tsx`): the old generic "Precision Fit / Materials / Durability" showcase was replaced with a back-sheet-specific one. A real customer-supplied back-sheet design (`/assets/products/back-sheet/design-2-map-color.jpg`) is loaded as a texture and mapped onto the phone's back panel via `meshStandardMaterial map=`, so the 3D scene shows an actual real design applied to a phone — not a fabricated graphic. Staged on a dark navy background for cinematic contrast against the white page.
- Both scenes fall back to a static `ScenePoster` (also retextured navy/blue) below 560px viewport width or when WebGL is unavailable — see `PROJECT_STATUS.md` for why.

## Anti-slop checklist (unchanged in spirit, updated to the new palette)

- No black+gold anywhere.
- No purple/pink/orange/neon accents.
- No fake reviews/ratings/discounts/stock counts/specs — see `src/data/products.ts` header comment.
- Product photography is either real (owner-supplied) or an honest "Photo coming soon" placeholder — never an AI-generated stand-in presented as real.
