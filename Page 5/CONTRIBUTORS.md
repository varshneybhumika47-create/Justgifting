# Contributors — page5 (Week 1)

Per-file role attribution for page 5's Week-1 deliverable.

| Member | Role | Files in this folder |
|---|---|---|
| **Member 1** | Frontend Dev 1 (Person 1) | _none_ — owns pages 1–2. Page 5 is fully unauthenticated and does NOT consume their AuthContext (by design — this is the public link). |
| **Member 2** | Frontend Dev 2 — gift discovery, recommendation, gift management | _none_ on page 5 directly. Cross-references the `Currency` type. |
| **Member 3** | Frontend Dev 3 — public gifting, contribution dashboard, responsive UI | `page.tsx`, `components/EventBanner.tsx`, `components/FinancialProgress.tsx`, `components/WishlistGrid.tsx`, `components/WishlistGiftCard.tsx`, `components/ContributeModal.tsx`, `components/index.ts`, `lib/mockData.ts`, `lib/utils.ts`, `README.md`, `CONTRIBUTORS.md` |
| **Member 4** | Backend Dev — FastAPI, business logic, auth, contribution flow | `lib/api.ts` (REST contract for 2 endpoints: public campaign fetch + contribution submission). Member 4 also owns rate-limiting (per IP, per share-token) on the public contribution endpoint. |
| **Member 5** | Database Engineer / Lead — Supabase / PostgreSQL schema | `types/index.ts` (canonical TypeScript interfaces for the **redacted public projection** — no donor names, no internal IDs, no financial splits) |

## Working agreement (Week 1)

- Page 5 is the **only** unauthenticated page. Do not add auth requirements without sign-off from Member 4 (backend) and Member 5 (privacy review).
- The `shareToken` in the URL is the only identifier the public uses. The internal `campaignId` must never appear in any page 5 file, type, or network call.
- The `CreateContributionRequest.paymentMethodId` field is reserved for Week 6. Do not collect or send card details in Week 1–5 — that work happens inside the payment gateway's iframe, not on our domain.
- The `PRESET_CONTRIBUTIONS_INR` array in `lib/utils.ts` is a UI default — the backend must NOT trust these values; amount validation happens server-side (Member 4).
- Anonymous contributions are donor-controlled (the `isAnonymous` checkbox). The backend must persist the flag exactly as submitted and redact the donor name in any public-facing read.
