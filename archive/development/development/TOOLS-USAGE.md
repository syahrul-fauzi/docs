# Tools Usage — CI Collector & Mock Generator

Versi: 1.0.0
Tanggal: 2025-12-08

## tools/ci/collect-artifacts.js

### Tujuan

- Mengonsolidasi artefak CI (lint/diff/coverage/test summary) ke indeks HTML responsif.

### Cara Pakai

- Pastikan artefak tersedia:
  - `ci-artifacts/openapi-lint.json`
  - `ci-artifacts/openapi-diff.txt`
  - `apps/app/playwright-report/run-logs/summary.json` atau `playwright-report/run-logs/summary.json`
  - `coverage/**/index.html`
- Jalankan:
  - `pnpm ci:artifacts:ensure && node tools/ci/collect-artifacts.js`
- Output:
  - `ci-artifacts/index.html`

### Fitur

- Navigasi, pencarian/filter lint, tautan coverage, ringkasan uji.
- Desain responsif dan a11y dasar (label, caption, input search).

### Error Handling

- Jika artefak tidak ditemukan, bagian terkait ditandai dengan placeholder.
- Exit code 1 bila terjadi kegagalan pembuatan indeks.

## tools/mock/generate.js

### Tujuan

- Menghasilkan data mock JSON deterministik untuk skenario pengujian.

### Cara Pakai

- Contoh:
  - `pnpm mock:generate` (default: seed=1, count=10, tenantId=t1)
  - `node tools/mock/generate.js seed=42 count=50 tenantId=stg outDir=ci-artifacts`
- Output:
  - `ci-artifacts/mock-knowledge-<tenantId>-seed<seed>.json`

### Fitur

- Seed PRNG mulberry32 untuk determinisme.
- Validasi ketat pakai Ajv terhadap skema `KnowledgeItem`.
- Parameter: `seed`, `count`, `tenantId`, `outDir`.

### Error Handling

- Validasi schema gagal: mencetak detail kesalahan dan exit code 1.
- Penulisan file gagal: menampilkan pesan dan exit code 1.

### Kualitas & Pengujian

- Uji dengan seed berbeda untuk memastikan determinisme dan validasi schema.
- Integrasi ke pipeline CI sebagai langkah pre-test data setup bila diperlukan.
