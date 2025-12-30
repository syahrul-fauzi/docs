Baik. Kita masuk ke **Capability Adapter Example** dengan **level produksi**, **selaras penuh dengan Agent Runtime SDK, Control Plane, dan Agentic Front Door (AFD)**.

Saya akan susun **bertahap & konkret**, bukan sekadar contoh kecil, tapi **template standar yang bisa direplikasi** untuk semua capability SBA.

---

# Capability Adapter Example

**SBA-Agentic – Production Pattern**

---

## 1. Apa itu Capability Adapter (Posisi yang Tepat)

**Capability Adapter adalah satu-satunya cara Agent Runtime berinteraksi dengan dunia luar.**

> Agent Runtime **TIDAK PERNAH**:
>
> * memanggil API langsung
> * mengakses DB
> * memanggil LLM langsung

Semua dilakukan via **Capability Adapter**.

---

## 2. Klasifikasi Capability di SBA

Dalam SBA, capability **bukan sekadar fungsi**, tapi **kontrak eksekusi**.

### Tipe Capability (Standar)

| Tipe                | Contoh                           |
| ------------------- | -------------------------------- |
| `intent-processing` | classify intent, enrich context  |
| `decision-support`  | scoring, ranking, recommendation |
| `action-execution`  | send email, create ticket        |
| `knowledge-access`  | query docs, SOP                  |
| `observability`     | log, audit, trace                |
| `compliance`        | consent check, policy verify     |

---

## 3. Struktur Folder Capability Adapter

```txt
packages/capabilities
├── marketing
│   ├── capture-lead
│   │   ├── adapter.ts
│   │   ├── schema.ts
│   │   ├── policy.ts
│   │   └── README.md
│
├── docs
│   └── search-knowledge
│
└── ops
    └── create-ticket
```

➡️ **Satu capability = satu folder = satu kontrak**

---

## 4. Capability Adapter Contract (Wajib)

```ts
export interface CapabilityAdapter {
  capabilityId: string
  version: string
  invoke(
    input: unknown,
    context: ExecutionContext
  ): Promise<CapabilityResult>
}
```

---

## 5. Example 1 — Marketing: `capture-lead`

### 5.1 Tujuan Capability

> Menangkap lead dari Agentic Front Door
> dan mengirimkan sinyal ke Control Plane + CRM

---

### 5.2 schema.ts (Input & Output — STRICT)

```ts
import { z } from 'zod'

export const CaptureLeadInputSchema = z.object({
  source: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  intent: z.string(),
  metadata: z.record(z.any()).optional()
})

export const CaptureLeadOutputSchema = z.object({
  leadId: z.string(),
  status: z.enum(['captured', 'duplicate']),
  timestamp: z.string()
})
```

➡️ Semua capability **WAJIB schema-based**

---

### 5.3 adapter.ts (Implementation)

```ts
export class CaptureLeadAdapter implements CapabilityAdapter {
  capabilityId = 'marketing.capture-lead'
  version = '1.0.0'

  async invoke(input: unknown, ctx: ExecutionContext) {
    const data = CaptureLeadInputSchema.parse(input)

    // Enforce tenant boundary
    if (!ctx.tenant.features.leadCapture) {
      throw new CapabilityDeniedError('leadCapture disabled')
    }

    // Business logic (delegated)
    const lead = await LeadService.capture({
      tenantId: ctx.tenant.id,
      email: data.email,
      company: data.company,
      source: data.source
    })

    return CaptureLeadOutputSchema.parse({
      leadId: lead.id,
      status: lead.isDuplicate ? 'duplicate' : 'captured',
      timestamp: new Date().toISOString()
    })
  }
}
```

➡️ Adapter **tidak punya state**
➡️ Semua dependency **di-inject / imported**

---

### 5.4 policy.ts (Declarative Policy)

```ts
export const CaptureLeadPolicy = {
  allowedTenants: ['trial', 'pro', 'enterprise'],
  riskLevel: 'low',
  dataAccess: ['email', 'company'],
  auditRequired: true
}
```

