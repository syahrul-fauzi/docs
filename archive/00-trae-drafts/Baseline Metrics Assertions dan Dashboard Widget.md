# Baseline Metrics Assertions & Dashboard Widget

## Tujuan
- Memverifikasi kenaikan nilai metrik (khususnya `_count`) antar run menggunakan baseline snapshot.
- Menyediakan widget di dashboard untuk memantau tren, status verifikasi, dan opsi menyimpan baseline.

## Arsitektur
- Parser Prometheus: mengekstrak `_bucket`, `_sum`, `_count`, dan `_total` dari teks.
- API Baseline (`/api/metrics/baseline`): GET/POST untuk baca/tulis snapshot baseline.
- Helper E2E: menghitung delta antara nilai saat ini dan baseline, membandingkan dengan `expectedIncrement`.
- Widget Dashboard: menampilkan status verifikasi, laporan delta, refresh otomatis, dan tombol simpan baseline.

## Expected Increment
- `k6_http_req_duration_ms_count`: +3 per ingestion (avg, p95, p99).
- `k6_http_reqs_total`: +1 per operasi upload.
- Health metrics (`web_health_request_duration_seconds_count`): bergantung jumlah request health dalam test.

## Prosedur
1. Run pertama: helper menulis baseline dari nilai saat ini.
2. Run berikutnya: helper menghitung delta dan memverifikasi terhadap `expectedIncrement`.
3. Bila perlu, tekan "Simpan Baseline" di widget untuk memperbarui baseline.

## Laporan & Alert
- Laporan delta ditampilkan di log widget dan artefak e2e.
- Status hijau/merah pada widget menunjukkan keberhasilan/kegagalan verifikasi.
- Alert di dashboard muncul otomatis ketika delta di bawah threshold, dengan metadata kategori Observability dan severity High.

## Integrasi CI
- Menjalankan e2e dengan `UPDATE_BASELINE=true` untuk memperbarui baseline di CI bila diperlukan.

## A11y & UX
- Widget menggunakan `aria-live` untuk pembaruan status.
- Kontras warna memadai untuk status indicator.
