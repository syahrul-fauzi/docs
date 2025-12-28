# Canary Observation Report — 2025-12-05

## Executive Summary

- Scope: WS gateway and Edge functions at 5% traffic for 4h
- Initial 30m window: nominal metrics, no critical alerts
- Recommendation: proceed with continued canary observation; plan full rollout pending 4h stability

## Quantitative Metrics (samples)

- Window: 5m / 15m (rolling)
- Latency: p50=XXms, p95=XXms, p99=XXms
- Error rate: X%
- Throughput: X req/s (Edge), X events/s (WS)
- Resources: CPU=X%, Mem=X%, Redis=ok
- Business KPIs: active_sessions=X, messages_per_min=X, workflow_creations=X

## Qualitative Feedback

- User journeys: login, chat, WS subscriptions, edge endpoints behave as expected
- No reported regressions during initial window

## Anomalies

- None observed; alerts armed and verified via synthetic tests

## Risk Assessment

- Low risk for full rollout if metrics remain nominal through 4h; rollback readiness in place

## Recommendations

- Full rollout after 4h if metrics stay within thresholds
- If anomalies arise: reduce canary to 0%, investigate, retry with fixes

## Appendices

- Deployment log: `docs/deployment/canary-WS-Edge-2025-12-05.md`
- Metrics schema: `docs/deployment/canary-metrics.schema.json`
- Post-mortem template: `docs/ops/postmortem-template.md`
