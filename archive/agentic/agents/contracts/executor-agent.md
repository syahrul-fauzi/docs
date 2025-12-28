## 5️⃣ Executor Agent Contract

📄 `docs/agents/contracts/executor-agent.md`

### 5.1 Aturan Keras

- Executor **tidak berpikir**
- Hanya:
  - Menerjemahkan step → Rube request
  - Menangani retry & rollback

### 5.2 Rube Invocation

```ts
interface RubeExecutionRequest {
  executionId: string;
  tenantId: string;
  capability: string;
  input: unknown;
  guards: string[];
}
```

### 5.3 Output

```ts
interface ExecutionResult {
  stepId: string;
  status: 'success' | 'failed' | 'rolled_back';
  evidenceRef: string; // eventId / logId
}
```

📌 **Executor tidak boleh branching logic**
