# 🧠 CODEX MASTER PROMPT — Df Portfolio Website

## ROLE
You are a senior frontend engineer and creative director building a world-class personal portfolio for a product builder named **Df**. This is not a typical developer portfolio — it must feel like a **premium creative agency site** with cinematic scroll experiences, every section having its own visual personality.

---

## TECH STACK (do not deviate)
- React 18 + TypeScript + Vite
- Tailwind CSS v3
- GSAP + ScrollTrigger (scroll animations)
- Lenis (smooth scroll — wraps entire app)
- Framer Motion (micro-interactions only)
- shadcn/ui (base components)

Install these exact packages:
```bash
npm install gsap lenis framer-motion @gsap/react
npm install -D @types/gsap
```

---

## GLOBAL DESIGN SYSTEM

### Colors (CSS variables in index.css)
```css
:root {
  --bg:          #050508;
  --bg-2:        #0A0A14;
  --surface:     rgba(255,255,255,0.04);
  --border:      rgba(255,255,255,0.08);
  --accent-1:    #6C63FF;   /* violet — primary */
  --accent-2:    #00F5A0;   /* mint — secondary */
  --accent-3:    #FF6B35;   /* orange — tertiary */
  --text:        #F0F0F5;
  --text-muted:  rgba(240,240,245,0.45);
  --noise:       url("data:image/svg+xml,..."); /* noise texture */
}
```

### Glass Morphism (reusable class .glass)
```css
.glass {
  backdrop-filter: blur(24px) saturate(180%);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(255,255,255,0.06);
  border-radius: 20px;
}
```

### Typography
```css
/* Import in index.html */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

font-display:  'Syne'          /* headings — bold editorial */
font-body:     'DM Sans'       /* body — clean readable */
font-mono:     'JetBrains Mono' /* labels, tags, code */
```

### Global Rules
- Body background: `#050508` always
- Noise texture on body at 3% opacity (CSS `::before` pseudo)
- `overflow-x: hidden` on html and body
- All scroll animations use GSAP ScrollTrigger
- Smooth scroll via Lenis with `lerp: 0.08`
- Custom cursor: small 8px dot + 40px lagging ring

---

## FILE STRUCTURE TO CREATE

```
src/
├── index.css                          ← global styles + CSS vars + .glass class
├── main.tsx                           ← Lenis init + GSAP ticker
├── App.tsx                            ← section order + scroll progress bar
│
├── components/
│   └── ui/
│       ├── GlassCard.tsx              ← reusable glass card wrapper
│       ├── TechPill.tsx               ← tech tag badge
│       ├── CustomCursor.tsx           ← magnetic cursor
│       └── ScrollProgress.tsx         ← top progress bar (fixed)
│
├── sections/
│   ├── Hero/
│   │   └── Hero.tsx                   ← parallax 4-layer GSAP hero
│   │
│   ├── Projects/
│   │   ├── ProjectsContainer.tsx      ← Lenis sticky scroll wrapper
│   │   ├── CheckDz.tsx                ← project 1
│   │   ├── ClassFlow.tsx              ← project 2
│   │   ├── Rwina.tsx                  ← project 3
│   │   └── InkLink.tsx                ← project 4
│   │
│   └── Contact/
│       └── Contact.tsx                ← FlowSection story-scroll
│
└── lib/
    ├── animations.ts                  ← shared GSAP presets
    └── lenis.ts                       ← Lenis singleton
```

---

## SECTION 1 — HERO

### Layout
Full viewport height. 4 parallax layers moving at different speeds on scroll via GSAP ScrollTrigger scrub.

