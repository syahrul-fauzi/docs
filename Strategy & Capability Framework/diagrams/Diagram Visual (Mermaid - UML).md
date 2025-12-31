Baik. Berikut saya berikan **Diagram Visual lengkap (Mermaid)** untuk **SBA-Agentic — Agentic Front Door (AFD) → Control Plane → Agent Runtime**, disusun **berlapis dan saling konsisten**, sehingga bisa langsung:

* dimasukkan ke `docs/02-architecture`
* dipakai diskusi arsitektur
* dipakai validasi implementasi tim

Saya bagi menjadi **4 diagram inti** (ini standar enterprise-grade).

---

# 1️⃣ High-Level System Context Diagram

**(Apa berbicara dengan siapa)**

```mermaid
flowchart LR
  Visitor -->|UI Interaction| AFD[Agentic Front Door<br/>apps/marketing]

  AFD -->|Intent Event| CP[Control Plane<br/>packages/control-plane]

  CP -->|Execution Plan| AR[Agent Runtime]

  AR -->|Execution Result| CP

  CP --> OBS[Observability<br/>Telemetry / Audit]
  CP --> DOCS[apps/docs<br/>Policies / Knowledge]
```

### Makna Arsitektural

* **AFD = signal producer**
* **Control Plane = otoritas keputusan**
* **Agent Runtime = executor**
* **Docs = single source of truth**
* **Observability = hukum & jejak**

---

# 2️⃣ Detailed Event Flow Diagram

**(AFD → Control Plane → Agent)**

```mermaid
sequenceDiagram
  autonumber
  participant U as User
  participant AFD as Agentic Front Door
  participant CP as Control Plane
  participant AR as Agent Runtime
  participant OBS as Audit / Telemetry

  U->>AFD: Click CTA / Submit Form
  AFD->>CP: AFD_INTENT_CAPTURED
  CP->>CP: Validate Intent
  CP->>CP: Resolve Capability
  CP->>CP: Enforce Policy
  CP->>CP: Select Agent
  CP->>AR: Execution Plan
  AR->>AR: Execute Capability Adapter
  AR->>CP: Execution Result
  CP->>OBS: Audit + Metrics
```

### Invariant Rules (terlihat jelas di diagram)

* ❌ AFD tidak memilih agent
* ❌ Agent tidak memilih capability
* ✅ Semua keputusan ada di Control Plane

---

# 3️⃣ Control Plane Internal Decision Diagram

**(Decision Pipeline Deterministic)**

```mermaid
flowchart TD
  E[AFD Intent Event]
    --> V[Intent Validation]

  V -->|Valid| C[Capability Resolution]
  V -->|Invalid| R1[Reject / Log]

  C --> P[Policy Enforcement]

  P -->|Allowed| S[Agent Selection]
  P -->|Denied| R2[Reject / Audit]

  S --> EP[Execution Plan Generator]

  EP --> OUT[Signed Execution Plan]
```

### Catatan Penting

* Setiap node = **pure function**
* Output **deterministic**
* Bisa di-snapshot & di-replay

---

# 4️⃣ Execution Plan Lifecycle Diagram

**(Immutable & Replayable)**

```mermaid
stateDiagram-v2
  [*] --> Created
  Created --> Dispatched: Sent to Agent
  Dispatched --> Executing
  Executing --> Success
  Executing --> Failed
  Success --> Archived
  Failed --> Archived

  Archived --> Replayed: Replay(plan_id)
  Replayed --> Archived
```

### Ini yang membuat SBA **beda dari AI biasa**

* Execution Plan = **kontrak hukum**
* Replay = **alat audit & debugging**
* Tidak ada “AI magic” tersembunyi

---

# 5️⃣ Capability–Intent Mapping Diagram

**(Mental Model Global SBA)**

```mermaid
flowchart LR
  Intent[Intent Registry] --> Cap1[lead.capture]
  Intent --> Cap2[content.personalize]
  Intent --> Cap3[customer.support]

  Cap1 --> AgentA[Sales Agent]
  Cap2 --> AgentB[Marketing Agent]
  Cap3 --> AgentC[Support Agent]
```

➡️ **Intent ≠ Capability ≠ Agent**
Ini pemisahan yang membuat sistem scalable & aman.

---

# 6️⃣ Trust & Compliance Overlay

**(Why this passes enterprise review)**

```mermaid
flowchart LR
  Event --> CP
  CP -->|Policy Snapshot| AuditLog
  CP -->|Decision Trace| Telemetry
  CP -->|Docs Ref| Docs
```

Setiap keputusan bisa dijawab:

* **kenapa**
* **berdasarkan policy apa**
* **versi agent mana**
* **dampak apa**

---

## Status Arsitektur Saat Ini (JUJUR)

✅ Arsitektur **sudah lengkap**
✅ Tidak ada missing block konseptual
✅ Siap masuk implementasi bertahap
❌ Belum dikodekan → **ini bagus**, artinya desain sehat

---

## Langkah Selanjutnya (pilih 1)

Saya sarankan **urutannya**:

1️⃣ **Generate docs final**

```
docs/02-architecture/
 ├─ agentic-front-door.md
 ├─ control-plane.md
 ├─ execution-plan.md
 └─ diagrams.md
```

2️⃣ **Scaffold kode**

* `packages/control-plane`
* `packages/agent-runtime-sdk`
* `apps/marketing` (AFD adapter)

👉 Tinggal jawab:
**“Docs dulu”** atau **“Code dulu”**
