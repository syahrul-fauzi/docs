---
id: sba.strategy.policy-enforcement-spec
version: 1.0.0
author: Super Agent
status: active
scope: global
tags: [strategy, policy, governance, risk, control-plane]
---

# Policy Enforcement Spec
## Capability × Tenant × Risk
**Deterministic Governance Layer — SBA-Agentic**

Dokumen ini adalah **lapisan otoritas final** sebelum agent melakukan *real execution*. Ini merupakan **garis batas kekuasaan** dalam SBA-Agentic untuk memastikan tidak ada eksekusi tanpa izin eksplisit.

Tanpa dokumen ini:
- Agent bisa “terlalu pintar”
- Marketing bisa “terlalu agresif”
- Tenant bisa “tidak terlindungi”
- Audit & compliance runtuh

---

## 1. Tujuan Utama
Menentukan **APAKAH** suatu capability:
> ✅ **BOLEH** | ❌ **DITOLAK** | ⚠️ **DI-DEGRADE / DI-ESCALATE**

berdasarkan **3 dimensi wajib**:
```text
Capability  ×  Tenant Context  ×  Risk Profile
```

Spec ini digunakan oleh:
- Control Plane
- Policy Engine
- Audit / Compliance
- Agent Runtime Guard

---

## 2. Prinsip Inti (TIDAK BOLEH DILANGGAR)
1. **Policy-first execution**
2. **Explicit deny > implicit allow**
3. **Tenant-aware**
4. **Risk-bounded**
5. **Deterministic**
6. **Explainable**

---

## 3. Dimensi Kebijakan (3-Axis Model)

### 3.1 Capability Dimension
Setiap capability memiliki metadata kebijakan bawaan:
```yaml
capability: marketing.capture-lead
category: marketing
riskLevel: low
dataSensitivity: pii
sideEffect: write
requiresConsent: true
```

### 3.2 Tenant Dimension
Tenant membawa konteks operasional:
```yaml
tenant:
  id: acme-id
  tier: enterprise | smb | free
  industry: finance | retail | healthcare
  region: id | eu | us
  compliance:
    - PDP
    - ISO27001
  enabledCapabilities:
    - marketing.capture-lead
    - docs.search-knowledge
```

### 3.3 Risk Dimension
Risk adalah *computed context* (bukan input manual):
```yaml
riskContext:
  intentConfidence: 0.92
  userAuthLevel: authenticated | anonymous | admin
  dataScope: public | internal | pii | sensitive
  frequency: normal | burst | abuse
  channel: web | api | agent
```

---

## 4. Policy Decision Outcomes

| Decision | Makna |
| :--- | :--- |
| **allow** | dieksekusi normal |
| **deny** | ditolak keras |
| **degrade** | fallback capability |
| **require_confirmation** | user approval |
| **escalate** | manual / higher agent |

---

## 5. Policy Rule Structure (YAML)
```yaml
policyId: marketing-lead-pdp-id

match:
  capability: marketing.capture-lead
  tenant.region: id
  tenant.compliance: PDP

conditions:
  risk.dataScope: pii
  risk.userAuthLevel: authenticated

decision: allow

constraints:
  maxFrequencyPerDay: 1
  requireConsent: true
  logLevel: audit
```

---

## 6. Example Policy — Indonesia PDP Compliance
```yaml
policyId: id-pdp-lead-capture

match:
  capability: marketing.capture-lead
  tenant.region: id

conditions:
  risk.dataScope: pii

decision: require_confirmation

constraints:
  consentType: explicit
  retentionDays: 365
  auditTrail: mandatory
```

---

## 7. Example Policy — Free Tier Restriction
```yaml
policyId: free-tier-block-enrich

match:
  capability: marketing.enrich-lead
  tenant.tier: free

decision: deny

reason: "Lead enrichment not allowed for free tier"
```

---

## 8. Example Policy — Abuse Detection
```yaml
policyId: burst-abuse-protection

match:
  capability: marketing.capture-lead

conditions:
  risk.frequency: burst

decision: degrade

fallbackCapability: docs.show-contact-info
```

---

## 9. Enforcement Algorithm (Control Plane)
1. Load capability metadata
2. Load tenant policy set
3. Compute `riskContext`
4. Match applicable policies
5. Sort by priority
6. Apply first decisive rule
7. Emit decision + reason

---

## 10. Priority Resolution Rules
1. `deny` > `allow`
2. tenant-specific > global
3. compliance > business
4. higher risk > lower risk
5. newer policy > older (versioned)

---

## 11. Runtime Guard (Agent Side)
Agent **WAJIB** memverifikasi execution token:
```typescript
interface ExecutionPermit {
  capability: string;
  decision: 'allow' | 'deny' | 'degrade';
  constraints: Record<string, any>;
  expiresAt: string;
  policyHash: string;
}
```
Tanpa permit valid → **agent MUST FAIL HARD**.

---

## 12. Audit & Explainability Record
```json
{
  "capability": "marketing.capture-lead",
  "tenant": "acme-id",
  "riskScore": 0.23,
  "decision": "require_confirmation",
  "policyApplied": "id-pdp-lead-capture",
  "timestamp": "2025-01-15T10:00:00Z"
}
```

---

## 13. File Layout (Source of Truth)
```text
packages/control-plane/policies
├── global.yaml
├── tenants/
│   ├── acme-id.yaml
│   └── demo.yaml
├── compliance/
│   ├── pdp-id.yaml
│   ├── gdpr-eu.yaml
│   └── hipaa.yaml
```

---

## 14. Hubungan dengan AFD & Matrix
```text
AFD
 → Intent
   → Intent-Capability Matrix
     → Policy Enforcement (THIS)
       → Execution Plan
         → Agent Runtime
```
AFD **tidak bisa bypass ini**.

---

## 15. Dampak Strategis ke SBA-Agentic
- ✔ Governance kelas enterprise
- ✔ Aman untuk multi-tenant Indonesia
- ✔ Siap audit & ISO
- ✔ Agent tidak liar
- ✔ Produk bisa dijual ke enterprise & pemerintah

---

## 16. Checklist Validasi (WAJIB)
- [ ] Semua capability punya risk metadata
- [ ] Semua tenant punya policy set
- [ ] Default deny tersedia
- [ ] Audit trail aktif
- [ ] Agent runtime enforce permit

---

## NEXT LOGICAL STEP (WAJIB SETELAH INI)
👉 **Control Plane Routing Algorithm (Deterministic & Policy-Aware)**

Karena sekarang kita sudah tahu:
- apa yang boleh
- untuk siapa
- dengan risiko apa

Jika Anda setuju, saya lanjut ke algoritma routing-nya.
