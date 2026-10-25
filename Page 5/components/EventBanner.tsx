/**
 * @file page5/components/EventBanner.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Hero banner for the public gifting page: full-bleed cover image,
 * occasion, recipient name, host card overlay, event date. Responsive —
 * image height shrinks on mobile, host card stacks below on small screens.
 */

import React from 'react';
import { Calendar, Heart, User } from 'lucide-react';
import type { PublicEvent, CampaignHost } from '../types';
import { formatEventDate, cx } from '../lib/utils';

interface EventBannerProps {
  event: PublicEvent;
  host: CampaignHost;
}

export function EventBanner({
  event,
  host,
}: EventBannerProps): React.JSX.Element {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Cover */}
      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.coverImage}
          alt={`${event.occasion} cover`}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-stone-900/10" />
      </div>

      {/* Overlay text + host card — absolutely positioned on md+, static on mobile */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-rose-200">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                {event.occasion}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="inline-flex items-center gap-1.5 text-sm text-stone-200">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={event.eventDate}>
                  {formatEventDate(event.eventDate)}
                </time>
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur ring-1 ring-white/40 sm:p-4">
              {host.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={host.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <User className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Hosted by</p>
                <p className="truncate text-sm font-semibold text-stone-800">
                  {host.name}
                </p>
                {host.relationshipToRecipient && (
                  <p className="truncate text-xs text-stone-500">
                    {host.relationshipToRecipient}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Re-export so consumers can grab the cx helper from this module if needed.
export { cx };
