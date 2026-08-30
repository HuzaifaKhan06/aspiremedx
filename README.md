# AspireMedX — Frontend Demo

Marketing/landing page demo for AspireMedX, a medical billing & revenue
cycle management company. Frontend only — no backend wired up yet.

## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- React 19

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where things live
- `app/layout.js` — fonts + page metadata
- `app/page.js` — assembles the homepage from components
- `app/globals.css` — color palette & font tokens (Tailwind v4 `@theme`)
- `components/` — one file per section (Navbar, Hero, Services, etc.)
- `lib/content.js` — all editable copy/numbers, kept separate from markup

## Before this goes live
- Swap the placeholder testimonial and stats in `lib/content.js` for real ones
- Wire the form in `components/ContactCTA.jsx` to a real API route / email service
- Replace favicon and add real metadata (`app/layout.js`)
