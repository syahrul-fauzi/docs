# Arsitektur SBA-Agentic

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft arsitektur.

## Komponen

- Frontends: `apps/app` (AG-UI orchestration), `apps/web` (chat/dokumen)
- Backend: `apps/api` (NestJS orchestrator)
- Data: Supabase (CRUD/Realtime), Redis (queue/state)
- Shared: `@sba/*` packages (UI, SDK, Supabase, entities, services, utils)

## Alur Data

- HTTP + SSE/WS untuk streaming event
- Supabase untuk CRUD dan realtime channel per conversation

## Diagram Komponen

- Lihat `docs/architecture/README.md` dan `docs/architecture/dependencies.mmd`

## Pola Desain

- FSD/DDD + Atomic Design (rujuk `.trae/documents/...:279-285`)
- Adapter untuk realtime (SSE/WS) dan HTTP client

## Keamanan & Observability

- CSP, Upstash rate limit, RBAC, RLS
- OpenTelemetry tracing, Prometheus metrics
