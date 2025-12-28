# Relasi Antar Aplikasi

## apps/app ↔ apps/api

- Komunikasi: REST (`/api/v1/runs/*`), SSE stream (AG-UI events), WebSocket gateway.
- Ketergantungan: `@sba/sdk`, `@sba/shared`, `@sba/ui`, `@sba/utils`.
- Header multi-tenant: `X-Tenant-ID` pada request REST.

## apps/web ↔ Supabase

- Komunikasi: CRUD + Realtime channel via `@sba/supabase` (`messages`, `conversations`, `documents`).
- Ketergantungan: `@sba/entities`, `@sba/services`, `@sba/ui`, `@sba/utils`.

## apps/web ↔ apps/api

- Komunikasi: endpoint internal AG-UI (fetch ke `/api/agui/chat`).
- Ketergantungan: `@sba/agui-client` untuk sinkronisasi tipe/kontrak.

## apps/api ↔ Supabase/Redis

- Database: Prisma ke Supabase Postgres.
- Queue: Redis list untuk `queue:agent-runs`, `queue:agent-continuations`.
- Observability: OpenTelemetry metrics dan tracing.

## Shared Packages

- UI dan util: `@sba/ui`, `@sba/utils` digunakan lintas frontend.
- SDK & data: `@sba/supabase`, `@sba/sdk`, `@sba/entities`, `@sba/services`.

## Separation of Concerns

- UI (apps/app, apps/web): presentasi, interaksi, hooks, state.
- API (apps/api): validasi, kontrak, orchestrasi, queue, observability.
- Data (Supabase): persistence, realtime.
- Shared: komponen/UI/util/types/SDK untuk reuse.
