---
id: 20251208-agent_interrupt_resume-flow
title: Agent Interrupt & Resume — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: qa@sba
approver: pm@sba
status: Draft
priority: P1
tags: [agentic, lifecycle, approval]
related:
  - workspace/01_PRD/agent_interrupt_resume.md
  - workspace/02_Architecture/diagrams/agent_interrupt_resume-sequence.mmd
  - workspace/02_Architecture/ADR-011.md
  - workspace/05_API/_templates/API-doc-template.md
  - apps/app/src/shared/lib/openapi.ts
  - apps/app/src/app/api/knowledge/route.ts
  - workspace/04_Agent-Flows/bpmn/agent_interrupt_resume.bpmn
---

# Ikhtisar

- Agen mendukung interupsi terkontrol untuk persetujuan manusia dan melanjutkan eksekusi dengan payload yang tervalidasi.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Running: RUN_STARTED
  Running --> InterruptRequested: needs_approval
  InterruptRequested --> WaitingApproval: emit_interrupt
  WaitingApproval --> Resuming: resume_payload_valid
  WaitingApproval --> Failed: timeout_or_reject
  Resuming --> Running: resume_applied
  Running --> Completed: run_finished_success
  Running --> Failed: run_finished_error
  Completed --> [*]
  Failed --> [*]
```

# Decision Tree

```mermaid
flowchart TB
  A[Proposal requires approval?] -->|Yes| B[Pause run]
  A -->|No| C[Continue execution]
  B --> D[Emit INTERRUPT event]
  D --> E{User response}
  E -->|Approve| F[Apply resume payload]
  E -->|Reject| G[Fail run]
  F --> H[Resume execution]
  H --> I[Validate outputs]
  I --> J[Finish]
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant UI
participant Orchestrator
participant Agent
UI->>Orchestrator: Trigger tool proposal
Orchestrator->>Agent: Step request
Agent->>Agent: Reason (policy check, risk assessment)
Agent->>Orchestrator: Act: INTERRUPT (pause + emit)
UI-->>Orchestrator: Resume payload {approved}
Orchestrator-->>Agent: Resume command
Agent->>Agent: Reason (validate payload, constraints)
Agent->>Orchestrator: Act: continue tool-call
Orchestrator->>UI: Outputs + events
```

# Input Processing

- Kanal: UI resume form, API resume endpoint, webhook.
- Validasi awal: schema payload (approved:boolean, notes:string?), RBAC gate, tenant header.

# Parsing & Perception

- Normalisasi payload, binding ke `interruptId` dan `runId`.
- Persepsi konteks: status run, waktu tunggu, kapasitas.

# Reasoning

- Kebijakan approval, guard-rails, dan evaluasi risiko tool-call.
- Strategi: rule-based + heuristik prioritas; fallback bila ambigu.

# Execution

- Pause runner, emit event, tunggu resume.
- Setelah approve: lanjutkan tool-call dengan timeout, retry/backoff.

# Output Validation

- Validasi idempotensi hasil, verifikasi schema, dan kebijakan bisnis.
- Penanganan kesalahan: kategori `policy_violation`, `timeout`, `invalid_payload`.

# Logging

- Event konsisten: RUN_STARTED, INTERRUPT_EMITTED, RUN_PAUSED, RUN_RESUMED, RUN_FINISHED.
- Skema log JSON (wajib): `requestId`, `x-tenant-id`, `runId`, `threadId`, `agentId`, `interruptId`, `event`, `state`, `ts`, `durationMs`, `outcome`, `errorCode`.

# Lifecycle Testing

- Happy-path: approve → resume → selesai.
- Error-path: reject → gagal; timeout → gagal.
- Verifikasi urutan event SSE/WS dan transisi state.

# Integrasi

- Orchestrator engine dan event bus kompatibel dengan mapping state/aksi.
- Observability: label `x-tenant-id`; metrics via `withMetrics`.

# Test Cases & Skenario

- Approve resume valid → run selesai.
- Resume payload invalid → gagal dengan `invalid_payload`.
- Tidak ada respons hingga SLA → gagal `timeout`.

## Referensi Kode

- apps/app/src/app/api/knowledge/route.ts:19-29,32-44
- apps/app/src/shared/lib/openapi.ts:100-142

## Versi & Metadata Diagram

- Diagram BPMN: `workspace/04_Agent-Flows/bpmn/agent_interrupt_resume.bpmn`
- Versi: 1.0.0 — 2025-12-08
- Pemilik: lead@sba — Status: Draft
