# FINAL SPEC — Premium Portfolio, Liquid Glass Design System

> This is the complete pre-implementation specification. Creative direction defines
> intent; concrete values define calibration. Values marked as "starting points" may
> be tuned by eye — but never replaced with library defaults or generic CSS easings.

---

# 1. ROLE

You are acting simultaneously as:

1. A senior product designer specialized in Apple-inspired interaction design.
2. A senior frontend engineer specialized in React/Next.js, TypeScript and high-performance animation.
3. A motion designer specialized in fluid UI interactions.
4. A creative director for premium developer portfolios.

Your objective: design and implement a highly polished personal portfolio website for a senior-level frontend software engineer.

This is NOT a generic developer portfolio. The website should feel like a premium digital product: minimal, cinematic, tactile, highly responsive and extremely fluid.

The visual language is strongly inspired by Apple's **Liquid Glass** design system (iOS 26 / macOS Tahoe, WWDC 2025), but it MUST NOT be a pixel-for-pixel recreation of Apple's website or interface. Use Liquid Glass principles as the conceptual foundation, then reinterpret them into an original portfolio identity.

---

# 2. DESIGN REFERENCES

Study these before implementing anything. Use them to understand **principles, not layouts**. Do not imitate screenshots.

## Primary (the canonical source of the material)

- Apple Human Interface Guidelines — Materials:
  https://developer.apple.com/design/human-interface-guidelines/materials
- Apple WWDC25 — Meet Liquid Glass:
  https://developer.apple.com/videos/play/wwdc2025/219/
- Apple Liquid Glass documentation:
  https://developer.apple.com/documentation/technologyoverviews/liquid-glass

## Secondary (quality benchmarks for animation, pacing, editorial layout)

- godly.website — filter portfolios; study easing curves and scroll pacing
- awwwards.com — Site of the Day; the interaction quality bar
- minimal.gallery / dark.design — restrained dark editorial aesthetics
- mobbin.com — real iOS 26 screenshots: authentic Liquid Glass behavior
- Framer portfolio gallery: https://www.framer.com/gallery/categories/portfolio/
- Awesome Liquid Glass (technique catalog): https://github.com/carolhsiaoo/awesome-liquid-glass

From all references, study: hierarchy, spatial composition, translucency, depth, lensing, refraction, adaptive contrast, lighting, shadows, movement, scrolling behavior, interaction feedback, typography, negative space, responsive behavior.

The final result must feel original.

---

# 3. CORE CREATIVE DIRECTION

The website should communicate:

> "An engineer who understands technology deeply, but also cares about product quality, interaction design and the details users actually experience."

**Avoid the visual language of:** generic developer portfolios, template-based SaaS landing pages, excessive gradients, neon, generic dark-mode portfolios, random 3D objects, excessive glass cards, dashboard layouts, overly decorative interfaces.

**The website should feel closer to:**

Apple product presentation + premium creative portfolio + modern editorial website + high-end software interface

— rather than "developer portfolio template".

---

# 4. LIQUID GLASS PHILOSOPHY

Do NOT simply add `backdrop-filter: blur(...)` to every card. Liquid Glass is a **material system** with five conceptual layers:

1. Background environment
2. Content layer
3. Functional glass layer
4. Light/reflection layer
5. Interaction layer

Glass sits **above** content rather than replacing it. The real Apple material has three distinct properties — implement all three, not just blur:

1. **Lensing (edge refraction):** glass edges optically bend the content behind them, like a convex lens. The center stays clear; distortion concentrates in an ~8–14px ring at the inner edge.
2. **Dynamic specular illumination:** a thin (1px) highlight along the top edge, behaving like light hitting a physical object. It reacts to pointer position with slight inertia.
3. **Background adaptation:** the glass darkens over light content, lightens over dark content; background saturation is AMPLIFIED (saturate ~160–180%), never washed out.

**Hard rules:**

- Do NOT put glass around every section.
- Do NOT make every project a glass card.
- Do NOT create glass-on-glass stacking — ever.

The strongest glass treatment is reserved for: primary navigation, floating controls, interactive buttons, selected project controls, contextual UI, small interactive surfaces, occasional hero elements.

The actual portfolio content remains visually clear and dominant. This follows Apple's own guidance: Liquid Glass is a functional/navigation layer.

