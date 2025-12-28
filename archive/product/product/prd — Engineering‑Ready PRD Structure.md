# docs/product/prd — Engineering‑Ready PRD Structure

Dokumen ini adalah hasil **breakdown PRD SBA‑Agentic** menjadi artefak yang siap digunakan langsung oleh:

- Engineering (backend, frontend, agent)
- AI Agent Builder
- Architecture & Governance

---

## Struktur Folder Final

```
docs/product/prd/
├─ 00_context.md
├─ 01_agents-and-capabilities.md
├─ 02_use-cases-and-flows.md
├─ 03_architecture-mapping.md
├─ 04_events-and-contracts.md
├─ 05_non-functional-requirements.md
└─ 06_acceptance-criteria.md
```

Dokumen induk ini berfungsi sebagai **index + guidance**.

---

## 00_context.md — Product & System Context

**Tujuan**

- Menjadi shared mental model untuk semua role
- Menghindari perbedaan interpretasi produk & agent

**Isi utama**

- Visi SBA‑Agentic sebagai _Business OS berbasis Agent_
- Masalah organisasi (knowledge fragmentation, rigid automation)
- Prinsip inti:
  - Agentic > Rule‑based
  - Event > Request
  - Observability by default
  - Multi‑tenant first

**Output engineering**

- Boundary konteks agent
- Constraint awal desain sistem

---

## 01_agents-and-capabilities.md — Agent Blueprint

**Agent Taxonomy**

| Agent Type     | Responsibility      | Package Anchor        |
| -------------- | ------------------- | --------------------- |
| Planner Agent  | Task decomposition  | `agentic-reasoning`   |
| Executor Agent | Tool execution      | `packages/tools`      |
| Reviewer Agent | Validation & safety | `agentic-meta-events` |
| Observer Agent | Telemetry & audit   | `observability`       |

**Capability Model**

```
Capability
 ├─ read_knowledge (CMS)
 ├─ execute_tool (Rube)
 ├─ emit_event
 ├─ request_human_approval
 └─ write_memory
```

**Design rule**

> Agent **tidak boleh** mengakses database atau API langsung tanpa tool contract.

---

## 02_use-cases-and-flows.md — Agentic Flows

Setiap use‑case ditulis dalam format:

1. Trigger (UI / Event / Schedule)
2. Agent reasoning step
3. Tool invocation (via Rube)
4. Event emission
5. UI feedback (AG‑UI)
6. Audit & replay

**Contoh ringkas**

```
User → AG‑UI
 → Planner Agent
 → CMS (read SOP)
 → Rube Tool: create_task
 → Executor Agent
 → Event: task.created
 → Observer Agent
 → Dashboard update
```

---

## 03_architecture-mapping.md — Package ↔ Responsibility

**Mapping utama**

| Layer         | Package                      | Responsibility           |
| ------------- | ---------------------------- | ------------------------ |
| UI            | `agui-client`, `ui`          | Agentic interaction      |
| Agent Core    | `agentic-reasoning`          | Planning & reasoning     |
| Tool Hub      | `tools`, `integrations`      | Action execution         |
| Knowledge     | `cms`                        | SOP & structured content |
| Event         | `agentic-meta-events`        | Decision trace           |
| Observability | `telemetry`, `observability` | Metrics & replay         |

**Rule penting**

> UI tidak pernah memanggil tools langsung — selalu via agent.

---

## 04_events-and-contracts.md — System Contracts

**Event Schema Minimum**

```ts
AgentEvent {
  id
  tenantId
  agentId
  type
  inputContext
  decisionSummary
  toolsUsed[]
  timestamp
}
```

**Contract Types**

- Command
- Event
- Tool Manifest
- Capability Matrix

Semua contract **versioned & tenant‑scoped**.

---

## 05_non-functional-requirements.md — Quality & Governance

**Security**

- Tenant isolation
- Tool permission matrix
- Secret never visible to agent

**Reliability**

- Idempotent tools
- Retry via event replay

**Compliance**

- PDP: data minimization
- SOC‑like: audit trail
- ISO‑like: change traceability

---

## 06_acceptance-criteria.md — Definition of Done

SBA‑Agentic dianggap valid jika:

- Semua agent action dapat direplay
- Semua keputusan agent menghasilkan event
- Tidak ada tool yang dipanggil tanpa contract
- CMS content bisa ditelusuri ke keputusan agent
- UI dapat menjelaskan _why_ bukan hanya _what_

---

## Status

✅ PRD sudah diturunkan ke level **engineering‑ready**

Next recommended step:
→ Turunkan **01_agents-and-capabilities.md** menjadi **Agent Implementation Spec** per package.
