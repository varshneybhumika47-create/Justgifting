/**
 * @file page5/types/index.ts
 * @owner Member 5 — Database Engineer / Lead
 *
 * TypeScript interfaces mirroring the Supabase / PostgreSQL schema for the
 * public-gifting domain (page 5). The public campaign payload is a
 * redacted projection of the campaign — donor names, internal IDs, and
 * financial splits are NOT exposed. The backend (Member 4) enforces this.
 *
 * Schema reference (Supabase / PostgreSQL):
 *
 *   campaigns         (id, title, occasion, recipient_name, host_name,
 *                      event_date, goal_cents, collected_cents, currency,
 *                      cover_image_url, days_remaining, contributors_count,
 *                      share_token)
 *   wishlist_gifts    (id, campaign_id, title, description, price_cents,
 *                      image_url, collected_cents, contribution_count,
 *                      is_funded)
 *
 * The public endpoint returns only the fields below — no donor list, no
 * internal campaign id, no creator id. This is a deliberate privacy choice
 * owned by Member 5 (schema) and Member 4 (API projection).
 */

/** ISO 4217 currency code. Backend guarantees lower-case storage. */
export type Currency = 'inr' | 'usd' | 'eur' | 'gbp';

/** Status of a wishlist gift on the public page. */
export type WishlistGiftStatus =
  | 'open' // accepting contributions
  | 'fully_funded' // goal reached, contributions disabled
  | 'closed'; // campaign ended, no longer accepting

/** Public projection of `campaigns` — no internal IDs, no creator info. */
export interface PublicEvent {
  /** Public share token used in the URL — NOT the internal campaign id. */
  shareToken: string;
  title: string;
  occasion: string;
  recipientName: string;
  eventDate: string; // ISO 8601
  goalCents: number;
  collectedCents: number;
  currency: Currency;
  coverImage: string;
  contributorsCount: number;
  daysRemaining: number;
}

/** Host/organiser info — public so contributors know who they're gifting with. */
export interface CampaignHost {
  name: string;
  relationshipToRecipient?: string; // e.g. "Best friend"
  avatar?: string;
}

/** Public projection of `wishlist_gifts` — no donor list, no internal refs. */
export interface WishlistGift {
  id: string; // public-facing id, NOT the row id
  title: string;
  description: string;
  priceCents: number;
  image: string;
  collectedCents: number;
  contributionCount: number;
  status: WishlistGiftStatus;
}

/** Aggregate payload returned by `GET /api/v1/public/campaigns/:shareToken`. */
export interface PublicCampaign {
  event: PublicEvent;
  host: CampaignHost;
  wishlist: WishlistGift[];
}

/**
 * Contribution submission payload. Week 4 wires this to the API; Week 6
 * adds payment gateway fields (payment_method_id, etc).
 */
export interface CreateContributionRequest {
  shareToken: string;
  giftId: string;
  amountCents: number;
  donorName?: string | null; // null = anonymous
  message?: string;
  isAnonymous: boolean;
  /** Week 6: payment method id from the gateway tokenisation step. */
  paymentMethodId?: string;
}

export interface CreateContributionResponse {
  contributionId: string;
  receiptUrl: string;
  giftCollectedCents: number; // updated total after this contribution
  giftStatus: WishlistGiftStatus; // status after this contribution
}
