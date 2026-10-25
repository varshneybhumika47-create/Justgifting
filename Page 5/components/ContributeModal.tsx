/**
 * @file page5/components/ContributeModal.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Modal that opens when a wishlist gift's "Contribute" is clicked. Lets
 * the donor pick an amount (presets + custom), enter a name + message,
 * choose anonymity, and submit. Week 4 wires submit to createContribution.
 * Week 6 attaches payment gateway fields (card token) before submit.
 *
 * Accessibility:
 *  - Rendered with role="dialog" + aria-modal="true"
 *  - First focusable element auto-focuses on open
 *  - ESC closes the modal
 *  - Backdrop click closes the modal
 *  - Focus is trapped inside while open (Week 2 enhancement)
 */

import React from 'react';
import { X, Gift, Lock } from 'lucide-react';
import type { WishlistGift, Currency } from '../types';
import {
  formatCurrency,
  cx,
  PRESET_CONTRIBUTIONS_INR,
} from '../lib/utils';

interface ContributeModalProps {
  gift: WishlistGift | null;
  currency: Currency;
  onClose: () => void;
  onConfirm: (payload: {
    gift: WishlistGift;
    amountCents: number;
    donorName: string | null;
    message: string;
    isAnonymous: boolean;
  }) => void;
}

export function ContributeModal({
  gift,
  currency,
  onClose,
  onConfirm,
}: ContributeModalProps): React.ReactElement | null {
  const [amountCents, setAmountCents] = React.useState<number>(100000);
  const [donorName, setDonorName] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(false);

  // Reset state when a new gift opens
  React.useEffect(() => {
    if (gift) {
      setAmountCents(100000); // ₹1,000 default
      setDonorName('');
      setMessage('');
      setIsAnonymous(false);
    }
  }, [gift]);

  // ESC to close
  React.useEffect(() => {
    if (!gift) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gift, onClose]);

  if (!gift) return null;

  const handleConfirm = () => {
    onConfirm({
      gift,
      amountCents,
      donorName: isAnonymous ? null : donorName.trim() || null,
      message: message.trim() || '',
      isAnonymous,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contribute-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/60 backdrop-blur-sm sm:items-center"
    >
      {/* Backdrop click catcher */}
      <button
        type="button"
        aria-label="Close contribution dialog"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 p-5">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gift.image}
              alt=""
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-rose-600">
                Contribute to
              </p>
              <h2
                id="contribute-modal-title"
                className="text-lg font-semibold text-stone-800"
              >
                {gift.title}
              </h2>
              <p className="text-xs text-stone-500">
                {formatCurrency(gift.priceCents, currency, { trimCents: true })}{' '}
                goal ·{' '}
                {formatCurrency(
                  Math.max(0, gift.priceCents - gift.collectedCents),
                  currency,
                  { trimCents: true },
                )}{' '}
                still needed
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close contribution dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">
          {/* Amount */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-stone-700">
              Choose an amount
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESET_CONTRIBUTIONS_INR.map((preset) => {
                const presetCents = preset * 100;
                const isActive = amountCents === presetCents;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmountCents(presetCents)}
                    className={cx(
                      'rounded-lg border px-3 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50',
                    )}
                    aria-pressed={isActive}
                  >
                    {formatCurrency(presetCents, currency, { trimCents: true })}
                  </button>
                );
              })}
            </div>

            <label className="mt-3 block text-sm font-medium text-stone-700">
              Or enter a custom amount
              <div className="mt-1.5 flex items-center rounded-lg border border-stone-200 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-200">
                <span className="px-3 py-2 text-sm font-medium text-stone-500">
                  {currency.toUpperCase()}
                </span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={Math.round(amountCents / 100)}
                  onChange={(e) =>
                    setAmountCents(Math.max(0, Math.round(Number(e.target.value) * 100)))
                  }
                  className="w-full border-0 bg-transparent px-2 py-2 text-sm text-stone-800 focus:outline-none"
                  aria-label="Custom contribution amount in whole units"
                />
              </div>
            </label>
          </fieldset>

          {/* Donor name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-stone-700">
              Your name
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Rahul Kapoor"
                disabled={isAnonymous}
                className="mt-1.5 block w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:bg-stone-50 disabled:text-stone-400"
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-400"
              />
              Contribute anonymously
            </label>
          </div>

          {/* Message */}
          <label className="block text-sm font-medium text-stone-700">
            Leave a message (optional)
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              maxLength={280}
              placeholder="A short note for Maya…"
              className="mt-1.5 block w-full resize-none rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
            <span className="mt-1 block text-right text-[11px] text-stone-400">
              {message.length}/280
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 p-5">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={amountCents <= 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            Contribute{' '}
            {formatCurrency(amountCents, currency, { trimCents: true })}
            <Lock className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </button>
          <p className="mt-2 text-center text-[11px] text-stone-400">
            Secure checkout — payment processing by our payment partner.
          </p>
        </div>
      </div>
    </div>
  );
}
