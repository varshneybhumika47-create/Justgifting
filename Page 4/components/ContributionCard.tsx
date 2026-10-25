/**
 * @file page4/components/ContributionCard.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Standalone contribution card — kept exported for re-use in a future
 * "all contributions" expanded view (Week 6). Not used by the dashboard
 * layout in Week 1 but is wired and tested against the mock data.
 */

import React from 'react';
import { Gift } from 'lucide-react';
import type { Contribution, Currency } from '../types';
import { formatCurrency, formatRelativeTime, cx } from '../lib/utils';

interface ContributionCardProps {
  contribution: Contribution;
  currency: Currency;
  className?: string;
}

export function ContributionCard({
  contribution,
  currency,
  className,
}: ContributionCardProps): React.JSX.Element {
  return (
    <article
      className={cx(
        'flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-200/60',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600"
      >
        <Gift className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-semibold text-stone-800">
            {contribution.isAnonymous ? 'Anonymous' : contribution.donorName}
          </p>
          <p className="shrink-0 text-sm font-semibold text-stone-900">
            {formatCurrency(contribution.amountCents, currency, {
              trimCents: true,
            })}
          </p>
        </div>
        {contribution.giftTitle && (
          <p className="truncate text-xs text-stone-500">
            toward {contribution.giftTitle}
          </p>
        )}
        <p className="mt-1 text-[11px] text-stone-400">
          {formatRelativeTime(contribution.createdAt)}
        </p>
      </div>
    </article>
  );
}