```
Layer 1 (yPercent: 70 — deepest/slowest):
  → Large abstract radial gradient mesh background
    (3 overlapping radial gradients: violet, mint, orange)
    Animated slowly with CSS keyframes (20s rotate)

Layer 2 (yPercent: 55):
  → Giant ghost text "BUILDER" 
    font-size: 22vw, opacity: 0.06, letter-spacing: -0.05em
    Syne font, white, centered

Layer 3 (yPercent: 40 — main content):
  → Navigation bar (top):
      Left: "df ✦" mono font, small
      Right: Glass pill — green pulse dot + "Available for Work"
  
  → Hero center content:
      Animated greeting (typewriter cycles): مرحبا → Hello → Salut
      (DM Sans, 1rem, muted, mono, 2s per word)
      
      NAME: "Df" — Syne, 18vw, weight 800, white
      (On load: clip-path reveal from bottom, 0.8s)
      
      Subtitle: "Product Builder  ·  SaaS Creator  ·  Arab Web"
      (DM Sans, 1.1rem, letter-spacing: 0.2em, muted)
      
      Two glass CTAs (side by side):
        [→  View Work]   [↗  Contact]
        Hover: accent-1 background, scale 1.02
        Magnetic effect: moves 8px toward cursor on hover

Layer 4 (yPercent: 10 — closest/fastest):
  → 3 floating tech-stack cards (glass morphism):
      Card 1: "Next.js" + icon — top-left area
      Card 2: "Supabase" + icon — top-right area  
      Card 3: "React" + icon — bottom-right
      Each with: float animation (translateY ±10px, 3s ease-in-out infinite)
      Each card slightly different animation-delay

Scroll indicator (bottom center):
  Animated bouncing arrow ↓
  Text: "scroll to explore" — mono, tiny, muted
```

### On-Load Sequence (Framer Motion):
```
0ms:    All content invisible (opacity: 0)
200ms:  Name clips up into view
500ms:  Subtitle fades in
700ms:  CTAs fade+slide in with stagger
900ms:  Floating cards appear one by one
1100ms: Scroll indicator bounces in
```

---

## SECTION 2 — PROJECTS CONTAINER

### Sticky Scroll Behavior
Wrap all project cards in a container. Each project = one `<section>` with:
```css
position: sticky;
top: 0;
min-height: 100vh;
border-radius: 28px 28px 0 0;  /* rounded top corners */
overflow: hidden;
```
As user scrolls, each new project slides up and overlaps the previous one (z-index increases). Lenis handles smooth interpolation.

### Section Intro (before projects):
```
Background: #050508
Content (centered, fade-in on scroll):
  Label:  "SELECTED WORK  ✦  2024-2025"  — mono, tiny, accent-2
  H2:     "Things I've Built"  — Syne, 8vw, white
  Sub:    "Products used by real people."  — DM Sans, muted
  
  Below: horizontal rule (1px, rgba white 0.08)
```

---

### PROJECT 1 — Check.dz

```
Background:     #0A0A14
Accent:         #6C63FF (violet)
Z-index:        1

LAYOUT (desktop: 55% left / 45% right):

LEFT — Visual Zone:
  Browser mockup frame (glass, dark)
  Inside: simplified app UI showing:
    — Subject cards (Mathématiques, Physique, SVT, Philosophie)
      each as a small glass card with:
      - Subject name (Arabic + French)
      - Mini progress bar filled with violet
      - Coefficient badge
    — Cards fan in from bottom on section enter
      (GSAP stagger: 0.1s, y: 40→0, opacity: 0→1)
  
  Behind browser: 
    — Purple radial glow (blur 80px, opacity 0.15)
    — 12 small floating dots (particle effect)
      random positions, opacity 0.3, slow drift animation
  
  On hover: entire browser does CSS 3D tilt (perspective: 1000px)
    rotate max ±8deg following mouse position

RIGHT — Content Zone (centered vertically):
  Number:  "01"  — Syne, 5rem, opacity 0.15
  Title:   "Check.dz"  — Syne, 3rem, white
  Tag pills: [Baccalaureate] [Algeria] [EdTech]
             glass pills, violet border
  
  Headline: "The Bac Tracker Algerian Students Needed"
            DM Sans, 1.4rem, white, line-height 1.4
  
  Description: "A revision tracker built for Algerian Baccalaureate
                students. Launched on TikTok and went viral — hundreds
                of users in the first 72 hours."
                DM Sans, 1rem, muted
  
  Tech Stack: [Next.js] [Supabase] [Tailwind]
              TechPill components
  
  Stats row (3 GlassCards side by side):
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │  🔥 Viral│ │ 1000+    │ │ TikTok   │
    │  Launch  │ │ Users    │ │ #1 Source│
    └──────────┘ └──────────┘ └──────────┘
    Stats animate counter 0→value when section enters viewport
  
  CTA link: [↗ Visit Check.dz]  — violet accent, underline on hover
```

