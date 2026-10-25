/**
 * @file page4/lib/mockData.ts
 * @owner Member 3 — Frontend Dev 3 (Week 1 scaffolding)
 *
 * Static fixture matching the page 4 screenshot:
 *  - Total budget ₹24,700 · Collected ₹18,500 · Remaining ₹6,200 · 2/4 achieved
 *  - Recent contributions: Rahul Kapoor ₹12,500, Anonymous ₹4,500, ...
 */

import type { CampaignDashboard } from '../types';

export const mockCampaignDashboard: CampaignDashboard = {
  campaign: {
    id: 'cmp_maya_birthday',
    creatorId: 'usr_abhinav',
    creatorName: 'Abhinav Varshney',
    title: "Maya's 30th Birthday",
    totalBudgetCents: 2470000, // ₹24,700
    collectedCents: 1850000, // ₹18,500
    currency: 'inr',
    giftsTotal: 4,
    giftsAchieved: 2,
    shareUrl: 'https://justgifting.app/p/maya-turns-30',
    isPublic: true,
    createdAt: '2026-10-01T10:00:00Z',
  },
  giftProgress: [
    {
      id: 'gift_ceramic_pourover',
      campaignId: 'cmp_maya_birthday',
      title: 'Ceramic Pour-Over Coffee Set',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
      priceCents: 450000, // ₹4,500
      collectedCents: 450000, // fully funded
      status: 'fully_funded',
      fundedAt: '2026-10-12T09:30:00Z',
    },
    {
      id: 'gift_botanical_watercolour',
      campaignId: 'cmp_maya_birthday',
      title: 'Botanical Watercolour Set',
      image:
        'https://images.unsplash.com/photo-1513519245088-0e12902e5b5d?auto=format&fit=crop&w=400&q=80',
      priceCents: 620000, // ₹6,200
      collectedCents: 620000, // fully funded
      status: 'fully_funded',
      fundedAt: '2026-10-14T15:10:00Z',
    },
    {
      id: 'gift_burr_grinder',
      campaignId: 'cmp_maya_birthday',
      title: 'Conical Burr Grinder',
      image:
        'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=400&q=80',
      priceCents: 1200000, // ₹12,000
      collectedCents: 780000, // ₹7,800 of ₹12,000 → 65%
      status: 'partially_funded',
    },
    {
      id: 'gift_terracotta_planters',
      campaignId: 'cmp_maya_birthday',
      title: 'Terracotta Planter Set',
      image:
        'https://images.unsplash.com/photo-1485955904789-3d7fd75e3b3d?auto=format&fit=crop&w=400&q=80',
      priceCents: 200000, // ₹2,000 (small gap to make total come to ₹24,700)
      collectedCents: 0,
      status: 'unfunded',
    },
  ],
  recentContributions: [
    {
      id: 'cntrb_001',
      campaignId: 'cmp_maya_birthday',
      giftId: 'gift_burr_grinder',
      giftTitle: 'Conical Burr Grinder',
      donorName: 'Rahul Kapoor',
      amountCents: 1250000, // ₹12,500
      message: 'For the best barista in our friend group. Happy 30th, Maya!',
      isAnonymous: false,
      createdAt: '2026-10-20T19:30:00Z',
    },
    {
      id: 'cntrb_002',
      campaignId: 'cmp_maya_birthday',
      giftId: 'gift_botanical_watercolour',
      giftTitle: 'Botanical Watercolour Set',
      donorName: null,
      amountCents: 450000, // ₹4,500
      isAnonymous: true,
      createdAt: '2026-10-18T12:15:00Z',
    },
    {
      id: 'cntrb_003',
      campaignId: 'cmp_maya_birthday',
      giftId: 'gift_burr_grinder',
      giftTitle: 'Conical Burr Grinder',
      donorName: 'Priya & Karan',
      amountCents: 330000, // ₹3,300
      message: 'From us, with love. The grinder is half from us, half from Maya.',
      isAnonymous: false,
      createdAt: '2026-10-16T09:00:00Z',
    },
    {
      id: 'cntrb_004',
      campaignId: 'cmp_maya_birthday',
      giftId: 'gift_ceramic_pourover',
      giftTitle: 'Ceramic Pour-Over Coffee Set',
      donorName: 'Mom & Dad',
      amountCents: 450000, // ₹4,500
      isAnonymous: false,
      createdAt: '2026-10-12T09:30:00Z',
    },
  ],
};
