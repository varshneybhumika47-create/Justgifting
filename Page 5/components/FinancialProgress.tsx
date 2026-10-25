/**
 * @file page5/components/FinancialProgress.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Big "X% raised" hero with progress bar + supporting stats (contributors,
 * days remaining). Drives the page 5 narrative — "you can help us get to
 * 100%". Mobile-first single column; desktop splits horizontally.
 */

import React from 'react';
import { Users, CalendarClock, Sparkles } from 'lucide-react';
import type { Currency } from '../types';
import { formatCurrency, cx } from '../lib/utils';

interface FinancialProgressProps {
  collectedCents: number;
  goalCents: number;
  currency: Currency;
  contributorsCount: number;
  daysRemaining: number;
}

export function FinancialProgress({
  collectedCents,
  goalCents,
  currency,
  contributorsCount,
  daysRemaining,
}: FinancialProgressProps): React.JSX.Element {
  const goalSafe = Math.max(goalCents, 1);
  const percent = Math.min(100, Math.round((collectedCents / goalSafe) * 100));
  const remaining = Math.max(0, goalCents - collectedCents);
  const isComplete = percent >= 100;

  return (
    <section
      aria-label="Funding progress"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Big number */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-rose-600">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {isComplete ? 'Goal reached!' : 'Help us reach the goal'}
          </div>
          <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {percent}% raised
          </p>
          <p className="text-sm text-stone-500">
            {formatCurrency(collectedCents, currency, { trimCents: true })}{' '}
            of {formatCurrency(goalCents, currency, { trimCents: true })}{' '}
            {!isComplete && (
              <>
                · {formatCurrency(remaining, currency, { trimCents: true })} to go
              </>
            )}
          </p>
        </div>

        {/* Secondary stats */}
        <div className="flex gap-6 sm:gap-8">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <Users className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-semibold text-stone-800">
                {contributorsCount}
              </p>
              <p className="text-xs text-stone-500">contributors</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-semibold text-stone-800">
                {daysRemaining}
              </p>
              <p className="text-xs text-stone-500">days left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className={cx(
          'mt-5 h-3 w-full overflow-hidden rounded-full',
          isComplete ? 'bg-emerald-50' : 'bg-stone-100',
        )}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Funding progress"
      >
        <div
          className={cx(
            'h-full rounded-full transition-all',
            isComplete ? 'bg-emerald-500' : 'bg-rose-500',
          )}
          style={{ width: `${Math.max(percent, 2)}%` }}
        />
      </div>
    </section>
  );
}
