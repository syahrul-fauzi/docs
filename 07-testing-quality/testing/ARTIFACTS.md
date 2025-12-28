---
title: "Kebijakan Artefak Pengujian"
created_at: 2025-12-28
author: QA Team
status: active
---

# Kebijakan Artefak Pengujian

## Tujuan

Menentukan artefak yang diarsipkan dan yang diabaikan agar laporan pengujian tetap tersedia bagi stakeholder tanpa membebani repository.

## Diarsipkan

- Ringkasan HTML Playwright yang diekspor ke `apps/app/playwright-report/html/` atau `apps/web/playwright-report/html/`.
- JUnit/XML bila diperlukan untuk CI.
- Screenshot yang relevan di `apps/app/docs/assets/e2e/<YYYY-MM-DD>/`.

## Diabaikan

- Direktori `**/playwright-report/` selain folder `html/` yang disimpan.
- `**/test-results/` lokal (kecuali jika dibutuhkan untuk CI dan disimpan di lokasi aplikasi).
- Coverage lokal.

## Alur Kerja

1. Jalankan pengujian dan hasilkan laporan.
2. Ekspor HTML ke subfolder `html/` agar tidak terabaikan.
3. Simpan screenshot ke direktori `apps/app/docs/assets/e2e/<YYYY-MM-DD>/`.
4. Tautkan artefak pada `docs/testing/e2e-updates.md` dan `apps/app/docs/FINAL_REPORT.md`.