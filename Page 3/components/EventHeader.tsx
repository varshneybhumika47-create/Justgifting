/**
 * @file page3/components/EventHeader.tsx
 * @owner Member 2 — Frontend Dev 2
 *
 * Top-of-page banner for page 3. Shows the event's cover image, title,
 * recipient name, occasion, and event date. Responsive: image crops to a
 * 16:9 banner on desktop, falls back to a gradient block on mobile if the
 * cover image fails to load.
 */

import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import type { Event } from '../types';
import { formatEventDate, daysUntil, cx } from '../lib/utils';

interface EventHeaderProps {
  event: Pick<
    Event,
    'title' | 'recipientName' | 'occasion' | 'eventDate' | 'coverImage'
  >;
  className?: string;
}

export function EventHeader({
  event,
  className,
}: EventHeaderProps): React.JSX.Element {
  const days = daysUntil(event.eventDate);

  return (
    <header
      className={cx(
        'overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60',
        className,
      )}
    >
      <div className="relative h-48 w-full sm:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.coverImage}
          alt={`${event.occasion} cover`}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-rose-200">
            <Gift className="h-3.5 w-3.5" aria-hidden="true" />
            {event.occasion}
          </p>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {event.title}
          </h1>
          <p className="mt-1 text-sm text-stone-200">
            For {event.recipientName}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <div className="inline-flex items-center gap-2 text-sm text-stone-600">
          <Calendar className="h-4 w-4 text-stone-400" aria-hidden="true" />
          <time dateTime={event.eventDate}>{formatEventDate(event.eventDate)}</time>
        </div>
        <span
          className={cx(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
            days > 7
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : days > 0
                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                : 'bg-stone-100 text-stone-500 ring-1 ring-stone-200',
          )}
        >
          {days > 0
            ? `${days} day${days === 1 ? '' : 's'} to go`
            : days === 0
              ? 'Today!'
              : `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`}
        </span>
      </div>
    </header>
  );
}
