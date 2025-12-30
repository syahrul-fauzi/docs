**Event Schema resmi & production-grade** untuk **Agentic Front Door (AFD) → Control Plane**, dirancang **enterprise-ready**, **multi-tenant**, **observable**, dan **agent-safe** untuk SBA-Agentic.

Saya susun **berlapis & sistematis**, bukan sekadar JSON.

---

# Event Schema

## Agentic Front Door → Control Plane

**Canonical Contract – SBA-Agentic**

---

## 1. Tujuan Event Ini (WHY)

Event dari **Agentic Front Door** bukan analytics biasa.

Ia berfungsi sebagai:

1. **Signal intake** untuk sistem agent
2. **Context enrichment** sebelum agent decision
3. **Audit & compliance artifact**
4. **Replay source** untuk determinism & debugging
5. **Policy evaluation input** di Control Plane

📌 **AFD TIDAK MEMUTUSKAN APA-APA.**
AFD **mengamati, menormalisasi, dan mengirim sinyal**.

---

## 2. Prinsip Desain Event (NON-NEGOTIABLE)

| Prinsip       | Implementasi               |
| ------------- | -------------------------- |
| Deterministic | Payload stabil & versioned |
| Append-only   | Tidak ada mutable field    |
| Replayable    | Selalu bisa di-replay      |
| Tenant-aware  | Semua event scoped         |
| Policy-ready  | Mudah dievaluasi           |
| Agent-safe    | No PII by default          |

---

## 3. Event Taxonomy (WAJIB DIKUNCI)

### 3.1 Domain Event Prefix

```txt
AFD.<Category>.<Action>
```

### 3.2 Category Resmi

| Category    | Makna                     |
| ----------- | ------------------------- |
| Intent      | Sinyal niat user          |
| Interaction | Interaksi UI              |
| Context     | Lingkungan & kondisi      |
| Trust       | Transparency & disclosure |
| System      | Health & anomaly          |

---

## 4. Event Envelope (GLOBAL STANDARD)

> **Semua event AFD HARUS pakai envelope ini**

```ts
interface AgenticEventEnvelope<TPayload> {
  specVersion: '1.0'
  eventId: string
  eventType: string
  occurredAt: string // ISO 8601 UTC

  tenant: {
    tenantId: string
    workspaceId?: string
    environment: 'prod' | 'staging' | 'dev'
  }

  source: {
    system: 'agentic-front-door'
    appVersion: string
    surface: 'web' | 'mobile' | 'embedded'
    route: string
  }

  actor: {
    type: 'anonymous' | 'user' | 'service'
    actorId?: string
    sessionId: string
  }

  context: {
    locale?: string
    timezone?: string
    device?: string
    userAgent?: string
    ipHash?: string
    consentState: 'granted' | 'denied' | 'unknown'
  }

  payload: TPayload

  integrity: {
    checksum: string
    schemaHash: string
  }
}
```

📌 **Control Plane hanya menerima event dengan envelope valid.**

---

## 5. Event Payloads (CORE)

---

## 5.1 Intent Captured Event (PALING KRITIS)

### Event Type

```txt
AFD.Intent.Captured
```

### Payload

```ts
interface IntentCapturedPayload {
  intent: {
    category: 'pricing' | 'demo' | 'contact' | 'compare' | 'unknown'
    confidence: number // 0.0 – 1.0
  }

  trigger: {
    action: 'cta_click' | 'form_submit' | 'scroll_depth' | 'hover'
    elementId?: string
    pageSection?: string
  }

  businessContext: {
    industry?: string
    companySize?: 'solo' | 'smb' | 'mid' | 'enterprise'
    role?: string
  }

  referrer?: {
    source?: string
    campaign?: string
    medium?: string
  }
}
```

➡️ **Control Plane menggunakan ini untuk:**

* agent routing
* lead qualification
* readiness scoring

---

## 5.2 Interaction Observed Event

### Event Type

```txt
AFD.Interaction.Observed
```

### Payload

```ts
interface InteractionObservedPayload {
  interaction: {
    type: 'view' | 'click' | 'submit' | 'exit'
    target: string
  }

  metrics?: {
    dwellTimeMs?: number
    scrollDepthPct?: number
  }
}
```

➡️ Digunakan untuk:

* behavior pattern
* funnel analysis
* replay

---

## 5.3 Context Emitted Event

### Event Type

```txt
AFD.Context.Emitted
```

### Payload

```ts
interface ContextEmittedPayload {
  contextSnapshot: {
    trafficType: 'organic' | 'paid' | 'partner' | 'internal'
    riskLevel: 'low' | 'medium' | 'high'
    geoRegion?: string
  }

  signals: {
    botScore?: number
    anomalyScore?: number
  }
}
```

➡️ **Input penting untuk guardrail agent**

---

## 5.4 Trust Disclosure Event

### Event Type

```txt
AFD.Trust.Disclosed
```

### Payload

```ts
interface TrustDisclosedPayload {
  disclosureType:
    | 'ai_usage_notice'
    | 'data_usage_notice'
    | 'decision_explainability'

  acknowledged: boolean
}
```

➡️ **Audit & compliance (PDP / ISO / SOC-ready)**

---

## 5.5 System Health Signal

### Event Type

```txt
AFD.System.Signal
```

### Payload

```ts
interface SystemSignalPayload {
  status: 'healthy' | 'degraded' | 'blocked'

  reason?: string

  metrics?: {
    latencyMs?: number
    errorRatePct?: number
  }
}
```

➡️ **Control Plane dapat menurunkan aggressiveness agent**

---

## 6. Event → Control Plane Processing Flow

```txt
Agentic Front Door
   ↓
Normalize & Validate
   ↓
Emit Event
   ↓
Control Plane Ingress
   ↓
Policy Evaluation
   ↓
Agent Routing / Throttling / Observation
```

📌 **Tidak ada synchronous dependency.**

---

## 7. Policy Evaluation Example

```ts
if (
  event.type === 'AFD.Intent.Captured' &&
  payload.intent.confidence > 0.8 &&
  context.consentState === 'granted'
) {
  allowAgentEngagement()
}
```

---

## 8. Security & Compliance Rules

| Rule             | Status |
| ---------------- | ------ |
| PII default off  | ✅      |
| Consent enforced | ✅      |
| Hash IP only     | ✅      |
| Schema versioned | ✅      |
| Audit replay     | ✅      |

---

## 9. Versioning Strategy

```txt
specVersion: 1.0
eventTypeVersion: implicit via schemaHash
```

Breaking change:

* new specVersion
* parallel ingestion

---

## 10. Minimal SDK Example (AFD Side)

```ts
emitAgenticEvent<IntentCapturedPayload>({
  eventType: 'AFD.Intent.Captured',
  payload
})
```

---

## 11. Checklist Final (HARUS LOLOS)

* [ ] Envelope valid
* [ ] Consent checked
* [ ] Payload schema match
* [ ] Event logged
* [ ] Replayable
* [ ] Tenant scoped

---

## Posisi Event Ini dalam SBA-Agentic

✔ AFD = **Signal Producer**
✔ Control Plane = **Policy Brain**
✔ Agent = **Decision Executor**
✔ Docs = **Single Truth**

---

### LANGKAH LANJUTAN YANG PALING LOGIS

Saya sarankan lanjut ke **salah satu**:

1. **Diagram Event Flow (AFD → Control Plane → Agent)**
2. **Policy Spec di Control Plane untuk AFD events**
3. **Implementation folder & code skeleton (`packages/control-plane/ingress`)**
4. **Replay & Audit mechanism design**

Tinggal jawab:
👉 **“lanjut ke …”**
