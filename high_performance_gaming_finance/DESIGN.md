---
name: High-Performance Gaming Finance
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#ebbbb4'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#b18780'
  outline-variant: '#603e39'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690100'
  primary-container: '#ff5540'
  on-primary-container: '#5c0000'
  inverse-primary: '#c00100'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a29'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is built for the intersection of elite gaming performance and high-stakes finance. The brand personality is aggressive, precise, and uncompromising. It targets power users who demand immediate clarity and a sense of "command-and-control" over their digital assets.

The visual style is a fusion of **High-Contrast Bold** and **Minimalism**. By stripping away gradients, soft shadows, and decorative flourishes, the UI focuses entirely on data and action. The aesthetic draws inspiration from technical HUDs (Heads-Up Displays) and tactical interfaces, evoking an emotional response of urgency, mastery, and professional-grade utility.

## Colors

The palette is strictly limited to three core pillars to maintain maximum intensity and visual discipline.

- **Primary (Vibrant Red):** Used exclusively for critical calls to action, active states, and high-priority financial alerts. It represents energy and the "LifeQuest" heart of the application.
- **Secondary (Crisp White):** Reserved for primary typography and structural borders. It ensures 100% legibility against dark backgrounds.
- **Neutral (Pure Black & Deep Carbon):** Pure Black (#000000) serves as the canvas, while Deep Carbon (#0D0D0D) is used for surface differentiation and secondary containers to provide subtle depth without breaking the high-contrast aesthetic.

## Typography

This design system utilizes **Space Grotesk** across all levels to lean into its technical, geometric, and futuristic character. 

Headlines are set with tight tracking and heavy weights to command attention. Body text remains spacious enough for readability, while labels and data points use uppercase styling and increased letter spacing to mimic the look of technical schematics. This typographic approach ensures that even complex financial data feels like part of a high-tech gaming ecosystem.

## Layout & Spacing

The layout follows a **Fluid Grid** model based on a 12-column system. It is designed to be edge-to-edge, maximizing the use of screen real estate for data-heavy dashboards.

The spacing rhythm is strictly mathematical, using an 8px base unit. Gutters are kept tight (16px) to maintain a dense, high-performance feel. Large margins (24px+) are only used on the outermost edges of the viewport to frame the content, while internal components are packed closely together to emphasize a "pro-tool" efficiency.

## Elevation & Depth

In this design system, depth is conveyed through **Bold Borders** and **Tonal Layering** rather than shadows. 

1.  **Level 0 (Background):** Pure Black (#000000).
2.  **Level 1 (Surfaces):** Deep Carbon (#0D0D0D) with 1px Solid White or Red borders.
3.  **Level 2 (Active/Hover):** Solid Red fills or White borders with increased thickness (2px).

There are no ambient shadows or blurs. Every element is defined by its edges. This "Flat-Technical" approach ensures the UI feels like a physical piece of hardware or a digital HUD, where every line has a functional purpose.

## Shapes

To reinforce the aggressive and technical nature of the brand, the design system utilizes **Sharp (0px)** corners for all primary UI elements. 

Square corners communicate precision and industrial strength. This applies to buttons, input fields, cards, and navigation bars. The only exception to this rule is found in circular progress indicators or specific iconography where geometry requires a curve—otherwise, the interface remains strictly rectilinear.

## Components

### Buttons
Primary buttons are solid Vibrant Red (#FF0000) with Black (#000000) bold text. Secondary buttons are Black with a 1px White border and White text. Ghost buttons use White text and only reveal a border on hover. All buttons have 0px radius.

### Input Fields
Inputs use a Deep Carbon (#0D0D0D) background with a 1px White border. On focus, the border changes to Red. Labels are placed above the input in small, uppercase Space Grotesk.

### Cards & Containers
Cards are used to group financial data. They feature a 1px White border and a Black background. Headers within cards are separated by a 1px horizontal White line.

### Chips & Status Indicators
Chips use a simple border-only style. For "Active" or "Profit" states, use the primary Red. For neutral states, use White. There is no "Success Green" or "Warning Yellow" in this palette; use typography and Red accents to signal importance.

### Navigation
The navigation bar is a minimal 1px border-bottom element. Active links are indicated by a solid Red underline or a Red text color.

### Data Visualization
Charts should be rendered as thin, 1px or 2px White lines. Area charts use a Red stroke with no fill, or a very subtle Deep Carbon fill. Key data points are marked with Red squares.