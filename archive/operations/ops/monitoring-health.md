# Monitoring & Health Checks

- Metrics: count and duration for `/api/storage/{init,part,complete,abort}` tagged by provider and bucket.
- Alerts: fire on non-2xx responses and high retry counts.
- Health Checks: verify provider SDK credentials and bucket/container reachability; expose `/api/ops/health` with dependency status.
  - Include DB migration status and connection pool health.
  - Track 95th/99th percentile latency for storage endpoints and alert on regression.
