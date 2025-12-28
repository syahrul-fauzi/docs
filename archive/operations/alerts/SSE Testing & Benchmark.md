# SSE Testing & Benchmark

## Skenario Pengujian

- Koneksi dasar: konsumsi `GET /api/metrics/sse` dan terima event.
- Putus koneksi: `GET /api/sse/test?disconnectAfterMs=...` menutup stream terprogram.
- Beragam payload: gunakan `format=json|xml|text` dan `size` untuk variasi ukuran.
- Beban konkuren: buka beberapa koneksi paralel dan ukur total event.

## Matriks Payload

- Kecil: 1–10KB
- Medium: 10–100KB
- Besar: 100KB–1MB
- Format: JSON, XML, plain text melalui `/api/sse/test`.

## CI Integrasi

- Stage SSE benchmark di workflow `deploy-app.yml` menjalankan `apps/app/e2e/sse-benchmark.spec.ts`.
- Snapshot metrik dikumpulkan via `monitor:metrics` ke `artifacts/metrics`.
- Laporan ringkas benchmark di `artifacts/benchmark/sse-benchmark-summary.json`, dengan output tambahan CSV (`sse-benchmark-summary.csv`) dan NDJSON (`sse-benchmark-summary.ndjson`).

## Otomatisasi & Verifikasi

- Skrip otomatis: Playwright spec + writer + reporter.
- Integritas data: verifikasi menerima event dan jumlah > 0; format sesuai parameter.
- Penanganan error: SSE test memastikan stream tertutup rapi saat disconnect.

## Penyesuaian Durasi Benchmark

- Env `BENCHMARK_DURATION_MS` mengatur durasi konsumsi SSE pada benchmark; default `3000` ms.
- Contoh: `BENCHMARK_DURATION_MS=5000 PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm -F @sba/app test:e2e --project=chromium --workers=1 apps/app/e2e/sse-benchmark.spec.ts`.

## Spesifikasi Format Output

- JSON per kasus: `artifacts/benchmark/<label>.json` dengan struktur `{ label, count, latencyMs, bytesPerEvent, format, meta:{ recordedAt, baseUrl, durationMs, version } }`.
- Summary JSON: `sse-benchmark-summary.json` dengan kumulatif `totalTests`, `passed`, `failed`, `matrix[]`, `meta.version`.
- CSV: `sse-benchmark-summary.csv` dengan kolom `title,status`.
- NDJSON: `sse-benchmark-summary.ndjson` satu objek per baris `{ title, status, at }`.

## Validasi

- Bandingkan hasil dengan baseline sebelumnya (commit/time). Pastikan tidak ada regresi fungsional pada E2E smoke.
