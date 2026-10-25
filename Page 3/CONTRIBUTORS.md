# Contributors — page3 (Week 1)

This document records the per-file role attribution for the Week-1 deliverable of page 3.
The five-role split mirrors the project's team-roles document; physical authorship of the
frontend files sits with Abhinav, but the architecture is intentionally divided so the
backend and database contributions are first-class from Week 1.

| Member | Role | Files in this folder |
|---|---|---|
| **Member 1** | Frontend Dev 1 (Person 1) | _none_ — owns pages 1–2. Page 3 consumes their `AuthContext` (Week 5) and `RecipientProfile` component (link target). |
| **Member 2** | Frontend Dev 2 — gift discovery, recommendation, gift management | `page.tsx`, `components/EventHeader.tsx`, `components/CuratedGiftCard.tsx`, `components/GuestSuggestionCard.tsx`, `components/GiftSelectionPanel.tsx`, `components/index.ts`, `lib/mockData.ts` |
| **Member 3** | Frontend Dev 3 — public gifting, contribution dashboard, responsive UI | `components/BudgetProgress.tsx` (shared responsive primitive), `lib/utils.ts` |
| **Member 4** | Backend Dev — FastAPI, business logic, auth, contribution flow | `lib/api.ts` (REST contract for 4 endpoints) |
| **Member 5** | Database Engineer / Lead — Supabase / PostgreSQL schema | `types/index.ts` (canonical TypeScript interfaces mirroring the `events`, `gifts`, `gift_suggestions`, `profiles` tables) |

## Working agreement (Week 1)

- Any change to `types/index.ts` requires sign-off from Member 5 (DB schema authority).
- Any change to `lib/api.ts` endpoint shapes requires sign-off from Member 4 (backend authority).
- Any new responsive primitive (budget bar style, card shell) is proposed to Member 3 for promotion to shared `@/lib/ui` in Week 2.
- Page 3 must not modify pages 1–2 or the shared `AuthContext` — coordination requests go through Abhinav.
