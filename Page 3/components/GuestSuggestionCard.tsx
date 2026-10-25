/**
 * @file page3/components/GuestSuggestionCard.tsx
 * @owner Member 2 — Frontend Dev 2
 *
 * Card for a guest-submitted suggestion awaiting curator approval.
 * Shows the suggested gift, the submitter, their message, and
 * Approve / Decline actions. Week 4 wires the actions to mutations.
 */

import React from 'react';
import { Check, X, MessageCircle, User } from 'lucide-react';
import type { GiftSuggestion, Currency } from '../types';
import { formatCurrency } from '../lib/utils';

interface GuestSuggestionCardProps {
  suggestion: GiftSuggestion;
  currency: Currency;
  onApprove?: () => void;
  onDecline?: () => void;
}

export function GuestSuggestionCard({
  suggestion,
  currency,
  onApprove,
  onDecline,
}: GuestSuggestionCardProps): React.JSX.Element {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-amber-50/50 ring-1 ring-amber-200/70">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={suggestion.gift.image}
          alt={suggestion.gift.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          Pending review
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold text-stone-800">
            {suggestion.gift.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-stone-600">
            {suggestion.gift.description}
          </p>
        </div>

        {suggestion.message && (
          <blockquote className="rounded-lg bg-white/70 p-3 text-sm text-stone-700 ring-1 ring-amber-200/60">
            <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {suggestion.suggestedByName}
            </div>
            <p className="italic">&ldquo;{suggestion.message}&rdquo;</p>
          </blockquote>
        )}

        {!suggestion.message && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            Suggested by {suggestion.suggestedByName}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-stone-900">
            {formatCurrency(suggestion.gift.priceCents, currency, {
              trimCents: true,
            })}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDecline}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 ring-1 ring-stone-300 transition-colors hover:bg-stone-50"
              aria-label={`Decline suggestion from ${suggestion.suggestedByName}`}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Decline
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
              aria-label={`Approve suggestion from ${suggestion.suggestedByName}`}
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Approve
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
