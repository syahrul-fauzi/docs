# CI Reports — Artefak & Akses

Versi: 1.0.0
Tanggal: 2025-12-08

## Struktur Artefak

- Folder output: `ci-artifacts/`
  - `openapi-lint.json` — hasil linting Spectral
  - `openapi-diff.txt` — hasil perbandingan OpenAPI
  - `openapi-diff-admin.txt` — diff khusus spesifikasi admin vs baseline
  - `openapi-change-summary.json` — ringkasan perubahan (added/removed/changed, flag breaking)
  - `openapi-structural-change-summary.json` — ringkasan struktural (metode, izin/security, perubahan permission model)
  - `index.html` — indeks artefak CI terstruktur (lint/diff/coverage/test summary)
  - `playwright-report/` — laporan e2e (jika dijalankan)
  - `coverage/` — laporan cakupan unit/integrasi
  - `summary.json` — ringkasan tes (lihat skrip `apps/app/scripts/build-summary.js`)
  - `metrics/rube-latency.json` — ringkasan latency endpoint `/health` Rube (avg, p95)
  - `metrics/rube-invoke-smoke.json` — hasil k6 smoke `/invoke` (avg, p50/p90/p99, error_rate)

## Integrasi CI

- Upload artefak pada pipeline:
  - GitHub Actions: `actions/upload-artifact` untuk folder `ci-artifacts/`
  - GitLab CI: `artifacts: paths` ke `ci-artifacts/`

## Akses

- Buka artefak dari tab “Artifacts” di job CI.
- `openapi-lint.json`: periksa detail pelanggaran lint.
- `openapi-diff.txt`/`openapi-diff-admin.txt`: cek ringkasan breaking/non-breaking changes.
- `openapi-change-summary.json`: lihat daftar path `added`, `removed`, `changed`, dan indikator `breaking`.
- `openapi-structural-change-summary.json`: identifikasi perubahan struktur (metode per path, skema keamanan/permissions) untuk audit RBAC.
- `index.html`: halaman indeks dengan navigasi ke lint/diff/coverage/test summary.
  - Contoh tautan lokal (GitHub Actions Artifacts): `ci-artifacts/index.html`
  - Jalankan lokal: `pnpm ci:artifacts:collect && open ci-artifacts/index.html`
  - Bagian Summary menampilkan metrik `Rube Latency (health)` dan `Rube Invoke Smoke` bila file pada `ci-artifacts/metrics/` tersedia.

## Interpretasi Programatik

- Baca ringkasan perubahan untuk automasi review:
  ```js
  const fs = require('fs');
  const summary = JSON.parse(
    fs.readFileSync('ci-artifacts/openapi-change-summary.json', 'utf8')
  );
  const structural = JSON.parse(
    fs.readFileSync(
      'ci-artifacts/openapi-structural-change-summary.json',
      'utf8'
    )
  );
  console.log('Breaking:', summary.breaking);
  console.log('Added paths:', summary.added);
  console.log('Removed paths:', summary.removed);
  console.log('Changed paths:', summary.changed);
  console.log('Permission model changes:', structural.permissionModelChanges);
  ```
- Coverage HTML: navigasi ke `coverage/index.html` bila tersedia.

## Troubleshooting

- Artefak kosong: pastikan menjalankan `pnpm ci:artifacts:ensure` sebelum task.
- Path salah: sesuaikan konfigurasi runner dan jalur workspace monorepo.
- Diff gagal karena breaking: evaluasi perubahan; perbarui baseline di `apps/docs/openapi/admin-docs.baseline.yaml` bila memang diinginkan.
- Index tidak memuat coverage: pastikan `coverage/**/index.html` tersedia dan tidak terhapus oleh langkah cleanup.
