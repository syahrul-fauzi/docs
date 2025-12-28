---
id: 20251208-analytics_heatmap-flow
title: Analytics Heatmap — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: qa@sba
approver: pm@sba
status: Review
priority: P2
tags: [analytics, ux]
related:
  - workspace/01_PRD/analytics_heatmap.md
  - workspace/02_Architecture/diagrams/analytics_heatmap-sequence.mmd
  - workspace/02_Architecture/diagrams/analytics_heatmap-dataflow.mmd
  - workspace/02_Architecture/diagrams/analytics_heatmap-component.mmd
  - apps/app/src/app/api/analytics/heatmap/route.ts
---

# Ikhtisar

- Pelacakan klik UI → buffer → POST `/api/analytics/heatmap` dengan label tenant dan kontrol privasi.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> Collecting
  Collecting --> Buffering: click_event
  Buffering --> Posting: flush_timer
  Posting --> Validating: response
  Validating --> Completed: ok
  Validating --> Failed: error
  Completed --> [*]
  Failed --> [*]
```

# Decision Tree

```mermaid
flowchart TB
  A[Click captured] --> B{Should buffer?}
  B -->|Yes| C[Add to buffer]
  B -->|No| D[Immediate POST]
  C --> E{Flush condition}
  E -->|Count| F[POST]
  E -->|Timer| F
  F --> G[Validate response]
  G -->|OK| H[Clear buffer]
  G -->|Error| I[Retry/backoff]
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant UI
participant API
UI->>UI: Trigger buffer/flush
UI->>API: Act: POST heatmap
API->>UI: Validate/ack
UI->>UI: Log + metrics
```

# Input Processing

- Kanal: UI event handler.
- Validasi awal: schema event, anonymization, RBAC jika diperlukan.

# Parsing & Perception

- Normalisasi atribut: selector, viewport, timestamp.
- Persepsi: tenant, session, rate-limit state.

# Reasoning

- Keputusan buffer vs immediate, threshold, dan kebijakan privasi.

# Execution

- POST dengan retry/backoff; manajemen quota dan timeout.

# Output Validation

- Periksa ack, ukuran, dan status; kategorisasi kesalahan `rate_limited`, `invalid_payload`.

# Logging

- Event: CLICK_CAPTURED, BUFFERED, POST_REQUESTED, POST_ACKED, POST_FAILED.
- Metadata wajib: `requestId`, `x-tenant-id`, `selector`, `count`, `batchId`.

# Lifecycle Testing

- Flush by count/timer; error rate-limit; validasi anonymization.

# Integrasi

- Endpoint App Router dibungkus `withMetrics`; label tenant wajib.

# Test Cases & Skenario

- Beban tinggi → rate limit → retry dengan backoff.
- Data tanpa `x-tenant-id` → ditolak.