---

# 5. VISUAL SYSTEM

## 5.1 Background environment

NOT `background: #000000`. Create a deep, sophisticated atmosphere:

- extremely subtle gradients and low-frequency light fields
- blurred ambient shapes with extremely soft color variation
- depth created through **light**, not decoration
- almost black at first glance; subtle color becomes perceptible on interaction/scroll

Think: **"a dark room containing a softly illuminated piece of glass."**

Avoid: cyberpunk aesthetics, purple-blue SaaS gradients, obvious mesh gradients.

**Texture:** one full-page grain layer — SVG `feTurbulence`, opacity ~0.03, `mix-blend-mode: overlay`, `pointer-events: none`. This kills gradient banding in the dark ambient background. One layer for the whole page, not per-section.

**Ambient motion:** background light fields move on 15–30 second cycles (breathe, drift, shift position), never looping in an obviously repetitive way. Background parallax, if used, moves at ~0.3x scroll velocity.

## 5.2 Color system

Restrained palette:

- **Primary:** near-black / charcoal
- **Secondary:** off-white / soft white
- **Glass:** very subtle white translucency
- **Accent:** ONE carefully selected accent color, used sparingly — hover states, selected states, subtle ambient lighting, project metadata, small interaction feedback. Never dominant.

Color should feel like **light passing through the interface**, not colored UI components.

## 5.3 Typography

One of the most important elements. Modern grotesk / system-like sans-serif:

- Font stack: `-apple-system, "SF Pro Display", Inter, sans-serif`
- Display type: tight tracking, `letter-spacing: -0.02em` to `-0.04em`
- Excellent hierarchy: large display typography, restrained body, subtle weight differences

Avoid: text filling the entire viewport, excessive font weights, unnecessary italics, gradient text, excessive uppercase.

The typography should feel editorial and premium.

## 5.4 Layout philosophy

- Generous whitespace — the interface breathes; do not fill every part of the viewport
- Intentional asymmetry, controlled alignment, occasional oversized typography
- Subtle grid structures, variable section heights
- Composition should feel **designed**, not generated from a component library

---

# 6. GLASS MATERIAL SPECIFICATION

## 6.1 Design tokens (starting points — tune by eye, keep coherent)

```css
--glass-bg:         rgba(255, 255, 255, 0.06);   /* range 0.04–0.12 by context */
--glass-blur:       24px;                          /* range 20–40px by context */
--glass-saturate:   180%;
--glass-border:     1px solid rgba(255, 255, 255, 0.14);
--glass-highlight:  inset 0 1px 0 rgba(255, 255, 255, 0.25); /* top specular edge */
--glass-shadow:     0 8px 32px rgba(0, 0, 0, 0.35); /* soft, broad, low-opacity */
--radius-capsule:   999px;   /* nav, buttons */
--radius-card:      28px;    /* larger surfaces — generous, continuous curvature */
```

Blur must ALWAYS be paired with saturation — blur alone reads as "dirty glass".

## 6.2 Lensing technique (the real refraction)

- **Primary (Chromium):** SVG filter with `feImage` + `feDisplacementMap` using a radial displacement map, applied as `backdrop-filter: url(#lens)`. Distortion confined to the 8–14px inner-edge ring; center stays clear. Feature-detect — this is Chromium-only.
- **Fallback (Safari/Firefox — and the DEFAULT on mobile regardless of support, for performance):** `backdrop-filter: blur(24px) saturate(180%)` + the inset top highlight + gradient border.
- **No backdrop-filter support** (`@supports not (backdrop-filter: blur(1px))`): solid `rgba(20, 20, 22, 0.9)` surface.

Distortion must remain restrained — the perception that the background is optically affected, never a fisheye. If true distortion harms performance or compatibility, use the convincing approximation. Priority order: **1. performance, 2. readability, 3. smoothness, 4. visual fidelity.**

## 6.3 Lighting model

Treat the page as if there is one invisible light source interacting with glass edges, the ambient background, hover surfaces and project imagery. When the pointer moves, the perceived light direction shifts slightly — the illusion that the glass is physically present. Highlights are always very subtle.

## 6.4 Depth

