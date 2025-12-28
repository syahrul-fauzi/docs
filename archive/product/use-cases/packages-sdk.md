# Paket: @sba/sdk (SDK & Orkestrasi Klien)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal use case dan alur.

## Peran & Tanggung Jawab

- Menyediakan abstraksi SDK untuk berinteraksi dengan backend SBA (REST/WS/SSE) secara typed.

## Fitur Utama

- Klien REST typed; wrapper SSE/WS event; helper auth/tenant headers.

## Integrasi

- Digunakan oleh `apps/app` untuk orkestrasi run/event; dapat digunakan `apps/web` bila konsumsi REST diperlukan.

## Persyaratan Teknis & Dependensi

- TypeScript, zod untuk schema, fetch API.

## Tujuan Implementasi

- Menstandarkan interaksi klien-backend; mengurangi drift kontrak.

## Batasan & Lingkup

- Tidak memuat UI; fokus data exchange.

## Error Handling

- Normalisasi `ApiError`; retry eksponensial; timeout.

## Logging & Monitoring

- Hook untuk interceptors logging; tidak menyimpan secret.

## Kontribusi ke SBA

- Memastikan konsistensi komunikasi dan mempercepat integrasi.

## Skenario Utama

- Start/Continue/Cancel run; subscribe events.

## Acceptance Criteria

- Metode sesuai OpenAPI; SSE/WS event map seragam.

## Test Plan

- Contract tests dengan OpenAPI; unit retry/timeout; integrasi SSE/WS mock.

## Flowchart

```mermaid
flowchart TD
  App --> SDK[@sba/sdk]
  SDK --> API[apps/api]
```

## Referensi Teknis

- Konsumsi di `apps/app` (klien REST/SSE/WS).