---

### PROJECT 2 — ClassFlow

```
Background:     #040D0A
Accent:         #00F5A0 (mint green)
Z-index:        2

LAYOUT (desktop: reversed — 45% left content / 55% right visual):

RIGHT — Visual Zone:
  Dashboard mockup (wider, landscape glass frame):
    — Top bar: "ClassFlow" logo + nav items
    — Main area shows 3-pane layout:
        Left pane: student list with avatar initials + attendance dots
        Center pane: calendar grid (week view, colored slots)
        Right pane: animated bar chart (height animates on enter)
    — Floating WhatsApp bubble (bottom-right of mockup):
        Green bubble with: "✓✓ Absent notification sent — Ahmed M."
        Bounces in from right 1s after section enters
    — CSV export animation: thin bar slides across bottom "Exporting..."
  
  Background: mint radial glow (blur 100px, opacity 0.08)

LEFT — Content Zone:
  Number:  "02"
  Title:   "ClassFlow"
  Tags: [SaaS] [Multi-tenant] [B2B]  — mint border
  
  Headline: "SaaS for Algerian Tutoring Centers"
  
  Description: "Multi-tenant management system for مراكز الدروس.
                Attendance tracking, scheduling, WhatsApp absent
                notifications, Arabic-compatible CSV export."
  
  Tech: [Next.js] [Supabase] [WhatsApp API] [Multi-tenant]
  
  Stats:
    ┌────────────────┐  ┌────────────────┐
    │ 🏗 Multi-tenant│  │ 🇩🇿 Arabic CSV │
    │ Architecture   │  │  Compatible    │
    └────────────────┘  └────────────────┘
    ┌────────────────┐  ┌────────────────┐
    │ 📲 WhatsApp    │  │ 📅 Scheduling  │
    │  Auto-Alerts   │  │  System        │
    └────────────────┘  └────────────────┘
```

---

### PROJECT 3 — Rwina

```
Background:     #0D0805
Accent:         #FF6B35 (warm orange)
Z-index:        3

LAYOUT (desktop: 55% left / 45% right):

LEFT — Visual Zone:
  Mobile phone frame (portrait, centered, slight tilt 5deg):
    Inside phone screen:
      — App header: "Rwina  روينا"
      — Habit tracker grid (7 days × 5 habits)
        Colored dots, orange accent for completed
      — AI chat bubble visible at bottom:
          "مرحبا! كيف يمكنني مساعدتك اليوم؟"
          Typing indicator (3 dots) then text appears
    
    Phone has: subtle reflection at bottom, glass sheen
    
    Above phone: floating theme-switcher card:
      "5 Themes  ●●●●●"  — cycles colors every 2s
    
    Side of phone: GitHub Gist sync badge (pulsing green dot)
    
    On enter: phone rotates from rotateY(90deg) → rotateY(0deg) 
              0.8s cubic-bezier spring

RIGHT — Content Zone:
  Number:  "03"
  Title:   "Rwina  روينا"  — both scripts shown
  Tags: [Personal] [PWA] [AI-Powered]  — orange border
  
  Headline: "A Daily Tracker With Soul"
  
  Description: "Personal productivity tracker built for Arab users.
                Multi-aesthetic design system, Gemini AI chat,
                GitHub Gist sync, and PWA support."
  
  Tech: [React] [Vite] [Gemini AI] [PWA]
  
  Stats:
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ 5 Visual │ │ AI Chat  │ │  PWA     │
    │  Themes  │ │  Built-in│ │  Ready   │
    └──────────┘ └──────────┘ └──────────┘
```

