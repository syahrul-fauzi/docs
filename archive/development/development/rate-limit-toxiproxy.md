# Rate Limiting Simulation — Toxiproxy

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft simulasi rate limit.

## Setup

- Jalankan Toxiproxy dan buat proxy untuk endpoint API.
- Konfigurasikan `bandwidth`, `latency`, dan `timeouts` untuk throttling.

## Skenario

- Threshold request: naikkan latency saat RPS tinggi.
- Exceeded limit: return error 429 (simulasi via mock layer).
- Reset interval: hapus toksik setelah periode.

## Verifikasi

- Pastikan klien menerapkan retry/backoff yang aman.
- Catat metrik error rate dan waktu pemulihan.
