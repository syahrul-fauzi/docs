# SBA-Agentic — Pre-Launch Checklist

## Configuration & Secrets

- `.env` includes `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (docs/deployment/GO_LIVE_CHECKLIST.md:5–8).
- Centralized secrets configured; rotation verified.

## Build & Tests

- Build apps `apps/*`; type-check monorepo; tests pass; coverage ≥80%.
- E2E artifacts published; flakiness ≤ 5% (Jenkinsfile:13–22).

## Security

- CSP nonce and headers active; Upstash rate limiting in place; RBAC verified.
- `ci:guard` green; no client bundle secrets.

## Observability & Alerts

- `GET /api/metrics` returns; Prometheus/OTel scraping; dashboards imported; alerts configured.

## Runtime & Config

- Node runtime flags set where required; `next.config.js` security headers/images remote patterns consistent.

## A11y & UX

- Keyboard navigation and ARIA pass; web-vitals healthy on main pages.

## Deployment & Canary

- Staging smoke tests pass; health checks active.
- Canary rollout: 5% → observe 30m then ≥4h; rollback plan validated.

## Sign-offs

- Tech Lead, QA, Security, Ops sign-off recorded in `docs/deployment/*`.

## Owner Assignments

- Engineering Lead: code restoration, type-check/build, traceability reconciliation.
- QA Lead: unit/integration/E2E execution, coverage reporting, flakiness gating.
- Security Lead: SCA/DAST runs, SBOM generation, secrets rotation audit.
- SRE/Ops Lead: k6/Toxiproxy tests, alert thresholds, dashboard import, health checks.
- Product/PM: canary decision log and stakeholder communication.
