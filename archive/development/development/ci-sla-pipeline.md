# CI Pipeline & SLA Dashboard — Implementasi

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pipeline CI dan SLA dashboard.

## CI Jobs

- Lint Kode: ESLint/TS + Markdown lint
- OpenAPI Lint: `spectral`
- OpenAPI Diff: `openapi-diff` terhadap baseline
- Contract Test: Prism mock server, test `runs/tools/builder`
- Build/Test/Type-check: Turborepo

## SLA Dashboard

- Metrik: availability, latency p50/p95/p99, error rate
- Sumber: OpenTelemetry + Prometheus
- Visualisasi: Grafana/Jaeger

## Integrasi

- Publikasi hasil CI ke artefak, trigger alert bila SLA dilanggar
