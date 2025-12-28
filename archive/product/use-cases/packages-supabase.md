# Paket: @sba/supabase (Client & Repos Supabase)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal.

## Peran & Tanggung Jawab

- Menyediakan factory client Supabase dan repos CRUD standar untuk tabel inti.

## Fitur Utama

- Auth helper, channel realtime; repos conversations/messages/documents/tenants.

## Integrasi

- Dipakai utama oleh `apps/web`; `apps/app` untuk server-side util bila perlu.

## Persyaratan Teknis

- `@supabase/supabase-js`, TypeScript.

## Tujuan Implementasi

- CRUD konsisten, subscription channel berfilter.

## Batasan

- Tidak mengelola WS gateway backend.

## Error Handling

- Pemeriksaan `{data,error}`; fallback di mode test/CI.

## Logging & Monitoring

- Minimal; serahkan ke aplikasi.

## Kontribusi ke SBA

- Persistence real-time yang sederhana dan standar.

## Skenario Utama

- Insert message → realtime broadcast.

## Acceptance Criteria

- Repos CRUD berfungsi dengan filter tenant.

## Test Plan

- Unit repos; integrasi channel.

## Flowchart

```mermaid
flowchart TD
  Web --> Supa[@sba/supabase]
  Supa --> SB[(Supabase)]
```

## Referensi

- `apps/web/src/shared/api/client.ts:1-156,245-263`
