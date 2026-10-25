/**
 * @file page3/types/index.ts
 * @owner Member 5 — Database Engineer / Lead
 *
 * TypeScript interfaces mirroring the Supabase / PostgreSQL schema for the
 * gift-recommendation domain (page 3). These are the source of truth for
 * both the frontend (page 3) and the FastAPI backend (Member 4) — Member 4
 * must keep the API response shapes 1:1 with the types below.
 *
 * Schema reference (Supabase / PostgreSQL):
 *
 *   events           (id, title, recipient_id, occasion, event_date,
 *                     total_budget_cents, allocated_budget_cents,
 *                     currency, cover_image_url, created_at)
 *   gifts            (id, event_id, title, description, price_cents,
 *                     image_url, source_url, status, suggested_by_id,
 *                     selected_at, created_at)
 *   gift_suggestions (id, gift_id, suggested_by_name, message,
 *                     submitted_at, status)
 *   profiles         (id, full_name, avatar_url)
 *
 * All monetary values are stored as integer cents and exposed as cents
 * to avoid floating-point drift. The frontend formats them via
 * `lib/utils.ts → formatCurrency()`.
 */

/** ISO 4217 currency code. Backend guarantees lower-case storage. */
export type Currency = 'inr' | 'usd' | 'eur' | 'gbp';

/** Status lifecycle of a gift inside an event. */
export type GiftStatus = 'suggested' | 'selected' | 'purchased' | 'declined';

/** Status of a guest-submitted suggestion awaiting curator review. */
export type SuggestionStatus = 'pending' | 'approved' | 'declined';

/**
 * `events` row — one per celebration (birthday, wedding, baby shower…).
 * Member 1's RecipientProfile component reads the `recipientId` to render
 * the recipient card on pages 1–2.
 */
export interface Event {
  id: string;
  title: string;
  recipientId: string;
  recipientName: string;
  occasion: string;
  eventDate: string; // ISO 8601 date
  totalBudgetCents: number;
  allocatedBudgetCents: number;
  currency: Currency;
  coverImage: string;
  createdAt: string; // ISO 8601 timestamp
}

/**
 * `gifts` row — a gift attached to an event.
 * `status` drives which section of page 3 the card renders in.
 */
export interface Gift {
  id: string;
  eventId: string;
  title: string;
  description: string;
  priceCents: number;
  image: string;
  sourceUrl?: string;
  status: GiftStatus;
  suggestedBy?: string; // guest display name when status === 'suggested'
  selectedAt?: string; // ISO 8601 when status === 'selected'
}

/**
 * `gift_suggestions` row — a guest's pitch for a gift idea, awaiting
 * curator approval. Mirrors the right-hand "Suggestions from guests"
 * column on page 3.
 */
export interface GiftSuggestion {
  id: string;
  giftId: string;
  suggestedByName: string;
  message?: string;
  submittedAt: string; // ISO 8601
  status: SuggestionStatus;
  /** Snapshot of gift fields shown before approval. */
  gift: {
    title: string;
    description: string;
    priceCents: number;
    image: string;
    sourceUrl?: string;
  };
}

/**
 * Aggregate payload returned by `GET /events/:id/with-gifts`.
 * Shape mirrors the page 3 layout exactly so the renderer can map 1:1.
 */
export interface EventWithGifts {
  event: Event;
  curatedGifts: Gift[];
  guestSuggestions: GiftSuggestion[];
}

/**
 * Request payloads — kept here (not in api.ts) because the DB engineer
 * owns the canonical request/response contract.
 */
export interface SelectGiftRequest {
  giftId: string;
  eventId: string;
}

export interface ApproveSuggestionRequest {
  suggestionId: string;
  eventId: string;
}

export interface DeclineSuggestionRequest {
  suggestionId: string;
  eventId: string;
  reason?: string;
}
