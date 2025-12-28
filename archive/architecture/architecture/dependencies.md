# Analisis Dependensi apps/_ ↔ packages/_

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft analisis dependensi.

## Ringkasan

- Tidak ada impor lintas-app langsung; semua melalui `@sba/*` packages.
- Tidak terdeteksi siklus antar paket inti pada pola impor/ekspor.
- Hotspot: konsumsi luas `@sba/ui` di frontends; ketergantungan implisit `@sba/ui` → `@sba/shared` pada organisme.

## Diagram

- Lihat `docs/architecture/dependencies.mmd`.

## Potensi Circular Dependencies

- `@sba/ui` mengimpor `@sba/shared` di beberapa organisme. Pastikan `@sba/shared` dideklarasikan sebagai `dependencies` jika dipakai runtime, bukan hanya `devDependencies`.
- Rantai umum: `@sba/utils` → `@sba/entities` → `@sba/services` (arah satu, aman).
- `@sba/tools` → `@sba/sdk` dan tidak balik ke `@sba/tools` dari SDK (aman).

## Rekomendasi Mitigasi

- Stabilkan API `@sba/ui` (semver, changelog) karena dampaknya lintas app.
- Pisahkan komponen organisme yang bergantung pada `@sba/shared` ke subpaket atau pastikan deklarasi deps runtime benar.
- Tambah lint rule untuk melarang impor lintas `apps/*`.
- Tambah matriks kontrak: gunakan `packages/api-types` untuk sinkronisasi tipe REST.

## Referensi Teknis

- SSE: `apps/app/src/shared/api/sse.ts:64-156,356-434,497-571`
- HTTP: `apps/app/src/shared/api/client.ts:20-27,116-154,228-234`
- OpenAPI: `apps/api/docs/openapi.yaml:1-233`
