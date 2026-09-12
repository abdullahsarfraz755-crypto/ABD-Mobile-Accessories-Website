# PROJECT_STATUS.md — ABD Mobile Accessories Website

## Rebrand (2026-09-12)

The business owner issued a full rebrand/content directive after the initial build: remove the black/gold luxury identity, remove all non-mobile-accessory content (computer accessories, financial services, gaming), switch to a white/blue/lime-green/dark-navy identity matched to the real ABD logo, and replace the placeholder product catalog with the 14 real products and prices supplied. That work is complete — see "Phase progress" below and `DESIGN_SYSTEM.md` / `TODO.md` for specifics. Everything under "Phase 0" through the original "Known issue" section below is preserved as history of the first build; it no longer describes the current visual identity.

## Phase 0 — Audit (complete)

**Before this session:** working directory was completely empty. No git repo. No Node.js, npm, or Git installed anywhere on the machine.

**Actions taken:**
- Installed Node.js LTS (v24.19.0) via `winget install OpenJS.NodeJS.LTS`
- Installed Git (v2.55.0) via `winget install Git.Git`
- `git init` in project root, local identity set to abdullahsarfraz755@gmail.com
- Scaffolded with `npm create vite@latest . -- --template react-ts`
- Pinned `react`/`react-dom` to `19.2.8` exactly (Vite's default `^19.2.8` was resolving to `19.3.0`, which breaks `@react-three/fiber@9.7.0`'s peer range `>=19 <19.3`)

## Stack (decided)

| Concern | Choice | Why |
|---|---|---|
| Build tool | Vite | Fast HMR, minimal config, standard for modern React |
| Framework | React 19 + TypeScript | Type safety for a maintainable product data model; matches brief |
| Routing | React Router v7 | Single-page brand site now, room to add a full product/catalog page later without restructuring |
| 3D | Three.js + @react-three/fiber + @react-three/drei | Declarative R3F keeps the 3D scene co-located with React state (scroll progress, reduced-motion) instead of a separate imperative Three.js app |
| Animation | GSAP + ScrollTrigger | Industry-standard scroll-driven animation, precise easing/stagger control needed for the cinematic motion language |
| Smooth scroll | Lenis | Pairs cleanly with GSAP ScrollTrigger, lightweight |
| Icons | lucide-react | Clean, consistent, non-generic line icon set |
| Styling | Plain modern CSS (CSS variables + CSS Modules) | Full control over a custom, non-template visual identity — no Tailwind's default utility "look" to fight against |
| Fonts | Self-hosted (see DESIGN_SYSTEM.md) | Avoids default Inter/Roboto/system-font AI-generic appearance |

**Not used and why:** Tailwind (fights a bespoke luxury aesthetic more than it helps), a CMS/backend (no requirement, adds complexity), a component library like MUI/Chakra (would impose its own visual identity).

## Phase 1 — Skills/tools audit (complete)

Available and used:
- Claude Browser preview tools — used for live visual QA of the dev server throughout the build (mandatory per brief Phase 11)
- `dataviz`/`artifact-*` skills — not applicable (this is a real codebase, not an Artifact)
- `code-review` / `security-review` skills — available, will run before declaring completion

Not available / not applicable:
- No Figma or design-file import was provided — visual identity is being defined directly in code per Phase 2 of the brief
- No real product photography or 3D model (GLTF) assets were supplied — see "Known placeholders" below

## Known placeholders (must be replaced by the user before launch)

*(Superseded by the 2026-09-12 rebrand — the real WhatsApp number and product catalog are now wired in. Remaining gaps are tracked in `TODO.md`: store address/Maps link, social profile URLs, and photos for the 7 products the owner hasn't supplied images for yet.)*

## Phase progress (original build)

- [x] Phase 0 — Project audit
- [x] Phase 1 — Skills/tools audit
- [x] Phase 2 — Design direction (superseded — see Rebrand)
- [x] Phase 3 — Site structure/sections (superseded — see Rebrand)
- [x] Phase 4 — Motion design (GSAP + Lenis, scroll reveals, magnetic buttons, staggered hero text)
- [x] Phase 5 — 3D system (procedural studio scene: Hero + dedicated scroll-driven Showcase)
- [x] Phase 6 — Product data architecture (`src/data/products.ts`, rebuilt for the real catalog — see Rebrand)
- [x] Phase 7 — Responsive design (desktop + mobile verified; see "Known issue" below for one mobile-specific 3D decision)
- [x] Phase 8 — Conversion design (WhatsApp CTAs, product inquiry links)
- [~] Phase 9 — Accessibility & performance (skip link, focus states, reduced-motion support, frameloop gating, route/scene code-splitting done; full Lighthouse pass not yet run)
- [x] Phase 10 — SEO (title/description/OG meta added, favicon added)
- [x] Phase 11 — Visual QA pass (desktop + mobile verified section-by-section in browser after rebrand; production build passes)

## Rebrand phase progress (2026-09-12)

- [x] Removed black/gold theme; new white/blue/lime/navy design tokens
- [x] Removed computer accessories, financial services, gaming sections/categories/copy
- [x] Business name corrected everywhere to "ABD Mobile Accessories"
- [x] Centralized WhatsApp config + dynamic per-product messages + floating WhatsApp button
- [x] Official 14-product catalog with exact prices, real photos where supplied, honest placeholders elsewhere
- [x] Shop page (search + category filters) and Product Detail page, with routing
- [x] Back Sheet 3D showcase with a real design texture-mapped onto the phone
- [x] Production build verified (`npm run build` succeeds, route/scene code-split)
- [ ] Store address / Google Maps / social links — not provided this round, left blank (see TODO.md)

## Known issue — 3D hero/showcase disabled below 560px viewport width

While QA-ing on an emulated 375px mobile viewport, the WebGL canvas mounted and its render loop ran (confirmed via direct pixel readback and frame-callback logging) but produced zero visible output — the canvas stayed fully transparent despite correct sizing. This was reproducible after a clean dev-server restart and cache clear, so it wasn't only leftover HMR state. Root cause wasn't fully isolated (candidates: a WebGL/software-rendering quirk specific to the narrow canvas + dpr scaling combination, or something specific to the sandboxed testing browser).

Rather than ship a hero/showcase section that might render blank on some real phones, `useMinViewportWidth(560)` (`src/hooks/useMinViewportWidth.ts`) gates both `HeroScene` and `ShowcaseScene` to fall back to the static `ScenePoster` component below 560px width. This is a defensible product decision on its own (many premium sites simplify hero WebGL scenes on small phones for battery/perf), and `ScenePoster` was designed to look intentional, not like a broken placeholder. **Follow-up recommended:** test on a real phone; if the 3D renders fine there, the threshold can be lowered or removed.

See `TODO.md` for the granular task list and `DESIGN_SYSTEM.md` for the visual identity spec.
