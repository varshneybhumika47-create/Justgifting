/**
 * @file page3/components/CuratedGiftCard.tsx
 * @owner Member 2 — Frontend Dev 2
 *
 * Card for a curator-"Selected" gift on page 3. Shows image, title,
 * description, price, and a "Selected" badge with a subtle action to
 * unselect (Week 4 wires the mutation). Card is fully responsive:
 * image stays square on mobile, content stack height grows naturally.
 */

import React from 'react';
import { Check, ExternalLink, Trash2 } from 'lucide-react';
import type { Gift, Currency } from '../types';
import { formatCurrency, cx } from '../lib/utils';

interface CuratedGiftCardProps {
  gift: Gift;
  currency: Currency;
  onSelect?: () => void;
  onRemove?: () => void;
}

export function CuratedGiftCard({
  gift,
  currency,
  onSelect,
  onRemove,
}: CuratedGiftCardProps): React.JSX.Element {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gift.image}
          alt={gift.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          <Check className="h-3 w-3" aria-hidden="true" />
          Selected
        </span>
        {gift.sourceUrl && (
          <a
            href={gift.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
            aria-label="Open gift source (new tab)"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold text-stone-800">{gift.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-stone-500">
            {gift.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span
            className={cx(
              'text-base font-semibold',
              'text-stone-900',
            )}
          >
            {formatCurrency(gift.priceCents, currency, { trimCents: true })}
          </span>

          <div className="flex items-center gap-1.5">
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
                aria-label={`Remove ${gift.title} from selection`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            )}
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-stone-700"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
