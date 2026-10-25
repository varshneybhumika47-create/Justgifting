/**
 * @file page3/lib/mockData.ts
 * @owner Member 2 — Frontend Dev 2 (Week 1 scaffolding)
 *
 * Static fixture matching the page 3 screenshot ("Maya's 30th Birthday",
 * ₹15,000 budget, three curated gifts + one pending guest suggestion).
 * Drives the page until Week 3 swaps in the live API call.
 */

import type { EventWithGifts } from '../types';

export const mockEventWithGifts: EventWithGifts = {
  event: {
    id: 'evt_maya_30',
    title: "Maya's 30th Birthday",
    recipientId: 'prof_maya',
    recipientName: 'Maya Sharma',
    occasion: '30th Birthday',
    eventDate: '2026-11-23',
    totalBudgetCents: 1500000, // ₹15,000.00
    allocatedBudgetCents: 227000, // ₹2,270 — only one gift truly selected in the screenshot
    currency: 'inr',
    coverImage:
      'https://images.unsplash.com/photo-1530103862676-d8967872c6cf?auto=format&fit=crop&w=1600&q=80',
    createdAt: '2026-10-01T10:00:00Z',
  },
  curatedGifts: [
    {
      id: 'gift_ceramic_pourover',
      eventId: 'evt_maya_30',
      title: 'Ceramic Pour-Over Coffee Set',
      description:
        'Hand-thrown stoneware carafe and dripper from a Kyoto pottery studio. Slow mornings, reimagined.',
      priceCents: 450000, // ₹4,500
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://example-shop.com/ceramic-pourover',
      status: 'selected',
      selectedAt: '2026-10-12T09:30:00Z',
    },
    {
      id: 'gift_botanical_watercolour',
      eventId: 'evt_maya_30',
      title: 'Botanical Watercolour Set',
      description:
        '24-pan professional watercolour set with cotton paper block and sable brush. For the balcony garden sketches.',
      priceCents: 620000, // ₹6,200
      image:
        'https://images.unsplash.com/photo-1513519245088-0e12902e5b5d?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://example-shop.com/botanical-set',
      status: 'selected',
      selectedAt: '2026-10-12T10:05:00Z',
    },
    {
      id: 'gift_burr_grinder',
      eventId: 'evt_maya_30',
      title: 'Conical Burr Grinder',
      description:
        '40-step adjustment, static-reducing catch cup. The upgrade that makes pour-over actually taste different.',
      priceCents: 1200000, // ₹12,000
      image:
        'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://example-shop.com/burr-grinder',
      status: 'selected',
      selectedAt: '2026-10-13T14:20:00Z',
    },
  ],
  guestSuggestions: [
    {
      id: 'sugg_terracotta_planters',
      giftId: 'gift_terracotta_planters_pending',
      suggestedByName: 'Aarav (cousin)',
      message:
        "She mentioned wanting to repot the balcony herbs — this set comes with six pots and a tray.",
      submittedAt: '2026-10-15T18:42:00Z',
      status: 'pending',
      gift: {
        title: 'Terracotta Planter Set',
        description:
          'Six hand-glazed terracotta pots with matching saucer tray. Drainage holes pre-drilled.',
        priceCents: 165000, // ₹1,650
        image:
          'https://images.unsplash.com/photo-1485955904789-3d7fd75e3b3d?auto=format&fit=crop&w=800&q=80',
        sourceUrl: 'https://example-shop.com/terracotta-set',
      },
    },
  ],
};
