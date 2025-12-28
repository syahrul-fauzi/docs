# Perubahan dan Peningkatan SBA-Agentic — 2025-12-08

- Lokasi: `/home/inbox/smart-ai/sba-agentic`

## Ringkasan

- Perbaikan observability: memastikan `x-tenant-id` selalu tersetel pada setiap request yang dibungkus metrik.
- Stabilitas pengujian: alias test untuk utilitas UI (`cn`, `icons`) dan mock `next/headers` agar unit test tidak gagal pada import lingkungan Next.
- Perbaikan impor UI: `LoadingSpinner` kini mengimpor `cn` dan `Icons` dari `@sba/ui` untuk keseragaman.
- Dokumentasi teknis singkat ditambahkan untuk memandu verifikasi dan praktik.

## Detail Perubahan

- `apps/app/src/shared/metrics-registry.ts`:
  - Memastikan header tenant: fungsi `ensureTenantHeader` kini menyetel nilai normalisasi ke header agar label metrik selalu memiliki tenant.
  - Menambahkan JSDoc pada API registry (histogram, counter, quantiles, business counters) untuk meningkatkan keterbacaan dan onboarding.
- `apps/app/src/__tests__/ensure-tenant-header.spec.ts`:
  - Unit test baru untuk memverifikasi preservasi header, default `unknown`, dan normalisasi nilai kosong.
- `apps/app/vitest.config.ts`:
  - Alias pengujian: `@sba/ui/cn`, `@sba/ui/icons`, dan mock `next/headers` ke file test agar ekosistem Vitest dapat me-resolve modul.
- `apps/app/src/test/mocks/next-headers.ts`:
  - Mock ringan untuk `cookies()` dan `headers()` saat runtime pengujian.
- `apps/app/src/widgets/ui/LoadingSpinner.tsx`:
  - Konsolidasi impor dari `@sba/ui` untuk utilitas dan ikon.

## Verifikasi

- Menjalankan unit test `@sba/app`: `pnpm -C apps/app test:unit --reporter=verbose`
- Hasil: pengujian berjalan, sebagian kasus global masih gagal (terkait i18n dan mock store). Perubahan modul di atas terverifikasi (import-resolve dan normalisasi tenant).

## Rekomendasi Tindak Lanjut

- I18n tests: gunakan helper `render` dari `src/test/test-utils.tsx` dan pastikan `screen` di-import eksplisit pada test tertentu yang membutuhkan query DOM.
- Store mocks: lengkapi mock `useUserStore` dan `useTenantStore` di `vitest.setup.ts` untuk skenario header/landmarks.
- Konsistensi metadata: sesuaikan generator canonical/OG URL agar menyertakan locale prefix (`/en/...`) pada test yang memerlukannya.

## Operasional

- Jalankan guard: `pnpm run ci:guard` sebelum build.
- Build parallel apps: `pnpm -r --parallel --filter apps/* build`.
- Observability: validasi `/api/metrics` dan label tenant di histogram/counter.
