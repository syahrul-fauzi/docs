**Capability Registry YAML** sebagai **Control Plane Source of Truth** dengan **level enterprise / production**, selaras penuh dengan:

* Agentic Front Door (AFD)
* Control Plane (routing + policy)
* Agent Runtime (execution-only)
* Multi-tenant SaaS SBA
* Compliance & observability-first

Ini **bukan config biasa**, tapi **kontrak sistem global SBA**.

---

# Capability Registry YAML

**Control Plane — Source of Truth**

---

## 1. Tujuan Capability Registry

Capability Registry adalah **dokumen otoritatif** yang menjawab:

> ❓ *Agent boleh melakukan apa, untuk siapa, dengan risiko apa, dan lewat adapter mana?*

Registry ini dipakai oleh:

| Komponen      | Peran                       |
| ------------- | --------------------------- |
| Control Plane | routing, policy enforcement |
| Security      | capability boundary         |
| Product       | packaging & monetisasi      |
| Agent Runtime | load adapter                |
| Audit         | trace & compliance          |

---

## 2. Prinsip Desain (WAJIB)

1. **Declarative**
2. **Deterministic**
3. **Tenant-aware**
4. **Versioned**
5. **Auditable**
6. **Language-agnostic** (YAML → TS → UI)

---

## 3. Struktur Global Registry

```yaml
registryVersion: "2025.1"
generatedAt: "2025-01-15T00:00:00Z"

capabilities:
  - id: marketing.capture-lead
  - id: marketing.enrich-lead
  - id: ops.health-check
  - id: workflow.approval_request
  - id: workflow.task_create
  - id: docs.search-knowledge
  - id: ai.context_summarize
  - id: sales.get-pricing
  - id: sales.order-tracking
  - id: observability.emit-audit
```

➡️ **Registry hanya mendeskripsikan**, tidak mengimplementasikan.

---

## 4. Capability Spec (Lengkap)

### 4.1 Template Capability (Standar)

```yaml
id: <global.capability.id>
name: <Human readable name>
domain: <marketing | docs | ops | finance | core>
version: <semver>

description: >
  Short but explicit description of what this capability does.

owner:
  team: <team-name>
  contact: <email or slack>

adapter:
  runtime: node
  entrypoint: packages/capabilities/<domain>/<name>/adapter.ts
  class: <AdapterClassName>

contracts:
  inputSchema: packages/capabilities/<domain>/<name>/schema.ts#Input
  outputSchema: packages/capabilities/<domain>/<name>/schema.ts#Output
```

---

## 5. Policy & Risk Section (KUNCI)

```yaml
policy:
  riskLevel: low | medium | high | critical

  tenant:
    allowedPlans: [trial, pro, enterprise]
    deniedTenants: []

  consent:
    required: false
    category: marketing | analytics | ops

  dataAccess:
    reads:
      - email
      - company
    writes:
      - crm.leads

  rateLimit:
    maxPerMinute: 60

  audit:
    required: true
    retentionDays: 365
```

➡️ **Agent Runtime tidak baca ini**
➡️ **Control Plane WAJIB baca ini**

---

## 6. Routing Hint (Control Plane)

```yaml
routing:
  intent:
    primary:
      - lead_capture
      - contact_sales
    confidenceThreshold: 0.75

  channels:
    allowed:
      - web
      - api
      - chat

  execution:
    mode: synchronous | async
    timeoutMs: 3000
```

➡️ Membantu Control Plane **memilih capability secara deterministik**

---

## 7. Observability Contract

```yaml
observability:
  emitsEvents:
    - marketing.lead.captured
    - marketing.lead.duplicate

  metrics:
    - name: lead_capture_success
      type: counter

    - name: lead_capture_latency
      type: histogram
```

---

## 8. Dependency Declaration (Aman & Explisit)

```yaml
dependencies:
  internal:
    - crm.lead-service
    - telemetry.event-bus

  external:
    - name: hubspot
      optional: true
```

