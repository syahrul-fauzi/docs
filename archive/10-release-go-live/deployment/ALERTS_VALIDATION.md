# ALERTS VALIDATION — p95 & Error Rate

## Tujuan

Memastikan aturan alert latensi p95 dan error rate berfungsi, notifikasi terkirim, dan tindakan mitigasi tercatat.

## Prasyarat

- Dashboard OTel/Prometheus aktif; kanal notifikasi (Slack/Email/Pager) tersambung.
- Target: p95 ≤ 500ms, error rate ≤ 0.5%.

## Langkah Uji — Latensi p95

- Buat beban terkontrol pada endpoint API utama dengan penundaan buatan (staging):
  - Jalankan skrip load ringan yang menambah latensi hingga > 500ms untuk ≥ 3 sampling.
- Verifikasi:
  - Metrik p95 naik di dashboard.
  - Alert p95 terpicu; notifikasi masuk ke kanal.
  - Catat timestamp, durasi pelanggaran, dan respons tim.

## Langkah Uji — Error Rate

- Induksi error terkontrol (staging):
  - Trigger kegagalan validasi atau respons 5xx pada endpoint non-kritis.
- Verifikasi:
  - Error rate > 0.5% di dashboard.
  - Alert error rate terpicu; notifikasi terkirim.

## Mitigasi & Rollback (Simulasi)

- Tindakan: throttle traffic, nonaktifkan fitur, atau rollback parsial.
- Pastikan metrik kembali ke baseline setelah mitigasi.

## Dokumentasi Hasil

- Catat hasil di `docs/deployment/canary-WS-Edge-YYYY-MM-DD.md`.
- Log anomali dengan `docs/deployment/anomaly-log.schema.json`.
