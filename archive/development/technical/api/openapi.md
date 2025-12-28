# API References (OpenAPI)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft API refs.

## Spesifikasi

- File: `apps/api/docs/openapi.yaml`
- Endpoint utama:
  - `GET /api/v1/feature-flags` — evaluasi feature flags per tenant/user
  - `POST /runs` — eksekusi orchestrator (body `RunBody`)
  - `POST /tools/knowledge` — pencarian knowledge
  - `POST /tools/render` — render dokumen
  - `POST /tools/task` — buat task
  - `POST /solo/builder/advance` — advance builder step/progress

## Skema

- `AgentMessage`, `RunBody`, `KnowledgeBody`, `KnowledgeHit`, `RenderBody`, `RenderResult`, `TaskBody`, `TaskResult`, `BuildAdvanceBody`, `BuildAdvanceResult`

## SDK & Types

- Rencana: `packages/api-types`, `packages/api-client` (lihat `docs/references/openapi-plan.md`)
