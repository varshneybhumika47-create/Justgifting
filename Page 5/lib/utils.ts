/**
 * @file page5/lib/utils.ts
 * @owner Member 3 — Frontend Dev 3 (shared formatting helpers)
 *
 * Same formatter set as page 3 / page 4 — Week 2 promotes to a shared
 * `@/lib/format` module.
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

export function formatEventDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Default contribution amounts suggested in the modal (₹). */
export const PRESET_CONTRIBUTIONS_INR = [500, 1000, 2000, 5000];
