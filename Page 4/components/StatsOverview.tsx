/**
 * @file page4/components/StatsOverview.tsx
 * @owner Member 3 — Frontend Dev 3 (responsive UI primitive)
 *
 * Top-of-page stat cards for the creator dashboard: total budget,
 * collected, remaining, gifts achieved. Mobile: 2x2 grid; tablet+:
 * 4-up row.
 */

import React from 'react';
import { Wallet, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import type { Currency } from '../types';
import { formatCurrency, cx } from '../lib/utils';

interface StatsOverviewProps {
  totalBudgetCents: number;
  collectedCents: number;
  currency: Currency;
  giftsAchieved: number;
  giftsTotal: number;
}

interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  icon: React.ReactNode;
  tone: 'neutral' | 'positive' | 'warning';
}

function StatCard({
  label,
  value,
  caption,
  icon,
  tone,
}: StatCardProps): React.JSX.Element {
  const toneClasses = {
    neutral: 'bg-white text-stone-700 ring-stone-200/60',
    positive: 'bg-emerald-50 text-emerald-800 ring-emerald-200/70',
    warning: 'bg-amber-50 text-amber-800 ring-amber-200/70',
  } as const;

  const iconTone = {
    neutral: 'bg-stone-100 text-stone-500',
    positive: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
  } as const;

  return (
    <div
      className={cx(
        'flex items-start gap-3 rounded-2xl p-4 shadow-sm ring-1 sm:p-5',
        toneClasses[tone],
      )}
    >
      <span
        className={cx(
          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          iconTone[tone],
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider opacity-80">
          {label}
        </p>
        <p className="mt-0.5 truncate text-xl font-bold sm:text-2xl">
          {value}
        </p>
        {caption && (
          <p className="mt-0.5 text-xs opacity-70">{caption}</p>
        )}
      </div>
    </div>
  );
}

export function StatsOverview({
  totalBudgetCents,
  collectedCents,
  currency,
  giftsAchieved,
  giftsTotal,
}: StatsOverviewProps): React.JSX.Element {
  const remaining = Math.max(0, totalBudgetCents - collectedCents);
  const collectPercent = Math.min(
    100,
    Math.round((collectedCents / Math.max(totalBudgetCents, 1)) * 100),
  );

  return (
    <section
      aria-label="Campaign summary"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <StatCard
        label="Total Budget"
        value={formatCurrency(totalBudgetCents, currency, { trimCents: true })}
        icon={<Wallet className="h-5 w-5" />}
        tone="neutral"
      />
      <StatCard
        label="Collected"
        value={formatCurrency(collectedCents, currency, { trimCents: true })}
        caption={`${collectPercent}% of goal`}
        icon={<TrendingUp className="h-5 w-5" />}
        tone="positive"
      />
      <StatCard
        label="Remaining"
        value={formatCurrency(remaining, currency, { trimCents: true })}
        icon={<Clock className="h-5 w-5" />}
        tone="warning"
      />
      <StatCard
        label="Gifts Achieved"
        value={`${giftsAchieved} / ${giftsTotal}`}
        caption={
          giftsAchieved === giftsTotal
            ? 'All funded!'
            : `${giftsTotal - giftsAchieved} to go`
        }
        icon={<CheckCircle2 className="h-5 w-5" />}
        tone={giftsAchieved === giftsTotal ? 'positive' : 'neutral'}
      />
    </section>
  );
}
