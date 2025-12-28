---
title: Dashboard & Alerting — Baseline
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [monitoring, alerts]
---

# Dashboard

- Gunakan Grafana untuk panel RPS, p95/p99, error rate.
- PromQL contoh:
  - `sum(rate(web_health_request_duration_seconds_count[5m]))`
  - `histogram_quantile(0.95, sum(rate(web_health_request_duration_seconds_bucket[5m])) by (le))`

# Alerting

- Trigger bila p95 > 500ms selama 5m.
- Trigger bila error rate > 0.5% selama 5m.
