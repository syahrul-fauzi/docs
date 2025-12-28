## OPSI B — Agent Implementation Specification

_(Planner → Executor → Observer/Reviewer)_

Dokumen ini menjadi **kontrak perilaku agent**.
Frontend, Rube, dan backend **tidak boleh melampaui spesifikasi ini**.

---

## **1. Agent Taxonomy (Final & Locked)**

| Agent                          | Tanggung Jawab                     | Boleh Ambil Keputusan? | Boleh Eksekusi? |
| ------------------------------ | ---------------------------------- | ---------------------- | --------------- |
| **PlannerAgent**               | Reasoning, decomposition, planning | ⚠️ Terbatas            | ❌              |
| **ExecutorAgent**              | Eksekusi tool & workflow           | ❌                     | ✅              |
| **ObserverAgent**              | Audit, evaluasi, guardrail         | ❌                     | ❌              |
| **ReviewerAgent** _(opsional)_ | Approval (human-like)              | ⚠️                     | ❌              |

> **Golden Rule:**
> **Agent TIDAK BOLEH langsung memanggil sistem bisnis.**
> Semua lewat **Rube Tool Layer**.

---

## **2. PlannerAgent — Spec Detail**

### **Tujuan**

Mengubah **intent → rencana deterministik**.

### **Input**

```ts
PlannerInput {
  tenantId: string
  userId: string
  intent: string
  contextSnapshot: {
    memoryRefs: string[]
    activeWorkspace: string
    role: UserRole
  }
}
```

### **Output**

```ts
PlannerOutput {
  planId: string
  steps: PlanStep[]
  requiredCapabilities: Capability[]
  riskLevel: "low" | "medium" | "high"
}
```

### **Batasan**

- ❌ Tidak boleh memanggil API
- ❌ Tidak boleh mutate data
- ✅ Boleh membaca **read-only context**
- ✅ Harus menghasilkan **explainable steps**

### **Failure Mode**

| Kasus                     | Respons              |
| ------------------------- | -------------------- |
| Ambigu intent             | Minta klarifikasi    |
| Risk tinggi               | Escalate ke Reviewer |
| Capability tidak tersedia | Abort + reason       |

---

## **3. ExecutorAgent — Spec Detail**

### **Tujuan**

Menjalankan plan **step-by-step** melalui Rube.

### **Input**

```ts
ExecutorInput {
  planId: string
  step: PlanStep
  toolToken: ScopedToolToken
}
```

### **Output**

```ts
ExecutorResult {
  stepId: string
  status: "success" | "failed"
  output?: unknown
  error?: ExecutionError
}
```

### **Batasan Keras**

- ❌ Tidak boleh reasoning ulang
- ❌ Tidak boleh lompat step
- ❌ Tidak boleh akses tool di luar scope
- ✅ Semua execution → emit event

### **Failure Handling**

- Retry terbatas
- Emit `execution.failed`
- Stop chain bila fatal

---

## **4. Observer / Reviewer Agent**

### **ObserverAgent**

- Mendengar **SEMUA event**
- Hitung:
  - Drift plan vs execution
  - Anomali latency
  - Policy violation

### **ReviewerAgent**

- Digunakan bila:
  - Risk = high
  - Impact = irreversible

- UI = AG-UI approval panel

---

## **EPIC 1 — Agent Core**

**Stories**

- [ ] PlannerAgent reasoning pipeline
- [ ] ExecutorAgent deterministic runner
- [ ] Agent registry & lifecycle

---

## **EPIC 2 — Rube Tooling**

**Stories**

- [ ] Tool manifest loader
- [ ] Capability enforcement middleware
- [ ] Scoped token issuer
- [ ] Tool execution sandbox

---

## **EPIC 3 — Observability & Audit**

**Stories**

- [ ] Meta-event schema
- [ ] Event store (append-only)
- [ ] Replay engine
- [ ] ObserverAgent rules

---

## **EPIC 4 — AG-UI Integration**

**Stories**

- [ ] Plan visualization UI
- [ ] Step execution timeline
- [ ] Approval panel (Reviewer)
- [ ] Error explainability panel

---

## **EPIC 5 — Security & Compliance**

**Stories**

- [ ] Tenant isolation middleware
- [ ] RBAC + capability sync
- [ ] Audit export (PDF/JSON)
- [ ] Policy test suite

---

# **Kesimpulan (PENTING)**

Dengan B → C → D ini:

- ❌ Tidak ada agent liar
- ❌ Tidak ada hidden API call
- ❌ Tidak ada keputusan tanpa audit
- ✅ Semua bisa di-debug
- ✅ Siap untuk **enterprise & regulator**
