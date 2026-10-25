/**
 * @file page4/types/index.ts
 * @owner Member 5 — Database Engineer / Lead
 *
 * TypeScript interfaces mirroring the Supabase / PostgreSQL schema for the
 * creator-dashboard domain (page 4). These types are the source of truth
 * shared with the FastAPI backend (Member 4).
 *
 * Schema reference (Supabase / PostgreSQL):
 *
 *   campaigns         (id, creator_id, title, total_budget_cents,
 *                      collected_cents, currency, gifts_total, gifts_achieved,
 *                      share_url, is_public, created_at)
 *   gifts             (id, campaign_id, title, price_cents, image_url,
 *                      collected_cents, status, funded_at)
 *   contributions      (id, campaign_id, gift_id, donor_name, donor_user_id,
 *                      amount_cents, message, is_anonymous, created_at)
 *
 * All monetary values are integer cents.
 */

/** ISO 4217 currency code. Backend guarantees lower-case storage. */
export type Currency = 'inr' | 'usd' | 'eur' | 'gbp';

/** Funding state of a single gift as shown on the dashboard. */
export type GiftFundingStatus =
  | 'unfunded'
  | 'partially_funded'
  | 'fully_funded'
  | 'over_funded';

/** `campaigns` row — one crowdfunding campaign for an event. */
export interface Campaign {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  totalBudgetCents: number;
  collectedCents: number;
  currency: Currency;
  giftsTotal: number;
  giftsAchieved: number;
  shareUrl: string;
  isPublic: boolean;
  createdAt: string; // ISO 8601
}

/** `gifts` row projection for the dashboard progress list. */
export interface GiftProgress {
  id: string;
  campaignId: string;
  title: string;
  image: string;
  priceCents: number;
  collectedCents: number;
  status: GiftFundingStatus;
  fundedAt?: string; // ISO 8601 when status === 'fully_funded'
}

/** `contributions` row projection for the recent-contributions stream. */
export interface Contribution {
  id: string;
  campaignId: string;
  giftId?: string;
  giftTitle?: string;
  donorName: string | null; // null when is_anonymous === true
  amountCents: number;
  message?: string;
  isAnonymous: boolean;
  createdAt: string; // ISO 8601
}

/** Aggregate payload returned by `GET /api/v1/campaigns/:id/dashboard`. */
export interface CampaignDashboard {
  campaign: Campaign;
  giftProgress: GiftProgress[];
  recentContributions: Contribution[];
}

/** Mutation payloads — Member 5 owns the canonical request shapes. */
export interface TogglePublicRequest {
  campaignId: string;
  isPublic: boolean;
}

export interface RegenerateShareLinkRequest {
  campaignId: string;
}
