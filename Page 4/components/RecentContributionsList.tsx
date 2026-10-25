/**
 * @file page4/components/RecentContributionsList.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Stream of recent contributions on the dashboard. Anonymous contributions
 * show an incognito avatar; named ones show initials. Time stamps are
 * relative ("5 days ago").
 */

import React from 'react';
import type { Contribution, Currency } from '../types';
import { formatCurrency, formatRelativeTime, cx } from '../lib/utils';

interface RecentContributionsListProps {
  contributions: Contribution[];
  currency: Currency;
}

/** Build initials from a name; falls back to "?" for edge cases. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';
}

export function RecentContributionsList({
  contributions,
  currency,
}: RecentContributionsListProps): React.JSX.Element {
  if (contributions.length === 0) {
    return (
      <section
        aria-label="Recent contributions"
        className="rounded-2xl bg-white p-5 text-sm text-stone-500 shadow-sm ring-1 ring-stone-200/60"
      >
        No contributions yet. Once guests start giving, they&rsquo;ll show up here.
      </section>
    );
  }

  return (
    <section
      aria-label="Recent contributions"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-stone-800">
          Recent contributions
        </h2>
        <span className="text-xs text-stone-500">
          Last {contributions.length}
        </span>
      </div>

      <ul role="list" className="divide-y divide-stone-100">
        {contributions.map((c) => (
          <li key={c.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cx(
                  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  c.isAnonymous
                    ? 'bg-stone-100 text-stone-500'
                    : 'bg-rose-100 text-rose-700',
                )}
              >
                {c.isAnonymous ? 'A' : initials(c.donorName ?? '?')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-medium text-stone-800">
                    {c.isAnonymous ? 'Anonymous' : c.donorName}
                  </p>
                  <p className="shrink-0 text-sm font-semibold text-stone-900">
                    {formatCurrency(c.amountCents, currency, { trimCents: true })}
                  </p>
                </div>
                {c.giftTitle && (
                  <p className="truncate text-xs text-stone-500">
                    toward {c.giftTitle}
                  </p>
                )}
                {c.message && (
                  <p className="mt-1 line-clamp-2 text-xs italic text-stone-500">
                    &ldquo;{c.message}&rdquo;
                  </p>
                )}
                <p className="mt-1 text-[11px] text-stone-400">
                  {formatRelativeTime(c.createdAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
