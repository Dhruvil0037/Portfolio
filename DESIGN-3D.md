# 3D room scrollytelling — design notes

> **v4 refinement** (current): desk composition redone to a real layout —
> single monitor left + laptop right touching, keyboard/mouse centered on
> an animated coding-themed deskmat, lamp on the right (click it to toggle
> site light/dark mode — the whole lamp is the hit target, not just the
> switch nub), spiral-bound interactive notebook (click cycles todo pages),
> pencil, desk plant, chair pulled in close. Bookshelf rebuilt open-faced
> (no solid front — was reading as "a coffin") with clickable/pull-out
> books. Added big animated wall typography (dev quotes/memes), removed
> the tablet prop per feedback. Laptop geometry rebuilt (previous version
> had bad proportions/hinge). All the old flat-site paragraph sections
> (`Intro`, `About`, `Skills`, `Experience`, `Contact` components) are
> gone from this branch's `page.tsx` — replaced with short, room-specific
> "chapter" captions in `chapters.tsx` sourced from `lib/data.ts` directly,
> Kage-style, instead of forcing the old 2D site's full paragraphs into
> overlay cards. The opening beat has no card at all now — just a small
> non-blocking name/role mark, not a hero paragraph.
>
> Fixed a real interaction bug found while testing the lamp click: each
> full-viewport-height `StationPanel` section (even the ones with no card,
> like the opening beat) was intercepting pointer events across its entire
> empty area, silently blocking clicks to the 3D scene underneath. Fixed
> with `pointer-events-none` on the section wrapper and `pointer-events-auto`
> only on the actual card content.
>
> **v3 rebuild**: a single procedurally-built desk scene — no
> downloaded model packs of any kind. Desk, MacBook-style laptop, dual
> monitors, mechanical keyboard, bookshelf with real titled books, wall
> quote/experience frames, a desk robot toy, notebook/pens/tablet, a
> balcony window, a fabric-textured chair — all built from Three.js
> primitives + procedurally generated canvas textures (wood grain, paper
> grain, woven fabric, brushed metal, book spines), the same technique
> threeui.com's own open-sourced components use for detail without high
> poly counts. Full-bleed single-column layout (3D fixed behind everything,
> content scrolls as fading "chapter" panels) replaces the earlier
> split-screen. GSAP ScrollTrigger (synced with Lenis) drives the camera.
> Light/dark theme swaps the room's whole material palette, not just page
> chrome. See "v3 changes" at the bottom for the full list and why.

Builds on `DESIGN.md` (type/color system).

## Stack

- `three` + `@react-three/fiber` (R3F v8, React 18-compatible) + `@react-three/drei`.
- `gsap` + `ScrollTrigger` drives the camera from scroll position — the
  free (Webflow-acquired GreenSock, no paid tier anymore), code-first
  standard for exactly this pattern. Synced with `lenis` per the documented
  integration: `lenis.on("scroll", ScrollTrigger.update)` +
  `gsap.ticker.add(time => lenis.raf(time * 1000))` (see `smooth-scroll.tsx`).
- **No downloaded 3D assets.** Every prop is primitive geometry (`RoundedBox`,
  boxes, cylinders, cones) plus a canvas-generated texture for surface detail
  (see `components/room/textures.ts`) — wood grain, paper grain, fabric
  weave, brushed metal, book spines with real titles. This is deliberate:
  free, *detailed*, non-low-poly downloadable furniture/prop packs don't
  really exist (checked Sketchfab, Poly Haven, itch.io — the free ones are
  low-poly like Kenney's kit, which was tried and rejected; the detailed
  ones are paid or require a logged-in browser download, not scriptable).
  Procedural + generated-texture is threeui's own technique for their
  bookshelf/cloth/paper components (their source is public on GitHub).

## Theme-aware materials

`components/room/theme.ts` defines a full day and night `RoomPalette`
(fog, walls, floor, desk wood tones, metal tones, accent, light colors/
intensities, window sky gradient) keyed off the site's existing
`ThemeContext`. `Scene` picks the palette live, so toggling light/dark
changes the room's lighting and materials, not just the page chrome.

## Camera stations

One per section, all orbiting/framing the *same* desk composition (not
separate rooms): Home (wide establishing shot) → About (bookshelf close-in,
real skill-named book spines) → Projects (dual monitors, real project
titles) → Skills (keyboard/laptop close-up) → Experience (wall frames
showing real experience-timeline text) → Contact (window/balcony, warm
lamp corner). `stations.ts` holds the keyframes; `camera-rig.tsx` lerps
between them by scroll progress, smoothstep-eased, with per-frame damping.
In `prefers-reduced-motion`, the rig holds the Home framing with a very
slight idle sway instead of scroll-locking.

## Content is connected, not decorative

Every prop that shows text pulls from `lib/data.ts` — the bookshelf's book
titles are real skill names, the monitors show real skills/projects, the
wall frames show real experience-timeline entries. Nothing is a generic
placeholder value.

## Layout

Full-bleed: `RoomStage` is a `position: fixed` background canvas mounted
once in `layout.tsx` (inside `ThemeContextProvider`, since it reads theme).
Content sections render in normal document flow via `StationPanel`, which
fades each section in/out as it enters/leaves view (`whileInView`, not
`once: true`) so the room stays legible as the primary visual and text
never permanently overlaps a busy focal object — replaces the earlier
split-left/right-column approach.

Known Chromium quirk hit and fixed: `backdrop-filter: blur()` on an element
that also carries a Framer Motion transform, sitting over a WebGL canvas,
blurs the panel's own text — not just what's behind it. `StationPanel`
uses a fully opaque panel instead (no backdrop-blur) to avoid this.

## Mobile

No separate fallback tier — mobile gets the same full-bleed scroll-driven
scene as desktop (gated only by `prefers-reduced-motion`, not viewport
width), per feedback that mobile should get real effects too, not a static
banner.

## v3 changes (from the v2 battlestation rebuild)

- Removed the Kenney low-poly asset pack entirely — replaced with
  procedural geometry + generated textures.
- Replaced flat glow-colored screens with real content (project/skill
  text) rendered on properly-UV'd custom geometry (the low-poly pack's
  meshes had degenerate UVs, which is why texture-mapping them failed
  earlier — building the geometry ourselves fixes that at the root).
- Replaced split-screen layout with full-bleed + fading chapter panels.
- Added: bookshelf with real titled books, wall quote/experience frames,
  a desk robot toy (clickable), notebook + pens, tablet, balcony window,
  fabric-textured chair.
- Added day/night material palette tied to the site's theme toggle.
- Replaced the hand-rolled scroll listener with GSAP ScrollTrigger.
- Fixed a real bug found along the way: `ThemeContext` initialized its
  React state to `"dark"` while the DOM defaulted to light (no `.dark`
  class until an effect ran), so anything reading `theme` on first render
  — now including the 3D scene — saw the wrong value. Now initializes to
  `"light"` to match the DOM default.
