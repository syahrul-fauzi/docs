## 03_architecture-mapping.md — Package ↔ Responsibility

Dokumen ini memetakan setiap lapisan arsitektur SBA-Agentic ke paket-paket yang bertanggung jawab, serta menjelaskan peran masing-masing dan aturan penting dalam interaksi sistem.

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
