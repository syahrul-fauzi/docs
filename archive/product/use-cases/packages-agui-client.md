# Paket: @sba/agui-client (AG-UI Client)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal.

## Peran & Tanggung Jawab

- Klien khusus untuk endpoint AG-UI (chat/stream) yang digunakan di frontend.

## Fitur Utama

- Fetch chat, pemrosesan response, integrasi dengan UI.

## Integrasi

- Dipakai `apps/web` dan `apps/app` untuk interaksi AG-UI.

## Persyaratan Teknis

- Fetch API, TypeScript.

## Tujuan Implementasi

- Konsistensi response handling dan error mapping.

## Batasan

- Tidak mengelola SSE/WS umum (itu di `@sba/sdk`/`@sba/realtime`).

## Error Handling

- Normalisasi error; fallback.

## Logging & Monitoring

- Interceptors untuk logging ringan.

## Kontribusi ke SBA

- Menyatukan konsumsi AG-UI.

## Skenario Utama

- Kirim prompt → terima balasan dan render.

## Acceptance Criteria

- Response sesuai kontrak endpoint.

## Test Plan

- Unit parsing; integrasi fetch mock.

## Flowchart

```mermaid
flowchart TD
  Web/App --> AGUI[@sba/agui-client]
  AGUI --> API
```
