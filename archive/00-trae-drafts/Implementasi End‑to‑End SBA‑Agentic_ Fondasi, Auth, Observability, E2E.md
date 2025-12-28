# Implementasi End‑to‑End: Fondasi, Auth, Observability, E2E

## Fondasi
- `next.config.mjs` ESM, alias/stub untuk isolasi frontend.
- Konsistensi `tsconfig.*`, vitest/playwright; halaman global error/not‑found/loading.

## Auth ↔ Prisma
- Model user/sesi; guard/middleware; strategi testing aman; verifikasi integrasi.

## Observability
- `/api/metrics/prometheus`, `/api/metrics/ingest`, `/api/metrics/baseline` aktif; parser & helper; widget dashboard untuk delta & simpan baseline.

## E2E
- Skenario login→dashboard, chat stream, upload multi tipe, health & metrics.
- Baseline assertions: tulis baseline pada first‑run, verifikasi delta pada run berikutnya.

## CI
- Build, test, E2E; unduh/unggah artefak baseline; opsional penamaan artefak berdasar branch dan `concurrency`.

