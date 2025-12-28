# ADR-001 — Adapter Realtime/HTTP

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Accepted

## Konteks

Aplikasi memerlukan streaming event (SSE/WS) dan HTTP client konsisten lintas frontend.

## Keputusan

- Gunakan facade `packages/realtime` untuk SSE/WS dengan `RealtimeAdapter` dan implementasi `SSEAdapter`/`WSAdapter`.
- Gunakan `packages/api-client` sebagai wrapper HTTP dengan retry/timeout/interceptors.

## Konsekuensi

- Konsistensi kontrak dan pengurangan duplikasi.
- Perlu migrasi import di apps/\*.

## Referensi

- `apps/app/src/shared/api/sse.ts`
- `apps/app/src/shared/api/client.ts`
