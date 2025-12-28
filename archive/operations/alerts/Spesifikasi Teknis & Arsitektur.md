# Spesifikasi Teknis & Arsitektur - Webhook Alerts

## Kebutuhan

- Pengiriman notifikasi ke endpoint webhook eksternal dengan retry dan backoff.
- Batas ukuran payload per skenario (`HIGH_PRIORITY`, `BULK`, `DEFAULT`).
- Rate limit untuk pengujian dengan header `X-RateLimit-*`.
- Audit log dan metrik real-time dengan endpoint `GET /api/metrics` dan SSE `GET /api/metrics/sse`.
- Laporan performa ke `artifacts/performance-reports/*.json`.

## Spesifikasi Teknis

- Route: `POST /api/alerts` (Next.js Route Handler).
- Retry: maksimal 3 percobaan, `AbortSignal.timeout(5000)`, header `X-Attempt-Id` dan `Idempotency-Key`.
- Payload wrapper: `{ type, payload, ts }`, ukuran diukur via `Buffer.byteLength(JSON.stringify(payload))`.
- Env batas ukuran: `ALERTS_MAX_PAYLOAD_BYTES`, `ALERTS_MAX_PAYLOAD_BYTES_HIGH_PRIORITY`, `..._BULK`, `..._DEFAULT`.
- Rate limit uji: aktif bila header `x-test-override=true`, jendela 1s, limit 3.
- Audit: `addAuditRecord({ endpoint:'alerts/webhook', status, attempts })`.
- Metrik: recorder internal, snapshot `GET /api/metrics`, reset via `POST /api/metrics`, SSE di `/api/metrics/sse`.
- Mock server: `tools/mock-webhook-server.js` dengan `/webhook`, `/metrics`, `/events`, `/reset`.

## Arsitektur

- Lapisan API (`apps/app/src/app/api/alerts/route.ts`) memanggil webhook dan mencatat audit & metrik.
- Lapisan Observability (`_lib/metrics.ts`) menyimpan agregat ringan di memori.
- Playwright E2E mensimulasikan status 200/500/timeout, rate-limit, payload besar, multi-tenant.
- CI/CD: workflow `deploy-app.yml` build→deploy→healthcheck→E2E smoke, rollback otomatis bila gagal.

## Keamanan & Performa

- Tidak menyimpan rahasia dalam log/artifacts.
- Idempotensi melalui `Idempotency-Key`.
- Backoff eksponensial untuk menurunkan beban.
- SSE satu arah untuk monitoring rendah overhead.

## Operasional

- Jalankan server mock: `node tools/mock-webhook-server.js`.
- Jalankan monitoring: `pnpm --filter @sba/app run monitor:metrics` (env `APP_BASE_URL`).
- Reset metrik: `POST /api/metrics`.
- Konfigurasi batas payload via env sesuai skenario.
