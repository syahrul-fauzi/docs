---
id: 20251208-knowledge_operations-flow
title: Knowledge Operations — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: qa@sba
approver: pm@sba
status: Draft
priority: P1
tags: [knowledge, api]
related:
  - workspace/05_API/knowledge-api.md
  - apps/app/src/app/api/knowledge/route.ts
  - apps/app/src/shared/lib/openapi.ts
  - workspace/04_Agent-Flows/bpmn/knowledge_operations.bpmn
---

# Ikhtisar

- Operasi pencarian, upsert, verify, vector-search dengan scoping tenant, RBAC, dan observability.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> ReceiveRequest
  ReceiveRequest --> ValidateSchema: schema_ok
  ReceiveRequest --> Failed: schema_invalid
  ValidateSchema --> RouteOp: route
  RouteOp --> Execute: search|upsert|verify|vector
  Execute --> Validate: result
  Validate --> Completed: ok
  Validate --> Failed: error
  Completed --> [*]
  Failed --> [*]
```

# Decision Tree

```mermaid
flowchart LR
  A{Operation} --> B[GET /api/knowledge]
  A --> C[POST /api/knowledge]
  A --> D[GET /api/knowledge/search]
  A --> E[POST /api/knowledge/vector-search]
  A --> F[POST /api/knowledge/upsert]
  A --> G[POST /api/knowledge/verify]
  B --> H[Paginate/filter]
  C --> I[Upsert single]
  D --> J[Text search]
  E --> K[Semantic search]
  F --> L[Batch upsert]
  G --> M[Content verify]
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant Client
participant API
Client->>API: Trigger request
API->>API: Parse + RBAC + tenant
API->>API: Reason (route + policies)
API->>Data: Act: query/write
API->>Client: Outputs + errors
```

# Input Processing

- Header wajib: `x-tenant-id`, `Authorization` bila non-test.
- Validasi awal: Zod/JSON Schema sesuai dokumen API.

# Parsing & Perception

- Normalisasi query/body; persepsi konteks tenant dan rate-limit.

# Reasoning

- Pilih operasi berdasarkan route; cek kebijakan RBAC dan kapasitas.

# Execution

- Query/Write ke storage/indeks; kelola idempotensi via `externalId`.

# Output Validation

- Verifikasi bentuk hasil dan kebijakan; kategori kesalahan standar.

# Logging

- Event: REQUEST_RECEIVED, VALIDATED, ROUTED, EXECUTED, RESPONDED.
- Metadata wajib: `requestId`, `x-tenant-id`, `op`, `page/pageSize`, `externalId`.

# Lifecycle Testing

- Happy-path tiap operasi; error-path (schema invalid, unauthorized, rate limited).

# Integrasi

- Konsisten dengan spesifikasi OpenAPI dan implementasi App Router.

# Test Cases & Skenario

- Upsert idempoten dengan `externalId` yang sama.
- Vector-search dengan `topK` dan metrik berbeda.

## Referensi Kode

- apps/app/src/app/api/knowledge/route.ts:19-29,32-44
- apps/app/src/shared/lib/openapi.ts:100-142

## Versi & Metadata Diagram

- Diagram BPMN: `workspace/04_Agent-Flows/bpmn/knowledge_operations.bpmn`
- Versi: 1.0.0 — 2025-12-08
- Pemilik: lead@sba — Status: Draft
