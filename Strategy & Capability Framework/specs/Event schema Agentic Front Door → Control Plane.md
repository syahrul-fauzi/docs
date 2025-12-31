---
id: sba.strategy.event_schema_afd_cp
version: 1.1.0
author: SBA-Agentic Core Team
status: active
scope: global
tags: [event-schema, afd, control-plane, contract]
---

# Event Schema
## Agentic Front Door → Control Plane
**Canonical Contract – SBA-Agentic**

---

## 1. Tujuan Event Ini (WHY)

Event dari **Agentic Front Door (AFD)** bukan sekadar data analytics. Ia adalah **sinyal pemicu (trigger signal)** untuk ekosistem agentic yang berfungsi sebagai:

1. **Signal Intake**: Pintu masuk utama niat user ke Control Plane.
2. **Context Enrichment**: Menyediakan data pendukung untuk pengambilan keputusan.
3. **Audit Artifact**: Bukti otentik asal-usul instruksi untuk kepatuhan (compliance).
4. **Policy Input**: Bahan baku utama untuk evaluasi kebijakan di Control Plane.

📌 **AFD TIDAK MEMUTUSKAN APA-APA.** Ia hanya mengamati, menormalisasi, dan mengirim sinyal.

---

## 2. Prinsip Desain Event

| Prinsip | Implementasi |
| :--- | :--- |
| **Deterministic** | Payload stabil dan versi skema dikunci. |
| **Append-only** | Data bersifat immutable (tidak berubah setelah dikirim). |
| **Tenant-aware** | Setiap event wajib memiliki `tenantId` yang valid. |
| **Policy-ready** | Struktur data memudahkan evaluasi cepat oleh Policy Engine. |
| **Agent-safe** | Meminimalkan PII (Personally Identifiable Information) langsung. |

---

## 3. Event Envelope (Global Standard)

Semua event AFD **WAJIB** menggunakan envelope standar berikut untuk memastikan interoperabilitas.

```ts
interface AgenticEventEnvelope<TPayload> {
  specVersion: '1.1.0'
  eventId: string;     // Unique UUID per event
  traceId: string;     // Correlation ID untuk tracking end-to-end
  eventType: string;   // Format: AFD.<Category>.<Action>
  occurredAt: string;  // ISO 8601 UTC

  tenant: {
    tenantId: string;
    workspaceId?: string;
    environment: 'prod' | 'staging' | 'dev';
  }

  source: {
    system: 'agentic-front-door';
    appVersion: string;
    surface: 'web' | 'mobile' | 'embedded';
  }

  actor: {
    type: 'anonymous' | 'user' | 'service';
    actorId?: string;
    sessionId: string;
    trustLevel: 'low' | 'medium' | 'high';
  }

  context: {
    locale?: string;
    timezone?: string;
    consentState: 'granted' | 'denied' | 'unknown';
    riskScore: number; // 0 - 100
  }

  payload: TPayload;

  integrity: {
    checksum: string;
    schemaHash: string;
  }
}
```

---

## 4. Core Event Payloads

### 4.1 AFD.Intent.Captured
Dipicu ketika sistem mendeteksi niat spesifik dari user.

```ts
interface IntentCapturedPayload {
  intent: {
    name: string;        // e.g., "order_status", "lead_generation"
    confidence: number;  // 0.0 - 1.0
  }
  trigger: {
    type: 'cta_click' | 'form_submit' | 'natural_language';
    elementId?: string;
  }
  metadata: Record<string, any>;
}
```

### 4.2 AFD.Interaction.Observed
Dipicu oleh interaksi pasif yang mungkin relevan untuk context agent.

```ts
interface InteractionObservedPayload {
  interaction: {
    type: 'view' | 'scroll' | 'hover';
    target: string;
  }
  durationMs?: number;
}
```

---

## 5. Security & Compliance

1. **PII Masking**: Data sensitif harus di-hash atau di-mask sebelum dikirim.
2. **Consent Enforcement**: Control Plane akan membuang event dengan `consentState: denied`.
3. **Integrity Check**: Setiap event divalidasi `checksum`-nya untuk mencegah tampering di perjalanan.

---

## 6. Versioning Strategy
* **Minor (1.x.x)**: Penambahan field opsional (Backward compatible).
* **Major (2.0.0)**: Perubahan struktur envelope atau field wajib.

---
**Satu event = Satu mandat eksekusi**