Create depth through: scale, blur, opacity, shadow, light, parallax, translucency — in combination. Do not rely primarily on drop shadows. Depth should feel **optical**, not like card elevation.

---

# 7. MOTION SYSTEM

## 7.1 Constants (never replace with defaults)

- **Default CSS ease:** `cubic-bezier(0.32, 0.72, 0, 1)` — long deceleration, Apple-like. Never `ease`, `ease-in-out`, or `linear` (unless linearity is intentional, e.g. marquee).
- **Springs (Motion/Framer Motion):** stiffness 260, damping 22, mass 1 for UI feedback; stiffness 120, damping 20 for larger elements. Avoid excessive bounce.
- **Pointer-following effects** (glare, ambient light, magnetic buttons): lerp factor 0.06–0.10 per frame, computed in ONE shared `requestAnimationFrame` loop that writes CSS custom properties — never one loop per element.
- **Smooth scroll (optional):** Lenis, lerp 0.1, wheelMultiplier 1. Scroll must ALWAYS respond immediately — no scroll-jacking, no section snapping.

## 7.2 Motion hierarchy

| Layer | Duration |
|---|---|
| Micro interaction | 100–250ms |
| UI transition | 250–500ms |
| Section transition | 500–900ms |
| Ambient animation | 10–30s+ |

## 7.3 Principles

- No linear movement unless intentional; prefer spring physics
- Different durations for different visual layers: large elements move slower than small UI
- Background movement extremely slow; interaction feedback fast
- Scroll animations interruptible and coherent under fast scrolling
- Avoid abrupt opacity changes

## 7.4 Reduced motion (MANDATORY)

Respect `prefers-reduced-motion: reduce`: remove parallax, cursor-following effects and ambient loops (static positions); reduce spring movement; simplify transitions to fades ≤200ms. The website must remain beautiful without animation.

---

# 8. PAGE STRUCTURE

Single immersive experience (anchor routes):

1. Floating navigation
2. Hero
3. Selected work
4. Engineering philosophy / capabilities
5. Experience
6. Technical interests
7. About
8. Contact
9. Footer

Sections must NOT look structurally identical — each has its own visual rhythm. The user should feel they are moving through one continuous visual space: section transitions happen through gradual background-lighting changes, large typography moving subtly, blurred shapes, masked reveals, soft opacity changes and scale interpolation — not through every section dramatically animating into view.

## 8.1 Navigation

Floating Liquid Glass capsule, top-center, detached from viewport edges (iOS 26 pattern):

- Translucent material, backdrop blur + saturation, extremely subtle border, soft shadow, subtle inner top highlight
- **Scroll adaptation (almost imperceptible, ~600ms transitions):** contrast adapts to background content, shadow slightly strengthens, glass opacity subtly changes; navigation stays visually separated from content
- **Active-link indicator:** a glass "droplet" that SLIDES between items with spring physics (not a fade — it travels, deforming slightly mid-journey, ~scaleX 1.15 at the midpoint)
- Hover on an item: specular highlight appears on its top edge

## 8.2 Hero

Occupies ~80–100vh. Immediately communicates: name + role + short positioning statement + primary interaction.

Content concept (improve the copy if better copy can be produced):

> **Enrico Secco**
> Frontend Software Engineer
> "Building interfaces where engineering, performance and product experience meet."

**Motion:**

- Headline reveal by MASK: each line rises from inside `overflow: hidden`, stagger 90ms, duration ~1.1s, default ease, with simultaneous `blur(8px) → blur(0)`
- Subtitle and CTA enter 300ms later: `translateY(24px) → 0` + fade
- Ambient light field alive before any interaction: slow drift, 15–30s cycles, never obviously looping
- Primary CTA: glass capsule with **magnetic effect** (attraction radius ~80px, button displaces up to ~30% of cursor distance, returns with spring) + internal glare following the pointer with inertia (lerp ~0.08)
- Scroll indicator: thin vertical line pulsing (`scaleY`, origin top, ~2s loop)

## 8.3 Selected work (the centerpiece)

NOT a grid of identical cards. Editorial, case-study presentation with varying layouts:

- Project 01: large visual occupying most of the viewport
- Project 02: asymmetrical composition
- Project 03: horizontal scrolling or split composition

Each project communicates: large visual + title + short description + technology + role + impact.

**Interaction on hover:**

