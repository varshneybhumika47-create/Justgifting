/**
 * @file page3/components/GiftSelectionPanel.tsx
 * @owner Member 2 — Frontend Dev 2
 *
 * Secondary action panel at the bottom of page 3 — summarises the
 * selection state and surfaces the "Share with guests" CTA. Becomes
 * interactive in Week 4 (links to page 4's share-link card).
 */

import React from 'react';
import { Share2, Sparkles } from 'lucide-react';

interface GiftSelectionPanelProps {
  selectedCount: number;
  pendingCount: number;
}

export function GiftSelectionPanel({
  selectedCount,
  pendingCount,
}: GiftSelectionPanelProps): React.JSX.Element {
  return (
    <section className="rounded-2xl bg-stone-900 p-5 text-white shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-rose-300">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">
              {selectedCount > 0
                ? 'Your shortlist is ready to share'
                : 'No gifts selected yet'}
            </h2>
            <p className="mt-0.5 text-sm text-stone-300">
              {selectedCount} selected · {pendingCount} awaiting your review
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={selectedCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share with guests
        </button>
      </div>
    </section>
  );
}

export const GiftRecommendationPanel = GiftSelectionPanel;
