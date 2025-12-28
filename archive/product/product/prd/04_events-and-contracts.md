## 04_events-and-contracts.md — System Contracts

Dokumen ini mendefinisikan skema event minimum dan jenis kontrak yang digunakan dalam SBA-Agentic untuk memastikan komunikasi yang konsisten dan terstruktur antar komponen sistem.

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
