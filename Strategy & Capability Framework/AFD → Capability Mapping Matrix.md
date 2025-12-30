---
id: sba.strategy.afd-capability-mapping-matrix
version: 1.0.0
author: Super Agent
status: active
scope: global
tags: [strategy, mapping, afd, control-plane]
---

# AFD → Capability Mapping Matrix
**Deterministic Intent-to-Execution Contract — SBA**

Dokumen ini adalah **pengunci deterministik** antara:
> **Intent (apa maksudnya)** → **Capability (apa yang boleh & bisa dilakukan)**

Matrix ini berfungsi sebagai **jembatan resmi** antara:
- **Agentic Front Door (AFD)**
- **Control Plane**
- **Agent Runtime**

Tanpa matrix ini, sistem akan kembali ke *soft-routing berbasis prompt*. Dengan matrix ini, SBA menjadi **policy-driven execution system**.

---

## 1. Tujuan Dokumen
Menjawab pertanyaan sistem:
> ❓ *Untuk intent X, capability apa yang secara eksplisit DIIZINKAN untuk dipakai?*

Digunakan oleh:
| Komponen | Fungsi |
| :--- | :--- |
| **AFD** | mengeksekusi sinyal intent |
| **Control Plane** | select & validate capability |
| **Policy Engine** | enforce tenant & risk |
| **Agent Runtime** | load adapter yang tepat |
| **Audit** | explainability |

---

## 2. Prinsip Desain (WAJIB)
1. **Explicit allow-list**
2. **Deterministic**
3. **Policy-gated**
4. **Multi-capability aware**
5. **Backward compatible**
6. **Audit-first**

---

## 3. Struktur Global Matrix (YAML)
```yaml
matrixVersion: "2025.1"
generatedAt: "2025-01-15T00:00:00Z"

mappings:
  - intent: marketing.lead.capture
    allowedCapabilities:
      - marketing.capture-lead
      - marketing.enrich-lead
```

---

## 4. Struktur Mapping Spec (Standar)
```yaml
intent: <intent.id>

allowedCapabilities:
  - <capability.id>

priorityOrder:
  - <capability.id>

fallback:
  onPolicyDeny:
    - <capability.id>
  onUnavailable:
    - <capability.id>

constraints:
  maxExecutionCount: 1
  requiresConfirmation: true | false
  cooldownSeconds: 0

riskProfile:
  maxAllowedRisk: low | medium | high
  escalationPath:
    - <capability.id>
```

---

## 5. Example 1 — Marketing Lead Capture
```yaml
intent: marketing.lead.capture

allowedCapabilities:
  - marketing.capture-lead
  - marketing.enrich-lead

priorityOrder:
  - marketing.capture-lead
  - marketing.enrich-lead

fallback:
  onPolicyDeny:
    - docs.show-contact-info
  onUnavailable:
    - docs.search-pricing

constraints:
  maxExecutionCount: 1
  requiresConfirmation: true
  cooldownSeconds: 86400

riskProfile:
  maxAllowedRisk: low
```

---

## 6. Example 2 — Docs How-To Search
```yaml
intent: docs.search.how_to

allowedCapabilities:
  - docs.search-knowledge
  - agent.explain

priorityOrder:
  - docs.search-knowledge
  - agent.explain

fallback:
  onPolicyDeny:
    - docs.search-knowledge
  onUnavailable:
    - docs.show-sitemap

constraints:
  maxExecutionCount: 3
  requiresConfirmation: false
  cooldownSeconds: 0

riskProfile:
  maxAllowedRisk: medium
```

---

## 7. Example 3 — Ops Health Check
```yaml
intent: ops.system.health_check

allowedCapabilities:
  - ops.health-check
  - ops.generate-report

priorityOrder:
  - ops.health-check
  - ops.generate-report

constraints:
  maxExecutionCount: 1
  requiresConfirmation: false
  cooldownSeconds: 300

riskProfile:
  maxAllowedRisk: high
```

---

## 8. Control Plane Resolution Algorithm (Ringkas)
1. Receive intent from AFD
2. Load mapping by `intent.id`
3. Filter `allowedCapabilities` by:
   - tenant policy
   - risk level
   - capability availability
4. Apply `priorityOrder`
5. Apply `constraints`
6. Select capability
7. Dispatch execution plan

---

## 9. Validation Rules (Hard Fail)
Mapping **INVALID** jika:
- intent tidak terdaftar di Intent Registry
- capability tidak ada di Capability Registry
- `priorityOrder` ⊄ `allowedCapabilities`
- fallback capability tidak valid
- `riskProfile` tidak cocok

---

## 10. Relationship dengan Policy Engine
Matrix **tidak override policy**.
```text
Intent
 → Mapping Matrix
   → Policy Engine
     → Capability Registry
       → Execution Plan
```
Jika policy deny → fallback atau terminate.

---

## 11. File Layout (Disarankan)
```text
packages/control-plane/registry
├── intents.yaml
├── capabilities.yaml
├── intent-capability-matrix.yaml   # <-- THIS FILE
├── policies.yaml
```

---

## 12. Observability & Audit Fields (Generated)
Setiap eksekusi akan menghasilkan:
```json
{
  "intent": "marketing.lead.capture",
  "selectedCapability": "marketing.capture-lead",
  "policyDecision": "allow",
  "fallbackUsed": false,
  "confidence": 0.82,
  "tenant": "acme-id"
}
```

---

## 13. Dampak Strategis ke SBA
- ✔ Tidak ada “agent bebas memilih”
- ✔ Semua eksekusi bisa dijelaskan
- ✔ Multi-tenant aman
- ✔ Mudah compliance & audit
- ✔ Agentic Front Door jadi *production-grade*

---

## 14. Hubungan dengan apps/marketing (AFD)
`apps/marketing`:
- ❌ tidak memilih capability
- ❌ tidak tahu policy
- ✅ hanya mengirim intent + context
- ✅ menerima response plan

---

## 15. Next Step yang Konsisten
Setelah Matrix ini, **Control Plane belum lengkap tanpa**:
👉 **Policy Enforcement Spec — Capability × Tenant × Risk**

Itulah lapisan terakhir sebelum runtime eksekusi agent.

Jika Anda setuju, saya lanjutkan ke spesifikasi tersebut.
