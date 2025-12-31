---
id: sba.strategy.policy_spec_afd_routing
version: 1.1.0
author: SBA-Agentic Core Team
status: active
scope: global
tags: [policy, afd, routing, control-plane]
---

# Policy Specification
## AFD Events → Agent Routing
**SBA-Agentic Control Plane**

---

## 0. Tujuan Policy Layer (Why It Exists)

Policy Layer bertanggung jawab untuk menentukan apakah, ke mana, dan bagaimana sebuah Agentic Event boleh memicu Agent.

Dengan prinsip:
* ✅ **Deterministic**: Input yang sama menghasilkan keputusan yang sama.
* ✅ **Replayable**: Keputusan dapat diulang untuk audit.
* ✅ **Auditable**: Setiap langkah evaluasi dicatat.
* ✅ **Tenant-aware**: Isolasi kebijakan per tenant.

📌 *Agent tidak pernah mengambil keputusan routing sendiri.*

---

## 1. Scope & Boundary

### 1.1 In Scope
* Validasi event envelope dan payload.
* Evaluasi consent (PDP/GDPR compliance).
* Analisis risiko (Risk & Abuse check).
* Resolusi Intent ke Capability.
* Pemilihan Agent (Scoring & Selection).
* Penerbitan Execution Plan & Permit.

### 1.2 Out of Scope
* Eksekusi tool (tugas Agent Runtime).
* Reasoning konten (tugas Agent).
* UI Rendering.

---

## 2. Input Contract (AFD Event Envelope)

Policy menerima event yang mengikuti [Event Schema](./Event%20schema%20Agentic%20Front%20Door%20→%20Control%20Plane.md).

```ts
interface AgenticEventEnvelope<TPayload> {
  specVersion: '1.1.0'
  eventId: string
  traceId: string // Cross-system correlation
  eventType: string
  occurredAt: string
  tenant: {
    tenantId: string
    environment: 'prod' | 'staging' | 'dev'
  }
  actor: {
    actorId?: string
    sessionId: string
    trustLevel: 'low' | 'medium' | 'high'
  }
  context: {
    consentState: 'granted' | 'denied' | 'unknown'
    riskScore: number // 0 - 100
  }
  payload: TPayload
}
```

---

## 3. Policy Evaluation Pipeline (10-Step Algorithm)

Evaluasi mengikuti [Control Plane Routing Algorithm](../registry/Control%20Plane%20Routing%20Algorithm%20(Deterministic%20&%20Policy-Aware).md):

1.  **Intent Validation**: Cek confidence threshold.
2.  **Capability Resolution**: Map Intent → Capability.
3.  **Tenant Filter**: Cek hak akses tenant.
4.  **Risk Computation**: Hitung profil risiko konteks.
5.  **Policy Gate**: Evaluasi aturan bisnis & keamanan.
6.  **Agent Filter**: Cari agent yang mendukung capability.
7.  **Agent Scoring**: Beri skor kandidat agent.
8.  **Selection**: Pilih agent terbaik (deterministic).
9.  **Plan Construction**: Buat `ExecutionPlan`.
10. **Permit Issuance**: Terbitkan `ExecutionPermit`.

---

## 4. Core Policy Rules

### 4.1 Consent Policy
| Kondisi | Aksi |
| :--- | :--- |
| `consentState == 'denied'` | ❌ BLOCK (Stop Evaluation) |
| `consentState == 'unknown'` | ⚠ DEGRADE (Observe Only) |
| `consentState == 'granted'` | ✅ ALLOW (Continue) |

### 4.2 Risk Policy
| Risk Score | Action |
| :--- | :--- |
| > 70 | ❌ BLOCK |
| 40 - 70 | ⚠ REQUIRE_APPROVAL / DEGRADE |
| < 40 | ✅ ALLOW |

---

## 5. Routing Output Contract

Output akhir dari Policy Spec ini adalah **Execution Plan** yang tertanda tangan.

```ts
interface ExecutionPlan {
  planId: string;
  permit: ExecutionPermit; // Security Token
  intent: { id: string; name: string };
  capability: { id: string; version: string };
  agent: { agentId: string; runtime: string };
  constraints: { maxSteps: number; maxDurationMs: number };
  signature: string; // Signed by Control Plane
}
```

---

## 6. Audit & Compliance

Setiap keputusan routing wajib mencatat `PolicyDecisionLog`:
* `traceId`: Untuk pelacakan end-to-end.
* `policyHash`: Versi kebijakan yang digunakan.
* `decision`: allow | deny | degrade.
* `permitId`: Referensi ke permit yang diterbitkan.

---

## 7. Failure Modes

| Skenario | Respon |
| :--- | :--- |
| Invalid Signature | Reject (401) |
| Policy Engine Timeout | Fail-Closed (Deny) |
| No Agent Available | Escalate to Human |
| Tenant Quota Exceeded | Deny (429) |

---
**Satu event = Satu audit trail**