- Image scales subtly: **1.02–1.06 max**, slow and smooth (~900ms)
- Light changes; metadata becomes slightly more prominent; a glass control appears; cursor becomes contextual ("View project →")
- Hovering one project quiets its siblings (opacity ~0.55, ~400ms) — focus through contrast
- Optional restrained 3D tilt on the visual: max 6°, perspective 1000px, lerped, spring return — only if it stays subtle

**Viewport entry:** batched via IntersectionObserver/ScrollTrigger — `translateY(60px)` + fade + `blur(6px) → 0`, stagger 120ms, once. Entry animations must reserve layout space (zero CLS).

**Case study detail** — each important project communicates: Problem → Technical challenge → Decision → Implementation → Result. Keep the main page visually concise; use progressive disclosure (expandable case study, modal, dedicated route or contextual panel) instead of long paragraphs on the main page.

## 8.4 Experience

NOT a generic vertical timeline. Editorial "focus stack": each company/role is a large typographic block; the current role in focus is visually emphasized while others become quieter; metadata shifts opacity with subtle transitions as the user moves through.

## 8.5 Engineering / capabilities

Categories (Frontend: React, TypeScript, Next.js · Testing: Playwright, Cypress, Jest · Architecture: GraphQL, API integration, design systems · Infrastructure: Docker, CI/CD, Cloud).

NOT a wall of technology logos. Typography + interaction: technology names react subtly on hover. Optionally, skill pills in two slow opposing marquee rows (~40s/loop, pause on hover, lateral `mask-image` fade) — only if it fits the restrained aesthetic.

## 8.6 Contact / Footer

- Oversized email address (`clamp(3rem, 8vw, 7rem)`) with one refined hover effect: character scramble/decode (~400ms) OR a liquid underline growing from center — pick one
- Footer in shallow glass (blur ~12px) with magnetic social links

---

# 9. POINTER & CURSOR

## 9.1 Pointer influence (desktop)

Track pointer position, but do NOT make the page follow the cursor. Pointer subtly influences: ambient light, glass reflections, hero highlight, tiny parallax offsets. Maximum displacement: **4–12px** depending on the element. Spring physics with soft acceleration/deceleration — never game-UI-like.

## 9.2 Glass reflection

On glass surfaces, a light source appears to move across the material following the pointer with slight delay. Implementation: CSS `radial-gradient` on a pseudo-element, positioned via CSS custom properties updated in the shared rAF loop, blend mode + opacity modulation. Extremely subtle — never a glossy "shiny button".

## 9.3 Custom cursor

A subtle enhancement, not a permanent giant circle:

- Normal: small, almost invisible
- Interactive: slightly expands
- Over projects: contextual label ("View project →")
- Over buttons: subtle magnetic attraction
- Follows with lerp ~0.15
- **Disabled entirely on touch devices** (`pointer: coarse`)

## 9.4 Buttons

- **Idle:** quiet, translucent, minimal border
- **Hover:** slightly brighter, glass subtly changes, highlight moves toward pointer, gentle expansion, icon shifts a few px
- **Active:** slight compression, glass appears denser, shadow shrinks, content moves slightly inward
- Spring-based, 150–350ms feedback

---

# 10. PAGE LOAD

Cinematic, no generic spinner. Sequence (~600–1200ms total):

1. Background appears
2. Typography gently fades in
3. Navigation materializes
4. Hero elements enter with slight vertical displacement
5. Ambient light becomes visible
6. Interaction enabled

**The intro must NEVER block input: if the user scrolls during the intro, skip instantly to the final state.** Do not make the user wait unnecessarily.

---

# 11. RESPONSIVE DESIGN

Mobile is a first-class experience — do NOT shrink the desktop layout.

- **Desktop:** expansive whitespace, pointer interactions, floating navigation, layered effects, asymmetrical compositions
- **Mobile:** simplified glass navigation, reduced visual effects, no custom cursor, reduced parallax, touch-friendly controls, readable typography, controlled vertical rhythm. Hover interactions (tilt/magnetic) become tap states (`scale 0.97` on active). Glass uses the lighter fallback material by default.

---

# 12. PERFORMANCE BUDGET (acceptance criteria — verify, don't assume)

Performance IS part of the portfolio. Target: 60fps interaction.

