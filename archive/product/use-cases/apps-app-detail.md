# Use Case Pendalaman: apps/app (Orkestrasi UI Agentic)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

apps/app menyediakan antarmuka pengguna untuk memulai, melanjutkan, membatalkan, dan memantau agent runs. Mengonsumsi event AG-UI via SSE/WS, memetakan tipe event, dan menyajikan stream secara real-time. Bertindak sebagai orkestrator presentasi, bukan persistence utama.

Referensi: docs/use-cases/apps-app.md:15-22,73-89

## Aktor

- User (mengoperasikan UI run)
- apps/api (REST/SSE/WS kontrak)
- Supabase (melalui paket shared untuk beberapa metadata)

## Preconditions

- User terotentikasi dan memiliki izin tenant
- apps/api tersedia dan dapat diakses

## Postconditions

- Run berstatus selesai/dibatalkan; event terekam client-side log
- Aksi user (continue/cancel) tercermin di run state backend

## Alur Utama

1. User klik Start Run → `POST /api/v1/runs`
2. Terima `runId` → subscribe SSE `/runs/{runId}/events`
3. Render stream event (agent/tool/message)
4. User Continue → `POST /runs/{runId}/continue`
5. User Cancel → `POST /runs/{runId}/cancel`

## Alur Alternatif & Pengecualian

- SSE error → fallback WS → fallback long-poll
- Run tidak ditemukan → tampilkan error dan opsi retry
- Tenant denied → blokir aksi, log audit

## Aturan Bisnis

- Header `X-Tenant-ID` disertakan (bila diperlukan)
- Kebijakan retry REST eksponensial; timeout 30s
- Error schema konsisten untuk UX

## Persyaratan Non-Fungsional

- p50 start < 500ms; reconnect SSE < 10s
- Streaming stabil T90%; UI tidak freeze pada burst event
- Keamanan: tidak menyimpan secrets; validasi response (zod)

## Diagram Use Case

```mermaid
usecaseDiagram
actor User

User -- (Start Run)
User -- (Continue Run)
User -- (Cancel Run)
User -- (View Stream Events)
(Start Run) ..> (Subscribe Stream) : <<include>>
```

## Referensi Teknis

- apps/app/src/shared/api/sse.ts:64,135-156,356-434,517-595
- apps/app/src/shared/api/client.ts:20-27,116-154,228-234
- apps/app/src/app/api/runs/[runId]/events/route.ts
