**Agent Runtime SDK (TypeScript)** dengan **level production-grade**, **clean boundary**, dan **siap dimasukkan ke monorepo SBA-Agentic** (selaras dengan Control Plane, AFD, dan policy enforcement).

Fokus SDK ini **BUKAN framework AI**, tapi **execution SDK**:

> *menjalankan Execution Plan secara deterministik, policy-aware, observable.*

---

# Agent Runtime SDK — TypeScript

**SBA-Agentic**

---

## 1. Tujuan SDK

SDK ini bertujuan untuk:

1. Menjadi **implementasi konkret** dari *Agent Runtime Interface Spec*
2. Menyediakan **runtime engine reusable**
3. Memastikan:

   * determinism
   * policy enforcement
   * tenant isolation
   * observability-by-default
4. Memungkinkan:

   * multiple agent runtime
   * sandboxed execution
   * future multi-agent orchestration

SDK **tidak**:

* membuat keputusan routing
* memilih capability
* mengatur UI / prompt

---

## 2. Posisi SDK dalam Arsitektur SBA

```
apps/*
  └─ Control Plane
       └─ ExecutionPlan
            ↓
packages/agent-runtime-sdk   ← ANDA DI SINI
       ├─ verifier
       ├─ executor
       ├─ capability-adapters
       ├─ telemetry
       └─ sandbox
            ↓
Agent Runtime (Worker / Service / Edge)
```

---

## 3. Struktur Package (Disarankan)

```txt
packages/agent-runtime-sdk
├── src
│   ├── core/
│   │   ├── AgentRuntime.ts
│   │   ├── ExecutionEngine.ts
│   │   ├── ExecutionContext.ts
│   │   └── RuntimeConfig.ts
│
│   ├── verifier/
│   │   ├── PlanVerifier.ts
│   │   └── SignatureVerifier.ts
│
│   ├── executor/
│   │   ├── GraphExecutor.ts
│   │   ├── NodeExecutor.ts
│   │   └── ConstraintEnforcer.ts
│
│   ├── capabilities/
│   │   ├── CapabilityAdapter.ts
│   │   └── CapabilityRegistry.ts
│
│   ├── telemetry/
│   │   ├── RuntimeTelemetry.ts
│   │   └── MetricsCollector.ts
│
│   ├── errors/
│   │   └── ExecutionError.ts
│
│   ├── types/
│   │   └── ExecutionPlan.ts
│
│   └── index.ts
└── package.json
```

➡️ Struktur ini **selaras dengan clean architecture & DDD-style boundaries**.

---

## 4. Core Runtime Interface

### 4.1 AgentRuntime (Entry Point)

```ts
export interface AgentRuntime {
  execute(plan: ExecutionPlan): Promise<ExecutionResult>
}
```

SDK menyediakan **default implementation**:

```ts
export class DefaultAgentRuntime implements AgentRuntime {
  constructor(
    private verifier: PlanVerifier,
    private engine: ExecutionEngine,
    private telemetry: RuntimeTelemetry
  ) {}

  async execute(plan: ExecutionPlan): Promise<ExecutionResult> {
    this.telemetry.planReceived(plan)

    await this.verifier.verify(plan)

    const result = await this.engine.run(plan)

    this.telemetry.planCompleted(result)

    return result
  }
}
```

➡️ **Single entry, single lifecycle**

---

## 5. Execution Plan Types (Strict & Immutable)

```ts
export interface ExecutionPlan {
  planId: string
  version: string
  tenantContext: TenantContext
  intent: IntentDescriptor
  executionGraph: ExecutionGraph
  constraints: ExecutionConstraints
  policySnapshot: PolicySnapshot
  signature: string
  expiresAt: string
}
```

**Plan harus dianggap immutable**
SDK **tidak boleh** memodifikasi plan.

---

## 6. Plan Verification Layer

### 6.1 Verifier Contract

```ts
export interface PlanVerifier {
  verify(plan: ExecutionPlan): Promise<void>
}
```

### 6.2 Default Verifier Pipeline

```ts
export class DefaultPlanVerifier implements PlanVerifier {
  async verify(plan: ExecutionPlan) {
    verifySignature(plan)
    verifyExpiration(plan)
    verifyTenant(plan)
    verifyCapabilities(plan)
    verifyConstraints(plan)
  }
}
```

➡️ **Fail-fast, no fallback**

---

## 7. Execution Engine

### 7.1 ExecutionEngine

```ts
export interface ExecutionEngine {
  run(plan: ExecutionPlan): Promise<ExecutionResult>
}
```

### 7.2 Graph Executor (Deterministic)

