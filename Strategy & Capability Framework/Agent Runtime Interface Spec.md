**Agent Runtime Interface Spec** secara **production-grade, deterministik, dan konsisten penuh** dengan seluruh fondasi SBA-Agentic (AFD → Control Plane → Agent Runtime).

Dokumen ini **mendefinisikan kontrak keras** antara **Control Plane** dan **Agent Runtime**, sehingga:

* agent bisa di-swap / di-scale
* reasoning bisa berkembang
* governance tetap terjaga

---

# Agent Runtime Interface Spec

**SBA-Agentic (Smart Business Assistant)**

---

## 1. Purpose & Scope

### 1.1 Tujuan

Agent Runtime Interface adalah **kontrak teknis & perilaku** yang menetapkan:

> *Bagaimana Agent Runtime menerima Execution Plan, mengeksekusi secara deterministik, dan melaporkan hasilnya ke Control Plane.*

Ini **BUKAN** SDK UI, dan **BUKAN** prompt design.
Ini adalah **execution interface** setara dengan:

* workflow engine
* job executor
* policy-enforced agent runtime

---

### 1.2 Scope yang Dicakup

✔ Plan ingestion
✔ Execution lifecycle
✔ Node execution semantics
✔ Error & failure contract
✔ Observability & audit
✔ Security & verification

❌ UI
❌ Policy decision
❌ Capability discovery

---

## 2. Agent Runtime Positioning

```
Control Plane
  ├─ Intent Resolution
  ├─ Policy Enforcement
  ├─ Capability Selection
  └─ Execution Plan
        ↓ (signed, immutable)
Agent Runtime
  ├─ Verify
  ├─ Execute Graph
  ├─ Enforce Constraints
  └─ Emit Result
```

Agent Runtime **TIDAK BERPIKIR STRATEGIS**
Agent Runtime **MENJALANKAN PLAN**

---

## 3. Runtime Responsibilities (Hard Boundary)

### 3.1 Agent Runtime WAJIB

* Memverifikasi Execution Plan
* Mengeksekusi execution graph sesuai urutan
* Menegakkan constraint
* Mengirim telemetry & result
* Fail-fast jika plan invalid

### 3.2 Agent Runtime DILARANG

* Mengubah execution graph
* Menambah capability
* Mengabaikan policy snapshot
* Mengambil data lintas tenant
* Melakukan routing intent baru

> Semua larangan ini **harus dienforce secara code-level**, bukan asumsi.

---

## 4. High-Level Interface Contract

### 4.1 Runtime Entry Interface

```ts
interface AgentRuntime {
  execute(plan: ExecutionPlan): Promise<ExecutionResult>
}
```

**Satu plan = satu execution lifecycle**

---

## 5. Execution Lifecycle

### 5.1 Lifecycle State Machine

```
RECEIVED
  ↓
VERIFIED
  ↓
INITIALIZED
  ↓
EXECUTING
  ↓
COMPLETED | FAILED | PARTIAL
```

---

### 5.2 Lifecycle Hooks (Internal)

```ts
RuntimeHooks {
  onVerify(plan)
  onStart(plan)
  onNodeStart(node)
  onNodeComplete(node, output)
  onError(error)
  onComplete(result)
}
```

Hooks **internal**, bukan API eksternal.

---

## 6. Execution Plan Verification

### 6.1 Verification Steps (Wajib)

1. Signature valid
2. Plan belum expired
3. TenantContext valid
4. CapabilityRef dikenali
5. Constraints dapat dipenuhi

Jika **1 saja gagal → reject plan**

---

### 6.2 Verification Contract

```ts
VerificationResult {
  valid: boolean
  reason?: string
}
```

---

## 7. Execution Graph Semantics

### 7.1 Node Types

| Type        | Fungsi                   |
| ----------- | ------------------------ |
| `reasoning` | LLM-based thought / plan |
| `tool`      | Deterministic action     |
| `workflow`  | Multi-step orchestration |
| `decision`  | Conditional branching    |

---

### 7.2 Node Execution Contract

