---
name: Clinical Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cadaff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8edff'
  surface-container-high: '#e0e8ff'
  surface-container-highest: '#d7e2ff'
  on-surface: '#041b3c'
  on-surface-variant: '#434654'
  inverse-surface: '#1d3052'
  inverse-on-surface: '#edf0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#00687b'
  on-secondary: '#ffffff'
  secondary-container: '#50dcff'
  on-secondary-container: '#005f71'
  tertiary: '#004e32'
  on-tertiary: '#ffffff'
  tertiary-container: '#006844'
  on-tertiary-container: '#72e9af'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#afecff'
  secondary-fixed-dim: '#48d7f9'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5d'
  tertiary-fixed: '#82f9be'
  tertiary-fixed-dim: '#65dca4'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005235'
  background: '#f9f9ff'
  on-background: '#041b3c'
  surface-variant: '#d7e2ff'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin: 24px
---

## Brand & Style

The design system is engineered for high-stakes medical environments where clarity, speed of cognition, and emotional stability are paramount. It targets healthcare professionals and patients alike, balancing a high-tech "enterprise" feel with an empathetic, accessible interface.

The design style is **Corporate Modern with a Soft Edge**. It utilizes a systematic approach to density, ensuring that complex data is legible without feeling overwhelming. The aesthetic relies on generous whitespace to reduce cognitive load, precise grid alignment for a sense of reliability, and subtle depth transitions that guide the user's focus toward critical health indicators and AI-driven insights.

## Colors

The palette is anchored by a deep medical blue to establish authority and trust. The secondary teal provides a modern, "clean" health accent used for active states and secondary call-outs.

Color usage follows a strict functional logic:
- **Primary Blue:** Navigation, primary actions, and brand identification.
- **Calming Teal:** Interactive elements that are informative but non-critical.
- **Functional Spectrum:** Success (Green), Warning (Amber), and Critical (Red) are used exclusively for health status and severity indicators.
- **Neutral Scale:** We use a deep slate (#172B4D) for primary text to ensure maximum contrast against white surfaces, with softer grays reserved for secondary metadata and structural borders.

## Typography

The design system utilizes **Inter** for all primary interfaces. Inter was selected for its exceptional legibility at small sizes-critical for medical charts and dense data tables-and its neutral, professional character.

- **Headlines:** Semi-bold weight with tight letter-spacing for a modern, "fitted" look.
- **Body Text:** Standard weight for maximum readability. Line heights are purposefully generous (1.5x) to prevent ocular fatigue during long sessions.
- **Labels:** Uppercase labels with slight tracking are used for metadata headers and category tags.
- **Data Display:** For numerical values in medical results, use `body-md` with tabular figures to ensure columns of numbers align perfectly.

## Layout & Spacing

This design system uses a **8px linear scale** for all spacing and layout decisions. This ensures a consistent vertical rhythm across different screen sizes.

- **Desktop:** 12-column fluid grid with 24px gutters. Max content width is capped at 1440px to ensure line lengths for medical reports remain readable.
- **Tablet:** 8-column grid with 20px gutters. 
- **Mobile:** 4-column grid with 16px margins. 

The layout philosophy prioritizes **Zonal Grouping**. Related medical information (e.g., patient vitals) should be grouped into cards with a standard `md` padding, separated by `lg` gaps to create clear visual distinction.

## Elevation & Depth

Elevation in this design system is used functionally to indicate interactivity and information hierarchy rather than for decoration.

1.  **Level 0 (Floor):** The background surface (#F4F5F7).
2.  **Level 1 (Card):** White surfaces with a soft, 1px border (#EBECF0). No shadow. This is the primary container for most content.
3.  **Level 2 (Interactive):** Elements that can be moved or clicked (e.g., active cards, dropdowns). These use a subtle ambient shadow: `0 4px 12px rgba(9, 30, 66, 0.08)`.
4.  **Level 3 (Overlays):** Modals and AI chat panels. These use a more pronounced shadow to create focus: `0 12px 24px rgba(9, 30, 66, 0.16)`.

We avoid heavy skeuomorphism in favor of **Tonal Layers**, using slight variations in gray to differentiate sections of the app.

## Shapes

The design system uses a consistent **Rounded** language. A radius of 8px (standard) to 12px (large cards) is used to soften the enterprise-grade interface, making the software feel more approachable and empathetic.

- **Small elements (Inputs, Buttons, Chips):** 8px corner radius.
- **Container elements (Cards, AI Panels):** 12px corner radius.
- **Full Round:** 100px for status badges and circular profile avatars.

## Components

### Buttons & Chips
- **Primary Button:** Solid Medical Blue (#0052CC) with white text. 8px radius.
- **Secondary Button:** Ghost style with Medical Blue border and text.
- **Status Chips:** High-contrast background (e.g., soft red background with deep red text) for severity indicators (Critical, Stable, Improving).

### Medical Cards
Cards should be structured with a header containing the patient name or metric title, a body for the data/chart, and a footer for "last updated" metadata. Use Level 1 elevation (border only) by default.

### AI Chat Interface
The AI panel should be visually distinct using a very subtle gradient background (from White to #F4F5F7). 
- **Response Panels:** AI-generated cards should appear with a "Level 2" shadow and a 2px left-accent border in Secondary Teal to signify they are system-generated.
- **Input:** A floating pill-shaped text area with a subtle inner shadow.

### Interactive Charts
Use Secondary Teal (#00B8D9) for primary data lines and Success Green (#36B37E) for "healthy range" shaded areas. Tooltips should be dark (Slate) with white text for maximum readability over complex graphs.