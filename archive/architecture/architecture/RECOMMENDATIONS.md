# Rekomendasi Optimasi Struktur

## Shared Abstractions

- Buat paket `@sba/api-client`: ekstrak HTTP client typed dari `apps/app/src/shared/api/client.ts`.
- Buat paket `@sba/realtime`: SSE/WS facade & hooks dari `apps/app/src/shared/api/sse.ts`.
- Buat paket `@sba/supabase-repos`: abstraksi repos CRUD dari `apps/web/src/shared/api/client.ts`.
- Generate `@sba/api-types` dari `apps/api/docs/openapi.yaml` untuk DTO typed.

## Standarisasi Frontend

- Samakan versi Next.js dan konfigurasi TypeScript melalui `tsconfig.base.json`.
- Satukan `eslint-config` dan `vitest` setup di root.
- Pastikan kedua frontend hanya mengakses data via facade shared (hindari logic duplikat).

## Minim Coupling

- Dependency inversion pada data layer: UI bergantung pada interfaces, bukan implementasi.
- Feature flags untuk memilih jalur SSE vs WS di `@sba/realtime`.
- Konfigurasi env dan observability seragam melalui `@sba/config` dan `@sba/observability`.

## Operasional

- CI: lint/build/test untuk setiap app; publish/pin workspace packages.
- Contract tests: validasi konsistensi antara `@sba/api-client` dan API (OpenAPI).
- E2E: Playwright fokus integrasi UI dengan stream dan CRUD.
