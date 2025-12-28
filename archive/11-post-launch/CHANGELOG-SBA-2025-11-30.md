# Perubahan Stabilisasi SBA — 2025-11-30

- Stabilisasi SSE `apps/app` untuk `runs/:runId/events`:
  - Pakai `Response(stream, { headers })` dengan `Content-Type: text/event-stream`.
  - Header hardening: `nosniff`, `DENY`, `Referrer-Policy`, `Cache-Control`, `Connection`.
  - Event awal: `data: { type: "connected" }` dan `event: connected`.
  - Rate limiting per tenant/ip; RBAC test-mode; observability label `x-tenant-id`.

- AGUIEventStream keyboard/a11y:
  - `preventDefault` dan `stopPropagation` untuk ArrowUp/ArrowDown.
  - `flushSync` pada perubahan fokus dan blur container; fokus via `useLayoutEffect`.
  - Virtualisasi dimatikan saat `NODE_ENV === 'test'` untuk determinisme.

- apps/web:
  - Health route impor `@sba/utils/metrics` dan `Content-Type` sesuai Prometheus text.
  - Vitest config bersih tanpa plugin React.

- apps/marketing:
  - `vitest.setup.ts`: mock `next/server`, `next/config`, `next/dynamic`; shim router utils.
  - Alias resolver `vitest.config.ts` dalam bentuk array dengan wildcard regex.
  - Coverage thresholds di bawah `coverage.thresholds`.
  - Perbaikan fallback `getPage`: kembalikan fallback saat data kosong di dev; lempar `NotFound` di produksi.

- packages/ui:
  - `vitest.config.ts` menambahkan `setupFiles: ['src/setupTests.ts']`.
  - `setupTests.ts` menambahkan shim global `jest` yang memetakan ke `vi` untuk kompatibilitas.

- Hasil pengujian:
  - apps/marketing: hijau penuh.
  - apps/app: hijau; SSE tervalidasi.
  - apps/web: hijau; health route tervalidasi.
