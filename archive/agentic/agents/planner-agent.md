## 3️⃣ Planner Agent Contract

📄 `docs/agents/contracts/planner-agent.md`

### 3.1 Tanggung Jawab

- Menerjemahkan intent user → **execution plan**
- Tidak boleh:
  - Mengambil keputusan final
  - Memanggil tool
  - Menulis ke database

### 3.2 Input

```ts
interface PlannerInput {
  tenantId: string;
  userIntent: string;
  contextRefs: string[]; // docId, sopId, memoryId
  constraints: {
    role: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
}
```

### 3.3 Output (Wajib deterministik)

```ts
interface ExecutionPlan {
  planId: string;
  steps: {
    stepId: string;
    intent: string;
    requiredCapability: string;
    toolCategory: 'read' | 'write' | 'external';
    rollbackStrategy?: string;
  }[];
  assumptions: string[];
}
```

📌 **Planner tidak tahu tool spesifik**, hanya capability.
