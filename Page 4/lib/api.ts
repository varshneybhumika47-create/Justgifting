/**
 * @file page4/lib/api.ts
 * @owner Member 4 — Backend Dev (FastAPI integration)
 *
 * Typed REST client for the creator-dashboard endpoints consumed by page 4.
 *
 * Endpoint contract (FastAPI — owned by Member 4):
 *
 *   GET    /api/v1/campaigns/:campaignId/dashboard        → CampaignDashboard
 *   PATCH  /api/v1/campaigns/:campaignId/visibility
 *   POST   /api/v1/campaigns/:campaignId/share-link/regenerate
 *
 * Auth: Bearer token from Member 1's AuthContext. Week 5 enforces creator
 * ownership server-side (Member 4) and client-side (this page).
 */

import type {
  CampaignDashboard,
  TogglePublicRequest,
  RegenerateShareLinkRequest,
} from '../types';

export type { CampaignDashboard };

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
      `[page4 api] ${init?.method ?? 'GET'} ${path} → ${res.status} ${res.statusText}`,
    );
  }

  // 204 No Content for PATCH / POST in some flows
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/**
 * Fetch the aggregate dashboard payload for one campaign.
 * Single call — page 4 renders everything from this response.
 */
export async function getCampaignDashboard(
  campaignId: string,
): Promise<CampaignDashboard> {
  return apiRequest<CampaignDashboard>(
    `/api/v1/campaigns/${campaignId}/dashboard`,
  );
}

/** Toggle the campaign between public / private. Returns updated share URL. */
export async function toggleCampaignVisibility(
  req: TogglePublicRequest,
): Promise<{ shareUrl: string; isPublic: boolean }> {
  return apiRequest<{ shareUrl: string; isPublic: boolean }>(
    `/api/v1/campaigns/${req.campaignId}/visibility`,
    {
      method: 'PATCH',
      body: JSON.stringify({ is_public: req.isPublic }),
    },
  );
}

/** Regenerate the public share URL (invalidates the previous one). */
export async function regenerateShareLink(
  req: RegenerateShareLinkRequest,
): Promise<{ shareUrl: string }> {
  return apiRequest<{ shareUrl: string }>(
    `/api/v1/campaigns/${req.campaignId}/share-link/regenerate`,
    { method: 'POST' },
  );
}
