---
name: Gifting Platform
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e6'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f1ff'
  surface-container: '#f0ecfa'
  surface-container-high: '#ebe6f5'
  surface-container-highest: '#e5e0ef'
  on-surface: '#1c1a25'
  on-surface-variant: '#484554'
  inverse-surface: '#312f3a'
  inverse-on-surface: '#f3eefd'
  outline: '#797585'
  outline-variant: '#cac4d6'
  surface-tint: '#6543cf'
  primary: '#6341cc'
  on-primary: '#ffffff'
  primary-container: '#7c5ce7'
  on-primary-container: '#fffcff'
  inverse-primary: '#ccbdff'
  secondary: '#7a5644'
  on-secondary: '#ffffff'
  secondary-container: '#fdcdb6'
  on-secondary-container: '#795543'
  tertiary: '#8a4a36'
  on-tertiary: '#ffffff'
  tertiary-container: '#a8624c'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7deff'
  primary-fixed-dim: '#ccbdff'
  on-primary-fixed: '#1f0060'
  on-primary-fixed-variant: '#4d25b6'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ebbda6'
  on-secondary-fixed: '#2e1507'
  on-secondary-fixed-variant: '#603f2e'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#390c01'
  on-tertiary-fixed-variant: '#713623'
  background: '#fcf8ff'
  on-background: '#1c1a25'
  surface-variant: '#e5e0ef'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system balances playful social warmth with a premium, restrained aesthetic tailored for a modern gifting experience. The emotional response is one of joyful anticipation, reliability, and heartfelt connection. We combine a contemporary minimalism movement with soft tactile touches—generous whitespace, friendly typography, and intentional celebratory color pops.

## Colors

The color palette is anchored by deep lavender (`#7C5CE7`) and primary lavender (`#A78BFA`), supported by warm peach (`#FFCFB8`) and accent peach (`#FFAB91`) for festive highlights. Surfaces use crisp white (`#FFFFFF`) against a soft lavender background (`#F5F0FF`). Text hierarchy utilizes main dark text (`#28243A`) and secondary text (`#777387`), with success green (`#2D9D78`) for positive states and subtle light borders (`#EAE6F2`) for structural containment.

## Typography

Warm lifestyle typography merges the welcoming, rounded geometry of Plus Jakarta Sans for headlines with the clean, utilitarian readability of Inter for body text. Headings feel optimistic and approachable, while body sizes remain crisp and legible across dense gift catalogs and checkout flows.

## Layout & Spacing

A fluid grid system organizes content with generous whitespace to emphasize curated gift items. On desktop, use a 12-column layout with 24px gutters and expansive outer margins. On mobile, transition to a single-column layout with 16px side padding, maintaining comfortable touch targets and breathing room around interactive elements.

## Elevation & Depth

Visual hierarchy relies on ambient, softly diffused shadows tinted with subtle lavender undertones (`rgba(124, 92, 231, 0.08)`). Surfaces stack naturally from the soft lavender background (`#F5F0FF`) to crisp white cards (`#FFFFFF`), creating a tactile, inviting depth that feels light rather than heavy.

## Shapes

With a roundedness level of `2`, UI elements feature generous radii that reinforce friendly social warmth. Standard components use 0.5rem (8px) rounding, while major cards and containers employ 16px to 24px radii to create a soft, approachable silhouette.

## Components

- **Buttons:** Pill-shaped or heavily rounded (12-16px). Primary actions use deep lavender (`#7C5CE7`) with white text; secondary actions use soft lavender fills or warm peach (`#FFCFB8`) accents for celebratory CTAs. Include subtle scale transitions on hover.
- **Chips:** Soft rounded tags featuring light lavender backgrounds and secondary text, ideal for gift categories, recipient tags, and occasion filters.
- **Lists:** Clean separation using light borders (`#EAE6F2`), with generous vertical padding to allow gift items and transaction histories to breathe.
- **Checkboxes & Radio Buttons:** Rounded styling with primary deep lavender fills upon selection, accompanied by smooth checkmark transitions.
- **Input Fields:** Crisp white backgrounds, light borders (`#EAE6F2`), and 12px roundedness. Focus states exhibit deep lavender rings with soft shadow glows.
- **Cards:** The cornerstone of the gifting interface. Rendered in crisp white with 16-24px radii, subtle ambient shadows, and generous internal padding for gift imagery, pricing, and personal messages.
- **Celebratory Accents:** Specialized badge components utilizing warm peach gradients and success green indicators for delivered gifts and shared group contributions.