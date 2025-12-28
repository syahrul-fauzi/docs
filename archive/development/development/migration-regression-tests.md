# Regression Tests — Migrasi ke Facade Shared

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft regresi migrasi.

## Cakupan

- HTTP: validasi `@sba/api-client` menggantikan klien lama.
- Realtime: validasi `@sba/realtime` menggantikan manajer SSE/WS lokal.

## Kasus Uji

- Start run, stream events, continue/cancel.
- Tools: knowledge/render/task; builder advance.

## Monitoring Error

- Tangkap error via handler standar; tulis log uji; cek metrik error rate.

## Acceptance Criteria

- Tidak ada breaking changes; alur utama tetap hijau.
