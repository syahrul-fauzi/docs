# Production Runbook (SBA-Agentic)

## Startup Sequence

1. Start Redis
2. Start API
3. Start App
4. Start monitoring stack (Prometheus, Alertmanager, Grafana, cAdvisor)

## Docker Compose (Recommended)

Set env vars (real production):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_KEY`)
- `NEXT_PUBLIC_API_BASE_URL`

Optional (local production-like without external dependencies):

- `ALLOW_MISSING_SUPABASE=true`
- `SKIP_STRICT_ENV_VALIDATION=true`

Run:

```bash
docker compose -f docker-compose.agentic.prod.yml up -d --build
```

Stop:

```bash
docker compose -f docker-compose.agentic.prod.yml down
```

## Health Checks

- App: `GET http://localhost:3002/api/healthz`
- App metrics: `GET http://localhost:3002/metrics`
- API liveness: `GET http://localhost:3001/health/live`
- API readiness: `GET http://localhost:3001/health/ready`
- API metrics: `GET http://localhost:3001/metrics`

## Smoke Tests

```bash
curl -fsS http://localhost:3002/api/healthz
curl -fsS http://localhost:3002/metrics | head
curl -fsS http://localhost:3001/health/ready
curl -fsS http://localhost:3001/metrics | head
```

## Monitoring

- Prometheus: `http://localhost:9090`
- Alertmanager: `http://localhost:9093`
- Grafana: `http://localhost:3000` (default `admin` / `admin`)
- cAdvisor: `http://localhost:8080`

Quick resource snapshot:

```bash
docker stats --no-stream
```
