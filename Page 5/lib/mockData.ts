/**
 * @file page5/lib/mockData.ts
 * @owner Member 3 — Frontend Dev 3 (Week 1 scaffolding)
 *
 * Static fixture matching the page 5 screenshot:
 *  - 75% funded (₹46,000 / ₹60,000)
 *  - Wishlist: Espresso Machine ₹24,999, Ceramic Dinnerware ₹12,000,
 *    Weekend Mountain Getaway ₹22,500
 */

import type { PublicCampaign } from '../types';

export const mockPublicCampaign: PublicCampaign = {
  event: {
    shareToken: 'maya-turns-30',
    title: "Maya's 30th Birthday",
    occasion: '30th Birthday',
    recipientName: 'Maya Sharma',
    eventDate: '2026-11-23',
    goalCents: 6000000, // ₹60,000
    collectedCents: 4600000, // ₹46,000 → 75%
    currency: 'inr',
    coverImage:
      'https://images.unsplash.com/photo-1530103862676-d8967872c6cf?auto=format&fit=crop&w=1600&q=80',
    contributorsCount: 18,
    daysRemaining: 29,
  },
  host: {
    name: 'Abhinav & Bhumika',
    relationshipToRecipient: 'best friends',
    avatar:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=120&q=80',
  },
  wishlist: [
    {
      id: 'gift_espresso_machine',
      title: 'Italian Espresso Machine',
      description:
        'A PID-controlled single-boiler espresso machine. The one she has been eyeing since last winter.',
      priceCents: 2499900, // ₹24,999
      image:
        'https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=800&q=80',
      collectedCents: 1875000, // ₹18,750 — partially funded
      contributionCount: 7,
      status: 'open',
    },
    {
      id: 'gift_ceramic_dinnerware',
      title: 'Hand-thrown Ceramic Dinnerware Set',
      description:
        'A 12-piece stoneware set (4 dinner plates, 4 side plates, 4 bowls) — warm matte glaze, dishwasher safe.',
      priceCents: 1200000, // ₹12,000
      image:
        'https://images.unsplash.com/photo-1565190106-9d4c0b8d8f9e?auto=format&fit=crop&w=800&q=80',
      collectedCents: 1200000, // fully funded
      contributionCount: 4,
      status: 'fully_funded',
    },
    {
      id: 'gift_mountain_getaway',
      title: 'Weekend Mountain Getaway',
      description:
        'A two-night stay at a boutique cabin in Manali — for two. Includes a private hot tub and breakfast.',
      priceCents: 2250000, // ₹22,500
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      collectedCents: 1525000, // ₹15,250 — partially funded
      contributionCount: 7,
      status: 'open',
    },
  ],
};