➡️ Tidak ada dependency tersembunyi

---

## 9. Example 1 — `marketing.capture-lead`

```yaml
id: marketing.capture-lead
name: Capture Lead
domain: marketing
version: 1.0.0

description: >
  Captures inbound leads from Agentic Front Door and emits agent signals.

owner:
  team: growth
  contact: growth@sba.ai

adapter:
  runtime: node
  entrypoint: packages/capabilities/marketing/capture-lead/adapter.ts
  class: CaptureLeadAdapter

contracts:
  inputSchema: packages/capabilities/marketing/capture-lead/schema.ts#CaptureLeadInput
  outputSchema: packages/capabilities/marketing/capture-lead/schema.ts#CaptureLeadOutput

policy:
  riskLevel: low

  tenant:
    allowedPlans: [trial, pro, enterprise]

  consent:
    required: true
    category: marketing

  dataAccess:
    reads: [email, company]
    writes: [crm.leads]

  rateLimit:
    maxPerMinute: 30

  audit:
    required: true
    retentionDays: 365

routing:
  intent:
    primary: [lead_capture, pricing_interest]
    confidenceThreshold: 0.7

  channels:
    allowed: [web]

  execution:
    mode: synchronous
    timeoutMs: 2000

observability:
  emitsEvents:
    - marketing.lead.captured
    - marketing.lead.duplicate

dependencies:
  internal:
    - crm.lead-service
    - observability.event-bus
```

---

## 10. Example 2 — `docs.search-knowledge`

```yaml
id: docs.search-knowledge
name: Search Knowledge Base
domain: docs
version: 1.1.0

description: >
  Search SBA Docs as a single source of truth.

adapter:
  runtime: node
  entrypoint: packages/capabilities/docs/search-knowledge/adapter.ts
  class: SearchKnowledgeAdapter

contracts:
  inputSchema: packages/capabilities/docs/search-knowledge/schema.ts#SearchInput
  outputSchema: packages/capabilities/docs/search-knowledge/schema.ts#SearchOutput

policy:
  riskLevel: medium

  tenant:
    allowedPlans: [pro, enterprise]

  dataAccess:
    reads: [docs.content]

  audit:
    required: true
    retentionDays: 730

routing:
  intent:
    primary: [how_to, faq, sop_lookup]

observability:
  emitsEvents:
    - docs.search.executed
```

---

## 11. Registry File Layout (Disarankan)

```txt
packages/control-plane/registry
├── capabilities.yaml
├── intents.yaml
├── policies.yaml
└── tenants.yaml
```

➡️ **capabilities.yaml hanya soal capability**

---

## 12. Control Plane Validation Rules

Registry **TIDAK BOLEH** lolos jika:

* duplicate `id`
* missing schema
* capability tanpa policy
* capability tanpa audit pada `medium+ risk`
* adapter tidak ditemukan

---

## 13. Generated Artifacts (Dari YAML)

Registry ini **di-compile** menjadi:

1. TypeScript registry
2. Control Plane routing table
3. Admin Console capability UI
4. Policy enforcement rules
5. Test simulation harness

---

## 14. Nilai Strategis untuk SBA

Dengan registry ini:

* Capability = **unit governance**
* Bisa:

  * diaktifkan per tenant
  * dimonetisasi
  * diaudit
  * disimulasikan
* AFD, Agent, Docs, Ops **satu bahasa**

---

## 15. Langkah Logis Berikutnya

Paling strategis setelah ini:

1. **Intent Registry YAML (Global SBA)**
2. **Tenant Feature Matrix YAML**
3. **Capability Versioning & Deprecation Policy**
4. **Control Plane Registry Compiler (YAML → TS)**

Jika Anda mau, saya sarankan langsung lanjut ke **Intent Registry YAML** karena itu fondasi routing berikutnya.

Tinggal jawab:
👉 **lanjut ke Intent Registry YAML** atau yang lain.
