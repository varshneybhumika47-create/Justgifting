# page5 — Public Gifting Page

> Contributor-facing campaign view — the public link the creator shares.

**Route:** `/page5`
**Owner (frontend):** Abhinav (Member 3 — Frontend Dev 3)
**Backend contract:** Member 4 — FastAPI endpoints (see `lib/api.ts`)
**Type source:** Member 5 — Supabase schema mirror (see `types/index.ts`)

## What ships in Week 1

- Static UI matching the design screenshot (₹46,000 / ₹60,000 — 75% raised, 18 contributors, 29 days left).
- Component breakdown:
  - `EventBanner` — full-bleed hero, occasion, date, host card overlay
  - `FinancialProgress` — big % raised, secondary stats, progress bar
  - `WishlistGrid` — responsive 1/2/3-column grid of gift cards
  - `WishlistGiftCard` — per-gift image, title, mini progress, "Contribute" CTA (or "Funded" badge)
  - `ContributeModal` — amount presets + custom, donor name + anonymity, message, ESC/backdrop close
- `types/index.ts` — Supabase schema mirror for the public projection (`campaigns`, `wishlist_gifts`). Deliberately redacted — no donor list, no internal IDs.
- `lib/api.ts` — typed FastAPI client (2 endpoints).
- `lib/mockData.ts` — fixture matching the screenshot (espresso machine, ceramic dinnerware, mountain getaway).
- `lib/utils.ts` — currency / date / className helpers (Week 2 promotes to shared module).
- Responsive: full-bleed hero scales from 256px mobile to 384px desktop; modal becomes a bottom sheet on mobile, centered dialog on desktop.
- Accessibility: dialog with `role="dialog"` + `aria-modal`, ESC close, backdrop close, progressbar roles, ARIA labels on icon buttons, focusable controls in tab order.

## What's NOT in Week 1 (by design)

- Live API calls — page reads from `mockData.ts`. Week 3 swaps in `getPublicCampaign`.
- Contribution submission — modal state is wired but `onConfirm` is a no-op. Week 4 wires it to `createContribution`.
- Payment gateway — the modal has the `paymentMethodId` field in the type but the form does not yet collect card details. Week 6 adds Stripe / Razorpay tokenisation.
- Real-time progress — Week 6 adds SWR polling so the page updates after a contribution.
- Focus trap inside the modal — basic ESC/backdrop close ships in Week 1, full focus trap is a Week 2 a11y enhancement.

## Files

```
page5/
├── page.tsx                       main route
├── components/
│   ├── EventBanner.tsx
│   ├── FinancialProgress.tsx
│   ├── WishlistGrid.tsx
│   ├── WishlistGiftCard.tsx
│   ├── ContributeModal.tsx
│   └── index.ts                   barrel
├── lib/
│   ├── api.ts                     FastAPI client
│   ├── mockData.ts                Week-1 fixture
│   └── utils.ts                   formatting helpers
├── types/
│   └── index.ts                   Supabase schema mirror (redacted public projection)
├── README.md                      this file
└── CONTRIBUTORS.md                per-file role attribution
```

## Integration notes

Drop this folder into your Next.js App Router project as `app/page5/`. Requires:
- Tailwind CSS configured in the host project.
- `lucide-react` installed.
- (Week 3+) `NEXT_PUBLIC_API_BASE_URL` env var.
- (Week 6+) Stripe / Razorpay SDK for payment tokenisation.

## Security note

Page 5 is the **only** page that does NOT require authentication. The backend
projection (Member 4) must enforce that no donor names, internal campaign
IDs, or financial splits leak into the public response. The types in
`types/index.ts` reflect this — there is no `donorName` on `WishlistGift`,
no internal `campaignId`, and no `creatorId` anywhere.
