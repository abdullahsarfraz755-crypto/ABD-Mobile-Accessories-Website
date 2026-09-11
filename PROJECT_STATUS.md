# PROJECT_STATUS.md — ABD Mobile Accessories Website

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

- **Phone number, WhatsApp number, Google Maps link** — not invented per instructions. Live in `src/data/contact.ts`, clearly marked `PLACEHOLDER`. CTAs are wired but need real values.
- **Product photography** — no real photos supplied. Product cards use designed placeholder tiles (gradient + category icon), not fake stock/AI photos pretending to be real products. Swap in `src/data/products.ts` (`image` field).
- **Testimonials** — clearly labeled as sample/placeholder content, not presented as real reviews, per instructions.

## Phase progress

- [x] Phase 0 — Project audit
- [x] Phase 1 — Skills/tools audit
- [x] Phase 2 — Design direction (see DESIGN_SYSTEM.md)
- [x] Phase 3 — Site structure/sections (all 11 sections built: Hero, Brand Intro, Categories, Featured Products, 3D Showcase, Services, Why ABD, Gaming, Testimonials, Contact, Footer)
- [x] Phase 4 — Motion design (GSAP + Lenis, scroll reveals, magnetic buttons, staggered hero text)
- [x] Phase 5 — 3D system (procedural studio scene: Hero + dedicated scroll-driven Showcase)
- [x] Phase 6 — Product data architecture (`src/data/products.ts`)
- [x] Phase 7 — Responsive design (desktop verified; see "Known issue" below for one mobile-specific 3D decision)
- [x] Phase 8 — Conversion design (WhatsApp/Call/Directions CTAs, product inquiry links)
- [~] Phase 9 — Accessibility & performance (skip link, focus states, reduced-motion support, frameloop gating done; full Lighthouse pass not yet run)
- [ ] Phase 10 — SEO (meta/OG/structured data not yet added)
- [~] Phase 11 — Visual QA pass (desktop verified section-by-section in browser; mobile verified for layout, 3D intentionally falls back below 560px — see below)
- [ ] Final quality gate / production build verification

## Known issue — 3D hero/showcase disabled below 560px viewport width

While QA-ing on an emulated 375px mobile viewport, the WebGL canvas mounted and its render loop ran (confirmed via direct pixel readback and frame-callback logging) but produced zero visible output — the canvas stayed fully transparent despite correct sizing. This was reproducible after a clean dev-server restart and cache clear, so it wasn't only leftover HMR state. Root cause wasn't fully isolated (candidates: a WebGL/software-rendering quirk specific to the narrow canvas + dpr scaling combination, or something specific to the sandboxed testing browser).

Rather than ship a hero/showcase section that might render blank on some real phones, `useMinViewportWidth(560)` (`src/hooks/useMinViewportWidth.ts`) gates both `HeroScene` and `ShowcaseScene` to fall back to the static `ScenePoster` component below 560px width. This is a defensible product decision on its own (many premium sites simplify hero WebGL scenes on small phones for battery/perf), and `ScenePoster` was designed to look intentional, not like a broken placeholder. **Follow-up recommended:** test on a real phone; if the 3D renders fine there, the threshold can be lowered or removed.

See `TODO.md` for the granular task list and `DESIGN_SYSTEM.md` for the visual identity spec.
