# Draft Query Dashboard — SLO (Grafana/Datadog)

## SLO Definitions

- Availability: 99.9% monthly (error budget 0.1%).
- Latency: p95 transaction duration < 200ms.
- Error Rate: db_transaction_errors_total per tenant below threshold.

## Metrics (OpenTelemetry)

- `db_transaction_duration_ms` (Histogram)
- `db_transaction_errors_total` (Counter)
- `db_aggregate_hits_total` (Counter)
- `orchestrator_request_duration_ms`, `orchestrator_requests_total` (Existing)

## Grafana (PromQL examples)

- Availability (proxy via request errors):
  - `sum(rate(orchestrator_requests_total{status="failed"}[5m])) / sum(rate(orchestrator_requests_total[5m]))`
- Latency p95:
  - `histogram_quantile(0.95, sum(rate(db_transaction_duration_ms_bucket[5m])) by (le))`
- Error budget burn:
  - `sum(rate(db_transaction_errors_total[5m])) / (total_requests * (1 - 0.999))`
- Aggregate hits per tenant:
  - `sum(rate(db_aggregate_hits_total[5m])) by (tenant_id)`

## Datadog (Query examples)

- Latency p95:
  - `quantile(0.95):avg:db_transaction_duration_ms{*} by {service,tenant_id}`
- Error rate:
  - `sum:db_transaction_errors_total{*} by {tenant_id} / sum:orchestrator_requests_total{*} by {tenant_id}`
- Availability:
  - `1 - (errors / requests)`; visualized with timeseries and SLO widget.

## Visualizations

- Error budget: SLO widget with burn down chart.
- Availability: timeseries with monthly window & budget line.
- Latency: p95/p99 dual series.
- Aggregate hits: per-tenant bar chart.

## Assumptions & Parameters

- Labels: `tenant_id`, `service` present on metrics.
- Buckets emitted for histogram duration metrics.
- Window examples: 5m, 1h, 30d; adjust per dashboard.
