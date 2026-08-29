---
name: AI Collaboration Framework
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
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
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
---

## Brand & Style

This design system is built for high-velocity teams requiring deep focus and intelligent insights. The aesthetic is "Technical Elegance"—combining the utilitarian clarity of Linear with the approachable workspace feel of Notion. 

The style is **Dark Mode First**, utilizing a **Modern Minimalist** foundation enhanced by **Glassmorphism** for transient layers. It emphasizes information density without clutter, using subtle depth markers to guide the user's eye toward AI-augmented features. The emotional response should be one of calm control, precision, and futuristic capability.

## Colors

The palette leverages a deep navy foundation to reduce eye strain during long work sessions. Primary actions are distinguished by a vibrant Indigo-to-Blue gradient, signaling interactivity. 

Surface colors use a tiered approach:
- **Background**: The base canvas for the application.
- **Surface**: For sidebars, panels, and card containers.
- **Borders**: Used sparingly to define boundaries without adding visual weight.
- **Accents**: Purple is reserved for AI-driven insights and "magic" moments, differentiating automated actions from manual ones.

## Typography

This design system utilizes **Inter** for its exceptional readability in data-heavy environments. The hierarchy is strictly functional:
- **Headlines**: Use tighter letter spacing and heavier weights to anchor pages.
- **Body Text**: Optimized for legibility with generous line heights.
- **Labels**: Small-caps are used for secondary metadata and sidebar headers to create structural distinction without increasing font size.

## Layout & Spacing

The system follows an **8px spacing grid** to ensure mathematical harmony across all components. 

The layout utilizes a **Fixed-Fluid Hybrid** model:
1. **Sidebar**: Fixed width (240px) for consistent navigation.
2. **Main Content**: Fluid area that conforms to a maximum width of 1440px to prevent excessive line lengths.
3. **Internal Gutters**: Standardized at 24px (3 units) to provide breathable separation between dashboard widgets and data tables.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

- **Level 0 (Base)**: Deep Navy (#0f172a).
- **Level 1 (Panels)**: Slightly Lighter Surface (#1e293b) with a 1px border (#334155).
- **Level 2 (Modals/Popovers)**: Backdrop blur (12px) with 70% opacity surface color. These elements feature a soft, diffused shadow (0 10px 25px -5px rgba(0,0,0,0.3)) and a subtle white inner-stroke (10% opacity) to catch the "light" at the top edge.
- **Hover States**: Elements lift visually through a brightness increase of 5-10% or by intensifying the primary gradient glow.

## Shapes

The design system employs a **Rounded** shape language to soften the technical nature of the AI dashboard.
- **Standard UI (Buttons, Inputs)**: 8px (radius_md).
- **Containers (Cards, Panels)**: 12px (radius_lg).
- **Large Overlays (Modals)**: 12px-16px.
- **Pills (Status Tags)**: 24px (Full round).

## Components

### Buttons
- **Primary**: Indigo/Blue gradient background, white text. On hover, the gradient shifts slightly in hue.
- **Secondary**: Surface color background with a subtle border. Text is the primary indigo.
- **Ghost**: No background or border. Text is muted, becoming primary indigo on hover.

### Form Elements
- **Inputs & Selects**: 1px border (#334155) on surface background. On focus, the border transitions to the primary indigo with a 2px outer glow (ring).
- **Dropdowns**: Glassmorphic panels with 12px blur. Selected items use the primary blue at 10% opacity with a left-side accent bar.

### Feedback & Overlays
- **Modals**: Centered with a dark backdrop (60% opacity). Glassmorphism applied to the modal container.
- **Toast Notifications**: Positioned bottom-right. Minimalist icons with status-colored accents (e.g., a green dot for success).
- **Tooltips**: Small, dark-surface pods with 4px corner radius and body-sm typography.

### AI Specifics
- **AI Insight Cards**: Feature a subtle purple glow or "sparkle" icon to denote machine-generated content.
- **Command Palette**: A global modal (Cmd+K) using heavy backdrop blur and a high-contrast search input.