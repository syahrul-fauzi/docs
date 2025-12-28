---
title: SBA Monorepo Design Update & Implementation Plan
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [monorepo, turborepo, architecture, backend, sdk]
---

# Peningkatan Monorepo SBA — Analisis Komparatif & Rencana Implementasi

## Ringkasan Temuan

- Rancangan menargetkan Turborepo (`apps/*`, `packages/*`), Agent Orchestrator (Node/Nest), RLS Postgres, Zod+OpenAPI, observability, CI/CD pratinjau.
- Implementasi aktif berpusat pada Supabase Functions (Deno) untuk SSE agent stream dan migrasi Postgres; manajer paket `bun`; Turborepo aktif.
- Kesenjangan: belum ada Orchestrator Node/Nest, paket `sdk/tools/db/auth/telemetry` belum konsisten tersedia, RLS pada KB mengikat ke `auth.uid()` bukan `tenant_id` session-scoped, dan kontrak tools belum dibakukan.

## Referensi Kode

- SSE agent stream: `apps/api/supabase/functions/agent-stream/index.ts`
- Observability exporters: `apps/api/src/observability/exporters.ts`
- Skema KB & FTS: `apps/api/supabase/migrations/20251128_kb.sql`
- Turborepo tasks: `turbo.json`, Workspaces: `package.json`, TS config: `tsconfig.json`

## Rekomendasi Peningkatan

- Tambahkan `apps/orchestrator` (Node/Nest) untuk sesi, registry alat, backpressure; pertahankan Supabase Functions sebagai jalur SSE/Auth edge.
- Standarkan kontrak alat (`Knowledge/Render/Task/Vector`) di `packages/sdk` (OpenAPI 3.0 + Zod) dan adapter di `packages/tools` dengan interface `IToolAdapter`.
- Terapkan RLS per-tenant menggunakan `set_tenant(uuid)` dan policy `USING (tenant_id = current_setting('app.current_tenant')::uuid)` pada tabel tenant-scoped.
- Ekstrak middleware observability ke `packages/telemetry` yang menyuntik `tenantId/sessionId/requestId` ke trace/log/metrics.
- Bentuk `apps/worker` untuk render jobs, indexing, cache refresh (BullMQ) sesuai rancangan.

## Diagram Arsitektur (Target)

```mermaid
flowchart LR
  subgraph Client
    Web[AG-UI Client (Next.js)]
  end
  subgraph Edge
    SupaFns[Supabase Functions (SSE/Auth)]
  end
  subgraph Core
    Orchestrator[Agent Orchestrator (Node/Nest)]
    Tools[Tool Registry (Adapters)]
    Session[Redis SessionStore]
    Model[LLM Adapter]
    Postgres[(Postgres + RLS)]
  end
  subgraph Content
    BaseHub[BaseHub]
    Blob[S3/R2]
    Vector[Vector DB (opt)]
  end
  Web -->|WS/HTTP| SupaFns
  SupaFns -->|events| Orchestrator
  Orchestrator -->|session| Session
  Orchestrator -->|tool call| Tools
  Tools -->|query| BaseHub
  Tools -->|store| Blob
  Tools -->|index/search| Vector
  Orchestrator -->|audit| Postgres
```

## Rencana Implementasi Bertahap (Milestone)

- **Phase 1 — Foundation & Alignment**
  - Deliverables: skeleton `packages/sdk/tools/auth/telemetry/db`, OpenAPI+Zod, minimal `apps/orchestrator`.
  - Exit criteria: WS session berjalan; kontrak tools tervalidasi; lint/typecheck konsisten.
- **Phase 2 — Knowledge & Cache**
  - Deliverables: `basehub-adapter`, cache Postgres+Redis, webhook invalidation.
  - Exit criteria: KB query via Orchestrator dengan cache; SSE tetap berfungsi.
- **Phase 3 — Document & Task**
  - Deliverables: render worker, blob store, commit ke BaseHub; Task service.
  - Exit criteria: dokumen dihasilkan dengan URL; tugas tercatat dan terlihat.
- **Phase 4 — RLS Harden & Billing**
  - Deliverables: `set_tenant`, policy tenant, quotas/rate limits, metering.
  - Exit criteria: isolasi tenant tervalidasi; billing usage dihitung.
- **Phase 5 — Scale & Integrations**
  - Deliverables: vector search, connectors marketplace, SSO enterprise.
  - Exit criteria: integrasi pertama berjalan; SLA dipenuhi.

## Spesifikasi Teknis (Packages)

- `packages/sdk`: OpenAPI + Zod untuk params/results alat; generator SDK.
- `packages/tools`: adapter `basehub-adapter`, `render-adapter`, `task-adapter`, `vector-adapter`.
- `packages/db`: wrapper koneksi & `set_tenant(uuid)`; Prisma atau SQL migrasi.
- `packages/auth`: JWT middleware (OIDC), extractor `tenantId`, RBAC.
- `packages/telemetry`: init OTel, Prom metrics, Sentry; middleware attach context.
