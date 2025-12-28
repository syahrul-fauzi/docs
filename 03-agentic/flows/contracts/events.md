---
title: Kontrak Event — Agentic SSE/WS
created_at: 2025-12-08
last_modified: 2025-12-08
author: team@sba
reviewer: qa@sba
status: Draft
priority: P1
tags: [agentic, contracts]
related:
  - apps/orchestrator/src/engine.ts
  - apps/orchestrator/src/domain.ts
  - packages/ui/src/ag-ui/hooks/useAGEvents.ts
---

# Event Types & Payload

- RUN_STARTED
- STEP_DECISION
- TOOL_CALL_REQUESTED
- TOOL_CALL_RESULT
- RUN_INTERRUPTED
- RUN_RESUMED
- RUN_FINISHED

# Payload Schema (Ringkas)

- Field wajib: `requestId`, `x-tenant-id`, `runId`, `threadId`, `agentId`, `toolCallId?`, `interruptId?`, `event`, `state`, `ts`, `durationMs?`, `outcome?`, `errorCode?`.
- Confidentiality: redaksi/enkripsi konten reasoning bila sensitif.
- Integrity: dukungan `signature` (HMAC) opsional untuk verifikasi payload.

# Error Handling

- Kategori: `invalid_payload`, `unauthorized`, `rate_limited`, `timeout`, `policy_violation`, `internal_error`.
- Struktur error: `code`, `message`, `details`, `requestId`.
