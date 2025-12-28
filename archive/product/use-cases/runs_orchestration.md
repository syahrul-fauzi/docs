---
title: Use Case — Runs Orchestration
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [runs, orchestrator]
---

# Deskripsi

- Mengelola siklus eksekusi runs melalui OrchestratorEngine: rate limit per tenant, retry, cooldown saat kegagalan beruntun.

# Aktor

- Client (UI/API)
- OrchestratorEngine
- ToolRegistry (ports/adapters)

# Alur Normal

1. Client mengirim `submit(invocation)`.
2. Engine melakukan `decide()` berdasarkan health/rate limit.
3. Engine `execute()` via registry; catat hasil dan kesehatan.

# Edge Cases

- Rate limit → tindakan WAIT, masuk kembali ke queue.
- Max failures → tindakan STOP, cooldown aktif.
- Retryable failure → push kembali ke queue.

# Acceptance Criteria

- Throughput stabil sesuai `rateLimitPerTenant`.
- MTTR terjaga melalui retry/cooldown.

# Referensi Kode

- Keputusan rate limit: `apps/orchestrator/src/engine.ts:40–42`
- Update kesehatan tenant: `apps/orchestrator/src/engine.ts:45–53`
- Retry push ke queue: `apps/orchestrator/src/engine.ts:79–82`
