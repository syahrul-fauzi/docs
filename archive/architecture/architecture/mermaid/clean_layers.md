---
title: Komponen — Clean Architecture Layering
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [component, architecture]
---

```mermaid
flowchart TB
  P[Presentation]
  A[Application]
  D[Domain]
  I[Infrastructure]

  P --> A
  A --> D
  A --> I
  I --> D

  subgraph Cross-Cutting
    C1[Auth/RBAC]
    C2[Validation]
    C3[Rate Limit]
    C4[Idempotency]
    C5[Logging/Tracing/Metrics]
    C6[Error Taxonomy]
    C7[CacheAdapter]
  end

  P --- C1
  A --- C2
  I --- C3
  A --- C4
  A --- C7
  P --- C5
  A --- C6
```
