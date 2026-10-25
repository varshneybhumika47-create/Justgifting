/**
 * @file page3/lib/utils.ts
 * @owner Member 3 — Frontend Dev 3 (shared formatting helpers, responsive UI)
 *
 * Small, dependency-free formatting helpers used across page 3 components.
 * The same utility set is mirrored in page 4 and page 5 in Week 1 — Week 2
 * will promote these to a shared `@/lib/format` module owned by Member 3.
 */

import type { Currency } from '../types';

const CURRENCY_LOCALE: Record<Currency, string> = {
  inr: 'en-IN',
  usd: 'en-US',
  eur: 'en-IE',
  gbp: 'en-GB',
};

const CURRENCY_CODE: Record<Currency, string> = {
  inr: 'INR',
  usd: 'USD',
  eur: 'EUR',
  gbp: 'GBP',
};

/**
 * Format an integer-cents amount as a currency string for display.
 *
 * @example formatCurrency(450000, 'inr') → "₹4,500.00"
 *          formatCurrency(620000, 'inr', { trimCents: true }) → "₹6,200"
 */
export function formatCurrency(
  amountCents: number,
  currency: Currency,
  options: { trimCents?: boolean } = {},
): string {
  const value = amountCents / 100;
  const formatter = new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: 'currency',
    currency: CURRENCY_CODE[currency],
    minimumFractionDigits: options.trimCents ? 0 : 2,
    maximumFractionDigits: options.trimCents ? 0 : 2,
  });
  return formatter.format(value);
}

/** Format an ISO date as a friendly long-form string. */
export function formatEventDate(isoDate: string): string {
  const d = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

/** Days remaining until the event (negative if past). */
export function daysUntil(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(isoDate);
  event.setHours(0, 0, 0, 0);
  return Math.round((event.getTime() - today.getTime()) / 86_400_000);
}

/** Convert a Tailwind class string + conditional class object into one string. */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}
