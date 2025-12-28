# E2E OpenAPI — Setup & Teardown, Integrasi CI

Versi: 1.0.0
Tanggal: 2025-12-08

## Tujuan

- Menjalankan pengujian end-to-end terhadap spesifikasi OpenAPI via Prism, termasuk setup/teardown otomatis dan pelaporan hasil.

## Setup

1. Pastikan spesifikasi tersedia: `GET /api/openapi.json`.
2. Jalankan Prism mock server:
   - `npm run openapi:mock` (lihat `docs/development/ci/openapi-ci.md`).
3. Export Postman Collection dan Environment sesuai target (dev/staging/prod).

## Teardown

- Hentikan Prism setelah pengujian: `pkill -f "prism mock"` atau gunakan job yang berakhir otomatis.

## Suite Tests Prism

- Skrip: `docs/development/ci/prism-contract-tests.js`.
- Cakupan contoh:
  - Health: status 200.
  - Analytics metrics: status 200 dan struktur agregat.
  - Knowledge search: status 200 dengan payload dasar.

## Integrasi CI/CD

- GitHub Actions job `OpenAPI Quality` menjalankan lint/diff/mock/contract tests.
- Tambahkan artefak log hasil ke summary pipeline dan simpan ke `playwright-report/run-logs` bila diperlukan.

## Pelaporan

- Output kontrak mencetak status per endpoint; kegagalan menaikkan exit code untuk memblokir merge.
- Rekomendasi: gabungkan hasil ke laporan QA harian.

## Troubleshooting Umum

- Mock mengembalikan 404: periksa path di spesifikasi `paths`.
- Lint error: validasi `$ref` dan format skema.
- Token/tenant header: untuk mock Prism tidak diperlukan, namun tetap dokumentasikan di spesifikasi.
