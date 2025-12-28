# Permission Coverage Reporting

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Panduan pelaporan coverage.

## Target

- Modul permission mencapai ≥ 90% coverage (lines/functions/branches/statements).

## Eksekusi

- Jalankan `vitest` dengan reporter `html` untuk modul `@sba/api-client`.
- Publikasikan `coverage/index.html` sebagai artefak CI.

## Metrics Tambahan

- Jumlah kombinasi skenario yang di-test.
- Persentase kompleksitas tercakup (AND/OR, comparisons, nested).

## Visualisasi

- Diagram hierarki aturan dari `auth-rules.json` (generate seperlunya) dan tautkan ke laporan.
