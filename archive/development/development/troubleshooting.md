# Troubleshooting Guide — Common Issues

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft troubleshooting.

## Masalah Umum saat Setup (Environment)

| Masalah              | Penyebab umum                 | Solusi                                              |
| :------------------- | :---------------------------- | :-------------------------------------------------- |
| `pnpm install` gagal | mismatch Node/pnpm            | pakai Node `20`, pnpm `8.15.0`                      |
| `x-tenant-id` error  | header tidak ada/invalid UUID | set `x-tenant-id` sesuai aturan endpoint            |
| type-check gagal     | cache TS/Next                 | restart TS server, jalankan `pnpm type-check` ulang |

## Masalah Runtime

### SSE Disconnect

- Gejala: stream berhenti, tidak ada heartbeat
- Solusi: cek jaringan; fallback WS; long-poll aktif (lihat `sse.ts`)

### Redis Latency / Queue Stuck

- Gejala: enqueue > 50ms, job tidak diproses
- Solusi: periksa konektivitas; ukur metrik; restart worker terkontrol; kompensasi ulang

### Supabase Errors

- Gejala: `{data: null, error}` pada CRUD
- Solusi: validasi input (zod); cek RLS; gunakan retry aman

### API Contract Mismatch

- Gejala: respons tidak sesuai types
- Solusi: jalankan `spectral` dan `openapi-diff`; sinkronisasi `api-types`