➡️ Dipakai oleh **Control Plane**, bukan runtime.

---

## 6. Example 2 — Docs: `search-knowledge`

### 6.1 Tujuan

> Mengakses `apps/docs` sebagai **Single Source of Truth**

---

### 6.2 adapter.ts

```ts
export class SearchKnowledgeAdapter implements CapabilityAdapter {
  capabilityId = 'docs.search-knowledge'
  version = '1.1.0'

  async invoke(input: unknown, ctx: ExecutionContext) {
    const query = QuerySchema.parse(input)

    // Policy check
    if (!ctx.policy.allowKnowledgeAccess) {
      throw new PolicyViolationError('knowledge access denied')
    }

    const results = await DocsSearchService.search({
      tenantId: ctx.tenant.id,
      query: query.q,
      limit: query.limit ?? 5
    })

    return {
      results,
      source: 'docs-runtime'
    }
  }
}
```

➡️ Agent **tidak tahu** apakah ini vector DB, markdown, atau CMS.

---

## 7. Example 3 — Observability Capability

```ts
export class EmitAuditEventAdapter implements CapabilityAdapter {
  capabilityId = 'observability.emit-audit'
  version = '1.0.0'

  async invoke(input: AuditEventInput, ctx: ExecutionContext) {
    await AuditLog.write({
      tenantId: ctx.tenant.id,
      actor: ctx.intent.actor,
      action: input.action,
      payload: input.payload,
      traceId: ctx.traceId
    })

    return { status: 'logged' }
  }
}
```

➡️ Bahkan logging = capability
➡️ **No hidden side effect**

---

## 8. Capability Registration (Runtime Side)

```ts
const registry = new CapabilityRegistry([
  new CaptureLeadAdapter(),
  new SearchKnowledgeAdapter(),
  new EmitAuditEventAdapter()
])
```

Runtime **HANYA** memanggil registry.

---

## 9. Contoh Execution Graph (Node → Capability)

```json
{
  "id": "capture-lead",
  "type": "tool",
  "capabilityRef": "marketing.capture-lead",
  "config": {
    "source": "pricing_page"
  }
}
```

➡️ Control Plane **memilih capability**
➡️ Runtime **hanya mengeksekusi**

---

## 10. Error Model (Capability-Level)

```ts
throw new CapabilityExecutionError({
  capabilityId: 'marketing.capture-lead',
  reason: 'duplicate-email',
  retryable: false,
  severity: 'low'
})
```

➡️ Error **terstruktur & traceable**

---

## 11. Security Rules (WAJIB)

Setiap Capability Adapter:

| Rule                 | Status |
| -------------------- | ------ |
| No direct env access | ✅      |
| No cross-tenant      | ✅      |
| Schema validated     | ✅      |
| Policy-aware         | ✅      |
| Observable           | ✅      |

---

## 12. Capability Adapter Checklist (Template)

Gunakan ini untuk semua capability baru:

```md
- [ ] capabilityId global unique
- [ ] versioned
- [ ] input/output schema
- [ ] tenant check
- [ ] policy awareness
- [ ] no side-effect hidden
- [ ] observable
```

---

## 13. Nilai Strategis untuk SBA

Dengan model ini:

* Capability = **aset bisnis**
* Bisa:

  * dijual per paket
  * dibatasi per tenant
  * diaudit
* Agent Runtime tetap **ringan & aman**

---

## 14. Artefak Selanjutnya (Disarankan)

Urutan paling logis setelah ini:

1. **Capability Registry YAML (Control Plane Source of Truth)**
2. **Capability Versioning & Deprecation Policy**
3. **Example: Multi-step Capability Chain**
4. **Capability Test Harness (Simulation Mode)**
5. **Capability Marketplace (Future)**

Jika Anda mau, saya bisa langsung lanjut ke **Capability Registry Spec (YAML + TS)** atau **contoh capability kompleks (Adaptive Marketing Decision)**.

Tinggal bilang: **lanjut ke mana**.
