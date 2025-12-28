# Monorepo Architecture (apps/app, apps/web, apps/api)

## Overview

- apps/app: Next.js 15 frontend untuk orkestrasi agentic (REST + SSE/WS, API routes lokal, proxy AG-UI).
- apps/web: Next.js 14 frontend bergaya FSD untuk chat/dokumen dengan Supabase (CRUD + Realtime) dan e2e.
- apps/api: NestJS Orchestrator API (REST + Socket.IO gateway, Redis queue, Prisma, observability).
- Shared packages: `@sba/ui`, `@sba/utils`, `@sba/sdk`, `@sba/supabase`, `@sba/entities`, `@sba/services`, `@sba/auth`, `@sba/agui-client`, `@sba/integrations`.

## Diagram

```mermaid
flowchart LR
  subgraph Frontends
    A[apps/app (Next.js 15)]
    W[apps/web (Next.js 14)]
  end
  API[apps/api (NestJS)]
  SP[Shared Packages @sba/*]
  SB[(Supabase: Postgres + Realtime)]
  Q[Queue: Redis/BullMQ]

  A -- REST --> API
  A -- SSE/WS --> API
  W -- Fetch (AG-UI) --> API
  W -- CRUD/Realtime --> SB

  A -- transpile --> SP
  W -- transpile --> SP
  API -- uses --> SP

  API -- Jobs --> Q
  API -- Prisma --> SB

  classDef link stroke:#7f8,stroke-width:1px,fill:#eff;
  classDef api stroke:#48f,stroke-width:1px,fill:#eef;
  classDef db stroke:#f96,stroke-width:1px,fill:#ffe9d6;
  class A,W,SP link;
  class API api;
  class SB db;
```

## Aplikasi & Stack

- apps/app
  - Tujuan: dashboard kontrol run, streaming AG-UI, orkestrasi agentic, API routes lokal.
  - Teknologi: Next.js 15, React 18, TanStack Query, zod, zustand, tailwind-merge, lucide-react, framer-motion, next-themes.
  - Streaming: SSE `apps/app/src/shared/api/sse.ts` (events agent/tool/stream), fallback WS.
  - REST client: `apps/app/src/shared/api/client.ts` (baseURL env, retry/timeout/interceptors).
  - API routes: SSE/WS/proxy (contoh SSE per-run `apps/app/src/app/api/runs/[runId]/events/route.ts`).

- apps/web
  - Tujuan: chat, dashboard, workflow builder; FSD (entities/features/widgets/shared/processes/pages).
  - Teknologi: Next.js 14, TanStack Query, zod, zustand, date-fns, tailwind, Playwright e2e.
  - Data: Supabase client wrapper `apps/web/src/shared/api/client.ts` (CRUD conversations/messages/documents, realtime channel).
  - AG-UI: fetch ke endpoint internal `/api/agui/chat`.

- apps/api
  - Tujuan: Orchestrator API multi-tenant, queue, gateway stream, observability.
  - Teknologi: NestJS, Express, Socket.IO, BullMQ, Prisma, Supabase SDK, OpenTelemetry.
  - REST: RunsController `apps/api/src/api/runs.controller.ts` (start/get/continue/cancel/list dengan Redis TTL + queue).
  - Gateway: WebSocket Module/Gateway (Socket.IO) untuk stream agen.
  - DB: Prisma schema dan migrasi ke Supabase.

## Relasi & Ketergantungan

- Frontend keduanya mentranspile paket `@sba/*` via `next.config.js`.
- apps/app konsumsi REST + stream dari apps/api; apps/web konsumsi Supabase langsung (CRUD + Realtime) dan sebagian fetch AG-UI ke apps/api.
- apps/api menggunakan Redis untuk antrean (BullMQ) dan menyimpan run sementara; Prisma untuk persistence ke Postgres (Supabase).

## Pola Komunikasi

- REST: `apps/api/src/api/runs.controller.ts:32` POST start, `:163` GET run, `:273` POST continue, `:428` POST cancel, `:589` GET list.
- SSE: klien SSE `apps/app/src/shared/api/sse.ts:64` connect, event types `:135-156`.
- WebSocket: fallback klien WS `apps/app/src/shared/api/sse.ts:356-434`; gateway WS ada di modul API.
- Supabase Realtime: `apps/web/src/shared/api/client.ts:245-263` channel `messages:{conversationId}`.
- GraphQL/gRPC: tidak ditemukan.

## Separation of Concerns

- apps/app: orkestrasi UI run/event, proxy/stream, tidak mengelola persistence utama.
- apps/web: fitur domain chat/dokumen, persistence via Supabase, FSD modular.
- apps/api: kontrak REST/WS, antrean, validasi, observability, multi-tenant guard.
- Shared packages: UI, util, SDK, supabase client, domain entities/services.

## Duplikasi & Optimasi

- Overlap stack UI/state (React, Query, zod, zustand, Tailwind) pada kedua frontend.
- Pola klien data:
  - apps/app: REST + SSE/WS; apps/web: Supabase CRUD + Realtime.
  - Rekomendasi: ekstrak abstraction ke paket bersama agar konsisten.

### Rekomendasi Shared Modules

- `@sba/api-client` (new): wrapper HTTP typed (retry, timeout, interceptors) mengekstrak dari `apps/app/src/shared/api/client.ts`.
- `@sba/realtime` (new): SSE/WS event mapper & hooks (AG-UI events) mengekstrak dari `apps/app/src/shared/api/sse.ts` agar dapat dipakai lintas frontend.
- `@sba/supabase-repos` (new): repos CRUD standar (conversations/messages/documents/tenants) mengekstrak dari `apps/web/src/shared/api/client.ts`.
- `@sba/api-types` (new): tipe OpenAPI/DTO untuk REST dan event stream; hasil generate dari OpenAPI `apps/api/docs/openapi.yaml`.
- `@sba/observability` (new): wrapper logging/metrics/tracing (counter, spans) untuk konsistensi.
- `@sba/config` (new): loader env & schema zod untuk seluruh apps.

## Best Practices & Penyempurnaan

- Samakan versi Next.js antar frontend bila memungkinkan; gunakan konfigurasi `tsconfig.base.json` bersama.
- Generate typed clients dari OpenAPI agar kontrak REST konsisten lintas apps.
- Hindari import lintas-app langsung ke `src`; semua lintas harus lewat paket `@sba/*` (published workspace).
- Pisahkan boundary runtime (UI <-> data) dengan antarmuka eksplisit; gunakan dependency inversion terhadap implementation Supabase/REST.
- Standarisasi error handling dan retry policy pada client (HTTP/SSE/WS) di shared package.
- Gunakan feature flags untuk memilih jalur komunikasi (SSE vs WS) melalui satu facade `@sba/realtime`.
- Minimalkan coupling dengan:
  - Shared types/data transfer objects (`@sba/api-types`).
  - Facade data layer (`@sba/api-client`, `@sba/supabase-repos`).
  - Konfigurasi terpusat (`@sba/config`) dan observability seragam.

## Referensi File

- apps/app: `apps/app/src/shared/api/sse.ts`, `apps/app/src/shared/api/client.ts`, `apps/app/src/app/api/runs/[runId]/events/route.ts`.
- apps/web: `apps/web/src/shared/api/client.ts`, `apps/web/next.config.js`.
- apps/api: `apps/api/src/api/runs.controller.ts`, `apps/api/src/api/gateway/*`, `apps/api/docs/openapi.yaml`.