**Hard limits:**

- Max ~6 elements with active `backdrop-filter` in the viewport simultaneously
- Animate ONLY `transform` / `opacity` / `filter`; never `width`/`height`/`top`/`left` when transform works
- `will-change` added via JS only for the duration of an animation, then removed
- One shared rAF loop for all pointer-driven effects
- Lighthouse (mobile, production build): **Performance ≥ 90, CLS < 0.1**
- Text contrast over any glass surface **≥ 4.5:1 (AA)** — if it fails, raise the glass background opacity behind the text; never shrink or fade the text
- Visible focus states: 2px ring with offset — accessibility is not optional

**Avoid:** unnecessary WebGL, huge JS animation loops, excessive DOM nodes, dozens of simultaneously animated elements, expensive filters across the whole page, giant unoptimized images.

**Prefer:** CSS transforms/opacity, compositor-friendly properties, IntersectionObserver, CSS variables, GPU-friendly animation.

---

# 13. CONTENT

Use the real professional information available in the project/context. Present the engineer as: experienced, technically strong, product-minded, thoughtful about architecture, interested in modern frontend engineering, comfortable in collaborative environments.

- Do NOT exaggerate achievements. Do NOT invent companies, metrics or projects.
- Missing information → clearly marked placeholders, never fabrication.
- **Content architecture:** ALL content (name, roles, projects, experience, skills, links) lives in one typed object/JSON module in a single location. Zero content strings hardcoded inside components.

---

# 14. TECHNICAL IMPLEMENTATION

Use the existing project stack if one exists. If starting from scratch:

- **Next.js + TypeScript + React**, Tailwind CSS where appropriate
- **Animation stack (decided, not "evaluate"):** Motion (Framer Motion) for UI springs and reveals; add GSAP ScrollTrigger ONLY if complex scroll-scrubbing is actually needed. Do not install both without justification.
- Libraries only when they provide meaningful value.

**Reusable primitives** (no one-off implementations per section):

`GlassSurface` · `GlassButton` · `GlassNav` · `MagneticButton` · `Reveal` · `Parallax` · `AmbientLight` · `ProjectShowcase`

**CSS architecture:** all values flow from design tokens (`--glass-*`, `--motion-fast/medium/slow`, radii, easing). No arbitrary values scattered through the codebase — one coherent design system.

Comment only the non-obvious techniques (displacement map, glare lerp) — not what each line does.

---

# 15. IMPLEMENTATION WORKFLOW

Do NOT immediately write the entire website.

**First — investigate:**

1. Inspect the existing repository; understand the current stack
2. Identify reusable components and existing assets
3. Determine routing and styling architecture
4. Determine the animation approach

**Then — plan** (present for validation before coding): information architecture, component architecture, visual system, animation system, responsive strategy, performance strategy. Include a 5-line description of your interpretation of the art direction.

**Then — implement incrementally:**

Phase 1: global visual system → background environment → navigation → hero → core glass primitives → motion system
Phase 2: projects → experience → engineering → about → contact → footer

**After each major section: run the application and visually inspect it.** Do not assume correctness because the code compiles.

---

# 16. QUALITY CONTROL

Before finishing: run lint, type checking and build; check console errors; test desktop, mobile, reduced motion and keyboard navigation; verify contrast, interactive states, scroll behavior and animation performance.

Inspect for: excessive backdrop-filter usage, unnecessary re-renders, layout shifts, image loading problems, animation jank, broken mobile layouts.

## Final design test (inspect as a design director)

- Does this look like a template? → remove generic patterns
- Does everything look like glass? → remove glass from content
- Too many animations? → remove half of them
- Feels empty? → stronger typography/composition, not more decoration
- Feels noisy? → reduce effects
- Feels static? → add meaningful motion, not random animation
- Feels like an Apple clone? → reinterpret into an original identity
- Feels like a developer portfolio AND a premium product? → it should

---

# 17. MOST IMPORTANT RULE

Do not optimize for "more effects". Optimize for:

**clarity + depth + motion + materiality + typography + interaction + performance**

The finished website should make someone think:

> "This feels like a real digital product."

Not:

> "Someone added a glassmorphism template to a portfolio."

Take your time to establish the visual system before implementing individual components.
