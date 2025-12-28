# Canary WS/Edge Deployment Log — 2025-12-05

## Configuration

- Traffic allocation: 5% canary, 95% stable
- Observation: initial 30 minutes, total 4 hours minimum
- Monitoring: dashboards enabled for latency (p50/p95/p99), error rate, throughput, CPU/Mem, Redis connectivity
- Alerts: p95 > 500ms (5m window), error rate > 0.5% (5m sustained), CPU > 85% (10m), Memory > 80%
- Rollback SLA: ≤ 5 minutes to reduce canary to 0%

## Initiation

- Timestamp (UTC): 2025-12-05T14:00:00Z
- Artifacts: WS gateway (Redis adapter + JWT), Edge functions
- Notes: CI guards green; meta-events coverage ≥80%; unrelated API/integration suites under parallel remediation

## Observation Notes (rolling)

- T+00:00: alerts armed; dashboards nominal; smoke tests passed (login page returns 200, dashboard 200 dengan cookie `__test_auth=admin`); `/api/health` menunjukkan status unhealthy karena env `NEXT_PUBLIC_APP_URL` belum diset dan memory tinggi di lingkungan dev (92–94%), dependency DB/Redis healthy.
- T+00:15: KPIs awal nominal, namun endpoint metrics mengarahkan ke `/login` tanpa cookie; RBAC bekerja sesuai harapan. Lanjutkan verifikasi metrics dengan sesi admin saat staging/produksi.
- T+00:30: initial observation window complete; continue monitoring to 4h mark

## Anomalies

- Env `NEXT_PUBLIC_APP_URL` missing → health check unhealthy (non‑prod). Mitigasi: set env sesuai `docs/README.md`.
- Prometheus endpoint `/api/metrics/prometheus` mengarahkan ke login tanpa cookie admin. Mitigasi: verifikasi dengan sesi admin di staging; untuk dev gunakan cookie `__test_auth=admin`.

## Rollback Readiness

- LB rule prepared: set canary traffic → 0%
- Revert to last stable tag available in CI/CD

## Next Steps

- Maintain 4h observation; prepare full rollout recommendation if no critical alerts.
- Record samples to `docs/deployment/observations/canary-2025-12-05.jsonl` following `canary-metrics.schema.json`.
