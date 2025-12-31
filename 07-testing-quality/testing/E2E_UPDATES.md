---
title: "Pembaruan Pengujian E2E — Playwright"
created_at: 2025-12-28
author: QA Team
status: active
---

# Pembaruan Pengujian E2E — Playwright

Tanggal: 2025-12-08

## Ringkasan Perubahan

- Server dev dijalankan di `http://localhost:3001` untuk stabilitas pengujian.
- Konfigurasi Playwright diperbarui agar `baseURL` konsisten dengan env (`PLAYWRIGHT_BASE_URL`).
- Fixture login E2E disesuaikan: cookie `__test_auth=admin` untuk bypass otentikasi pada skenario uji.
- Locator diperkuat pada halaman dinamis:
  - API Docs: tunggu `#api-docs-ui` dan berikan jeda inisialisasi sebelum verifikasi.
  - Workspaces: dukung `header[aria-label="Workspaces overview"]` selain `Page header`; verifikasi heading menggunakan pencocokan regex pada `h1`.
  - Integrations/Observability: gunakan `main` atau `[role="main"][aria-label]` yang konsisten.
- AuthLayout: tambahkan `data-testid="auth-layout-title"`; label tombol sosial kini `Sign in with {Provider}`.

## Hasil Pengujian

- Suite penuh lintas browser:
  - Chromium/Firefox/WebKit: status hijau.
  - Reporter HTML dihasilkan via `npx playwright test --reporter=html`.
  - Total spesifikasi lulus: 51 (lihat laporan HTML untuk rincian).

## Bukti Visual

- Laporan HTML Playwright tersedia pada direktori `apps/app/playwright-report/` dan dapat dibuka via server laporan (`Serving HTML report at ...`).
- Screenshot disimpan pada `apps/app/docs/assets/e2e/2025-12-08/`:
  - overview-1280x720.png
  - browser-chromium-1280x720.png
  - browser-firefox-1280x720.png
  - browser-webkit-1280x720.png
  - spec-auth-flow-1280x720.png
  - a11y-settings-1280x720.png
  - api-docs-1280x720.png
  - observability-1280x720.png
  - performance-1280x720.png
  - workspace-detail_2025-12-08T06-50-49-795Z_1280x720.png
  - workspace-detail_2025-12-08T06-26-34-498Z_1280x720.png
  - metadata-og_2025-12-08T06-26-33-527Z_1280x720.png
  - metadata-og_2025-12-08T07-04-34-889Z_1280x720.png

### Pranala Gambar

![Playwright Overview](../apps/app/docs/assets/e2e/2025-12-08/overview-1280x720.png)
![Chromium Summary](../apps/app/docs/assets/e2e/2025-12-08/browser-chromium-1280x720.png)
![Firefox Summary](../apps/app/docs/assets/e2e/2025-12-08/browser-firefox-1280x720.png)
![WebKit Summary](../apps/app/docs/assets/e2e/2025-12-08/browser-webkit-1280x720.png)
![Auth Flow](../apps/app/docs/assets/e2e/2025-12-08/spec-auth-flow-1280x720.png)
![A11y Settings](../apps/app/docs/assets/e2e/2025-12-08/a11y-settings-1280x720.png)
![API Docs](../apps/app/docs/assets/e2e/2025-12-08/api-docs-1280x720.png)
![Observability](../apps/app/docs/assets/e2e/2025-12-08/observability-1280x720.png)
![Performance](../apps/app/docs/assets/e2e/2025-12-08/performance-1280x720.png)
![Workspace Detail A](../apps/app/docs/assets/e2e/2025-12-08/workspace-detail_2025-12-08T06-50-49-795Z_1280x720.png)
![Workspace Detail B](../apps/app/docs/assets/e2e/2025-12-08/workspace-detail_2025-12-08T06-26-34-498Z_1280x720.png)
![Metadata OG A](../apps/app/docs/assets/e2e/2025-12-08/metadata-og_2025-12-08T06-26-33-527Z_1280x720.png)
![Metadata OG B](../apps/app/docs/assets/e2e/2025-12-08/metadata-og_2025-12-08T07-04-34-889Z_1280x720.png)

## Detail Teknis

- Penyesuaian waktu tunggu:
  - `waitForSelector('main,[role="main"]', { timeout: 20000 })` pada halaman asinkron.
  - Penundaan ringan pada API Docs untuk memberi waktu inisialisasi komponen.
- Penyelarasan rute:
  - `/login`, `/register`, `/reset-password` digunakan konsisten.

## Dampak dan Kompatibilitas

- Tidak ada regresi fungsional; pengujian a11y, metadata, dan flow utama tetap lulus.
- Perubahan aman untuk development/staging; produksi tidak terdampak karena cookie E2E hanya untuk pengujian.

## Cara Mengakses

- Jalankan server app: `PORT=3001 pnpm -C apps/app dev`.
- Jalankan pengujian dan buat laporan HTML: `PLAYWRIGHT_BASE_URL=http://localhost:3001 npx playwright test --reporter=html`.
- Buka laporan: `apps/app/playwright-report/index.html` atau URL yang disajikan oleh proses reporter.
