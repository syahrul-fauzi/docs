**Policy Spec resmi & production-grade** untuk **AFD Events → Agent Routing** dalam arsitektur **SBA-Agentic**. Dokumen ini disusun agar bisa langsung dipakai sebagai:

* **kontrak sistem** (docs → code)
* **dasar implementasi packages/control-plane**
* **acuan audit, replay, dan compliance**
* **panduan agent engineer & backend engineer**

Saya susun **berlapis, deterministik, dan agent-native**.

---

# Policy Specification

## AFD Events → Agent Routing

**SBA-Agentic Control Plane**

---

## 0. Tujuan Policy Layer (Why It Exists)

Policy Layer bertanggung jawab untuk:

> **Menentukan apakah, ke mana, dan bagaimana sebuah Agentic Event boleh memicu Agent**

Dengan prinsip:

* ❌ **No implicit behavior**
* ❌ **No UI-driven logic**
* ✅ **Deterministic**
* ✅ **Replayable**
* ✅ **Auditable**
* ✅ **Tenant-aware**

📌 *Agent tidak pernah mengambil keputusan routing sendiri.*

---

## 1. Scope & Boundary

### 1.1 In Scope

Policy Layer mengatur:

* Validasi event
* Evaluasi intent & risk
* Consent & compliance
* Routing ke agent
* Mode eksekusi (sync/async)
* Throttling & priority

### 1.2 Out of Scope

Policy **TIDAK**:

* Melakukan reasoning
* Mengakses UI state
* Memodifikasi konten
* Memanggil tool eksternal

---

## 2. Input Contract (AFD Event Envelope)

Policy menerima **event yang sudah dinormalisasi**.

```ts
interface AFD_Event {
  meta: {
    event_id: string
    event_type: string
    occurred_at: ISO8601
    tenant_id: string
    source: 'marketing'
    version: '1.0'
  }

  actor: {
    anonymous_id?: string
    user_id?: string
    session_id: string
    trust_level: 'unknown' | 'known' | 'verified'
  }

  intent: {
    type: 'lead' | 'pricing_interest' | 'support' | 'explore'
    confidence: number // 0.0 – 1.0
  }

  context: {
    page: string
    referrer?: string
    geo?: string
    device?: string
  }

  consent: {
    tracking: boolean
    profiling: boolean
    timestamp: ISO8601
  }

  security: {
    risk_score: number // 0 – 100
    bot_suspected: boolean
  }
}
```

📌 **Jika schema tidak valid → event ditolak + di-audit**

---

## 3. Policy Evaluation Pipeline (Deterministic)

```txt
Ingress
  ↓
Schema Validation
  ↓
Consent Check
  ↓
Risk & Abuse Check
  ↓
Intent Threshold Check
  ↓
Tenant Policy Check
  ↓
Routing Decision
```

Semua tahap:

* pure function
* no side effect
* logged

---

## 4. Core Policy Rules

---

### 4.1 Consent Policy

```ts
if (!event.consent.profiling) {
  deny('NO_PROFILING_CONSENT')
}
```

| Kondisi           | Aksi                  |
| ----------------- | --------------------- |
| profiling = false | ❌ block agent         |
| tracking = false  | ⚠ limit observability |
| consent missing   | ❌ block               |

📌 **Compliance first**

---

### 4.2 Risk & Abuse Policy

```ts
if (event.security.risk_score > 70) {
  deny('HIGH_RISK')
}
```

| Risk                 | Action  |
| -------------------- | ------- |
| bot_suspected = true | block   |
| risk > 70            | block   |
| risk 40–70           | degrade |
| risk < 40            | allow   |

---

### 4.3 Intent Threshold Policy

```ts
if (event.intent.confidence < threshold) {
  observe_only()
}
```

Default threshold (per tenant):

```ts
{
  lead: 0.6,
  pricing_interest: 0.7,
  support: 0.5,
  explore: 0.3
}
```

📌 **Low confidence ≠ failure**
➡️ tetap masuk observability & learning

---

### 4.4 Tenant Capability Policy

```ts
if (!tenant.enabled_agents.includes(targetAgent)) {
  deny('AGENT_NOT_ENABLED')
}
```

Contoh:

| Tenant Tier | Allowed      |
| ----------- | ------------ |
| Free        | observe only |
| Pro         | async agent  |
| Enterprise  | sync + async |

---

## 5. Routing Decision Model

Jika semua policy lolos → routing ditentukan.

### 5.1 Routing Output Contract

```ts
interface RoutingDecision {
  allowed: boolean

  route?: {
    agent_id: string
    capability: string
    mode: 'sync' | 'async'
    priority: 'low' | 'normal' | 'high'
  }

  reason: string
  evaluated_at: ISO8601
}
```

---

### 5.2 Routing Table (Contoh)

| Intent           | Agent         | Capability       | Mode  |
| ---------------- | ------------- | ---------------- | ----- |
| lead             | sales-agent   | qualify-lead     | async |
| pricing_interest | sales-agent   | pricing-response | sync  |
| support          | support-agent | triage           | async |
| explore          | —             | observe-only     | —     |

---

## 6. Execution Modes

### 6.1 Sync

Digunakan jika:

* UX butuh respon cepat
* tenant enterprise
* confidence tinggi

📌 Biasanya **pricing / chat**

---

### 6.2 Async

Digunakan jika:

* background follow-up
* CRM update
* scoring

📌 Default mode

---

### 6.3 Observe-Only

```ts
{
  allowed: false,
  reason: 'LOW_CONFIDENCE_OBSERVE_ONLY'
}
```

➡️ event tetap masuk:

* analytics
* learning
* replay

---

## 7. Audit & Replay Guarantees

Setiap policy decision menyimpan:

```ts
PolicyDecisionLog {
  event_id
  input_hash
  policy_version
  decision
  reasons[]
  timestamp
}
```

Replay guarantee:

```txt
same event + same policy version
= same routing decision
```

📌 **Zero ambiguity debugging**

---

## 8. Failure Modes (Explicit)

| Scenario           | Result          |
| ------------------ | --------------- |
| schema invalid     | reject + audit  |
| consent missing    | reject          |
| agent down         | degrade → async |
| control plane down | buffer          |
| unknown intent     | observe         |

Tidak ada:

* silent drop
* hidden retry

---

## 9. Code Mapping (packages/control-plane)

```txt
packages/control-plane
├── policies/
│   ├── consent.policy.ts
│   ├── risk.policy.ts
│   ├── intent.policy.ts
│   ├── tenant.policy.ts
│   └── routing.policy.ts
│
├── engine/
│   └── policy-engine.ts
│
├── contracts/
│   └── afd-event.ts
│
└── audit/
    └── policy-log.ts
```

---

## 10. Why This Spec Is Critical

✔ Marketing → agent without chaos
✔ Legal & compliance friendly
✔ Agent scale tanpa refactor UI
✔ Debuggable & explainable AI
✔ Cocok SaaS multi-tenant Indonesia

---

## 11. Langkah Lanjutan yang Logis

Pilih salah satu:

1. **Code Skeleton `packages/control-plane`**
2. **Policy DSL (YAML → TS compiler)**
3. **Replay Engine Design**
4. **Agent Capability Registry Spec**'docs/00-index/Strategy & Capability Framework/Agent Capability Registry Spec.md'
5. **End-to-End Example (CTA click → agent)**

👉 Tinggal bilang: **“lanjut ke …”**
