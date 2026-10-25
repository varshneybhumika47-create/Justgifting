/**
 * @file page3/lib/api.ts
 * @owner Member 4 — Backend Dev (FastAPI integration)
 *
 * Thin typed REST client for the gift-recommendation endpoints consumed by
 * page 3. In Week 1 these functions are wired but the page reads from
 * `mockData.ts` instead — flip the flag in `page.tsx` (Week 3) to go live.
 *
 * Endpoint contract (FastAPI — owned by Member 4):
 *
 *   GET    /api/v1/events/:eventId/with-gifts        → EventWithGifts
 *   POST   /api/v1/events/:eventId/gifts/:giftId/select
 *   POST   /api/v1/events/:eventId/suggestions/:id/approve
 *   POST   /api/v1/events/:eventId/suggestions/:id/decline
 *
 * Auth: Bearer token from Member 1's AuthContext (sent automatically once
 * the shared fetcher in `@/lib/apiClient` lands in Week 3).
 */

import type {
  EventWithGifts,
  SelectGiftRequest,
  ApproveSuggestionRequest,
  DeclineSuggestionRequest,
} from '../types';

export type { EventWithGifts };

const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
  'http://localhost:8000';

/**
 * Internal fetch wrapper. Centralised so auth headers and JSON parsing
 * live in one place. Person 1 will replace this with the shared
 * `@/lib/apiClient` once their auth context is ready (Week 3).
 */
async function apiRequest<T>(
  path: string,
  init?: RequestInit & { method?: string },
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    throw new Error(
      `[page3 api] ${init?.method ?? 'GET'} ${path} → ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch an event together with its curated gifts and pending guest
 * suggestions. This is the single call page 3 needs to render.
 */
export async function getEventWithGifts(
  eventId: string,
): Promise<EventWithGifts> {
  return apiRequest<EventWithGifts>(`/api/v1/events/${eventId}/with-gifts`);
}

/** Curator marks a gift as "Selected" → moves it to the curated shortlist. */
export async function selectGift(req: SelectGiftRequest): Promise<void> {
  await apiRequest(
    `/api/v1/events/${req.eventId}/gifts/${req.giftId}/select`,
    { method: 'POST' },
  );
}

/** Curator approves a guest suggestion → promotes it to a real gift row. */
export async function approveSuggestion(
  req: ApproveSuggestionRequest,
): Promise<void> {
  await apiRequest(
    `/api/v1/events/${req.eventId}/suggestions/${req.suggestionId}/approve`,
    { method: 'POST' },
  );
}

/** Curator declines a guest suggestion with optional reason. */
export async function declineSuggestion(
  req: DeclineSuggestionRequest,
): Promise<void> {
  await apiRequest(
    `/api/v1/events/${req.eventId}/suggestions/${req.suggestionId}/decline`,
    { method: 'POST', body: JSON.stringify({ reason: req.reason }) },
  );
}
