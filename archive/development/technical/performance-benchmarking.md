# Performance Benchmarking

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft benchmarking.

## Target

- Streaming: T90 < 2s; reconnect < 10s
- CRUD: p50 < 300ms; p95 < 2s
- Enqueue: < 50ms

## Metodologi

- k6 profil streaming/CRUD; Toxiproxy chaos untuk SSE/Redis
- Observability: OpenTelemetry timers (p50/p95/p99) dan counters

## Pelaporan

- Laporan SLA harian; alert pada pelanggaran
