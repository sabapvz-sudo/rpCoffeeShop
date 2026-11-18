---
name: Velvet Bean Café
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#53433c'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#86736b'
  outline-variant: '#d8c2b8'
  surface-tint: '#8e4d2a'
  primary: '#8b4b27'
  on-primary: '#ffffff'
  primary-container: '#a8633d'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb691'
  secondary: '#74584e'
  on-secondary: '#ffffff'
  secondary-container: '#fed8ca'
  on-secondary-container: '#795c52'
  tertiary: '#4c6156'
  on-tertiary: '#ffffff'
  tertiary-container: '#64796e'
  on-tertiary-container: '#f5fff7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#713714'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#e3bfb2'
  on-secondary-fixed: '#2a170f'
  on-secondary-fixed-variant: '#5a4137'
  tertiary-fixed: '#d1e8da'
  tertiary-fixed-dim: '#b5ccbf'
  on-tertiary-fixed: '#0b1f17'
  on-tertiary-fixed-variant: '#374b41'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies the sensory warmth and measured craft of an artisanal café. It balances the timeless poise of editorial publishing with welcoming, approachable modern geometry. Designed for coffee enthusiasts, ritual-driven morning visitors, and specialty beverage connoisseurs, the experience should evoke comfort, indulgence, and curated precision.

The aesthetic fuses warm minimalism with tactile editorial sensibility. Generous negative space, creamy background canvases, and high-contrast serif headlines evoke a boutique hospitality atmosphere. Interface elements are softly rounded, creating an inviting digital space that mirrors ceramic tableware, freshly pressed paper menus, and natural wood grain.

## Colors

The palette revolves around coffee extraction, steamed textures, and botanical undertones:

- **Primary (`#C87D55` - Roasted Amber):** Used for focal interactive states, primary calls-to-action, active indicators, and hero badge highlights.
- **Secondary (`#2C1810` - Deep Espresso):** Anchors high-contrast typographic hierarchy, deep-tone navigation, and stark accents. It provides grounding contrast against pale surfaces.
- **Tertiary (`#5B7065` - Subtle Forest/Sage):** Applied sparingly for organic origins, seasonal roast callouts, sustainability tags, and positive status states.
- **Accent Warmth (`#D96B43` - Terracotta):** Reserved for promotions, temperature badges, and high-urgency notifications.
- **Neutral Canvas (`#F7F4EE` - Creamy Oat Milk):** Serves as the primary surface base, keeping the interface soft and inviting compared to harsh pure white. Deeper surface variations step through tinted stone and toasted linen tones.

## Typography

Typographic scale relies on the pairing of Playfair Display's organic serifs with Plus Jakarta Sans' geometric clarity. 

- **Display & Headlines:** Set in Playfair Display to emulate menu titles, boutique signage, and magazine spreads. Line-heights remain comfortable to preserve high ascenders and descenders.
- **Body & Captions:** Handled by Plus Jakarta Sans. Its rounded geometry complements the friendly warmth of the brand while remaining legible at small scales on checkout screens and tasting notes.
- **Micro-Badges & Pricing:** Labels utilize all-caps tracking on smaller sizes (`label-sm`, `label-md`) to ensure roast attributes, bean elevations, and origin regions remain distinct without competing visually with serif headers.

## Layout & Spacing

The layout uses a structured 12-column responsive fluid grid on desktop, transitioning into a 6-column grid on tablet, and a 4-column flow on mobile viewports.

- **Breakpoints:**
  - Compact (Mobile): `< 640px` — dynamic margins of `margin-sm` (1rem), gutters set to `gutter-sm` (1rem).
  - Medium (Tablet): `640px - 1024px` — margins expand to `margin` (1.5rem), gutters to `gutter` (1.5rem).
  - Expanded (Desktop): `> 1024px` — margins widen to `margin-lg` (3rem) with gutters at `gutter-lg` (2rem) and a maximum content bounding box of 1280px.

Layouts favor asymmetry in product highlights and tasting flights, paired with rhythmic, balanced card arrangements for menu browsing. Rhythms are spaced deliberately to prevent visual clutter, allowing each coffee lot and culinary offering adequate breathing room.

