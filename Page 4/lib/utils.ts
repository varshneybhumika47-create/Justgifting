/**
 * @file page4/lib/utils.ts
 * @owner Member 3 — Frontend Dev 3 (shared formatting helpers)
 *
 * Mirrors page 3's utils in Week 1 — Week 2 promotes these to a shared
 * `@/lib/format` module so both pages (and Person 1's pages 1–2) use the
 * same currency / date / relative-time formatters.
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

/**
 * Relative time formatter used by the recent-contributions stream.
 * @example formatRelativeTime('2026-10-20T19:30:00Z') → "5 days ago"
 */
export function formatRelativeTime(
  isoTimestamp: string,
  now: Date = new Date(),
): string {
  const then = new Date(isoTimestamp).getTime();
  const diffMs = now.getTime() - then;
  const diffMin = Math.round(diffMs / 60_000);
  const diffHr = Math.round(diffMs / 3_600_000);
  const diffDay = Math.round(diffMs / 86_400_000);

  if (diffMs < 0) return 'just now';
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  const diffMonth = Math.round(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
  const diffYear = Math.round(diffDay / 365);
  return `${diffYear} year${diffYear === 1 ? '' : 's'} ago`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