---

### PROJECT 4 — InkLink

```
Background:     #080808
Accent:         #FFFFFF (pure white on black)
Z-index:        4

LAYOUT (desktop: centered, single column — editorial style):

FULL WIDTH — Visual Zone (top half):
  Centered composition:
    Left: "handwritten note" element —
          Paper texture card (cream/off-white)
          Handwriting-style font text:
            "See InkLink for full demo → #INK042"
          Subtle scan lines across it (CSS repeating-linear-gradient)
          Slightly rotated (-3deg)
    
    Center: Animated arrow →  (SVG path draws itself on enter, 1.5s)
    
    Right: Short code terminal block (dark glass):
           "#INK042" in mono font, large
           Below: Digital content card materializes from blur:
             Title: "InkLink Demo"  + link icon
    
  Background: pure black, subtle grid (1px lines, rgba white 0.03)
  Scanline overlay across entire section (5% opacity)

BELOW — Content Zone:
  Number:  "04"
  Title:   "InkLink"
  
  Badge:   [🚧 IN DEVELOPMENT]  — amber color, pulse animation
  Tags:    [Short-code] [Notes] [Digital Bridge]  — white border
  
  Headline: "Bridging Handwriting and the Digital World"
  
  Description: "A short-code system connecting handwritten notes
                to digital content. Write a code, link it to any
                resource. Scan it later — instantly access your
                digital world."
  
  Tech: [React] [Lovable] [Vite]
  
  SVG draw-on animation plays when section enters:
    A path that looks like a hand drawing a link symbol
    stroke-dashoffset animation, 1.5s ease-out
```

---

## SECTION 3 — CONTACT (Story-Scroll)

### Behavior
3 full-screen panels that stack using `position: sticky` + `z-index` stacking. As user scrolls, each new panel slides up and covers the previous (same pattern as projects but panels rotate in from bottom-right using GSAP).

Each panel entering animation:
```
gsap.from(inner, {
  rotation: 30,
  transformOrigin: "bottom left",
  ease: "none",
  scrollTrigger: { scrub: true, start: "top bottom", end: "top 25%" }
})
```

---

### PANEL 1 — The Hook
```
Background: #050508  (same as hero — continuity)
Color:      white

Label: "05 — LET'S TALK"  — mono, tiny, muted

LARGE TYPE (Syne, 10vw, tight leading):
  "Have
   An Idea?
   Let's
   Build."

Divider: 1px white rgba 0.1

Body text (right-aligned, max 40ch):
  "I'm available for freelance work, interesting
   collabs, and good conversations about building
   products for Arab users."

Bottom-left: arrow icon pointing down, animated pulse
```

### PANEL 2 — Contact Links
```
Background: #0F0F1A
Color:      white

Label: "05.1 — REACH OUT"

LARGE TYPE:
  "Where
   To
   Find
   Me"

Below large type: 2×2 grid of glass contact cards:

┌──────────────────────┐  ┌──────────────────────┐
│  📧  Email           │  │  𝕏  Twitter          │
│  df@example.com      │  │  @dfbuilds            │
│  ──────────────────  │  │  ──────────────────   │
│  [Copy] [Open →]     │  │  [Follow ↗]           │
└──────────────────────┘  └──────────────────────┘
┌──────────────────────┐  ┌──────────────────────┐
│  💼  LinkedIn        │  │  🐙  GitHub           │
│  /in/df              │  │  /df-dev              │
│  ──────────────────  │  │  ──────────────────   │
│  [Connect ↗]         │  │  [View Code ↗]        │
└──────────────────────┘  └──────────────────────┘

Each card: glass morphism
Hover: subtle accent glow (box-shadow with card's accent color)
[Copy] button: copies to clipboard, shows "Copied! ✓" for 2s
```

