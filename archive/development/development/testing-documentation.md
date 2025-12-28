# Dokumentasi Tujuan Pengujian & Pedoman

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft dokumentasi testing.

## Tujuan

- Memastikan paket shared bekerja konsisten lokal dan CI.
- Menjaga kompatibilitas kontrak OpenAPI.

## Pedoman

- Assertions jelas dan meaningfully mengikat spesifikasi.
- Mock dengan tepat untuk dependensi eksternal.
- Standar coding konsisten; lint hijau.

## Eksekusi

- Lokal: `pnpm --filter @sba/api-client run test:ci`, `pnpm --filter @sba/realtime run test:ci`
- CI: otomatis melalui workflow.
