# FRD — apps/app (Orkestrasi UI Agentic)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft FRD awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Latar Belakang & Tujuan

apps/app menyediakan UI untuk mengontrol lifecycle agent runs dan menampilkan stream event secara real-time, memisahkan presentasi dari backend orchestration.

## Fitur Utama

- Start/Continue/Cancel Run
- Streaming event AG-UI (SSE/WS) dan fallback
- Proxy endpoint AG-UI
- Health/metrics UI

## Spesifikasi Fungsional

- Start Run: `POST /api/v1/runs` dengan tenant header; tampilkan runId
- Subscribe Stream: SSE ke `/runs/{runId}/events`; render event types
- Continue Run: `POST /runs/{runId}/continue` dengan payload user
- Cancel Run: `POST /runs/{runId}/cancel` dan putus stream
- Error Handling: retry eksponensial, timeout 30s, schema `ApiError`

## Diagram Use Case

```mermaid
usecaseDiagram
actor User
User -- (Start Run)
User -- (Continue Run)
User -- (Cancel Run)
User -- (View Stream Events)
```

## Batasan Sistem

- Tidak mengelola persistence utama
- Bergantung pada apps/api untuk kontrak dan stream
- SSE adalah channel utama; WS sebagai fallback

## Acceptance Criteria

- Alur start/continue/cancel berjalan dan stream tampil
- Fallback berfungsi saat SSE gagal
- UI menampilkan status dan error konsisten

## Referensi

- docs/use-cases/apps-app-detail.md
- docs/architecture/README.md:45-64
