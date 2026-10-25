/**
 * @file page5/components/WishlistGrid.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Responsive grid of wishlist gift cards. 1 column on mobile, 2 on sm,
 * 3 on lg. Each card has a "Contribute" CTA — fully funded gifts show a
 * celebratory state instead of the CTA.
 */

import React from 'react';
import { Gift } from 'lucide-react';
import type { WishlistGift, Currency } from '../types';
import { WishlistGiftCard } from './WishlistGiftCard';

interface WishlistGridProps {
  gifts: WishlistGift[];
  currency: Currency;
  onContribute: (gift: WishlistGift) => void;
}

export function WishlistGrid({
  gifts,
  currency,
  onContribute,
}: WishlistGridProps): React.JSX.Element {
  if (gifts.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center text-sm text-stone-500 shadow-sm ring-1 ring-stone-200/60">
        <Gift className="mx-auto mb-2 h-8 w-8 text-stone-300" aria-hidden="true" />
        No wishlist items yet — check back soon.
      </section>
    );
  }

  return (
    <section aria-labelledby="wishlist-heading" className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2
          id="wishlist-heading"
          className="text-2xl font-semibold tracking-tight text-stone-800"
        >
          Wishlist
        </h2>
        <span className="text-sm text-stone-500">
          {gifts.filter((g) => g.status === 'fully_funded').length} of{' '}
          {gifts.length} funded
        </span>
      </div>

      <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift) => (
          <li key={gift.id}>
            <WishlistGiftCard
              gift={gift}
              currency={currency}
              onContribute={onContribute}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
