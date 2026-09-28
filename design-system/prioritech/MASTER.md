# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Prioritech
**Generated:** 2026-09-28 14:00:59
**Category:** General
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 8/10 (Complex) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette (brand override — dark-first)

Generated recommendation (AI purple/pink) was rejected: Prioritech brand is
graphite/silver/gold on black. These tokens are the source of truth and map 1:1
to `frontend/app/globals.css` CSS variables. **Dark is the default theme.**

**Dark (default):**

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#0a0a0a` | `--background` |
| Foreground | `#e8e8e8` | `--foreground` |
| Card | `#0f0f0f` | `--card` |
| Primary/Accent (gold) | `#daa520` | `--primary` / `--accent` |
| On Primary/Accent | `#0a0a0a` | `--primary-foreground` |
| Muted | `#141414` | `--muted` |
| Muted Foreground | `#6b6b6b` | `--muted-foreground` |
| Border | `#1a1a1a` | `--border` |
| Ring | `#daa520` | `--ring` |

**Light (paper & gold editorial):**

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background (paper) | `#faf6ee` | `--background` |
| Foreground (warm ink) | `#211d16` | `--foreground` |
| Card (white paper panels) | `#ffffff` | `--card` |
| Accent (amber gold, AA on paper) | `#a16207` | `--accent` |
| Muted surface | `#f1ead9` | `--muted` |
| Muted text | `#6b6153` | `--muted-foreground` |
| Dark terminal chips/rows | `#211d16` | `--main` |
| Border | `rgba(33,29,22,0.12)` | `--border` |

**Color rules:**
- Gold `#daa520` is an accent: hairlines, active states, text on near-black only. Never body/link text on cream (fails 4.5:1) — use `#a16207` there.
- Orange `#ef9a0e` is retired from all surfaces.
- Light mode panels are white paper cards — no dark slabs on cream; only terminal-style chips/rows stay dark (brand texture).
- No frosted glass over the 3D canvas: panels are solid at ≥85% opacity with a 1px border. Blur ≤3px, sticky chrome only (navbar/footer/modal).

### Typography

- **Heading Font:** Inter
- **Body Font:** Inter
- **Mood:** dark, cinematic, technical, precision, clean, premium, developer, professional, high-end utility
- **Google Fonts:** [Inter + Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #daa520;
  color: #0a0a0a;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #daa520;
  border: 1px solid #daa520;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: var(--card);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #daa520;
  outline: none;
  box-shadow: 0 0 0 3px #daa52033;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Hero + Features + CTA

- **Conversion Strategy:** Deep CTA placement. For CTA label text, verify at least 4.5:1 against the button fill; use 7:1 only when the product explicitly targets AAA normal-text contrast. Keep focus and component boundaries independently visible. Disable hero parallax under reduced motion and render its static final state.
- **CTA Placement:** Hero (sticky) + Bottom
- **Section Order:** Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer

---

## Motion

**Page Transition** (Complex) — Trigger: route change | Duration: 500-800ms | Easing: `expo.inOut`

```js
const state = Flip.getState('.hero-image'); navigate(); Flip.from(state, { duration: 0.6, ease: 'expo.inOut', absolute: true, zIndex: 100 });
```

**Framework notes:** This repo has no GSAP — treat the snippet as conceptual and implement with framer-motion (`lib/motion.ts` vocabulary) or the shared three.js engine. Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately.

- ✅ Verify the shared element exists in both DOM states before calling Flip.from to avoid a silent no-op
- ❌ Don't use shared-element transitions across more than one element pair per navigation; compounding Flips are hard to time correctly
- ⚡ Flip recalculates layout (FLIP technique) so test on low-end devices for jank

---

## Anti-Patterns (Do NOT Use)


### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
