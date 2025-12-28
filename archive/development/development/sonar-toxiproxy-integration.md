# SonarQube & Toxiproxy — Integrasi CI

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft integrasi otomatis.

## SonarQube

- Properti wajib: `sonar.projectKey`, `sonar.login (token)`.
- Jalankan `sonar-scanner` setelah build, coverage LCOV tersedia.

## Toxiproxy

- File: `toxiproxy.json` mendefinisikan proxy, bandwidth, dan latency.
- Workflow `rate-limit-tests`:
  - Start kontainer Toxiproxy, konfigurasi via API, jalankan tes di bawah rate limit, cleanup.

## Error Handling & Logging

- Gunakan `fail_ci_if_error: true` untuk Codecov.
- `if: always()` untuk cleanup agar environment konsisten.
- Logging langkah konfigurasi dan hasil tes.
