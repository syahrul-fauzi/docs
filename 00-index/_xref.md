---
title: WORKSPACE-XREF-V2
version: 2.0.0
created_at: 2025-12-06
last_modified: 2025-12-10
changelog:
  - 2025-12-06: initial
  - 2025-12-06: expanded frontmatter, schema, and responsibilities
owner: lead@sba
author: team@sba
reviewer: qa@sba
approver: pm@sba
status: Draft
priority: P2
domain: agentic-core
tags: [cross-ref, workspace]
masterplan_ref: docs/ROADMAP_GO_LIVE.md
links_count: 3
validation:
  schema: v1
  required_links: [prd, architecture, flows, api]
related: []
---

# Cross-Reference

- PRD ↔ Arsitektur ↔ Agent-Flows ↔ API.
- Tambahkan entri setiap kali membuat artefak baru.
- Gunakan penamaan `YYYYMMDD-<DESCRIPTOR>.md` dan keluarga diagram `*-sequence.mmd`, `*-component.mmd`, `*-dataflow.mmd`, `*-erd.mmd`.
- Terapkan RACI per entri: Owner, Reviewer, Approver, Observer.

Format:

```text
- [PRD] docs/01-product/prd/20251206-feature-x.md
  - [Arch] docs/02-architecture/20251206-seq-feature-x.md
  - [Flow] docs/03-agentic/flows/20251206-bpmn-feature-x.md
  - [API] docs/05-api/20251206-feature-x.md
```

## Items

```yaml
# XRefItem schema
- id: 20251206-agent_interrupt_resume
  title: Agent Interrupt & Resume
  summary: Siklus run sadar-interupsi dengan approval human dan resume payload
  status: Approved
  responsibility:
    owner: lead@sba
    reviewer: qa@sba
    approver: pm@sba
    observer: ops@sba
  tags: [agentic, lifecycle, approval]
  prd:
    - docs/01-product/prd/agent_interrupt_resume.md
  architecture:
    - docs/02-architecture/diagrams/agent_interrupt_resume-sequence.mmd
    - docs/02-architecture/adr/ADR-011.md
  flows:
    - docs/03-agentic/flows/bpmn/agent_interrupt_resume.bpmn
    - docs/03-agentic/flows/20251208-agent_interrupt_resume-flow.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  validation:
    has_prd: true
    has_arch: true
    has_flow: true
    has_api: false

- id: 20251206-multimodal_messages
  title: Multimodal Messages
  summary: Dukungan input teks, gambar, audio, file kompatibel dengan aplikasi
  status: Review
  responsibility:
    owner: lead@sba
    reviewer: qa@sba
    approver: pm@sba
    observer: app@sba
  tags: [agentic, ux, multimodal]
  prd:
    - docs/01-product/prd/multimodal_messages.md
  architecture:
    - docs/02-architecture/diagrams/multimodal_messages-sequence.mmd
    - docs/02-architecture/diagrams/multimodal_messages-dataflow.mmd
    - docs/02-architecture/diagrams/multimodal_messages-component.mmd
  flows:
    - docs/03-agentic/flows/_index.md
    - docs/03-agentic/flows/20251208-multimodal_messages-flow.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  validation:
    has_prd: true
    has_arch: true
    has_flow: true
    has_api: false

- id: 20251206-rate_limiting_upstash
  title: Rate Limiting Upstash
  summary: Pembatasan laju publik vs auth bucket dan whitelist internal
  status: Approved
  responsibility:
    owner: lead@sba
    reviewer: security@sba
    approver: pm@sba
    observer: ops@sba
  tags: [security, performance]
  prd:
    - docs/01-product/prd/rate_limiting_upstash.md
  architecture:
    - docs/02-architecture/diagrams/rate_limiting_upstash-sequence.mmd
    - docs/02-architecture/diagrams/rate_limiting_upstash-dataflow.mmd
    - docs/02-architecture/diagrams/rate_limiting_upstash-component.mmd
  flows:
    - docs/03-agentic/flows/_index.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  dependencies:
    - security_headers_csp
    - ensure_tenant_header
  validation:
    has_prd: true
    has_arch: true
    has_flow: false
    has_api: false

- id: 20251206-rbac_access_control
  title: RBAC Access Control
  summary: RBAC API dengan role dari sesi Supabase atau cookie test
  status: Approved
  responsibility:
    owner: lead@sba
    reviewer: security@sba
    approver: pm@sba
    observer: ops@sba
  tags: [security, rbac]
  prd:
    - docs/01-product/prd/rbac_access_control.md
  architecture:
    - docs/02-architecture/diagrams/rbac_access_control-sequence.mmd
    - docs/02-architecture/diagrams/rbac_access_control-dataflow.mmd
    - docs/02-architecture/diagrams/rbac_access_control-component.mmd
  flows:
    - docs/03-agentic/flows/_index.md
    - docs/03-agentic/flows/20251208-ensure_tenant_header-flow.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  dependencies:
    - supabase_client_factories
    - ensure_tenant_header
  validation:
    has_prd: true
    has_arch: true
    has_flow: true
    has_api: false

- id: 20251206-ensure_tenant_header
  title: Ensure Tenant Header
  summary: Memastikan label `x-tenant-id` untuk observability dan metrics
  status: Approved
  responsibility:
    owner: lead@sba
    reviewer: ops@sba
    approver: pm@sba
    observer: qa@sba
  tags: [observability]
  prd:
    - docs/01-product/prd/ensure_tenant_header.md
  architecture:
    - docs/02-architecture/diagrams/ensure_tenant_header-sequence.mmd
    - docs/02-architecture/diagrams/ensure_tenant_header-dataflow.mmd
    - docs/02-architecture/diagrams/ensure_tenant_header-component.mmd
  flows:
    - docs/03-agentic/flows/_index.md
    - docs/03-agentic/flows/20251208-analytics_heatmap-flow.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  dependencies:
    - withMetrics
  validation:
    has_prd: true
    has_arch: true
    has_flow: true
    has_api: false

- id: 20251206-supabase_client_factories
  title: Supabase Client Factories
  summary: Helper SSR & browser tanpa hardcode URL/key
  status: Approved
  responsibility:
    owner: lead@sba
    reviewer: app@sba
    approver: pm@sba
    observer: ops@sba
  tags: [integration, supabase]
  prd:
    - docs/01-product/prd/supabase_client_factories.md
  architecture:
    - docs/02-architecture/diagrams/supabase_client_factories-sequence.mmd
    - docs/02-architecture/diagrams/supabase_client_factories-dataflow.mmd
    - docs/02-architecture/diagrams/supabase_client_factories-component.mmd
  flows:
    - docs/03-agentic/flows/_index.md
  api:
    - docs/05-api/_templates/API-doc-template.md
  validation:
    has_prd: true
    has_arch: true
    has_flow: false
    has_api: false
```