### PANEL 3 — Footer / Closing
```
Background: #000000  (pure black — final)
Color:      white

Label: "05.2 — UNTIL NEXT TIME"

LARGE TYPE (centered):
  "Built
   With ❤
   In
   Algeria"

Background effect:
  Arabic letters (أ ب ت ث ج ح) falling slowly
  Like matrix but Arabic characters
  Very low opacity (0.04), random sizes, slow fall
  Implemented as: array of <span> elements, CSS animation

Bottom bar (fixed at bottom of this panel):
  Left:   "df.portfolio  ©  2025"  — mono, tiny, muted
  Center: "صُنع بالجزائر  ✦"  — Arabic, muted
  Right:  [↑ Back to top]  — clicks → lenis.scrollTo(0)

Top of this panel: thin gradient fade from #0F0F1A → #000000
```

---

## SHARED COMPONENTS

### CustomCursor.tsx
```tsx
// Two elements:
// 1. .cursor-dot: 8px circle, accent-1 color, follows mouse exactly
// 2. .cursor-ring: 40px circle, white border 1px, follows with lerp 0.15
// 
// On hover over [data-magnetic] elements:
//   Ring scales to 56px + fills with rgba(accent-1, 0.15)
//   Button moves 8px toward cursor (transform translate)
//
// On hover over links:
//   Ring scales to 48px
//
// Hide on mobile (pointer: coarse)
```

### ScrollProgress.tsx
```tsx
// position: fixed, top: 0, left: 0, right: 0, height: 2px, z-index: 9999
// Background: linear-gradient(to right, var(--accent-1), var(--accent-2))
// Width: driven by scroll position (useEffect + window.scrollY)
// transform-origin: left
// Smooth: use GSAP quickSetter for performance
```

### GlassCard.tsx
```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;  // optional glow color
  hover?: boolean;       // enable hover glow
}
// Applies .glass class + optional hover glow via accentColor
```

### TechPill.tsx
```tsx
interface TechPillProps {
  label: string;
  color?: string;  // border/text accent color
}
// Small rounded pill: glass bg, 1px border in color, mono font, small
```

---

## main.tsx — Lenis + GSAP Setup
```tsx
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```

---

## RESPONSIVE BREAKPOINTS

```
≥1200px: Full layout (all effects active)
768–1199px:
  - Projects: visual top, content bottom (flex-col)
  - Hero: font-size reduced 30%
  - Floating cards repositioned
<768px:
  - Parallax disabled (use simple fade-in)
  - Sticky scroll stacking disabled (normal flow)
  - Cursor component not rendered
  - Projects: single column, image on top
  - Contact panels: normal scroll (no sticky stack)
  - Font sizes clamp to readable minimums
```

---

## PERFORMANCE REQUIREMENTS
- `will-change: transform` on all parallax/sticky elements
- GSAP ScrollTrigger cleanup in all `useEffect` returns
- Images: lazy loading, WebP format
- Fonts: `font-display: swap` + preload links in index.html
- Project mockup images: load only when section is 200px from viewport

---

## QUALITY GATES — do not consider done until all pass

- [ ] Lenis wraps entire app, no janky scroll anywhere
- [ ] Hero: 4 parallax layers visibly moving at different speeds
- [ ] Projects: sticky stacking works, each card overlaps previous
- [ ] Each project has its own background color and unique visual
- [ ] Each project visual has at least one entrance animation
- [ ] Contact: 3 panels stack with rotation entrance
- [ ] Custom cursor visible on desktop
- [ ] Scroll progress bar fills correctly
- [ ] [Copy] button on contact cards works
- [ ] Back to top button works
- [ ] Arabic text renders correctly (use `dir="rtl"` where needed)
- [ ] No horizontal overflow on any screen size
- [ ] GSAP instances cleaned up on component unmount
- [ ] No console errors in production build
