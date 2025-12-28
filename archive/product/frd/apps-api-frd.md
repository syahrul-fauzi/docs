# FRD — apps/api (Kontrak & Orkestrasi)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft FRD awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Latar Belakang & Tujuan

apps/api menyediakan kontrak REST/WS untuk lifecycle agent runs, orchestrasi queue, dan persistence via Prisma, dengan guard tenant dan observability.

## Fitur Utama

- Start/Get/Continue/Cancel/List Runs
- WebSocket gateway untuk stream event
- Queue workers BullMQ
- OpenTelemetry metrics/tracing

## Spesifikasi Fungsional

- Start: validasi, simpan ke Redis (TTL), enqueue run
- Continue: get/update state, enqueue continuation
- Cancel: update status, remove dari queue
- List: filter/sort/paginate per-tenant
- Error Mapping: VALIDATION_ERROR, RUN_NOT_FOUND, TENANT_ACCESS_DENIED

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

## Batasan Sistem

- State sementara di Redis; DB untuk jangka panjang
- WS hanya untuk event agen

## Acceptance Criteria

- Endpoint memenuhi kontrak dan operasi queue berhasil
- Metrics/logging tersedia per request

## Referensi

- docs/use-cases/apps-api-detail.md
- docs/architecture/README.md:59-64
