**Intent Registry YAML (Global SBA)** sebagai **fondasi semantik global** untuk seluruh sistem **SBA-Agentic**, dengan standar **production-grade**, **policy-aware**, dan **deterministic routing–ready**.

Dokumen ini **lebih fundamental dari capability**.
Kalau Capability = *“apa yang bisa dieksekusi”*,
maka **Intent = “apa maksud user / sistem”**.

---

# Intent Registry YAML

**Global Semantic Source of Truth — SBA**

---

## 1. Tujuan Intent Registry

Intent Registry menjawab pertanyaan inti sistem agentik:

> ❓ *Apa maksud dari sebuah interaksi, dan bagaimana sistem harus mengklasifikasikannya secara konsisten?*

Digunakan oleh:

| Komponen           | Peran              |
| ------------------ | ------------------ |
| Agentic Front Door | classify intent    |
| Control Plane      | routing decision   |
| Agent Runtime      | context awareness  |
| Docs               | intent ↔ knowledge |
| Analytics          | funnel & behavior  |
| Policy Engine      | risk & consent     |

---

## 2. Prinsip Desain (WAJIB)

1. **Global & Stable**
2. **Hierarchical**
3. **Domain-aware**
4. **Non-overlapping**
5. **Extensible (tanpa breaking)**
6. **Language-agnostic**
7. **LLM-friendly, tapi deterministic**

---

## 3. Struktur Global Registry

```yaml
registryVersion: "2025.1"
generatedAt: "2025-01-15T00:00:00Z"

intents:
  - id: marketing.lead.capture
  - id: docs.search.how_to
  - id: ops.system.health_check
```

---

## 4. Struktur Intent Spec (Standar)

```yaml
id: <domain>.<category>.<action>
name: <Human readable name>
domain: <marketing | docs | ops | finance | core>

description: >
  Clear description of user/system intent.

classification:
  type: user | system | agent
  priority: low | medium | high | critical
  confidenceRequired: 0.0 - 1.0

signals:
  sources:
    - web
    - api
    - agent
  triggers:
    - cta_click
    - text_input
    - api_call

examples:
  positive:
    - "I want to talk to sales"
  negative:
    - "How does pricing work?"

routingHints:
  preferredCapabilities:
    - marketing.capture-lead
  fallbackCapabilities:
    - docs.search-knowledge

policyHints:
  riskLevel: low | medium | high
  consentCategory: marketing | analytics | ops | none
```

---

## 5. Domain Intent Taxonomy (Global)

```txt
marketing
├── awareness
├── interest
├── consideration
├── conversion
├── retention

docs
├── search
├── how_to
├── sop
├── troubleshooting

ops
├── system
├── audit
├── incident

core
├── auth
├── routing
├── configuration
```

---

## 6. Example 1 — Marketing Lead Capture

```yaml
id: marketing.lead.capture
name: Capture Sales Lead
domain: marketing

description: >
  User expresses intent to contact sales or request pricing follow-up.

classification:
  type: user
  priority: high
  confidenceRequired: 0.7

signals:
  sources: [web, chat]
  triggers: [cta_click, form_submit, text_input]

examples:
  positive:
    - "Contact sales"
    - "I want a demo"
    - "Talk to someone"
  negative:
    - "How much does it cost?"
    - "Read pricing details"

routingHints:
  preferredCapabilities:
    - marketing.capture-lead
  fallbackCapabilities:
    - docs.search-pricing

policyHints:
  riskLevel: low
  consentCategory: marketing
```

---

## 7. Example 2 — Docs Search (How-To)

```yaml
id: docs.search.how_to
name: Search How-To Documentation
domain: docs

description: >
  User is looking for instructions or guidance.

classification:
  type: user
  priority: medium
  confidenceRequired: 0.6

signals:
  sources: [web, chat, agent]
  triggers: [text_input]

examples:
  positive:
    - "How to integrate SBA?"
    - "Steps to setup webhook"
  negative:
    - "Contact support"
    - "Report a bug"

routingHints:
  preferredCapabilities:
    - docs.search-knowledge
  fallbackCapabilities:
    - agent.explain

policyHints:
  riskLevel: medium
  consentCategory: none
```

---

## 8. Example 3 — Ops Health Check (System Intent)

```yaml
id: ops.system.health_check
name: System Health Check
domain: ops

description: >
  System initiated intent to verify health and status.

classification:
  type: system
  priority: critical
  confidenceRequired: 1.0

signals:
  sources: [agent]
  triggers: [scheduled_task]

routingHints:
  preferredCapabilities:
    - ops.health-check

policyHints:
  riskLevel: high
  consentCategory: ops
```

---

## 9. Relationship: Intent → Capability (Non-Binding)

> ⚠️ Intent **TIDAK mengeksekusi capability langsung**

Intent hanya memberi **routing hint**.

```txt
Intent
 → Control Plane
   → Policy Evaluation
     → Capability Selection
```

---

## 10. Intent Versioning & Evolution

```yaml
versioning:
  strategy: additive_only
  deprecatedAfter: 12_months
  requiresMigration: false
```

Aturan:

* ❌ Tidak boleh rename `id`
* ✅ Boleh tambah intent baru
* ✅ Boleh tambah examples
* ❌ Tidak boleh ubah domain intent lama

---

## 11. File Layout (Disarankan)

```txt
packages/control-plane/registry
├── intents.yaml          # <-- THIS FILE
├── capabilities.yaml
├── policies.yaml
├── tenants.yaml
```

---

## 12. Control Plane Validation Rules

Registry **INVALID** jika:

* duplicate intent id
* confidenceRequired > 1
* intent tanpa domain
* intent tanpa routingHints
* overlap positive example lint

---

## 13. Generated Artifacts

Dari `intents.yaml`, sistem generate:

1. Intent classifier schema
2. LLM prompt grounding
3. Routing confidence model
4. UI intent inspector (Internal Console)
5. Replay & audit mapping

---

## 14. Nilai Strategis untuk SBA

Dengan Intent Registry:

* Semua tim **satu bahasa maksud**
* Marketing ≠ Sales ≠ Docs tapi **terhubung**
* Agentic Front Door jadi deterministic
* Bisa:

  * audit “kenapa agent bertindak”
  * replay keputusan
  * scale multi-tenant tanpa chaos

---

## 15. Next Logical Step

Setelah **Intent Registry**, fondasi lengkap bila dilanjutkan ke:

👉 **AFD → Capability Mapping Matrix**
(karena sekarang kita sudah punya: *Intent* + *Capability*)

Jika Anda setuju, saya akan buatkan **matrix formal (YAML + tabel konseptual)** sebagai pengunci sistem routing SBA.
