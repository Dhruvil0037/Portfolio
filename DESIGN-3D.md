# 3D room scrollytelling — design notes

Builds on `DESIGN.md` (type/color system). This layer adds an immersive 3D
scene the camera moves through as the page scrolls, replacing the flat
motion-only presentation with a real spatial narrative — desk, laptop,
bookshelf, corkboard, whiteboard — one continuous room, six camera stations.

## Stack

- `three` + `@react-three/fiber` (R3F v8, React 18-compatible) + `@react-three/drei`
  — the standard/official React Three.js ecosystem. No R3F v9 (requires React 19).
- No GSAP: camera is driven by a plain scroll-progress ref (native `scroll`
  listener, works fine under `lenis`'s smoothing) sampled in `useFrame`. Keeps
  dependency surface minimal — Framer Motion and Lenis already cover motion.
- Room geometry is hand-built from primitives (boxes, cylinders, planes) in a
  stylized low-poly look using the existing `paper/ink/accent` palette as
  material colors — not a downloaded asset pack. Full control, zero licensing
  risk, and consistent with "distinctive over generic."

## Camera stations (one per existing section, in scroll order)

1. **Home** — wide desk shot; laptop screen shows a mini live-site mock with a
   "View live ↗" hotspot (`window.open` to the real deployed URL) — the
   "access this site through the scene" ask.
2. **About** — push toward a bookshelf / framed photo.
3. **Projects** — pan to a corkboard wall of pinned project cards.
4. **Skills** — turn to a second monitor covered in tech stickers.
5. **Experience** — whiteboard with a timeline + a sticky-note cluster
   doubling as the "current goals / task list / motivation quote" corner.
6. **Contact** — desk phone / window view.
- **CV** — a clipboard prop on the desk, clickable anywhere in the scene,
  opens `/CV.pdf` in a new tab.

Camera position/lookAt are lerped between station keyframes by scroll
progress (segment-local t, smoothstep-eased), plus a small per-frame damping
factor for buttery follow rather than 1:1 scroll-locked motion.

## Content

The six DOM sections (`Intro`, `About`, `Projects`, `Skills`, `Experience`,
`Contact`) stay as the real content — accessible, SEO-indexable, source of
truth. Each renders as a translucent `paper`-toned card so it reads over the
3D scene when present, and reads fine as a normal card when it isn't.

## Fallback

The 3D canvas is additive, not required: on narrow viewports (<1024px) or
`prefers-reduced-motion: reduce`, it doesn't mount at all — content sections
render as the flat, already-approved `redesign/2026-ui-refresh` layout.
Desktop-capable, motion-OK visitors get the room; everyone else gets a fast,
accessible page with identical content.