```ts
ExecutionNodeRuntime {
  nodeId: string
  execute(input, context): Promise<NodeResult>
}
```

Agent Runtime **tidak memilih node** — hanya mengikuti graph.

---

### 7.3 Dependency Enforcement

```ts
dependsOn?: string[]
```

Node:

* **tidak boleh** dieksekusi jika dependency gagal
* kecuali `allowPartial = true`

---

## 8. Constraint Enforcement

### 8.1 Time & Step Guard

```ts
ExecutionConstraints {
  maxSteps
  maxDurationMs
  maxCostUnits
}
```

Runtime:

* menghentikan execution jika limit terlampaui
* mengirim `PARTIAL` atau `FAILED`

---

### 8.2 Tool Allowlist

```ts
allowedTools: string[]
```

Runtime **wajib menolak** tool di luar list.

---

## 9. Capability Invocation Interface

### 9.1 Capability Adapter

```ts
interface CapabilityAdapter {
  capabilityId: string
  version: string
  invoke(input, context): Promise<any>
}
```

Semua capability dipanggil via adapter.

---

### 9.2 Adapter Registry (Runtime-Local)

```ts
CapabilityRegistry {
  get(capabilityId): CapabilityAdapter
}
```

> Registry ini **sinkron** dengan Control Plane, tapi **read-only**.

---

## 10. Context Injection (Read-Only)

```ts
ExecutionContext {
  tenantContext
  requesterContext
  intent
  policySnapshot
}
```

Agent Runtime:

* boleh membaca
* tidak boleh memodifikasi

---

## 11. Error Handling Contract

### 11.1 Error Shape

```ts
ExecutionError {
  nodeId?: string
  code: string
  message: string
  severity: "low" | "medium" | "high"
  retryable: boolean
}
```

---

### 11.2 Failure Policy

| Error            | Action            |
| ---------------- | ----------------- |
| Retryable        | Retry sesuai plan |
| Policy violation | Abort             |
| Tool failure     | Bubble up         |
| Timeout          | Abort             |

---

## 12. Result Contract (Agent → Control Plane)

```ts
ExecutionResult {
  planId: string
  status: "success" | "partial" | "failed"
  outputs: Record<string, any>
  errors?: ExecutionError[]
  metrics: ExecutionMetrics
}
```

---

### 12.1 Metrics

```ts
ExecutionMetrics {
  durationMs
  stepsExecuted
  costUnitsUsed
}
```

---

## 13. Observability Requirements

### 13.1 Mandatory Telemetry

* traceId
* node latency
* error count
* success ratio

Runtime **wajib emit** telemetry — bukan opsional.

---

## 14. Security Guarantees

### 14.1 Mandatory Controls

✔ Signature verification
✔ Tenant boundary isolation
✔ No external network unless allowed
✔ Secrets injected via runtime, bukan plan

---

## 15. Determinism Rules

Agent Runtime **harus**:

* menghasilkan hasil yang sama untuk plan yang sama
* kecuali:

  * LLM nondeterminism (harus dicatat)
  * External dependency variance

---

## 16. Versioning Strategy

```ts
AgentRuntimeSpec.version = "v1"
```

Rules:

* Control Plane dan Runtime **harus compatible**
* mismatch → reject execution

---

## 17. Strategic Value

Dengan spec ini:

* Agent bisa:

  * di-scale horizontal
  * di-sandbox
  * di-audit
* SBA berubah dari:

  > “AI feature”
  > menjadi
  > **Agentic Execution Platform**

---

## 18. Next Recommended Artifacts

Urutan paling logis selanjutnya:

1. **Agent Runtime SDK (TypeScript)**
2. **Execution Graph DSL (YAML)**
3. **Simulation / Dry-Run Interface**
4. **Agent Runtime Deployment Model**
5. **Multi-Agent Coordination Spec**

Jika Anda mau, saya bisa **langsung turun ke level kode**:

* interface TS siap monorepo
* folder structure `packages/agent-runtime`
* atau runtime adapter contoh (marketing / ops)

Tinggal bilang: **lanjut ke mana**.
