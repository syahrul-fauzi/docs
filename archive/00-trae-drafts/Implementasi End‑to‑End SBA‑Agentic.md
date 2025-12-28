# Implementasi End‑to‑End SBA‑Agentic

## Langkah Operasional
- Setup: instal dependensi, validasi env lokal yang aman untuk test.
- Build & Start: `pnpm build && pnpm start` pada aplikasi target; Playwright webServer dengan wait‑on.
- Test: jalankan lint, type‑check, unit/integration, lalu E2E dengan reporter html+junit.

## Validasi Health & Metrics
- Akses `/api/health` dan `/api/metrics/prometheus`; pastikan histogram (`*_bucket/_sum/_count`) dan counters (`*_total`) hadir.

## Baseline & E2E
- First‑run: tulis baseline via `POST /api/metrics/baseline`.
- Delta: verifikasi peningkatan sesuai ekspektasi per aksi (misalnya upload sukses/error).

## Artefak CI
- Unduh artefak baseline sebelum E2E; unggah baseline terbaru sesudahnya dengan retensi dan logging.

## Checklist Selesai
- Build stabil; tes lulus; E2E delta terpenuhi; artefak baseline tersimpan; dokumentasi diperbarui.

