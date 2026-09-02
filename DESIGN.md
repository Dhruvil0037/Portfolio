# Design system — 2026 refresh

Constraints locked before touching components, so every section stays consistent
instead of being improvised per-file. This replaces the generic "AI-built" look
(Inter-only type, purple/pink gradient blobs, `rounded-full` pills everywhere,
identical fade-up-on-scroll motion) with a typography-led, tactile identity.

## Type system — three tiers, not one

- **Display** — `Fraunces` (serif, high-contrast, characterful). Headlines only,
  set large with `clamp()`, tight leading.
- **Body** — `IBM Plex Sans`. All paragraph copy, nav labels, buttons.
- **Mono** — `IBM Plex Mono`. Section index labels ("01 — About"), tags/chips,
  dates, meta text. This is the unifying "technical annotation" motif that ties
  sections together.

No `Inter`, no default system sans as the primary voice.

## Color — capped 2-color system, no gradients

| Token       | Light         | Dark          |
|-------------|---------------|---------------|
| `--paper`   | `#FAF9F6`     | `#121110`     |
| `--ink`     | `#16130F`     | `#F5F2EA`     |
| `--accent`  | `#C2410C`     | `#FB923C`     |
| `--line`    | `rgba(22,19,15,.12)` | `rgba(245,242,234,.16)` |

- `accent` used sparingly: underlines, active nav indicator, one primary CTA,
  tag hover state. Never as a background fill on large areas.
- No gradient blobs, no glassmorphism glow. A faint SVG grain/noise overlay on
  `--paper` replaces the blurred blob backgrounds for texture.

## Shape

- Radius scale: `0px | 4px | 8px` only. No `rounded-full` on nav pills, buttons,
  or tags — sharp/near-sharp rectangles instead.
- Borders: 1px hairline (`--line`) instead of soft drop shadows as the default
  container treatment. Shadows reserved for hover/lift states only.

## Motion

- Framer Motion stays (already in the stack) — no new animation dependency.
- Reveals must be **distinct per section**, not the same `{opacity:0,y:100}`
  block copy-pasted everywhere:
  - Hero headline: word-level stagger.
  - Section headings: clip-path wipe on the mono index label + heading.
  - Skills/tags: stagger + accent-underline on hover instead of filled bg.
  - Projects: keep the existing scroll-scale/opacity parallax (already
    distinctive) — restyle the card shell only.
- `lenis` added for inertial smooth scroll (single provider in `layout.tsx`);
  compatible with the existing `react-intersection-observer` scroll-spy since
  it smooths native scroll rather than replacing it.

## Per-section notes

- **Header**: rect pill (was `rounded-full`) with hairline border; active-link
  indicator becomes an underline instead of a filled rounded background.
- **Intro**: drop the emoji wave and the pink/purple blob backdrop; CTA buttons
  become rect with hairline border, primary CTA filled `--ink`/`--accent` on
  hover.
- **Skills**: sharp mono chips, hover = accent underline, not colored fill.
- **Projects**: hairline sharp-corner card, mono accent-colored tag chips.
- **Experience**: `react-vertical-timeline-component` restyled via its
  `contentStyle`/`iconStyle` props to match the new palette (structure kept —
  it's a third-party component, not worth replacing for this pass).
- **Footer / theme switch / section divider**: shape + color parity with the
  rest (hairline borders, no `rounded-full`, no gradient).
