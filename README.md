# A Little Invitation 💕

A polished, romantic, mobile-first web app to ask someone out on a date — built
with Next.js, TypeScript, Tailwind, and Framer Motion.

## What it does

- **Personalized invite** — share a link like `/for/beverly-pastrana` and the
  recipient sees a beautiful, sincere invitation.
- **Co-created date** — the recipient picks (or suggests) the date, time,
  restaurant, and optional post-dinner activity.
- **Ortigas-centric restaurant picker** — curated list of restaurants around
  Ortigas, Capitol Commons, Estancia, Podium, SM Megamall, Shangri-La Plaza,
  and Greenfield District. Falls back to a Google Places search if
  `GOOGLE_PLACES_API_KEY` is configured.
- **Calendar export** — `Save to calendar` creates an `.ics` file; there's also
  a Google Calendar shortcut.
- **Creator dashboard** — a password-protected view at `/dashboard` where the
  sender can see responses, picked dates, restaurants, and personal notes.
- **No dark patterns** — no running-away buttons, no pressure copy. She can
  change anything at any step.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000> and try `/for/beverly-pastrana`.

## Environment variables

All optional — the app works without any of them, just using the curated
restaurant list and a console-only response log.

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Used in OG metadata. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (client-side). |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (**server only**). |
| `GOOGLE_PLACES_API_KEY` | Enables live restaurant search. |
| `DASHBOARD_PASSWORD` | Password for `/dashboard`. |

### Supabase setup

Run the SQL schema in `src/lib/supabase/server.ts` (the
`SUPABASE_SCHEMA_SQL` constant) in the Supabase SQL editor. It creates a
`date_responses` table that the dashboard reads from.

## Project structure

```
src/
  app/
    layout.tsx                # Root layout (fonts, metadata)
    page.tsx                  # Landing / index
    for/[name]/page.tsx       # Personalized invite route
    dashboard/page.tsx        # Creator dashboard
    api/
      responses/route.ts      # Save a response
      responses/lookup/route.ts  # Auth-gated lookup for dashboard
      restaurants/search/route.ts # Optional Google Places search
  components/
    InvitationFlow.tsx        # Orchestrates the wizard
    CreatorDashboard.tsx      # Dashboard UI
    decorative/               # FloatingHearts, Sparkles, Confetti, ProgressDots
    steps/                    # All wizard step components
    ui/                       # Button, Card, SectionHeader
  lib/
    types.ts
    utils.ts
    ics.ts                    # .ics + Google Calendar export
    restaurants.ts            # Curated Ortigas restaurant list
    date-options.ts           # Date, time, activity option generators
    supabase/server.ts        # Server-only Supabase client
```

## Customizing the invite

- **Her name** is read from the URL slug, e.g. `/for/anna` ⇒ "Anna".
- **Restaurants** live in `src/lib/restaurants.ts` — edit, add, or replace
  the array. Photos are Unsplash URLs; swap them for your own if you like.
- **Suggested dates** are computed dynamically from today in
  `src/lib/date-options.ts`.
- **Copy & microcopy** is in each step component — feel free to soften or
  change the wording.

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript only
npm run lint       # ESLint
```

## Notes on the design

- **Mobile-first** layout throughout.
- **Playfair Display-style serif** (`DM Serif Display`) for headings,
  **Inter** for body.
- Subtle entrance animations, floating hearts, sparkles, and a one-time
  confetti on confirmation.
- Accessibility: keyboard-navigable, focus rings, ARIA progressbar, semantic
  labels, no reliance on color alone.

Made with care. Good luck — she's going to say yes.
