# ADR-005 Details — Tracing & Correlation

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Instrumentasi

- Frontend: inisialisasi tracer; span untuk request; attributes `tenantId`, `route`, `status`
- Backend: middleware inject `x-request-id` dan propagate context

## Visualisasi

- Jaeger untuk trace; Grafana untuk metrik latency/error

## Pengujian

- Trace end-to-end untuk skenario `/runs` dengan SSE stream; pastikan korelasi konsisten
