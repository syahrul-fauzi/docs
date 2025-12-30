**Diagram Event Flow resmi & kanonik** untuk **AFD → Control Plane → Agent** dalam konteks **SBA-Agentic**, disusun **arsitektural, operasional, dan agent-grade** (bukan sekadar flowchart UI).

Saya bagi menjadi **4 lapisan** agar mudah dipakai sebagai **dokumen arsitektur**, **referensi implementasi**, dan **bahan diskusi tim**.

---

# Diagram Event Flow

## Agentic Front Door → Control Plane → Agent

**SBA-Agentic Canonical Architecture**

---

## 1. Gambaran Besar (Mental Model)

```txt
┌────────────────────┐
│  External World    │
│  (User / Traffic)  │
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────────┐
│  Agentic Front Door (AFD)    │
│  - Intent Capture            │
│  - Adaptive UX               │
│  - Trust Surface             │
│  - Deterministic Events      │
└─────────┬────────────────────┘
          │  Agentic Events
          ▼
┌──────────────────────────────┐
│  Control Plane               │
│  - Ingress & Validation      │
│  - Policy Evaluation         │
│  - Routing & Throttling      │
│  - Audit & Replay            │
└─────────┬────────────────────┘
          │  Decisions / Signals
          ▼
┌──────────────────────────────┐
│  Agent Runtime               │
│  - Reasoning                 │
│  - Memory                    │
│  - Tool Invocation           │
│  - Response Strategy         │
└──────────────────────────────┘
```

📌 **AFD tidak bicara langsung ke Agent.**
📌 **Agent tidak pernah menerima raw user input.**

---

## 2. Detailed Event Flow (Step-by-Step)

---

### STEP 0 — External Interaction

```txt
User
 ├─ visits marketing page
 ├─ scrolls / clicks CTA
 └─ submits form
```

Belum ada agent.
Belum ada keputusan.

---

### STEP 1 — Agentic Front Door (Signal Producer)

```txt
AFD
 ├─ observes interaction
 ├─ normalizes context
 ├─ checks consent
 ├─ computes intent confidence
 └─ emits event
```

Contoh event:

```txt
AFD.Intent.Captured
AFD.Interaction.Observed
AFD.Context.Emitted
AFD.Trust.Disclosed
```

📌 **AFD = sensor layer**
📌 **Tidak ada policy / reasoning**

---

### STEP 2 — Event Normalization & Transport

```txt
AFD SDK
 ├─ validate schema
 ├─ sign payload
 ├─ attach tenant scope
 └─ async emit
```

Transport bisa:

* HTTP ingestion
* Event bus
* Edge queue

➡️ **Fire-and-forget**

---

### STEP 3 — Control Plane Ingress

```txt
Control Plane / Ingress
 ├─ schema validation
 ├─ checksum verification
 ├─ tenant isolation
 └─ append-only storage
```

Jika gagal:

* event ditolak
* audit tetap dicatat

📌 **Tidak ada silent failure**

---

### STEP 4 — Policy Evaluation (OTAK SEBENARNYA)

```txt
Policy Engine
 ├─ evaluate consent
 ├─ evaluate intent confidence
 ├─ check rate & abuse
 ├─ check tenant config
 └─ decide next action
```

Contoh keputusan:

| Condition              | Action        |
| ---------------------- | ------------- |
| intent > 0.8 & consent | allow agent   |
| low confidence         | observe only  |
| risk high              | block / delay |
| quota exceeded         | throttle      |

📌 **Semua keputusan deterministic & logged**

---

### STEP 5 — Routing Decision

```txt
Routing Layer
 ├─ which agent?
 ├─ which capability?
 ├─ sync vs async?
 └─ priority level?
```

Output bisa:

```ts
{
  route: 'sales-agent',
  mode: 'async',
  priority: 'normal'
}
```

---

### STEP 6 — Agent Runtime Execution

```txt
Agent Runtime
 ├─ receives structured signal
 ├─ loads memory
 ├─ runs reasoning
 ├─ calls tools (CRM, Docs, etc)
 └─ produces response / action
```

📌 **Agent TIDAK tahu ini dari marketing**
📌 Agent hanya tahu: *“signal dengan konteks X”*

---

### STEP 7 — Feedback & Observability Loop

```txt
Agent
 ├─ emits decision event
 ├─ emits tool usage
 └─ emits outcome
```

Kembali ke:

```txt
Control Plane
 └─ Audit / Replay / Analytics
```

➡️ Closed loop.

---

## 3. ASCII Diagram Lengkap (Siap Masuk Docs)

```txt
[ User / Traffic ]
        │
        ▼
┌──────────────────────────────┐
│   Agentic Front Door         │
│  ─────────────────────────  │
│  Observe Interaction         │
│  Capture Intent              │
│  Enforce Consent             │
│  Emit Agentic Events         │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│   Control Plane              │
│  ─────────────────────────  │
│  Event Ingress               │
│  Schema & Integrity Check    │
│  Policy Evaluation           │
│  Routing & Throttling        │
│  Audit & Replay              │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│   Agent Runtime              │
│  ─────────────────────────  │
│  Reasoning Engine            │
│  Memory & Context            │
│  Tool Invocation             │
│  Action / Response           │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│   Observability & Docs       │
│  ─────────────────────────  │
│  Logs / Metrics / Replay     │
│  Knowledge & SOP Update      │
└──────────────────────────────┘
```

---

## 4. Boundary Rules (HARUS ADA DI DIAGRAM)

| Rule                    | Penjelasan               |
| ----------------------- | ------------------------ |
| AFD ≠ Agent             | Tidak ada direct call    |
| Control Plane mandatory | Semua lewat policy       |
| Agent blind to UI       | Agent hanya lihat signal |
| Docs = single truth     | SOP & explainability     |
| Replay first-class      | Debug ≠ guess            |

---

## 5. Kenapa Arsitektur Ini Kuat

✔ Marketing naik kelas → **Agentic Subsystem**
✔ Aman untuk enterprise & regulasi
✔ Bisa scale multi-tenant
✔ Agent bisa berkembang tanpa ubah frontend
✔ Semua keputusan bisa dijelaskan

---

## 6. Artefak Docs yang Ideal Setelah Ini

Saya sangat menyarankan urutan berikut:

1. **Policy Spec: AFD Events → Agent Routing**
2. **Control Plane Ingress Folder & Code Skeleton**
3. **Replay & Audit Architecture**
4. **Docs Positioning: “Agentic Front Door”**

Tinggal arahkan:
👉 **“lanjut ke …”**
