---
title: Production Readiness Checklist for SBA-Agentic
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [release, production, readiness, checklist, go-live]
---

# Production Readiness Checklist

## Observability & Metrics

- Prometheus text endpoints: `GET /metrics` and `GET /metrics/workers` (admin, RBAC)
- Workers history: `GET /metrics/workers/history` (JSON) dan `GET /metrics/workers/history/export.csv` (CSV)
- Baseline metrics di web: widget, polling, dan alert push `/api/audit/alerts`
- Grafana dashboard di `ops/grafana/dashboard-sba.json`

## Security

- API Express: `helmet`, `cors`, compression, request-id
- JWT & RBAC: guards `JwtAuthGuard` dan `RolesGuard`
- Reverse proxy TLS untuk scrapes Prometheus (ops/proxy/\*)
- Web CSP/Permissions-Policy via `apps/web/middleware.ts`

## Performance

- HTTP compression, caching, connection pooling
- Queue/BullMQ throughput dan backpressure; p95/p99 latency
- K6 skenario: smoke, stress, soak (ops/k6/\*)

## Reliability & Readiness

- Liveness/readiness: `GET /health` (API & Web)
- Graceful shutdown & timeouts; circuit-breaker dasar untuk downstream

## Testing & Validation Strategy

- **Unit & Integration Testing**
  - Framework: Vitest + React Testing Library (Web), Vitest + Supertest (API)
  - Scope: Core logic, utilities, hooks, UI components interaction.
  - Requirement: Pass all suites before merge.

- **End-to-End (E2E) Testing**
  - Framework: Playwright
  - Scope: Critical user journeys (Login, Chat, Workflow, Dashboard).
  - Environment: Staging-like (Production build preferred).
  - Accessibility: Integrated Axe-core audits (no critical/serious issues).
  - Stability: Retries enabled (max 2), trace on failure.

- **Manual Validation (UAT)**
  - Cross-browser check (Chrome, Firefox, Safari).
  - Mobile responsiveness verification.
  - Screen reader walkthrough (NVDA/VoiceOver).

- **CI/CD Gates**
  - Linting (ESLint, Prettier).
  - Type Checking (TypeScript).
  - Unit Tests.
  - E2E Tests (Headless).
  - Build verification.

## CI/CD

- Gates: build → test → promtool/amtool → k6 thresholds → consolidated report
- Staging verify via TLS reverse proxy; manual approval sebelum production
- Laporan konsolidasi HTML/PDF auto-orient

## Operations

- Prometheus configs (ops/prometheus/_.yml), Alertmanager (ops/alertmanager/_)
- Reverse proxy auth untuk Prometheus (ops/proxy/\*)
- Runbooks dan troubleshooting (lihat docs/SECURITY_ENDPOINTS.md)

## Alertmanager Delivery Panels (Grafana)

- Dashboard menampilkan: success/failure rate, latency p95/p99, retry attempts, failure ratio (%), filter berdasarkan `receiver`.
- Time range selector dan refresh interval tersedia pada dashboard.

## Alerting Verification (Staging)

- Workflow: `.github/workflows/alerting-verify.yml` memvalidasi config (`amtool`, `promtool`) dan mensimulasikan alert nyata via `POST /api/v2/alerts` ke Alertmanager staging.
- Secrets yang diperlukan: `PROM_HOST`, `PROM_PORT`, `ALERTMGR_HOST`, `ALERTMGR_PORT`, `ALERT_TEST_RECEIVER`.
- Artefak verifikasi: response POST, metrik notifikasi, metrik latency count.
