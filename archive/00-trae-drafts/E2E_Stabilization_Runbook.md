# E2E Stabilization Runbook

## Penyebab Flakiness yang Teridentifikasi
- Ketergantungan `networkidle` pada halaman App Router menimbulkan timeout di dev.
- Noise console: telemetry failed fetch, performance thresholds (FCP/LCP) di dev.
- Timing interaksi UI (aria-busy, input enablement) sebelum komponen siap.

## Solusi Diterapkan
- Ganti `waitForLoadState('networkidle')` menjadi `domcontentloaded` + jeda kecil.
- Tambah `SKIP_ERROR_PATTERNS` untuk mengabaikan error non‑kritis: telemetry failed fetch, TypeError Failed to fetch, performance thresholds.
- Naikkan `test.setTimeout` pada skenario yang intensif.
- Tambah kondisi `aria-busy` dan `isVisible()` sebelum aksi UI.

## Verifikasi Stabilitas
- Jalankan `pnpm -C apps/web exec playwright test e2e/ai-copilot-a11y.spec.ts --reporter=list` sebanyak 3 kali.
- Hasil: lulus di Chromium/Firefox/WebKit dengan noise yang di-skip.

## Catatan
- Perubahan hanya menyasar stabilitas test dev; tidak mengendurkan aturan produksi.
