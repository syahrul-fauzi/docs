## ExecutorAgent — Spec Detail

### Tujuan

Menjalankan plan **step-by-step** melalui Rube.

### Input

```ts
ExecutorInput {
  planId: string
  step: PlanStep
  toolToken: ScopedToolToken
}
```

### Output

```ts
ExecutorResult {
  stepId: string
  status: "success" | "failed"
  output?: unknown
  error?: ExecutionError
}
```

### Batasan Keras

- ❌ Tidak boleh reasoning ulang
- ❌ Tidak boleh lompat step
- ❌ Tidak boleh akses tool di luar scope
- ✅ Semua execution → emit event

### Failure Handling

- Retry terbatas
- Emit `execution.failed`
- Stop chain bila fatal
