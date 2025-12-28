## 01_agents-and-capabilities.md — Agent Blueprint

Dokumen ini menjelaskan taksonomi agen, model kapabilitas, dan aturan desain inti untuk SBA-Agentic, memastikan pemahaman yang jelas tentang peran dan interaksi agen dalam sistem.

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
