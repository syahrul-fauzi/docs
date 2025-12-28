# Use Case Pendalaman: apps/api (Kontrak & Orkestrasi)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

apps/api adalah NestJS Orchestrator yang menyediakan kontrak REST/WS untuk lifecycle agent runs, antrean BullMQ, dan persistence via Prisma ke Supabase, dengan observability dan guard multi-tenant.

Referensi: docs/use-cases/apps-api.md:15-21,85-96

## Aktor

- apps/app (klien REST/SSE/WS)
- apps/web (AG-UI chat endpoint)
- Redis (queue, state sementara)
- Supabase (Postgres via Prisma)

## Preconditions

- Redis dan database tersedia
- Tenant header/guard aktif

## Postconditions

- Run state tersimpan sementara di Redis; operasi queue diproses
- Metrics dan logs tercatat

## Alur Utama

1. Start Run → validasi → setex JSON → enqueue
2. Continue Run → get/update → enqueue continuation
3. Cancel Run → update status → remove dari queue
4. List Runs → filter/sort/paginate

## Alur Alternatif & Pengecualian

- UUID invalid → BAD_REQUEST
- Run expired → NOT_FOUND
- Tenant denied → FORBIDDEN

## Aturan Bisnis

- Validation pipe; whitelist; DTO konsisten
- Header `X-Tenant-ID` bila diperlukan

## Persyaratan Non-Fungsional

- p50 start < 300ms; enqueue < 50ms
- Observability lengkap (OpenTelemetry)

## Diagram Use Case

```mermaid
usecaseDiagram
actor Client as apps/app
actor Web as apps/web

Client -- (Start Agent Run)
Client -- (Continue Agent Run)
Client -- (Cancel Agent Run)
Client -- (List Agent Runs)
Web -- (Stream Agent Events)
```

## Referensi Teknis

- apps/api/src/api/runs.controller.ts:32,163,273,428,589
- apps/api/src/api/gateway/\*
- apps/api/docs/openapi.yaml
