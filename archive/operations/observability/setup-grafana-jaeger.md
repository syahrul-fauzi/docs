# Observability Setup — Grafana & Jaeger

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft setup observability.

## Grafana (Metrik)

- Data source Prometheus; dashboards untuk latency p50/p95/p99, error rate, availability.
- Panel per endpoint `/runs`, `/tools/*`; tag `tenantId/sessionId/requestId`.

## Jaeger (Tracing)

- OpenTelemetry collector → Jaeger.
- Span attributes: route, status, tenantId, sessionId, requestId.

## Alerting

- Rules: pelanggaran SLA (latency p95), error rate > ambang; notifikasi ke kanal tim.

## Best Practices

- Instrumentasi minimal di setiap boundary; sampling disesuaikan trafik.
