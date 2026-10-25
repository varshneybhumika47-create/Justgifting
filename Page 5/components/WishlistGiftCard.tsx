/**
 * @file page5/components/WishlistGiftCard.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Single wishlist gift card on page 5. Image, title, description, price,
 * per-gift funding progress (mini bar + percent), and a primary
 * "Contribute" CTA. Fully funded gifts replace the CTA with a celebration
 * banner.
 */

import React from 'react';
import { Gift, CheckCircle2, Users } from 'lucide-react';
import type { WishlistGift, Currency } from '../types';
import { formatCurrency, cx } from '../lib/utils';

interface WishlistGiftCardProps {
  gift: WishlistGift;
  currency: Currency;
  onContribute: (gift: WishlistGift) => void;
}

export function WishlistGiftCard({
  gift,
  currency,
  onContribute,
}: WishlistGiftCardProps): React.JSX.Element {
  const goalSafe = Math.max(gift.priceCents, 1);
  const percent = Math.min(
    100,
    Math.round((gift.collectedCents / goalSafe) * 100),
  );
  const isFunded = gift.status === 'fully_funded' || percent >= 100;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gift.image}
          alt={gift.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isFunded && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Fully funded
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-stone-800">{gift.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-stone-500">
            {gift.description}
          </p>
        </div>

        {/* Per-gift mini progress */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="font-medium text-stone-700">
              {formatCurrency(gift.collectedCents, currency, {
                trimCents: true,
              })}{' '}
              <span className="font-normal text-stone-400">
                of {formatCurrency(gift.priceCents, currency, { trimCents: true })}
              </span>
            </span>
            <span className="text-stone-500">{percent}%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${gift.title} funding`}
          >
            <div
              className={cx(
                'h-full rounded-full',
                isFunded ? 'bg-emerald-500' : 'bg-rose-500',
              )}
              style={{ width: `${Math.max(percent, 2)}%` }}
            />
          </div>
          <p className="inline-flex items-center gap-1 text-[11px] text-stone-400">
            <Users className="h-3 w-3" aria-hidden="true" />
            {gift.contributionCount} contributor
            {gift.contributionCount === 1 ? '' : 's'}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          {isFunded ? (
            <button
              type="button"
              disabled
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200"
            >
              <Gift className="h-4 w-4" aria-hidden="true" />
              Funded — thank you!
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onContribute(gift)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              <Gift className="h-4 w-4" aria-hidden="true" />
              Contribute
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
