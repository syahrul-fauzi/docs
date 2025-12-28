# ADR-005 — Distributed Tracing & Correlation IDs

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Konteks

Observability end-to-end diperlukan untuk memetakan request dan event lintas komponen.

## Keputusan

- Gunakan OpenTelemetry tracing; propagate `tenantId/sessionId/requestId`.
- Visualisasi di Jaeger/Grafana; dashboard latency p95/p99.

## Implementasi

- Middleware menambahkan header `x-request-id` bila belum ada.
- Span attributes: `tenantId`, `sessionId`, `requestId`, `route`, `status`.

## Dampak

- Memudahkan RCA dan pemantauan SLA.