## Elevation & Depth

Depth is established through soft, warm-toned ambient shadows and stacked surface layers rather than harsh artificial borders:

- **Low-Contrast Tonal Surfaces:** Backgrounds use layered steps of oat milk tones (`#F7F4EE` to `#EFEAE1`) to differentiate primary viewports from card backgrounds and secondary side drawers.
- **Warm Ambient Shadows:** Shadows carry a subtle terracotta/espresso warmth rather than neutral cold gray. 
  - *Resting Card Elevation:* `0 2px 8px -2px rgba(44, 24, 16, 0.06), 0 1px 3px 0 rgba(44, 24, 16, 0.04)`
  - *Hover & Interactive Lift:* `0 12px 24px -6px rgba(44, 24, 16, 0.10), 0 4px 8px -2px rgba(44, 24, 16, 0.05)`
  - *Floating Trays & Modals:* `0 20px 32px -8px rgba(44, 24, 16, 0.14), 0 8px 16px -4px rgba(44, 24, 16, 0.06)`
- **Delicate Outlines:** Structural dividers and card perimeters use hair-thin, semi-translucent espresso borders (`rgba(44, 24, 16, 0.08)`) to preserve definition on light displays.

## Shapes

The design language uses roundedness level `2` (base border radius of `0.5rem` / `8px`). This provides an organic, approachable feel reminiscent of smooth ceramic cups, rounded café trays, and soft pastry boards.

- **Base Components (Inputs, Buttons, Checkboxes):** `0.5rem` (8px).
- **Cards & Modals (`rounded-lg`):** `1rem` (16px) for content blocks and coffee item cards.
- **Feature Banners & Overlays (`rounded-xl`):** `1.5rem` (24px) for prominent hero placements and order trays.
- **Badges & Micro-Pills:** Fully circular (`9999px`) to create clear contrast against structured card geometries.

## Components

### Buttons
- **Primary:** Background in `#C87D55`, text in `#FFFFFF`, with a 0.5rem corner radius. Hover state transitions to `#B66F48` with a subtle warm elevation lift.
- **Secondary / Outline:** Border of 1px solid `#2C1810`, transparent background, text in `#2C1810`. Hover transitions to a soft oat wash (`rgba(44, 24, 16, 0.04)`).
- **Tertiary (Ghost):** Plain text in `#2C1810` or `#C87D55` with underline on hover; no background.

### Cards & Menu Items
- **Product Cards:** Surface in `#FFFFFF` or `#FAF8F5`, 1rem corner radius, bounded by a 1px border of `rgba(44, 24, 16, 0.08)`. Features integrated image containers, title in Playfair Display, body notes in Plus Jakarta Sans, and a dedicated bottom footer for roast badges and price tags.
- **Price Tags:** Set in bold `Plus Jakarta Sans` with an espresso tint; cleanly right-aligned or paired with quantity selectors.

### Chips & Micro-Badges
- **Roast Profiles (Light, Medium, Dark):** Compact pills with full rounded radius (`9999px`), padding `0.25rem 0.625rem`. Backgrounds tinted subtly to match the profile (e.g., subtle sage `#5B7065` for floral light roasts, rich `#2C1810` with white text for dark roasts).
- **Process Badges (Washed, Natural, Honey):** Subtle oat-toned backgrounds with 1px border in `rgba(44, 24, 16, 0.12)`, font level `label-sm`.

### Form Inputs & Selectors
- **Text Inputs:** Outlined in `rgba(44, 24, 16, 0.2)` with a fill of `#FFFFFF`. Corner radius of `0.5rem`. On focus, border deepens to `#C87D55` with a warm glow (`0 0 0 3px rgba(200, 125, 85, 0.15)`).
- **Checkboxes & Radios:** Accented with `#C87D55`. Checkboxes have a `0.25rem` soft radius; radio buttons are circular.

### Order Summary & Drawer
- **Tray Surface:** Slide-over panels in `#F7F4EE` with an elevated warm drop shadow, crisp thin dividers in `rgba(44, 24, 16, 0.08)`, and persistent total calculation bars.