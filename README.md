

A Google Maps-inspired Place Details Panel built in React. Displays rich place information for **Juice Junction, Hampankatta, Mangalore** with a fully responsive layout — side panel on desktop, draggable bottom sheet on mobile.

---

## 📸 Features

### Layout & Responsiveness
- **Desktop** — Fixed left side panel (400px wide), mirroring the real Google Maps experience
- **Tablet** — Responsive scaling with adaptive spacing
- **Mobile** — Draggable bottom sheet with 3 snap states:
  - `Peek` → compact name + rating bar
  - `Half` → mid-height scrollable panel
  - `Full` → full-screen detail view
- Decorative SVG map background with roads, city blocks, and an animated 🥤 location pin

### Loading States
- 1.8s simulated data fetch on mount
- Animated shimmer skeleton placeholders for photos, title, and info rows
- Smooth fade-in transition when real content loads

### Photo Gallery
- 2-column hero grid layout (1 large + 2 smaller thumbnails)
- Hover zoom effect on each photo
- **"See all photos"** button overlay
- Full **lightbox viewer** with:
  - Thumbnail strip navigation
  - Left / Right arrow buttons
  - Keyboard support (`←` `→` `Esc`)
  - Photo counter indicator

### Interactive Sections
| Section | Interaction |
|---|---|
| **Timings** | Expand / collapse accordion with smooth CSS transition; today's day bolded |
| **Save** | Toggle bookmark — fills blue when saved |
| **Tabs** | Overview · Reviews · About with animated underline indicator |
| **Reviews** | Horizontal scrollable cards + full vertical review list with star ratings |
| **Rating histogram** | Visual bar chart breakdown (5★ → 1★) |
| **Tags** | Horizontally scrollable chip row |

---

## 🗂️ Component Structure

```
App
├── MapBackground          # Decorative SVG map + location pin
├── PlacePanel             # Main scrollable content panel
│   ├── PhotoGallery       # Hero photo grid
│   │   └── Lightbox       # Full-screen image viewer
│   ├── ActionButton       # Directions / Call / Save / Share
│   ├── HoursSection       # Expandable opening hours accordion
│   ├── InfoRow            # Address, phone, website rows
│   ├── Stars              # Star rating renderer (full / half / empty)
│   ├── ReviewCard         # Horizontal scroll review card
│   └── Skeleton           # Shimmer loading placeholder
└── BottomSheet            # Mobile-only draggable sheet wrapper
```

---

## 🛠️ Tech Stack

| Tool | Usage |
|---|---|
| **React** | UI framework with hooks (`useState`, `useEffect`, `useRef`) |
| **CSS-in-JS** | Inline styles + global `<style>` tag |
| **Unsplash** | Static royalty-free placeholder photos |
| **No external libraries** | Zero dependencies beyond React itself |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- A React project (Create React App, Vite, or Next.js)

### Installation

1. **Clone or copy** `PlaceDetailsPanel.jsx` into your project's `src/` folder.

2. **Install React** if not already present:
   ```bash
   npm install react react-dom
   ```

3. **Render the component** in your entry point:
   ```jsx
   // src/main.jsx or src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './PlaceDetailsPanel';

   ReactDOM.createRoot(document.getElementById('root')).render(<App />);
   ```

4. **Run the dev server:**
   ```bash
   npm run dev   # Vite
   # or
   npm start     # Create React App
   ```

### Using with Next.js
Add the `"use client"` directive at the top of the file since it uses React hooks:
```jsx
"use client";
// rest of PlaceDetailsPanel.jsx
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 768px` | Desktop side panel |
| `≤ 768px` | Mobile bottom sheet |

Controlled via a CSS media query in the global `<style>` block:
```css
@media (max-width: 768px) {
  .desktop-panel { display: none !important; }
  .mobile-sheet  { display: block !important; }
}
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| Primary blue | `#1a73e8` | Links, active states, tab indicator |
| Danger red | `#ea4335` | Map pin, closed status |
| Star gold | `#f9ab00` | Rating stars, histogram bars |
| Open green | `#137333` | Open status label |
| Secondary text | `#70757a` | Labels, icons, metadata |
| Surface | `#f1f3f4` | Tag chips, action button backgrounds |
| Divider | `#e8eaed` | Section borders |

---

## 📦 Static Data

All place data is defined in the `PLACE` constant at the top of the file — no API calls or backend required. To update the place details, simply edit that object:

```js
const PLACE = {
  name: "Juice Junction",
  address: "Hampankatta, Mangalore, Karnataka 575001",
  rating: 4.4,
  // ... etc
};
```

---

## 🔮 Potential Enhancements

- [ ] Connect to Google Places API for live data
- [ ] Add map interaction (pan/zoom) using Google Maps JS SDK or Leaflet
- [ ] Animate bottom sheet with gesture velocity for more natural feel
- [ ] Add "Write a review" modal
- [ ] Dark mode support
- [ ] Accessibility improvements (ARIA labels, focus trapping in lightbox)

---

## 📄 License

This project is built for demonstration and assessment purposes using static data only.  
Photos sourced from [Unsplash](https://unsplash.com) under their free-to-use license.# Google-maps-Ui-Panel
