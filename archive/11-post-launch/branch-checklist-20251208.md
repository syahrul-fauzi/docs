# Branch & Checklist — 2025-12-08

## Branch

- Nama: `feat/observability-business-metrics-and-test-hardening`
- Basis: `main`
- Tujuan: Instrumentasi metrik bisnis ke Prometheus registry dan hardening test.

## Tasks

- Implementasikan `incBusinessCounter` via headers pada `withMetrics`.
- Tambahkan instrumentation di `TaskForm` (submit) dan `useWorkspaces` (switch).
- Perbaiki i18n DOM tests memakai `screen` dan `render` util.
- Tambahkan alias `@/shared/lib/metadata` untuk pages-metadata tests.
- Stabilkan E2E smoke pages (init script + fallback checks).

## Acceptance Criteria

- `/api/metrics?format=prom` menampilkan `sba_business_events_total` dan `sba_business_errors_total` dengan label `action`, `tenant`, dan opsional `workspaceId`, `userId`.
- Unit tests berjalan tanpa import errors; suite i18n tidak flakey pada DOM asserts.
- E2E “Smoke — Pages Reachable” berjalan dengan reporter list (skip webserver mode).

## Dependencies

- Next.js runtime (nodejs untuk supabase/metrics prom route).
- Playwright config (skip webserver env) dan vitest setup.

## Verification Steps

- Unit: `pnpm -C apps/app test:unit --reporter=verbose`
- Metrics: request `GET /api/metrics?format=prom` dan verifikasi counter business muncul.
- E2E: `PLAYWRIGHT_SKIP_WEBSERVER=true PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm -C apps/app test:e2e -- --grep "Smoke — Pages Reachable"`.

## Change Log

- Lihat `docs/IMPROVEMENTS-20251208.md` untuk detail teknis.
