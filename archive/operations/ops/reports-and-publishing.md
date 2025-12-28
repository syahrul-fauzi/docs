# Laporan Test & Publikasi

- Jalankan workflow `.github/workflows/reports.yml` untuk menghasilkan HTML/PDF dan coverage (JSON/LCOV/Cobertura).
- Artefak berada di `reports/html`, `reports/pdf`, `reports/coverage`.
- Publikasi:
  - GitHub Pages otomatis.
  - Opsional S3/GCS/Azure Blob; variabel env menentukan `TEST_REPORT_URL`.
- Verifikasi publikasi via `curl -I` yang disertakan dalam workflow.
