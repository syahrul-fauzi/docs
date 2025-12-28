---
id: 20251208-multimodal_messages-flow
title: Multimodal Messages — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: qa@sba
approver: pm@sba
status: Draft
priority: P2
tags: [agentic, ux, multimodal]
related:
  - workspace/01_PRD/multimodal_messages.md
  - workspace/02_Architecture/diagrams/multimodal_messages-sequence.mmd
  - workspace/02_Architecture/diagrams/multimodal_messages-dataflow.mmd
  - workspace/02_Architecture/diagrams/multimodal_messages-component.mmd
  - workspace/04_Agent-Flows/bpmn/multimodal_messages.bpmn
---

# Ikhtisar

- Dukungan input teks, gambar, audio, file dengan kompatibilitas UI dan degradasi yang aman.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> AwaitInput
  AwaitInput --> ParsingModalities: input_received
  ParsingModalities --> Reasoning: parsed_ok
  ParsingModalities --> Failed: parse_error
  Reasoning --> ActTools: decision_ready
  ActTools --> Validating: tool_result
  Validating --> Completed: valid
  Validating --> Failed: invalid
  Completed --> [*]
  Failed --> [*]
```

# Decision Tree

```mermaid
flowchart LR
  A{Modality} --> B[Text]
  A --> C[Image]
  A --> D[Audio]
  A --> E[File]
  B --> F[NER/intent]
  C --> G[OCR/Vision tags]
  D --> H[ASR/transcript]
  E --> I[Type/size validation]
  F --> J[Route tools]
  G --> J
  H --> J
  I --> J
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant UI
participant Agent
UI->>Agent: Submit multimodal payload
Agent->>Agent: Parse & perceive
Agent->>Agent: Reason (intent + constraints)
Agent->>External: Act: call tools/services
Agent->>UI: Outputs + validation
```

# Input Processing

- Kanal: form/chat upload, API.
- Validasi awal: ukuran/tipe file, schema konten, RBAC.

# Parsing & Perception

- Ekstraksi entitas, OCR/ASR untuk modalitas non-teks.
- Persepsi konteks: thread/run/session.

# Reasoning

- Intent extraction dan pemilihan tools.
- Guard-rails privasi & keamanan konten.

# Execution

- Orkestrasi pipeline OCR/ASR/vision dan tools domain.
- Manajemen sumber daya: quota, timeout, concurrency.

# Output Validation

- Verifikasi struktur hasil dan kesesuaian tujuan.
- Penanganan kesalahan: `unsupported_modality`, `size_exceeded`, `parse_error`.

# Logging

- Event: INPUT_RECEIVED, PARSED, TOOL_CALL_REQUESTED, TOOL_CALL_RESULT, RUN_FINISHED.
- Metadata wajib: `requestId`, `x-tenant-id`, `modality`, `sizeBytes`, `toolCallId`.

# Lifecycle Testing

- Setiap modalitas: happy-path dan error-path.
- Verifikasi guard RBAC dan rate limit.

# Integrasi

- UI App Router dan endpoint API konsisten; metrics dan tenant label aktif.

# Test Cases & Skenario

- Gambar besar melebihi batas → ditolak.
- Audio tanpa transkrip → fallback.
- File tipe tak didukung → error `unsupported_modality`.

## Versi & Metadata Diagram

- Diagram BPMN: `workspace/04_Agent-Flows/bpmn/multimodal_messages.bpmn`
- Versi: 1.0.0 — 2025-12-08
- Pemilik: lead@sba — Status: Draft
