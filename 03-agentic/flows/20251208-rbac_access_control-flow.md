---
id: 20251208-rbac_access_control-flow
title: RBAC Access Control — Flow
version: 1.0.0
created_at: 2025-12-08
last_modified: 2025-12-08
owner: lead@sba
author: lead@sba
reviewer: security@sba
approver: pm@sba
status: Draft
priority: P1
tags: [security, rbac]
related:
  - workspace/01_PRD/rbac_access_control.md
  - workspace/02_Architecture/diagrams/rbac_access_control-sequence.mmd
  - workspace/02_Architecture/diagrams/rbac_access_control-dataflow.mmd
  - workspace/02_Architecture/diagrams/rbac_access_control-component.mmd
  - apps/app/src/shared/lib/rbac.ts
  - apps/app/src/app/api/knowledge/route.ts
---

# Ikhtisar

- RBAC di App Router memeriksa peran dari sesi Supabase atau cookie test dan meng-gate akses API.

# State Machine

```mermaid
stateDiagram-v2
  [*] --> ResolveSession
  ResolveSession --> CheckRole: session_ok
  ResolveSession --> GateDenied: session_invalid
  CheckRole --> GateAllowed: role_allowed
  CheckRole --> GateDenied: role_denied
  GateAllowed --> Execute
  Execute --> [*]
  GateDenied --> [*]
```

# Decision Tree

```mermaid
flowchart TB
  A[Resolve session] --> B{Has cookie test or Supabase session?}
  B -->|Yes| C[Extract roles]
  B -->|No| D[Deny]
  C --> E{Authorized?}
  E -->|Yes| F[Allow]
  E -->|No| D
```

# Pipeline Trigger → Reason → Act

```mermaid
sequenceDiagram
participant Client
participant API
Client->>API: Request
API->>API: Resolve session
API->>API: Reason (policy)
API->>API: Act: allow/deny
API->>Client: Response
```

# Input Processing

- Header dan cookies, validasi awal identitas.

# Parsing & Perception

- Ekstraksi role dari sesi/cookie; persepsi resource dan action.

# Reasoning

- Evaluasi kebijakan role-permission per resource/action.

# Execution

- Gate request; teruskan ke handler atau kembalikan error.

# Output Validation

- Pastikan error terstandar; audit-denied dicatat.

# Logging

- Event: RBAC_RESOLVED, RBAC_ALLOWED, RBAC_DENIED.
- Metadata: `requestId`, `x-tenant-id`, `roles`, `resource`, `action`.

# Lifecycle Testing

- Sesi valid tapi role tidak sesuai → denied.
- Cookie test dengan peran admin → allowed.

# Integrasi

- Wrapper `withRBAC` di App Router API.

## Referensi Kode

- apps/app/src/app/api/knowledge/route.ts:16-18,41-44
