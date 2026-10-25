/**
 * @file page4/components/GiftProgressList.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * List of gifts with their funding progress. Each row shows the gift
 * image, title, current / target amount, a progress bar, and a status
 * chip. Week 4 adds inline actions (mark as purchased, refund, etc).
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Hourglass } from 'lucide-react';
import type { GiftProgress, Currency } from '../types';
import { formatCurrency, cx } from '../lib/utils';

interface GiftProgressListProps {
  gifts: GiftProgress[];
  currency: Currency;
}

const STATUS_META = {
  fully_funded: {
    label: 'Funded',
    chip:
      'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    bar: 'bg-emerald-500',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  partially_funded: {
    label: 'Partial',
    chip: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    bar: 'bg-amber-500',
    icon: <Hourglass className="h-3.5 w-3.5" />,
  },
  unfunded: {
    label: 'Waiting',
    chip: 'bg-stone-100 text-stone-500 ring-1 ring-stone-200',
    bar: 'bg-stone-300',
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
  over_funded: {
    label: 'Over funded',
    chip: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    bar: 'bg-rose-500',
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
} as const;

export function GiftProgressList({
  gifts,
  currency,
}: GiftProgressListProps): React.JSX.Element {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2
          id="gift-progress-heading"
          className="text-lg font-semibold text-stone-800"
        >
          Gift progress
        </h2>
        <span className="text-sm text-stone-500">
          {gifts.filter((g) => g.status === 'fully_funded').length} of {gifts.length} funded
        </span>
      </div>

      <ul role="list" className="space-y-3">
        {gifts.map((gift) => {
          const percent = Math.min(
            100,
            Math.round(
              (gift.collectedCents / Math.max(gift.priceCents, 1)) * 100,
            ),
          );
          const meta = STATUS_META[gift.status];

          return (
            <li
              key={gift.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-stone-200/60 sm:p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gift.image}
                alt=""
                className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                loading="lazy"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="truncate font-semibold text-stone-800">
                    {gift.title}
                  </h3>
                  <span
                    className={cx(
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                      meta.chip,
                    )}
                  >
                    {meta.icon}
                    {meta.label}
                  </span>
                </div>

                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-100"
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${gift.title} funding`}
                >
                  <div
                    className={cx('h-full rounded-full', meta.bar)}
                    style={{ width: `${Math.max(percent, 2)}%` }}
                  />
                </div>

                <p className="mt-1.5 text-xs text-stone-500">
                  {formatCurrency(gift.collectedCents, currency, {
                    trimCents: true,
                  })}{' '}
                  of{' '}
                  {formatCurrency(gift.priceCents, currency, {
                    trimCents: true,
                  })}{' '}
                  · {percent}%
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
