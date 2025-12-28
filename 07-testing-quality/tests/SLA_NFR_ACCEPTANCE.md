---
title: "SLA & NFR Acceptance Criteria"
created_at: 2025-12-28
author: QA Team
status: active
---

# SLA & NFR Acceptance Criteria

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft definisi acceptance tests.

## Metrik & Target

- Streaming: T90 latency < 2s; reconnect < 10s; reliability 99%/10m
- CRUD: p50 response < 300ms; failure rate insert < 1%
- Enqueue: enqueue < 50ms; durability across worker restart

## Suite & Tools

- Unit/Integration: Vitest (apps/app, apps/web, apps/api)
- E2E: Playwright (apps/web), supertest (apps/api)
- Load: k6 (profil streaming & CRUD)
- Chaos: Toxiproxy (disconnect SSE, slow Redis)

## Kasus Uji

- Streaming
  - Parser & event typing konsisten; heartbeat & reconnect
  - Burst event tidak membekukan UI
- CRUD
  - Conversations/messages/documents konsisten per-tenant; realtime deliver p95 < 2s
- Enqueue
  - Job masuk queue < 50ms; diproses setelah restart worker

## Monitoring & Alerting

- OpenTelemetry counters/timers (p50/p95/p99)
- Alerts pada pelanggaran SLA