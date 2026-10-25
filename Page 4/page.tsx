/**
 * @file page4/page.tsx
 * @route /page4
 * @display "Look what we're making happen." — Creator Dashboard
 *
 * @owner Member 3 — Frontend Dev 3 (contribution dashboard + responsive UI)
 * @coauthors
 *   - Member 4 — Backend Dev (API contract in lib/api.ts)
 *   - Member 5 — Database Engineer (types in types/index.ts)
 *
 * @week 1 — Static UI scaffold + mock data wiring.
 *          Week 3 swaps mock data for live FastAPI calls.
 *          Week 5 adds creator-only gating via Member 1's AuthContext.
 */

import React from 'react';
import { StatsOverview } from './components/StatsOverview';
import { GiftProgressList } from './components/GiftProgressList';
import { ShareLinkCard } from './components/ShareLinkCard';
import { RecentContributionsList } from './components/RecentContributionsList';
import { getCampaignDashboard, type CampaignDashboard } from './lib/api';
import { mockCampaignDashboard } from './lib/mockData';

/**
 * Page 4 — Creator Dashboard
 *
 * The logged-in creator's overview of one of their campaigns:
 *  - Headline stats (total budget, collected, remaining, gifts achieved)
 *  - Per-gift funding progress (which gifts are fully funded vs not)
 *  - Public share link with copy-to-clipboard
 *  - Recent contributions stream (donor name + amount, anonymous support)
 *
 * In Week 5 this page becomes gated: only users whose `useAuth().role`
 * is `'creator'` AND who own this campaign can view it.
 */
export default function Page4(): React.JSX.Element {
  // Week 1: synchronous mock load. Week 3 replaces with SWR / RSC fetch.
  const data: CampaignDashboard = mockCampaignDashboard;

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page intro */}
        <header className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-rose-600">
            Creator dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Look what we&rsquo;re making happen.
          </h1>
          <p className="text-sm text-stone-500">
            {data.campaign.title} · managed by {data.campaign.creatorName}
          </p>
        </header>

        {/* Top stats — total / collected / remaining / achieved */}
        <StatsOverview
          totalBudgetCents={data.campaign.totalBudgetCents}
          collectedCents={data.campaign.collectedCents}
          currency={data.campaign.currency}
          giftsAchieved={data.campaign.giftsAchieved}
          giftsTotal={data.campaign.giftsTotal}
        />

        {/* Two-column body: gift progress on the left, share + contributions on the right */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section
            aria-labelledby="gift-progress-heading"
            className="lg:col-span-2"
          >
            <GiftProgressList
              gifts={data.giftProgress}
              currency={data.campaign.currency}
            />
          </section>

          <aside className="space-y-6">
            <ShareLinkCard
              shareUrl={data.campaign.shareUrl}
              isPublic={data.campaign.isPublic}
            />
            <RecentContributionsList
              contributions={data.recentContributions}
              currency={data.campaign.currency}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

/** Retained so the import does not get flagged while mock data is in use. */
export { getCampaignDashboard as _getCampaignDashboard };
