# Contributors — page4 (Week 1)

Per-file role attribution for page 4's Week-1 deliverable.

| Member | Role | Files in this folder |
|---|---|---|
| **Member 1** | Frontend Dev 1 (Person 1) | _none_ — owns pages 1–2. Page 4 consumes their `AuthContext` (Week 5) to gate creator-only access. |
| **Member 2** | Frontend Dev 2 — gift discovery, recommendation, gift management | _none_ on page 4 directly. Cross-references page 3's `Gift` type for shared semantics. |
| **Member 3** | Frontend Dev 3 — public gifting, contribution dashboard, responsive UI | `page.tsx`, `components/StatsOverview.tsx`, `components/GiftProgressList.tsx`, `components/ShareLinkCard.tsx`, `components/RecentContributionsList.tsx`, `components/ContributionCard.tsx`, `components/index.ts`, `lib/mockData.ts`, `lib/utils.ts`, `README.md`, `CONTRIBUTORS.md` |
| **Member 4** | Backend Dev — FastAPI, business logic, auth, contribution flow | `lib/api.ts` (REST contract for 3 endpoints: dashboard fetch, visibility toggle, share-link regenerate) |
| **Member 5** | Database Engineer / Lead — Supabase / PostgreSQL schema | `types/index.ts` (canonical TypeScript interfaces mirroring the `campaigns`, `gifts`, `contributions` tables) |

## Working agreement (Week 1)

- The `Currency` type is shared with page 3 via a re-export — any change to currency codes requires DB sign-off (Member 5) and backend sign-off (Member 4) so neither side drifts.
- The `shareUrl` field is owned by the backend (Member 4 generates signed URLs). Frontend must never construct the URL client-side.
- The "Regenerate" button on the share card must call `regenerateShareLink` — a future contributor adding a "delete link" action must coordinate with Member 4.
- Anonymous contributions are a backend-determined flag (`is_anonymous` column). Frontend must never infer anonymity from a null donor name — use the boolean.
