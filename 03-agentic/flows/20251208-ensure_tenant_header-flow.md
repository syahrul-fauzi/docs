---
id: 20251208-ensure_tenant_header-flow
title: Ensure Tenant Header — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: ops@sba
approver: pm@sba
status: Draft
priority: P2
tags: [observability]
related:
  - workspace/01_PRD/ensure_tenant_header.md
  - workspace/02_Architecture/diagrams/ensure_tenant_header-sequence.mmd
  - workspace/02_Architecture/diagrams/ensure_tenant_header-dataflow.mmd
  - workspace/02_Architecture/diagrams/ensure_tenant_header-component.mmd
  - apps/app/src/shared/metrics-registry.ts
  - apps/app/src/app/api/knowledge/route.ts
---

# Ikhtisar

- Memastikan `x-tenant-id` hadir untuk setiap request demi observability dan pemisahan metrik.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> InspectHeaders
  InspectHeaders --> InjectDefault: missing_but_default_available
  InspectHeaders --> Reject: missing_and_no_default
  InjectDefault --> Continue
  InspectHeaders --> Continue: present
  Continue --> [*]
  Reject --> [*]
```

# Decision Tree

```mermaid
flowchart LR
  A[Inspect headers] --> B{Has x-tenant-id?}
  B -->|Yes| C[Continue]
  B -->|No| D{Default configured?}
  D -->|Yes| E[Inject default]
  D -->|No| F[Reject]
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant Client
participant API
Client->>API: Request
API->>API: Inspect headers
API->>API: Reason (policy)
API->>API: Act: inject/reject
API->>Client: Response
```

# Input Processing

- Header inspeksi; validasi keberadaan.

# Parsing & Perception

- Persepsi konfigurasi default tenant dari env.

# Reasoning

- Kebijakan injeksi atau penolakan sesuai mode.

# Execution

- Inject nilai default atau kembalikan error.

# Output Validation

- Pastikan downstream menerima label; error terstandar bila penolakan.

# Logging

- Event: TENANT_HEADER_PRESENT, INJECTED_DEFAULT, TENANT_HEADER_MISSING.
- Metadata: `requestId`, `x-tenant-id` (setelah injeksi), `policy`.

# Lifecycle Testing

- Request tanpa header dengan default aktif → lanjut.
- Request tanpa header tanpa default → ditolak.

# Integrasi

- `ensureTenantHeader` wrapper dipakai sebelum `withMetrics`.

## Referensi Kode

- apps/app/src/app/api/knowledge/route.ts:38-40
