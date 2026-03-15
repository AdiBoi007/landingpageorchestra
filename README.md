# Orchestra - Landing Page

> Your AI product manager. Drop in your requirements, it assigns tasks to the right devs, learns how your team works, and translates code progress into plain English in real time.

---

## What This Is

The Orchestra marketing and demo landing page. Built in React + Vite. It contains the full product walkthrough, the interactive 7-step demo, waitlist signup, and links to both live platform previews.

---

## Tech Stack

- React 18
- Vite
- Google Fonts - Bebas Neue, Syne, DM Mono
- Plain CSS with custom properties, no Tailwind or UI libraries
- IntersectionObserver for scroll-triggered animations
- No backend required for local use
- Optional waitlist POST integration via `VITE_WAITLIST_API_URL`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

The current implementation ships as a single-page app rather than a split component tree.

```text
src/
  App.jsx              # Root page component, interactive demo, waitlist logic
  App.css              # Global styles, design system, atmosphere, section visuals
  index.css            # Base resets
  main.jsx             # React entry
  assets/
    hero.png
    react.svg
    vite.svg

public/
  favicon.svg
  icons.svg

.env.example           # Optional preview/API URLs
index.html             # Font loading and app shell
vite.config.js         # Vite config
```

---

## The 7-Step Demo

The interactive demo is the centerpiece of the page. It walks through the complete Orchestra workflow:

| Step | Label | What it shows |
| --- | --- | --- |
| 01 | TEAM SETUP | Manager defines team roles - decided once, used forever |
| 02 | PRD UPLOAD | Manager uploads requirements doc, Big Boss absorbs it |
| 03 | BREAKDOWN | PRD broken into 6 requirements and 12 executable tasks |
| 04 | DISTRIBUTION | PTM Agent sends tasks to the right dev via VS Code plugin |
| 05 | AGENT SCANS | Dev commits code, agent reads diff and updates progress |
| 06 | REPORTER | Manager asks a question, Reporter Agent queries all dev agents |
| 07 | DASHBOARD | Insights dashboard shows everything in plain English |

Navigation: click `NEXT` / `PREV` or use the left and right arrow keys.

---

## Updating Live Preview URLs

The live preview buttons use Vite env vars with fallbacks defined in `src/App.jsx`:

```bash
VITE_INSIGHTS_URL=https://insights.orchestra.dev
VITE_ORCHESTRA_URL=https://orchestra.dev
```

For local development, create `.env.local`:

```bash
VITE_INSIGHTS_URL=https://your-insights-url.com
VITE_ORCHESTRA_URL=https://your-vscode-url.com
```

These power:

- The Step 7 demo CTA buttons
- The Insights preview CTA
- The Orchestra preview CTA
- The "Who It's For" preview buttons

---

## Updating Waitlist Spots

The waitlist stats are derived in `src/App.jsx` from a base of `23` taken spots and a total of `50`:

```js
const takenSpots = Math.min(23 + submissions.length, 50)
const remainingSpots = Math.max(50 - takenSpots, 0)
```

To change the displayed counts, update that base value in `src/App.jsx`.

To connect the form to a real backend, set:

```bash
VITE_WAITLIST_API_URL=https://your-api.com/waitlist
```

If `VITE_WAITLIST_API_URL` is present, the form will POST:

```json
{ "email": "name@example.com" }
```

If it is not present, submissions are stored locally in component state only.

---

## Design System

### Colors

```css
--bg:       #000000; /* root background */
--panel:    #0a0a0a; /* card backgrounds */
--surface:  #111111; /* elevated surfaces */
--border:   #1a1a1a; /* all borders */
--purple:   #7c3aed; /* primary brand accent */
--blue:     #2563eb; /* ready state / UI accent */
--green:    #059669; /* complete / healthy */
--amber:    #d97706; /* in progress / at risk */
--red:      #dc2626; /* blocked / critical */
```

### Fonts

| Font | Used for |
| --- | --- |
| Bebas Neue | Large display text, hero title, headline numerics |
| Syne | Body text, labels, descriptions, nav, buttons |
| DM Mono | Metadata, timestamps, chips, tags, technical labels |

### Atmosphere Layers

Three fixed layers sit behind all content in `src/App.css`:

- `.grain` - subtle noise texture
- `.scanlines` - faint horizontal scan lines
- `.orb-1` / `.orb-2` - drifting blurred purple and blue gradients

All are `pointer-events: none` and stay behind the page content.

---

## Scroll Animations

Scroll-triggered animations use the `useScrollReveal` hook defined inside `src/App.jsx`.

```js
const [ref, isVisible] = useScrollReveal({ threshold: 0.15 })

<div ref={ref} className={cx('my-element', isVisible && 'visible')} />
```

Typical CSS pattern:

```css
.my-element {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.my-element.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Threshold defaults to `0.15`, meaning the element reveals when roughly 15% of it is in view.

---

## Environment Variables

No environment variables are required to run the landing page locally.

Optional variables:

```bash
VITE_INSIGHTS_URL=https://insights.orchestra.dev
VITE_ORCHESTRA_URL=https://orchestra.dev
VITE_WAITLIST_API_URL=https://api.orchestra.dev/waitlist
```

See [.env.example](/Users/adhirajdogra/Desktop/BigMac/unihackdemo/.env.example) for the current shape.

---

## Deployment

Works on any static host.

```bash
# Vercel
vercel --prod

# Netlify
npm run build
netlify deploy --prod --dir=dist

# Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

---

## Browser Support

Tested against modern evergreen browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Primary audience is desktop. The layout is responsive down to mobile widths, but the page is designed first for desktop presentation.
