/**
 * @file page3/page.tsx
 * @route /page3
 * @display "Thoughtful gifts, picked by them" — Gift Recommendation
 *
 * @owner Member 2 — Frontend Dev 2 (gift discovery, recommendation, gift management)
 * @coauthors
 *   - Member 4 — Backend Dev (API contract consumed in lib/api.ts)
 *   - Member 5 — Database Engineer (types in types/index.ts)
 *   - Member 3 — Frontend Dev 3 (responsive layout shell)
 *
 * @week 1 — Static UI scaffold + mock data wiring. Real API calls land in Week 3.
 */

import React from 'react';
import { GiftRecommendationPanel } from './components/GiftSelectionPanel';
import { EventHeader } from './components/EventHeader';
import { BudgetProgress } from './components/BudgetProgress';
import { CuratedGiftCard } from './components/CuratedGiftCard';
import { GuestSuggestionCard } from './components/GuestSuggestionCard';
import { getEventWithGifts, type EventWithGifts } from './lib/api';
import { mockEventWithGifts } from './lib/mockData';

/**
 * Page 3 — Gift Recommendation
 *
 * Shows a curator (creator) view of an event's gift shortlist:
 *  - Event header + budget progress
 *  - "Selected" curated gifts (curator-approved)
 *  - Guest suggestions awaiting curator approval
 *
 * In Week 1 we render from mockData so the page is fully self-contained.
 * Week 3 will swap `mockEventWithGifts` for the live `getEventWithGifts` call.
 */
export default function Page3(): React.JSX.Element {
  // Week 1: synchronous mock load. Week 3 replaces with SWR / RSC fetch.
  const data: EventWithGifts = mockEventWithGifts;

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Event context — owner of the event, total budget, deadline */}
        <EventHeader event={data.event} />

        {/* Budget progress — what's been allocated vs total budget */}
        <BudgetProgress
          totalBudgetCents={data.event.totalBudgetCents}
          allocatedCents={data.event.allocatedBudgetCents}
          currency={data.event.currency}
        />

        {/* Curated shortlist — gifts the curator has already "Selected" */}
        <section aria-labelledby="curated-heading" className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2
              id="curated-heading"
              className="text-2xl font-semibold tracking-tight text-stone-800"
            >
              Thoughtful gifts, picked by them
            </h2>
            <span className="text-sm text-stone-500">
              {data.curatedGifts.length} selected
            </span>
          </div>

          <ul
            role="list"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.curatedGifts.map((gift) => (
              <li key={gift.id}>
                <CuratedGiftCard
                  gift={gift}
                  currency={data.event.currency}
                  onSelect={() => {
                    /* Week 4: wire to selectGift mutation */
                    void gift;
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Guest suggestions — submitted by invitees, awaiting approval */}
        <section aria-labelledby="suggestions-heading" className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2
              id="suggestions-heading"
              className="text-xl font-semibold tracking-tight text-stone-700"
            >
              Suggestions from guests
            </h2>
            <span className="text-sm text-stone-500">
              {data.guestSuggestions.length} awaiting review
            </span>
          </div>

          <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.guestSuggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <GuestSuggestionCard
                  suggestion={suggestion}
                  currency={data.event.currency}
                  onApprove={() => {
                    /* Week 4: wire to approveSuggestion mutation */
                    void suggestion;
                  }}
                  onDecline={() => {
                    /* Week 4: wire to declineSuggestion mutation */
                    void suggestion;
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Selection panel — secondary CTA, becomes interactive in Week 4 */}
        <GiftRecommendationPanel
          selectedCount={data.curatedGifts.length}
          pendingCount={data.guestSuggestions.length}
        />
      </div>
    </main>
  );
}

/**
 * Future hook (Week 3):
 *
 *   const { data, error, isLoading } = useEventWithGifts(eventId);
 *
 * where `useEventWithGifts` wraps `getEventWithGifts` with SWR.
 * The `getEventWithGifts` import is retained above intentionally so
 * ESLint/TS do not flag it as unused while mock data is in use.
 */
export { getEventWithGifts as _getEventWithGifts };
