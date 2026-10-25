/**
 * @file page5/lib/api.ts
 * @owner Member 4 — Backend Dev (FastAPI integration)
 *
 * Typed REST client for the public-gifting endpoints consumed by page 5.
 *
 * Endpoint contract (FastAPI — owned by Member 4):
 *
 *   GET   /api/v1/public/campaigns/:shareToken               → PublicCampaign
 *   POST  /api/v1/public/campaigns/:shareToken/contributions
 *         → CreateContributionResponse (201)
 *
 * Auth: none required — this is the public unauthenticated flow.
 * Rate-limiting is enforced by Member 4 (per IP, per share-token).
 */

import type {
  PublicCampaign,
  CreateContributionRequest,
  CreateContributionResponse,
} from '../types';

export type { PublicCampaign };

const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
  'http://localhost:8000';

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
      `[page5 api] ${init?.method ?? 'GET'} ${path} → ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch the public projection of a campaign by its share token.
 * This is the single call page 5 needs to render.
 */
export async function getPublicCampaign(
  shareToken: string,
): Promise<PublicCampaign> {
  return apiRequest<PublicCampaign>(
    `/api/v1/public/campaigns/${shareToken}`,
  );
}

/**
 * Submit a contribution. Week 4 wires the form; Week 6 attaches the
 * payment method id from the gateway tokenisation step.
 */
export async function createContribution(
  req: CreateContributionRequest,
): Promise<CreateContributionResponse> {
  return apiRequest<CreateContributionResponse>(
    `/api/v1/public/campaigns/${req.shareToken}/contributions`,
    {
      method: 'POST',
      body: JSON.stringify({
        gift_id: req.giftId,
        amount_cents: req.amountCents,
        donor_name: req.donorName,
        message: req.message,
        is_anonymous: req.isAnonymous,
        payment_method_id: req.paymentMethodId,
      }),
    },
  );
}
