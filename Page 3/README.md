# page3 — Gift Recommendation

> "Thoughtful gifts, picked by them" — curator view of an event's gift shortlist.

**Route:** `/page3`
**Owner (frontend):** Abhinav (Member 2 — Frontend Dev 2)
**Backend contract:** Member 4 — FastAPI endpoints (see `lib/api.ts`)
**Type source:** Member 5 — Supabase schema mirror (see `types/index.ts`)

## What ships in Week 1

- Static UI matching the design screenshot (Maya's 30th Birthday, ₹15,000 budget).
- Component breakdown:
  - `EventHeader` — cover, occasion, date, countdown chip
  - `BudgetProgress` — total / allocated / remaining with progress bar
  - `CuratedGiftCard` — selected gifts with "Selected" badge
  - `GuestSuggestionCard` — pending suggestions with Approve / Decline
  - `GiftSelectionPanel` — bottom CTA, "Share with guests"
- `types/index.ts` — Supabase schema mirror for the gift-recommendation domain.
- `lib/api.ts` — typed FastAPI client (4 endpoints).
- `lib/mockData.ts` — fixture matching the screenshot.
- `lib/utils.ts` — currency / date / className helpers.
- Fully responsive (mobile-first, sm / lg breakpoints).
- Accessibility: semantic landmarks, ARIA labels on icon buttons, progressbar role on budget bar, keyboard-reachable actions.

## What's NOT in Week 1 (by design)

- Live API calls — page reads from `mockData.ts`. Week 3 swaps in `getEventWithGifts`.
- Mutations (select / approve / decline) — Week 4 wires them.
- Auth gating — Week 5 adds creator-only view.
- Empty / loading / error states — Week 3.

## Files

```
page3/
├── page.tsx                       main route
├── components/
│   ├── EventHeader.tsx
│   ├── BudgetProgress.tsx
│   ├── CuratedGiftCard.tsx
│   ├── GuestSuggestionCard.tsx
│   ├── GiftSelectionPanel.tsx
│   └── index.ts                   barrel
├── lib/
│   ├── api.ts                     FastAPI client
│   ├── mockData.ts                Week-1 fixture
│   └── utils.ts                   formatting helpers
├── types/
│   └── index.ts                   Supabase schema mirror
├── README.md                      this file
└── CONTRIBUTORS.md                per-file role attribution
```

## Integration notes

Drop this folder into your Next.js App Router project as `app/page3/`. The page expects:

- Tailwind CSS configured in the host project (shared `tailwind.config.ts`).
- `lucide-react` installed (`npm i lucide-react`).
- (Week 3+) `NEXT_PUBLIC_API_BASE_URL` env var pointing to the FastAPI backend.
- (Week 5+) `useAuth()` from Person 1's `AuthContext` for creator gating.
