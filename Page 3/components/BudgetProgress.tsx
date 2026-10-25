/**
 * @file page3/components/BudgetProgress.tsx
 * @owner Member 3 — Frontend Dev 3 (responsive UI primitive)
 * @coauthor Member 5 — Database Engineer (input is integer cents)
 *
 * Horizontal budget bar. Allocated / total, with friendly "X% of budget
 * used" copy. On mobile the bar shrinks to full width and the stats wrap
 * below.
 */

import React from 'react';
import { Wallet } from 'lucide-react';
import type { Currency } from '../types';
import { formatCurrency } from '../lib/utils';

interface BudgetProgressProps {
  totalBudgetCents: number;
  allocatedCents: number;
  currency: Currency;
}

export function BudgetProgress({
  totalBudgetCents,
  allocatedCents,
  currency,
}: BudgetProgressProps): React.JSX.Element {
  const totalSafe = Math.max(totalBudgetCents, 1);
  const percent = Math.min(100, Math.round((allocatedCents / totalSafe) * 100));
  const remaining = Math.max(0, totalBudgetCents - allocatedCents);
  const isOver = allocatedCents > totalBudgetCents;

  return (
    <section
      aria-label="Budget summary"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <Wallet className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Total Budget
            </p>
            <p className="text-lg font-semibold text-stone-800">
              {formatCurrency(totalBudgetCents, currency, { trimCents: true })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Allocated
          </p>
          <p className="text-lg font-semibold text-stone-800">
            {formatCurrency(allocatedCents, currency, { trimCents: true })}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Budget allocated"
        >
          <div
            className={
              isOver
                ? 'h-full rounded-full bg-rose-500'
                : percent > 80
                  ? 'h-full rounded-full bg-amber-500'
                  : 'h-full rounded-full bg-emerald-500'
            }
            style={{ width: `${Math.max(percent, 2)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          {isOver
            ? `Over budget by ${formatCurrency(allocatedCents - totalBudgetCents, currency, { trimCents: true })}`
            : `${formatCurrency(remaining, currency, { trimCents: true })} remaining · ${percent}% used`}
        </p>
      </div>
    </section>
  );
}
