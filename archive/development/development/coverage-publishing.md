# Coverage Publishing — Codecov & SonarQube

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft publikasi coverage.

## Vitest Global Thresholds

- `vitest.config.ts` mengaktifkan coverage v8 dan threshold:
  - Lines ≥ 80%, Functions ≥ 75%, Branches ≥ 70%, Statements ≥ 80%

## Codecov

- File: `codecov.yml`
- Status project dan patch target 80% dengan toleransi kecil.

## SonarQube

- File: `sonar-project.properties`
- Menggunakan `coverage/lcov.info` dari Vitest.

## Integrasi CI

- Tambahkan langkah upload laporan ke Codecov/Sonar sesuai secrets.
- Gagal pipeline bila coverage < thresholds.
