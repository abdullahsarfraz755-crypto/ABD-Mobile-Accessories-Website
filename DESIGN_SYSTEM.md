# DESIGN_SYSTEM.md — ABD Mobile Accessories

## Concept

**"The Vault."** A dark, quiet showroom where a small number of objects are lit carefully and given room to breathe. Not a black page with gold text on it — gold is treated as a *material* (cast in thin rules, brushed on icon strokes, warmed into gradients on key surfaces), not a paint color splashed across the UI. Most of the interface stays graphite/charcoal with restrained light; gold appears only at decision points (CTAs, active states, price, key numerals) so it keeps its value as a signal.

Reference points blended, not copied: Apple's product-page restraint and typographic confidence; a jewelry showroom's use of negative space and directional light; automotive configurator sites' materials-and-lighting treatment of a single hero object; the unhurried pacing of a commercial's opening shot.

## Color system

Defined as CSS custom properties in `src/styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--void` | `#050506` | Page background, deepest layer |
| `--black` | `#0a0a0c` | Primary background |
| `--graphite` | `#141417` | Section alternation, panels |
| `--charcoal` | `#1c1c20` | Cards, raised surfaces |
| `--surface` | `#232328` | Hover/active surface state |
| `--border` | `rgba(245,243,239,0.08)` | Hairline dividers |
| `--border-strong` | `rgba(245,243,239,0.16)` | Emphasized borders, focus rings (non-color part) |
| `--gold-100` | `#f2dfa8` | Bright gold — text on dark, glow highlights |
| `--gold-300` | `#d9b876` | Core gold — icon strokes, CTA fill |
| `--gold-500` | `#b6904f` | Deeper gold — gradients, pressed states |
| `--gold-900` | `#5c4a29` | Gold used as a shadow/depth tone, never text |
| `--ink` | `#f5f3ee` | Primary text (warm off-white, not pure #fff) |
| `--ink-70` | `rgba(245,243,238,0.72)` | Secondary text |
| `--ink-45` | `rgba(245,243,238,0.46)` | Tertiary/meta text |

Metallic gold gradient (buttons, key numerals, dividers):
`linear-gradient(135deg, #b6904f 0%, #f2dfa8 45%, #d9b876 100%)`

Gold is capped to: primary CTA fills, price figures, active nav indicator, icon accents on hover, the hairline that separates hero from content. It never fills a full section background.

## Typography

Two-family pairing, both self-hosted via Fontsource (no runtime CDN dependency):

- **Display — Fraunces (variable).** An editorial serif with a soft, warm optical-size axis. Used for H1–H3, pull quotes, and the price figure. Gives the "showroom" warmth that a geometric sans alone can't — this is the single biggest lever against a generic-tech-site look.
- **Body/UI — Manrope (variable).** A geometric sans with slightly rounded terminals — modern and legible without reading as Inter/Roboto/system-ui. Used for body copy, nav, buttons, labels.

Scale (fluid via `clamp()`, defined in tokens.css): `--fs-hero`, `--fs-h1`…`--fs-h4`, `--fs-body-lg`, `--fs-body`, `--fs-small`, `--fs-micro`.

Rule: headings set in Fraunces are never in all-caps (the serif's warmth is lost); Manrope labels/eyebrows use small-caps-style letter-spacing + uppercase instead.

## Spacing, radius, elevation

- 8px base spacing scale: `--space-1` (4px) through `--space-16` (128px), fluid section padding via `clamp()`.
- Radius: `--radius-sm` 6px (inputs/badges), `--radius-md` 14px (cards), `--radius-lg` 28px (hero panels/large media).
- Shadows are warm, not neutral-gray: `--shadow-card`, `--shadow-lifted`, `--shadow-glow-gold` (a soft gold-tinted glow used sparingly behind the 3D hero and on primary CTA hover only).

## Motion language

Defined once in `src/lib/motion.ts` (durations/easings) and `src/lib/gsap.ts` (plugin registration), reused everywhere:

- Standard ease: `power3.out` for entrances, `power2.inOut` for scroll-linked transforms.
- Durations: micro-interactions 150–250ms, section reveals 600–900ms, hero sequence up to 1.6s but staggered so the page is interactive well before it finishes.
- Stagger: text reveals split by line (not by character — character-stagger reads as a template effect), 60–90ms stagger.
- Scroll: Lenis drives smooth scroll; GSAP ScrollTrigger reads Lenis's scroll position (synced in `useLenis`) rather than running two competing scroll systems.
- Hover: buttons get a magnetic pull (translate toward cursor, capped radius) plus a gold underglow — no bounce, no rotation, no confetti-style flourish.
- `prefers-reduced-motion`: all entrance animations collapse to opacity-only fades, the 3D scene stops auto-rotating and scroll-camera-drive is disabled (static hero framing), Lenis smooth scroll is disabled in favor of native scroll.

## 3D direction

No purchased/found 3D model is used (none was supplied, and fetching a random third-party GLTF would be an unlicensed asset in a commercial site). Instead: a **procedural studio scene** — a rounded-box "device" primitive with a physically-based material (clearcoat, low roughness) standing in for a phone, orbited by a small set of simplified accessory forms (case, earbud capsule, cable coil) as separate meshes, lit with a 3-point studio rig (key/fill/rim) plus a faint environment map for reflections, floating dust-mote particles at very low opacity, and a scroll-driven camera dolly (GSAP ScrollTrigger driving camera position/FOV, not object spin-in-place). This reads as an intentional abstract "product-in-light" composition rather than a placeholder cube.

## Anti-slop checklist (self-imposed, checked in Phase 11)

- No purple/blue SaaS gradients anywhere.
- No glassmorphism except one deliberate use (sticky nav backdrop-blur) — not stacked on every card.
- No Inter/Roboto/system-ui as a shipped font.
- No stock-photo-style imagery; placeholders are designed tiles, clearly swappable, never pretending to be product photography.
- No decorative glow/blob shapes without a lighting/material justification tied to the 3D concept.
- Every card in a given row shares one interaction pattern — no mixing hover styles within the same grid.
