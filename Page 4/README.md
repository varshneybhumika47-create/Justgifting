# page4 — Creator Dashboard

> "Look what we're making happen." — creator's overview of one campaign.

**Route:** `/page4`
**Owner (frontend):** Abhinav (Member 3 — Frontend Dev 3)
**Backend contract:** Member 4 — FastAPI endpoints (see `lib/api.ts`)
**Type source:** Member 5 — Supabase schema mirror (see `types/index.ts`)

## What ships in Week 1

- Static UI matching the design screenshot (₹24,700 total · ₹18,500 collected · ₹6,200 remaining · 2/4 gifts achieved).
- Component breakdown:
  - `StatsOverview` — 4 stat cards (budget / collected / remaining / gifts achieved)
  - `GiftProgressList` — per-gift funding bars with status chips
  - `ShareLinkCard` — share URL + copy-to-clipboard + public/private badge + regenerate
  - `RecentContributionsList` — stream of recent donor activity (anonymous support)
  - `ContributionCard` — standalone card, exported for future "all contributions" view
- `types/index.ts` — Supabase schema mirror (`campaigns`, `gifts`, `contributions`).
- `lib/api.ts` — typed FastAPI client (3 endpoints).
- `lib/mockData.ts` — fixture matching the screenshot, including anonymous donor.
- `lib/utils.ts` — currency / relative-time / className helpers (Week 2 promotes to shared module).
- Responsive: 2x2 stat grid on mobile → 4-up on lg; 1-column body on mobile → 3-column on lg.
- Accessibility: progressbar roles, ARIA labels on icon buttons, semantic headings, keyboard-reachable actions.

## What's NOT in Week 1 (by design)

- Live API calls — page reads from `mockData.ts`. Week 3 swaps in `getCampaignDashboard`.
- Mutations (toggle public, regenerate link) — handlers are stubbed. Week 4 wires them.
- Auth gating — Week 5 restricts view to the campaign's creator via Member 1's AuthContext.
- Real-time contribution updates — Week 6 adds SWR polling / websocket.

## Files

```
page4/
├── page.tsx                       main route
├── components/
│   ├── StatsOverview.tsx
│   ├── GiftProgressList.tsx
│   ├── ShareLinkCard.tsx
│   ├── RecentContributionsList.tsx
│   ├── ContributionCard.tsx
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

Drop this folder into your Next.js App Router project as `app/page4/`. Requires:
- Tailwind CSS configured in the host project.
- `lucide-react` installed.
- (Week 3+) `NEXT_PUBLIC_API_BASE_URL` env var.
- (Week 5+) `useAuth()` from Person 1's `AuthContext` for creator gating.
