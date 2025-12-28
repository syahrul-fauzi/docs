# SBA-Agentic — Go/No-Go Decision

## Gates & Evidence

- CI green: build/lint/type-check/test required (.github/workflows/main.yml:17–45, 47–75).
- Coverage: ≥80% on critical paths (sonar-project.properties:7).
- Security: `ci:guard` green; SCA/DAST passes; CSP/rate limit/RBAC verified in staging.
- Performance: CRUD p95 ≤ 2s; Streaming T90 < 2s; error rate ≤ 0.5%.
- Observability: `/api/metrics` operational; dashboards imported; alerts active.
- DR: Backup restoration validated; RTO/RPO targets met.

## Current Decision

- No-Go. Rationale: Code artifacts missing; baselines unmeasured; security scans not integrated; DR not validated. Aligns with readiness frameworks requiring governance, technology/data foundation, and operational controls before production.

## Path to Go

- Complete mitigations; attach artifacts (coverage, E2E, k6, ZAP). Reassess.
