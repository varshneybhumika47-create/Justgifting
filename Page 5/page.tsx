/**
 * @file page5/page.tsx
 * @route /page5
 * @display "Public Gifting Page" — contributor-facing campaign view
 *
 * @owner Member 3 — Frontend Dev 3 (public gifting page + responsive UI)
 * @coauthors
 *   - Member 4 — Backend Dev (API contract in lib/api.ts)
 *   - Member 5 — Database Engineer (types in types/index.ts)
 *
 * @week 1 — Static UI scaffold + mock data wiring.
 *          Week 3 swaps mock data for live FastAPI calls.
 *          Week 4 wires the ContributeModal to createContribution.
 *          Week 6 adds payment gateway integration inside the modal.
 */

import React from 'react';
import { EventBanner } from './components/EventBanner';
import { FinancialProgress } from './components/FinancialProgress';
import { WishlistGrid } from './components/WishlistGrid';
import { ContributeModal } from './components/ContributeModal';
import { getPublicCampaign, type PublicCampaign } from './lib/api';
import { mockPublicCampaign } from './lib/mockData';
import type { WishlistGift } from './types';

/**
 * Page 5 — Public Gifting Page
 *
 * The unauthenticated contributor view of a campaign:
 *  - Event banner (occasion, recipient, host, date)
 *  - Financial progress (collected / goal, percentage)
 *  - Wishlist grid with "Contribute" CTAs
 *  - Contribute modal (opens when a gift's "Contribute" is clicked)
 *
 * This page is the entry-point for the public share link generated on
 * page 4 (`ShareLinkCard`). No login required to view or contribute.
 */
export default function Page5(): React.JSX.Element {
  // Week 1: synchronous mock load. Week 3 replaces with SWR / RSC fetch.
  const data: PublicCampaign = mockPublicCampaign;
  const [activeGift, setActiveGift] = React.useState<WishlistGift | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-rose-50">
      <EventBanner event={data.event} host={data.host} />

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <FinancialProgress
          collectedCents={data.event.collectedCents}
          goalCents={data.event.goalCents}
          currency={data.event.currency}
          contributorsCount={data.event.contributorsCount}
          daysRemaining={data.event.daysRemaining}
        />

        <WishlistGrid
          gifts={data.wishlist}
          currency={data.event.currency}
          onContribute={(gift) => setActiveGift(gift)}
        />

        <section className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-200/60">
          <p className="text-sm text-stone-500">
            Every contribution goes directly toward the gifts Maya asked for.
            No fees, no middlemen — JustGifting only charges a tiny payment
            processing fee at checkout.
          </p>
        </section>
      </div>

      <ContributeModal
        gift={activeGift}
        currency={data.event.currency}
        onClose={() => setActiveGift(null)}
        onConfirm={() => {
          /* Week 4: wire to createContribution mutation */
          setActiveGift(null);
        }}
      />
    </main>
  );
}

/** Retained so the import does not get flagged while mock data is in use. */
export { getPublicCampaign as _getPublicCampaign };