```ts
export class GraphExecutor implements ExecutionEngine {
  async run(plan: ExecutionPlan): Promise<ExecutionResult> {
    for (const node of plan.executionGraph.nodes) {
      await this.executeNode(node, plan)
    }

    return buildResult()
  }
}
```

⚠️ Urutan eksekusi **harus deterministic**
Tidak ada random scheduling.

---

## 8. Node Execution Contract

```ts
export interface ExecutionNode {
  id: string
  type: 'reasoning' | 'tool' | 'workflow' | 'decision'
  capabilityRef?: string
  dependsOn?: string[]
  config?: Record<string, any>
}
```

### 8.1 Node Executor

```ts
export class NodeExecutor {
  async execute(
    node: ExecutionNode,
    ctx: ExecutionContext
  ): Promise<NodeResult> {
    switch (node.type) {
      case 'tool':
        return this.executeTool(node, ctx)
      case 'reasoning':
        return this.executeReasoning(node, ctx)
      default:
        throw new UnsupportedNodeError(node)
    }
  }
}
```

---

## 9. Capability Adapter Layer

### 9.1 Adapter Interface

```ts
export interface CapabilityAdapter {
  capabilityId: string
  version: string
  invoke(input: any, context: ExecutionContext): Promise<any>
}
```

### 9.2 Registry (Read-Only)

```ts
export class CapabilityRegistry {
  constructor(private adapters: CapabilityAdapter[]) {}

  get(capabilityId: string): CapabilityAdapter {
    const adapter = this.adapters.find(a => a.capabilityId === capabilityId)
    if (!adapter) throw new CapabilityNotFound(capabilityId)
    return adapter
  }
}
```

➡️ Registry **harus sinkron** dengan Control Plane Registry.

---

## 10. Constraint Enforcement

```ts
export class ConstraintEnforcer {
  checkStepLimit()
  checkTimeout()
  checkCost()
}
```

Runtime **wajib menghentikan** execution jika limit dilanggar.

---

## 11. Execution Context (Read-Only)

```ts
export interface ExecutionContext {
  tenant: TenantContext
  intent: IntentDescriptor
  policy: PolicySnapshot
  traceId: string
}
```

➡️ Tidak boleh ada mutasi context.

---

## 12. Error Handling Model

```ts
export interface ExecutionError {
  code: string
  message: string
  nodeId?: string
  retryable: boolean
  severity: 'low' | 'medium' | 'high'
}
```

Semua error:

* typed
* structured
* observable

---

## 13. Observability (First-Class)

```ts
export interface RuntimeTelemetry {
  planReceived(plan: ExecutionPlan): void
  nodeStarted(nodeId: string): void
  nodeCompleted(nodeId: string, output: any): void
  planCompleted(result: ExecutionResult): void
  error(err: ExecutionError): void
}
```

➡️ **Tidak boleh dimatikan** di production.

---

## 14. Security Guarantees di SDK

SDK **harus enforce**:

* signature verification
* tenant isolation
* capability allowlist
* no outbound network (kecuali capability)

Security **bukan responsibility user SDK**.

---

## 15. Versioning & Compatibility

```ts
export const AGENT_RUNTIME_SDK_VERSION = '1.0.0'
```

Control Plane:

* mengirim `requiredRuntimeVersion`
* runtime menolak jika incompatible

---

## 16. Contoh Minimal Usage

```ts
const runtime = new DefaultAgentRuntime(
  new DefaultPlanVerifier(),
  new GraphExecutor(),
  new OpenTelemetryRuntimeTelemetry()
)

const result = await runtime.execute(executionPlan)
```

➡️ **Tidak ada konfigurasi berlebihan**
➡️ Siap worker / server / edge.

---

## 17. Nilai Strategis SDK Ini

Dengan SDK ini, SBA:

* Memiliki **agent runtime portable**
* Bisa:

  * run di container
  * run di edge
  * sandbox per tenant
* Siap:

  * certification
  * compliance audit
  * enterprise SLA

---

## 18. Langkah Lanjutan (Disarankan)

Urutan terbaik setelah ini:

1. **Execution Graph DSL (YAML / JSON)**
2. **Agent Runtime Simulation Mode**
3. **Capability Adapter Example**

   * marketing intent
   * ops automation
4. **Runtime Deployment Model (K8s / Worker)**
5. **Multi-Agent Orchestration Spec**

Jika Anda mau, saya bisa **langsung generate**:

* `packages/agent-runtime-sdk` siap commit
* atau **Execution Graph DSL** sebagai next artifact

Tinggal arahkan: **lanjut ke mana**.
