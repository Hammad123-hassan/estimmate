# EstimMate

Interactive React landing page for **EstimMate** — client-ready project estimates in minutes.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Lucide React icons

## Scripts

```bash
npm run dev      # start local server
npm run build    # production build
npm run preview  # preview production build
```

## Structure

```
src/
  components/
    Navbar.jsx
    EstimateInput.jsx
    ui/           # Logo, Button
    sections/     # Hero, HowItWorks, Why, BuiltFor, Features, Pricing, Testimonials
  data/content.js
  App.jsx
```

## Interactive flow

1. Describe a project in the hero **Build** card
2. Choose estimation method / breakdown level
3. Click **Build** → mock estimate metrics appear
4. Scroll to **How it works** → **New estimation** uses your latest estimate
5. Explore Features carousel, Pricing toggles, and expandable scope table
